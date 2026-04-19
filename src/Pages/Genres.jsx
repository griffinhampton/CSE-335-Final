import { useEffect, useState } from 'react';

import NavBar from "../Components/HomeComponents/NavBar";
import MoviePanel from '../Components/CatalogComponents/MoviePanel';

import "../css/MoviePanel.css"
import "../css/NavBar.css";

function Genres() {
    const [genres, setGenres] = useState([]);

    useEffect(() => {
        fetch('/api/genres')
            .then(res => res.json())
            .then(data => setGenres(data));
    }, []);

    return (
        <>
            <NavBar/>
            <div className="Panel-Container">
                {genres.map((movie, i) => (
                    <MoviePanel
                        key={i}
                        movie={movie}/>
                ))}
            </div>

        </>
    );
}
export default Genres;
/*
            <ul>
                {genres.map((genre, i) => (
                    <li key={i}>{JSON.stringify(genre)}</li>
                ))}
            </ul>

*/
/*

*/