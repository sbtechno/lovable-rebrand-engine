import { Link } from "react-router-dom";
import { ArrowRight, BookOpen, Users, Award, Calendar, GraduationCap, Briefcase, Building, ChevronRight, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Layout } from "@/components/layout";
import graduateStudent from "@/assets/graduate-student.png";
import graduatesGroup from "@/assets/graduates-group.jpeg";
import eceBuilding from "@/assets/ece-building.jpeg";
import heroBg from "@/assets/hero-bg-pattern.png";

const programs = [
  { name: "Business Administration", icon: Briefcase, description: "Administration Commerciale" },
  { name: "Comptabilité", icon: BookOpen, description: "Comptabilité et Finance" },
  { name: "Entrepreneuriat", icon: Building, description: "Création d'entreprise" },
  { name: "Gestion du Secrétariat", icon: Users, description: "Secrétariat professionnel" },
  { name: "Gestion des Ressources Humaines", icon: Users, description: "GRH" },
  { name: "Management de l'Information", icon: Award, description: "Systèmes d'information" },
  { name: "Marketing de Vente", icon: Briefcase, description: "Techniques de vente" },
];

const features = [
  { icon: BookOpen, title: "Cours complet", description: "Programmes académiques complets et actualisés" },
  { icon: Users, title: "Instructeurs experts", description: "Enseignants qualifiés et expérimentés" },
  { icon: Calendar, title: "Apprentissage flexible", description: "5 sessions ou 2 ans ½ - Nouvelle session chaque 5 mois" },
  { icon: Award, title: "Licence (L3)", description: "Sciences du Management et de l'Entreprise" },
];

const stats = [
  { value: "100+", label: "Étudiants diplômés par an" },
  { value: "15+", label: "Années d'expérience" },
  { value: "7", label: "Programmes offerts" },
  { value: "95%", label: "Taux de satisfaction" },
];

