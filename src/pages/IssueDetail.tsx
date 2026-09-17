import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import Navigation from "@/components/Navigation";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { MapPin, Calendar, User, ArrowLeft, Clock } from "lucide-react";
import { cn } from "@/lib/utils";
import { db } from "@/firebase";
import {
  doc,
  getDoc,
  collection,
  addDoc,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
} from "firebase/firestore";
import { toast } from "sonner";

// Mock fallback data (for dev)
const mockIssues = {
  "1": {
    id: "1",
    title: "Pothole on Moi Avenue causing accidents",
    description:
      "Large pothole near the intersection has caused multiple vehicle damages...",
    category: "roads",
    status: "pending",
    location: "Moi Avenue, Nairobi",
    reportedBy: "John Kamau",
    reportedDate: "2025-01-10",
    updates: [{ date: "2025-01-10", message: "Issue reported and submitted for review" }],
  },
};

// Style configs
const statusConfig = {
  pending: {
    label: "Pending",
    color: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-100",
  },
  "in-progress": {
    label: "In Progress",
    color: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-100",
  },
  resolved: {
    label: "Resolved",
    color: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100",
  },
};

const categoryColors = {
  roads: "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-100",
  water: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-100",
  electricity:
    "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-100",
  waste: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100",
  health: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-100",
  education:
    "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-100",
  security: "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-100",
  other: "bg-slate-100 text-slate-800 dark:bg-slate-900 dark:text-slate-100",
};

