-- First, drop everything in the correct order
drop table if exists "public"."household_members";
drop type if exists "public"."MEMBER_ROLE";
drop type if exists "public"."MEMBER_ROLE__old_version_to_be_dropped";

-- Then create the enum type BEFORE creating the table that uses it
create type "public"."MEMBER_ROLE" as enum ('CREATOR', 'MEMBER');

-- Now create the table (after the enum exists)
create table "public"."household_members" (
  id uuid default gen_random_uuid() not null,
  household_id uuid references public.households on delete cascade not null,
  member_id uuid references auth.users on delete cascade not null,
  role "public"."MEMBER_ROLE" not null,  -- Note the quotes around the type name
  created_at timestamp with time zone default now() not null,
  
  constraint household_members_pkey primary key (id),
  constraint household_members_household_id_member_id_key unique (household_id, member_id)
);


