import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Layout } from "@/components/layout";
import { Button } from "@/components/ui/button";
import { Home, ArrowLeft } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <Layout>
      <section className="py-24 min-h-[60vh] flex items-center">
        <div className="container">
          <div className="max-w-2xl mx-auto text-center animate-fade-in">
            <div className="text-8xl md:text-9xl font-display font-bold text-primary mb-6">
              404
            </div>
            <h1 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-4">
              Page non trouvée
            </h1>
            <p className="text-lg text-muted-foreground mb-8">
              Oops ! La page que vous recherchez n'existe pas ou a été déplacée.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button asChild>
                <a href="/">
                  <Home className="h-4 w-4 mr-2" />
                  Retour à l'accueil
                </a>
              </Button>
              <Button variant="outline" onClick={() => window.history.back()}>
                <ArrowLeft className="h-4 w-4 mr-2" />
                Page précédente
              </Button>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default NotFound;
