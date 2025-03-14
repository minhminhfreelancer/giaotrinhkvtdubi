-- Create the get_curriculum_data function
CREATE OR REPLACE FUNCTION get_curriculum_data(p_user_id UUID, p_month INTEGER)
RETURNS SETOF curriculum AS $$
BEGIN
  RETURN QUERY
  SELECT *
  FROM curriculum
  WHERE user_id = p_user_id AND month = p_month;
END;
$$ LANGUAGE plpgsql;
