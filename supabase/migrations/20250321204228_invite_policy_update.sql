-- For household_members table
DROP POLICY IF EXISTS "Enable read access for authenticated users" ON public.household_members;


-- For households table
DROP POLICY IF EXISTS "Enable read access for household members" ON public.households;
