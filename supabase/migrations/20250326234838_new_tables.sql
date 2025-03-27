DO $$ 
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'MEMBER_STATUS') THEN
        create type "public"."MEMBER_STATUS" as enum ('PENDING', 'APPROVED', 'DECLINED');
    END IF;
END $$;

DO $$ 
BEGIN
    IF EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'household_items' AND policyname = 'Users can delete items for their household') THEN
        drop policy "Users can delete items for their household" on "public"."household_items";
    END IF;
    
    IF EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'household_items' AND policyname = 'Users can insert items for their household') THEN
        drop policy "Users can insert items for their household" on "public"."household_items";
    END IF;
    
    IF EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'household_items' AND policyname = 'Users can update items for their household') THEN
        drop policy "Users can update items for their household" on "public"."household_items";
    END IF;
    
    IF EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'household_items' AND policyname = 'Users can view items for their household') THEN
        drop policy "Users can view items for their household" on "public"."household_items";
    END IF;
    
    IF EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'household_members' AND policyname = 'Enable read access for authenticated users') THEN
        drop policy "Enable read access for authenticated users" on "public"."household_members";
    END IF;
    
    IF EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'households' AND policyname = 'Enable read access for household members') THEN
        drop policy "Enable read access for household members" on "public"."households";
    END IF;
    
    IF EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'profiles' AND policyname = 'Public profiles are viewable by authenticated users') THEN
        drop policy "Public profiles are viewable by authenticated users" on "public"."profiles";
    END IF;
END $$;

DO $$ 
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_tables WHERE tablename = 'household_invites') THEN
        create table "public"."household_invites" (
            "id" uuid not null default gen_random_uuid(),
            "household_id" uuid not null,
            "invite_code" text not null,
            "created_at" timestamp with time zone not null default now()
        );
    END IF;
END $$;

alter table "public"."household_invites" enable row level security;

DO $$ 
BEGIN
    IF NOT EXISTS (
        SELECT 1 
        FROM information_schema.columns 
        WHERE table_name = 'household_members' 
        AND column_name = 'status'
    ) THEN
        alter table "public"."household_members" add column "status" "MEMBER_STATUS" not null default 'APPROVED'::"MEMBER_STATUS";
    END IF;
END $$;

DO $$ 
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_indexes WHERE indexname = 'household_invites_household_id_key') THEN
        CREATE UNIQUE INDEX household_invites_household_id_key ON public.household_invites USING btree (household_id);
    END IF;
    
    IF NOT EXISTS (SELECT 1 FROM pg_indexes WHERE indexname = 'household_invites_invite_code_idx') THEN
        CREATE INDEX household_invites_invite_code_idx ON public.household_invites USING btree (invite_code);
    END IF;
    
    IF NOT EXISTS (SELECT 1 FROM pg_indexes WHERE indexname = 'household_invites_invite_code_key') THEN
        CREATE UNIQUE INDEX household_invites_invite_code_key ON public.household_invites USING btree (invite_code);
    END IF;
    
    IF NOT EXISTS (SELECT 1 FROM pg_indexes WHERE indexname = 'household_invites_pkey') THEN
        CREATE UNIQUE INDEX household_invites_pkey ON public.household_invites USING btree (id);
    END IF;
END $$;

DO $$ 
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'household_invites_pkey') THEN
        alter table "public"."household_invites" add constraint "household_invites_pkey" PRIMARY KEY using index "household_invites_pkey";
    END IF;
    
    IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'household_invites_household_id_fkey') THEN
        alter table "public"."household_invites" add constraint "household_invites_household_id_fkey" FOREIGN KEY (household_id) REFERENCES households(id) ON DELETE CASCADE not valid;
        alter table "public"."household_invites" validate constraint "household_invites_household_id_fkey";
    END IF;
    
    IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'household_invites_household_id_key') THEN
        alter table "public"."household_invites" add constraint "household_invites_household_id_key" UNIQUE using index "household_invites_household_id_key";
    END IF;
    
    IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'household_invites_invite_code_key') THEN
        alter table "public"."household_invites" add constraint "household_invites_invite_code_key" UNIQUE using index "household_invites_invite_code_key";
    END IF;
END $$;

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


