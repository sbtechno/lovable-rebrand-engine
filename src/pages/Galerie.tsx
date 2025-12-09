import { useState } from "react";
import { Layout } from "@/components/layout";
import { X } from "lucide-react";

// Import ECE gallery images
import graduate1 from "@/assets/gallery/graduate-1.jpeg";
import graduate2 from "@/assets/gallery/graduate-2.jpeg";
import graduate3 from "@/assets/gallery/graduate-3.jpeg";
import graduate4 from "@/assets/gallery/graduate-4.jpeg";
import graduate5 from "@/assets/gallery/graduate-5.jpeg";
import studentsGroup from "@/assets/gallery/students-group.jpeg";
import graduatesGroup from "@/assets/graduates-group.jpeg";
import eceBuilding from "@/assets/ece-building.jpeg";

const galleryImages = [
  { id: 1, src: graduate1, alt: "Diplômé ECE avec certificat", category: "Graduation" },
  { id: 2, src: graduate2, alt: "Diplômée Ruth-Dana Labranche", category: "Graduation" },
  { id: 3, src: graduate3, alt: "Diplômée Lauryns Beaubrun - Entrepreneuriat", category: "Graduation" },
  { id: 4, src: studentsGroup, alt: "Étudiants ECE en uniforme", category: "Étudiants" },
  { id: 5, src: graduate4, alt: "Diplômée avec son diplôme", category: "Graduation" },
  { id: 6, src: graduate5, alt: "Étudiante diplômée souriante", category: "Graduation" },
  { id: 7, src: graduatesGroup, alt: "Groupe de diplômés ECE 2025", category: "Graduation" },
  { id: 8, src: eceBuilding, alt: "Bâtiment ECE - École de Commerce", category: "Campus" },
];

const categories = ["Tous", "Graduation", "Étudiants", "Campus"];

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
              Découvrez nos diplômés, nos étudiants et la vie à l'ECE à travers nos photos.
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
