-- Table pour les inscriptions des étudiants
CREATE TABLE public.inscriptions (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  nom TEXT NOT NULL,
  prenom TEXT NOT NULL,
  email TEXT NOT NULL,
  telephone TEXT NOT NULL,
  date_naissance DATE,
  lieu_naissance TEXT,
  adresse TEXT,
  programme TEXT NOT NULL,
  niveau_etude TEXT,
  statut TEXT NOT NULL DEFAULT 'en_attente',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Table pour les messages de contact
CREATE TABLE public.contacts (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  nom TEXT NOT NULL,
  email TEXT NOT NULL,
  sujet TEXT NOT NULL,
  message TEXT NOT NULL,
  lu BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Activer RLS sur les tables
ALTER TABLE public.inscriptions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.contacts ENABLE ROW LEVEL SECURITY;

-- Politique pour permettre à tous d'insérer des inscriptions (formulaire public)
CREATE POLICY "Tout le monde peut s'inscrire" 
ON public.inscriptions 
FOR INSERT 
WITH CHECK (true);

-- Politique pour permettre à tous d'envoyer des messages de contact (formulaire public)
CREATE POLICY "Tout le monde peut envoyer un message" 
ON public.contacts 
FOR INSERT 
WITH CHECK (true);

-- Fonction pour mettre à jour updated_at
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

-- Trigger pour inscriptions
CREATE TRIGGER update_inscriptions_updated_at
BEFORE UPDATE ON public.inscriptions
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();