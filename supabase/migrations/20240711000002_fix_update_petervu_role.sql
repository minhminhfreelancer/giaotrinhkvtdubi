-- This migration fixes the ambiguous column reference issue

DO $$
DECLARE
  v_user_id UUID;
  v_role_id UUID;
BEGIN
  -- Get the user ID for petervu7777@gmail.com
  SELECT id INTO v_user_id FROM auth.users WHERE email = 'petervu7777@gmail.com';
  
  -- Get the role ID for trainee_district_leader
  SELECT id INTO v_role_id FROM public.roles WHERE name = 'trainee_district_leader';
  
  -- Delete any existing roles for this user
  DELETE FROM public.user_roles WHERE public.user_roles.user_id = v_user_id;
  
  -- Insert the trainee_district_leader role for this user
  INSERT INTO public.user_roles (user_id, role_id) VALUES (v_user_id, v_role_id);
  
  RAISE NOTICE 'Updated role for user %', v_user_id;
END;
$$;