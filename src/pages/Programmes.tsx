import { Link } from "react-router-dom";
import { Layout } from "@/components/layout";
import { ArrowRight, Clock, Award, Users, BookOpen, GraduationCap, Briefcase, Trophy, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";

interface Program {
  id: string;
  title: string;
  short_description: string | null;
  full_description: string | null;
  duration: string | null;
  icon: string | null;
  display_order: number | null;
  is_active: boolean | null;
}

const iconMap: { [key: string]: React.ComponentType<{ className?: string }> } = {
  GraduationCap,
  Award,
  Briefcase,
  BookOpen,
  Trophy,
  Users,
};

const Programmes = () => {
  const [programs, setPrograms] = useState<Program[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPrograms = async () => {
      try {
        const { data, error } = await supabase
          .from('programs')
          .select('*')
          .eq('is_active', true)
          .order('display_order', { ascending: true });

        if (error) throw error;
        setPrograms(data || []);
      } catch (error) {
        console.error('Error fetching programs:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPrograms();
  }, []);

  const getIcon = (iconName: string | null) => {
    if (!iconName || !iconMap[iconName]) return BookOpen;
    return iconMap[iconName];
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
          {loading ? (
            <div className="flex justify-center items-center py-20">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
          ) : programs.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-muted-foreground">Aucun programme disponible pour le moment.</p>
            </div>
          ) : (
            <div className="space-y-8">
              {programs.map((program, index) => {
                const IconComponent = getIcon(program.icon);
                return (
                  <div
                    key={program.id}
                    className={`bg-card rounded-3xl border border-border overflow-hidden hover:border-primary/30 hover:shadow-xl transition-all duration-300 animate-fade-in-up stagger-${index + 1}`}
                  >
                    <div className="p-8 md:p-10">
                      <div className="flex flex-col lg:flex-row lg:items-start gap-8">
                        <div className="flex-1 space-y-4">
                          <div className="flex flex-wrap gap-3">
                            <span className="inline-flex items-center gap-1.5 bg-primary/10 text-primary text-sm font-medium px-3 py-1 rounded-full">
                              <IconComponent className="h-4 w-4" />
                              Programme
                            </span>
                            {program.duration && (
                              <span className="inline-flex items-center gap-1.5 bg-secondary/20 text-secondary-foreground text-sm font-medium px-3 py-1 rounded-full">
                                <Clock className="h-4 w-4" />
                                {program.duration}
                              </span>
                            )}
                          </div>
                          
                          <h2 className="text-2xl md:text-3xl font-display font-bold text-foreground">
                            {program.title}
                          </h2>
                          
                          <p className="text-muted-foreground leading-relaxed">
                            {program.short_description || program.full_description}
                          </p>
                        </div>
                        
                        <div className="flex flex-col gap-3 lg:w-48">
                          <Button asChild variant="outline" className="w-full">
                            <Link to="/inscription">S'inscrire</Link>
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
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
