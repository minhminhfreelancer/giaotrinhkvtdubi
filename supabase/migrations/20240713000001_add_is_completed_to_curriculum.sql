-- Add is_completed column to curriculum table if it doesn't exist
DO $$ 
BEGIN
    IF NOT EXISTS (
        SELECT 1 
        FROM information_schema.columns 
        WHERE table_name = 'curriculum' 
        AND column_name = 'is_completed'
    ) THEN
        ALTER TABLE curriculum ADD COLUMN is_completed BOOLEAN DEFAULT FALSE;
    END IF;
END $$;
