import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../../Services/AuthContext.jsx'

function Register() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const { login } = useAuth();
    const navigate = useNavigate();

    async function handleRegister(e) {
        e.preventDefault();
        setError('');
        try {
            const res = await fetch('/api/auth/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name, email, password }),
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
                <h1>Register</h1>
                {error && <p className="Window-Error">{error}</p>}
                <div className="Window-Info">
                    <form onSubmit={handleRegister}>
                        <input
                            type="text"
                            placeholder="Name"
                            value={name}
                            onChange={e => setName(e.target.value)}
                        />
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
                        <button className="Window-Button" type="submit">Sign Up</button>
                    </form>
                </div>
                <div className="Window-Register">
                    <h3>Already have an account?</h3>
                    <Link to="/login">
                        <h3 className="Window-SignUp">Log in</h3>
                    </Link>
                </div>
            </div>
        </div>
    )
}
export default Register
