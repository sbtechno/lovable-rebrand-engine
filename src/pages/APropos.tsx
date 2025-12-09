import { Layout } from "@/components/layout";
import { Target, Eye, BookOpen, Users, Award, Lightbulb, Heart, Globe } from "lucide-react";

const values = [
  { icon: Lightbulb, title: "Innovation", description: "Encourager la créativité et l'innovation dans toutes nos formations" },
  { icon: Heart, title: "Excellence", description: "Viser l'excellence académique et professionnelle" },
  { icon: Users, title: "Collaboration", description: "Favoriser le travail d'équipe et le partage des connaissances" },
  { icon: Globe, title: "Impact", description: "Former des leaders capables d'impacter positivement leur environnement" },
];

const objectives = [
  "Former des techniciens responsables, des entrepreneurs éclairés et des leaders capables de gérer des projets et des organisations avec compétence et intégrité.",
  "Développer les compétences analytiques et stratégiques",
  "Encourager l'esprit entrepreneurial et l'innovation",
  "Promouvoir l'éthique professionnelle et la responsabilité sociale",
  "Préparer les étudiants aux défis du marché du travail",
];

const APropos = () => {
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
              À propos de nous
            </h1>
            <p className="text-xl text-primary-foreground/90 leading-relaxed">
              Découvrez notre histoire, notre vision et notre engagement envers l'excellence éducative.
            </p>
          </div>
        </div>
      </section>

      {/* Vision Section */}
      <section className="py-24 bg-background">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="animate-fade-in">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-xl bg-primary flex items-center justify-center">
                  <Eye className="h-6 w-6 text-primary-foreground" />
                </div>
                <h2 className="text-3xl font-display font-bold text-foreground">Notre Vision</h2>
              </div>
              <div className="space-y-4 text-muted-foreground leading-relaxed">
                <p>
                  L'École de Commerce et d'Entrepreneuriat (ECE) est une institution d'enseignement supérieur et universitaire, engagée dans la formation de la nouvelle génération d'acteurs économiques.
                </p>
                <p>
                  Notre vision est de devenir la plus grande école de commerce et d'entrepreneuriat des Caraïbes, en formant des techniciens, décideurs et créateurs de valeur, conscients des réalités stratégiques du développement, et capables d'impacter positivement leur environnement.
                </p>
              </div>
            </div>

            <div className="bg-muted rounded-3xl p-8 animate-slide-in-right">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-xl bg-secondary flex items-center justify-center">
                  <Target className="h-6 w-6 text-secondary-foreground" />
                </div>
                <h2 className="text-3xl font-display font-bold text-foreground">Objectifs</h2>
              </div>
              <div className="space-y-4">
                <h4 className="font-semibold text-foreground">Objectif général</h4>
                <ul className="space-y-3">
                  {objectives.map((objective, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <span className="text-xs font-bold text-primary">{index + 1}</span>
                      </div>
                      <p className="text-muted-foreground text-sm">{objective}</p>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-24 bg-muted">
        <div className="container">
          <div className="text-center mb-16 animate-fade-in">
            <span className="text-secondary font-medium text-sm uppercase tracking-wider">Nos principes</span>
            <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mt-2">
              Nos Valeurs
            </h2>
            <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">
              Les valeurs qui guident notre institution et façonnent notre approche pédagogique.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => (
              <div
                key={value.title}
                className={`bg-card rounded-2xl p-6 text-center border border-border hover:border-primary/30 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 animate-fade-in-up stagger-${index + 1}`}
              >
                <div className="w-16 h-16 rounded-2xl bg-accent flex items-center justify-center mx-auto mb-4">
                  <value.icon className="h-8 w-8 text-accent-foreground" />
                </div>
                <h3 className="font-display font-semibold text-lg text-foreground mb-2">
                  {value.title}
                </h3>
                <p className="text-muted-foreground text-sm">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* History Section */}
      <section className="py-24 bg-background">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center animate-fade-in">
            <span className="text-secondary font-medium text-sm uppercase tracking-wider">Notre parcours</span>
            <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mt-2 mb-8">
              Notre Histoire
            </h2>
            <div className="bg-card rounded-3xl p-8 md:p-12 border border-border text-left space-y-4 text-muted-foreground">
              <p>
                Fondée avec la conviction profonde que l'éducation est le moteur du développement, notre institution s'est donnée pour mission de former les leaders et entrepreneurs de demain en Haïti et dans les Caraïbes.
              </p>
              <p>
                Au fil des années, nous avons développé des programmes académiques innovants, alliant théorie et pratique, pour préparer nos étudiants aux réalités du monde professionnel moderne.
              </p>
              <p>
                Aujourd'hui, nous sommes fiers d'avoir formé des centaines de professionnels qui contribuent activement au développement économique de notre région.
              </p>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default APropos;
