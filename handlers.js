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

  let message = request.query.error || 'Yay';
  response.status(200).render('EJS/createacc.ejs', { message: message });


}

//display the library page, use session.user to render user specific info (name etc).
//if there is a new book, it is in the query.
const generateLibrary = (request, response) => {
  //queries: newBook. The TMDB id of the new book.
  //params: none
  //body: none

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

const renderLoginPage = (request, response) => {
  if (request.session.user) {
    response.redirect(`/library?newBook=${req.params.id}`)
  } else {
    response.render('EJS/createAcc', { message: `Welcome` });
  }
}

const secureLogin = (request, response) => {

  //Check database for their login credentials
  let SQL = 'SELECT * FROM users WHERE username = $1 AND password = $2;';
  let values = [request.body.user, request.body.password];
  client.query(SQL, values)
    .then(results => {
      let message = 
      results.rows.length === 0 && !request.body.new ? 'Invalid%20Login' : 
      results.rows.length === 1 && request.body.new ? 'That%20Name%20Taken' : 'none';


      //if the database doesnt return anyone and the new account box was checked.
      if (results.rows.length === 0 && request.body.new) {
        let sql = 'INSERT INTO users (username, password) VALUES ($1, $2) RETURNING id;';
        let safeWords = [request.body.user, request.body.password];
        client.query(sql, safeWords)
          .then(results => {
            request.session.user = {
              id: results.rows[0].id,
              username: request.body.username,
              password: request.body.password
            }
            response.redirect('/library');
          })
          .catch(err => {
            console.log(err);
          })
        //if the database returns a user and the new account box was NOT checked.
      } else if (results.rows.length === 1 && !request.body.new) {
        request.session.user = {
          id: results.rows[0].id,
          username: results.rows[0].username,
          password: results.rows[0].password
        }
        response.redirect('/library');

        //if the user is not in the DB and the user does not want a new account
      } else {
        response.redirect(`/createAcc?error=${message}`);
      }
    })
    .catch(err => {
      console.log(err);
    })
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
