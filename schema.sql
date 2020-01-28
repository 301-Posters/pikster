DROP TABLE IF EXISTS movies;
DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS movies_in_libraries;

CREATE TABLE movies (
    id SERIAL PRIMARY KEY,
    descript TEXT,
    year INT,
    title VARCHAR (255)
);  

CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(255),
    password VARCHAR(255)
);

CREATE TABLE movies_in_libraries (
    user_id INT not null,
    movie_id INT not null,
    black_list BOOLEAN
);  


insert into users (id, username, password) VALUES (12, 'bob', 'bob');

insert into movies_in_libraries (user_id, movie_id, black_list) values (12, 1, false);
insert into movies_in_libraries (user_id, movie_id, black_list) values (12, 2, false);
insert into movies_in_libraries (user_id, movie_id, black_list) values (12, 3, false);
insert into movies_in_libraries (user_id, movie_id, black_list) values (11, 1, false);

insert into movies (id, descript, year, title) values (1, 'Super awesome movie', 1999, 'The Best Movie');
insert into movies (id, descript, year, title) values (2, 'Super awesome movie2', 2010, 'The Best Movie 2');
insert into movies (id, descript, year, title) values (3, 'Super old movie', 1949, 'The Best (old) Movie');
insert into movies (id, descript, year, title) values (4, 'Not bobs movie', 1999, 'The notbob Movie');



 
    
