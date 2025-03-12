alter table "public"."households" add column "creator_id" uuid not null;

alter table "public"."households" add constraint "households_creator_id_fkey" FOREIGN KEY (creator_id) REFERENCES auth.users(id) ON UPDATE CASCADE ON DELETE CASCADE not valid;

alter table "public"."households" validate constraint "households_creator_id_fkey";


