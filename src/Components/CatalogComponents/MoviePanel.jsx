

function MoviePanel({movie}) {
    return(

        
        <div className="Panel-Card">
            <div className="Panel-Image">
                     
                <img src={`https://image.tmdb.org/t/p/w500${movie.movie_poster_url}`}/>
            </div>

                <div className="Panel-Info">
                    <h3>{movie.movie_title}</h3>
                    <h3>{movie.movie_tagline}</h3>
                </div>
        </div>
        


    );
}
export default MoviePanel