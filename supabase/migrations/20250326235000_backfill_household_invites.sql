-- Enable pgcrypto extension for nanoid
CREATE EXTENSION IF NOT EXISTS pgcrypto;

-- Function to generate a 6-digit nanoid
CREATE OR REPLACE FUNCTION generate_invite_code()
RETURNS text AS $$
BEGIN
    RETURN nanoid(6);
END;
$$ LANGUAGE plpgsql;

-- Insert invites for all existing households that don't have one
INSERT INTO household_invites (id, household_id, invite_code, created_at)
SELECT 
    gen_random_uuid(),
    h.id,
    generate_invite_code(),
    NOW()
FROM households h
LEFT JOIN household_invites hi ON h.id = hi.household_id
WHERE hi.id IS NULL;

-- Drop the temporary function
DROP FUNCTION generate_invite_code(); 