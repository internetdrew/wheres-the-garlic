DROP POLICY IF EXISTS "Users can view members in their households" ON public.household_members;
DROP POLICY IF EXISTS "Users can insert themselves as members" ON public.household_members;
DROP POLICY IF EXISTS "Users can delete their own membership" ON public.household_members;
DROP POLICY IF EXISTS "Users can update their own membership" ON public.household_members;

CREATE POLICY "Enable read access for authenticated users"
ON public.household_members
FOR SELECT
TO authenticated
USING (
  member_id = auth.uid()
);