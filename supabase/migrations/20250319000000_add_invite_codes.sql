-- Create invite status enum
create type "public"."INVITE_STATUS" as enum ('PENDING', 'ACCEPTED', 'REJECTED', 'EXPIRED');

-- Create household_invites table
create table "public"."household_invites" (
    "id" uuid default gen_random_uuid() not null,
    "household_id" uuid not null,
    "invite_code" text not null,
    "status" "public"."INVITE_STATUS" not null default 'PENDING',
    "invited_by" uuid not null,
    "expires_at" timestamp with time zone not null,
    "accepted_at" timestamp with time zone,
    "created_at" timestamp with time zone not null default now(),
    "updated_at" timestamp with time zone not null default now(),
    constraint "household_invites_pkey" primary key ("id"),
    constraint "household_invites_household_id_fkey" foreign key ("household_id") references "public"."households"("id") on delete cascade,
    constraint "household_invites_invited_by_fkey" foreign key ("invited_by") references "public"."profiles"("id") on delete cascade
);

-- Add unique constraint on invite code
create unique index "household_invites_invite_code_key" on "public"."household_invites" ("invite_code");

-- Add index for household lookups
create index "household_invites_household_id_idx" on "public"."household_invites" ("household_id");

-- Enable RLS
alter table "public"."household_invites" enable row level security;

-- Create RLS policies
create policy "Users can view invites for their households"
on "public"."household_invites"
for select
to authenticated
using (
    household_id in (
        select household_id
        from household_members
        where member_id = auth.uid()
    )
);

create policy "Users can create invites for their households"
on "public"."household_invites"
for insert
to authenticated
with check (
    household_id in (
        select household_id
        from household_members
        where member_id = auth.uid()
    )
    and invited_by = auth.uid()
);

create policy "Users can update invites for their households"
on "public"."household_invites"
for update
to authenticated
using (
    household_id in (
        select household_id
        from household_members
        where member_id = auth.uid()
    )
)
with check (
    household_id in (
        select household_id
        from household_members
        where member_id = auth.uid()
    )
);

create policy "Users can delete invites for their households"
on "public"."household_invites"
for delete
to authenticated
using (
    household_id in (
        select household_id
        from household_members
        where member_id = auth.uid()
    )
);

-- Add comments
comment on table "public"."household_invites" is 'Stores household invite records with their status and details';
comment on column "public"."household_invites"."invite_code" is 'The unique invite code for this invitation';
comment on column "public"."household_invites"."status" is 'Current status of the invite (PENDING, ACCEPTED, REJECTED, EXPIRED)';
comment on column "public"."household_invites"."invited_by" is 'The user who created this invite';
comment on column "public"."household_invites"."expires_at" is 'When this invite expires';
comment on column "public"."household_invites"."accepted_at" is 'When this invite was accepted (null if not accepted)'; 