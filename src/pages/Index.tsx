import { Link } from "react-router-dom";
import { useState, useEffect, useCallback } from "react";
import { ArrowRight, BookOpen, Users, Award, Calendar, GraduationCap, Briefcase, Building, ChevronRight, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Layout } from "@/components/layout";
import graduateStudent from "@/assets/graduate-hero.png";
import graduatesGroup from "@/assets/graduates-group.jpeg";
import eceBuilding from "@/assets/ece-building.jpeg";
import heroBg from "@/assets/hero-bg-pattern.png";
import { supabase } from "@/integrations/supabase/client";

interface Program {
  id: string;
  title: string;
}

interface HomeContent {
  hero: {
    badge: string;
    title: string;
    description: string;
    cta_primary: string;
    cta_secondary: string;
  };
  programs_section: {
    subtitle: string;
    title: string;
    description: string;
  };
  graduates_section: {
    subtitle: string;
    title: string;
    description: string;
    promo_year: string;
  };
  features_section: {
    subtitle: string;
    title: string;
    description: string;
    location: string;
  };
  cta_section: {
    title: string;
    description: string;
    button: string;
  };
  contact_section: {
    subtitle: string;
    title: string;
    points: string[];
    help_title: string;
    help_description: string;
    phone: string;
    address: string;
  };
  stats: Array<{ value: string; label: string }>;
  features: Array<{ title: string; description: string }>;
  orientations: Array<{ name: string; description: string }>;
}

const defaultContent: HomeContent = {
  hero: {
    badge: "École de Commerce et d'Entrepreneuriat",
    title: "Devenir Manager ou Entrepreneur",
    description: "Programme de formations accélérées - Licence (L3) en Sciences du Management et de l'Entreprise. Nouvelle session chaque 5 mois. Inscription en cours !",
    cta_primary: "S'inscrire maintenant",
    cta_secondary: "Découvrir nos programmes"
  },
  programs_section: {
    subtitle: "Nos formations",
    title: "Nos Orientations",
    description: "Découvrez nos 7 orientations de formation conçues pour vous préparer aux défis du monde professionnel moderne."
  },
  graduates_section: {
    subtitle: "Nos diplômés",
    title: "Une communauté de leaders",
    description: "Chaque année, nos étudiants obtiennent leur diplôme et rejoignent une communauté de professionnels accomplis.",
    promo_year: "2025"
  },
  features_section: {
    subtitle: "Pourquoi nous choisir ?",
    title: "C'est la voie de la lumière, c'est la bonne voie, c'est l'éducation.",
    description: "Notre institution s'engage à fournir une éducation de qualité supérieure.",
    location: "Port-de-Paix, Haïti"
  },
  cta_section: {
    title: "Commencez votre parcours d'apprentissage dès aujourd'hui !",
    description: "Inscrivez-vous maintenant et rejoignez notre communauté d'étudiants ambitieux.",
    button: "Inscrivez-vous maintenant"
  },
  contact_section: {
    subtitle: "Témoignages",
    title: "Apprendre et Garantir",
    points: [],
    help_title: "Besoin d'aide ?",
    help_description: "Contactez-nous pour plus d'informations.",
    phone: "+509 4730 8207",
    address: "Port-de-Paix, Haïti"
  },
  stats: [
    { value: "100+", label: "Étudiants diplômés par an" },
    { value: "15+", label: "Années d'expérience" },
    { value: "7", label: "Programmes offerts" },
    { value: "95%", label: "Taux de satisfaction" }
  ],
  features: [
    { title: "Cours complet", description: "Programmes académiques complets" },
    { title: "Instructeurs experts", description: "Enseignants qualifiés" },
    { title: "Apprentissage flexible", description: "5 sessions ou 2 ans ½" },
    { title: "Licence (L3)", description: "Sciences du Management" }
  ],
  orientations: []
};

const iconMap: Record<string, React.ElementType> = {
  "Business Administration": Briefcase,
  "Comptabilité": BookOpen,
  "Entrepreneuriat": Building,
  "Gestion du Secrétariat": Users,
  "Gestion des Ressources Humaines": Users,
  "Management de l'Information": Award,
  "Marketing de Vente": Briefcase,
};

const featureIcons = [BookOpen, Users, Calendar, Award];

