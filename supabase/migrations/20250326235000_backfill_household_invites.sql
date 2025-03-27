-- Enable pgcrypto extension for gen_random_uuid
CREATE EXTENSION IF NOT EXISTS pgcrypto;

-- Function to generate a 6-character random code
CREATE OR REPLACE FUNCTION generate_invite_code()
RETURNS text AS $$
DECLARE
    chars text := 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    result text := '';
    i integer;
BEGIN
    FOR i IN 1..6 LOOP
        result := result || substr(chars, floor(random() * length(chars) + 1)::integer, 1);
    END LOOP;
    RETURN result;
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