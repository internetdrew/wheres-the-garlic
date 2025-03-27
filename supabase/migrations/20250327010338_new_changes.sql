drop policy "Anyone can view invite codes" on "public"."household_invites";

drop policy "Only household creators can manage invites" on "public"."household_invites";

drop policy "Enable read access for household members and creators" on "public"."household_members";

alter table "public"."household_members" alter column "status" drop default;

alter type "public"."MEMBER_STATUS" rename to "MEMBER_STATUS__old_version_to_be_dropped";

create type "public"."MEMBER_STATUS" as enum ('PENDING', 'APPROVED', 'DECLINED');

alter table "public"."household_members" alter column status type "public"."MEMBER_STATUS" using status::text::"public"."MEMBER_STATUS";

alter table "public"."household_members" alter column "status" set default 'APPROVED'::"MEMBER_STATUS";

drop type "public"."MEMBER_STATUS__old_version_to_be_dropped";


