import { useEffect, useState } from "react";
import { Image, Wrench, Package, MessageSquare, TrendingUp } from "lucide-react";
import AdminLayout from "@/components/admin/AdminLayout";
import { supabase } from "@/integrations/supabase/client";

interface Stats {
  services: number;
  products: number;
  messages: number;
  unreadMessages: number;
}

const Dashboard = () => {
  const [stats, setStats] = useState<Stats>({
    services: 0,
    products: 0,
    messages: 0,
    unreadMessages: 0,
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [servicesRes, productsRes, messagesRes, unreadRes] = await Promise.all([
          supabase.from("services").select("id", { count: "exact", head: true }),
          supabase.from("products").select("id", { count: "exact", head: true }),
          supabase.from("contact_submissions").select("id", { count: "exact", head: true }),
          supabase.from("contact_submissions").select("id", { count: "exact", head: true }).eq("is_read", false),
        ]);

        setStats({
          services: servicesRes.count || 0,
          products: productsRes.count || 0,
          messages: messagesRes.count || 0,
          unreadMessages: unreadRes.count || 0,
        });
      } catch (error) {
        console.error("Error fetching stats:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchStats();
  }, []);

  const statCards = [
    {
      title: "Total Services",
      value: stats.services,
      icon: Wrench,
      color: "bg-primary",
      href: "/admin/services",
    },
    {
      title: "Total Products",
      value: stats.products,
      icon: Package,
      color: "bg-electric",
      href: "/admin/products",
    },
    {
      title: "Total Messages",
      value: stats.messages,
      icon: MessageSquare,
      color: "bg-yellow-accent",
      href: "/admin/messages",
    },
    {
      title: "Unread Messages",
      value: stats.unreadMessages,
      icon: TrendingUp,
      color: "bg-destructive",
      href: "/admin/messages",
    },
  ];

  return (
    <AdminLayout title="Dashboard">
      <div className="space-y-8">
        {/* Welcome Section */}
        <div className="bg-gradient-to-r from-primary to-electric-dark rounded-2xl p-8 text-primary-foreground">
          <h2 className="text-2xl font-bold mb-2">Welcome back, Admin!</h2>
          <p className="text-primary-foreground/80">
            Manage your website content from this dashboard.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {statCards.map((card, index) => (
            <a
              key={index}
              href={card.href}
              className="bg-card border border-border rounded-xl p-6 hover:shadow-lg hover:border-primary/30 transition-all group"
            >
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">{card.title}</p>
                  <p className="text-3xl font-bold text-foreground">
                    {isLoading ? "-" : card.value}
                  </p>
                </div>
                <div className={`w-12 h-12 rounded-lg ${card.color} flex items-center justify-center`}>
                  <card.icon className="w-6 h-6 text-primary-foreground" />
                </div>
              </div>
            </a>
          ))}
        </div>

        {/* Quick Actions */}
        <div className="bg-card border border-border rounded-xl p-6">
          <h3 className="text-lg font-bold text-foreground mb-4">Quick Actions</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <a
              href="/admin/hero"
              className="flex items-center gap-4 p-4 rounded-lg border border-border hover:border-primary/30 hover:bg-secondary transition-all"
            >
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                <Image className="w-5 h-5 text-primary" />
              </div>
              <div>
                <p className="font-medium text-foreground">Edit Hero Section</p>
                <p className="text-sm text-muted-foreground">Update homepage banner</p>
              </div>
            </a>
            <a
              href="/admin/services"
              className="flex items-center gap-4 p-4 rounded-lg border border-border hover:border-primary/30 hover:bg-secondary transition-all"
            >
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                <Wrench className="w-5 h-5 text-primary" />
              </div>
              <div>
                <p className="font-medium text-foreground">Manage Services</p>
                <p className="text-sm text-muted-foreground">Add or edit services</p>
              </div>
            </a>
            <a
              href="/admin/products"
              className="flex items-center gap-4 p-4 rounded-lg border border-border hover:border-primary/30 hover:bg-secondary transition-all"
            >
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                <Package className="w-5 h-5 text-primary" />
              </div>
              <div>
                <p className="font-medium text-foreground">Manage Products</p>
                <p className="text-sm text-muted-foreground">Add or edit products</p>
              </div>
            </a>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default Dashboard;
