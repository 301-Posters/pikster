DROP TABLE IF EXISTS books;
DROP TABLE IF EXISTS movies;
DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS movies_in_libraries;

CREATE TABLE movies (
    id SERIAL PRIMARY KEY,
    director VARCHAR(255),
    genre VARCHAR(255),
    descript TEXT,
    year INT,
    title VARCHAR (255),
    black_list BOOLEAN
);  

CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    usernames VARCHAR(255)
);

CREATE TABLE movies_in_libraries (
    user_id INT not null,
    movie_id INT not null
);  


    
