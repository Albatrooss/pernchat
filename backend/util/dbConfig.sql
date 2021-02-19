CREATE DATABASE pern_chat;

CREATE TABLE users(
    user_id SERIAL PRIMARY KEY,
    username varchar(30),
    first_name varchar(30),
    last_name varchar(30),
    email varchar(40) UNIQUE,
    password varchar(128),
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE friends(
    friends_id SERIAL PRIMARY KEY,
    creator_id INT,
    friend_id INT,
    accepted INT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);