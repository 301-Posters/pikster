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


const generateLibrary = (request, response) => {

  //if the user is coming from a movie selection, currentMovie will  exist, 
  //and we want to add it to their library ( so long as it is not a duplicate).

  //find the movie-user relation (ie a library entry)
  if (request.session.currentMovie) {
    client.query('SELECT * FROM movies_in_libraries WHERE user_id = $1 AND movie_id = $2', [request.session.user.id, request.session.currentMovie.id])
      .then(results => {
        return results.rows.length;
      })
      .then(results => {
        //then, if it the relation didnt exist, add the relation.
        if (results === 0) {
          return client.query('INSERT INTO movies_in_libraries (user_id, movie_id) VALUES ($1, $2);', [request.session.user.id, request.session.currentMovie.id])
        }
      })
      .then(results => {
        //then, insert the movie into the movies table, (automatically rejects duplicates.)
        const { id, descript, title, url } = request.session.currentMovie;
        return client.query('INSERT INTO movies (id, descript, title, image_url) VALUES ($1, $2, $3, $4);', [id, descript, title, url])
      })
      .then(results => {
        //then, in all cases..
        //render the library view with the contents of the user's library.
        let sql = 'SELECT * from movies INNER JOIN movies_in_libraries ON movies.id = movies_in_libraries.movie_id WHERE $1 = movies_in_libraries.user_id;';
        client.query(sql, [request.session.user.id])
          .then(results => {
            //remove the currentMovie from the session prior to rendering the view.
            delete request.session.currentMovie;
            response.render('EJS/library.ejs', { library: results.rows })
          })
      })
      .catch(err => {
        console.log(err);
      })
  } else {
    let sql = 'SELECT * from movies INNER JOIN movies_in_libraries ON movies.id = movies_in_libraries.movie_id WHERE $1 = movies_in_libraries.user_id;';
    client.query(sql, [request.session.user.id])
      .then(results => {
        response.render('EJS/library.ejs', { library: results.rows })
      })
  }
}

const renderLoginPage = (request, response) => {
  request.session.currentMovie = request.body;
  if (request.session.user) {
    //construct new Movie, assign to currentMovie
    response.redirect(`/library`)
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
