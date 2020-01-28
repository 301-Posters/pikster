'use strict';

///////////////// DEPENDENCIES ///////////////////


require('dotenv').config();
// Express server library
const express = require('express');
// Create an application using express
const app = express();
const pg = require('pg');
const superagent = require('superagent');
// On the server, we'll use EJS to do templates
app.set('view engine', 'ejs');
// The location of our EJS Templates
app.set('views', './views');


////////////////////////MODULES////////////////////////



const generateMovie = (request, response) => {
  console.log('some stuff');

}

const createAcc = (request, response) => {
  console.log('some stuff');
}

const generateLibrary = (request, response) => {
  console.log('some stuff');

}

const secureLogin = (request, response) => {
  console.log('some stuff');

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
