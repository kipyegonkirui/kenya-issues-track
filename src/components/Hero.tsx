import { Link } from "react-router-dom";
import { Button } from "./ui/button";
import { AlertCircle, Eye } from "lucide-react";
import heroImage from "@/assets/hero-image.jpg";

const Hero = () => {
  return (
    <section className="relative min-h-[600px] flex items-center justify-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div 
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: `url(${heroImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-background/95 via-background/80 to-background/60" />
      </div>

      {/* Content */}
      <div className="container relative z-10 px-4 py-20">
        <div className="max-w-3xl">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
            Report Issues.
            <br />
            <span className="text-primary">Track Progress.</span>
            <br />
            Build Better Kenya.
          </h1>
          
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl">
            A transparent platform for Kenyan citizens to report infrastructure problems,
            public service delays, and community issues. Together, we make our counties better.
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            <Link to="/report">
              <Button variant="hero" size="lg" className="w-full sm:w-auto">
                <AlertCircle className="mr-2 h-5 w-5" />
                Report an Issue
              </Button>
            </Link>
            <Link to="/issues">
              <Button variant="outline" size="lg" className="w-full sm:w-auto">
                <Eye className="mr-2 h-5 w-5" />
                View All Issues
              </Button>
            </Link>
          </div>

          {/* Stats */}
          <div className="mt-12 grid grid-cols-3 gap-8 max-w-xl">
            <div>
              <div className="text-3xl font-bold text-primary">1,234</div>
              <div className="text-sm text-muted-foreground">Issues Reported</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-success">856</div>
              <div className="text-sm text-muted-foreground">Resolved</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-warning">378</div>
              <div className="text-sm text-muted-foreground">In Progress</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
