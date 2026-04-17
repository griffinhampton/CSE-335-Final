import { useEffect, useState } from 'react';

function Genres() {
    const [genres, setGenres] = useState([]);

    useEffect(() => {
        fetch('http://localhost:3000/api/genres')
            .then(res => res.json())
            .then(data => setGenres(data));
    }, []);

    return (
        <>
            <ul>
                {genres.map((genre, i) => (
                    <li key={i}>{JSON.stringify(genre)}</li>
                ))}
            </ul>
        </>
    );
}
export default Genres;
