import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navigation from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import AuthModal from "@/components/AuthModal";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import { AlertCircle, Sparkles } from "lucide-react";
import { auth } from "@/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { addIssue } from "@/lib/issues";
import { aiCategorize, aiEnhanceDescription } from "@/lib/aiApi";
import { counties, County, Constituency } from "@/lib/counties";
import { getCategoryConfig } from "@/lib/departments";
import { db } from "@/firebase";
import { collection, getDocs } from "firebase/firestore";

const ReportIssue = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<any>(null);
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [pendingSubmit, setPendingSubmit] = useState(false);
  const [loadingAI, setLoadingAI] = useState(false);

  const [selectedCounty, setSelectedCounty] = useState<County | null>(null);
  const [selectedConstituency, setSelectedConstituency] = useState<Constituency | null>(null);
  const [liveDepartments, setLiveDepartments] = useState<string[]>([]);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    county: "",
    countyId: "",
    constituency: "",
    constituencyId: "",
    ward: "",
    wardId: "",
    location: "",
    reportedBy: "",
  });

  // ✅ Fetch the live department list from Firestore (kept in sync with
  // whatever an admin has actually seeded/renamed via Admin → Settings or
  // Admin → Users), rather than trusting the static category→department
  // config file to always match reality.
  useEffect(() => {
    const fetchDepartments = async () => {
      try {
        const snap = await getDocs(collection(db, "departments"));
        setLiveDepartments(snap.docs.map((d) => d.data().name).filter(Boolean));
      } catch (error) {
        console.error("Error fetching departments:", error);
      }
    };
    fetchDepartments();
  }, []);

  // Resolve which department the selected category routes to, verified
  // against the live list. If the configured name doesn't exist anymore
  // (e.g. an admin renamed/removed it), fall back to the catch-all
  // department instead of silently routing to a department that no longer
  // exists — and warn in the console so it gets noticed and fixed.
  const routedDepartment = (() => {
    if (!formData.category) return null;
    const configured = getCategoryConfig(formData.category).department;
    if (liveDepartments.length === 0) return configured; // haven't loaded yet — best guess
    if (liveDepartments.includes(configured)) return configured;

    const fallback = getCategoryConfig("other").department;
    console.warn(
      `[ReportIssue] Configured department "${configured}" for category "${formData.category}" ` +
      `was not found in the live departments list. Falling back to "${fallback}". ` +
      `An admin likely renamed or removed a department — update src/lib/departments.ts to match.`
    );
    return liveDepartments.includes(fallback) ? fallback : null;
  })();

  // ✅ Watch Auth State
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        setFormData((prev) => ({
          ...prev,
          reportedBy: currentUser.displayName || currentUser.email || "",
        }));
      }
    });
    return () => unsubscribe();
  }, []);

  // ✅ Input handler
  const handleChange = (field: string, value: string) =>
    setFormData((prev) => ({ ...prev, [field]: value }));

  // ✅ County change
  const handleCountyChange = (countyId: string) => {
    const county = counties.find((c) => c.id === countyId) || null;
    setSelectedCounty(county);
    setSelectedConstituency(null);
    setFormData((prev) => ({
      ...prev,
      county: county?.name || "",
      countyId: county?.id || "",
      constituency: "",
      constituencyId: "",
      ward: "",
      wardId: "",
    }));
  };

  // ✅ Constituency change
  const handleConstituencyChange = (constituencyId: string) => {
    const constituency =
      selectedCounty?.constituencies.find((c) => c.id === constituencyId) || null;
    setSelectedConstituency(constituency);
    setFormData((prev) => ({
      ...prev,
      constituency: constituency?.name || "",
      constituencyId: constituency?.id || "",
      ward: "",
      wardId: "",
    }));
  };

  // ✅ Ward change
  const handleWardChange = (wardId: string) => {
    const ward =
      selectedConstituency?.wards.find((w) => w.id === wardId)?.name || "";
    setFormData((prev) => ({ ...prev, ward, wardId }));
  };

  // ✅ AI Categorization
  const handleAICategorize = async () => {
    if (!formData.description) {
      toast.error("Please write a short description first.");
      return;
    }

    try {
      setLoadingAI(true);
      const data = await aiCategorize(formData.description);

      handleChange("category", data.category || "");
      toast.success(`AI suggests category: ${data.category}`);
    } catch (err) {
      console.error("AI categorize error:", err);
      toast.error("Failed to auto-categorize issue.");
    } finally {
      setLoadingAI(false);
    }
  };

  // ✅ AI Enhance Description
  const handleEnhanceDescription = async () => {
    if (!formData.description) {
      toast.error("Please add a description to enhance.");
      return;
    }

    try {
      setLoadingAI(true);
      const data = await aiEnhanceDescription(formData.description);

      handleChange("description", data.enhanced || "");
      toast.success("Description improved by AI ✨");
    } catch (err) {
      console.error("AI enhance error:", err);
      toast.error("Failed to enhance description.");
    } finally {
      setLoadingAI(false);
    }
  };

  // ✅ Submit handler
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!user) {
      toast.error("You must log in to submit an issue.");
      setPendingSubmit(true);
      setAuthModalOpen(true);
      return;
    }

    if (
      !formData.title ||
      !formData.description ||
      !formData.category ||
      !formData.county ||
      !formData.constituency ||
      !formData.ward
    ) {
      toast.error("Please fill in all required fields.");
      return;
    }

    try {
      await addIssue({
        ...formData,
        reportedBy: formData.reportedBy || user.email,
        reporterEmail: user.email,
        userId: user.uid,
        department: routedDepartment,
      });

      toast.success("✅ Issue reported successfully!");
      setTimeout(() => navigate("/issues"), 1500);
    } catch (error) {
      console.error("Firestore error:", error);
      toast.error("Failed to report issue. Please try again.");
    }
  };

  // ✅ Handle Auth Success
  const handleAuthSuccess = (loggedInUser: any) => {
    setUser(loggedInUser);
    setFormData((prev) => ({
      ...prev,
      reportedBy: loggedInUser.email || "",
    }));
    setAuthModalOpen(false);

    if (pendingSubmit) {
      setPendingSubmit(false);
      toast.success("Logged in successfully. Submitting your issue...");
      setTimeout(() => handleSubmit(new Event("submit") as any), 800);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <div className="container px-4 py-12">
        <div className="max-w-3xl mx-auto">
          <div className="mb-8">
            <h1 className="text-4xl font-bold mb-2">Report an Issue</h1>
            <p className="text-muted-foreground">
              Help improve your community by reporting issues. You can view
              existing reports without logging in, but you must sign in to
              submit a new one.
            </p>
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertCircle className="h-5 w-5" />
                Issue Details
              </CardTitle>
              <CardDescription>
                Provide as much detail as possible to help address the issue quickly.
              </CardDescription>
            </CardHeader>

            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Title */}
                <div className="space-y-2">
                  <Label htmlFor="title">Issue Title *</Label>
                  <Input
                    id="title"
                    placeholder="Brief description of the issue"
                    value={formData.title}
                    onChange={(e) => handleChange("title", e.target.value)}
                    required
                  />
                </div>

                {/* Description with AI Buttons */}
                <div className="space-y-2">
                  <Label htmlFor="description">Description *</Label>
                  <Textarea
                    id="description"
                    rows={6}
                    placeholder="Describe the issue in detail"
                    value={formData.description}
                    onChange={(e) => handleChange("description", e.target.value)}
                    required
                  />
                  <div className="flex gap-2 mt-2">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={handleAICategorize}
                      disabled={loadingAI}
                    >
                      <Sparkles className="w-4 h-4 mr-1" />
                      AI Categorize
                    </Button>
                    <Button
                      type="button"
                      variant="outline"
                      onClick={handleEnhanceDescription}
                      disabled={loadingAI}
                    >
                      <Sparkles className="w-4 h-4 mr-1" />
                      AI Enhance
                    </Button>
                  </div>
                </div>

                {/* Category */}
                <div className="space-y-2">
                  <Label>Category *</Label>
                  <Select
                    value={formData.category}
                    onValueChange={(value) => handleChange("category", value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select a category" />
                    </SelectTrigger>
                    <SelectContent>
                      {[
                        "roads",
                        "water",
                        "electricity",
                        "waste",
                        "health",
                        "education",
                        "security",
                        "other",
                      ].map((cat) => (
                        <SelectItem key={cat} value={cat}>
                          {cat.charAt(0).toUpperCase() + cat.slice(1)}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {formData.category && (
                    <p className="text-sm text-muted-foreground">
                      {routedDepartment
                        ? <>This will be routed to the <b>{routedDepartment}</b>.</>
                        : "Couldn't confirm which department handles this category — it'll still be reported, just flagged for manual routing."}
                    </p>
                  )}
                </div>

                {/* County */}
                <div className="space-y-2">
                  <Label>County *</Label>
                  <Select
                    value={selectedCounty?.id || ""}
                    onValueChange={handleCountyChange}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select your county" />
                    </SelectTrigger>
                    <SelectContent>
                      {counties.map((county) => (
                        <SelectItem key={county.id} value={county.id}>
                          {county.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Constituency */}
                <div className="space-y-2">
                  <Label>Constituency *</Label>
                  <Select
                    value={selectedConstituency?.id || ""}
                    onValueChange={handleConstituencyChange}
                    disabled={!selectedCounty}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select constituency" />
                    </SelectTrigger>
                    <SelectContent>
                      {selectedCounty?.constituencies.map((c) => (
                        <SelectItem key={c.id} value={c.id}>
                          {c.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Ward */}
                <div className="space-y-2">
                  <Label>Ward *</Label>
                  <Select
                    value={
                      selectedConstituency?.wards.find(
                        (w) => w.name === formData.ward
                      )?.id || ""
                    }
                    onValueChange={handleWardChange}
                    disabled={!selectedConstituency}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select ward" />
                    </SelectTrigger>
                    <SelectContent>
                      {selectedConstituency?.wards.map((w) => (
                        <SelectItem key={w.id} value={w.id}>
                          {w.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Location */}
                <div className="space-y-2">
                  <Label>Specific Location (Optional)</Label>
                  <Input
                    placeholder="e.g., Near Moi Avenue Junction"
                    value={formData.location}
                    onChange={(e) => handleChange("location", e.target.value)}
                  />
                </div>

                {/* Reporter */}
                <div className="space-y-2">
                  <Label>Your Name</Label>
                  <Input
                    placeholder="Auto-filled when logged in"
                    value={formData.reportedBy}
                    readOnly
                  />
                </div>

                <div className="flex gap-4">
                  <Button type="submit" className="flex-1">
                    Submit Report
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => navigate("/issues")}
                  >
                    Cancel
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>

      <AuthModal
        open={authModalOpen}
        onClose={() => setAuthModalOpen(false)}
        onSuccess={handleAuthSuccess}
      />

      <footer className="border-t py-8 mt-12">
        <div className="container px-4 text-center text-muted-foreground">
          <p>&copy; 2025 Kenya Issues. Empowering citizens for better communities.</p>
        </div>
      </footer>
    </div>
  );
};

export default ReportIssue;
