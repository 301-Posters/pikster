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
    library_id INT not null
);

CREATE TABLE books_in_libraries (
    library_id SERIAL PRIMARY KEY,
    book_id INT not null,
    bookmark INT not null,
    user INT not null
);  


    
