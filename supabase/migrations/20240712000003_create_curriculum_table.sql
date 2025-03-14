-- Create curriculum table for storing trainee district leader curriculum data
CREATE TABLE IF NOT EXISTS curriculum (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  month INTEGER NOT NULL,
  evangelism_goal TEXT,
  evangelism_plan TEXT,
  education_goal TEXT,
  education_plan TEXT,
  management_plan TEXT,
  weekly_schedules JSONB,
  assessments JSONB,
  truth_book_reflections JSONB,
  sermon_book_reflections JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create index for faster lookups
CREATE INDEX IF NOT EXISTS curriculum_user_id_month_idx ON curriculum(user_id, month);

-- Enable row level security
ALTER TABLE curriculum ENABLE ROW LEVEL SECURITY;

-- Create policies
-- Users can view their own curriculum
DROP POLICY IF EXISTS "Users can view their own curriculum" ON curriculum;
CREATE POLICY "Users can view their own curriculum"
  ON curriculum FOR SELECT
  USING (auth.uid() = user_id);

-- Users can insert their own curriculum
DROP POLICY IF EXISTS "Users can insert their own curriculum" ON curriculum;
CREATE POLICY "Users can insert their own curriculum"
  ON curriculum FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Users can update their own curriculum
DROP POLICY IF EXISTS "Users can update their own curriculum" ON curriculum;
CREATE POLICY "Users can update their own curriculum"
  ON curriculum FOR UPDATE
  USING (auth.uid() = user_id);

-- Add realtime support
alter publication supabase_realtime add table curriculum;