const Index = () => {
  return (
    <Layout>
      {/* Hero Section */}
      <section 
        className="relative min-h-[90vh] flex items-center overflow-hidden"
        style={{ backgroundImage: `url(${heroBg})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-primary/95 via-primary/90 to-primary/70" />
        
        <div className="container relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="text-primary-foreground space-y-8 animate-fade-in-up">
              <div className="inline-flex items-center gap-2 bg-secondary/20 backdrop-blur-sm rounded-full px-4 py-2 text-sm">
                <GraduationCap className="h-4 w-4" />
                <span>École de Commerce et d'Entrepreneuriat</span>
              </div>
              
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold leading-tight">
                Devenir Manager ou Entrepreneur
              </h1>
              
              <p className="text-lg md:text-xl text-primary-foreground/90 max-w-xl leading-relaxed">
                Programme de formations accélérées - Licence (L3) en Sciences du Management et de l'Entreprise. 
                Nouvelle session chaque 5 mois. <strong className="text-secondary">Inscription en cours !</strong>
              </p>
              
              <div className="flex flex-wrap gap-4">
                <Button asChild variant="hero" size="xl">
                  <Link to="/inscription">
                    S'inscrire maintenant
                    <ArrowRight className="h-5 w-5 ml-2" />
                  </Link>
                </Button>
                <Button asChild variant="heroOutline" size="xl">
                  <Link to="/programmes">Découvrir nos programmes</Link>
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
            <span className="text-secondary font-medium text-sm uppercase tracking-wider">Nos formations</span>
            <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mt-2">
              Nos Orientations
            </h2>
            <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">
              Découvrez nos 7 orientations de formation conçues pour vous préparer aux défis du monde professionnel moderne.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {programs.map((program, index) => (
              <Link
                key={program.name}
                to="/programmes"
                className={`group bg-card rounded-2xl p-6 border border-border hover:border-primary/30 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 animate-fade-in-up stagger-${Math.min(index + 1, 6)}`}
              >
                <div className="w-14 h-14 rounded-xl bg-accent flex items-center justify-center mb-4 group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                  <program.icon className="h-7 w-7 text-accent-foreground group-hover:text-primary-foreground" />
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
            ))}
          </div>
        </div>
      </section>

      {/* Graduates Gallery Section */}
      <section className="py-24 bg-muted">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="animate-fade-in">
              <span className="text-secondary font-medium text-sm uppercase tracking-wider">Nos diplômés</span>
              <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mt-2 mb-6">
                Une communauté de leaders
              </h2>
              <p className="text-muted-foreground mb-8 leading-relaxed">
                Chaque année, nos étudiants obtiennent leur diplôme et rejoignent une communauté de professionnels 
                accomplis. Ils sont la preuve vivante de l'excellence de notre formation.
              </p>
              
              <div className="grid grid-cols-2 gap-4">
                {stats.map((stat, index) => (
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
                <div className="text-2xl font-display font-bold">2025</div>
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
                <span className="font-display font-semibold">Port-de-Paix, Haïti</span>
              </div>
            </div>

            <div className="order-1 lg:order-2 animate-slide-in-right">
              <span className="text-secondary font-medium text-sm uppercase tracking-wider">Pourquoi nous choisir ?</span>
              <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mt-2 mb-6">
                C'est la voie de la lumière, c'est la bonne voie, c'est l'éducation.
              </h2>
              <p className="text-muted-foreground mb-8 leading-relaxed">
                Notre institution s'engage à fournir une éducation de qualité supérieure, combinant théorie et pratique pour préparer nos étudiants à exceller dans le monde des affaires.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {features.map((feature, index) => (
                  <div key={feature.title} className={`flex items-start gap-4 animate-fade-in stagger-${index + 1}`}>
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <feature.icon className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-foreground mb-1">{feature.title}</h4>
                      <p className="text-sm text-muted-foreground">{feature.description}</p>
                    </div>
                  </div>
                ))}
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
            Commencez votre parcours d'apprentissage dès aujourd'hui !
          </h2>
          <p className="text-primary-foreground/80 text-lg max-w-2xl mx-auto mb-8 animate-fade-in stagger-1">
            Inscrivez-vous maintenant et rejoignez notre communauté d'étudiants ambitieux. Nouvelle session chaque 5 mois !
          </p>
          <Button asChild variant="hero" size="xl" className="animate-fade-in stagger-2">
            <Link to="/inscription">
              Inscrivez-vous maintenant
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
              <span className="text-secondary font-medium text-sm uppercase tracking-wider">Témoignages</span>
              <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground">
                Apprendre et Garantir
              </h2>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-6 w-6 text-primary flex-shrink-0 mt-0.5" />
                  <p className="text-muted-foreground">Nos Étudiants sont toujours satisfaits.</p>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-6 w-6 text-primary flex-shrink-0 mt-0.5" />
                  <p className="text-muted-foreground">Plus de 100 étudiants obtiennent leur diplôme chaque année.</p>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-6 w-6 text-primary flex-shrink-0 mt-0.5" />
                  <p className="text-muted-foreground">Nos enseignants sont qualifiés et disposent de bonnes méthodes pédagogiques.</p>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-6 w-6 text-primary flex-shrink-0 mt-0.5" />
                  <p className="text-muted-foreground">Formation accélérée en 5 sessions ou 2 ans ½.</p>
                </div>
              </div>
            </div>

            <div className="bg-muted rounded-3xl p-8 md:p-12 animate-slide-in-right">
              <h3 className="font-display font-semibold text-xl text-foreground mb-4">
                Besoin d'aide ?
              </h3>
              <p className="text-muted-foreground mb-6">
                Vous avez besoin de notre aide rapidement ? Cliquez sur le bouton pour nous contacter ou accédez à notre page de contact.
              </p>
              <div className="space-y-3">
                <p className="text-sm text-muted-foreground">
                  <strong>Téléphone:</strong> +509 4730 8207 / 4248 7444 / 3327 6379
                </p>
                <p className="text-sm text-muted-foreground">
                  <strong>Adresse:</strong> Port-de-Paix, Haïti, 48, angles des rues Benito Sylvain & Boisrond Tonnerre
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
