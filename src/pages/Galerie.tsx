import { useState } from "react";
import { Layout } from "@/components/layout";
import { X } from "lucide-react";

const galleryImages = [
  { id: 1, src: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=800", alt: "Campus universitaire", category: "Campus" },
  { id: 2, src: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=800", alt: "Salle de classe", category: "Cours" },
  { id: 3, src: "https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?w=800", alt: "Étudiants", category: "Étudiants" },
  { id: 4, src: "https://images.unsplash.com/photo-1523580846011-d3a5bc25702b?w=800", alt: "Cérémonie de remise de diplômes", category: "Événements" },
  { id: 5, src: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=800", alt: "Travail en groupe", category: "Étudiants" },
  { id: 6, src: "https://images.unsplash.com/photo-1509062522246-3755977927d7?w=800", alt: "Bibliothèque", category: "Campus" },
  { id: 7, src: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=800", alt: "Formation", category: "Cours" },
  { id: 8, src: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800", alt: "Conférence", category: "Événements" },
];

const categories = ["Tous", "Campus", "Cours", "Étudiants", "Événements"];

const Galerie = () => {
  const [selectedCategory, setSelectedCategory] = useState("Tous");
  const [lightboxImage, setLightboxImage] = useState<typeof galleryImages[0] | null>(null);

  const filteredImages = selectedCategory === "Tous"
    ? galleryImages
    : galleryImages.filter((img) => img.category === selectedCategory);

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
              Galerie
            </h1>
            <p className="text-xl text-primary-foreground/90 leading-relaxed">
              Découvrez notre campus, nos événements et la vie étudiante à travers nos photos.
            </p>
          </div>
        </div>
      </section>

      {/* Gallery */}
      <section className="py-24 bg-background">
        <div className="container">
          {/* Category Filter */}
          <div className="flex flex-wrap justify-center gap-3 mb-12 animate-fade-in">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-6 py-2 rounded-full text-sm font-medium transition-all ${
                  selectedCategory === category
                    ? "bg-primary text-primary-foreground shadow-md"
                    : "bg-muted text-muted-foreground hover:bg-accent"
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Image Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {filteredImages.map((image, index) => (
              <div
                key={image.id}
                className={`group relative overflow-hidden rounded-2xl cursor-pointer animate-fade-in-up stagger-${(index % 6) + 1}`}
                onClick={() => setLightboxImage(image)}
              >
                <div className="aspect-square">
                  <img
                    src={image.src}
                    alt={image.alt}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="absolute bottom-4 left-4 right-4">
                    <span className="text-background text-sm font-medium">{image.alt}</span>
                    <span className="block text-background/70 text-xs">{image.category}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Lightbox */}
      {lightboxImage && (
        <div
          className="fixed inset-0 z-50 bg-foreground/95 flex items-center justify-center p-4 animate-fade-in"
          onClick={() => setLightboxImage(null)}
        >
          <button
            className="absolute top-4 right-4 text-background hover:text-secondary transition-colors"
            onClick={() => setLightboxImage(null)}
          >
            <X className="h-8 w-8" />
          </button>
          <img
            src={lightboxImage.src}
            alt={lightboxImage.alt}
            className="max-w-full max-h-[90vh] object-contain rounded-lg"
            onClick={(e) => e.stopPropagation()}
          />
          <div className="absolute bottom-8 text-center text-background">
            <p className="font-medium">{lightboxImage.alt}</p>
            <p className="text-sm text-background/70">{lightboxImage.category}</p>
          </div>
        </div>
      )}
    </Layout>
  );
};

export default Galerie;
