DROP TABLE IF EXISTS gratitudes;

CREATE TABLE gratitudes (
    id INTEGER PRIMARY KEY GENERATED BY DEFAULT AS IDENTITY ,
    text TEXT NOT NULL,
    date_created TIMESTAMPTZ DEFAULT now() NOT NULL,
    user_id INTEGER
        REFERENCES users(id) ON DELETE CASCADE NOT NULL,
    day_id INTEGER
        REFERENCES day_entries(id) ON DELETE CASCADE NOT NULL
);