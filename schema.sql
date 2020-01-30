DROP TABLE IF EXISTS movies;
DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS movies_in_libraries;

CREATE TABLE movies (
    id SERIAL PRIMARY KEY,
    descript TEXT,
    title VARCHAR (255),
    image_url VARCHAR
);  

CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(255),
    password VARCHAR(255) not null
);

CREATE TABLE movies_in_libraries (
    user_id INT not null,
    movie_id INT not null
);  

