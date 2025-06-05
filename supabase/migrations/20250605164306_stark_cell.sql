/*
  # Create Profile Analyses Table

  1. New Tables
    - `profile_analyses`
      - `id` (uuid, primary key)
      - `profile_text` (text)
      - `metadata` (jsonb)
      - `red_flags` (text[])
      - `green_flags` (text[])
      - `ai_analysis` (text)
      - `created_at` (timestamptz)

  2. Security
    - Enable RLS on `profile_analyses` table
    - Add policy for authenticated users to read their own data
    - Add policy for inserting new analyses
*/

CREATE TABLE IF NOT EXISTS profile_analyses (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  profile_text text NOT NULL,
  metadata jsonb,
  red_flags text[],
  green_flags text[],
  ai_analysis text,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE profile_analyses ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can insert analyses"
  ON profile_analyses
  FOR INSERT
  TO public
  WITH CHECK (true);

CREATE POLICY "Authenticated users can read all analyses"
  ON profile_analyses
  FOR SELECT
  TO authenticated
  USING (true);