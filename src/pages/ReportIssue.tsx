import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navigation from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import { AlertCircle, Upload } from "lucide-react";

// County to wards mapping
const countyWards: Record<string, string[]> = {
  "Nairobi": ["Westlands", "Dagoretti North", "Dagoretti South", "Langata", "Kibra", "Roysambu", "Kasarani", "Ruaraka", "Embakasi South", "Embakasi North", "Embakasi Central", "Embakasi East", "Embakasi West", "Makadara", "Kamukunji", "Starehe", "Mathare"],
  "Mombasa": ["Changamwe", "Jomvu", "Kisauni", "Nyali", "Likoni", "Mvita"],
  "Kisumu": ["Kisumu East", "Kisumu West", "Kisumu Central", "Seme", "Nyando", "Muhoroni", "Nyakach"],
  "Nakuru": ["Nakuru Town East", "Nakuru Town West", "Bahati", "Gilgil", "Kuresoi North", "Kuresoi South", "Molo", "Naivasha", "Njoro", "Rongai", "Subukia"],
  "Uasin Gishu": ["Ainabkoi", "Kapseret", "Kesses", "Moiben", "Soy", "Turbo"],
  "Kiambu": ["Gatundu North", "Gatundu South", "Githunguri", "Juja", "Kabete", "Kiambaa", "Kiambu", "Kikuyu", "Limuru", "Ruiru", "Thika Town", "Lari"],
  "Kakamega": ["Butere", "Kakamega Central", "Kakamega East", "Kakamega North", "Kakamega South", "Khwisero", "Likuyani", "Lugari", "Lurambi", "Matete", "Matungu", "Mumias East", "Mumias West", "Navakholo", "Shinyalu"],
  "Machakos": ["Athi River", "Kangundo", "Kathiani", "Machakos Town", "Masinga", "Matungulu", "Mavoko", "Mwala", "Yatta"],
  "Meru": ["Buuri", "Central Imenti", "Igembe Central", "Igembe North", "Igembe South", "Imenti North", "Imenti South", "Tigania East", "Tigania West"],
  "Nyeri": ["Kieni", "Mathira", "Mukurweini", "Nyeri Town", "Othaya", "Tetu"],
  "Bungoma": ["Bumula", "Kabuchai", "Kanduyi", "Kimilili", "Mt. Elgon", "Sirisia", "Tongaren", "Webuye East", "Webuye West"],
  "Kilifi": ["Genze", "Kaloleni", "Kilifi North", "Kilifi South", "Magarini", "Malindi", "Rabai"],
  "Trans Nzoia": ["Cherangany", "Endebess", "Kiminini", "Kwanza", "Saboti"],
  "Kajiado": ["Kajiado Central", "Kajiado East", "Kajiado North", "Kajiado South", "Kajiado West"],
  "Busia": ["Budalangi", "Butula", "Funyula", "Nambale", "Teso North", "Teso South"],
  // Add more counties as needed
  "Baringo": ["Baringo Central", "Baringo North", "Baringo South", "Eldama Ravine", "Mogotio", "Tiaty"],
  "Bomet": ["Bomet Central", "Bomet East", "Chepalungu", "Konoin", "Sotik"],
  "Embu": ["Manyatta", "Mbeere North", "Mbeere South", "Runyenjes"],
  "Garissa": ["Balambala", "Dadaab", "Fafi", "Garissa Township", "Hulugho", "Ijara", "Lagdera Constituency"],
  "Homa Bay": ["Homa Bay Town", "Kabondo Kasipul", "Karachuonyo", "Kasipul", "Mbita", "Ndhiwa", "Rangwe", "Suba"],
  "Isiolo": ["Central", "Garbatulla", "Merti", "North"],
  "Kericho": ["Ainamoi", "Belgut", "Bureti", "Kipkelion East", "Kipkelion West", "Soin/Sigowet"],
  "Kirinyaga": ["Kirinyaga Central", "Kirinyaga East", "Kirinyaga West", "Mwea"],
  "Kisii": ["Bonchari", "Bomachoge Borabu", "Bobasi", "Bomachoge Chache", "Kitutu Chache North", "Kitutu Chache South", "Nyaribari Chache", "Nyaribari Masaba", "South Mugirango"],
  "Kwale": ["Kinango", "Lungalunga", "Matuga", "Msambweni"],
  "Laikipia": ["Laikipia East", "Laikipia North", "Laikipia West"],
  "Lamu": ["Lamu East", "Lamu West"],
  "Makueni": ["Kaiti", "Kibwezi East", "Kibwezi West", "Kilome", "Makueni", "Mbooni"],
  "Mandera": ["Banissa", "Lafey", "Mandera East", "Mandera North", "Mandera South", "Mandera West"],
  "Marsabit": ["Laisamis", "Moyale", "North Horr", "Saku"],
  "Migori": ["Awendo", "Kuria East", "Kuria West", "Mabera", "Ntimaru", "Rongo", "Suna East", "Suna West", "Uriri"],
  "Murang'a": ["Kandara", "Kangema", "Kigumo", "Kiharu", "Mathioya", "Maragwa"],
  "Narok": ["Narok East", "Narok North", "Narok South", "Narok West", "Transmara East", "Transmara West"],
  "Nandi": ["Aldai", "Chesumei", "Emgwen", "Mosop", "Nandi Hills", "Tinderet"],
  "Nyandarua": ["Kinangop", "Kipipiri", "Ndaragwa", "Ol Jorok", "Ol Kalou"],
  "Nyamira": ["Borabu", "Kitutu Masaba", "North Mugirango", "West Mugirango"],
  "Samburu": ["Samburu Central", "Samburu East", "Samburu North"],
  "Siaya": ["Alego Usonga", "Bondo", "Gem", "Rarieda", "Ugenya", "Ugunja"],
  "Taita Taveta": ["Mwatate", "Taveta", "Voi", "Wundanyi"],
  "Tana River": ["Bura", "Galole", "Garsen"],
  "Tharaka Nithi": ["Chuka/Igambang'ombe", "Maara", "Tharaka"],
  "Turkana": ["Loima", "Turkana Central", "Turkana East", "Turkana North", "Turkana South", "Turkana West"],
  "Vihiga": ["Emuhaya", "Hamisi", "Luanda", "Sabatia", "Vihiga"],
  "Wajir": ["Eldas", "Tarbaj", "Wajir East", "Wajir North", "Wajir South", "Wajir West"],
  "West Pokot": ["Kapenguria", "Kacheliba", "Pokot South", "Sigor"],
  "Elgeyo Marakwet": ["Keiyo North", "Keiyo South", "Marakwet East", "Marakwet West"],
};

