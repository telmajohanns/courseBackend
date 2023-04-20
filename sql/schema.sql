CREATE TABLE
    users (
        username VARCHAR(255) NOT NULL UNIQUE,
        password VARCHAR(255) NOT NULL
    );

CREATE TABLE
    favorites (
        id SERIAL PRIMARY KEY,
        user_name VARCHAR(255),
        acronym VARCHAR(255)
    );