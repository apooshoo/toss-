DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS groups;
DROP TABLE IF EXISTS users_groups;
DROP TABLE IF EXISTS users_friends;


CREATE TABLE IF NOT EXISTS users (
  id SERIAL PRIMARY KEY,
  username TEXT,
  password TEXT
  );

CREATE TABLE IF NOT EXISTS groups (
  id SERIAL PRIMARY KEY,
  groupname TEXT
  );

CREATE TABLE IF NOT EXISTS users_groups (
  id SERIAL PRIMARY KEY,
  userId INTEGER,
  groupId INTEGER,
  entry TEXT DEFAULT NULL
  );

CREATE TABLE IF NOT EXISTS users_friends (
  id SERIAL PRIMARY KEY,
  userId INTEGER,
  friendId INTEGER,
  winBalance INTEGER DEFAULT 0
  );