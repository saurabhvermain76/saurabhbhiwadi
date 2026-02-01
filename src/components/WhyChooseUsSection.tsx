import { 
  UserCheck, 
  Award, 
  BadgeDollarSign, 
  Clock, 
  ShieldCheck, 
  MapPin 
} from "lucide-react";

const reasons = [
  {
    icon: UserCheck,
    title: "Experienced Electricians",
    description: "Skilled professionals with 10+ years of hands-on experience in all electrical work.",
  },
  {
    icon: Award,
    title: "Quality Products",
    description: "We use and supply only ISI certified, branded electrical items for lasting performance.",
  },
  {
    icon: BadgeDollarSign,
    title: "Affordable Pricing",
    description: "Competitive rates without compromising on quality. Transparent pricing, no hidden costs.",
  },
  {
    icon: Clock,
    title: "Quick Service",
    description: "Same-day response for urgent requirements. We value your time and convenience.",
  },
  {
    icon: ShieldCheck,
    title: "Safety First Approach",
    description: "Every installation follows strict safety protocols and electrical codes compliance.",
  },
  {
    icon: MapPin,
    title: "Local Trusted Firm",
    description: "Serving Bhiwadi & nearby areas with reliable service and local accountability.",
  },
];

const WhyChooseUsSection = () => {
  return (
    <section id="why-us" className="py-20 md:py-28 bg-gradient-hero relative overflow-hidden">
      {/* Background Decoration */}
      <div className="absolute top-0 left-0 w-full h-full">
        <div className="absolute top-20 right-20 w-72 h-72 bg-electric/10 rounded-full blur-3xl" />
        <div className="absolute bottom-20 left-20 w-96 h-96 bg-yellow-accent/5 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/20 border border-primary/30 mb-6">
            <Award className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-primary">Why Choose Us</span>
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-primary-foreground mb-6">
            Why <span className="text-gradient-electric">Saurabh Enterprises?</span>
          </h2>
          <p className="text-lg text-primary-foreground/70">
            We go beyond just fixing wires – we build lasting relationships with our customers 
            through quality work and honest service.
          </p>
        </div>

        {/* Reasons Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {reasons.map((reason, index) => (
            <div
              key={index}
              className="group bg-card/10 backdrop-blur-sm border border-primary-foreground/10 rounded-2xl p-8 hover:bg-card/20 hover:border-primary/30 transition-all duration-300"
            >
              <div className="w-16 h-16 rounded-2xl bg-primary/20 flex items-center justify-center mb-6 group-hover:bg-primary group-hover:glow-electric transition-all duration-300">
                <reason.icon className="w-8 h-8 text-primary group-hover:text-primary-foreground transition-colors duration-300" />
              </div>
              <h3 className="text-xl font-bold text-primary-foreground mb-3">
                {reason.title}
              </h3>
              <p className="text-primary-foreground/70 leading-relaxed">
                {reason.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUsSection;
