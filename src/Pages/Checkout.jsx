import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import NavBar from '../Components/HomeComponents/NavBar.jsx'
import { useCart } from '../Services/CartContext.jsx'
import { useAuth } from '../Services/AuthContext.jsx'
import '../css/Checkout.css'

function Checkout() {
    const { cartItems, removeFromCart, clearCart } = useCart();
    const { user } = useAuth();
    const navigate = useNavigate();
    const [purchasing, setPurchasing] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState('');

    const total = cartItems.reduce((sum, item) => sum + Number(item.ticket_price) * item.quantity, 0);

    async function handlePurchase() {
        if (!user) {
            navigate('/login?redirect=/checkout');
            return;
        }
        setPurchasing(true);
        setError('');
        try {
            const res = await fetch('/api/tickets', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    customer_id: user.customer_id,
                    items: cartItems.map(item => ({
                        movie_id: item.movie_id,
                        screen_number: item.screen_number,
                        showtime: item.showtime,
                        quantity: item.quantity,
                    })),
                }),
            });
            const data = await res.json();
            if (!res.ok) {
                setError(data.error || 'Purchase failed. Please try again.');
                return;
            }
            clearCart();
            setSuccess(true);
        } catch {
            setError('Unable to reach the server. Please try again.');
        } finally {
            setPurchasing(false);
        }
    }

    return (
        <>
            <NavBar />
            <div className="Checkout-Container">
                <h1>Your Cart</h1>

                {success && (
                    <div className="Checkout-Success">
                        <p>Purchase successful! Enjoy your movie!</p>
                        <button className="Checkout-Button" onClick={() => navigate('/')}>Back to Home</button>
                    </div>
                )}

                {!success && cartItems.length === 0 && (
                    <p className="Checkout-Empty">Your cart is empty.</p>
                )}

                {!success && cartItems.length > 0 && (
                    <>
                        <table className="Checkout-Table">
                            <thead>
                                <tr>
                                    <th>Movie</th>
                                    <th>Screen</th>
                                    <th>Showtime</th>
                                    <th>Price</th>
                                    <th>Qty</th>
                                    <th>Subtotal</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                {cartItems.map((item, i) => (
                                    <tr key={i}>
                                        <td>{item.movie_title}</td>
                                        <td>Screen {item.screen_number}</td>
                                        <td>{new Date(item.showtime.replace(' ', 'T')).toLocaleString()}</td>
                                        <td>${Number(item.ticket_price).toFixed(2)}</td>
                                        <td>{item.quantity}</td>
                                        <td>${(Number(item.ticket_price) * item.quantity).toFixed(2)}</td>
                                        <td>
                                            <button
                                                className="Checkout-Remove"
                                                onClick={() => removeFromCart(item.movie_id, item.screen_number, item.showtime)}
                                            >
                                                ✕
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>

                        <div className="Checkout-Footer">
                            <span className="Checkout-Total">Total: ${total.toFixed(2)}</span>
                            {error && <p className="Checkout-Error">{error}</p>}
                            <button className="Checkout-Button" onClick={handlePurchase} disabled={purchasing}>
                                {purchasing ? 'Processing...' : 'Purchase'}
                            </button>
                        </div>
                    </>
                )}
            </div>
        </>
    );
}

export default Checkout
