-- Create a function to generate nanoid-like codes
CREATE OR REPLACE FUNCTION generate_nanoid(length integer)
RETURNS text AS $$
DECLARE
    alphabet text := '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
    id text := '';
    i integer;
BEGIN
    FOR i IN 1..length LOOP
        id := id || substr(alphabet, floor(random() * length(alphabet) + 1)::integer, 1);
    END LOOP;
    RETURN id;
END;
$$ LANGUAGE plpgsql;

-- Create invites for existing households
DO $$
DECLARE
    household_record RECORD;
    invite_code TEXT;
BEGIN
    -- Loop through all households
    FOR household_record IN 
        SELECT h.id, h.creator_id
        FROM households h
        LEFT JOIN household_invites hi ON h.id = hi.household_id
        WHERE hi.id IS NULL
    LOOP
        -- Generate a unique invite code using nanoid-like function
        invite_code := UPPER(generate_nanoid(6));
        
        -- Create an invite for the household
        INSERT INTO household_invites (
            household_id,
            invite_code,
            invited_by,
            expires_at,
            status
        ) VALUES (
            household_record.id,
            invite_code,
            household_record.creator_id,
            NOW() + INTERVAL '30 days',
            'PENDING'
        );
    END LOOP;
END $$;

-- Drop the temporary function
DROP FUNCTION generate_nanoid(integer); 