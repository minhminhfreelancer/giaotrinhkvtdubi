-- Drop existing policies that might be causing recursion
DROP POLICY IF EXISTS "Users can view their own data" ON users;
DROP POLICY IF EXISTS "Admin users can view all users" ON users;
DROP POLICY IF EXISTS "District leaders can view all users" ON users;
DROP POLICY IF EXISTS "Users can view their own roles" ON user_roles;

-- Create simpler policies without recursion
CREATE POLICY "Public access to users"
  ON users FOR SELECT
  USING (true);

CREATE POLICY "Public access to user_roles"
  ON user_roles FOR SELECT
  USING (true);

-- Enable RLS on tables
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_roles ENABLE ROW LEVEL SECURITY;
