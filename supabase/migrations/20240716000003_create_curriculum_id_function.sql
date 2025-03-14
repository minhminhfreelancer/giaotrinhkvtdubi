-- Create function to get curriculum ID
CREATE OR REPLACE FUNCTION get_curriculum_id(p_user_id UUID, p_month INTEGER)
RETURNS TABLE (id UUID)
SECURITY DEFINER
LANGUAGE plpgsql
AS $$
BEGIN
  RETURN QUERY
  SELECT c.id
  FROM public.curriculum c
  WHERE c.user_id = p_user_id AND c.month = p_month;
END;
$$;
