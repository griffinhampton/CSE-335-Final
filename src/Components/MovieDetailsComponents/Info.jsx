import { useEffect, useState } from 'react'

function Info({ movieId }) {
    const [movie, setMovie] = useState(null);

    useEffect(() => {
        fetch(`http://localhost:3000/api/movies/${movieId}`)
            .then(res => res.json())
            .then(data => setMovie(data));
    }, [movieId]);

    if (!movie) return <p>Loading...</p>;

    return (
        <div className="Info-Container">
            <div className="Info-Image">
                <img src={`https://image.tmdb.org/t/p/w500${movie.movie_poster_url}`} alt={movie.movie_title} />
            </div>

            <div>
                <h1 className="Info-Title">{movie.movie_title}</h1>
                <h3 className="Info-Runtime">{movie.movie_runtime} min</h3>
                <h3 className="Info-Description">{movie.movie_description}</h3>
                <h3 className="Info-Genre">{movie.genres}</h3>
                <h3 className="Info-Company">{movie.company_name}</h3>
            </div>

            <div>
                <h2>Screenings</h2>
                {movie.screenings.length === 0 ? (
                    <p>No screenings available.</p>
                ) : (
                    movie.screenings.map((s, i) => (
                        <div key={i} className="Ticket-Card">
                            <h3 className="Ticker-TheatreName">Screen {s.screen_number}</h3>
                            <p>{new Date(s.showtime).toLocaleString()}</p>
                            <p>${Number(s.ticket_price).toFixed(2)}</p>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}
export default Info
