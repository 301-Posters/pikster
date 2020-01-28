'use strict';

///////////////// DEPENDENCIES ///////////////////
const express = require('express');
const app = express();
const cors = require('cors');
require('dotenv').config();
const PORT = process.env.PORT || 3001;
const session = require('express-session');



const superagent = require('superagent');
const pg = require('pg');
const client = new pg.Client(process.env.DATABASE_URL);
client.on('error', err => console.error(err));

// On the server, we'll use EJS to do templates
app.set('view engine', 'ejs');
// The location of our EJS Templates
app.set('views', './views');



////////////////////////CUSTOM MODULES///////////////////////////////////
const routeHandlers = require('./handlers');


///////////////////////CONFIGURE EXPRESS//////////////////////////////
app.use(cors());
app.set('view egine', 'ejs');
app.set('views', './views');

app.use(express.urlencoded({ extended: true }));
app.use(session({ secret: "789vbnmk", resave: true, saveUninitialized: true }));

////////////////////////// ROUTES ////////////////////////////////

//hit api, get list of popular movies, render recommended movies
app.get('/', routeHandlers.getTrendingMovies); 

//parse user-selected movie for TMDb ID and hit TMDb for "recommendations", Randomly pick one of the results.
//send to user by rendering newMovie.ejs
app.post('/generatemovie/:id', routeHandlers.generateMovie);

//render create account page. (tbd based on front end needs)
app.get('/createacc', routeHandlers.createAcc);

// renders users personal library
app.get('/library', routeHandlers.generateLibrary);

//check the login credentials on the request, then redirect to /library or /
app.get('/securelogin/:id', routeHandlers.renderLoginPage);
app.post('/securelogin', routeHandlers.secureLogin);


//delete movie from users library
app.delete('/movie', routeHandlers.deleteMovie);

//change blacklist status for individual movie
app.put('/update', routeHandlers.updateLibrary);

// error handlers routes
app.use('*', routeHandlers.notFoundHandler);
app.use(routeHandlers.errorHandler);


// function authorize (request, response, next){
//     if (!request.session.user) {
//         response.redirect('/createacc');
//     } else {
//         next();
//     }
// }
client.connect()
  .then(() => {
    app.listen(PORT, ()=> (console.log(`We are listening on port ${PORT}!`)));
  })
  .catch(err => console.log('UHH OHHH!!!', err));


module.exports = {server: app};