const COUNTIES = Object.keys(countyWards).sort();

const ReportIssue = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    county: "",
    constituency: "",
    location: "",
    reportedBy: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    if (!formData.title || !formData.description || !formData.category || !formData.county || !formData.constituency || !formData.reportedBy) {
      toast.error("Please fill in all required fields");
      return;
    }

    // In production, this would send data to a backend
    toast.success("Issue reported successfully!");
    
    // Redirect to issues page
    setTimeout(() => {
      navigate("/issues");
    }, 1500);
  };

  const handleChange = (field: string, value: string) => {
    setFormData(prev => {
      // Reset constituency when county changes
      if (field === "county") {
        return { ...prev, [field]: value, constituency: "" };
      }
      return { ...prev, [field]: value };
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="container px-4 py-12">
        <div className="max-w-3xl mx-auto">
          <div className="mb-8">
            <h1 className="text-4xl font-bold mb-2">Report an Issue</h1>
            <p className="text-muted-foreground">
              Help improve your community by reporting issues. Your report will be reviewed and assigned to the appropriate authorities.
            </p>
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertCircle className="h-5 w-5" />
                Issue Details
              </CardTitle>
              <CardDescription>
                Please provide as much detail as possible to help us address the issue quickly.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
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

                <div className="space-y-2">
                  <Label htmlFor="category">Category *</Label>
                  <Select value={formData.category} onValueChange={(value) => handleChange("category", value)}>
                    <SelectTrigger id="category">
                      <SelectValue placeholder="Select a category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="roads">Roads & Infrastructure</SelectItem>
                      <SelectItem value="water">Water Supply</SelectItem>
                      <SelectItem value="electricity">Electricity</SelectItem>
                      <SelectItem value="waste">Waste Management</SelectItem>
                      <SelectItem value="health">Health Services</SelectItem>
                      <SelectItem value="education">Education</SelectItem>
                      <SelectItem value="security">Security</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="county">County *</Label>
                  <Select value={formData.county} onValueChange={(value) => handleChange("county", value)}>
                    <SelectTrigger id="county">
                      <SelectValue placeholder="Select your county" />
                    </SelectTrigger>
                    <SelectContent>
                      {COUNTIES.map((county) => (
                        <SelectItem key={county} value={county}>
                          {county}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="constituency">Constituency *</Label>
                  <Select 
                    value={formData.constituency} 
                    onValueChange={(value) => handleChange("constituency", value)}
                    disabled={!formData.county}
                  >
                    <SelectTrigger id="constituency">
                      <SelectValue placeholder={formData.county ? "Select your constituency" : "Select county first"} />
                    </SelectTrigger>
                    <SelectContent>
                      {formData.county && countyWards[formData.county]?.map((constituency) => (
                        <SelectItem key={constituency} value={constituency}>
                          {constituency}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="location">Specific Location (Optional)</Label>
                  <Input
                    id="location"
                    placeholder="e.g., Near Moi Avenue Junction, opposite City Hall"
                    value={formData.location}
                    onChange={(e) => handleChange("location", e.target.value)}
                  />
                  <p className="text-xs text-muted-foreground">
                    Add landmarks or street names for more precise location
                  </p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Description *</Label>
                  <Textarea
                    id="description"
                    placeholder="Provide detailed information about the issue, including how it affects the community"
                    rows={6}
                    value={formData.description}
                    onChange={(e) => handleChange("description", e.target.value)}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="photo">Photo (Optional)</Label>
                  <div className="border-2 border-dashed rounded-lg p-8 text-center hover:border-primary transition-colors cursor-pointer">
                    <Upload className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
                    <p className="text-sm text-muted-foreground">
                      Click to upload or drag and drop
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">
                      PNG, JPG up to 10MB
                    </p>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="reportedBy">Your Name *</Label>
                  <Input
                    id="reportedBy"
                    placeholder="Full name"
                    value={formData.reportedBy}
                    onChange={(e) => handleChange("reportedBy", e.target.value)}
                    required
                  />
                </div>

                <div className="bg-muted/50 p-4 rounded-lg">
                  <p className="text-sm text-muted-foreground">
                    * Required fields. By submitting this report, you confirm that the information provided is accurate to the best of your knowledge.
                  </p>
                </div>

                <div className="flex gap-4">
                  <Button type="submit" variant="hero" size="lg" className="flex-1">
                    Submit Report
                  </Button>
                  <Button type="button" variant="outline" size="lg" onClick={() => navigate("/issues")}>
                    Cancel
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
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

export default ReportIssue;
