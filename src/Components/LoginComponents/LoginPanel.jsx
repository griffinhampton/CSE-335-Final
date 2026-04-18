import { Link } from 'react-router-dom'

function LoginPanel() {
    return(
        <div className="Window-Main">
            <div className="Window-Container">
                <h1>Login</h1>

                <div className="Window-Info">
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
                <button className="Window-Button">Login</button>

                <div className="Window-Register">
                    <h3>Don't have an account?</h3>
                    <h3 className="Window-SignUp">Sign up</h3>
                </div>
            </div>
       </div>
    )
}
export default LoginPanel