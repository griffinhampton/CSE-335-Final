function NavBar() {

    return (
        <div className="navbar">

            <ul className="nav-links">
                <li>Home</li>
                <li>Movies</li>
                <li>Genres</li>
                <li>Popular</li>
                <li>New Releases</li>
            </ul>
            
            <form className="search-bar">
                <input type="text" placeholder="Search movies" />
                <button type="submit">Go</button>
            </form>
          

        </div>


    )



}
export default NavBar