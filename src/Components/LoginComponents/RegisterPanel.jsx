import { Link } from 'react-router-dom'

function Register() {
    return(
        <div className="Window-Main">
            <div className="Window-Container">
                <h1>Register</h1>

                <div className="Window-Info">
                    <form>
                        <input
                            type="text"
                            placeholder="Name"
                        />
                    </form>

                    <form>
                        <input
                            type="text"
                            placeholder="Email"
                        />
                    </form>
                    <form>
                        <input
                            type="text"
                            placeholder="Password"
                        />
                    </form>
                </div>
                <Link to="/catalog">
                    <button className="Window-Button">Sign Up</button>
                </Link>
            </div>
       </div>
    )
}
export default Register