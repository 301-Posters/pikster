'use strict';

///////////////// DEPENDENCIES ///////////////////
const express = require('express');
const app = express();
require('dotenv').config();
const PORT = process.env.PORT || 3001;

const superagent = require('superagent');
const pg = require('pg');
const client = new pg.Client(process.env.DATABASE_URL);
const cors = require('cors');

////////////////////////CUSTOM MODULES///////////////////////////////////
const routeHandlers = require('./handlers');

app.use(cors());


////////////////////////// ROUTES ////////////////////////////////

//hit api, get list of popular movies, render recommended movies
app.get('/', (request, response) => {
response.send('Hello')
}) 

//parse user-selected movie for TMDb ID and hit TMDb for "recommendations", Randomly pick one of the results.
//send to user by rendering newMovie.ejs
app.post('/generatemovie', routeHandlers.generateMovie);

//render create account page. (tbd based on front end needs)
app.get('/createacc', routeHandlers.createAcc);

// renders users personal library
app.get('/library', routeHandlers.generateLibrary);

//check the login credentials on the request, then redirect to /library or /
app.post('/securelogin', routeHandlers.secureLogin);

//delete movie from users library
app.delete('/movie', routeHandlers.deleteMovie);

//change blacklist status for individual movie
app.put('/update', routeHandlers.updateLibrary);


app.listen(PORT, () => console.log(`We are listening on port ${PORT}!`))

module.exports = {server: app};