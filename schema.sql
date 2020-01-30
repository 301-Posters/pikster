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


insert into users (id, username, password) VALUES (12, 'bob', 'bob');

insert into movies_in_libraries (user_id, movie_id) values (12, 1);
insert into movies_in_libraries (user_id, movie_id) values (12, 2);
insert into movies_in_libraries (user_id, movie_id) values (12, 3);
insert into movies_in_libraries (user_id, movie_id) values (11, 1);

insert into movies (id, descript, title) values (1, 'Super awesome movie', 'The Best Movie');
insert into movies (id, descript, title) values (2, 'Super awesome movie2', 'The Best Movie 2');
insert into movies (id, descript, title) values (3, 'Super old movie', 'The Best (old) Movie');
insert into movies (id, descript, title) values (4, 'Not bobs movie', 'The notbob Movie');



 
    
