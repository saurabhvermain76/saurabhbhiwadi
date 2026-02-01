import { Phone, MessageCircle, ChevronDown, Zap, Shield, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import heroImage from "@/assets/hero-electrical.jpg";

const HeroSection = () => {
  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16 md:pt-20"
    >
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src={heroImage}
          alt="Professional electrician at work"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-hero opacity-90" />
        <div className="absolute inset-0 bg-gradient-to-r from-dark/95 via-dark/80 to-transparent" />
      </div>

      {/* Animated Glow Effects */}
      <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-electric/20 rounded-full blur-3xl animate-pulse-glow" />
      <div className="absolute bottom-1/4 left-1/4 w-64 h-64 bg-yellow-accent/10 rounded-full blur-3xl animate-float" />

      {/* Content */}
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/20 border border-primary/30 mb-6 animate-fade-in backdrop-blur-sm">
            <Zap className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-primary-foreground">Trusted Electrical Experts in Bhiwadi</span>
          </div>

          {/* Main Headline */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-primary-foreground leading-tight mb-6 animate-slide-up">
            Powering Homes & Businesses with{" "}
            <span className="text-gradient-electric">Reliable Electrical Solutions</span>
          </h1>

          {/* Subheadline */}
          <p className="text-lg md:text-xl text-primary-foreground/80 max-w-2xl mb-8 animate-slide-up" style={{ animationDelay: "0.1s" }}>
            Complete Electrical Services & Quality Electrical Items Under One Roof.
            From wiring to LED lighting – we power your world safely.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-wrap gap-4 mb-12 animate-slide-up" style={{ animationDelay: "0.2s" }}>
            <Button asChild size="lg" className="group text-base px-8 glow-electric">
              <a href="tel:+918949272586" className="flex items-center gap-2">
                <Phone className="w-5 h-5 group-hover:animate-pulse" />
                Call Now
              </a>
            </Button>
            <Button asChild variant="outline" size="lg" className="text-base px-8 bg-primary-foreground/10 border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/20 hover:text-primary-foreground">
              <a href="#contact" className="flex items-center gap-2">
                <MessageCircle className="w-5 h-5" />
                Get Free Quote
              </a>
            </Button>
          </div>

          {/* Trust Indicators */}
          <div className="flex flex-wrap gap-8 animate-slide-up" style={{ animationDelay: "0.3s" }}>
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-lg bg-primary/20 flex items-center justify-center">
                <Shield className="w-6 h-6 text-primary" />
              </div>
              <div>
                <p className="font-semibold text-primary-foreground">Safety First</p>
                <p className="text-sm text-primary-foreground/60">Licensed Experts</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-lg bg-primary/20 flex items-center justify-center">
                <Clock className="w-6 h-6 text-primary" />
              </div>
              <div>
                <p className="font-semibold text-primary-foreground">Quick Service</p>
                <p className="text-sm text-primary-foreground/60">Same Day Response</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-lg bg-yellow-accent/20 flex items-center justify-center">
                <Zap className="w-6 h-6 text-yellow-accent" />
              </div>
              <div>
                <p className="font-semibold text-primary-foreground">10+ Years</p>
                <p className="text-sm text-primary-foreground/60">Experience</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <a
        href="#about"
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-primary-foreground/60 hover:text-primary transition-colors animate-float"
      >
        <span className="text-sm font-medium">Scroll Down</span>
        <ChevronDown className="w-5 h-5" />
      </a>
    </section>
  );
};

export default HeroSection;
