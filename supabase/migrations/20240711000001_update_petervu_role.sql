-- First, find the user ID for petervu7777@gmail.com
DO $$
DECLARE
  user_id UUID;
  trainee_role_id UUID;
BEGIN
  -- Get the user ID
  SELECT id INTO user_id FROM auth.users WHERE email = 'petervu7777@gmail.com';
  
  -- Get the trainee_district_leader role ID
  SELECT id INTO trainee_role_id FROM public.roles WHERE name = 'trainee_district_leader';
  
  -- If user exists, update their role
  IF user_id IS NOT NULL AND trainee_role_id IS NOT NULL THEN
    -- Delete any existing roles for this user
    DELETE FROM public.user_roles WHERE user_id = v_user_id;
    
    -- Insert the trainee_district_leader role
    INSERT INTO public.user_roles (user_id, role_id)
    VALUES (user_id, trainee_role_id);
  END IF;
END;
$$;