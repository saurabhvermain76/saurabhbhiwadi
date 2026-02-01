-- Create role enum
CREATE TYPE public.app_role AS ENUM ('admin', 'user');

-- Create user_roles table for role management
CREATE TABLE public.user_roles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
    role app_role NOT NULL DEFAULT 'user',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL,
    UNIQUE (user_id, role)
);

-- Enable RLS on user_roles
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

-- Create security definer function to check admin role
CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS BOOLEAN
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.user_roles
    WHERE user_id = auth.uid()
      AND role = 'admin'
  )
$$;

-- Create hero_section table
CREATE TABLE public.hero_section (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    heading TEXT NOT NULL DEFAULT 'Powering Homes & Businesses with Reliable Electrical Solutions',
    subheading TEXT NOT NULL DEFAULT 'Complete Electrical Services & Quality Electrical Items Under One Roof',
    cta_button_text TEXT NOT NULL DEFAULT 'Call Now',
    cta_phone TEXT NOT NULL DEFAULT '+91 8949272586',
    background_images TEXT[] DEFAULT ARRAY[]::TEXT[],
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL
);

-- Enable RLS on hero_section
ALTER TABLE public.hero_section ENABLE ROW LEVEL SECURITY;

-- Create services table
CREATE TABLE public.services (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title TEXT NOT NULL,
    description TEXT NOT NULL,
    image_url TEXT,
    status TEXT NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'inactive')),
    sort_order INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL
);

-- Enable RLS on services
ALTER TABLE public.services ENABLE ROW LEVEL SECURITY;

-- Create products table
CREATE TABLE public.products (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    category TEXT NOT NULL,
    description TEXT NOT NULL,
    image_url TEXT,
    featured BOOLEAN DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL
);

-- Enable RLS on products
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;

-- Create contact_submissions table
CREATE TABLE public.contact_submissions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    phone TEXT NOT NULL,
    message TEXT NOT NULL,
    is_read BOOLEAN DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL
);

-- Enable RLS on contact_submissions
ALTER TABLE public.contact_submissions ENABLE ROW LEVEL SECURITY;

-- RLS Policies for user_roles
CREATE POLICY "Admins can view all roles" ON public.user_roles
    FOR SELECT USING (public.is_admin());

CREATE POLICY "Admins can manage roles" ON public.user_roles
    FOR ALL USING (public.is_admin());

-- RLS Policies for hero_section
CREATE POLICY "Anyone can view hero section" ON public.hero_section
    FOR SELECT USING (true);

CREATE POLICY "Admins can manage hero section" ON public.hero_section
    FOR ALL USING (public.is_admin());

-- RLS Policies for services
CREATE POLICY "Anyone can view active services" ON public.services
    FOR SELECT USING (status = 'active' OR public.is_admin());

CREATE POLICY "Admins can manage services" ON public.services
    FOR ALL USING (public.is_admin());

-- RLS Policies for products
CREATE POLICY "Anyone can view products" ON public.products
    FOR SELECT USING (true);

CREATE POLICY "Admins can manage products" ON public.products
    FOR ALL USING (public.is_admin());

-- RLS Policies for contact_submissions
CREATE POLICY "Anyone can submit contact form" ON public.contact_submissions
    FOR INSERT WITH CHECK (true);

CREATE POLICY "Admins can view contact submissions" ON public.contact_submissions
    FOR SELECT USING (public.is_admin());

CREATE POLICY "Admins can delete contact submissions" ON public.contact_submissions
    FOR DELETE USING (public.is_admin());

CREATE POLICY "Admins can update contact submissions" ON public.contact_submissions
    FOR UPDATE USING (public.is_admin());

-- Create storage bucket for images
INSERT INTO storage.buckets (id, name, public) VALUES ('images', 'images', true);

-- Storage policies
CREATE POLICY "Anyone can view images" ON storage.objects
    FOR SELECT USING (bucket_id = 'images');

CREATE POLICY "Admins can upload images" ON storage.objects
    FOR INSERT WITH CHECK (bucket_id = 'images' AND public.is_admin());

CREATE POLICY "Admins can update images" ON storage.objects
    FOR UPDATE USING (bucket_id = 'images' AND public.is_admin());

CREATE POLICY "Admins can delete images" ON storage.objects
    FOR DELETE USING (bucket_id = 'images' AND public.is_admin());

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create triggers for updated_at
CREATE TRIGGER update_hero_section_updated_at
    BEFORE UPDATE ON public.hero_section
    FOR EACH ROW
    EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_services_updated_at
    BEFORE UPDATE ON public.services
    FOR EACH ROW
    EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_products_updated_at
    BEFORE UPDATE ON public.products
    FOR EACH ROW
    EXECUTE FUNCTION public.update_updated_at_column();

-- Insert default hero section data
INSERT INTO public.hero_section (heading, subheading, cta_button_text, cta_phone)
VALUES (
    'Powering Homes & Businesses with Reliable Electrical Solutions',
    'Complete Electrical Services & Quality Electrical Items Under One Roof',
    'Call Now',
    '+91 8949272586'
);

-- Insert default services
INSERT INTO public.services (title, description, image_url, status, sort_order) VALUES
('House & Commercial Wiring', 'Complete wiring solutions for residential and commercial buildings with safety compliance.', NULL, 'active', 1),
('Electrical Repair & Maintenance', 'Quick and reliable repair services for all your electrical issues and regular maintenance.', NULL, 'active', 2),
('MCB, DB Panel Installation', 'Professional installation of MCB boxes, distribution boards, and electrical panels.', NULL, 'active', 3),
('LED Lights & Decorative Lighting', 'Modern LED solutions and decorative lighting for homes, offices, and events.', NULL, 'active', 4),
('Inverter & UPS Installation', 'Power backup solutions with inverter and UPS installation and maintenance services.', NULL, 'active', 5),
('Industrial Electrical Work', 'Heavy-duty electrical solutions for factories and industrial establishments.', NULL, 'active', 6),
('Fault Finding & Safety Solutions', 'Expert diagnosis of electrical faults and implementation of safety measures.', NULL, 'active', 7),
('Earthing & Load Management', 'Proper earthing installation and load balancing for optimal electrical safety.', NULL, 'active', 8);

-- Insert default products
INSERT INTO public.products (name, category, description, image_url, featured) VALUES
('LED Bulbs & Tube Lights', 'LED Lights', 'Energy-efficient lighting that lasts 25,000+ hours', NULL, true),
('Modular Switches & Sockets', 'Switches & Sockets', 'Sleek designs with enhanced safety features', NULL, true),
('MCB, RCCB & Distribution Boards', 'MCB / DB Panels', 'Protection against overload and short circuits', NULL, true),
('Wires & Cables', 'Wires & Cables', 'ISI certified for maximum safety and durability', NULL, true),
('Ceiling & Exhaust Fans', 'Fans', 'High-speed performance with low power consumption', NULL, true),
('Industrial Electrical Accessories', 'Industrial Electrical Items', 'Heavy-duty components for commercial use', NULL, false),
('Inverters & Batteries', 'Inverter & Battery', 'Reliable backup power for uninterrupted supply', NULL, true);