create type "public"."ITEM_STATUS" as enum ('FULL', 'HALFWAY', 'LOW', 'OUT');

create type "public"."MEMBER_ROLE" as enum ('Owner', 'Admin', 'Member');

create table "public"."household_items" (
    "created_at" timestamp with time zone not null default now(),
    "household_id" uuid not null,
    "name" text not null,
    "status" "ITEM_STATUS" not null,
    "notes" text,
    "last_updated_by" uuid not null,
    "last_updated_at" timestamp with time zone not null default now(),
    "id" uuid default gen_random_uuid()
);


alter table "public"."household_items" enable row level security;

create table "public"."household_members" (
    "created_at" timestamp with time zone not null default now(),
    "household_id" uuid not null,
    "member_id" uuid not null,
    "role" "MEMBER_ROLE" not null,
    "id" uuid default gen_random_uuid()
);


alter table "public"."household_members" enable row level security;

create table "public"."households" (
    "id" uuid not null default gen_random_uuid(),
    "name" text not null,
    "created_at" timestamp with time zone not null default now(),
    "updated_at" timestamp with time zone not null default now()
);


alter table "public"."households" enable row level security;

CREATE INDEX household_members_household_id_member_id_idx ON public.household_members USING btree (household_id, member_id);

CREATE UNIQUE INDEX households_pkey ON public.households USING btree (id);

alter table "public"."households" add constraint "households_pkey" PRIMARY KEY using index "households_pkey";

alter table "public"."household_items" add constraint "household_items_household_id_fkey" FOREIGN KEY (household_id) REFERENCES households(id) ON UPDATE CASCADE ON DELETE CASCADE not valid;

alter table "public"."household_items" validate constraint "household_items_household_id_fkey";

alter table "public"."household_items" add constraint "household_items_last_updated_by_fkey" FOREIGN KEY (last_updated_by) REFERENCES auth.users(id) ON UPDATE CASCADE ON DELETE CASCADE not valid;

alter table "public"."household_items" validate constraint "household_items_last_updated_by_fkey";

alter table "public"."household_members" add constraint "household_members_household_id_fkey" FOREIGN KEY (household_id) REFERENCES households(id) ON UPDATE CASCADE ON DELETE CASCADE not valid;

alter table "public"."household_members" validate constraint "household_members_household_id_fkey";

alter table "public"."household_members" add constraint "household_members_member_id_fkey1" FOREIGN KEY (member_id) REFERENCES auth.users(id) ON UPDATE CASCADE ON DELETE CASCADE not valid;

alter table "public"."household_members" validate constraint "household_members_member_id_fkey1";

grant delete on table "public"."household_items" to "anon";

grant insert on table "public"."household_items" to "anon";

grant references on table "public"."household_items" to "anon";

grant select on table "public"."household_items" to "anon";

grant trigger on table "public"."household_items" to "anon";

grant truncate on table "public"."household_items" to "anon";

grant update on table "public"."household_items" to "anon";

grant delete on table "public"."household_items" to "authenticated";

grant insert on table "public"."household_items" to "authenticated";

grant references on table "public"."household_items" to "authenticated";

grant select on table "public"."household_items" to "authenticated";

grant trigger on table "public"."household_items" to "authenticated";

grant truncate on table "public"."household_items" to "authenticated";

grant update on table "public"."household_items" to "authenticated";

grant delete on table "public"."household_items" to "service_role";

grant insert on table "public"."household_items" to "service_role";

grant references on table "public"."household_items" to "service_role";

grant select on table "public"."household_items" to "service_role";

grant trigger on table "public"."household_items" to "service_role";

grant truncate on table "public"."household_items" to "service_role";

grant update on table "public"."household_items" to "service_role";

grant delete on table "public"."household_members" to "anon";

grant insert on table "public"."household_members" to "anon";

grant references on table "public"."household_members" to "anon";

grant select on table "public"."household_members" to "anon";

grant trigger on table "public"."household_members" to "anon";

grant truncate on table "public"."household_members" to "anon";

grant update on table "public"."household_members" to "anon";

grant delete on table "public"."household_members" to "authenticated";

grant insert on table "public"."household_members" to "authenticated";

grant references on table "public"."household_members" to "authenticated";

grant select on table "public"."household_members" to "authenticated";

grant trigger on table "public"."household_members" to "authenticated";

grant truncate on table "public"."household_members" to "authenticated";

grant update on table "public"."household_members" to "authenticated";

grant delete on table "public"."household_members" to "service_role";

grant insert on table "public"."household_members" to "service_role";

grant references on table "public"."household_members" to "service_role";

grant select on table "public"."household_members" to "service_role";

grant trigger on table "public"."household_members" to "service_role";

grant truncate on table "public"."household_members" to "service_role";

grant update on table "public"."household_members" to "service_role";

grant delete on table "public"."households" to "anon";

grant insert on table "public"."households" to "anon";

grant references on table "public"."households" to "anon";

grant select on table "public"."households" to "anon";

grant trigger on table "public"."households" to "anon";

grant truncate on table "public"."households" to "anon";

grant update on table "public"."households" to "anon";

grant delete on table "public"."households" to "authenticated";

grant insert on table "public"."households" to "authenticated";

grant references on table "public"."households" to "authenticated";

grant select on table "public"."households" to "authenticated";

grant trigger on table "public"."households" to "authenticated";

grant truncate on table "public"."households" to "authenticated";

grant update on table "public"."households" to "authenticated";

grant delete on table "public"."households" to "service_role";

grant insert on table "public"."households" to "service_role";

grant references on table "public"."households" to "service_role";

grant select on table "public"."households" to "service_role";

grant trigger on table "public"."households" to "service_role";

grant truncate on table "public"."households" to "service_role";

grant update on table "public"."households" to "service_role";


