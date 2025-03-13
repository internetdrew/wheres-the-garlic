create policy "Users can delete items for their household"
on "public"."household_items"
as permissive
for delete
to public
using ((household_id IN ( SELECT household_members.household_id
   FROM household_members
  WHERE (household_members.member_id = auth.uid()))));


create policy "Users can insert items for their household"
on "public"."household_items"
as permissive
for insert
to public
with check ((household_id IN ( SELECT household_members.household_id
   FROM household_members
  WHERE (household_members.member_id = auth.uid()))));


create policy "Users can update items for their household"
on "public"."household_items"
as permissive
for update
to public
using ((household_id IN ( SELECT household_members.household_id
   FROM household_members
  WHERE (household_members.member_id = auth.uid()))))
with check ((household_id IN ( SELECT household_members.household_id
   FROM household_members
  WHERE (household_members.member_id = auth.uid()))));


create policy "Users can view items for their household"
on "public"."household_items"
as permissive
for select
to public
using ((household_id IN ( SELECT household_members.household_id
   FROM household_members
  WHERE (household_members.member_id = auth.uid()))));



