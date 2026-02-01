import { useState } from "react";
import { Zap, Shield, AlertCircle, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { supabase } from "@/integrations/supabase/client";

const AdminSetup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }

    setIsLoading(true);

    try {
      const { data, error: fnError } = await supabase.functions.invoke("setup-admin", {
        body: { email, password },
      });

      if (fnError) {
        throw fnError;
      }

      if (data.error) {
        setError(data.error);
      } else {
        setSuccess(true);
      }
    } catch (err: any) {
      setError(err.message || "Failed to create admin user");
    } finally {
      setIsLoading(false);
    }
  };

  if (success) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-hero p-4">
        <div className="w-full max-w-md bg-card border border-border rounded-2xl p-8 text-center">
          <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-8 h-8 text-primary" />
          </div>
          <h2 className="text-2xl font-bold text-foreground mb-2">Admin Created!</h2>
          <p className="text-muted-foreground mb-6">
            Your admin account has been set up successfully. You can now login.
          </p>
          <Button asChild className="w-full">
            <a href="/admin">Go to Admin Login</a>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-hero p-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-3">
            <div className="w-14 h-14 rounded-xl bg-primary flex items-center justify-center glow-electric">
              <Zap className="w-8 h-8 text-primary-foreground" />
            </div>
            <div className="text-left">
              <h1 className="font-bold text-2xl text-primary-foreground">Saurabh Enterprises</h1>
              <p className="text-sm text-primary-foreground/60">Admin Setup</p>
            </div>
          </div>
        </div>

        {/* Setup Form */}
        <div className="bg-card border border-border rounded-2xl p-8">
          <div className="flex items-center gap-3 mb-6">
            <Shield className="w-6 h-6 text-primary" />
            <h2 className="text-xl font-bold text-foreground">Create Admin Account</h2>
          </div>

          <p className="text-muted-foreground mb-6 text-sm">
            This is a one-time setup to create the admin account for your website.
          </p>

          {error && (
            <div className="mb-6 p-4 rounded-lg bg-destructive/10 border border-destructive/20 flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-destructive flex-shrink-0 mt-0.5" />
              <p className="text-sm text-destructive">{error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Admin Email
              </label>
              <Input
                type="email"
                placeholder="admin@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Admin Password
              </label>
              <Input
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                minLength={6}
              />
              <p className="text-xs text-muted-foreground mt-1">
                Minimum 6 characters
              </p>
            </div>

            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? "Creating Admin..." : "Create Admin Account"}
            </Button>
          </form>
        </div>

        <p className="text-center mt-6 text-primary-foreground/60 text-sm">
          <a href="/" className="hover:text-primary transition-colors">
            ← Back to Website
          </a>
        </p>
      </div>
    </div>
  );
};

export default AdminSetup;
