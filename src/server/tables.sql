CREATE TABLE IF NOT EXISTS users (
  id SERIAL PRIMARY KEY,
  username TEXT,
  password TEXT
  );

CREATE TABLE IF NOT EXISTS groups (
  id SERIAL PRIMARY KEY,
  groupname TEXT,
  );

CREATE TABLE IF NOT EXISTS users_groups (
  id SERIAL PRIMARY KEY,
  userId INTEGER,
  groupId INTEGER,
  entry TEXT
  );

CREATE TABLE IF NOT EXISTS users_friends (
  id SERIAL PRIMARY KEY,
  userId INTEGER,
  friendId INTEGER
  );