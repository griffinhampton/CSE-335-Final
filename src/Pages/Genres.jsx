import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import NavBar from "../Components/HomeComponents/NavBar";
import MoviePanel from '../Components/CatalogComponents/MoviePanel';

import "../css/MoviePanel.css"
import "../css/NavBar.css";
import "../css/Genres.css";

function Genres() {
    const { id } = useParams();
    const [movies, setMovies] = useState([]);
    const [genreName, setGenreName] = useState('');

    useEffect(() => {
        if (!id) return;

        let isActive = true;

        Promise.all([
            fetch('/api/genres').then(res => res.json()),
            fetch(`/api/genres/${id}`).then(res => res.json()),
        ])
            .then(([genres, data]) => {
                if (!isActive) return;

                const selectedGenre = genres.find((genre) => String(genre.genre_id) === String(id));
                setGenreName(selectedGenre?.genre_name ?? 'Genre');
                setMovies(data);
            })
            .catch(() => {
                if (!isActive) return;
                setGenreName('Genre');
                setMovies([]);
            });

        return () => {
            isActive = false;
        };
    }, [id]);

    return (
        <>
            <NavBar/>
            <div className="genre-page-header">
                <h1>{id ? (genreName || 'Genre') : 'Genres'}</h1>
            </div>
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