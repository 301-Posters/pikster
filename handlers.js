'use strict';

///////////////// DEPENDENCIES ///////////////////


const express = require('express');
const app = express();
const superagent = require('superagent');
require('dotenv').config();
const pg = require('pg');
const session = require('express-session')
const client = new pg.Client(process.env.DATABASE_URL);

app.set('view engine', 'ejs');
app.set('views', './views');
app.use(express.urlencoded({ extended: true }));
app.use(session({ secret: "789vbnmk", resave: true, saveUninitialized: true }));



const generateMovie = (request, response) => {
  console.log(request.params);
  let key = process.env.MOVIE_API_KEY;
  superagent.get(`https://api.themoviedb.org/3/movie/${request.params.id}/similar?api_key=${key}&language=en-US&page=1`)
    .then(results => {
      // console.log(results.body);
      const responseObj = results.body.results.map(movie => new Movie(movie));
      response.render('EJS/detail.ejs', {movies: responseObj});
    })
    .catch(error => {
      console.error(error);
    })
}

const createAcc = (request, response) => {
  console.log('some stuff');
}

const generateLibrary = (request, response) => {
  // let SQL = 'INSERT INTO movies_in_libraries (user_id, movie_id, black_list) VALUES ($1, $2, $3);';

  // let safeValues = [user_id, movie_id, black_list];


  // return client.query(SQL, safeValues)
  // // .then(result => response.send('/library', console.log('hello', result)))
  // .then(result => response.send(`/library/${result.rows[0].user_id}`))
  // .catch(() => {
  //   errorHandler ('Library not in database', request, response);
  // });

  
  // let SQL2 = 'SELECT * FROM movies_in_libraries;';

  // return client.query(SQL2)
  //   .then(results => {
  //     response.render('./EJS/library.ejs', console.log('hello', results))
  //     // response.render('./EJS/library.ejs', { results: results.rows })
  //   })
  //   .catch(() => {
  //     errorHandler('So sorry, your movie library is supposed to show up!', request, response);
  //   });

}

const secureLogin = (request, response) => {
  request.session.selectedMovie = request.params.id;
}

const deleteMovie = (request, response) => {
  console.log('some stuff');

}

const updateLibrary = (request, response) => {
  console.log('some stuff');

}


////// ERROR HANDLER FUNCTIONS //////

function notFoundHandler(request, response){
  response.status(404).send('This route does not exist');
}

function errorHandler(error, request, response){
  console.log('Error', error);
  response.status(500).send(error);
}

function getTrendingMovies(request, response) {

  let key = process.env.TMDB_API_KEY;
  const trendingUrl = `https://api.themoviedb.org/3/trending/all/day?api_key=${key}`;
  superagent.get(trendingUrl)
    .then(data => {
      const responseObj = data.body.results.map(movie => new Movie(movie));
      const responseMovies = responseObj.filter(movie => movie.title);
      response.status(200).render('EJS/index.ejs', {movies: responseMovies});
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
  notFoundHandler: notFoundHandler
  getTrendingMovies: getTrendingMovies

};
