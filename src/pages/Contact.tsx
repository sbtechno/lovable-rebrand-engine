import { useState } from "react";
import { Layout } from "@/components/layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Phone, Mail, MapPin, Clock, Send, CheckCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { z } from "zod";

const contactSchema = z.object({
  name: z.string().trim().min(1, "Le nom est requis").max(100, "Le nom ne peut pas dépasser 100 caractères"),
  email: z.string().trim().email("Adresse email invalide").max(255, "L'email ne peut pas dépasser 255 caractères"),
  subject: z.string().trim().min(1, "Le sujet est requis").max(200, "Le sujet ne peut pas dépasser 200 caractères"),
  message: z.string().trim().min(1, "Le message est requis").max(2000, "Le message ne peut pas dépasser 2000 caractères"),
});

const Contact = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  // Honeypot field for spam prevention - bots will fill this, humans won't see it
  const [honeypot, setHoneypot] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Honeypot spam check - if filled, silently reject (bots fill hidden fields)
    if (honeypot) {
      // Fake success to not alert bots
      setIsSuccess(true);
      return;
    }
    
    setIsSubmitting(true);
    setErrors({});

    // Validate form data
    const result = contactSchema.safeParse(formData);
    if (!result.success) {
      const fieldErrors: Record<string, string> = {};
      result.error.errors.forEach((err) => {
        if (err.path[0]) {
          fieldErrors[err.path[0] as string] = err.message;
        }
      });
      setErrors(fieldErrors);
      setIsSubmitting(false);
      toast({
        title: "Erreur de validation",
        description: "Veuillez corriger les erreurs dans le formulaire.",
        variant: "destructive",
      });
      return;
    }

    try {
      const validatedData = result.data;
      const { error } = await supabase.from("contacts").insert({
        nom: validatedData.name,
        email: validatedData.email,
        sujet: validatedData.subject,
        message: validatedData.message,
      });

      if (error) {
        toast({
          title: "Erreur",
          description: "Une erreur s'est produite lors de l'envoi. Veuillez réessayer.",
          variant: "destructive",
        });
        setIsSubmitting(false);
        return;
      }

      toast({
        title: "Message envoyé !",
        description: "Nous vous répondrons dans les plus brefs délais.",
      });

      setFormData({
        name: "",
        email: "",
        subject: "",
        message: "",
      });
      setIsSuccess(true);
      setIsSubmitting(false);
    } catch {
      toast({
        title: "Erreur",
        description: "Une erreur s'est produite. Veuillez réessayer.",
        variant: "destructive",
      });
      setIsSubmitting(false);
    }
  };

  const contactInfo = [
    {
      icon: Phone,
      title: "Téléphone",
      content: "+509 4730 8207 / 4248 7444 / 3327 6379",
      href: "tel:+50947308207",
    },
    {
      icon: Mail,
      title: "Email",
      content: "contact@ecehaiti.com",
      href: "mailto:contact@ecehaiti.com",
    },
    {
      icon: MapPin,
      title: "Adresse",
      content: "Port-de-Paix, Haïti\n48, angles des rues Benito Sylvain & Boisrond Tonnerre",
      href: "#",
    },
    {
      icon: Clock,
      title: "Horaires",
      content: "Lun - Ven : 8h - 16h",
      href: "#",
    },
  ];

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
              Nous Contacter
            </h1>
            <p className="text-xl text-primary-foreground/90 leading-relaxed">
              Nous sommes là pour répondre à toutes vos questions. N'hésitez pas à nous contacter.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Content */}
      <section className="py-24 bg-background">
        <div className="container">
          <div className="grid lg:grid-cols-3 gap-12">
            {/* Contact Info */}
            <div className="space-y-6 animate-fade-in">
              <div>
                <h2 className="text-2xl font-display font-bold text-foreground mb-4">
                  Informations de contact
                </h2>
                <p className="text-muted-foreground">
                  Contactez-nous par téléphone, email ou venez nous rendre visite à notre campus.
                </p>
              </div>

              <div className="space-y-4">
                {contactInfo.map((info) => (
                  <a
                    key={info.title}
                    href={info.href}
                    className="flex items-start gap-4 p-4 bg-card rounded-xl border border-border hover:border-primary/30 hover:shadow-lg transition-all duration-300 group"
                  >
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0 group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                      <info.icon className="h-6 w-6 text-primary group-hover:text-primary-foreground" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground">{info.title}</h3>
                      <p className="text-muted-foreground whitespace-pre-line">{info.content}</p>
                    </div>
                  </a>
                ))}
              </div>
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-2 animate-slide-in-right">
              <div className="bg-card rounded-3xl border border-border p-8 md:p-12">
                {isSuccess ? (
                  <div className="text-center py-12 space-y-6">
                    <div className="w-20 h-20 bg-primary rounded-full flex items-center justify-center mx-auto">
                      <CheckCircle className="h-10 w-10 text-primary-foreground" />
                    </div>
                    <h2 className="text-2xl font-display font-bold text-foreground">
                      Message envoyé !
                    </h2>
                    <p className="text-muted-foreground max-w-md mx-auto">
                      Merci pour votre message. Nous vous répondrons dans les plus brefs délais.
                    </p>
                    <Button onClick={() => setIsSuccess(false)} variant="outline">
                      Envoyer un autre message
                    </Button>
                  </div>
                ) : (
                  <>
                    <h2 className="text-2xl font-display font-bold text-foreground mb-6">
                      Envoyez-nous un message
                    </h2>

                    <form onSubmit={handleSubmit} className="space-y-6">
                      {/* Honeypot field - hidden from humans, bots will fill it */}
                      <div className="absolute -left-[9999px]" aria-hidden="true">
                        <label htmlFor="website">Website</label>
                        <input
                          type="text"
                          id="website"
                          name="website"
                          value={honeypot}
                          onChange={(e) => setHoneypot(e.target.value)}
                          tabIndex={-1}
                          autoComplete="off"
                        />
                      </div>
                      <div className="grid md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <Label htmlFor="name">Nom complet *</Label>
                          <Input
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            placeholder="Votre nom"
                            maxLength={100}
                            required
                          />
                          {errors.name && <p className="text-sm text-destructive">{errors.name}</p>}
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="email">Email *</Label>
                          <Input
                            id="email"
                            name="email"
                            type="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="votre@email.com"
                            maxLength={255}
                            required
                          />
                          {errors.email && <p className="text-sm text-destructive">{errors.email}</p>}
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="subject">Sujet *</Label>
                        <Input
                          id="subject"
                          name="subject"
                          value={formData.subject}
                          onChange={handleChange}
                          placeholder="Sujet de votre message"
                          maxLength={200}
                          required
                        />
                        {errors.subject && <p className="text-sm text-destructive">{errors.subject}</p>}
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="message">Message *</Label>
                        <Textarea
                          id="message"
                          name="message"
                          value={formData.message}
                          onChange={handleChange}
                          placeholder="Votre message..."
                          rows={6}
                          maxLength={2000}
                          required
                        />
                        {errors.message && <p className="text-sm text-destructive">{errors.message}</p>}
                      </div>

                      <Button type="submit" size="lg" disabled={isSubmitting} className="w-full md:w-auto">
                        {isSubmitting ? (
                          <>
                            <span className="animate-spin mr-2">⏳</span>
                            Envoi en cours...
                          </>
                        ) : (
                          <>
                            <Send className="h-4 w-4 mr-2" />
                            Envoyer le message
                          </>
                        )}
                      </Button>
                    </form>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-16 bg-muted">
        <div className="container">
          <div className="bg-card rounded-3xl overflow-hidden border border-border animate-fade-in">
            <div className="aspect-video bg-muted flex items-center justify-center">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3760.8!2d-72.8333!3d19.9333!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2sPort-de-Paix%2C%20Haiti!5e0!3m2!1sen!2sus!4v1234567890"
                width="100%"
                height="100%"
                style={{ border: 0, minHeight: "400px" }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="ECE Haiti Location"
              />
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Contact;
