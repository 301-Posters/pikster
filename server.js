'use strict';

///////////////// DEPENDENCIES ///////////////////
const express = require('express');
const app = express();
const cors = require('cors');
require('dotenv').config();
const PORT = process.env.PORT || 3001;



////////////////////////CUSTOM MODULES///////////////////////////////////
const routeHandlers = require('./handlers');


///////////////////////CONFIGURE EXPRESS//////////////////////////////
app.use(cors());
app.set('view egine', 'ejs');
app.set('views', './views');


////////////////////////// ROUTES ////////////////////////////////

//hit api, get list of popular movies, render recommended movies
app.get('/', (request, response) => {
response.send('Hello') 
}) 

//parse user-selected movie for TMDb ID and hit TMDb for "recommendations", Randomly pick one of the results.
//send to user by rendering newMovie.ejs
app.post('/generatemovie/:id', routeHandlers.generateMovie);

//render create account page. (tbd based on front end needs)
app.get('/createacc', routeHandlers.createAcc);

// renders users personal library
app.get('/library', routeHandlers.generateLibrary);

//check the login credentials on the request, then redirect to /library or /
app.post('/securelogin/:id', routeHandlers.secureLogin);

//delete movie from users library
app.delete('/movie', routeHandlers.deleteMovie);

//change blacklist status for individual movie
app.put('/update', routeHandlers.updateLibrary);


// function authorize (request, response, next){
//     if (!request.session.user) {
//         response.redirect('/createacc');
//     } else {
//         next();
//     }
// }


app.listen(PORT, () => console.log(`We are listening on port ${PORT}!`))

module.exports = {server: app};