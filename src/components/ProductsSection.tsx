import { useEffect, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ShoppingBag, ArrowRight, Sparkles } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

interface Product {
  id: string;
  name: string;
  category: string;
  description: string;
  image_url: string | null;
  featured: boolean;
}

const defaultImages: { [key: string]: string } = {
  "LED Lights": "https://images.unsplash.com/photo-1565814329452-e1efa11c5b89?w=400&h=300&fit=crop",
  "Switches & Sockets": "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop",
  "MCB / DB Panels": "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=400&h=300&fit=crop",
  "Wires & Cables": "https://images.unsplash.com/photo-1509281373149-e957c6296406?w=400&h=300&fit=crop",
  "Fans": "https://images.unsplash.com/photo-1635695392513-ccc5e7e4e3b4?w=400&h=300&fit=crop",
  "Industrial Electrical Items": "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=400&h=300&fit=crop",
  "Inverter & Battery": "https://images.unsplash.com/photo-1619594455093-67f9f8a4f9b9?w=400&h=300&fit=crop",
};

const ProductsSection = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      const { data } = await supabase
        .from("products")
        .select("*")
        .order("featured", { ascending: false });
      
      if (data) {
        setProducts(data);
      }
      setIsLoading(false);
    };

    fetchProducts();
  }, []);

  const getImage = (product: Product) => {
    return product.image_url || defaultImages[product.category] || defaultImages["LED Lights"];
  };

  return (
    <section id="products" className="py-20 md:py-28 bg-background">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-yellow-accent/20 border border-yellow-accent/30 mb-6">
            <ShoppingBag className="w-4 h-4 text-yellow-accent" />
            <span className="text-sm font-medium text-foreground">Our Products</span>
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6">
            Quality <span className="text-gradient-electric">Electrical Items</span>
          </h2>
          <p className="text-lg text-muted-foreground">
            We supply premium quality electrical products from trusted brands. 
            All items come with warranty and genuine certification.
          </p>
        </div>

        {/* Products Grid */}
        {isLoading ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {[...Array(7)].map((_, i) => (
              <div key={i} className="bg-card border border-border rounded-2xl overflow-hidden animate-pulse">
                <div className="h-48 bg-secondary" />
                <div className="p-5">
                  <div className="h-4 bg-secondary rounded w-20 mb-2" />
                  <div className="h-5 bg-secondary rounded w-3/4 mb-2" />
                  <div className="h-4 bg-secondary rounded w-full" />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {products.map((product) => (
              <div
                key={product.id}
                className="group bg-card border border-border rounded-2xl overflow-hidden hover:border-primary/30 hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
              >
                {/* Product Image */}
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={getImage(product)}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-dark/60 to-transparent" />
                  <Badge className="absolute top-4 right-4 bg-primary text-primary-foreground border-0">
                    <Sparkles className="w-3 h-3 mr-1" />
                    In Stock
                  </Badge>
                </div>

                {/* Product Info */}
                <div className="p-5">
                  <h3 className="text-lg font-bold text-foreground mb-2 group-hover:text-primary transition-colors">
                    {product.name}
                  </h3>
                  <p className="text-muted-foreground text-sm mb-4">
                    {product.description}
                  </p>
                  <div className="flex items-center gap-2 text-xs">
                    <Badge variant="outline" className="border-yellow-accent/30 text-yellow-accent bg-yellow-accent/10">
                      Available at Saurabh Enterprises
                    </Badge>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* CTA Banner */}
        <div className="mt-16 relative overflow-hidden rounded-3xl bg-gradient-to-r from-primary via-electric to-electric-dark p-8 md:p-12">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cpath%20d%3D%22M54.627%200l.83.828-1.415%201.415L51.8%200h2.827zM5.373%200l-.83.828L5.96%202.243%208.2%200H5.374zM48.97%200l3.657%203.657-1.414%201.414L46.143%200h2.828zM11.03%200L7.372%203.657%208.787%205.07%2013.857%200H11.03zm32.284%200L49.8%206.485%2048.384%207.9l-7.9-7.9h2.83zM16.686%200L10.2%206.485%2011.616%207.9l7.9-7.9h-2.83zm20.97%200l9.315%209.314-1.414%201.414L34.828%200h2.83zM22.344%200L13.03%209.314l1.414%201.414L25.172%200h-2.83zM32%200l12.142%2012.142-1.414%201.414L30%20.828%2017.272%2013.556l-1.414-1.414L28%200h4zM.284%200l28%2028-1.414%201.414L0%202.544v-2.26zM0%205.373l25.456%2025.455-1.414%201.414L0%208.2V5.374zm0%205.656l22.627%2022.627-1.414%201.414L0%2013.86v-2.83zm0%205.656l19.8%2019.8-1.415%201.413L0%2019.514v-2.83zm0%205.657l16.97%2016.97-1.414%201.415L0%2025.172v-2.83zM0%2028l14.142%2014.142-1.414%201.414L0%2030.828V28z%22%20fill%3D%22%23fff%22%20fill-opacity%3D%22.05%22%2F%3E%3C%2Fsvg%3E')] opacity-50" />
          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h3 className="text-2xl md:text-3xl font-bold text-primary-foreground mb-2">
                Looking for Specific Products?
              </h3>
              <p className="text-primary-foreground/80">
                Contact us for competitive pricing and bulk orders
              </p>
            </div>
            <Button asChild size="lg" variant="secondary" className="group whitespace-nowrap">
              <a href="#contact" className="flex items-center gap-2">
                Enquire Now
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductsSection;
