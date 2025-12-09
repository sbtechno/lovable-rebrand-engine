import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent } from '@/components/ui/card';
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
import { toast } from 'sonner';
import { Eye, Trash2, RefreshCw, Mail, MailOpen } from 'lucide-react';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';

interface Contact {
  id: string;
  nom: string;
  email: string;
  sujet: string;
  message: string;
  lu: boolean;
  created_at: string;
}

const Contacts = () => {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  const fetchContacts = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('contacts')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setContacts(data || []);
    } catch (error) {
      console.error('Error fetching contacts:', error);
      toast.error('Erreur lors du chargement des messages');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchContacts();
  }, []);

  const markAsRead = async (id: string, lu: boolean) => {
    try {
      const { error } = await supabase
        .from('contacts')
        .update({ lu })
        .eq('id', id);

      if (error) throw error;

      setContacts(prev =>
        prev.map(c => (c.id === id ? { ...c, lu } : c))
      );
      
      if (selectedContact?.id === id) {
        setSelectedContact({ ...selectedContact, lu });
      }
    } catch (error) {
      console.error('Error updating read status:', error);
      toast.error('Erreur lors de la mise à jour');
    }
  };

  const deleteContact = async (id: string) => {
    if (!confirm('Êtes-vous sûr de vouloir supprimer ce message ?')) return;

    try {
      const { error } = await supabase
        .from('contacts')
        .delete()
        .eq('id', id);

      if (error) throw error;

      setContacts(prev => prev.filter(c => c.id !== id));
      setDialogOpen(false);
      toast.success('Message supprimé');
    } catch (error) {
      console.error('Error deleting contact:', error);
      toast.error('Erreur lors de la suppression');
    }
  };

  const openMessage = (contact: Contact) => {
    setSelectedContact(contact);
    setDialogOpen(true);
    if (!contact.lu) {
      markAsRead(contact.id, true);
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
          <h1 className="text-3xl font-display font-bold">Messages</h1>
          <p className="text-muted-foreground mt-2">
            {contacts.length} message(s) • {contacts.filter(c => !c.lu).length} non lu(s)
          </p>
        </div>
        <Button variant="outline" onClick={fetchContacts}>
          <RefreshCw className="h-4 w-4 mr-2" />
          Actualiser
        </Button>
      </div>

      <Card>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-10"></TableHead>
                  <TableHead>De</TableHead>
                  <TableHead>Sujet</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {contacts.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={5} className="text-center py-8 text-muted-foreground">
                      Aucun message pour le moment
                    </TableCell>
                  </TableRow>
                ) : (
                  contacts.map((contact) => (
                    <TableRow 
                      key={contact.id} 
                      className={!contact.lu ? 'bg-primary/5' : ''}
                    >
                      <TableCell>
                        {contact.lu ? (
                          <MailOpen className="h-4 w-4 text-muted-foreground" />
                        ) : (
                          <Mail className="h-4 w-4 text-primary" />
                        )}
                      </TableCell>
                      <TableCell>
                        <div>
                          <p className={`font-medium ${!contact.lu ? 'text-foreground' : 'text-muted-foreground'}`}>
                            {contact.nom}
                          </p>
                          <p className="text-sm text-muted-foreground">{contact.email}</p>
                        </div>
                      </TableCell>
                      <TableCell>
                        <p className={`${!contact.lu ? 'font-medium' : ''} line-clamp-1`}>
                          {contact.sujet}
                        </p>
                      </TableCell>
                      <TableCell className="text-muted-foreground">
                        {format(new Date(contact.created_at), 'dd MMM yyyy', { locale: fr })}
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => openMessage(contact)}
                          >
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="text-destructive hover:text-destructive"
                            onClick={() => deleteContact(contact.id)}
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
            <DialogTitle className="flex items-center justify-between">
              <span>Message</span>
              {selectedContact && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => markAsRead(selectedContact.id, !selectedContact.lu)}
                >
                  {selectedContact.lu ? (
                    <>
                      <Mail className="h-4 w-4 mr-2" />
                      Marquer non lu
                    </>
                  ) : (
                    <>
                      <MailOpen className="h-4 w-4 mr-2" />
                      Marquer lu
                    </>
                  )}
                </Button>
              )}
            </DialogTitle>
          </DialogHeader>
          {selectedContact && (
            <div className="space-y-4">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-lg">{selectedContact.nom}</p>
                    <p className="text-sm text-muted-foreground">{selectedContact.email}</p>
                  </div>
                  <Badge variant={selectedContact.lu ? 'secondary' : 'default'}>
                    {selectedContact.lu ? 'Lu' : 'Non lu'}
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground">
                  {format(new Date(selectedContact.created_at), "dd MMMM yyyy 'à' HH:mm", { locale: fr })}
                </p>
              </div>
              
              <div className="border-t pt-4">
                <p className="font-medium mb-2">{selectedContact.sujet}</p>
                <p className="text-muted-foreground whitespace-pre-wrap">{selectedContact.message}</p>
              </div>

              <div className="flex justify-between pt-4 border-t">
                <Button
                  variant="destructive"
                  onClick={() => deleteContact(selectedContact.id)}
                >
                  <Trash2 className="h-4 w-4 mr-2" />
                  Supprimer
                </Button>
                <Button
                  variant="outline"
                  onClick={() => window.open(`mailto:${selectedContact.email}?subject=Re: ${selectedContact.sujet}`)}
                >
                  <Mail className="h-4 w-4 mr-2" />
                  Répondre
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Contacts;
