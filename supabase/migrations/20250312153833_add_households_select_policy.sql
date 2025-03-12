-- Drop any existing policies if you want to start fresh
DROP POLICY IF EXISTS "Enable read access for household members" ON public.households;

-- Create policy for reading households
CREATE POLICY "Enable read access for household members"
ON public.households
FOR SELECT
TO authenticated
USING (
  id IN (
    SELECT household_id
    FROM public.household_members
    WHERE member_id = auth.uid()
  )
);