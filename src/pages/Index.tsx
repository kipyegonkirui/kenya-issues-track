import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertCircle, Eye, CheckCircle, TrendingUp } from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <Hero />
      
      {/* Features Section */}
      <section className="py-20 bg-muted/30">
        <div className="container px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">How It Works</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Our platform makes it easy to report, track, and resolve community issues
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card>
              <CardHeader>
                <AlertCircle className="h-12 w-12 text-primary mb-4" />
                <CardTitle>Report Issues</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Easily submit reports about infrastructure problems, service delays, or community concerns with photos and location details.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <Eye className="h-12 w-12 text-info mb-4" />
                <CardTitle>Track Progress</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Monitor the status of reported issues in real-time. See when issues are acknowledged, being worked on, or resolved.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CheckCircle className="h-12 w-12 text-success mb-4" />
                <CardTitle>Get Results</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Issues are assigned to relevant authorities and tracked until resolution. Transparency builds accountability.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Impact Section */}
      <section className="py-20">
        <div className="container px-4">
          <div className="bg-gradient-hero rounded-2xl p-12 text-primary-foreground">
            <div className="max-w-3xl mx-auto text-center">
              <TrendingUp className="h-16 w-16 mx-auto mb-6" />
              <h2 className="text-4xl font-bold mb-4">Making a Real Impact</h2>
              <p className="text-lg opacity-90 mb-8">
                Every report matters. Together, we're creating more responsive local governments
                and building stronger, safer communities across Kenya.
              </p>
              <div className="grid grid-cols-3 gap-8 max-w-2xl mx-auto">
                <div>
                  <div className="text-4xl font-bold mb-2">47</div>
                  <div className="text-sm opacity-80">Counties Active</div>
                </div>
                <div>
                  <div className="text-4xl font-bold mb-2">15K+</div>
                  <div className="text-sm opacity-80">Active Users</div>
                </div>
                <div>
                  <div className="text-4xl font-bold mb-2">69%</div>
                  <div className="text-sm opacity-80">Resolution Rate</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t py-8">
        <div className="container px-4 text-center text-muted-foreground">
          <p>&copy; 2025 Kenya Issues. Empowering citizens for better communities.</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
