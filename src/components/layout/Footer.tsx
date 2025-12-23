import { Link } from "react-router-dom";
import { Facebook, Instagram, Linkedin, Phone, Mail, MapPin } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import eceLogo from "@/assets/ece-logo-transparent.png";

interface FooterSettings {
  about_text: string;
  phone: string;
  email: string;
  address: string;
  address_detail: string;
  facebook_url: string | null;
  instagram_url: string | null;
  linkedin_url: string | null;
  newsletter_title: string;
  newsletter_subtitle: string;
  copyright_text: string;
  developer_name: string;
  developer_url: string;
}

const defaultSettings: FooterSettings = {
  about_text: "L'École de Commerce et d'Entrepreneuriat est une institution d'enseignement supérieur et universitaire, engagée dans la formation de la nouvelle génération d'acteurs économiques.",
  phone: "+509 4730 8207",
  email: "contact@ecehaiti.com",
  address: "Port-de-Paix, Haïti",
  address_detail: "48, angles des rues Benito Sylvain & Boisrond Tonnerre",
  facebook_url: null,
  instagram_url: null,
  linkedin_url: null,
  newsletter_title: "S'abonner à notre newsletter",
  newsletter_subtitle: "Restez informé de nos dernières actualités",
  copyright_text: "© 2025 Tous droits réservés ECE - École de Commerce et d'Entrepreneuriat",
  developer_name: "Sb Techno",
  developer_url: "https://sbtechno.space",
};

export function Footer() {
  const { data: settings } = useQuery({
    queryKey: ["footer-settings"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("footer_settings")
        .select("*")
        .single();

      if (error) {
        console.error("Error fetching footer settings:", error);
        return defaultSettings;
      }
      return data as FooterSettings;
    },
    staleTime: 1000 * 60 * 5, // Cache for 5 minutes
  });

  const footerData = settings || defaultSettings;

  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="container py-16 px-4 sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* About section */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <img
                src={eceLogo}
                alt="ECE - École de Commerce et d'Entrepreneuriat"
                className="h-20 w-auto object-contain bg-white/90 rounded-lg p-2"
                loading="lazy"
              />
            </div>
            <p className="text-primary-foreground/80 text-sm leading-relaxed">
              {footerData.about_text}
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="font-display font-semibold text-lg">Mes Liens</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-primary-foreground/80 hover:text-secondary transition-colors text-sm">
                  Accueil
                </Link>
              </li>
              <li>
                <Link to="/a-propos" className="text-primary-foreground/80 hover:text-secondary transition-colors text-sm">
                  À propos
                </Link>
              </li>
              <li>
                <Link to="/programmes" className="text-primary-foreground/80 hover:text-secondary transition-colors text-sm">
                  Nos Programmes
                </Link>
              </li>
              <li>
                <Link to="/recherche" className="text-primary-foreground/80 hover:text-secondary transition-colors text-sm">
                  Recherche Académique
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal Links */}
          <div className="space-y-4">
            <h3 className="font-display font-semibold text-lg">Liens Rapides</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/inscription" className="text-primary-foreground/80 hover:text-secondary transition-colors text-sm">
                  Inscription
                </Link>
              </li>
              <li>
                <Link to="/politique-confidentialite" className="text-primary-foreground/80 hover:text-secondary transition-colors text-sm">
                  Politique de confidentialité
                </Link>
              </li>
              <li>
                <Link to="/conditions-generales" className="text-primary-foreground/80 hover:text-secondary transition-colors text-sm">
                  Conditions générales
                </Link>
              </li>
              <li>
                <Link to="/faq" className="text-primary-foreground/80 hover:text-secondary transition-colors text-sm">
                  FAQ
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div className="space-y-4">
            <h3 className="font-display font-semibold text-lg">Contact</h3>
            <ul className="space-y-3">
              <li className="flex items-center gap-3">
                <Phone className="h-4 w-4 text-secondary" />
                <a href={`tel:${footerData.phone.replace(/\s/g, '')}`} className="text-primary-foreground/80 hover:text-secondary transition-colors text-sm">
                  {footerData.phone}
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="h-4 w-4 text-secondary" />
                <a href={`mailto:${footerData.email}`} className="text-primary-foreground/80 hover:text-secondary transition-colors text-sm">
                  {footerData.email}
                </a>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="h-4 w-4 text-secondary mt-0.5" />
                <span className="text-primary-foreground/80 text-sm">
                  {footerData.address}<br />
                  {footerData.address_detail}
                </span>
              </li>
            </ul>

            {/* Social links */}
            <div className="flex items-center gap-4 pt-2">
              {footerData.facebook_url && (
                <a href={footerData.facebook_url} target="_blank" rel="noopener noreferrer" className="text-primary-foreground/80 hover:text-secondary transition-colors" aria-label="Facebook">
                  <Facebook className="h-5 w-5" />
                </a>
              )}
              {footerData.instagram_url && (
                <a href={footerData.instagram_url} target="_blank" rel="noopener noreferrer" className="text-primary-foreground/80 hover:text-secondary transition-colors" aria-label="Instagram">
                  <Instagram className="h-5 w-5" />
                </a>
              )}
              {footerData.linkedin_url && (
                <a href={footerData.linkedin_url} target="_blank" rel="noopener noreferrer" className="text-primary-foreground/80 hover:text-secondary transition-colors" aria-label="LinkedIn">
                  <Linkedin className="h-5 w-5" />
                </a>
              )}
              {!footerData.facebook_url && !footerData.instagram_url && !footerData.linkedin_url && (
                <>
                  <a href="#" className="text-primary-foreground/80 hover:text-secondary transition-colors" aria-label="Facebook">
                    <Facebook className="h-5 w-5" />
                  </a>
                  <a href="#" className="text-primary-foreground/80 hover:text-secondary transition-colors" aria-label="Instagram">
                    <Instagram className="h-5 w-5" />
                  </a>
                  <a href="#" className="text-primary-foreground/80 hover:text-secondary transition-colors" aria-label="LinkedIn">
                    <Linkedin className="h-5 w-5" />
                  </a>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Newsletter */}
        <div className="mt-12 pt-8 border-t border-primary-foreground/20">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div>
              <h4 className="font-display font-semibold text-lg mb-1">{footerData.newsletter_title}</h4>
              <p className="text-primary-foreground/70 text-sm">{footerData.newsletter_subtitle}</p>
            </div>
            <form className="flex flex-col sm:flex-row gap-3 w-full md:w-auto max-w-full">
              <Input
                type="email"
                placeholder="Votre email"
                className="bg-primary-foreground/10 border-primary-foreground/20 text-primary-foreground placeholder:text-primary-foreground/50 w-full sm:min-w-64 min-w-0"
              />
              <Button variant="secondary" className="w-full sm:w-auto">S'abonner</Button>
            </form>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-8 pt-8 border-t border-primary-foreground/20 text-center">
          <p className="text-primary-foreground/70 text-sm">
            {footerData.copyright_text} | Développé Par{" "}
            <a href={footerData.developer_url} target="_blank" rel="noopener noreferrer" className="hover:text-secondary transition-colors">
              {footerData.developer_name}
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
