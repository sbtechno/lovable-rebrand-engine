import { Layout } from "@/components/layout";
import { FileText, Download, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";

const publications = [
  {
    id: 1,
    title: "Impact de l'entrepreneuriat sur le développement économique en Haïti",
    author: "Dr. Jean-Pierre Martin",
    year: 2024,
    type: "Article",
    abstract: "Cette étude examine le rôle de l'entrepreneuriat dans la croissance économique haïtienne et propose des recommandations pour soutenir les PME.",
  },
  {
    id: 2,
    title: "Les compétences numériques dans l'éducation supérieure caribéenne",
    author: "Prof. Marie Claire Joseph",
    year: 2024,
    type: "Rapport",
    abstract: "Analyse des besoins en compétences numériques et propositions pour l'intégration des technologies dans les cursus universitaires.",
  },
  {
    id: 3,
    title: "Gestion des ressources humaines dans les entreprises haïtiennes",
    author: "Mémoire collectif - Promotion 2023",
    year: 2023,
    type: "Mémoire",
    abstract: "Étude des pratiques RH dans les entreprises haïtiennes et identification des meilleures pratiques pour améliorer la performance organisationnelle.",
  },
  {
    id: 4,
    title: "Finance inclusive et microfinance en milieu rural",
    author: "Dr. Paul André",
    year: 2023,
    type: "Article",
    abstract: "Exploration des opportunités et défis de la microfinance pour soutenir le développement rural en Haïti.",
  },
];

const Recherche = () => {
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
              Recherche Académique
            </h1>
            <p className="text-xl text-primary-foreground/90 leading-relaxed">
              Publications, travaux de recherche et contributions académiques de notre institution.
            </p>
          </div>
        </div>
      </section>

      {/* Publications */}
      <section className="py-24 bg-background">
        <div className="container">
          <div className="space-y-6">
            {publications.map((pub, index) => (
              <div
                key={pub.id}
                className={`bg-card rounded-2xl border border-border p-6 md:p-8 hover:border-primary/30 hover:shadow-lg transition-all duration-300 animate-fade-in-up stagger-${index + 1}`}
              >
                <div className="flex flex-col md:flex-row gap-6">
                  <div className="flex-shrink-0">
                    <div className="w-16 h-16 rounded-xl bg-primary/10 flex items-center justify-center">
                      <FileText className="h-8 w-8 text-primary" />
                    </div>
                  </div>

                  <div className="flex-1 space-y-3">
                    <div className="flex flex-wrap items-center gap-3">
                      <span className="bg-accent text-accent-foreground text-xs font-medium px-3 py-1 rounded-full">
                        {pub.type}
                      </span>
                      <span className="text-muted-foreground text-sm">{pub.year}</span>
                    </div>

                    <h2 className="text-xl font-display font-bold text-foreground">
                      {pub.title}
                    </h2>

                    <p className="text-sm text-muted-foreground">
                      <span className="font-medium">Auteur(s):</span> {pub.author}
                    </p>

                    <p className="text-muted-foreground">{pub.abstract}</p>

                    <div className="flex flex-wrap gap-3 pt-2">
                      <Button size="sm" variant="outline">
                        <Download className="h-4 w-4 mr-2" />
                        Télécharger PDF
                      </Button>
                      <Button size="sm" variant="ghost">
                        <ExternalLink className="h-4 w-4 mr-2" />
                        Voir en ligne
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-muted">
        <div className="container text-center animate-fade-in">
          <h2 className="text-2xl font-display font-bold text-foreground mb-4">
            Contribuer à la recherche
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto mb-6">
            Vous êtes chercheur, enseignant ou étudiant et souhaitez contribuer à nos publications ? Contactez notre département de recherche.
          </p>
          <Button asChild>
            <a href="/contact">Nous contacter</a>
          </Button>
        </div>
      </section>
    </Layout>
  );
};

export default Recherche;
