-- Run this in the Supabase SQL Editor to set up the waitlist table

CREATE TABLE waitlist (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  referral_code TEXT UNIQUE NOT NULL,
  referred_by TEXT,
  position INTEGER NOT NULL,
  referral_count INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- RLS: anonymous insert-only, no direct reads
ALTER TABLE waitlist ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow anonymous inserts"
  ON waitlist FOR INSERT
  TO anon
  WITH CHECK (true);

-- No anonymous SELECT policy — all reads go through service role in API routes

-- Indexes
CREATE INDEX idx_waitlist_referral_code ON waitlist(referral_code);
CREATE INDEX idx_waitlist_email ON waitlist(email);

-- Function to increment referral count
CREATE OR REPLACE FUNCTION increment_referral_count(code TEXT)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  UPDATE waitlist
  SET referral_count = referral_count + 1
  WHERE referral_code = code;
END;
$$;
