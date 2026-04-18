import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'

import NavBar from '../Components/HomeComponents/NavBar.jsx'
import MoviePanel from '../Components/CatalogComponents/MoviePanel';

import "../css/MoviePanel.css"

function SearchResults() {
    const [searchParams] = useSearchParams()
    const q = searchParams.get('q')
    const [results, setResults] = useState([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)

    useEffect(() => {
        if (!q) return
        setLoading(true)
        setError(null)
        fetch(`/api/movies/search?title=${encodeURIComponent(q)}`)
            .then(res => {
                if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`)
                return res.json()
            })
            .then(data => setResults(data))
            .catch(err => setError(err.message))
            .finally(() => setLoading(false))
    }, [q])

    return (
        <>
            <NavBar />
            <h2>Results for "{q}"</h2>
            {loading && <p>Loading...</p>}
            {error && <p>Error: {error}</p>}
            {!loading && !error && results.length === 0 && <p>No movies found.</p>}

            <div className="Panel-Container">
                {results.map((movie, i) => (
                    <MoviePanel
                        key={i}
                        movie={movie}/>
                ))}
            </div>

        </>
    )
}
export default SearchResults
