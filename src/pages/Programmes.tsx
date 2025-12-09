import { Link } from "react-router-dom";
import { Layout } from "@/components/layout";
import { ArrowRight, Clock, Award, Users, BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";

const programs = [
  {
    id: "licence-l3",
    title: "Licence L3 en Sciences du Management et de l'Entreprise",
    duration: "3 ans",
    level: "Licence",
    description: "Formation complète en gestion et management d'entreprise avec une approche pratique et théorique.",
    features: ["Gestion d'entreprise", "Marketing", "Finance", "Ressources Humaines"],
  },
  {
    id: "certification-bac",
    title: "Programme de Certification (Niveau Baccalauréat)",
    duration: "1 an",
    level: "Certification",
    description: "Programme intensif pour acquérir les compétences fondamentales en commerce et gestion.",
    features: ["Comptabilité de base", "Communication", "Informatique", "Anglais des affaires"],
  },
  {
    id: "mba",
    title: "MBA (Master en Business Administration)",
    duration: "2 ans",
    level: "Master",
    description: "Formation avancée pour les professionnels souhaitant développer leurs compétences en leadership et stratégie.",
    features: ["Stratégie d'entreprise", "Leadership", "Finance avancée", "Entrepreneuriat"],
  },
  {
    id: "certification-postgrade",
    title: "Programme de Certification Postgradué",
    duration: "1 an",
    level: "Post-gradué",
    description: "Spécialisation pour les diplômés de 2e cycle universitaire cherchant à approfondir leur expertise.",
    features: ["Spécialisation métier", "Recherche appliquée", "Consulting", "Management avancé"],
  },
  {
    id: "business-class",
    title: "Business Class Certified",
    duration: "6 mois",
    level: "Certification",
    description: "Programme accéléré pour les professionnels en activité souhaitant valider leurs compétences.",
    features: ["Cours du soir", "Formation pratique", "Networking", "Certification reconnue"],
  },
];

const Programmes = () => {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="py-24 bg-gradient-to-br from-primary via-primary to-primary/90 relative overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-20 left-20 w-64 h-64 bg-secondary rounded-full blur-3xl" />
          <div className="absolute bottom-20 right-20 w-96 h-96 bg-secondary rounded-full blur-3xl" />
        </div>
        
        <div className="container relative z-10">
          <div className="max-w-3xl mx-auto text-center text-primary-foreground animate-fade-in">
            <h1 className="text-4xl md:text-5xl font-display font-bold mb-6">
              Nos Programmes
            </h1>
            <p className="text-xl text-primary-foreground/90 leading-relaxed">
              Découvrez nos programmes de formation conçus pour vous préparer aux défis du monde professionnel.
            </p>
          </div>
        </div>
      </section>

      {/* Programs List */}
      <section className="py-24 bg-background">
        <div className="container">
          <div className="space-y-8">
            {programs.map((program, index) => (
              <div
                key={program.id}
                className={`bg-card rounded-3xl border border-border overflow-hidden hover:border-primary/30 hover:shadow-xl transition-all duration-300 animate-fade-in-up stagger-${index + 1}`}
              >
                <div className="p-8 md:p-10">
                  <div className="flex flex-col lg:flex-row lg:items-start gap-8">
                    <div className="flex-1 space-y-4">
                      <div className="flex flex-wrap gap-3">
                        <span className="inline-flex items-center gap-1.5 bg-primary/10 text-primary text-sm font-medium px-3 py-1 rounded-full">
                          <Award className="h-4 w-4" />
                          {program.level}
                        </span>
                        <span className="inline-flex items-center gap-1.5 bg-secondary/20 text-secondary-foreground text-sm font-medium px-3 py-1 rounded-full">
                          <Clock className="h-4 w-4" />
                          {program.duration}
                        </span>
                      </div>
                      
                      <h2 className="text-2xl md:text-3xl font-display font-bold text-foreground">
                        {program.title}
                      </h2>
                      
                      <p className="text-muted-foreground leading-relaxed">
                        {program.description}
                      </p>
                      
                      <div className="flex flex-wrap gap-2 pt-2">
                        {program.features.map((feature) => (
                          <span
                            key={feature}
                            className="bg-muted text-muted-foreground text-sm px-3 py-1.5 rounded-lg"
                          >
                            {feature}
                          </span>
                        ))}
                      </div>
                    </div>
                    
                    <div className="flex flex-col gap-3 lg:w-48">
                      <Button asChild variant="default" className="w-full">
                        <Link to={`/programmes/${program.id}`}>
                          Voir le programme
                          <ArrowRight className="h-4 w-4 ml-2" />
                        </Link>
                      </Button>
                      <Button asChild variant="outline" className="w-full">
                        <Link to="/inscription">S'inscrire</Link>
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-muted">
        <div className="container">
          <div className="bg-primary rounded-3xl p-8 md:p-16 text-center relative overflow-hidden">
            <div className="absolute inset-0 opacity-10">
              <div className="absolute top-0 right-0 w-64 h-64 bg-secondary rounded-full blur-3xl translate-x-1/2 -translate-y-1/2" />
            </div>
            
            <div className="relative z-10 max-w-2xl mx-auto animate-fade-in">
              <h2 className="text-3xl md:text-4xl font-display font-bold text-primary-foreground mb-6">
                Besoin d'aide pour choisir votre programme ?
              </h2>
              <p className="text-primary-foreground/80 mb-8">
                Notre équipe est là pour vous guider dans le choix du programme qui correspond le mieux à vos objectifs professionnels.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Button asChild variant="hero" size="xl">
                  <Link to="/contact">
                    Nous contacter
                    <ArrowRight className="h-5 w-5 ml-2" />
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Programmes;
