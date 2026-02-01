import { 
  Home, 
  Wrench, 
  Layout, 
  Lightbulb, 
  Battery, 
  Factory, 
  Search, 
  Shield,
  ArrowRight 
} from "lucide-react";
import { Button } from "@/components/ui/button";

const services = [
  {
    icon: Home,
    title: "House & Commercial Wiring",
    description: "Complete wiring solutions for residential and commercial buildings with safety compliance.",
  },
  {
    icon: Wrench,
    title: "Electrical Repair & Maintenance",
    description: "Quick and reliable repair services for all your electrical issues and regular maintenance.",
  },
  {
    icon: Layout,
    title: "MCB, DB Panel Installation",
    description: "Professional installation of MCB boxes, distribution boards, and electrical panels.",
  },
  {
    icon: Lightbulb,
    title: "LED Lights & Decorative Lighting",
    description: "Modern LED solutions and decorative lighting for homes, offices, and events.",
  },
  {
    icon: Battery,
    title: "Inverter & UPS Installation",
    description: "Power backup solutions with inverter and UPS installation and maintenance services.",
  },
  {
    icon: Factory,
    title: "Industrial Electrical Work",
    description: "Heavy-duty electrical solutions for factories and industrial establishments.",
  },
  {
    icon: Search,
    title: "Fault Finding & Safety Solutions",
    description: "Expert diagnosis of electrical faults and implementation of safety measures.",
  },
  {
    icon: Shield,
    title: "Earthing & Load Management",
    description: "Proper earthing installation and load balancing for optimal electrical safety.",
  },
];

const ServicesSection = () => {
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
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, index) => (
            <div
              key={index}
              className="group bg-card border border-border rounded-2xl p-6 hover:border-primary/30 hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
            >
              <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-5 group-hover:bg-primary group-hover:glow-electric transition-all duration-300">
                <service.icon className="w-7 h-7 text-primary group-hover:text-primary-foreground transition-colors duration-300" />
              </div>
              <h3 className="text-xl font-bold text-foreground mb-3 group-hover:text-primary transition-colors">
                {service.title}
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                {service.description}
              </p>
            </div>
          ))}
        </div>

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
