import { useState } from "react";
import { Layout } from "@/components/layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { GraduationCap, CheckCircle, ArrowRight, User, Mail, Phone, Calendar, BookOpen, DollarSign, CreditCard, Building2, Smartphone } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { z } from "zod";

const programs = [
  { 
    value: "mba", 
    label: "MBA (Master of Business Administration)",
    duration: "15 mois",
    inscription: "60 USD",
    formation: "2 300 USD",
    reduction: "30% à 50% selon le profil",
    note: "Paiement possible en mensualités flexibles"
  },
  { 
    value: "business-class", 
    label: "Business Class Certificated (Certificat Premium)",
    duration: "45 heures par classe",
    inscription: "10 USD",
    formation: "115 USD par classe / 150 USD double classe",
    reduction: null,
    note: null
  },
  { 
    value: "licence", 
    label: "Programme de Licence",
    duration: "3 ans",
    inscription: "2 000 Gourdes",
    formation: "17 500 Gourdes (admission) + 3 500 Gourdes/mois",
    reduction: null,
    note: "Mensualité: 3 500 Gourdes"
  },
  { 
    value: "certification", 
    label: "Programme de Certification",
    duration: "Variable",
    inscription: "40 USD",
    formation: "400 USD",
    reduction: null,
    note: null
  },
  { 
    value: "perfectionnement", 
    label: "Programme de Perfectionnement de Cadres",
    duration: "Variable",
    inscription: "2 000 Gourdes",
    formation: "27 000 Gourdes",
    reduction: null,
    note: null
  },
];

const paymentMethods = [
  { value: "moncash", label: "Mon Cash", icon: Smartphone },
  { value: "natcash", label: "Natcash", icon: Smartphone },
  { value: "virement", label: "Virement Bancaire", icon: Building2 },
];

const inscriptionSchema = z.object({
  firstName: z.string().trim().min(1, "Le prénom est requis").max(50, "Le prénom ne peut pas dépasser 50 caractères"),
  lastName: z.string().trim().min(1, "Le nom est requis").max(50, "Le nom ne peut pas dépasser 50 caractères"),
  email: z.string().trim().email("Adresse email invalide").max(255, "L'email ne peut pas dépasser 255 caractères"),
  phone: z.string().trim().min(1, "Le téléphone est requis").max(20, "Le numéro ne peut pas dépasser 20 caractères").regex(/^[+]?[0-9\s-]+$/, "Format de téléphone invalide"),
  dateOfBirth: z.string().optional(),
  birthPlace: z.string().max(100, "Le lieu de naissance ne peut pas dépasser 100 caractères").optional(),
  address: z.string().max(200, "L'adresse ne peut pas dépasser 200 caractères").optional(),
  program: z.string().min(1, "Veuillez sélectionner un programme"),
  previousEducation: z.string().optional(),
  paymentMethod: z.string().min(1, "Veuillez sélectionner un mode de paiement"),
  acceptTerms: z.literal(true, { errorMap: () => ({ message: "Vous devez accepter les conditions" }) }),
});

