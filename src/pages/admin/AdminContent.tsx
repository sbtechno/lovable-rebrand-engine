import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { RefreshCw, Save, ChevronDown, ChevronRight, FileText } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import type { Json } from "@/integrations/supabase/types";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

interface PageContent {
  id: string;
  page_key: string;
  title: string;
  content: Record<string, unknown>;
  created_at: string;
  updated_at: string;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type JsonContent = Record<string, any>;

const AdminContent = () => {
  const [pages, setPages] = useState<PageContent[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState<string | null>(null);
  const [editedContent, setEditedContent] = useState<Record<string, Record<string, unknown>>>({});
  const [openPages, setOpenPages] = useState<Record<string, boolean>>({});

  const pageLabels: Record<string, string> = {
    home: "Page d'accueil",
    about: "À propos",
    contact: "Contact",
    programs: "Programmes",
    activities: "Activités",
    research: "Recherche",
    gallery: "Galerie",
  };

  const fetchPages = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from("page_content")
        .select("*")
        .order("page_key");

      if (error) throw error;
      
      // Cast data to the correct type
      const typedData = (data || []).map(page => ({
        ...page,
        content: page.content as Record<string, unknown>
      })) as PageContent[];
      
      setPages(typedData);
      
      // Initialize edited content
      const initial: Record<string, Record<string, unknown>> = {};
      typedData.forEach((page) => {
        initial[page.page_key] = page.content;
      });
      setEditedContent(initial);
    } catch (error) {
      console.error("Error fetching pages:", error);
      toast.error("Erreur lors du chargement du contenu");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPages();
  }, []);

  const handleSave = async (pageKey: string) => {
    setSaving(pageKey);
    try {
      const { error } = await supabase
        .from("page_content")
        .update({ content: editedContent[pageKey] as Json })
        .eq("page_key", pageKey);

      if (error) throw error;
      toast.success("Contenu mis à jour avec succès");
      fetchPages();
    } catch (error) {
      console.error("Error saving content:", error);
      toast.error("Erreur lors de la sauvegarde");
    } finally {
      setSaving(null);
    }
  };

  const updateNestedValue = (
    pageKey: string,
    path: string[],
    value: string | string[]
  ) => {
    setEditedContent((prev) => {
      const updated = { ...prev };
      const pageContent = { ...updated[pageKey] };
      
      let current: Record<string, unknown> = pageContent;
      for (let i = 0; i < path.length - 1; i++) {
        if (typeof current[path[i]] === 'object' && current[path[i]] !== null) {
          current[path[i]] = { ...(current[path[i]] as Record<string, unknown>) };
          current = current[path[i]] as Record<string, unknown>;
        }
      }
      current[path[path.length - 1]] = value;
      
      updated[pageKey] = pageContent;
      return updated;
    });
  };

  const renderField = (
    pageKey: string,
    label: string,
    value: unknown,
    path: string[]
  ): React.ReactNode => {
    if (typeof value === "string") {
      const isLongText = value.length > 100 || value.includes("\n");
      return (
        <div key={path.join(".")} className="space-y-2">
          <Label className="text-sm font-medium capitalize">
            {label.replace(/_/g, " ")}
          </Label>
          {isLongText ? (
            <Textarea
              value={value}
              onChange={(e) => updateNestedValue(pageKey, path, e.target.value)}
              rows={4}
              className="resize-y"
            />
          ) : (
            <Input
              value={value}
              onChange={(e) => updateNestedValue(pageKey, path, e.target.value)}
            />
          )}
        </div>
      );
    }

    if (Array.isArray(value)) {
      // Handle array of strings
      if (typeof value[0] === "string") {
        return (
          <div key={path.join(".")} className="space-y-2">
            <Label className="text-sm font-medium capitalize">
              {label.replace(/_/g, " ")}
            </Label>
            <Textarea
              value={value.join("\n")}
              onChange={(e) =>
                updateNestedValue(pageKey, path, e.target.value.split("\n"))
              }
              rows={value.length + 1}
              placeholder="Un élément par ligne"
            />
          </div>
        );
      }
      
      // Handle array of objects
      return (
        <div key={path.join(".")} className="space-y-4">
          <Label className="text-sm font-medium capitalize">
            {label.replace(/_/g, " ")}
          </Label>
          <div className="space-y-4 pl-4 border-l-2 border-primary/20">
            {value.map((item, index) => (
              <div key={index} className="space-y-2 bg-muted/50 p-3 rounded-lg">
                <span className="text-xs text-muted-foreground">#{index + 1}</span>
                {typeof item === "object" && item !== null &&
                  Object.entries(item).map(([key, val]) =>
                    renderField(pageKey, key, val, [...path, String(index), key])
                  )}
              </div>
            ))}
          </div>
        </div>
      );
    }

    if (typeof value === "object" && value !== null) {
      return (
        <div key={path.join(".")} className="space-y-4">
          <div className="font-medium text-primary capitalize border-b pb-2">
            {label.replace(/_/g, " ")}
          </div>
          <div className="space-y-4 pl-4">
            {Object.entries(value as Record<string, unknown>).map(([key, val]) =>
              renderField(pageKey, key, val, [...path, key])
            )}
          </div>
        </div>
      );
    }

    return null;
  };

  const togglePage = (pageKey: string) => {
    setOpenPages((prev) => ({
      ...prev,
      [pageKey]: !prev[pageKey],
    }));
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <RefreshCw className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-display font-bold text-foreground">
            Gestion du Contenu
          </h1>
          <p className="text-muted-foreground">
            Modifiez les textes affichés sur le site
          </p>
        </div>
        <Button variant="outline" onClick={fetchPages}>
          <RefreshCw className="h-4 w-4 mr-2" />
          Actualiser
        </Button>
      </div>

      <div className="space-y-4">
        {pages.map((page) => (
          <Collapsible
            key={page.page_key}
            open={openPages[page.page_key]}
            onOpenChange={() => togglePage(page.page_key)}
          >
            <div className="bg-card rounded-xl border border-border overflow-hidden">
              <CollapsibleTrigger asChild>
                <button className="w-full flex items-center justify-between p-4 hover:bg-muted/50 transition-colors">
                  <div className="flex items-center gap-3">
                    <FileText className="h-5 w-5 text-primary" />
                    <div className="text-left">
                      <h3 className="font-semibold text-foreground">
                        {pageLabels[page.page_key] || page.title}
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        Clé: {page.page_key}
                      </p>
                    </div>
                  </div>
                  {openPages[page.page_key] ? (
                    <ChevronDown className="h-5 w-5 text-muted-foreground" />
                  ) : (
                    <ChevronRight className="h-5 w-5 text-muted-foreground" />
                  )}
                </button>
              </CollapsibleTrigger>

              <CollapsibleContent>
                <div className="p-4 pt-0 border-t space-y-6">
                  {editedContent[page.page_key] &&
                    Object.entries(editedContent[page.page_key]).map(
                      ([key, value]) => renderField(page.page_key, key, value, [key])
                    )}

                  <div className="flex justify-end pt-4 border-t">
                    <Button
                      onClick={() => handleSave(page.page_key)}
                      disabled={saving === page.page_key}
                    >
                      {saving === page.page_key ? (
                        <>
                          <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                          Sauvegarde...
                        </>
                      ) : (
                        <>
                          <Save className="h-4 w-4 mr-2" />
                          Sauvegarder
                        </>
                      )}
                    </Button>
                  </div>
                </div>
              </CollapsibleContent>
            </div>
          </Collapsible>
        ))}
      </div>
    </div>
  );
};

export default AdminContent;
