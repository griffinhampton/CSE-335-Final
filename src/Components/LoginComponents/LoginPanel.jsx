import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../../Services/AuthContext.jsx'

function LoginPanel() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const { login } = useAuth();
    const navigate = useNavigate();

    async function handleLogin(e) {
        e.preventDefault();
        setError('');
        try {
            const res = await fetch('/api/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password }),
            });
            const data = await res.json();
            if (!res.ok) {
                setError(data.error);
                return;
            }
            login(data);
            navigate('/');
        } catch {
            setError('Unable to reach the server. Please try again.');
        }
    }

    return (
        <div className="Window-Main">
            <div className="Window-Container">
                <h1>Login</h1>
                {error && <p className="Window-Error">{error}</p>}
                <div className="Window-Info">
                    <form onSubmit={handleLogin}>
                        <input
                            type="text"
                            placeholder="Email"
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                        />
                        <input
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                        />
                        <button className="Window-Button" type="submit">Login</button>
                    </form>
                </div>

                <div className="Window-Register">
                    <h3>Don't have an account?</h3>
                    <Link to="/register">
                        <h3 className="Window-SignUp">Sign up</h3>
                    </Link>
                </div>
            </div>
        </div>
    )
}
export default LoginPanel
