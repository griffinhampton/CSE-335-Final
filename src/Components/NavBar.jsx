function NavBar() {
  return (
    <div className="navbar">

        <ul className="nav-left">
            <li>Home</li>
            <li>Movies</li>
            <li>Genres</li>
            <li>Popular</li>
            <li>New Releases</li>
        </ul>

        <div className="spacer"></div>

        <ul className="nav-right">
            <li className="login">Login</li>
        </ul>

    </div>
  )
}
export default NavBar