import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom'


function NavBar() {

    const [genres, setGenres] = useState([]);

    useEffect(() => {
        fetch({`/api/genres/${genre_id}`)
            .then(res => res.json())
            .then(data => setGenres(data));
    }, []);

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
            <li><Link to="/login">Login</Link></li>
        </ul>
    </div>
  )
}
export default NavBar
/*
      <fieldset>
        <legend>What is your primary role?</legend>
        <select id="dropdown">
          <option hidden>Select a role</option>
          <option>Vanguard</option>
          <option>Duelist</option>
          <option>Strategist</option>
        </select>
      </fieldset>

    <Link to="/genres">Genres</Link></li>


*/