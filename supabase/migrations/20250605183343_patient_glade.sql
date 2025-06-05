/*
  # Add Profile Comparison Support

  1. New Tables
    - `profile_comparisons`
      - `id` (uuid, primary key)
      - `profile_a_id` (uuid, references profile_analyses)
      - `profile_b_id` (uuid, references profile_analyses)
      - `compatibility_score` (integer)
      - `common_interests` (text[])
      - `differences` (text[])
      - `recommendations` (text[])
      - `created_at` (timestamptz)

  2. Security
    - Enable RLS on `profile_comparisons` table
    - Add policies for authenticated users
*/

CREATE TABLE IF NOT EXISTS profile_comparisons (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  profile_a_id uuid REFERENCES profile_analyses(id) ON DELETE CASCADE,
  profile_b_id uuid REFERENCES profile_analyses(id) ON DELETE CASCADE,
  compatibility_score integer,
  common_interests text[],
  differences text[],
  recommendations text[],
  created_at timestamptz DEFAULT now()
);

ALTER TABLE profile_comparisons ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can read their own comparisons"
  ON profile_comparisons
  FOR SELECT
  TO authenticated
  USING (
    auth.uid() IN (
      SELECT user_id FROM profile_analyses 
      WHERE id = profile_a_id OR id = profile_b_id
    )
  );

CREATE POLICY "Users can create comparisons"
  ON profile_comparisons
  FOR INSERT
  TO authenticated
  WITH CHECK (true);