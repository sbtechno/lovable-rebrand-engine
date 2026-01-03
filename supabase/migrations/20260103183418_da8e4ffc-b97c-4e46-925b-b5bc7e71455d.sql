-- Add payment method and payment proof columns to inscriptions table
ALTER TABLE public.inscriptions 
ADD COLUMN payment_method TEXT,
ADD COLUMN payment_proof_url TEXT;