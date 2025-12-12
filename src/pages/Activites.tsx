import { useState, useEffect } from "react";
import { Layout } from "@/components/layout";
import { Calendar, MapPin, Clock, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";

interface ActivitiesContent {
  hero: {
    title: string;
    description: string;
  };
}

const defaultContent: ActivitiesContent = {
  hero: {
    title: "Activité Para-Étudiante",
    description: "Événements, ateliers et activités pour enrichir votre expérience étudiante."
  }
};

const activities = [
  {
    id: 1,
    title: "Conférence sur l'Innovation Entrepreneuriale",
    date: "2024-12-20",
    time: "14:00 - 17:00",
    location: "Amphithéâtre principal",
    participants: 150,
    description: "Une conférence animée par des entrepreneurs de renom pour inspirer nos étudiants.",
    type: "Conférence",
  },
  {
    id: 2,
    title: "Journée Portes Ouvertes",
    date: "2024-12-15",
    time: "09:00 - 16:00",
    location: "Campus principal",
    participants: 200,
    description: "Venez découvrir notre campus, rencontrer nos enseignants et en apprendre plus sur nos programmes.",
    type: "Événement",
  },
  {
    id: 3,
    title: "Atelier de Leadership",
    date: "2024-12-10",
    time: "10:00 - 12:30",
    location: "Salle de formation A",
    participants: 30,
    description: "Développez vos compétences en leadership à travers des exercices pratiques et interactifs.",
    type: "Atelier",
  },
  {
    id: 4,
    title: "Tournoi de Débat Inter-écoles",
    date: "2024-12-05",
    time: "13:00 - 18:00",
    location: "Auditorium",
    participants: 80,
    description: "Compétition de débat entre les étudiants de différentes écoles de la région.",
    type: "Compétition",
  },
];

const Activites = () => {
  const [content, setContent] = useState<ActivitiesContent>(defaultContent);

  useEffect(() => {
    const fetchContent = async () => {
      const { data } = await supabase
        .from("page_content")
        .select("content")
        .eq("page_key", "activities")
        .maybeSingle();

      if (data?.content) {
        setContent(data.content as unknown as ActivitiesContent);
      }
    };
    fetchContent();
  }, []);

  const getTypeColor = (type: string) => {
    switch (type) {
      case "Conférence":
        return "bg-primary/10 text-primary";
      case "Événement":
        return "bg-secondary/20 text-secondary-foreground";
      case "Atelier":
        return "bg-accent text-accent-foreground";
      case "Compétition":
        return "bg-destructive/10 text-destructive";
      default:
        return "bg-muted text-muted-foreground";
    }
  };

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

      {/* Activities List */}
      <section className="py-24 bg-background">
        <div className="container">
          <div className="space-y-6">
            {activities.map((activity, index) => (
              <div
                key={activity.id}
                className={`bg-card rounded-2xl border border-border p-6 md:p-8 hover:border-primary/30 hover:shadow-lg transition-all duration-300 animate-fade-in-up stagger-${index + 1}`}
              >
                <div className="flex flex-col lg:flex-row gap-6">
                  <div className="flex-shrink-0">
                    <div className="bg-primary text-primary-foreground rounded-xl p-4 text-center w-20">
                      <div className="text-3xl font-bold">
                        {new Date(activity.date).getDate()}
                      </div>
                      <div className="text-xs uppercase">
                        {new Date(activity.date).toLocaleDateString("fr-FR", { month: "short" })}
                      </div>
                    </div>
                  </div>

                  <div className="flex-1 space-y-4">
                    <div className="flex flex-wrap items-center gap-3">
                      <span className={`text-xs font-medium px-3 py-1 rounded-full ${getTypeColor(activity.type)}`}>
                        {activity.type}
                      </span>
                    </div>

                    <h2 className="text-xl md:text-2xl font-display font-bold text-foreground">
                      {activity.title}
                    </h2>

                    <p className="text-muted-foreground">{activity.description}</p>

                    <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4 text-primary" />
                        <span>{activity.time}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin className="h-4 w-4 text-primary" />
                        <span>{activity.location}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Users className="h-4 w-4 text-primary" />
                        <span>{activity.participants} participants max</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex-shrink-0">
                    <Button>S'inscrire</Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Activites;