const Index = () => {
  const [content, setContent] = useState<HomeContent>(defaultContent);
  const [programs, setPrograms] = useState<Program[]>([]);
  const [currentProgramIndex, setCurrentProgramIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    const fetchContent = async () => {
      const { data } = await supabase
        .from("page_content")
        .select("content")
        .eq("page_key", "home")
        .maybeSingle();

      if (data?.content) {
        setContent(data.content as unknown as HomeContent);
      }
    };
    fetchContent();
  }, []);

  useEffect(() => {
    const fetchPrograms = async () => {
      const { data } = await supabase
        .from("programs")
        .select("id, title")
        .eq("is_active", true)
        .order("display_order");
      
      if (data && data.length > 0) {
        setPrograms(data);
      }
    };
    fetchPrograms();
  }, []);

  // Rotate through "Devenir Manager ou Entrepreneur" + programs
  useEffect(() => {
    const totalItems = programs.length + 1; // +1 for the first text
    if (totalItems <= 1) return;
    
    const interval = setInterval(() => {
      setIsAnimating(true);
      setTimeout(() => {
        setCurrentProgramIndex((prev) => (prev + 1) % totalItems);
        setIsAnimating(false);
      }, 500);
    }, 3000);

    return () => clearInterval(interval);
  }, [programs.length]);

  return (
    <Layout>
      {/* Hero Section */}
      <section 
        className="relative min-h-[90vh] flex items-center overflow-hidden"
        style={{ backgroundImage: `url(${heroBg})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-primary/95 via-primary/90 to-primary/70" />
        
        <div className="container relative z-10 px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            <div className="text-primary-foreground space-y-6 md:space-y-8 animate-fade-in-up">
              <div className="inline-flex items-center gap-2 bg-secondary/20 backdrop-blur-sm rounded-full px-3 py-1.5 sm:px-4 sm:py-2 text-xs sm:text-sm">
                <GraduationCap className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                <span>{content.hero.badge}</span>
              </div>
              
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-display font-bold leading-tight">
                <span 
                  className={`inline-block transition-all duration-500 ${isAnimating ? 'opacity-0 translate-y-4' : 'opacity-100 translate-y-0'}`}
                >
                  {currentProgramIndex === 0 
                    ? "Devenir Manager ou Entrepreneur" 
                    : programs[currentProgramIndex - 1]?.title}
                </span>
              </h1>
              
              <p className="text-base sm:text-lg md:text-xl text-primary-foreground/90 max-w-xl leading-relaxed">
                {content.hero.description.split('Inscription en cours').map((part, i) => 
                  i === 0 ? part : <><strong className="text-secondary">Inscription en cours</strong>{part}</>
                )}
              </p>
              
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                <Button asChild variant="hero" size="lg" className="sm:size-xl">
                  <Link to="/inscription">
                    {content.hero.cta_primary}
                    <ArrowRight className="h-5 w-5 ml-2" />
                  </Link>
                </Button>
                <Button asChild variant="heroOutline" size="lg" className="sm:size-xl hidden sm:inline-flex">
                  <Link to="/programmes">{content.hero.cta_secondary}</Link>
                </Button>
              </div>
            </div>
            
            <div className="hidden lg:block relative animate-fade-in stagger-3">
              <div className="relative">
                <div className="absolute -inset-4 bg-secondary/30 rounded-full blur-3xl" />
                <img
                  src={graduateStudent}
                  alt="Étudiante diplômée ECE"
                  className="relative z-10 w-full max-w-md mx-auto drop-shadow-2xl animate-float"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Decorative wave */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full">
            <path d="M0 120L60 105C120 90 240 60 360 52.5C480 45 600 60 720 67.5C840 75 960 75 1080 67.5C1200 60 1320 45 1380 37.5L1440 30V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z" fill="hsl(var(--background))"/>
          </svg>
        </div>
      </section>

      {/* Programs Section */}
      <section className="py-24 bg-background">
        <div className="container">
          <div className="text-center mb-16 animate-fade-in">
            <span className="text-secondary font-medium text-sm uppercase tracking-wider">{content.programs_section.subtitle}</span>
            <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mt-2">
              {content.programs_section.title}
            </h2>
            <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">
              {content.programs_section.description}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {content.orientations.map((program, index) => {
              const IconComponent = iconMap[program.name] || BookOpen;
              return (
                <Link
                  key={program.name}
                  to="/programmes"
                  className={`group bg-card rounded-2xl p-6 border border-border hover:border-primary/30 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 animate-fade-in-up stagger-${Math.min(index + 1, 6)}`}
                >
                  <div className="w-14 h-14 rounded-xl bg-accent flex items-center justify-center mb-4 group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                    <IconComponent className="h-7 w-7 text-accent-foreground group-hover:text-primary-foreground" />
                  </div>
                  <h3 className="font-display font-semibold text-lg text-foreground mb-2 group-hover:text-primary transition-colors">
                    {program.name}
                  </h3>
                  <p className="text-muted-foreground text-sm mb-4">{program.description}</p>
                  <span className="inline-flex items-center text-primary text-sm font-medium">
                    En savoir plus
                    <ChevronRight className="h-4 w-4 ml-1 group-hover:translate-x-1 transition-transform" />
                  </span>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Graduates Gallery Section */}
      <section className="py-24 bg-muted">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="animate-fade-in">
              <span className="text-secondary font-medium text-sm uppercase tracking-wider">{content.graduates_section.subtitle}</span>
              <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mt-2 mb-6">
                {content.graduates_section.title}
              </h2>
              <p className="text-muted-foreground mb-8 leading-relaxed">
                {content.graduates_section.description}
              </p>
              
              <div className="grid grid-cols-2 gap-4">
                {content.stats.map((stat, index) => (
                  <div key={stat.label} className={`bg-card rounded-xl p-4 shadow-sm animate-fade-in stagger-${index + 1}`}>
                    <div className="text-3xl font-display font-bold text-primary mb-1">
                      {stat.value}
                    </div>
                    <div className="text-sm text-muted-foreground">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative animate-slide-in-right">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                <img 
                  src={graduatesGroup} 
                  alt="Diplômés ECE avec leurs certificats" 
                  className="w-full h-auto object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/40 to-transparent" />
              </div>
              <div className="absolute -bottom-6 -left-6 bg-secondary text-secondary-foreground rounded-xl p-4 shadow-lg">
                <div className="text-2xl font-display font-bold">{content.graduates_section.promo_year}</div>
                <div className="text-sm">Promotion</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-background">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="order-2 lg:order-1 relative animate-fade-in">
              <div className="rounded-2xl overflow-hidden shadow-2xl">
                <img 
                  src={eceBuilding} 
                  alt="Bâtiment ECE - École de Commerce et d'Entrepreneuriat" 
                  className="w-full h-auto object-cover"
                />
              </div>
              <div className="absolute -top-4 -right-4 bg-primary text-primary-foreground rounded-xl px-6 py-3 shadow-lg">
                <span className="font-display font-semibold">{content.features_section.location}</span>
              </div>
            </div>

            <div className="order-1 lg:order-2 animate-slide-in-right">
              <span className="text-secondary font-medium text-sm uppercase tracking-wider">{content.features_section.subtitle}</span>
              <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mt-2 mb-6">
                {content.features_section.title}
              </h2>
              <p className="text-muted-foreground mb-8 leading-relaxed">
                {content.features_section.description}
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {content.features.map((feature, index) => {
                  const IconComponent = featureIcons[index] || BookOpen;
                  return (
                    <div key={feature.title} className={`flex items-start gap-4 animate-fade-in stagger-${index + 1}`}>
                      <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <IconComponent className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-foreground mb-1">{feature.title}</h4>
                        <p className="text-sm text-muted-foreground">{feature.description}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-primary relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-96 h-96 bg-secondary rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-secondary rounded-full blur-3xl translate-x-1/2 translate-y-1/2" />
        </div>
        
        <div className="container relative z-10 text-center">
          <h2 className="text-3xl md:text-4xl font-display font-bold text-primary-foreground mb-6 animate-fade-in">
            {content.cta_section.title}
          </h2>
          <p className="text-primary-foreground/80 text-lg max-w-2xl mx-auto mb-8 animate-fade-in stagger-1">
            {content.cta_section.description}
          </p>
          <Button asChild variant="hero" size="xl" className="animate-fade-in stagger-2">
            <Link to="/inscription">
              {content.cta_section.button}
              <ArrowRight className="h-5 w-5 ml-2" />
            </Link>
          </Button>
        </div>
      </section>

      {/* Testimonial / Contact Section */}
      <section className="py-24 bg-background">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-6 animate-fade-in">
              <span className="text-secondary font-medium text-sm uppercase tracking-wider">{content.contact_section.subtitle}</span>
              <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground">
                {content.contact_section.title}
              </h2>
              <div className="space-y-4">
                {content.contact_section.points.map((point, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <CheckCircle className="h-6 w-6 text-primary flex-shrink-0 mt-0.5" />
                    <p className="text-muted-foreground">{point}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-muted rounded-3xl p-8 md:p-12 animate-slide-in-right">
              <h3 className="font-display font-semibold text-xl text-foreground mb-4">
                {content.contact_section.help_title}
              </h3>
              <p className="text-muted-foreground mb-6">
                {content.contact_section.help_description}
              </p>
              <div className="space-y-3">
                <p className="text-sm text-muted-foreground">
                  <strong>Téléphone:</strong> {content.contact_section.phone}
                </p>
                <p className="text-sm text-muted-foreground">
                  <strong>Adresse:</strong> {content.contact_section.address}
                </p>
              </div>
              <Button asChild className="mt-6">
                <Link to="/contact">
                  Contactez-nous
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Index;
