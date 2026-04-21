import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../Services/AuthContext.jsx'
import { useCart } from '../../Services/CartContext.jsx'

function Info({ movieId }) {
    const [movie, setMovie] = useState(null);
    const [quantities, setQuantities] = useState({});
    const [showLoginModal, setShowLoginModal] = useState(false);
    const [addedMessage, setAddedMessage] = useState('');
    const { user } = useAuth();
    const { addToCart } = useCart();
    const navigate = useNavigate();

    useEffect(() => {
        fetch(`/api/movies/${movieId}`)
            .then(res => res.json())
            .then(data => setMovie(data));
    }, [movieId]);

    if (!movie) return <p>Loading...</p>;

    function screeningKey(s) {
        return `${s.screen_number}-${s.showtime}`;
    }

    function getQty(s) {
        return quantities[screeningKey(s)] ?? 1;
    }

    function setQty(s, val) {
        const clamped = Math.max(1, Math.min(10, Number(val)));
        setQuantities(prev => ({ ...prev, [screeningKey(s)]: clamped }));
    }

    function handleAddToCart(s) {
        if (!user) {
            setShowLoginModal(true);
            return;
        }
        addToCart({
            movie_id: movie.movie_id,
            movie_title: movie.movie_title,
            movie_poster_url: movie.movie_poster_url,
            screen_number: s.screen_number,
            showtime: s.showtime,
            ticket_price: s.ticket_price,
        }, getQty(s));
        setAddedMessage(`Added ${getQty(s)} ticket(s) to cart!`);
        setTimeout(() => setAddedMessage(''), 2500);
    }

    return (
        <>
            {showLoginModal && (
                <div className="Modal-Overlay">
                    <div className="Modal-Box">
                        <p>You must be logged in to purchase tickets.</p>
                        <button className="Modal-Button" onClick={() => {
                            setShowLoginModal(false);
                            navigate(`/login?redirect=/movie/${movieId}`);
                        }}>Log In</button>
                        <button className="Modal-Button Modal-Button-Cancel" onClick={() => setShowLoginModal(false)}>Cancel</button>
                    </div>
                </div>
            )}

            <div className="Info-Container">
                <div className="Info-Image">
                    <img src={`https://image.tmdb.org/t/p/w500${movie.movie_poster_url}`} alt={movie.movie_title} />
                </div>

                <div className="Info-ShowDetails1">
                    <h1>{movie.movie_title}</h1>
                    <h3>{movie.movie_runtime} min</h3>
                    <h3>{movie.movie_description}</h3>
                </div>

                <div className="Info-Screenings">
                    <h2>Screenings</h2>
                    {addedMessage && <p className="Cart-AddedMessage">{addedMessage}</p>}
                    {movie.screenings.length === 0 ? (
                        <p>No screenings available.</p>
                    ) : (
                        movie.screenings.map((s, i) => (
                            <div key={i} className="Ticket-Card">
                                <h3 className="Ticket-TheatreName">Screen {s.screen_number}</h3>
                                <p>{new Date(s.showtime.replace(' ', 'T')).toLocaleString()}</p>
                                <p>${Number(s.ticket_price).toFixed(2)}</p>
                                <div className="Ticket-Purchase">
                                    <div className="Ticket-Qty">
                                        <button onClick={() => setQty(s, getQty(s) - 1)}>−</button>
                                        <span>{getQty(s)}</span>
                                        <button onClick={() => setQty(s, getQty(s) + 1)}>+</button>
                                    </div>
                                    <button className="Ticket-AddBtn" onClick={() => handleAddToCart(s)}>
                                        Add to Cart
                                    </button>
                                </div>
                            </div>
                        ))
                    )}
                </div>

                <div className="Info-ShowDetails2">
                    <h3>Genre: {movie.genres}</h3>
                    <h3>Company: {movie.company_name}</h3>
                </div>
            </div>
        </>
    );
}

export default Info
