import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import NavBar from "../Components/HomeComponents/NavBar";
import MoviePanel from '../Components/CatalogComponents/MoviePanel';

import "../css/MoviePanel.css"
import "../css/NavBar.css";

function Genres() {
    const { id } = useParams();
    const [movies, setMovies] = useState([]);

    useEffect(() => {
        fetch(`/api/genres/${id}`)
            .then(res => res.json())
            .then(data => setMovies(data));
    }, [id]);

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