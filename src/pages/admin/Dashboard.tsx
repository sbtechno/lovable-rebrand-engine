import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Users, Mail, Clock, CheckCircle } from 'lucide-react';

const Dashboard = () => {
  const [stats, setStats] = useState({
    totalInscriptions: 0,
    pendingInscriptions: 0,
    totalContacts: 0,
    unreadContacts: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        // Fetch inscriptions count
        const { count: totalInscriptions } = await supabase
          .from('inscriptions')
          .select('*', { count: 'exact', head: true });

        const { count: pendingInscriptions } = await supabase
          .from('inscriptions')
          .select('*', { count: 'exact', head: true })
          .eq('statut', 'en_attente');

        // Fetch contacts count
        const { count: totalContacts } = await supabase
          .from('contacts')
          .select('*', { count: 'exact', head: true });

        const { count: unreadContacts } = await supabase
          .from('contacts')
          .select('*', { count: 'exact', head: true })
          .eq('lu', false);

        setStats({
          totalInscriptions: totalInscriptions || 0,
          pendingInscriptions: pendingInscriptions || 0,
          totalContacts: totalContacts || 0,
          unreadContacts: unreadContacts || 0,
        });
      } catch (error) {
        console.error('Error fetching stats:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  const statCards = [
    {
      title: 'Total Inscriptions',
      value: stats.totalInscriptions,
      icon: Users,
      color: 'text-primary',
      bg: 'bg-primary/10',
    },
    {
      title: 'En attente',
      value: stats.pendingInscriptions,
      icon: Clock,
      color: 'text-secondary',
      bg: 'bg-secondary/10',
    },
    {
      title: 'Total Messages',
      value: stats.totalContacts,
      icon: Mail,
      color: 'text-blue-600',
      bg: 'bg-blue-100',
    },
    {
      title: 'Non lus',
      value: stats.unreadContacts,
      icon: CheckCircle,
      color: 'text-destructive',
      bg: 'bg-destructive/10',
    },
  ];

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-display font-bold">Tableau de bord</h1>
        <p className="text-muted-foreground mt-2">Vue d'ensemble de l'administration</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {statCards.map((stat) => (
          <Card key={stat.title}>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {stat.title}
              </CardTitle>
              <div className={`p-2 rounded-lg ${stat.bg}`}>
                <stat.icon className={`h-5 w-5 ${stat.color}`} />
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold">{stat.value}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Bienvenue dans l'administration</CardTitle>
          </CardHeader>
          <CardContent className="text-muted-foreground">
            <p>
              Utilisez le menu latéral pour naviguer entre les différentes sections :
            </p>
            <ul className="list-disc list-inside mt-4 space-y-2">
              <li><strong>Inscriptions</strong> : Gérer les demandes d'inscription des étudiants</li>
              <li><strong>Messages</strong> : Consulter les messages du formulaire de contact</li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
