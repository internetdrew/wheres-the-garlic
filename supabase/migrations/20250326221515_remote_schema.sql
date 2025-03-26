drop policy "Anyone can view invite codes" on "public"."household_invites";

drop policy "Only household creators can manage invites" on "public"."household_invites";

drop policy "Enable read access for household members and creators" on "public"."household_members";

revoke delete on table "public"."household_invites" from "anon";

revoke insert on table "public"."household_invites" from "anon";

revoke references on table "public"."household_invites" from "anon";

revoke select on table "public"."household_invites" from "anon";

revoke trigger on table "public"."household_invites" from "anon";

revoke truncate on table "public"."household_invites" from "anon";

revoke update on table "public"."household_invites" from "anon";

revoke delete on table "public"."household_invites" from "authenticated";

revoke insert on table "public"."household_invites" from "authenticated";

revoke references on table "public"."household_invites" from "authenticated";

revoke select on table "public"."household_invites" from "authenticated";

revoke trigger on table "public"."household_invites" from "authenticated";

revoke truncate on table "public"."household_invites" from "authenticated";

revoke update on table "public"."household_invites" from "authenticated";

revoke delete on table "public"."household_invites" from "service_role";

revoke insert on table "public"."household_invites" from "service_role";

revoke references on table "public"."household_invites" from "service_role";

revoke select on table "public"."household_invites" from "service_role";

revoke trigger on table "public"."household_invites" from "service_role";

revoke truncate on table "public"."household_invites" from "service_role";

revoke update on table "public"."household_invites" from "service_role";

alter table "public"."household_invites" drop constraint "household_invites_household_id_fkey";

alter table "public"."household_invites" drop constraint "household_invites_invite_code_key";

alter table "public"."household_invites" drop constraint "household_invites_pkey";

drop index if exists "public"."household_invites_invite_code_idx";

drop index if exists "public"."household_invites_invite_code_key";

drop index if exists "public"."household_invites_pkey";

drop table "public"."household_invites";

alter table "public"."household_members" drop column "status";

drop type "public"."MEMBER_STATUS";

create policy "Enable read access for authenticated users"
on "public"."household_members"
as permissive
for select
to authenticated
using ((member_id = auth.uid()));


create policy "Enable read access for household members"
on "public"."households"
as permissive
for select
to authenticated
using ((id IN ( SELECT household_members.household_id
   FROM household_members
  WHERE (household_members.member_id = auth.uid()))));



