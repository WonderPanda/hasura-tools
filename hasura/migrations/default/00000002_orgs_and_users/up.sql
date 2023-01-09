CREATE TABLE organizations
(
    id         bigserial PRIMARY KEY,
    name       citext,
    created_at timestamptz NOT NULL DEFAULT NOW(),
    updated_at timestamptz NOT NULL DEFAULT NOW()
);

CREATE TRIGGER t_organizations_updated
    BEFORE UPDATE
    ON organizations
    FOR EACH ROW
EXECUTE PROCEDURE t_fn_updated();

CREATE TABLE users
(
    id         bigserial PRIMARY KEY,
    first_name text,
    last_name  text,
    email      citext UNIQUE NOT NULL,
    created_at timestamptz   NOT NULL DEFAULT NOW(),
    updated_at timestamptz   NOT NULL DEFAULT NOW()
);

CREATE TRIGGER t_users_updated
    BEFORE UPDATE
    ON users
    FOR EACH ROW
EXECUTE PROCEDURE t_fn_updated();

CREATE TABLE memberships
(
    organization_id bigint      NOT NULL REFERENCES organizations (id),
    user_id         bigint      NOT NULL REFERENCES users (id),
    PRIMARY KEY (organization_id, user_id),
    created_at      timestamptz NOT NULL DEFAULT NOW()
);

CREATE TABLE posts
(
    organization_id bigint      NOT NULL REFERENCES organizations (id),
    id              bigserial,
    content         text        NOT NULL,
    created_at      timestamptz NOT NULL DEFAULT NOW(),
    updated_at      timestamptz NOT NULL DEFAULT NOW(),
    PRIMARY KEY (organization_id, id)
);

CREATE TRIGGER t_post_updated
    BEFORE UPDATE
    ON posts
    FOR EACH ROW
EXECUTE PROCEDURE t_fn_updated();

