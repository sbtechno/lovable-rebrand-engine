import { useState, useEffect } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";
import { Save, Loader2, Facebook, Instagram, Linkedin, Phone, Mail, MapPin } from "lucide-react";

interface FooterSettings {
  id: string;
  about_text: string;
  phone: string;
  email: string;
  address: string;
  address_detail: string;
  facebook_url: string;
  instagram_url: string;
  linkedin_url: string;
  newsletter_title: string;
  newsletter_subtitle: string;
  copyright_text: string;
  developer_name: string;
  developer_url: string;
}

export default function AdminFooter() {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [formData, setFormData] = useState<FooterSettings | null>(null);

  const { data: footerSettings, isLoading } = useQuery({
    queryKey: ["footer-settings"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("footer_settings")
        .select("*")
        .single();

      if (error) throw error;
      return data as FooterSettings;
    },
  });

  useEffect(() => {
    if (footerSettings) {
      setFormData(footerSettings);
    }
  }, [footerSettings]);

  const updateMutation = useMutation({
    mutationFn: async (data: Partial<FooterSettings>) => {
      const { error } = await supabase
        .from("footer_settings")
        .update(data)
        .eq("id", formData?.id);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["footer-settings"] });
      toast({
        title: "Succès",
        description: "Les paramètres du footer ont été mis à jour.",
      });
    },
    onError: (error) => {
      toast({
        title: "Erreur",
        description: "Impossible de mettre à jour les paramètres.",
        variant: "destructive",
      });
      console.error("Error updating footer settings:", error);
    },
  });

  const handleChange = (field: keyof FooterSettings, value: string) => {
    if (formData) {
      setFormData({ ...formData, [field]: value });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData) {
      const { id, ...updateData } = formData;
      updateMutation.mutate(updateData);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!formData) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground">Aucun paramètre de footer trouvé.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-display font-bold">Gestion du Footer</h1>
        <p className="text-muted-foreground">
          Modifiez les informations affichées dans le pied de page du site.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* About Section */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">À propos</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <Label htmlFor="about_text">Texte de description</Label>
                <Textarea
                  id="about_text"
                  value={formData.about_text}
                  onChange={(e) => handleChange("about_text", e.target.value)}
                  rows={4}
                  className="mt-1"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Contact Information */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Phone className="h-5 w-5" />
              Informations de contact
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <Label htmlFor="phone">Téléphone</Label>
                <Input
                  id="phone"
                  value={formData.phone}
                  onChange={(e) => handleChange("phone", e.target.value)}
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleChange("email", e.target.value)}
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="address">Adresse (ville)</Label>
                <Input
                  id="address"
                  value={formData.address}
                  onChange={(e) => handleChange("address", e.target.value)}
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="address_detail">Détail de l'adresse</Label>
                <Input
                  id="address_detail"
                  value={formData.address_detail}
                  onChange={(e) => handleChange("address_detail", e.target.value)}
                  className="mt-1"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Social Media */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Réseaux sociaux</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 sm:grid-cols-3">
              <div>
                <Label htmlFor="facebook_url" className="flex items-center gap-2">
                  <Facebook className="h-4 w-4" />
                  Facebook URL
                </Label>
                <Input
                  id="facebook_url"
                  value={formData.facebook_url || ""}
                  onChange={(e) => handleChange("facebook_url", e.target.value)}
                  placeholder="https://facebook.com/..."
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="instagram_url" className="flex items-center gap-2">
                  <Instagram className="h-4 w-4" />
                  Instagram URL
                </Label>
                <Input
                  id="instagram_url"
                  value={formData.instagram_url || ""}
                  onChange={(e) => handleChange("instagram_url", e.target.value)}
                  placeholder="https://instagram.com/..."
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="linkedin_url" className="flex items-center gap-2">
                  <Linkedin className="h-4 w-4" />
                  LinkedIn URL
                </Label>
                <Input
                  id="linkedin_url"
                  value={formData.linkedin_url || ""}
                  onChange={(e) => handleChange("linkedin_url", e.target.value)}
                  placeholder="https://linkedin.com/..."
                  className="mt-1"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Newsletter */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Mail className="h-5 w-5" />
              Newsletter
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <Label htmlFor="newsletter_title">Titre</Label>
                <Input
                  id="newsletter_title"
                  value={formData.newsletter_title}
                  onChange={(e) => handleChange("newsletter_title", e.target.value)}
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="newsletter_subtitle">Sous-titre</Label>
                <Input
                  id="newsletter_subtitle"
                  value={formData.newsletter_subtitle}
                  onChange={(e) => handleChange("newsletter_subtitle", e.target.value)}
                  className="mt-1"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Copyright */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Copyright & Crédits</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <Label htmlFor="copyright_text">Texte de copyright</Label>
                <Input
                  id="copyright_text"
                  value={formData.copyright_text}
                  onChange={(e) => handleChange("copyright_text", e.target.value)}
                  className="mt-1"
                />
              </div>
              <Separator />
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <Label htmlFor="developer_name">Nom du développeur</Label>
                  <Input
                    id="developer_name"
                    value={formData.developer_name}
                    onChange={(e) => handleChange("developer_name", e.target.value)}
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="developer_url">Site du développeur</Label>
                  <Input
                    id="developer_url"
                    value={formData.developer_url}
                    onChange={(e) => handleChange("developer_url", e.target.value)}
                    placeholder="https://..."
                    className="mt-1"
                  />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="flex justify-end">
          <Button type="submit" disabled={updateMutation.isPending}>
            {updateMutation.isPending ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Enregistrement...
              </>
            ) : (
              <>
                <Save className="mr-2 h-4 w-4" />
                Enregistrer les modifications
              </>
            )}
          </Button>
        </div>
      </form>
    </div>
  );
}
