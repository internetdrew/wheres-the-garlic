
-- Create MEMBER_STATUS enum for household_members
CREATE TYPE "public"."MEMBER_STATUS" AS ENUM ('PENDING', 'APPROVED');

-- Add status to household_members
ALTER TABLE "public"."household_members"
ADD COLUMN "status" "public"."MEMBER_STATUS" NOT NULL DEFAULT 'APPROVED';

-- Simplify household_invites table
DROP TABLE IF EXISTS "public"."household_invites";
CREATE TABLE "public"."household_invites" (
    "id" uuid DEFAULT gen_random_uuid() NOT NULL,
    "household_id" uuid NOT NULL,
    "invite_code" text NOT NULL,
    "created_at" timestamp with time zone NOT NULL DEFAULT now(),
    CONSTRAINT "household_invites_pkey" PRIMARY KEY ("id"),
    CONSTRAINT "household_invites_household_id_fkey" FOREIGN KEY ("household_id") REFERENCES "public"."households"("id") ON DELETE CASCADE,
    CONSTRAINT "household_invites_invite_code_key" UNIQUE ("invite_code")
);

DROP TYPE IF EXISTS "public"."INVITE_STATUS";

-- Create index for faster lookups
CREATE INDEX "household_invites_invite_code_idx" ON "public"."household_invites" ("invite_code");

-- Enable RLS
ALTER TABLE "public"."household_invites" ENABLE ROW LEVEL SECURITY;

-- Create RLS policies
CREATE POLICY "Anyone can view invite codes"
ON "public"."household_invites"
FOR SELECT
TO authenticated
USING (true);

CREATE POLICY "Only household creators can manage invites"
ON "public"."household_invites"
FOR ALL
TO authenticated
USING (
    household_id IN (
        SELECT id FROM households 
        WHERE creator_id = auth.uid()
    )
);

-- Create invites for existing households that don't have one
DO $$
DECLARE
    household_record RECORD;
    invite_code TEXT;
BEGIN
    FOR household_record IN 
        SELECT h.id
        FROM households h
        LEFT JOIN household_invites hi ON h.id = hi.household_id
        WHERE hi.id IS NULL
    LOOP
        -- Generate a unique 6-character invite code
        invite_code := UPPER(substring(encode(gen_random_bytes(6), 'base64') from 1 for 6));
        
        -- Create an invite for the household
        INSERT INTO household_invites (
            household_id,
            invite_code
        ) VALUES (
            household_record.id,
            invite_code
        );
    END LOOP;
END $$;

-- Add comments
COMMENT ON TABLE "public"."household_invites" IS 'Stores household invite codes';
COMMENT ON COLUMN "public"."household_invites"."invite_code" IS 'The unique invite code for this household';
COMMENT ON COLUMN "public"."household_members"."status" IS 'The status of the member (PENDING or APPROVED)';