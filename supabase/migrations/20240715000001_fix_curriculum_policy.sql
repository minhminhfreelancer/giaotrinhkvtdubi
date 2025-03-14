-- Fix curriculum table policy without adding to realtime publication again

-- Drop existing policy if it exists
DROP POLICY IF EXISTS "Users can view and update their own curriculum" ON curriculum;

-- Create policy for curriculum table
CREATE POLICY "Users can view and update their own curriculum"
ON curriculum
FOR ALL
TO authenticated
USING (auth.uid() = user_id)
WITH CHECK (auth.uid() = user_id);
