-- Fix curriculum table access issues
ALTER TABLE public.curriculum ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Users can view their own curriculum data" ON public.curriculum;
CREATE POLICY "Users can view their own curriculum data"
ON public.curriculum FOR SELECT
USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can insert their own curriculum data" ON public.curriculum;
CREATE POLICY "Users can insert their own curriculum data"
ON public.curriculum FOR INSERT
WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can update their own curriculum data" ON public.curriculum;
CREATE POLICY "Users can update their own curriculum data"
ON public.curriculum FOR UPDATE
USING (auth.uid() = user_id);
