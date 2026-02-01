import { useEffect, useState } from "react";
import { Save, Upload, Trash2, Image } from "lucide-react";
import AdminLayout from "@/components/admin/AdminLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

interface HeroData {
  id: string;
  heading: string;
  subheading: string;
  cta_button_text: string;
  cta_phone: string;
  background_images: string[];
}

const HeroManager = () => {
  const { toast } = useToast();
  const [heroData, setHeroData] = useState<HeroData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [isUploading, setIsUploading] = useState(false);

  useEffect(() => {
    fetchHeroData();
  }, []);

  const fetchHeroData = async () => {
    try {
      const { data, error } = await supabase
        .from("hero_section")
        .select("*")
        .single();

      if (error) throw error;
      setHeroData(data);
    } catch (error) {
      console.error("Error fetching hero data:", error);
      toast({
        title: "Error",
        description: "Failed to load hero section data.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSave = async () => {
    if (!heroData) return;

    setIsSaving(true);
    try {
      const { error } = await supabase
        .from("hero_section")
        .update({
          heading: heroData.heading,
          subheading: heroData.subheading,
          cta_button_text: heroData.cta_button_text,
          cta_phone: heroData.cta_phone,
          background_images: heroData.background_images,
        })
        .eq("id", heroData.id);

      if (error) throw error;

      toast({
        title: "Success",
        description: "Hero section updated successfully!",
      });
    } catch (error) {
      console.error("Error saving hero data:", error);
      toast({
        title: "Error",
        description: "Failed to save changes.",
        variant: "destructive",
      });
    } finally {
      setIsSaving(false);
    }
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !heroData) return;

    setIsUploading(true);
    try {
      const fileExt = file.name.split(".").pop();
      const fileName = `hero-${Date.now()}.${fileExt}`;
      const filePath = `hero/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from("images")
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      const { data: urlData } = supabase.storage
        .from("images")
        .getPublicUrl(filePath);

      setHeroData({
        ...heroData,
        background_images: [...heroData.background_images, urlData.publicUrl],
      });

      toast({
        title: "Success",
        description: "Image uploaded successfully!",
      });
    } catch (error) {
      console.error("Error uploading image:", error);
      toast({
        title: "Error",
        description: "Failed to upload image.",
        variant: "destructive",
      });
    } finally {
      setIsUploading(false);
    }
  };

  const removeImage = (index: number) => {
    if (!heroData) return;
    const newImages = heroData.background_images.filter((_, i) => i !== index);
    setHeroData({ ...heroData, background_images: newImages });
  };

  if (isLoading) {
    return (
      <AdminLayout title="Hero Section">
        <div className="flex items-center justify-center h-64">
          <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin" />
        </div>
      </AdminLayout>
    );
  }

  if (!heroData) {
    return (
      <AdminLayout title="Hero Section">
        <div className="text-center py-12">
          <p className="text-muted-foreground">No hero section data found.</p>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout title="Hero Section">
      <div className="max-w-4xl space-y-8">
        {/* Form */}
        <div className="bg-card border border-border rounded-xl p-6 space-y-6">
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Heading
            </label>
            <Textarea
              value={heroData.heading}
              onChange={(e) => setHeroData({ ...heroData, heading: e.target.value })}
              rows={2}
              className="resize-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Subheading
            </label>
            <Textarea
              value={heroData.subheading}
              onChange={(e) => setHeroData({ ...heroData, subheading: e.target.value })}
              rows={2}
              className="resize-none"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                CTA Button Text
              </label>
              <Input
                value={heroData.cta_button_text}
                onChange={(e) => setHeroData({ ...heroData, cta_button_text: e.target.value })}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                CTA Phone Number
              </label>
              <Input
                value={heroData.cta_phone}
                onChange={(e) => setHeroData({ ...heroData, cta_phone: e.target.value })}
              />
            </div>
          </div>

          {/* Background Images */}
          <div>
            <label className="block text-sm font-medium text-foreground mb-4">
              Background Images
            </label>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
              {heroData.background_images.map((img, index) => (
                <div key={index} className="relative group">
                  <img
                    src={img}
                    alt={`Hero background ${index + 1}`}
                    className="w-full h-24 object-cover rounded-lg border border-border"
                  />
                  <button
                    onClick={() => removeImage(index)}
                    className="absolute top-2 right-2 w-6 h-6 bg-destructive rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <Trash2 className="w-3 h-3 text-destructive-foreground" />
                  </button>
                </div>
              ))}
              
              {/* Upload Button */}
              <label className="w-full h-24 border-2 border-dashed border-border rounded-lg flex flex-col items-center justify-center cursor-pointer hover:border-primary/50 transition-colors">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                  disabled={isUploading}
                />
                {isUploading ? (
                  <div className="w-6 h-6 border-2 border-primary border-t-transparent rounded-full animate-spin" />
                ) : (
                  <>
                    <Upload className="w-6 h-6 text-muted-foreground mb-1" />
                    <span className="text-xs text-muted-foreground">Upload</span>
                  </>
                )}
              </label>
            </div>
          </div>

          {/* Save Button */}
          <div className="flex justify-end pt-4 border-t border-border">
            <Button onClick={handleSave} disabled={isSaving}>
              <Save className="w-4 h-4 mr-2" />
              {isSaving ? "Saving..." : "Save Changes"}
            </Button>
          </div>
        </div>

        {/* Preview */}
        <div className="bg-card border border-border rounded-xl p-6">
          <h3 className="text-lg font-bold text-foreground mb-4 flex items-center gap-2">
            <Image className="w-5 h-5" />
            Preview
          </h3>
          <div className="bg-dark rounded-lg p-8 text-center">
            <h2 className="text-2xl font-bold text-primary-foreground mb-2">
              {heroData.heading}
            </h2>
            <p className="text-primary-foreground/70 mb-4">{heroData.subheading}</p>
            <div className="inline-block bg-primary text-primary-foreground px-4 py-2 rounded-lg font-medium">
              {heroData.cta_button_text} → {heroData.cta_phone}
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default HeroManager;
