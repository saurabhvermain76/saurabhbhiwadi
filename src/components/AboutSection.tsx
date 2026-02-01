import { CheckCircle, Zap, Users, Award } from "lucide-react";

const AboutSection = () => {
  const highlights = [
    { icon: Users, label: "500+ Happy Customers" },
    { icon: Award, label: "10+ Years Experience" },
    { icon: Zap, label: "24/7 Emergency Support" },
    { icon: CheckCircle, label: "100% Satisfaction" },
  ];

  return (
    <section id="about" className="py-20 md:py-28 bg-background">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Content */}
          <div className="animate-slide-up">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6">
              <Zap className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium text-primary">About Us</span>
            </div>

            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6">
              About <span className="text-gradient-electric">Saurabh Enterprises</span>
            </h2>

            <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
              Saurabh Enterprises is a trusted electrical firm based in Bhiwadi, Rajasthan, 
              providing complete electrical solutions for homes, shops, factories, and commercial spaces.
            </p>

            <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
              We specialize in safe wiring, modern electrical installations, maintenance, and supply 
              of high-quality electrical items. Our team of experienced electricians ensures every 
              project meets the highest safety standards while delivering exceptional value.
            </p>

            {/* Highlights Grid */}
            <div className="grid grid-cols-2 gap-4">
              {highlights.map((item, index) => (
                <div
                  key={index}
                  className="flex items-center gap-3 p-4 rounded-xl bg-secondary border border-border hover:border-primary/30 transition-all duration-300 hover:shadow-lg"
                >
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <item.icon className="w-5 h-5 text-primary" />
                  </div>
                  <span className="font-medium text-foreground text-sm">{item.label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Stats/Visual */}
          <div className="relative">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-4">
                <div className="bg-gradient-to-br from-primary to-electric-dark p-8 rounded-2xl text-center">
                  <p className="text-5xl font-bold text-primary-foreground mb-2">10+</p>
                  <p className="text-primary-foreground/80 font-medium">Years Experience</p>
                </div>
                <div className="bg-card border border-border p-8 rounded-2xl text-center shadow-lg">
                  <p className="text-5xl font-bold text-foreground mb-2">500+</p>
                  <p className="text-muted-foreground font-medium">Projects Done</p>
                </div>
              </div>
              <div className="space-y-4 pt-8">
                <div className="bg-card border border-border p-8 rounded-2xl text-center shadow-lg">
                  <p className="text-5xl font-bold text-foreground mb-2">24/7</p>
                  <p className="text-muted-foreground font-medium">Support Available</p>
                </div>
                <div className="bg-gradient-to-br from-yellow-accent to-accent p-8 rounded-2xl text-center">
                  <p className="text-5xl font-bold text-accent-foreground mb-2">100%</p>
                  <p className="text-accent-foreground/80 font-medium">Safe Solutions</p>
                </div>
              </div>
            </div>

            {/* Decorative Element */}
            <div className="absolute -z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-primary/5 rounded-full blur-3xl" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
