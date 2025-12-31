import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { toast } from "sonner";
import { Trash2, Download, Search, Loader2, Mail } from "lucide-react";
import { format } from "date-fns";
import { fr } from "date-fns/locale";

interface Subscriber {
  id: string;
  email: string;
  is_active: boolean;
  created_at: string;
}

const AdminNewsletter = () => {
  const queryClient = useQueryClient();
  const [searchTerm, setSearchTerm] = useState("");
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const { data: subscribers, isLoading } = useQuery({
    queryKey: ["admin-newsletter-subscribers"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("newsletter_subscribers")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      return data as Subscriber[];
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from("newsletter_subscribers")
        .delete()
        .eq("id", id);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-newsletter-subscribers"] });
      toast.success("Abonné supprimé avec succès");
      setDeleteId(null);
    },
    onError: () => {
      toast.error("Erreur lors de la suppression");
    },
  });

  const exportToCSV = () => {
    if (!subscribers || subscribers.length === 0) {
      toast.error("Aucun abonné à exporter");
      return;
    }

    const headers = ["Email", "Statut", "Date d'inscription"];
    const csvContent = [
      headers.join(","),
      ...subscribers.map((sub) =>
        [
          sub.email,
          sub.is_active ? "Actif" : "Inactif",
          format(new Date(sub.created_at), "dd/MM/yyyy HH:mm", { locale: fr }),
        ].join(",")
      ),
    ].join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);
    link.setAttribute("href", url);
    link.setAttribute(
      "download",
      `newsletter-subscribers-${format(new Date(), "yyyy-MM-dd")}.csv`
    );
    link.style.visibility = "hidden";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    toast.success("Export CSV téléchargé");
  };

  const filteredSubscribers = subscribers?.filter((sub) =>
    sub.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-display font-bold">Newsletter</h1>
          <p className="text-muted-foreground mt-1">
            Gérez les abonnés à la newsletter
          </p>
        </div>
        <Button onClick={exportToCSV} variant="outline" className="gap-2">
          <Download className="h-4 w-4" />
          Exporter CSV
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-card rounded-xl p-6 border">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-primary/10 rounded-lg">
              <Mail className="h-6 w-6 text-primary" />
            </div>
            <div>
              <p className="text-2xl font-bold">{subscribers?.length || 0}</p>
              <p className="text-sm text-muted-foreground">Total abonnés</p>
            </div>
          </div>
        </div>
        <div className="bg-card rounded-xl p-6 border">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-green-500/10 rounded-lg">
              <Mail className="h-6 w-6 text-green-500" />
            </div>
            <div>
              <p className="text-2xl font-bold">
                {subscribers?.filter((s) => s.is_active).length || 0}
              </p>
              <p className="text-sm text-muted-foreground">Actifs</p>
            </div>
          </div>
        </div>
        <div className="bg-card rounded-xl p-6 border">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-muted rounded-lg">
              <Mail className="h-6 w-6 text-muted-foreground" />
            </div>
            <div>
              <p className="text-2xl font-bold">
                {subscribers?.filter((s) => !s.is_active).length || 0}
              </p>
              <p className="text-sm text-muted-foreground">Inactifs</p>
            </div>
          </div>
        </div>
      </div>

      {/* Search */}
      <div className="relative max-w-md">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Rechercher un email..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10"
        />
      </div>

      {/* Table */}
      <div className="bg-card rounded-xl border overflow-hidden">
        {isLoading ? (
          <div className="flex items-center justify-center py-12">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        ) : filteredSubscribers && filteredSubscribers.length > 0 ? (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Email</TableHead>
                <TableHead>Statut</TableHead>
                <TableHead>Date d'inscription</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredSubscribers.map((subscriber) => (
                <TableRow key={subscriber.id}>
                  <TableCell className="font-medium">{subscriber.email}</TableCell>
                  <TableCell>
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${
                        subscriber.is_active
                          ? "bg-green-100 text-green-700"
                          : "bg-gray-100 text-gray-700"
                      }`}
                    >
                      {subscriber.is_active ? "Actif" : "Inactif"}
                    </span>
                  </TableCell>
                  <TableCell>
                    {format(new Date(subscriber.created_at), "dd MMM yyyy à HH:mm", {
                      locale: fr,
                    })}
                  </TableCell>
                  <TableCell className="text-right">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => setDeleteId(subscriber.id)}
                      className="text-destructive hover:text-destructive hover:bg-destructive/10"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        ) : (
          <div className="text-center py-12 text-muted-foreground">
            {searchTerm ? "Aucun résultat trouvé" : "Aucun abonné pour le moment"}
          </div>
        )}
      </div>

      {/* Delete confirmation */}
      <AlertDialog open={!!deleteId} onOpenChange={() => setDeleteId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Supprimer cet abonné ?</AlertDialogTitle>
            <AlertDialogDescription>
              Cette action est irréversible. L'abonné sera définitivement supprimé
              de la liste.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Annuler</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => deleteId && deleteMutation.mutate(deleteId)}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              Supprimer
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default AdminNewsletter;