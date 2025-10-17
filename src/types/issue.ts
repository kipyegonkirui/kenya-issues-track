export type IssueStatus = 'pending' | 'in-progress' | 'resolved';
export type IssueCategory = 'roads' | 'water' | 'electricity' | 'waste' | 'security' | 'other';
export type Department = 'Roads & Infrastructure' | 'Water Services' | 'Electricity Board' | 'Waste Management' | 'Security' | 'Unassigned';

export interface IssueNote {
  id: string;
  content: string;
  createdAt: string;
  createdBy: string;
}

export interface Issue {
  id: string;
  title: string;
  description?: string;
  category: IssueCategory;
  status: IssueStatus;
  location: string;
  reportedBy: string;
  reportedDate: string;
  assignedTo?: Department;
  notes: IssueNote[];
  imageUrl?: string;
}
