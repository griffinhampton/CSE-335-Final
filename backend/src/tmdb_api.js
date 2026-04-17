const API_KEY = process.env.TMDB_API_KEY;
const BASE_URL = process.env.TMDB_BASE_URL || "https://api.themoviedb.org/3";


export async function fetchMoviePoster(movieId) {

    const url = `${BASE_URL}/movie/${movieId}/images`;
    const options = {method: 'GET', headers: {accept: 'application/json'}};
    
    fetch(url, options)
      .then(res => res.json())
      .then(json => console.log(json))
      .catch(err => console.error(err));
    
}