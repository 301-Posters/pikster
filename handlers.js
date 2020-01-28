////////////////////////MODULES////////////////////////

const superagent = require('superagent');


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
  updateLibrary: updateLibrary
};
