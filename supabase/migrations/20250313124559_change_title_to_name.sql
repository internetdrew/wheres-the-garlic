alter table "public"."household_items" drop column "title";

alter table "public"."household_items" add column "name" text not null;


