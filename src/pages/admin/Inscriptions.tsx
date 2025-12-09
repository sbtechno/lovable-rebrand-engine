import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { toast } from 'sonner';
import { Eye, Trash2, Download, RefreshCw } from 'lucide-react';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';

interface Inscription {
  id: string;
  nom: string;
  prenom: string;
  email: string;
  telephone: string;
  date_naissance: string | null;
  lieu_naissance: string | null;
  adresse: string | null;
  programme: string;
  niveau_etude: string | null;
  statut: string;
  created_at: string;
}

const Inscriptions = () => {
  const [inscriptions, setInscriptions] = useState<Inscription[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedInscription, setSelectedInscription] = useState<Inscription | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  const fetchInscriptions = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('inscriptions')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setInscriptions(data || []);
    } catch (error) {
      console.error('Error fetching inscriptions:', error);
      toast.error('Erreur lors du chargement des inscriptions');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchInscriptions();
  }, []);

  const updateStatut = async (id: string, statut: string) => {
    try {
      const { error } = await supabase
        .from('inscriptions')
        .update({ statut })
        .eq('id', id);

      if (error) throw error;

      setInscriptions(prev =>
        prev.map(i => (i.id === id ? { ...i, statut } : i))
      );
      toast.success('Statut mis à jour');
    } catch (error) {
      console.error('Error updating status:', error);
      toast.error('Erreur lors de la mise à jour');
    }
  };

  const deleteInscription = async (id: string) => {
    if (!confirm('Êtes-vous sûr de vouloir supprimer cette inscription ?')) return;

    try {
      const { error } = await supabase
        .from('inscriptions')
        .delete()
        .eq('id', id);

      if (error) throw error;

      setInscriptions(prev => prev.filter(i => i.id !== id));
      toast.success('Inscription supprimée');
    } catch (error) {
      console.error('Error deleting inscription:', error);
      toast.error('Erreur lors de la suppression');
    }
  };

  const exportCSV = () => {
    const headers = ['Nom', 'Prénom', 'Email', 'Téléphone', 'Programme', 'Statut', 'Date'];
    const rows = inscriptions.map(i => [
      i.nom,
      i.prenom,
      i.email,
      i.telephone,
      i.programme,
      i.statut,
      format(new Date(i.created_at), 'dd/MM/yyyy', { locale: fr }),
    ]);

    const csvContent = [headers, ...rows].map(row => row.join(',')).join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `inscriptions_${format(new Date(), 'yyyy-MM-dd')}.csv`;
    link.click();
  };

  const getStatusBadge = (statut: string) => {
    switch (statut) {
      case 'accepte':
        return <Badge className="bg-green-500">Accepté</Badge>;
      case 'refuse':
        return <Badge variant="destructive">Refusé</Badge>;
      default:
        return <Badge variant="secondary">En attente</Badge>;
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-display font-bold">Inscriptions</h1>
          <p className="text-muted-foreground mt-2">{inscriptions.length} inscription(s)</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={fetchInscriptions}>
            <RefreshCw className="h-4 w-4 mr-2" />
            Actualiser
          </Button>
          <Button variant="outline" onClick={exportCSV}>
            <Download className="h-4 w-4 mr-2" />
            Exporter CSV
          </Button>
        </div>
      </div>

      <Card>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Nom</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Programme</TableHead>
                  <TableHead>Statut</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {inscriptions.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
                      Aucune inscription pour le moment
                    </TableCell>
                  </TableRow>
                ) : (
                  inscriptions.map((inscription) => (
                    <TableRow key={inscription.id}>
                      <TableCell className="font-medium">
                        {inscription.prenom} {inscription.nom}
                      </TableCell>
                      <TableCell>{inscription.email}</TableCell>
                      <TableCell>{inscription.programme}</TableCell>
                      <TableCell>
                        <Select
                          value={inscription.statut}
                          onValueChange={(value) => updateStatut(inscription.id, value)}
                        >
                          <SelectTrigger className="w-32">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="en_attente">En attente</SelectItem>
                            <SelectItem value="accepte">Accepté</SelectItem>
                            <SelectItem value="refuse">Refusé</SelectItem>
                          </SelectContent>
                        </Select>
                      </TableCell>
                      <TableCell>
                        {format(new Date(inscription.created_at), 'dd MMM yyyy', { locale: fr })}
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => {
                              setSelectedInscription(inscription);
                              setDialogOpen(true);
                            }}
                          >
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="text-destructive hover:text-destructive"
                            onClick={() => deleteInscription(inscription.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>Détails de l'inscription</DialogTitle>
          </DialogHeader>
          {selectedInscription && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">Nom</p>
                  <p className="font-medium">{selectedInscription.nom}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Prénom</p>
                  <p className="font-medium">{selectedInscription.prenom}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Email</p>
                  <p className="font-medium">{selectedInscription.email}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Téléphone</p>
                  <p className="font-medium">{selectedInscription.telephone}</p>
                </div>
                {selectedInscription.date_naissance && (
                  <div>
                    <p className="text-sm text-muted-foreground">Date de naissance</p>
                    <p className="font-medium">
                      {format(new Date(selectedInscription.date_naissance), 'dd/MM/yyyy', { locale: fr })}
                    </p>
                  </div>
                )}
                {selectedInscription.lieu_naissance && (
                  <div>
                    <p className="text-sm text-muted-foreground">Lieu de naissance</p>
                    <p className="font-medium">{selectedInscription.lieu_naissance}</p>
                  </div>
                )}
                <div className="col-span-2">
                  <p className="text-sm text-muted-foreground">Programme</p>
                  <p className="font-medium">{selectedInscription.programme}</p>
                </div>
                {selectedInscription.niveau_etude && (
                  <div className="col-span-2">
                    <p className="text-sm text-muted-foreground">Niveau d'étude</p>
                    <p className="font-medium">{selectedInscription.niveau_etude}</p>
                  </div>
                )}
                {selectedInscription.adresse && (
                  <div className="col-span-2">
                    <p className="text-sm text-muted-foreground">Adresse</p>
                    <p className="font-medium">{selectedInscription.adresse}</p>
                  </div>
                )}
                <div>
                  <p className="text-sm text-muted-foreground">Statut</p>
                  {getStatusBadge(selectedInscription.statut)}
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Date d'inscription</p>
                  <p className="font-medium">
                    {format(new Date(selectedInscription.created_at), "dd MMMM yyyy 'à' HH:mm", { locale: fr })}
                  </p>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Inscriptions;