const Inscription = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [step, setStep] = useState(1);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    dateOfBirth: "",
    birthPlace: "",
    address: "",
    program: "",
    previousEducation: "",
    paymentMethod: "",
    acceptTerms: false,
  });

  const selectedProgram = programs.find(p => p.value === formData.program);
  // Honeypot field for spam prevention - bots will fill this, humans won't see it
  const [honeypot, setHoneypot] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Honeypot spam check - if filled, silently reject (bots fill hidden fields)
    if (honeypot) {
      // Fake success to not alert bots
      setStep(3);
      return;
    }
    
    setIsSubmitting(true);
    setErrors({});

    // Validate form data
    const result = inscriptionSchema.safeParse(formData);
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
      const { error } = await supabase.from("inscriptions").insert({
        nom: validatedData.lastName,
        prenom: validatedData.firstName,
        email: validatedData.email,
        telephone: validatedData.phone,
        date_naissance: validatedData.dateOfBirth || null,
        lieu_naissance: validatedData.birthPlace || null,
        adresse: validatedData.address || null,
        programme: validatedData.program,
        niveau_etude: validatedData.previousEducation || null,
      });

      if (error) {
        toast({
          title: "Erreur",
          description: "Une erreur s'est produite lors de l'inscription. Veuillez réessayer.",
          variant: "destructive",
        });
        setIsSubmitting(false);
        return;
      }

      toast({
        title: "Inscription réussie !",
        description: "Votre demande d'inscription a été envoyée. Nous vous contacterons prochainement.",
      });

      setIsSubmitting(false);
      setStep(3);
    } catch {
      toast({
        title: "Erreur",
        description: "Une erreur s'est produite. Veuillez réessayer.",
        variant: "destructive",
      });
      setIsSubmitting(false);
    }
  };

  const nextStep = () => {
    if (step < 2) setStep(step + 1);
  };

  const prevStep = () => {
    if (step > 1) setStep(step - 1);
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
            <div className="inline-flex items-center gap-2 bg-secondary/20 backdrop-blur-sm rounded-full px-4 py-2 text-sm mb-6">
              <GraduationCap className="h-4 w-4" />
              <span>Rejoignez-nous</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-display font-bold mb-6">
              S'inscrire
            </h1>
            <p className="text-xl text-primary-foreground/90 leading-relaxed">
              Commencez votre parcours vers l'excellence. Inscrivez-vous dès aujourd'hui.
            </p>
          </div>
        </div>
      </section>

      {/* Registration Form */}
      <section className="py-24 bg-background">
        <div className="container max-w-4xl">
          {/* Progress Steps */}
          <div className="flex items-center justify-center gap-4 mb-12 animate-fade-in">
            {[1, 2, 3].map((s) => (
              <div key={s} className="flex items-center">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold transition-colors ${
                    s <= step
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted text-muted-foreground"
                  }`}
                >
                  {s < step ? <CheckCircle className="h-5 w-5" /> : s}
                </div>
                {s < 3 && (
                  <div
                    className={`w-16 h-1 mx-2 rounded transition-colors ${
                      s < step ? "bg-primary" : "bg-muted"
                    }`}
                  />
                )}
              </div>
            ))}
          </div>

          <div className="bg-card rounded-3xl border border-border p-8 md:p-12 animate-fade-in-up">
            {step === 1 && (
              <div className="space-y-8">
                <div className="text-center">
                  <h2 className="text-2xl font-display font-bold text-foreground mb-2">
                    Informations personnelles
                  </h2>
                  <p className="text-muted-foreground">
                    Renseignez vos informations de base
                  </p>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">Prénom *</Label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="firstName"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleChange}
                        placeholder="Votre prénom"
                        className="pl-10"
                        maxLength={50}
                        required
                      />
                    </div>
                    {errors.firstName && <p className="text-sm text-destructive">{errors.firstName}</p>}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName">Nom *</Label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="lastName"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleChange}
                        placeholder="Votre nom"
                        className="pl-10"
                        maxLength={50}
                        required
                      />
                    </div>
                    {errors.lastName && <p className="text-sm text-destructive">{errors.lastName}</p>}
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="email">Email *</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="votre@email.com"
                        className="pl-10"
                        maxLength={255}
                        required
                      />
                    </div>
                    {errors.email && <p className="text-sm text-destructive">{errors.email}</p>}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Téléphone *</Label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="phone"
                        name="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="+509 XX XX XXXX"
                        className="pl-10"
                        maxLength={20}
                        required
                      />
                    </div>
                    {errors.phone && <p className="text-sm text-destructive">{errors.phone}</p>}
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="dateOfBirth">Date de naissance</Label>
                    <div className="relative">
                      <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="dateOfBirth"
                        name="dateOfBirth"
                        type="date"
                        value={formData.dateOfBirth}
                        onChange={handleChange}
                        className="pl-10"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="birthPlace">Lieu de naissance</Label>
                    <Input
                      id="birthPlace"
                      name="birthPlace"
                      value={formData.birthPlace}
                      onChange={handleChange}
                      placeholder="Votre lieu de naissance"
                      maxLength={100}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="address">Adresse</Label>
                  <Input
                    id="address"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    placeholder="Votre adresse complète"
                    maxLength={200}
                  />
                </div>

                <div className="flex justify-end">
                  <Button onClick={nextStep} size="lg">
                    Suivant
                    <ArrowRight className="h-4 w-4 ml-2" />
                  </Button>
                </div>
              </div>
            )}

            {step === 2 && (
              <form onSubmit={handleSubmit} className="space-y-8">
                {/* Honeypot field - hidden from humans, bots will fill it */}
                <div className="absolute -left-[9999px]" aria-hidden="true">
                  <label htmlFor="company">Company</label>
                  <input
                    type="text"
                    id="company"
                    name="company"
                    value={honeypot}
                    onChange={(e) => setHoneypot(e.target.value)}
                    tabIndex={-1}
                    autoComplete="off"
                  />
                </div>
                <div className="text-center">
                  <h2 className="text-2xl font-display font-bold text-foreground mb-2">
                    Programme et formation
                  </h2>
                  <p className="text-muted-foreground">
                    Sélectionnez votre programme et complétez votre inscription
                  </p>
                </div>

                <div className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="program">Programme souhaité *</Label>
                    <Select
                      value={formData.program}
                      onValueChange={(value) => handleSelectChange("program", value)}
                    >
                      <SelectTrigger className="h-12">
                        <BookOpen className="h-4 w-4 mr-2 text-muted-foreground" />
                        <SelectValue placeholder="Sélectionnez un programme" />
                      </SelectTrigger>
                      <SelectContent>
                        {programs.map((program) => (
                          <SelectItem key={program.value} value={program.value}>
                            {program.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {errors.program && <p className="text-sm text-destructive">{errors.program}</p>}
                  </div>

                  {/* Program Pricing Info */}
                  {selectedProgram && (
                    <div className="bg-gradient-to-br from-primary/5 to-secondary/5 border border-primary/20 rounded-2xl p-6 space-y-4">
                      <div className="flex items-center gap-2 text-primary font-semibold">
                        <DollarSign className="h-5 w-5" />
                        <span>Détails des frais - {selectedProgram.label}</span>
                      </div>
                      <div className="grid md:grid-cols-2 gap-4 text-sm">
                        <div className="space-y-2">
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Durée:</span>
                            <span className="font-medium text-foreground">{selectedProgram.duration}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Frais d'inscription:</span>
                            <span className="font-medium text-foreground">{selectedProgram.inscription}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Frais de formation:</span>
                            <span className="font-medium text-foreground">{selectedProgram.formation}</span>
                          </div>
                        </div>
                        <div className="space-y-2">
                          {selectedProgram.reduction && (
                            <div className="bg-secondary/20 text-secondary-foreground px-3 py-2 rounded-lg">
                              <span className="text-xs font-semibold uppercase">Réduction disponible</span>
                              <p className="text-sm font-medium">{selectedProgram.reduction}</p>
                            </div>
                          )}
                          {selectedProgram.note && (
                            <div className="bg-muted px-3 py-2 rounded-lg">
                              <p className="text-sm text-muted-foreground">{selectedProgram.note}</p>
                            </div>
                          )}
                        </div>
                      </div>
                      <p className="text-xs text-muted-foreground italic border-t border-border pt-3">
                        Des facilités de paiement sont disponibles pour chaque programme.
                      </p>
                    </div>
                  )}

                  <div className="space-y-2">
                    <Label htmlFor="previousEducation">Niveau d'études précédent</Label>
                    <Select
                      value={formData.previousEducation}
                      onValueChange={(value) => handleSelectChange("previousEducation", value)}
                    >
                      <SelectTrigger className="h-12">
                        <SelectValue placeholder="Sélectionnez votre niveau" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="bac">Baccalauréat</SelectItem>
                        <SelectItem value="licence">Licence</SelectItem>
                        <SelectItem value="master">Master</SelectItem>
                        <SelectItem value="autre">Autre</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Payment Method Selection */}
                  <div className="space-y-3">
                    <Label className="flex items-center gap-2">
                      <CreditCard className="h-4 w-4 text-muted-foreground" />
                      Mode de paiement préféré *
                    </Label>
                    <RadioGroup
                      value={formData.paymentMethod}
                      onValueChange={(value) => handleSelectChange("paymentMethod", value)}
                      className="grid grid-cols-1 md:grid-cols-3 gap-4"
                    >
                      {paymentMethods.map((method) => {
                        const IconComponent = method.icon;
                        return (
                          <div key={method.value}>
                            <RadioGroupItem
                              value={method.value}
                              id={method.value}
                              className="peer sr-only"
                            />
                            <Label
                              htmlFor={method.value}
                              className="flex flex-col items-center justify-center rounded-xl border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary peer-data-[state=checked]:bg-primary/5 cursor-pointer transition-all"
                            >
                              <IconComponent className="h-8 w-8 mb-2 text-primary" />
                              <span className="font-medium">{method.label}</span>
                            </Label>
                          </div>
                        );
                      })}
                    </RadioGroup>
                    {errors.paymentMethod && <p className="text-sm text-destructive">{errors.paymentMethod}</p>}
                    
                    {formData.paymentMethod && (
                      <div className="bg-muted rounded-xl p-4 text-sm">
                        {formData.paymentMethod === "moncash" && (
                          <p className="text-muted-foreground">
                            <span className="font-semibold text-foreground">Mon Cash:</span> Vous recevrez les instructions de paiement par SMS après validation de votre inscription.
                          </p>
                        )}
                        {formData.paymentMethod === "natcash" && (
                          <p className="text-muted-foreground">
                            <span className="font-semibold text-foreground">Natcash:</span> Vous recevrez les instructions de paiement par SMS après validation de votre inscription.
                          </p>
                        )}
                        {formData.paymentMethod === "virement" && (
                          <p className="text-muted-foreground">
                            <span className="font-semibold text-foreground">Virement Bancaire:</span> Les coordonnées bancaires vous seront communiquées par email après validation de votre inscription.
                          </p>
                        )}
                      </div>
                    )}
                  </div>

                  <div className="flex items-start gap-3 p-4 bg-muted rounded-xl">
                    <Checkbox
                      id="acceptTerms"
                      checked={formData.acceptTerms}
                      onCheckedChange={(checked) =>
                        setFormData((prev) => ({ ...prev, acceptTerms: checked as boolean }))
                      }
                    />
                    <Label htmlFor="acceptTerms" className="text-sm text-muted-foreground leading-relaxed cursor-pointer">
                      J'accepte les conditions générales d'utilisation et la politique de confidentialité. Je confirme que les informations fournies sont exactes.
                    </Label>
                  </div>
                </div>

                <div className="flex justify-between">
                  <Button type="button" variant="outline" onClick={prevStep}>
                    Retour
                  </Button>
                  <Button type="submit" size="lg" disabled={isSubmitting || !formData.acceptTerms || !formData.program || !formData.paymentMethod}>
                    {isSubmitting ? (
                      <>
                        <span className="animate-spin mr-2">⏳</span>
                        Inscription en cours...
                      </>
                    ) : (
                      <>
                        Confirmer l'inscription
                        <ArrowRight className="h-4 w-4 ml-2" />
                      </>
                    )}
                  </Button>
                </div>
              </form>
            )}

            {step === 3 && (
              <div className="text-center py-12 space-y-6">
                <div className="w-20 h-20 bg-primary rounded-full flex items-center justify-center mx-auto animate-pulse-glow">
                  <CheckCircle className="h-10 w-10 text-primary-foreground" />
                </div>
                <h2 className="text-3xl font-display font-bold text-foreground">
                  Inscription réussie !
                </h2>
                <p className="text-muted-foreground max-w-md mx-auto">
                  Merci pour votre inscription. Notre équipe examinera votre demande et vous contactera dans les plus brefs délais avec les prochaines étapes.
                </p>
                <Button asChild variant="outline" size="lg">
                  <a href="/">Retour à l'accueil</a>
                </Button>
              </div>
            )}
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Inscription;
