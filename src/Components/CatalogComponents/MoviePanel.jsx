import { Link } from 'react-router-dom'

function MoviePanel({movie}) {
    return(
        <Link to="/info">
            <div className="Panel-Card">
                <div className="Panel-Image">
                    <img src={`https://image.tmdb.org/t/p/w500${movie.movie_poster_url}`}/>
                </div>

                <div className="Panel-Info">
                    <h3>{movie.movie_title}</h3>
                    <h3>{movie.movie_tagline}</h3>
                </div>
            </div>
        </Link>


    );
}
export default MoviePanel