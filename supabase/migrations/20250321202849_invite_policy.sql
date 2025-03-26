-- Drop existing policy
DROP POLICY IF EXISTS "Enable read access for authenticated users" ON public.household_members;

-- Allow users to read memberships where:
-- 1. They are the member OR
-- 2. They are the creator of the household
CREATE POLICY "Enable read access for household members and creators"
ON public.household_members
FOR SELECT
TO authenticated
USING (
  member_id = auth.uid() OR
  household_id IN (
    SELECT id 
    FROM households 
    WHERE creator_id = auth.uid()
  )
);