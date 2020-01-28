'use strict';

///////////////// DEPENDENCIES ///////////////////


const express = require('express');
const app = express();
const superagent = require('superagent');
require('dotenv').config();
const pg = require('pg');
const session = require('express-session')
const client = new pg.Client(process.env.DATABASE_URL);

app.set('view egine', 'ejs');
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
  console.log('some stuff');

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
  getTrendingMovies: getTrendingMovies
};
