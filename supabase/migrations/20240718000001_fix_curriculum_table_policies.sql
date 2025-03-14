-- Fix the curriculum table policies to ensure proper access

-- Drop existing policies if they exist
DROP POLICY IF EXISTS "Users can view their own curriculum data" ON curriculum;
DROP POLICY IF EXISTS "Users can insert their own curriculum data" ON curriculum;
DROP POLICY IF EXISTS "Users can update their own curriculum data" ON curriculum;

-- Create new policies with proper conditions
CREATE POLICY "Users can view their own curriculum data"
ON curriculum FOR SELECT
USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own curriculum data"
ON curriculum FOR INSERT
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own curriculum data"
ON curriculum FOR UPDATE
USING (auth.uid() = user_id);

-- Enable RLS on the curriculum table
ALTER TABLE curriculum ENABLE ROW LEVEL SECURITY;

-- Add the table to the realtime publication
ALTER PUBLICATION supabase_realtime ADD TABLE curriculum;
