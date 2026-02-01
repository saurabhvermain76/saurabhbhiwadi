import { useEffect, useState } from "react";
import { Plus, Edit2, Trash2, Save, X, Upload, GripVertical } from "lucide-react";
import AdminLayout from "@/components/admin/AdminLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

interface Service {
  id: string;
  title: string;
  description: string;
  image_url: string | null;
  status: string;
  sort_order: number;
}

const ServicesManager = () => {
  const { toast } = useToast();
  const [services, setServices] = useState<Service[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [isAdding, setIsAdding] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    image_url: "",
    status: "active",
  });
  const [isUploading, setIsUploading] = useState(false);

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    try {
      const { data, error } = await supabase
        .from("services")
        .select("*")
        .order("sort_order");

      if (error) throw error;
      setServices(data || []);
    } catch (error) {
      console.error("Error fetching services:", error);
      toast({
        title: "Error",
        description: "Failed to load services.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    try {
      const fileExt = file.name.split(".").pop();
      const fileName = `service-${Date.now()}.${fileExt}`;
      const filePath = `services/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from("images")
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      const { data: urlData } = supabase.storage
        .from("images")
        .getPublicUrl(filePath);

      setFormData({ ...formData, image_url: urlData.publicUrl });

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

  const handleSave = async () => {
    if (!formData.title || !formData.description) {
      toast({
        title: "Error",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }

    try {
      if (editingId) {
        const { error } = await supabase
          .from("services")
          .update({
            title: formData.title,
            description: formData.description,
            image_url: formData.image_url || null,
            status: formData.status,
          })
          .eq("id", editingId);

        if (error) throw error;
        toast({ title: "Success", description: "Service updated successfully!" });
      } else {
        const { error } = await supabase.from("services").insert({
          title: formData.title,
          description: formData.description,
          image_url: formData.image_url || null,
          status: formData.status,
          sort_order: services.length + 1,
        });

        if (error) throw error;
        toast({ title: "Success", description: "Service added successfully!" });
      }

      resetForm();
      fetchServices();
    } catch (error) {
      console.error("Error saving service:", error);
      toast({
        title: "Error",
        description: "Failed to save service.",
        variant: "destructive",
      });
    }
  };

  const handleEdit = (service: Service) => {
    setEditingId(service.id);
    setFormData({
      title: service.title,
      description: service.description,
      image_url: service.image_url || "",
      status: service.status,
    });
    setIsAdding(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this service?")) return;

    try {
      const { error } = await supabase.from("services").delete().eq("id", id);

      if (error) throw error;
      toast({ title: "Success", description: "Service deleted successfully!" });
      fetchServices();
    } catch (error) {
      console.error("Error deleting service:", error);
      toast({
        title: "Error",
        description: "Failed to delete service.",
        variant: "destructive",
      });
    }
  };

  const toggleStatus = async (id: string, currentStatus: string) => {
    const newStatus = currentStatus === "active" ? "inactive" : "active";
    try {
      const { error } = await supabase
        .from("services")
        .update({ status: newStatus })
        .eq("id", id);

      if (error) throw error;
      fetchServices();
    } catch (error) {
      console.error("Error toggling status:", error);
    }
  };

  const resetForm = () => {
    setFormData({ title: "", description: "", image_url: "", status: "active" });
    setEditingId(null);
    setIsAdding(false);
  };

  if (isLoading) {
    return (
      <AdminLayout title="Services">
        <div className="flex items-center justify-center h-64">
          <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin" />
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout title="Services">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <p className="text-muted-foreground">
            {services.length} service{services.length !== 1 ? "s" : ""} total
          </p>
          <Button onClick={() => setIsAdding(true)} disabled={isAdding}>
            <Plus className="w-4 h-4 mr-2" />
            Add Service
          </Button>
        </div>

        {/* Add/Edit Form */}
        {isAdding && (
          <div className="bg-card border border-border rounded-xl p-6 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-bold text-foreground">
                {editingId ? "Edit Service" : "Add New Service"}
              </h3>
              <button onClick={resetForm} className="text-muted-foreground hover:text-foreground">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Title *
                </label>
                <Input
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="Service title"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Status
                </label>
                <div className="flex items-center gap-2 h-10">
                  <Switch
                    checked={formData.status === "active"}
                    onCheckedChange={(checked) =>
                      setFormData({ ...formData, status: checked ? "active" : "inactive" })
                    }
                  />
                  <span className="text-sm text-muted-foreground">
                    {formData.status === "active" ? "Active" : "Inactive"}
                  </span>
                </div>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Description *
              </label>
              <Textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Service description"
                rows={3}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Image
              </label>
              <div className="flex items-center gap-4">
                {formData.image_url && (
                  <img
                    src={formData.image_url}
                    alt="Preview"
                    className="w-20 h-20 object-cover rounded-lg border border-border"
                  />
                )}
                <label className="flex items-center gap-2 px-4 py-2 border border-border rounded-lg cursor-pointer hover:bg-secondary transition-colors">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                    disabled={isUploading}
                  />
                  <Upload className="w-4 h-4" />
                  {isUploading ? "Uploading..." : "Upload Image"}
                </label>
              </div>
            </div>

            <div className="flex justify-end gap-3 pt-4 border-t border-border">
              <Button variant="outline" onClick={resetForm}>
                Cancel
              </Button>
              <Button onClick={handleSave}>
                <Save className="w-4 h-4 mr-2" />
                {editingId ? "Update" : "Add"} Service
              </Button>
            </div>
          </div>
        )}

        {/* Services List */}
        <div className="bg-card border border-border rounded-xl overflow-hidden">
          <div className="grid grid-cols-12 gap-4 p-4 bg-secondary text-sm font-medium text-muted-foreground border-b border-border">
            <div className="col-span-1"></div>
            <div className="col-span-4">Service</div>
            <div className="col-span-4">Description</div>
            <div className="col-span-1">Status</div>
            <div className="col-span-2 text-right">Actions</div>
          </div>

          {services.length === 0 ? (
            <div className="p-8 text-center text-muted-foreground">
              No services found. Add your first service!
            </div>
          ) : (
            services.map((service) => (
              <div
                key={service.id}
                className="grid grid-cols-12 gap-4 p-4 items-center border-b border-border last:border-0 hover:bg-secondary/50 transition-colors"
              >
                <div className="col-span-1">
                  <GripVertical className="w-5 h-5 text-muted-foreground cursor-grab" />
                </div>
                <div className="col-span-4 flex items-center gap-3">
                  {service.image_url ? (
                    <img
                      src={service.image_url}
                      alt={service.title}
                      className="w-10 h-10 object-cover rounded-lg"
                    />
                  ) : (
                    <div className="w-10 h-10 bg-secondary rounded-lg flex items-center justify-center">
                      <span className="text-muted-foreground text-xs">No img</span>
                    </div>
                  )}
                  <span className="font-medium text-foreground">{service.title}</span>
                </div>
                <div className="col-span-4 text-sm text-muted-foreground truncate">
                  {service.description}
                </div>
                <div className="col-span-1">
                  <Switch
                    checked={service.status === "active"}
                    onCheckedChange={() => toggleStatus(service.id, service.status)}
                  />
                </div>
                <div className="col-span-2 flex justify-end gap-2">
                  <button
                    onClick={() => handleEdit(service)}
                    className="p-2 text-muted-foreground hover:text-primary transition-colors"
                  >
                    <Edit2 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleDelete(service.id)}
                    className="p-2 text-muted-foreground hover:text-destructive transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </AdminLayout>
  );
};

export default ServicesManager;
