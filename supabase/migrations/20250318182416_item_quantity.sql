alter table "public"."household_items" add column "quantity" integer;

alter table "public"."household_items" alter column "status" drop not null;


