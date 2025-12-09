import { Layout } from "@/components/layout";
import { Calendar, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const articles = [
  {
    id: 1,
    title: "L'importance de l'entrepreneuriat dans le développement économique d'Haïti",
    excerpt: "Découvrez comment l'entrepreneuriat peut transformer l'économie haïtienne et créer de nouvelles opportunités pour les jeunes diplômés.",
    date: "2024-12-01",
    category: "Entrepreneuriat",
    image: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=600",
  },
  {
    id: 2,
    title: "Les compétences clés pour réussir dans le monde des affaires en 2024",
    excerpt: "Explorez les compétences essentielles que tout professionnel doit développer pour rester compétitif sur le marché du travail.",
    date: "2024-11-15",
    category: "Formation",
    image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=600",
  },
  {
    id: 3,
    title: "Partenariat stratégique avec des universités internationales",
    excerpt: "Notre école annonce de nouveaux partenariats avec des institutions académiques de renom pour enrichir nos programmes.",
    date: "2024-11-01",
    category: "Actualités",
    image: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=600",
  },
];

const Perspective = () => {
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
              Perspective
            </h1>
            <p className="text-xl text-primary-foreground/90 leading-relaxed">
              Actualités, réflexions et analyses sur le monde de l'éducation et des affaires.
            </p>
          </div>
        </div>
      </section>

      {/* Articles */}
      <section className="py-24 bg-background">
        <div className="container">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {articles.map((article, index) => (
              <article
                key={article.id}
                className={`bg-card rounded-2xl overflow-hidden border border-border hover:border-primary/30 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 animate-fade-in-up stagger-${index + 1}`}
              >
                <div className="aspect-video overflow-hidden">
                  <img
                    src={article.image}
                    alt={article.title}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-6 space-y-4">
                  <div className="flex items-center gap-3">
                    <span className="bg-primary/10 text-primary text-xs font-medium px-3 py-1 rounded-full">
                      {article.category}
                    </span>
                    <span className="flex items-center gap-1 text-muted-foreground text-sm">
                      <Calendar className="h-4 w-4" />
                      {new Date(article.date).toLocaleDateString("fr-FR", {
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                      })}
                    </span>
                  </div>
                  <h2 className="font-display font-semibold text-xl text-foreground line-clamp-2">
                    {article.title}
                  </h2>
                  <p className="text-muted-foreground text-sm line-clamp-3">
                    {article.excerpt}
                  </p>
                  <Link
                    to={`/perspective/${article.id}`}
                    className="inline-flex items-center text-primary font-medium text-sm hover:underline"
                  >
                    Lire la suite
                    <ArrowRight className="h-4 w-4 ml-1" />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Perspective;
