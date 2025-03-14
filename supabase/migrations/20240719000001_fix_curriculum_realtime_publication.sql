-- Check if the table is already in the publication before adding it
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_publication_tables 
    WHERE pubname = 'supabase_realtime' 
    AND schemaname = 'public' 
    AND tablename = 'curriculum'
  ) THEN
    -- Only add if it doesn't exist
    ALTER PUBLICATION supabase_realtime ADD TABLE public.curriculum;
  END IF;
END
$$;
