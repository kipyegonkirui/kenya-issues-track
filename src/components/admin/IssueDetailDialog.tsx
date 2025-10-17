import { useState } from "react";
import { Issue, Department, IssueStatus } from "@/types/issue";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { MapPin, Calendar, User, Trash2 } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

interface IssueDetailDialogProps {
  issue: Issue | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onUpdate: (id: string, updates: Partial<Issue>) => void;
  onDelete: (id: string) => void;
  onAddNote: (issueId: string, content: string) => void;
}

const departments: Department[] = [
  'Unassigned',
  'Roads & Infrastructure',
  'Water Services',
  'Electricity Board',
  'Waste Management',
  'Security',
];

const getStatusColor = (status: IssueStatus) => {
  const colors = {
    pending: "bg-warning/10 text-warning hover:bg-warning/20",
    "in-progress": "bg-info/10 text-info hover:bg-info/20",
    resolved: "bg-success/10 text-success hover:bg-success/20",
  };
  return colors[status];
};

export const IssueDetailDialog = ({
  issue,
  open,
  onOpenChange,
  onUpdate,
  onDelete,
  onAddNote,
}: IssueDetailDialogProps) => {
  const [newNote, setNewNote] = useState("");
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);

  if (!issue) return null;

  const handleAddNote = () => {
    if (newNote.trim()) {
      onAddNote(issue.id, newNote.trim());
      setNewNote("");
    }
  };

  const handleDelete = () => {
    onDelete(issue.id);
    setShowDeleteDialog(false);
    onOpenChange(false);
  };

  return (
    <>
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-2xl">{issue.title}</DialogTitle>
          </DialogHeader>

          <div className="space-y-6">
            {/* Basic Info */}
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <User className="h-4 w-4" />
                <span>Reported by {issue.reportedBy}</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Calendar className="h-4 w-4" />
                <span>{new Date(issue.reportedDate).toLocaleDateString()}</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <MapPin className="h-4 w-4" />
                <span>{issue.location}</span>
              </div>
            </div>

            {issue.description && (
              <div>
                <Label className="text-base font-semibold">Description</Label>
                <p className="mt-2 text-sm text-muted-foreground">{issue.description}</p>
              </div>
            )}

            {issue.imageUrl && (
              <div>
                <Label className="text-base font-semibold">Image</Label>
                <img src={issue.imageUrl} alt="Issue" className="mt-2 rounded-lg w-full max-h-64 object-cover" />
              </div>
            )}

            <Separator />

            {/* Management Controls */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="status">Status</Label>
                <Select
                  value={issue.status}
                  onValueChange={(value) => onUpdate(issue.id, { status: value as IssueStatus })}
                >
                  <SelectTrigger id="status" className="mt-2">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="in-progress">In Progress</SelectItem>
                    <SelectItem value="resolved">Resolved</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="department">Assigned Department</Label>
                <Select
                  value={issue.assignedTo || 'Unassigned'}
                  onValueChange={(value) => onUpdate(issue.id, { assignedTo: value as Department })}
                >
                  <SelectTrigger id="department" className="mt-2">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {departments.map(dept => (
                      <SelectItem key={dept} value={dept}>{dept}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-sm font-medium">Category:</span>
              <Badge variant="outline" className="capitalize">{issue.category}</Badge>
              <span className="text-sm font-medium ml-4">Status:</span>
              <Badge className={getStatusColor(issue.status)}>
                {issue.status.replace("-", " ")}
              </Badge>
            </div>

            <Separator />

            {/* Notes Section */}
            <div>
              <Label className="text-base font-semibold">Internal Notes</Label>
              
              {issue.notes.length > 0 ? (
                <div className="mt-3 space-y-3">
                  {issue.notes.map(note => (
                    <div key={note.id} className="bg-muted/50 p-3 rounded-lg">
                      <p className="text-sm">{note.content}</p>
                      <div className="mt-2 text-xs text-muted-foreground">
                        {note.createdBy} - {new Date(note.createdAt).toLocaleString()}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="mt-2 text-sm text-muted-foreground">No notes yet</p>
              )}

              <div className="mt-4 space-y-2">
                <Textarea
                  placeholder="Add internal note..."
                  value={newNote}
                  onChange={(e) => setNewNote(e.target.value)}
                  rows={3}
                />
                <Button onClick={handleAddNote} disabled={!newNote.trim()}>
                  Add Note
                </Button>
              </div>
            </div>

            <Separator />

            {/* Actions */}
            <div className="flex justify-between">
              <Button
                variant="destructive"
                onClick={() => setShowDeleteDialog(true)}
                className="gap-2"
              >
                <Trash2 className="h-4 w-4" />
                Delete Issue
              </Button>
              <Button onClick={() => onOpenChange(false)}>Close</Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Issue?</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete this issue? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};
