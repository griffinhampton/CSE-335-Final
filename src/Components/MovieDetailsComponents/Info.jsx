import { Link } from 'react-router-dom'

function Info() {
    return(
         <div className="Info-Container">

            <div className="Info-Image">
                <img src="https://tse2.mm.bing.net/th/id/OIP.DHIHmdpUmSWdLCHESkA0CQHaNK?rs=1&pid=ImgDetMain&o=7&rm=3"/>
            </div>

            <div>
                <h1 className="Info-Title"></h1>
                <h3 className="Info-Runtime"></h3>
                <h3 className="Info-Description"></h3>
                <div className="Ticket-Card">
                    <h2 className="Ticker-TheatreName"></h2>
                </div>
            </div>

            <div>
                <h3 className="Info-Genre"></h3>
                <h3 className="Info-Director"></h3>
            </div>
        </div>
    );
}
export default Info