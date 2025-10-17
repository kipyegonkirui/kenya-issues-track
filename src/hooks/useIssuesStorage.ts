import { useState, useEffect } from 'react';
import { Issue } from '@/types/issue';

const STORAGE_KEY = 'admin_issues';

const mockIssues: Issue[] = [
  {
    id: "1",
    title: "Pothole on Moi Avenue",
    description: "Large pothole causing traffic issues and vehicle damage",
    category: "roads",
    status: "pending",
    location: "Moi Avenue, Nairobi",
    reportedBy: "John Kamau",
    reportedDate: "2025-01-10",
    notes: [],
  },
  {
    id: "2",
    title: "Water supply disruption",
    description: "No water supply for the past 3 days",
    category: "water",
    status: "in-progress",
    location: "Kilimani Estate",
    reportedBy: "Mary Wanjiru",
    reportedDate: "2025-01-08",
    assignedTo: "Water Services",
    notes: [
      {
        id: "n1",
        content: "Team dispatched to investigate",
        createdAt: "2025-01-09T10:30:00",
        createdBy: "Admin",
      }
    ],
  },
  {
    id: "3",
    title: "Street lights not working",
    description: "All street lights on Kenyatta Road are off",
    category: "electricity",
    status: "pending",
    location: "Kenyatta Road",
    reportedBy: "Ahmed Hassan",
    reportedDate: "2025-01-09",
    notes: [],
  },
  {
    id: "4",
    title: "Waste collection delayed",
    description: "Garbage has not been collected for two weeks",
    category: "waste",
    status: "resolved",
    location: "Westlands Area",
    reportedBy: "Sarah Njeri",
    reportedDate: "2025-01-05",
    assignedTo: "Waste Management",
    notes: [],
  },
];

export const useIssuesStorage = () => {
  const [issues, setIssues] = useState<Issue[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      setIssues(JSON.parse(stored));
    } else {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(mockIssues));
      setIssues(mockIssues);
    }
  }, []);

  const saveIssues = (newIssues: Issue[]) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newIssues));
    setIssues(newIssues);
  };

  const updateIssue = (id: string, updates: Partial<Issue>) => {
    const updated = issues.map(issue => 
      issue.id === id ? { ...issue, ...updates } : issue
    );
    saveIssues(updated);
  };

  const deleteIssue = (id: string) => {
    const filtered = issues.filter(issue => issue.id !== id);
    saveIssues(filtered);
  };

  const addNote = (issueId: string, content: string) => {
    const updated = issues.map(issue => {
      if (issue.id === issueId) {
        const newNote = {
          id: `note_${Date.now()}`,
          content,
          createdAt: new Date().toISOString(),
          createdBy: "Admin",
        };
        return { ...issue, notes: [...issue.notes, newNote] };
      }
      return issue;
    });
    saveIssues(updated);
  };

  return { issues, updateIssue, deleteIssue, addNote };
};
