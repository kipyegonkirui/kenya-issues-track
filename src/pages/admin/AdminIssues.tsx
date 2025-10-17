import { useState, useMemo } from "react";
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
import { Search, Eye, ArrowUpDown } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { useIssuesStorage } from "@/hooks/useIssuesStorage";
import { IssueDetailDialog } from "@/components/admin/IssueDetailDialog";
import { Issue, IssueStatus } from "@/types/issue";

type SortField = 'title' | 'category' | 'status' | 'location' | 'reportedDate';
type SortDirection = 'asc' | 'desc';

const AdminIssues = () => {
  const { issues, updateIssue, deleteIssue, addNote } = useIssuesStorage();
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");
  const [sortField, setSortField] = useState<SortField>('reportedDate');
  const [sortDirection, setSortDirection] = useState<SortDirection>('desc');
  const [selectedIssue, setSelectedIssue] = useState<Issue | null>(null);

  const filteredAndSortedIssues = useMemo(() => {
    let filtered = issues.filter((issue) => {
      const matchesSearch =
        issue.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        issue.location.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesStatus = statusFilter === "all" || issue.status === statusFilter;
      const matchesCategory = categoryFilter === "all" || issue.category === categoryFilter;
      
      let matchesDateRange = true;
      if (dateFrom) {
        matchesDateRange = matchesDateRange && issue.reportedDate >= dateFrom;
      }
      if (dateTo) {
        matchesDateRange = matchesDateRange && issue.reportedDate <= dateTo;
      }
      
      return matchesSearch && matchesStatus && matchesCategory && matchesDateRange;
    });

    // Sort
    filtered.sort((a, b) => {
      let aValue = a[sortField];
      let bValue = b[sortField];
      
      if (typeof aValue === 'string') aValue = aValue.toLowerCase();
      if (typeof bValue === 'string') bValue = bValue.toLowerCase();
      
      if (aValue < bValue) return sortDirection === 'asc' ? -1 : 1;
      if (aValue > bValue) return sortDirection === 'asc' ? 1 : -1;
      return 0;
    });

    return filtered;
  }, [issues, searchQuery, statusFilter, categoryFilter, dateFrom, dateTo, sortField, sortDirection]);

  const getStatusColor = (status: IssueStatus) => {
    const colors = {
      pending: "bg-warning/10 text-warning hover:bg-warning/20",
      "in-progress": "bg-info/10 text-info hover:bg-info/20",
      resolved: "bg-success/10 text-success hover:bg-success/20",
    };
    return colors[status];
  };

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const handleStatusChange = (issueId: string, newStatus: IssueStatus) => {
    updateIssue(issueId, { status: newStatus });
    toast({
      title: "Status Updated",
      description: `Issue status changed to ${newStatus}`,
    });
  };

  const handleDelete = (issueId: string) => {
    deleteIssue(issueId);
    toast({
      title: "Issue Deleted",
      description: "The issue has been permanently deleted",
    });
  };

  const handleUpdate = (issueId: string, updates: Partial<Issue>) => {
    updateIssue(issueId, updates);
    toast({
      title: "Issue Updated",
      description: "Changes have been saved",
    });
  };

  const handleAddNote = (issueId: string, content: string) => {
    addNote(issueId, content);
    toast({
      title: "Note Added",
      description: "Internal note has been added to the issue",
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
          <div className="space-y-4">
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
              <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                <SelectTrigger className="w-full md:w-48">
                  <SelectValue placeholder="Filter by category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  <SelectItem value="roads">Roads</SelectItem>
                  <SelectItem value="water">Water</SelectItem>
                  <SelectItem value="electricity">Electricity</SelectItem>
                  <SelectItem value="waste">Waste</SelectItem>
                  <SelectItem value="security">Security</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
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
            
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <Input
                  type="date"
                  placeholder="From date"
                  value={dateFrom}
                  onChange={(e) => setDateFrom(e.target.value)}
                />
              </div>
              <div className="flex-1">
                <Input
                  type="date"
                  placeholder="To date"
                  value={dateTo}
                  onChange={(e) => setDateTo(e.target.value)}
                />
              </div>
              {(dateFrom || dateTo) && (
                <Button
                  variant="outline"
                  onClick={() => {
                    setDateFrom("");
                    setDateTo("");
                  }}
                >
                  Clear Dates
                </Button>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Issues Table */}
      <Card>
        <CardContent className="pt-6">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>
                  <Button variant="ghost" onClick={() => handleSort('title')} className="gap-2 font-semibold">
                    Title <ArrowUpDown className="h-4 w-4" />
                  </Button>
                </TableHead>
                <TableHead>
                  <Button variant="ghost" onClick={() => handleSort('category')} className="gap-2 font-semibold">
                    Category <ArrowUpDown className="h-4 w-4" />
                  </Button>
                </TableHead>
                <TableHead>
                  <Button variant="ghost" onClick={() => handleSort('location')} className="gap-2 font-semibold">
                    Location <ArrowUpDown className="h-4 w-4" />
                  </Button>
                </TableHead>
                <TableHead>Reported By</TableHead>
                <TableHead>
                  <Button variant="ghost" onClick={() => handleSort('reportedDate')} className="gap-2 font-semibold">
                    Date <ArrowUpDown className="h-4 w-4" />
                  </Button>
                </TableHead>
                <TableHead>
                  <Button variant="ghost" onClick={() => handleSort('status')} className="gap-2 font-semibold">
                    Status <ArrowUpDown className="h-4 w-4" />
                  </Button>
                </TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredAndSortedIssues.map((issue) => (
                <TableRow key={issue.id}>
                  <TableCell className="font-medium">{issue.title}</TableCell>
                  <TableCell className="capitalize">{issue.category}</TableCell>
                  <TableCell>{issue.location}</TableCell>
                  <TableCell>{issue.reportedBy}</TableCell>
                  <TableCell>{new Date(issue.reportedDate).toLocaleDateString()}</TableCell>
                  <TableCell>
                    <Select
                      value={issue.status}
                      onValueChange={(value) => handleStatusChange(issue.id, value as IssueStatus)}
                    >
                      <SelectTrigger className="w-32">
                        <Badge className={getStatusColor(issue.status)}>
                          {issue.status.replace("-", " ")}
                        </Badge>
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="pending">Pending</SelectItem>
                        <SelectItem value="in-progress">In Progress</SelectItem>
                        <SelectItem value="resolved">Resolved</SelectItem>
                      </SelectContent>
                    </Select>
                  </TableCell>
                  <TableCell>
                    <Button
                      variant="ghost"
                      size="icon"
                      title="View details"
                      onClick={() => setSelectedIssue(issue)}
                    >
                      <Eye className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          {filteredAndSortedIssues.length === 0 && (
            <div className="text-center py-8 text-muted-foreground">
              No issues found matching your criteria
            </div>
          )}
        </CardContent>
      </Card>

      <IssueDetailDialog
        issue={selectedIssue}
        open={!!selectedIssue}
        onOpenChange={(open) => !open && setSelectedIssue(null)}
        onUpdate={handleUpdate}
        onDelete={handleDelete}
        onAddNote={handleAddNote}
      />
    </div>
  );
};

export default AdminIssues;
