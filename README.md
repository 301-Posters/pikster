# Pikster
## Purpose
A fun, simple, and user-specific application that makes movie recommendations based on the users movie preferences. The user will also be able to create their own login profile to add movies their own personal queue list library.


## Project Detail
1. The main page will display images/preferences and user login
2. The user profile will be stored in a database
3. Once a preference is selected they will be brought to a movie page where a list of movie recommendations will show.
4. When the user clicks on a movie, if already logged in, the movie will be added to their own personal movie library as well as rendering previously added movies. If user does not have a login, they will be prompted to create a username and password.
5. When navigating away from this page the page is saved in the database
6. When the about us link is pressed the user is brought to the About Us page
7. The user can then go back to the home page to change their preferences and or get a new recommendation for a movie.
8.  The footer link can be clicked which is a link to the github page
## Project Members
1. Tyler Sayvetz
- [LinkedIn](https://www.linkedin.com/in/tylersayvetz/)
- [GitHub](https://github.com/tylersayvetz)
2. Harlen Lopez
- [LinkedIn](https://www.linkedin.com/in/harlen-lopez-ab9349aa/)
- [GitHub](https://github.com/harlenlopez)
3. Andrew Kyllo
- [LinkedIn](https://www.linkedin.com/in/andrewkyllo/)
- [GitHub](https://github.com/kyllo34)
4. Allyson Reyes
- [LinkedIn](https://www.linkedin.com/in/allyson-reyes/)
- [GitHub](https://github.com/areyes986)
## How to Run this App  
1. You can access this app from the deployed webpage,https://piksterbooks.herokuapp.com/

2. **Git Clone**  
In our [GitHub repo](https://github.com/301-Posters/pikster), 
run this command into your terminal:
`git clone https://github.com/301-Posters/pikster.git`

    **Packages**  
    Once cloned down and pulled up,
    run `npm i` in your terminal to install all the dependencies.

    **Nodemon**  
    Still in your terminal enter `nodemon` which will start the server and run the code. 

    **Database**  
    Assuming you have *PostgreSQL*, enter `psql` into your terminal and enter `CREATE DATABASE pikster`

    **Browser**  
    In your browsers address bar, enter `localhost:3000`

## User Stories  
1. As a user, I want to be able to add movies to my library.  
**Given** that a user wants save a movie to watch later  
**When** the user clicks on a movie they like  
**Then** the page will display their own library with movies they have added to it.  

2. As a user, I would like to be presented with preferences to select from which a movie is recommended.  
**Given** the user wants a movie recommendation   
**When** they click on one of the preferences  
**Then** they will be presented with a list of movie recommendations similar to the movie they have chosen

3. As a user, I want to be able to delete movies from my library
**Given** that a user wants a movie deleted from their library  
**When** the user can click on the delete button  
**Then** the movie selected will then be deleted

4. As a user, I would like to login to my own personal library using a unique username and password
**Given** wants to view their own library  
**When** the user logins to their own profile  
**Then** the user is able to view previously added movies as well as adding to their existing library  

5. As a user I would like to be able update my password   
**Given** wants to change their current password  
**When** they click on the update password button  
**Then** they are prompted to enter a new password for their username  


## Wire Frame/Domain Model
[Initial WireFrame & Domain Model](https://app.moqups.com/xOKlkPzC4H/view)  
[Current Domain Model](https://drive.google.com/file/d/1zQCPy2Ws5GmuKEoA0r9dgQcKnn0nMJ30/view?usp=sharing)

## Our Dependencies  
    "cors": "^2.8.5",
    "dotenv": "^8.2.0",
    "ejs": "^3.0.1",
    "express": "^4.17.1",
    "express-session": "^1.17.0",
    "pg": "^7.17.1",
    "superagent": "^5.2.1"


## Resources
Our API - [The Movie Database](https://www.themoviedb.org/documentation/api)  
Custom Fonts - [Google Fonts](https://fonts.google.com/)  
Image in Index - [Unsplash](https://unsplash.com/photos/evlkOfkQ5rE)  
Password & Safety - [BCrypt](https://www.npmjs.com/package/bcrypt) and [Sessions](https://phppot.com/php/php-login-script-with-session/)  
