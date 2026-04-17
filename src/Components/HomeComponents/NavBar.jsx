function NavBar() {
  return (
    <div className="navbar">

        <ul className="nav-left">
            <li>
                <a href="/">Home</a>
            </li>

            <li>
                <a href="/movies">Movies</a>
            </li>

            <li>Genres</li>
            <li>Popular</li>
            <li>New Releases</li>
        </ul>

        <ul className="nav-right">
            <li className="login">Login</li>
        </ul>

    </div>
  )
}
export default NavBar