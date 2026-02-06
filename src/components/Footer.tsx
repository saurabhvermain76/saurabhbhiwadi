import { Zap, Phone, MapPin, ArrowUp } from "lucide-react";

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="bg-dark text-primary-foreground">
      <div className="container mx-auto px-4">
        {/* Main Footer */}
        <div className="py-16 grid md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="lg:col-span-2">
            <a href="#home" className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-xl bg-primary flex items-center justify-center">
                <Zap className="w-7 h-7 text-primary-foreground" />
              </div>
              <div>
                <h3 className="font-bold text-xl">Saurabh Enterprises</h3>
                <p className="text-sm text-primary-foreground/60">Electrical Solutions</p>
              </div>
            </a>
            <p className="text-primary-foreground/70 mb-6 max-w-md leading-relaxed">
              Your trusted partner for complete electrical services and quality electrical 
              items. Serving Bhiwadi and nearby areas with reliable and safe solutions.
            </p>
            <div className="flex items-center gap-2 text-sm text-primary-foreground/60">
              <MapPin className="w-4 h-4" />
              Serving Bhiwadi & Nearby Areas
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-bold text-lg mb-6">Quick Links</h4>
            <ul className="space-y-3">
              {[
                { href: "#home", label: "Home" },
                { href: "#about", label: "About Us" },
                { href: "#services", label: "Services" },
                { href: "#products", label: "Products" },
                { href: "#contact", label: "Contact" },
              ].map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-primary-foreground/70 hover:text-primary transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-bold text-lg mb-6">Contact Us</h4>
            <div className="space-y-4">
              <a
                href="tel:+919667000377"
                className="flex items-center gap-3 text-primary-foreground/70 hover:text-primary transition-colors"
              >
                <Phone className="w-5 h-5" />
                +91 9667000377
              </a>
              <div className="flex items-start gap-3 text-primary-foreground/70">
                <MapPin className="w-5 h-5 flex-shrink-0 mt-1" />
                <span>
                  C-28, Ganpati Plaza, Phool Bagh,<br />
                  Bhiwadi, Rajasthan – 301019
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="py-6 border-t border-primary-foreground/10 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-primary-foreground/60 text-center md:text-left">
            © {new Date().getFullYear()} Saurabh Enterprises. All rights reserved.
          </p>
          <button
            onClick={scrollToTop}
            className="flex items-center gap-2 text-sm text-primary-foreground/60 hover:text-primary transition-colors"
          >
            Back to Top
            <ArrowUp className="w-4 h-4" />
          </button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
