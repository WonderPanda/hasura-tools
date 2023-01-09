CREATE EXTENSION IF NOT EXISTS citext;
CREATE EXTENSION IF NOT EXISTS ltree;

CREATE OR REPLACE FUNCTION t_fn_updated() RETURNS TRIGGER AS
    $$
        BEGIN
            NEW.updated_at = CURRENT_TIMESTAMP;
            RETURN NEW;
        END;
    $$
LANGUAGE plpgsql;


