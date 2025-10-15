import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { MapPin, Calendar, User } from "lucide-react";
import { cn } from "@/lib/utils";

export type IssueStatus = "pending" | "in-progress" | "resolved";
export type IssueCategory = "roads" | "water" | "electricity" | "waste" | "health" | "education" | "security" | "other";

export interface Issue {
  id: string;
  title: string;
  description: string;
  category: IssueCategory;
  status: IssueStatus;
  location: string;
  reportedBy: string;
  reportedDate: string;
  imageUrl?: string;
}

interface IssueCardProps {
  issue: Issue;
}

const statusConfig: Record<IssueStatus, { label: string; variant: "default" | "secondary" | "destructive" | "outline" }> = {
  pending: { label: "Pending", variant: "secondary" },
  "in-progress": { label: "In Progress", variant: "default" },
  resolved: { label: "Resolved", variant: "outline" },
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

const IssueCard = ({ issue }: IssueCardProps) => {
  return (
    <Link to={`/issues/${issue.id}`}>
      <Card className="hover:shadow-lg transition-all duration-300 cursor-pointer h-full">
        {issue.imageUrl && (
          <div className="w-full h-48 overflow-hidden rounded-t-lg">
            <img 
              src={issue.imageUrl} 
              alt={issue.title}
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
            />
          </div>
        )}
        <CardHeader>
          <div className="flex justify-between items-start gap-2 mb-2">
            <Badge className={cn("text-xs font-medium", categoryColors[issue.category])}>
              {issue.category}
            </Badge>
            <Badge variant={statusConfig[issue.status].variant}>
              {statusConfig[issue.status].label}
            </Badge>
          </div>
          <CardTitle className="text-xl line-clamp-2">{issue.title}</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground mb-4 line-clamp-2">{issue.description}</p>
          
          <div className="space-y-2 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4" />
              <span className="line-clamp-1">{issue.location}</span>
            </div>
            <div className="flex items-center gap-2">
              <User className="h-4 w-4" />
              <span>{issue.reportedBy}</span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              <span>{new Date(issue.reportedDate).toLocaleDateString()}</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
};

export default IssueCard;
