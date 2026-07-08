-- Add missing amenity and cooler preference fields
ALTER TABLE public.preferences
  ADD COLUMN IF NOT EXISTS booking_cooler BOOLEAN DEFAULT false,
  ADD COLUMN IF NOT EXISTS amen_exhaust BOOLEAN DEFAULT false,
  ADD COLUMN IF NOT EXISTS amen_fan BOOLEAN DEFAULT false,
  ADD COLUMN IF NOT EXISTS amen_curtains BOOLEAN DEFAULT false,
  ADD COLUMN IF NOT EXISTS amen_bulb BOOLEAN DEFAULT false;
