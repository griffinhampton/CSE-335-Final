import { useEffect, useState } from 'react';

function Catalog() {
    const [movies, setMovies] = useState([]);

    useEffect(() => {
        fetch('http://localhost:3000/api/movies')
            .then(res => res.json())
            .then(data => setMovies(data));
    }, []);

    return (
        <>
            <ul>
                {movies.map((movie, i) => (
                    <li key={i}>{JSON.stringify(movie)}</li>
                ))}
            </ul>
        </>
    );
}
export default Catalog;