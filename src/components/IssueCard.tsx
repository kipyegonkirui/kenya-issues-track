import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { MapPin, Calendar, User, MessageCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { db } from "@/firebase";
import { collection, getDocs } from "firebase/firestore";

// --- Types ---
export type IssueStatus = "pending" | "in-progress" | "resolved";
export type IssueCategory =
  | "roads"
  | "water"
  | "electricity"
  | "waste"
  | "health"
  | "education"
  | "security"
  | "other";

export interface Issue {
  id: string;
  title: string;
  description: string;
  category?: IssueCategory;
  status?: IssueStatus;
  location: string;
  reportedBy: string;
  reportedDate: string;
  imageUrl?: string;
  createdAt?: string;
}

// --- Status & Category Styles ---
const statusConfig: Record<IssueStatus, { label: string; className: string }> = {
  pending: { label: "Pending", className: "bg-yellow-100 text-yellow-800" },
  "in-progress": { label: "In Progress", className: "bg-blue-100 text-blue-800" },
  resolved: { label: "Resolved", className: "bg-green-100 text-green-800" },
};

const categoryColors: Record<IssueCategory, string> = {
  roads: "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-100",
  water: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-100",
  electricity: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-100",
  waste: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100",
  health: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-100",
  education: "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-100",
  security: "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-100",
  other: "bg-slate-100 text-slate-800 dark:bg-slate-900 dark:text-slate-100",
};

// --- Component ---
interface IssueCardProps {
  issue: Issue;
  showCommentCount?: boolean; // optional toggle
}

const IssueCard = ({ issue, showCommentCount = true }: IssueCardProps) => {
  const [commentCount, setCommentCount] = useState<number>(0);

  const category = (issue.category?.toLowerCase() as IssueCategory) || "other";
  const status = issue.status || "pending";
  const categoryClass = categoryColors[category] || categoryColors.other;
  const statusStyle = statusConfig[status] || statusConfig.pending;

  // --- Fetch comment count (optional) ---
  useEffect(() => {
    const fetchComments = async () => {
      try {
        const commentsCol = collection(db, "issues", issue.id, "comments");
        const snapshot = await getDocs(commentsCol);
        setCommentCount(snapshot.size);
      } catch (err) {
        console.error("Failed to fetch comments:", err);
      }
    };
    if (showCommentCount) fetchComments();
  }, [issue.id, showCommentCount]);

  return (
    <Link to={`/issues/${issue.id}`}>
      <Card className="hover:shadow-lg transition-all duration-300 cursor-pointer h-full rounded-xl overflow-hidden">
        {/* --- Image --- */}
        <div className="relative w-full h-48 overflow-hidden">
          {issue.imageUrl ? (
            <img
              src={issue.imageUrl}
              alt={issue.title}
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
            />
          ) : (
            <div className="w-full h-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center text-gray-400 text-sm">
              No Image Available
            </div>
          )}

          {/* --- Status Badge --- */}
          <Badge
            className={cn(
              "absolute top-2 right-2 text-xs font-medium shadow-md",
              statusStyle.className
            )}
          >
            {statusStyle.label}
          </Badge>
        </div>

        {/* --- Content --- */}
        <CardHeader>
          <div className="flex justify-between items-start gap-2 mb-2">
            <Badge className={cn("text-xs font-medium", categoryClass)}>
              {category}
            </Badge>
          </div>
          <CardTitle className="text-lg line-clamp-2">{issue.title}</CardTitle>
        </CardHeader>

        <CardContent>
          <p className="text-muted-foreground mb-4 line-clamp-2">
            {issue.description || "No description provided."}
          </p>

          <div className="space-y-2 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4" />
              <span className="line-clamp-1">{issue.location || "Unknown location"}</span>
            </div>
            <div className="flex items-center gap-2">
              <User className="h-4 w-4" />
              <span>{issue.reportedBy || "Anonymous"}</span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              <span>
                {issue.reportedDate
                  ? new Date(issue.reportedDate).toLocaleDateString()
                  : "Unknown date"}
              </span>
            </div>

            {/* --- Comment Count --- */}
            {showCommentCount && (
              <div className="flex items-center gap-2">
                <MessageCircle className="h-4 w-4" />
                <span>{commentCount} comment{commentCount !== 1 ? "s" : ""}</span>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </Link>
  );
};

export default IssueCard;
