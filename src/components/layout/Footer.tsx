import { Link } from "react-router-dom";
import { Facebook, Instagram, Linkedin, Phone, Mail, MapPin } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export function Footer() {
  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="container py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* About section */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-secondary flex items-center justify-center">
                <span className="text-secondary-foreground font-display font-bold text-xl">L</span>
              </div>
              <div className="flex flex-col">
                <span className="font-display font-bold text-xl">Lovable</span>
                <span className="text-xs text-primary-foreground/70 italic">plus belle, plus nice</span>
              </div>
            </div>
            <p className="text-primary-foreground/80 text-sm leading-relaxed">
              L'École de Commerce et d'Entrepreneuriat est une institution d'enseignement supérieur et universitaire, engagée dans la formation de la nouvelle génération d'acteurs économiques.
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
                <a href="tel:+50933276379" className="text-primary-foreground/80 hover:text-secondary transition-colors text-sm">
                  +509 33 27 6379
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="h-4 w-4 text-secondary" />
                <a href="mailto:contact@lovable.edu" className="text-primary-foreground/80 hover:text-secondary transition-colors text-sm">
                  contact@lovable.edu
                </a>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="h-4 w-4 text-secondary mt-0.5" />
                <span className="text-primary-foreground/80 text-sm">
                  Port-de-Paix, Haïti
                </span>
              </li>
            </ul>

            {/* Social links */}
            <div className="flex items-center gap-4 pt-2">
              <a href="#" className="text-primary-foreground/80 hover:text-secondary transition-colors" aria-label="Facebook">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-primary-foreground/80 hover:text-secondary transition-colors" aria-label="Instagram">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="text-primary-foreground/80 hover:text-secondary transition-colors" aria-label="LinkedIn">
                <Linkedin className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>

        {/* Newsletter */}
        <div className="mt-12 pt-8 border-t border-primary-foreground/20">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h4 className="font-display font-semibold text-lg mb-1">S'abonner à notre newsletter</h4>
              <p className="text-primary-foreground/70 text-sm">Restez informé de nos dernières actualités</p>
            </div>
            <form className="flex gap-3 w-full md:w-auto">
              <Input
                type="email"
                placeholder="Votre email"
                className="bg-primary-foreground/10 border-primary-foreground/20 text-primary-foreground placeholder:text-primary-foreground/50 min-w-64"
              />
              <Button variant="secondary">S'abonner</Button>
            </form>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-8 pt-8 border-t border-primary-foreground/20 text-center">
          <p className="text-primary-foreground/70 text-sm">
            © 2025 Tous droits réservés Lovable | Développé avec ❤️ en Haïti
          </p>
        </div>
      </div>
    </footer>
  );
}
