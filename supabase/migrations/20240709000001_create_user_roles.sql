-- Create roles table
CREATE TABLE IF NOT EXISTS roles (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL UNIQUE,
  description TEXT
);

-- Create user_roles table for role assignments
CREATE TABLE IF NOT EXISTS user_roles (
  id SERIAL PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  role_id INTEGER NOT NULL REFERENCES roles(id) ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id, role_id)
);

-- Insert default roles
INSERT INTO roles (name, description) VALUES
('admin', 'System administrator with full access'),
('district_leader', 'District leader with management privileges'),
('teacher', 'Teacher with limited access'),
('student', 'Regular student user');

-- Create a trigger to automatically add new users to the public.users table
CREATE OR REPLACE FUNCTION public.handle_new_user() 
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.users (id, email, full_name)
  VALUES (NEW.id, NEW.email, NEW.raw_user_meta_data->>'full_name');
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create users table if it doesn't exist
CREATE TABLE IF NOT EXISTS users (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT UNIQUE,
  full_name TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create the trigger on auth.users
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Enable realtime for these tables
alter publication supabase_realtime add table roles;
alter publication supabase_realtime add table user_roles;
alter publication supabase_realtime add table users;

-- Create RLS policies
DROP POLICY IF EXISTS "Users can view their own data" ON users;
CREATE POLICY "Users can view their own data"
  ON users FOR SELECT
  USING (auth.uid() = id);

DROP POLICY IF EXISTS "Admin users can view all users" ON users;
CREATE POLICY "Admin users can view all users"
  ON users FOR SELECT
  USING (EXISTS (
    SELECT 1 FROM user_roles ur
    JOIN roles r ON ur.role_id = r.id
    WHERE ur.user_id = auth.uid() AND r.name = 'admin'
  ));

DROP POLICY IF EXISTS "District leaders can view all users" ON users;
CREATE POLICY "District leaders can view all users"
  ON users FOR SELECT
  USING (EXISTS (
    SELECT 1 FROM user_roles ur
    JOIN roles r ON ur.role_id = r.id
    WHERE ur.user_id = auth.uid() AND r.name = 'district_leader'
  ));

-- Insert petervu7777@gmail.com as district leader if not exists
DO $$
DECLARE
  user_id UUID;
  district_leader_role_id INTEGER;
BEGIN
  -- Get the district_leader role ID
  SELECT id INTO district_leader_role_id FROM roles WHERE name = 'district_leader';
  
  -- Check if the user exists in auth.users
  SELECT id INTO user_id FROM auth.users WHERE email = 'petervu7777@gmail.com';
  
  -- If user doesn't exist, create them
  IF user_id IS NULL THEN
    -- We can't directly insert into auth.users from SQL, so we'll handle this in application code
    RAISE NOTICE 'User petervu7777@gmail.com does not exist in auth.users table';
  ELSE
    -- Assign district_leader role to the user if not already assigned
    INSERT INTO user_roles (user_id, role_id)
    VALUES ($1, district_leader_role_id)
    ON CONFLICT (user_id, role_id) DO NOTHING;
  END IF;
END;
$$;