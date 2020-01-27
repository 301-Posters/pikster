DROP TABLE IF EXISTS books;
DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS books_in_libraries;

CREATE TABLE books (
    id SERIAL PRIMARY KEY,
    author VARCHAR(255),
    timeline VARCHAR(255),
    descript TEXT,
    title VARCHAR (255)
);  

CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    usernames VARCHAR(255),
);

CREATE TABLE books_in_libraries (
    user_id INT not null,
    book_id INT not null,
    bookmark INT not null
);  


    
