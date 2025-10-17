import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Search, Eye, CheckCircle, Clock, XCircle } from "lucide-react";
import { toast } from "@/hooks/use-toast";

interface Issue {
  id: string;
  title: string;
  category: string;
  status: string;
  location: string;
  reportedBy: string;
  reportedDate: string;
}

const AdminIssues = () => {
  // Mock data - will be replaced with real data
  const [issues] = useState<Issue[]>([
    {
      id: "1",
      title: "Pothole on Moi Avenue",
      category: "roads",
      status: "pending",
      location: "Moi Avenue, Nairobi",
      reportedBy: "John Kamau",
      reportedDate: "2025-01-10",
    },
    {
      id: "2",
      title: "Water supply disruption",
      category: "water",
      status: "in-progress",
      location: "Kilimani Estate",
      reportedBy: "Mary Wanjiru",
      reportedDate: "2025-01-08",
    },
    {
      id: "3",
      title: "Street lights not working",
      category: "electricity",
      status: "pending",
      location: "Kenyatta Road",
      reportedBy: "Ahmed Hassan",
      reportedDate: "2025-01-09",
    },
  ]);

  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const filteredIssues = issues.filter((issue) => {
    const matchesSearch =
      issue.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      issue.location.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === "all" || issue.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getStatusColor = (status: string) => {
    const colors = {
      pending: "bg-warning/10 text-warning hover:bg-warning/20",
      "in-progress": "bg-info/10 text-info hover:bg-info/20",
      resolved: "bg-success/10 text-success hover:bg-success/20",
    };
    return colors[status as keyof typeof colors] || colors.pending;
  };

  const handleStatusChange = (issueId: string, newStatus: string) => {
    // This will be replaced with actual API call
    toast({
      title: "Status Updated",
      description: `Issue status changed to ${newStatus}`,
    });
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold mb-2">Manage Issues</h1>
        <p className="text-muted-foreground">View and manage all reported issues</p>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search issues..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full md:w-48">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="in-progress">In Progress</SelectItem>
                <SelectItem value="resolved">Resolved</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Issues Table */}
      <Card>
        <CardContent className="pt-6">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Title</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Location</TableHead>
                <TableHead>Reported By</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredIssues.map((issue) => (
                <TableRow key={issue.id}>
                  <TableCell className="font-medium">{issue.title}</TableCell>
                  <TableCell className="capitalize">{issue.category}</TableCell>
                  <TableCell>{issue.location}</TableCell>
                  <TableCell>{issue.reportedBy}</TableCell>
                  <TableCell>{issue.reportedDate}</TableCell>
                  <TableCell>
                    <Badge className={getStatusColor(issue.status)}>
                      {issue.status.replace("-", " ")}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button variant="ghost" size="icon" title="View details">
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        title="Mark as in progress"
                        onClick={() => handleStatusChange(issue.id, "in-progress")}
                      >
                        <Clock className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        title="Mark as resolved"
                        onClick={() => handleStatusChange(issue.id, "resolved")}
                      >
                        <CheckCircle className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          {filteredIssues.length === 0 && (
            <div className="text-center py-8 text-muted-foreground">
              No issues found matching your criteria
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminIssues;
