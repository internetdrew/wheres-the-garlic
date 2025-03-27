DO $$ 
BEGIN
    IF EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'household_invites' AND policyname = 'Anyone can view invite codes') THEN
        drop policy "Anyone can view invite codes" on "public"."household_invites";
    END IF;
    
    IF EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'household_invites' AND policyname = 'Only household creators can manage invites') THEN
        drop policy "Only household creators can manage invites" on "public"."household_invites";
    END IF;
    
    IF EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'household_members' AND policyname = 'Enable read access for household members and creators') THEN
        drop policy "Enable read access for household members and creators" on "public"."household_members";
    END IF;
END $$;

alter table "public"."household_members" alter column "status" drop default;

alter type "public"."MEMBER_STATUS" rename to "MEMBER_STATUS__old_version_to_be_dropped";

create type "public"."MEMBER_STATUS" as enum ('PENDING', 'APPROVED', 'DECLINED');

alter table "public"."household_members" alter column status type "public"."MEMBER_STATUS" using status::text::"public"."MEMBER_STATUS";

alter table "public"."household_members" alter column "status" set default 'APPROVED'::"MEMBER_STATUS";

drop type "public"."MEMBER_STATUS__old_version_to_be_dropped";


