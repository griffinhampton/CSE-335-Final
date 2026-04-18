import { useParams } from 'react-router-dom'
import Info from "../Components/MovieDetailsComponents/Info"
import NavBar from "../Components/HomeComponents/NavBar";

import "../css/NavBar.css";

function MovieDetails() {
    const { id } = useParams();
    return (
        <>
            <NavBar/>
            <Info movieId={id} />
        </>
    );
}
export default MovieDetails;
