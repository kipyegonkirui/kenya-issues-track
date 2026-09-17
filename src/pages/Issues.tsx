import { useEffect, useState } from "react";
import Navigation from "@/components/Navigation";
import IssueCard, { Issue } from "@/components/IssueCard";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Search, Loader2 } from "lucide-react";
import { db } from "@/firebase";
import { collection, getDocs, query, orderBy } from "firebase/firestore";
import { toast } from "sonner";

// --- Mock data (still kept as fallback) ---
const mockIssues: Issue[] = [
  {
    id: "1",
    title: "Pothole on Moi Avenue causing accidents",
    description: "Large pothole near the intersection has caused multiple vehicle damages. Urgently needs repair.",
    category: "roads",
    status: "pending",
    location: "Moi Avenue, Nairobi",
    reportedBy: "John Kamau",
    reportedDate: "2025-01-10",
  },
  {
    id: "2",
    title: "Water supply disruption in Kilimani",
    description: "No water supply for the past 3 days. Residents are struggling with basic needs.",
    category: "water",
    status: "in-progress",
    location: "Kilimani Estate, Nairobi",
    reportedBy: "Mary Wanjiru",
    reportedDate: "2025-01-08",
  },
  {
    id: "3",
    title: "Street lights not working on Kenyatta Road",
    description: "All street lights along a 2km stretch have been out for weeks, creating safety concerns.",
    category: "electricity",
    status: "pending",
    location: "Kenyatta Road, Mombasa",
    reportedBy: "Ahmed Hassan",
    reportedDate: "2025-01-09",
  },
];

const Issues = () => {
  const [issues, setIssues] = useState<Issue[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [categoryFilter, setCategoryFilter] = useState<string>("all");

  // --- Fetch from Firestore ---
  useEffect(() => {
    const fetchIssues = async () => {
      try {
        const q = query(collection(db, "issues"), orderBy("createdAt", "desc"));
        const snapshot = await getDocs(q);
        const firestoreIssues = snapshot.docs.map((doc) => {
          const data = doc.data();
          return {
            id: doc.id,
            title: data.title || "Untitled Issue",
            description: data.description || "No description provided",
            category: data.category || "other",
            status: data.status || "pending",
            location: data.location || "",
            reportedBy: data.reportedBy || "Anonymous",
            reportedDate: data.createdAt?.toDate
              ? data.createdAt.toDate().toISOString()
              : new Date().toISOString(),
            imageUrl: data.imageUrl || "",
          } as Issue;
        });

        // Combine firestore + mock (Firestore first)
        setIssues([...firestoreIssues, ...mockIssues]);
      } catch (err) {
        console.error("Error loading issues:", err);
        toast.error("Failed to load issues from database.");
        setIssues(mockIssues); // fallback
      } finally {
        setLoading(false);
      }
    };

    fetchIssues();
  }, []);

  // --- Filtering & Searching ---
  const filteredIssues = issues.filter((issue) => {
    const matchesSearch =
      issue.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      issue.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      issue.location.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === "all" || issue.status === statusFilter;
    const matchesCategory = categoryFilter === "all" || issue.category === categoryFilter;
    return matchesSearch && matchesStatus && matchesCategory;
  });

  // --- UI Rendering ---
  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <div className="container px-4 py-12">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">All Issues</h1>
          <p className="text-muted-foreground">Browse and track community issues across Kenya</p>
        </div>

        {/* Filters */}
        <div className="grid md:grid-cols-4 gap-4 mb-8">
          <div className="md:col-span-2">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search issues..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>

          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger>
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="in-progress">In Progress</SelectItem>
              <SelectItem value="resolved">Resolved</SelectItem>
            </SelectContent>
          </Select>

          <Select value={categoryFilter} onValueChange={setCategoryFilter}>
            <SelectTrigger>
              <SelectValue placeholder="Filter by category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              <SelectItem value="roads">Roads</SelectItem>
              <SelectItem value="water">Water</SelectItem>
              <SelectItem value="electricity">Electricity</SelectItem>
              <SelectItem value="waste">Waste</SelectItem>
              <SelectItem value="health">Health</SelectItem>
              <SelectItem value="education">Education</SelectItem>
              <SelectItem value="security">Security</SelectItem>
              <SelectItem value="other">Other</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Loading State */}
        {loading ? (
          <div className="flex justify-center items-center py-20">
            <Loader2 className="animate-spin mr-2 h-5 w-5 text-primary" />
            <p>Loading issues...</p>
          </div>
        ) : (
          <>
            <div className="mb-4 text-sm text-muted-foreground">
              Showing {filteredIssues.length} of {issues.length} issues
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredIssues.map((issue) => (
                <IssueCard key={issue.id} issue={issue} />
              ))}
            </div>

            {filteredIssues.length === 0 && (
              <div className="text-center py-12">
                <p className="text-muted-foreground">No issues found matching your filters.</p>
                <Button
                  variant="outline"
                  className="mt-4"
                  onClick={() => {
                    setSearchQuery("");
                    setStatusFilter("all");
                    setCategoryFilter("all");
                  }}
                >
                  Clear Filters
                </Button>
              </div>
            )}
          </>
        )}
      </div>

      <footer className="border-t py-8 mt-12">
        <div className="container px-4 text-center text-muted-foreground">
          <p>&copy; 2025 Kenya Issues. Empowering citizens for better communities.</p>
        </div>
      </footer>
    </div>
  );
};

export default Issues;
