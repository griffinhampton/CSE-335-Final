import { useEffect, useState } from 'react';

import NavBar from "../Components/HomeComponents/NavBar";
import MoviePanel from '../Components/CatalogComponents/MoviePanel';

import "../css/NavBar.css";
import "../css/MoviePanel.css"

function Catalog() {
    const [movies, setMovies] = useState([]);

    useEffect(() => {
        fetch('http://localhost:3000/api/movies')
            .then(res => res.json())
            .then(data => setMovies(data));
    }, []);

    return (
        <>
            <NavBar/>

            <div className="Panel-Container">
                {movies.map((movie, i) => (
                    <MoviePanel
                        key={i}
                        movie={movie}/>
                ))}



            </div>


            
        </>
    );
}
export default Catalog;