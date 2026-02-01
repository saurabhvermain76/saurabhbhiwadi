import { useEffect, useState } from "react";
import { 
  Home, 
  Wrench, 
  Layout, 
  Lightbulb, 
  Battery, 
  Factory, 
  Search, 
  Shield,
  ArrowRight,
  LucideIcon
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";

interface Service {
  id: string;
  title: string;
  description: string;
  image_url: string | null;
}

const iconMap: { [key: string]: LucideIcon } = {
  "House & Commercial Wiring": Home,
  "Electrical Repair & Maintenance": Wrench,
  "MCB, DB Panel Installation": Layout,
  "LED Lights & Decorative Lighting": Lightbulb,
  "Inverter & UPS Installation": Battery,
  "Industrial Electrical Work": Factory,
  "Fault Finding & Safety Solutions": Search,
  "Earthing & Load Management": Shield,
};

const ServicesSection = () => {
  const [services, setServices] = useState<Service[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchServices = async () => {
      const { data } = await supabase
        .from("services")
        .select("id, title, description, image_url")
        .eq("status", "active")
        .order("sort_order");
      
      if (data) {
        setServices(data);
      }
      setIsLoading(false);
    };

    fetchServices();
  }, []);

  const getIcon = (title: string) => {
    return iconMap[title] || Wrench;
  };

  return (
    <section id="services" className="py-20 md:py-28 bg-secondary">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6">
            <Wrench className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-primary">Our Services</span>
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6">
            Complete <span className="text-gradient-electric">Electrical Solutions</span>
          </h2>
          <p className="text-lg text-muted-foreground">
            From residential wiring to industrial installations, we provide comprehensive 
            electrical services that keep your spaces powered safely and efficiently.
          </p>
        </div>

        {/* Services Grid */}
        {isLoading ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="bg-card border border-border rounded-2xl p-6 animate-pulse">
                <div className="w-14 h-14 rounded-xl bg-secondary mb-5" />
                <div className="h-6 bg-secondary rounded mb-3 w-3/4" />
                <div className="h-4 bg-secondary rounded w-full" />
                <div className="h-4 bg-secondary rounded w-2/3 mt-2" />
              </div>
            ))}
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((service) => {
              const IconComponent = getIcon(service.title);
              return (
                <div
                  key={service.id}
                  className="group bg-card border border-border rounded-2xl p-6 hover:border-primary/30 hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                >
                  <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-5 group-hover:bg-primary group-hover:glow-electric transition-all duration-300">
                    <IconComponent className="w-7 h-7 text-primary group-hover:text-primary-foreground transition-colors duration-300" />
                  </div>
                  <h3 className="text-xl font-bold text-foreground mb-3 group-hover:text-primary transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {service.description}
                  </p>
                </div>
              );
            })}
          </div>
        )}

        {/* CTA */}
        <div className="text-center mt-12">
          <Button asChild size="lg" className="group">
            <a href="#contact" className="flex items-center gap-2">
              Request a Service
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
