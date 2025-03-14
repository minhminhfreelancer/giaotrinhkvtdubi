-- Create function to get curriculum completion status
CREATE OR REPLACE FUNCTION get_curriculum_completion(p_user_id UUID, p_month INTEGER)
RETURNS TABLE (is_completed BOOLEAN)
SECURITY DEFINER
LANGUAGE plpgsql
AS $$
BEGIN
  RETURN QUERY
  SELECT c.is_completed
  FROM public.curriculum c
  WHERE c.user_id = p_user_id AND c.month = p_month;
  
  -- If no rows returned, return false
  IF NOT FOUND THEN
    RETURN QUERY SELECT false::BOOLEAN;
  END IF;
END;
$$;

-- Create function to get all completed months for a user
CREATE OR REPLACE FUNCTION get_completed_months(p_user_id UUID)
RETURNS TABLE (month INTEGER)
SECURITY DEFINER
LANGUAGE plpgsql
AS $$
BEGIN
  RETURN QUERY
  SELECT c.month
  FROM public.curriculum c
  WHERE c.user_id = p_user_id AND c.is_completed = true;
END;
$$;
