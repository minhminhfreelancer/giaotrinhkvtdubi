-- Drop the existing policy if it exists
DROP POLICY IF EXISTS "Users can view their own roles" ON user_roles;

-- Create a simpler policy that doesn't cause recursion
CREATE POLICY "Users can view their own roles"
ON user_roles FOR SELECT
USING (auth.uid() = user_id);

-- Enable RLS on the table
ALTER TABLE user_roles ENABLE ROW LEVEL SECURITY;
