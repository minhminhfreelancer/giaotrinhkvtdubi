-- Enable row level security
ALTER TABLE curriculum ENABLE ROW LEVEL SECURITY;

-- Create policy for curriculum table
DROP POLICY IF EXISTS "Users can view and modify their own curriculum" ON curriculum;
CREATE POLICY "Users can view and modify their own curriculum"
  ON curriculum
  USING (user_id = auth.uid());

-- Enable realtime for curriculum table
alter publication supabase_realtime add table curriculum;
