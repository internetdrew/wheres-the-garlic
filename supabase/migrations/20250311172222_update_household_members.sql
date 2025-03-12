alter table "public"."household_members" drop constraint "household_members_household_id_member_id_key";

alter table "public"."household_members" drop constraint "household_members_member_id_fkey";

alter table "public"."household_members" drop constraint "household_members_household_id_fkey";

alter table "public"."household_members" drop constraint "household_members_pkey";

drop index if exists "public"."household_members_household_id_member_id_key";

drop index if exists "public"."household_members_pkey";

alter type "public"."MEMBER_ROLE" rename to "MEMBER_ROLE__old_version_to_be_dropped";

create type "public"."MEMBER_ROLE" as enum ('Owner', 'Admin', 'Member');

alter table "public"."household_members" alter column role type "public"."MEMBER_ROLE" using role::text::"public"."MEMBER_ROLE";

drop type "public"."MEMBER_ROLE__old_version_to_be_dropped";

alter table "public"."household_members" alter column "id" drop not null;

alter table "public"."household_members" enable row level security;

CREATE INDEX household_members_household_id_member_id_idx ON public.household_members USING btree (household_id, member_id);

alter table "public"."household_members" add constraint "household_members_member_id_fkey1" FOREIGN KEY (member_id) REFERENCES auth.users(id) ON UPDATE CASCADE ON DELETE CASCADE not valid;

alter table "public"."household_members" validate constraint "household_members_member_id_fkey1";

alter table "public"."household_members" add constraint "household_members_household_id_fkey" FOREIGN KEY (household_id) REFERENCES households(id) ON UPDATE CASCADE ON DELETE CASCADE not valid;

alter table "public"."household_members" validate constraint "household_members_household_id_fkey";


