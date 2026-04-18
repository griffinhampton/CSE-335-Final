import { useEffect, useState } from 'react';

import NavBar from "../Components/HomeComponents/NavBar";

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
            <ul>
                {genres.map((genre, i) => (
                    <li key={i}>{JSON.stringify(genre)}</li>
                ))}
            </ul>
        </>
    );
}
export default Genres;
