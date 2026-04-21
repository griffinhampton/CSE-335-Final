import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../../Services/AuthContext.jsx'

function NavBar() {
    const [genres, setGenres] = useState([]);
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        fetch('/api/genres')
            .then(res => res.json())
            .then(data => setGenres(data));
    }, []);

    function handleLogout() {
        logout();
        navigate('/');
    }

    return (
        <div className="navbar">
            <ul className="nav-left">
                <li><Link to="/">Home</Link></li>
                <li><Link to="/catalog">Movies</Link></li>
                <li className="genre-dropdown">
                    <span className="genre-title">Genres ▾</span>
                    <div className="genre-menu">
                        {genres.map((genre, i) => (
                            <Link
                                key={i}
                                className="genre-item"
                                to={`/genre/${genre.genre_id}`}>
                                {genre.genre_name}
                            </Link>
                        ))}
                    </div>
                </li>
            </ul>
            <ul className="nav-right">
                {user ? (
                    <li className="user-dropdown">
                        <span className="user-title">Logged in as {user.customer_name} ▾</span>
                        <div className="user-menu">
                            <span className="user-item" onClick={handleLogout}>Log Out</span>
                        </div>
                    </li>
                ) : (
                    <li><Link to="/login">Login</Link></li>
                )}
            </ul>
        </div>
    )
}
export default NavBar
