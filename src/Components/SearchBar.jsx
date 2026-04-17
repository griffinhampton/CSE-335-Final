import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

function SearchBar() {
    const [query, setQuery] = useState('')
    const navigate = useNavigate()

    const handleSubmit = (e) => {
        e.preventDefault()
        if (query.trim()) navigate(`/search?q=${encodeURIComponent(query.trim())}`)
    }

    return (
        <div className="SearchBar">
            <form className="search-bar" onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Search movies"
                    value={query}
                    onChange={e => setQuery(e.target.value)}
                />
                <button type="submit">Go</button>
            </form>
        </div>
    )
}
export default SearchBar