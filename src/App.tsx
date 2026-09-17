import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Pages
import Index from "./pages/Index";
import Issues from "./pages/Issues";
import IssueDetail from "./pages/IssueDetail";
import ReportIssue from "./pages/ReportIssue";
import ForumPage from "@/pages/ForumPage";
import WardDashboard from "@/pages/WardDashboard";
import CountyAdminDashboard from "@/pages/CountyAdminDashboard";
import AccountabilityPage from "@/pages/AccountabilityPage";
import Profile from "@/pages/Profile";


// import IssueDetails from "@/pages/IssueDetails";
import MyIssues from "@/pages/my-issues";
import NotFound from "./pages/NotFound";

// Admin pages
import AdminLogin from "@/pages/admin/AdminLogin";
import AdminDashboard from "@/pages/admin/AdminDashboard";
import AdminIssues from "@/pages/admin/AdminIssues";
import AdminLayout from "@/pages/admin/AdminLayout";
import AdminUsers from "@/pages/admin/AdminUsers";
import AdminArchivedIssues from "@/pages/admin/AdminArchivedIssues";
import AdminSettings from "@/pages/admin/AdminSettings";


import NotAuthorized from "@/pages/NotAuthorized";
import AdminRoute from "@/components/AdminRoute"; // ✅ ensure this exists
import WardOfficerRoute from "@/components/WardOfficerRoute";
import CountyAdminRoute from "@/components/CountyAdminRoute";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          {/* Public routes */}
          <Route path="/" element={<Index />} />
          <Route path="/issues" element={<Issues />} />
          <Route path="/issues/:id" element={<IssueDetail />} />
          <Route path="/report" element={<ReportIssue />} />
          <Route path="/forum" element={<ForumPage />} />
          <Route path="/accountability" element={<AccountabilityPage />} />

          {/* <Route path="/issues/:id" element={<IssueDetails />} /> */}
          <Route path="/my-issues" element={<MyIssues />} />
          <Route path="/profile" element={<Profile />} />

          {/* Staff login (separate from the citizen sign-up modal) */}
          <Route path="/admin/login" element={<AdminLogin />} />

          {/* Ward Officer */}
          <Route
            path="/ward"
            element={
              <WardOfficerRoute>
                <WardDashboard />
              </WardOfficerRoute>
            }
          />

          {/* County Admin */}
          <Route
            path="/county-admin"
            element={
              <CountyAdminRoute>
                <CountyAdminDashboard />
              </CountyAdminRoute>
            }
          />

          {/* Admin routes */}
          <Route
            path="/admin"
            element={
              <AdminRoute>
                <AdminLayout />
              </AdminRoute>
            }
          >
            <Route index element={<AdminDashboard />} />
            <Route path="dashboard" element={<AdminDashboard />} />
            <Route path="issues" element={<AdminIssues />} />
            <Route path="users" element={<AdminUsers />} />
            <Route path="archive" element={<AdminArchivedIssues />} /> {/* ✅ Fixed */}
            <Route path="analytics" element={<div>Analytics</div>} />
            <Route path="settings" element={<AdminSettings />} />
          </Route>


          {/* Not authorized page */}
          <Route path="/not-authorized" element={<NotAuthorized />} />

          {/* Catch-all */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
