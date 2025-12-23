import { Link, useLocation } from "react-router-dom";
import { useState } from "react";
import { Menu, X, Phone, Mail, Clock, Facebook, Instagram, Linkedin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import eceLogo from "@/assets/ece-logo-transparent.png";
const navigation = [{
  name: "Accueil",
  href: "/"
}, {
  name: "À propos",
  href: "/a-propos"
}, {
  name: "Nos Programmes",
  href: "/programmes"
}, {
  name: "Mes Pages",
  href: "#",
  children: [{
    name: "Perspective",
    href: "/perspective"
  }, {
    name: "Activité Para-Étudiante",
    href: "/activites"
  }, {
    name: "Galerie",
    href: "/galerie"
  }]
}, {
  name: "Recherche Académique",
  href: "/recherche"
}, {
  name: "Nous Contacter",
  href: "/contact"
}];
export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const location = useLocation();
  const isActive = (href: string) => location.pathname === href;
  return <header className="fixed top-0 left-0 right-0 z-50">
      {/* Top bar */}
      <div className="bg-primary text-primary-foreground py-1.5 sm:py-2">
        <div className="container px-4 sm:px-6 flex items-center justify-between text-xs sm:text-sm">
          <div className="flex items-center gap-3 sm:gap-6">
            <div className="hidden sm:flex items-center gap-2">
              <Clock className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
              <span>Lun - Ven : 8h - 16h</span>
            </div>
            <a href="tel:+50947308207" className="flex items-center gap-1.5 sm:gap-2 hover:text-secondary transition-colors">
              <Phone className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
              <span className="hidden xs:inline">+509 42915226</span>
            </a>
            <a href="mailto:contact@ecehaiti.com" className="flex items-center gap-1.5 sm:gap-2 hover:text-secondary transition-colors">
              <Mail className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
              <span className="hidden md:inline">contact@ecehaiti.com</span>
            </a>
          </div>
          <div className="flex items-center gap-3 sm:gap-4">
            <a href="#" className="hover:text-secondary transition-colors" aria-label="Facebook">
              <Facebook className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
            </a>
            <a href="#" className="hover:text-secondary transition-colors" aria-label="Instagram">
              <Instagram className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
            </a>
            <a href="#" className="hover:text-secondary transition-colors" aria-label="LinkedIn">
              <Linkedin className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
            </a>
          </div>
        </div>
      </div>

      {/* Main navigation */}
      <nav className="bg-card/95 backdrop-blur-md shadow-md">
        <div className="container px-4 sm:px-6 flex items-center justify-between py-1.5 sm:py-2">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <img src={eceLogo} alt="ECE - École de Commerce et d'Entrepreneuriat" className="h-12 sm:h-16 md:h-20 w-auto object-contain" />
          </Link>

          {/* Desktop navigation */}
          <div className="hidden lg:flex items-center gap-1">
            {navigation.map(item => item.children ? <div key={item.name} className="relative" onMouseEnter={() => setDropdownOpen(true)} onMouseLeave={() => setDropdownOpen(false)}>
                  <button className="px-4 py-2 text-sm font-medium text-foreground hover:text-primary transition-colors flex items-center gap-1">
                    {item.name}
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                  {dropdownOpen && <div className="absolute top-full left-0 bg-card rounded-lg shadow-xl border border-border py-2 min-w-48 animate-fade-in">
                      {item.children.map(child => <Link key={child.name} to={child.href} className="block px-4 py-2 text-sm text-foreground hover:bg-accent hover:text-accent-foreground transition-colors">
                          {child.name}
                        </Link>)}
                    </div>}
                </div> : <Link key={item.name} to={item.href} className={cn("px-4 py-2 text-sm font-medium transition-colors rounded-lg", isActive(item.href) ? "text-primary bg-accent" : "text-foreground hover:text-primary hover:bg-accent")}>
                  {item.name}
                </Link>)}
          </div>

          {/* CTA Button */}
          <div className="hidden lg:block">
            <Button asChild variant="hero" size="lg">
              <Link to="/inscription">S'inscrire</Link>
            </Button>
          </div>

          {/* Mobile menu button */}
          <button className="lg:hidden p-2 rounded-lg hover:bg-accent transition-colors" onClick={() => setMobileMenuOpen(!mobileMenuOpen)} aria-label="Toggle menu">
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile menu */}
        {mobileMenuOpen && <div className="lg:hidden bg-card border-t border-border animate-fade-in">
            <div className="container py-4 space-y-2">
              {navigation.map(item => item.children ? <div key={item.name} className="space-y-1">
                    <span className="block px-4 py-2 text-sm font-medium text-muted-foreground">
                      {item.name}
                    </span>
                    {item.children.map(child => <Link key={child.name} to={child.href} className="block px-8 py-2 text-sm text-foreground hover:bg-accent rounded-lg" onClick={() => setMobileMenuOpen(false)}>
                        {child.name}
                      </Link>)}
                  </div> : <Link key={item.name} to={item.href} className={cn("block px-4 py-2 text-sm font-medium rounded-lg", isActive(item.href) ? "text-primary bg-accent" : "text-foreground hover:bg-accent")} onClick={() => setMobileMenuOpen(false)}>
                    {item.name}
                  </Link>)}
              <div className="pt-4">
                <Button asChild variant="hero" className="w-full">
                  <Link to="/inscription" onClick={() => setMobileMenuOpen(false)}>
                    S'inscrire
                  </Link>
                </Button>
              </div>
            </div>
          </div>}
      </nav>
    </header>;
}