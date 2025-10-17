import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertCircle, CheckCircle, Clock, Users } from "lucide-react";

const AdminDashboard = () => {
  // Mock statistics - will be replaced with real data
  const stats = [
    {
      title: "Total Issues",
      value: "156",
      icon: AlertCircle,
      color: "text-blue-500",
      bgColor: "bg-blue-500/10",
    },
    {
      title: "Pending",
      value: "42",
      icon: Clock,
      color: "text-warning",
      bgColor: "bg-warning/10",
    },
    {
      title: "In Progress",
      value: "38",
      icon: Clock,
      color: "text-info",
      bgColor: "bg-info/10",
    },
    {
      title: "Resolved",
      value: "76",
      icon: CheckCircle,
      color: "text-success",
      bgColor: "bg-success/10",
    },
  ];

  const recentIssues = [
    { id: "1", title: "Pothole on Moi Avenue", status: "pending", date: "2025-01-10" },
    { id: "2", title: "Water supply disruption", status: "in-progress", date: "2025-01-08" },
    { id: "3", title: "Street lights not working", status: "pending", date: "2025-01-09" },
    { id: "4", title: "Uncollected garbage", status: "resolved", date: "2025-01-05" },
  ];

  const getStatusBadge = (status: string) => {
    const styles = {
      pending: "bg-warning/10 text-warning border-warning/20",
      "in-progress": "bg-info/10 text-info border-info/20",
      resolved: "bg-success/10 text-success border-success/20",
    };
    return styles[status as keyof typeof styles] || styles.pending;
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold mb-2">Dashboard</h1>
        <p className="text-muted-foreground">Overview of all issues and statistics</p>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.title}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
              <div className={`p-2 rounded-lg ${stat.bgColor}`}>
                <stat.icon className={`h-4 w-4 ${stat.color}`} />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Recent Issues */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Issues</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentIssues.map((issue) => (
              <div
                key={issue.id}
                className="flex items-center justify-between p-4 border rounded-lg hover:bg-accent/50 transition-colors"
              >
                <div className="flex-1">
                  <p className="font-medium">{issue.title}</p>
                  <p className="text-sm text-muted-foreground">Reported on {issue.date}</p>
                </div>
                <span
                  className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusBadge(
                    issue.status
                  )}`}
                >
                  {issue.status.replace("-", " ")}
                </span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminDashboard;
