create type "public"."MEMBER_ROLE" as enum ('CREATOR', 'MEMBER');

alter table "public"."household_members" add column "role" "MEMBER_ROLE" not null;

alter table "public"."household_members" alter column "id" set not null;

CREATE UNIQUE INDEX household_members_pkey ON public.household_members USING btree (id);

alter table "public"."household_members" add constraint "household_members_pkey" PRIMARY KEY using index "household_members_pkey";


