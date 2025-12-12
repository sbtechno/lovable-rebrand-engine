import { useState, useEffect } from "react";
import { Layout } from "@/components/layout";
import { Target, Eye, Lightbulb, Heart, Users, Globe } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

interface AboutContent {
  hero: {
    title: string;
    description: string;
  };
  vision: {
    title: string;
    paragraphs: string[];
  };
  objectives: {
    title: string;
    subtitle: string;
    list: string[];
  };
  values: {
    subtitle: string;
    title: string;
    description: string;
    list: Array<{ title: string; description: string }>;
  };
  history: {
    subtitle: string;
    title: string;
    paragraphs: string[];
  };
}

const defaultContent: AboutContent = {
  hero: {
    title: "À propos de nous",
    description: "Découvrez notre histoire, notre vision et notre engagement envers l'excellence éducative."
  },
  vision: {
    title: "Notre Vision",
    paragraphs: [
      "L'École de Commerce et d'Entrepreneuriat (ECE) est une institution d'enseignement supérieur.",
      "Notre vision est de devenir la plus grande école de commerce et d'entrepreneuriat des Caraïbes."
    ]
  },
  objectives: {
    title: "Objectifs",
    subtitle: "Objectif général",
    list: [
      "Former des techniciens responsables, des entrepreneurs éclairés et des leaders capables.",
      "Développer les compétences analytiques et stratégiques"
    ]
  },
  values: {
    subtitle: "Nos principes",
    title: "Nos Valeurs",
    description: "Les valeurs qui guident notre institution.",
    list: [
      { title: "Innovation", description: "Encourager la créativité et l'innovation" },
      { title: "Excellence", description: "Viser l'excellence académique" },
      { title: "Collaboration", description: "Favoriser le travail d'équipe" },
      { title: "Impact", description: "Former des leaders" }
    ]
  },
  history: {
    subtitle: "Notre parcours",
    title: "Notre Histoire",
    paragraphs: ["Fondée avec la conviction profonde que l'éducation est le moteur du développement."]
  }
};

const valueIcons = [Lightbulb, Heart, Users, Globe];

const APropos = () => {
  const [content, setContent] = useState<AboutContent>(defaultContent);

  useEffect(() => {
    const fetchContent = async () => {
      const { data } = await supabase
        .from("page_content")
        .select("content")
        .eq("page_key", "about")
        .maybeSingle();

      if (data?.content) {
        setContent(data.content as unknown as AboutContent);
      }
    };
    fetchContent();
  }, []);

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
              {content.hero.title}
            </h1>
            <p className="text-xl text-primary-foreground/90 leading-relaxed">
              {content.hero.description}
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
                <h2 className="text-3xl font-display font-bold text-foreground">{content.vision.title}</h2>
              </div>
              <div className="space-y-4 text-muted-foreground leading-relaxed">
                {content.vision.paragraphs.map((paragraph, index) => (
                  <p key={index}>{paragraph}</p>
                ))}
              </div>
            </div>

            <div className="bg-muted rounded-3xl p-8 animate-slide-in-right">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-xl bg-secondary flex items-center justify-center">
                  <Target className="h-6 w-6 text-secondary-foreground" />
                </div>
                <h2 className="text-3xl font-display font-bold text-foreground">{content.objectives.title}</h2>
              </div>
              <div className="space-y-4">
                <h4 className="font-semibold text-foreground">{content.objectives.subtitle}</h4>
                <ul className="space-y-3">
                  {content.objectives.list.map((objective, index) => (
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
            <span className="text-secondary font-medium text-sm uppercase tracking-wider">{content.values.subtitle}</span>
            <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mt-2">
              {content.values.title}
            </h2>
            <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">
              {content.values.description}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {content.values.list.map((value, index) => {
              const IconComponent = valueIcons[index] || Lightbulb;
              return (
                <div
                  key={value.title}
                  className={`bg-card rounded-2xl p-6 text-center border border-border hover:border-primary/30 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 animate-fade-in-up stagger-${index + 1}`}
                >
                  <div className="w-16 h-16 rounded-2xl bg-accent flex items-center justify-center mx-auto mb-4">
                    <IconComponent className="h-8 w-8 text-accent-foreground" />
                  </div>
                  <h3 className="font-display font-semibold text-lg text-foreground mb-2">
                    {value.title}
                  </h3>
                  <p className="text-muted-foreground text-sm">{value.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* History Section */}
      <section className="py-24 bg-background">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center animate-fade-in">
            <span className="text-secondary font-medium text-sm uppercase tracking-wider">{content.history.subtitle}</span>
            <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mt-2 mb-8">
              {content.history.title}
            </h2>
            <div className="bg-card rounded-3xl p-8 md:p-12 border border-border text-left space-y-4 text-muted-foreground">
              {content.history.paragraphs.map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default APropos;
