CREATE DATABASE soundCloud;

\c soundcloud

CREATE SEQUENCE sequence_for_songs
  INCREMENT 1
  MINVALUE 1
  MAXVALUE 9223372036854775807
  START 1
  CACHE 1;

CREATE SEQUENCE sequence_for_users
  INCREMENT 1
  MINVALUE 1
  MAXVALUE 9223372036854775807
  START 1
  CACHE 1;

CREATE SEQUENCE sequence_for_albums
  INCREMENT 1
  MINVALUE 1
  MAXVALUE 9223372036854775807
  START 1
  CACHE 1;

CREATE SEQUENCE sequence_for_likes
  INCREMENT 1
  MINVALUE 1
  MAXVALUE 9223372036854775807
  START 1
  CACHE 1;

CREATE SEQUENCE sequence_for_playlists
  INCREMENT 1
  MINVALUE 1
  MAXVALUE 9223372036854775807
  START 1
  CACHE 1;

CREATE SEQUENCE sequence_for_playlist_songs
  INCREMENT 1
  MINVALUE 1
  MAXVALUE 9223372036854775807
  START 1
  CACHE 1;

CREATE TABLE IF NOT EXISTS songs
(
  id VARCHAR(30) NOT NULL DEFAULT '0', 
  name VARCHAR(30),
  creator_id VARCHAR(11),
  album_id VARCHAR(50),
  CONSTRAINT songs_pkey PRIMARY KEY (id)

);
CREATE TABLE IF NOT EXISTS users
(
  id VARCHAR(30) NOT NULL DEFAULT '0',
  name VARCHAR(30)
);
CREATE TABLE IF NOT EXISTS albums
(
  id VARCHAR(11) NOT NULL DEFAULT '0',
  name VARCHAR(30),
  creator_id VARCHAR(11),
  genre VARCHAR(50)
);
CREATE TABLE IF NOT EXISTS playlists
(
  id VARCHAR(11) NOT NULL DEFAULT '0',
  name VARCHAR(30),
  creator_id VARCHAR(11)
);
CREATE TABLE IF NOT EXISTS likes
(
  id VARCHAR(11) NOT NULL DEFAULT '0',
  name VARCHAR(30),
  album_id VARCHAR(11),
  playlist_id VARCHAR(11),
  song_id VARCHAR(11),
  likey BOOLEAN,
  repost BOOLEAN
);
CREATE TABLE IF NOT EXISTS playlist_songs
(
  id VARCHAR(11) NOT NULL DEFAULT '0',
  song_id VARCHAR(11),
  playlist_id VARCHAR(11)
);

ALTER TABLE songs ALTER COLUMN id SET DEFAULT TO_CHAR(nextval('sequence_for_songs'::regclass),'"S"fm100000000');
ALTER TABLE users ALTER COLUMN id SET DEFAULT TO_CHAR(nextval('sequence_for_users'::regclass),'"U"fm1000000');
ALTER TABLE albums ALTER COLUMN id SET DEFAULT TO_CHAR(nextval('sequence_for_albums'::regclass),'"A"fm1000000');
ALTER TABLE playlists ALTER COLUMN id SET DEFAULT TO_CHAR(nextval('sequence_for_playlists'::regclass),'"P"fm1000000');
ALTER TABLE likes ALTER COLUMN id SET DEFAULT TO_CHAR(nextval('sequence_for_likes'::regclass),'"L"fm1000000');
ALTER TABLE playlist_songs ALTER COLUMN id SET DEFAULT TO_CHAR(nextval('sequence_for_playlist_songs'::regclass),'"I"fm100000000');


