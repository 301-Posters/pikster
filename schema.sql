DROP TABLE IF EXISTS books;
DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS libraries;

CREATE TABLE IF NOT EXISTS books (
    bookid SERIAL PRIMARY KEY,
    author VARCHAR(255),
    timeline VARCHAR(255),
    descript TEXT,
    title VARCHAR (255)
);  

CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    usernames VARCHAR(255),
    libraryid INT not null
);

CREATE TABLE IF NOT EXISTS libraries (
    libraryid PRIMARY KEY,
    bookid INT not null,
    bookmark INT not null
);  
    
