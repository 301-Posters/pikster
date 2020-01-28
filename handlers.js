'use strict';

///////////////// DEPENDENCIES ///////////////////


const superagent = require('superagent');
const client = require('./database.js');

const generateMovie = (request, response) => {
  console.log(request.params);
  let key = process.env.MOVIE_API_KEY;
  superagent.get(`https://api.themoviedb.org/3/movie/${request.params.id}/similar?api_key=${key}&language=en-US&page=1`)
    .then(results => {
      // console.log(results.body);
      const responseObj = results.body.results.map(movie => new Movie(movie));
      response.render('EJS/detail.ejs', { movies: responseObj });
    })
    .catch(error => {
      console.error(error);
    })
}

const createAcc = (request, response) => {

  let message = request.query.error;
  if (request.query.error){
    message = 'Please login or create a user';
    response.status(200).render('EJS/createacc.ejs', {message: message});
  }

}

const generateLibrary = (request, response) => {

request.session.user = {
  id: 12,
}
  let user = request.session.user.id;
  let SQL2 = 'SELECT * from movies INNER JOIN movies_in_libraries ON movies.id = movies_in_libraries.movie_id WHERE $1 = movies_in_libraries.user_id;';
  let values = [user];
  client.query(SQL2, values)
    .then(results => {
      console.log(results.rows);
      response.render('EJS/library.ejs', { results: results.rows })
    })
    .catch(err => {
      console.log(err);
      // errorHandler('So sorry, your movie library is supposed to show up!', request, response);
    });

}

const renderLoginPage = (request,response) => {
  response.render('EJS/createAcc', {user: `Welcome`});

}

const secureLogin = (request, response) => {
  request.session.user = request.body.user;
  request.session.password = request.body.password;
  
  if (!request.session.user) {
    response.redirect('/createacc/?error=credentials');
  } else {

    response.redirect('/library');

  }

}

const deleteMovie = (request, response) => {
  console.log('some stuff');

}

const updateLibrary = (request, response) => {
  console.log('some stuff');

}


////// ERROR HANDLER FUNCTIONS //////

function notFoundHandler(request, response) {
  response.status(404).send('This route does not exist');
}

function errorHandler(error, request, response) {
  console.log('Error', error);
  response.status(500).send(error);
}

function getTrendingMovies(request, response) {

  let key = process.env.MOVIE_API_KEY;
  const trendingUrl = `https://api.themoviedb.org/3/trending/all/day?api_key=${key}`;
  superagent.get(trendingUrl)
    .then(data => {
      const responseObj = data.body.results.map(movie => new Movie(movie));
      const responseMovies = responseObj.filter(movie => movie.title);
      response.status(200).render('EJS/index.ejs', { movies: responseMovies });
    })
    .catch(() => errorHandler('Something went wrong', response));
}


// movie constructor function
function Movie(movie) {
  this.movieId = movie.id;
  this.title = movie.title;
  this.descript = movie.overview;
  this.image_url = `https://image.tmdb.org/t/p/w500${movie.backdrop_path}`;
}

// Error Handlers
function errorHandler(string, response) {
  response.status(500).send(string);
}

module.exports = {
  generateMovie: generateMovie,
  createAcc: createAcc,
  generateLibrary: generateLibrary,
  secureLogin: secureLogin,
  deleteMovie: deleteMovie,
  updateLibrary: updateLibrary,
  errorHandler: errorHandler,
  notFoundHandler: notFoundHandler,
  getTrendingMovies: getTrendingMovies,
  renderLoginPage: renderLoginPage

};
