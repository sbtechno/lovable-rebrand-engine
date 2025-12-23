-- Create footer_settings table for managing footer content
CREATE TABLE public.footer_settings (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  about_text TEXT NOT NULL DEFAULT 'L''École de Commerce et d''Entrepreneuriat est une institution d''enseignement supérieur et universitaire, engagée dans la formation de la nouvelle génération d''acteurs économiques.',
  phone TEXT NOT NULL DEFAULT '+509 4730 8207',
  email TEXT NOT NULL DEFAULT 'contact@ecehaiti.com',
  address TEXT NOT NULL DEFAULT 'Port-de-Paix, Haïti',
  address_detail TEXT NOT NULL DEFAULT '48, angles des rues Benito Sylvain & Boisrond Tonnerre',
  facebook_url TEXT DEFAULT '',
  instagram_url TEXT DEFAULT '',
  linkedin_url TEXT DEFAULT '',
  newsletter_title TEXT NOT NULL DEFAULT 'S''abonner à notre newsletter',
  newsletter_subtitle TEXT NOT NULL DEFAULT 'Restez informé de nos dernières actualités',
  copyright_text TEXT NOT NULL DEFAULT '© 2025 Tous droits réservés ECE - École de Commerce et d''Entrepreneuriat',
  developer_name TEXT NOT NULL DEFAULT 'Sb Techno',
  developer_url TEXT NOT NULL DEFAULT 'https://sbtechno.space',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.footer_settings ENABLE ROW LEVEL SECURITY;

-- Allow public read access (footer is visible to everyone)
CREATE POLICY "Footer settings are publicly readable"
ON public.footer_settings
FOR SELECT
USING (true);

-- Only admins can update footer settings
CREATE POLICY "Admins can update footer settings"
ON public.footer_settings
FOR UPDATE
USING (
  EXISTS (
    SELECT 1 FROM public.user_roles
    WHERE user_roles.user_id = auth.uid()
    AND user_roles.role = 'admin'
  )
);

-- Only admins can insert footer settings
CREATE POLICY "Admins can insert footer settings"
ON public.footer_settings
FOR INSERT
WITH CHECK (
  EXISTS (
    SELECT 1 FROM public.user_roles
    WHERE user_roles.user_id = auth.uid()
    AND user_roles.role = 'admin'
  )
);

-- Create trigger for updated_at
CREATE TRIGGER update_footer_settings_updated_at
BEFORE UPDATE ON public.footer_settings
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Insert default footer settings
INSERT INTO public.footer_settings (id) VALUES (gen_random_uuid());