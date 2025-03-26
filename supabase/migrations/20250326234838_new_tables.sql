create type "public"."MEMBER_STATUS" as enum ('PENDING', 'APPROVED', 'DECLINED');

drop policy "Users can delete items for their household" on "public"."household_items";

drop policy "Users can insert items for their household" on "public"."household_items";

drop policy "Users can update items for their household" on "public"."household_items";

drop policy "Users can view items for their household" on "public"."household_items";

drop policy "Enable read access for authenticated users" on "public"."household_members";

drop policy "Enable read access for household members" on "public"."households";

drop policy "Public profiles are viewable by authenticated users" on "public"."profiles";

create table "public"."household_invites" (
    "id" uuid not null default gen_random_uuid(),
    "household_id" uuid not null,
    "invite_code" text not null,
    "created_at" timestamp with time zone not null default now()
);


alter table "public"."household_invites" enable row level security;

alter table "public"."household_members" add column "status" "MEMBER_STATUS" not null default 'APPROVED'::"MEMBER_STATUS";

CREATE UNIQUE INDEX household_invites_household_id_key ON public.household_invites USING btree (household_id);

CREATE INDEX household_invites_invite_code_idx ON public.household_invites USING btree (invite_code);

CREATE UNIQUE INDEX household_invites_invite_code_key ON public.household_invites USING btree (invite_code);

CREATE UNIQUE INDEX household_invites_pkey ON public.household_invites USING btree (id);

alter table "public"."household_invites" add constraint "household_invites_pkey" PRIMARY KEY using index "household_invites_pkey";

alter table "public"."household_invites" add constraint "household_invites_household_id_fkey" FOREIGN KEY (household_id) REFERENCES households(id) ON DELETE CASCADE not valid;

alter table "public"."household_invites" validate constraint "household_invites_household_id_fkey";

alter table "public"."household_invites" add constraint "household_invites_household_id_key" UNIQUE using index "household_invites_household_id_key";

alter table "public"."household_invites" add constraint "household_invites_invite_code_key" UNIQUE using index "household_invites_invite_code_key";

grant delete on table "public"."household_invites" to "anon";

grant insert on table "public"."household_invites" to "anon";

grant references on table "public"."household_invites" to "anon";

grant select on table "public"."household_invites" to "anon";

grant trigger on table "public"."household_invites" to "anon";

grant truncate on table "public"."household_invites" to "anon";

grant update on table "public"."household_invites" to "anon";

grant delete on table "public"."household_invites" to "authenticated";

grant insert on table "public"."household_invites" to "authenticated";

grant references on table "public"."household_invites" to "authenticated";

grant select on table "public"."household_invites" to "authenticated";

grant trigger on table "public"."household_invites" to "authenticated";

grant truncate on table "public"."household_invites" to "authenticated";

grant update on table "public"."household_invites" to "authenticated";

grant delete on table "public"."household_invites" to "service_role";

grant insert on table "public"."household_invites" to "service_role";

grant references on table "public"."household_invites" to "service_role";

grant select on table "public"."household_invites" to "service_role";

grant trigger on table "public"."household_invites" to "service_role";

grant truncate on table "public"."household_invites" to "service_role";

grant update on table "public"."household_invites" to "service_role";


