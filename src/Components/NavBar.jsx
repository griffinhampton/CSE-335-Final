import { Link } from 'react-router-dom'

function NavBar() {
  return (
    <div className="navbar">

        <ul className="nav-left">
            <li><Link to="/">Home</Link></li>
            <li><Link to="/catalog">Movies</Link></li>
            <li><Link to="/genres">Genres</Link></li>
        </ul>

        <div className="spacer"></div>

        <ul className="nav-right">
            <li className="login">Login</li>
        </ul>

    </div>
  )
}
export default NavBar