const IssueDetail = () => {
  const { id } = useParams();
  const [issue, setIssue] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  // --- Comment states ---
  const [comments, setComments] = useState<any[]>([]);
  const [newComment, setNewComment] = useState("");

  // Fetch issue from Firestore
  useEffect(() => {
    const fetchIssue = async () => {
      try {
        const ref = doc(db, "issues", id!);
        const snapshot = await getDoc(ref);
        if (snapshot.exists()) {
          setIssue({ id: snapshot.id, ...snapshot.data() });
        } else {
          setIssue(mockIssues[id as keyof typeof mockIssues] || null);
        }
      } catch (error) {
        console.error("Error fetching issue:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchIssue();
  }, [id]);

  // --- Listen for comments in real-time ---
  useEffect(() => {
    if (!id) return;
    const q = query(collection(db, "issues", id, "comments"), orderBy("createdAt", "asc"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setComments(data);
    });
    return () => unsubscribe();
  }, [id]);

  // --- Add new comment ---
  const handleAddComment = async () => {
    if (!newComment.trim()) return;
    try {
      await addDoc(collection(db, "issues", id!, "comments"), {
        text: newComment,
        username: "Anonymous User", // Replace with Firebase Auth user later
        createdAt: serverTimestamp(),
      });
      setNewComment("");
      toast.success("Comment posted!");
    } catch (err) {
      console.error(err);
      toast.error("Failed to post comment");
    }
  };

  // --- Loading state ---
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-muted-foreground">
        Loading issue details...
      </div>
    );
  }

  // --- Not found ---
  if (!issue) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <div className="container px-4 py-12 text-center">
          <p className="text-lg font-medium mb-4">⚠️ Issue not found</p>
          <Link to="/issues">
            <Button variant="outline">Back to Issues</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <div className="container px-4 py-12">
        <Link to="/issues">
          <Button variant="ghost" className="mb-6">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Issues
          </Button>
        </Link>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* --- Main Content --- */}
          <div className="lg:col-span-2 space-y-6">
            {/* Header */}
            <div>
              <div className="flex gap-2 mb-4">
                <Badge
                  className={cn(
                    "text-xs font-medium",
                    categoryColors[issue.category as keyof typeof categoryColors]
                  )}
                >
                  {issue.category}
                </Badge>
                <Badge
                  className={
                    statusConfig[issue.status as keyof typeof statusConfig]?.color
                  }
                >
                  {statusConfig[issue.status as keyof typeof statusConfig]?.label}
                </Badge>
              </div>

              <h1 className="text-4xl font-bold mb-4">{issue.title}</h1>

              <div className="flex flex-wrap gap-6 text-sm text-muted-foreground mb-6">
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4" />
                  <span>{issue.location}</span>
                </div>
                <div className="flex items-center gap-2">
                  <User className="h-4 w-4" />
                  <span>Reported by {issue.reportedBy}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  <span>{new Date(issue.reportedDate).toLocaleDateString()}</span>
                </div>
              </div>
            </div>

            {/* Description */}
            <Card>
              <CardContent className="pt-6">
                <h2 className="text-xl font-semibold mb-4">Description</h2>
                <p className="text-muted-foreground leading-relaxed">
                  {issue.description}
                </p>
              </CardContent>
            </Card>

            {/* Timeline */}
            {issue.updates && issue.updates.length > 0 && (
              <Card>
                <CardContent className="pt-6">
                  <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                    <Clock className="h-5 w-5" />
                    Timeline
                  </h2>
                  <div className="space-y-4">
                    {issue.updates.map((update: any, index: number) => (
                      <div key={index} className="flex gap-4">
                        <div className="flex flex-col items-center">
                          <div className="w-3 h-3 rounded-full bg-primary" />
                          {index < issue.updates.length - 1 && (
                            <div className="w-0.5 h-full bg-border mt-2" />
                          )}
                        </div>
                        <div className="flex-1 pb-4">
                          <p className="text-sm text-muted-foreground mb-1">
                            {new Date(update.date).toLocaleDateString()}
                          </p>
                          <p>{update.message}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* --- Comments Section --- */}
            <Card>
              <CardContent className="pt-6">
                <h2 className="text-xl font-semibold mb-4">Comments ({comments.length})</h2>

                {/* Display existing comments */}
                <div className="space-y-4 mb-6">
                  {comments.map((c) => (
                    <div key={c.id} className="bg-gray-50 dark:bg-gray-800 p-3 rounded-lg">
                      <p className="font-medium">{c.username}</p>
                      <p className="text-sm text-muted-foreground">{c.text}</p>
                    </div>
                  ))}

                  {comments.length === 0 && (
                    <p className="text-muted-foreground text-sm">
                      No comments yet. Be the first to comment!
                    </p>
                  )}
                </div>

                {/* Add new comment */}
                <div className="flex gap-2">
                  <Input
                    placeholder="Write a comment..."
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                  />
                  <Button onClick={handleAddComment}>Post</Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* --- Sidebar --- */}
          <div className="space-y-6">
            <Card>
              <CardContent className="pt-6">
                <h3 className="font-semibold mb-4">Report Details</h3>
                <div className="space-y-3 text-sm">
                  <div>
                    <div className="text-muted-foreground mb-1">Issue ID</div>
                    <div className="font-mono">#{issue.id}</div>
                  </div>
                  <div>
                    <div className="text-muted-foreground mb-1">Category</div>
                    <div className="capitalize">{issue.category}</div>
                  </div>
                  <div>
                    <div className="text-muted-foreground mb-1">Status</div>
                    <div className="capitalize">{issue.status?.replace("-", " ")}</div>
                  </div>
                  <div>
                    <div className="text-muted-foreground mb-1">Submitted</div>
                    <div>{new Date(issue.reportedDate).toLocaleDateString()}</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-muted/50">
              <CardContent className="pt-6">
                <h3 className="font-semibold mb-2">Need Help?</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  If this is an emergency, please contact local authorities directly.
                </p>
                <Button variant="outline" className="w-full">
                  Contact Support
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      <footer className="border-t py-8 mt-12">
        <div className="container px-4 text-center text-muted-foreground">
          <p>&copy; 2025 Kenya Issues. Empowering citizens for better communities.</p>
        </div>
      </footer>
    </div>
  );
};

export default IssueDetail;
