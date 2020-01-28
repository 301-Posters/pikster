////////////////////////MODULES////////////////////////

const superagent = require('superagent');


const generateMovie = (request, response) => {
  console.log('some stuff');

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
  console.log('some stuff');

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

function getTrendingMovies(request, resonse) {
  let key = process.env.TMDB_API_KEY;
  const trendingUrl = `https://api.themoviedb.org/3/trending/all/day?api_key=${key}`;
  superagent.get(trendingUrl)
    .then(data => {
      data.results.map(movie => {
        let currentMovie = new Movie(movie);
        let movieUrl = `https://api.themoviedb.org/3/movie/${currentMovie.movieId}?api_key=${key}`;
        superagent.get(movieUrl)
          .then(data => {
            currentMovie.genre = data.genres[0].name;
          })
      })
    })
}


// movie constructor function
function Movie(movie) {
  this.movieId = movie.id;
  this.title = movie.title;
  this.descript = movie.overview;
  this.image_url = `https://image.tmdb.org/t/p/w500${movie.backdrop_path}`;
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
};
