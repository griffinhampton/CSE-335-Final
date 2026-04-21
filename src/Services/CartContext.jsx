import { createContext, useContext, useState } from 'react';

const CartContext = createContext(null);

export function CartProvider({ children }) {
    const [cartItems, setCartItems] = useState([]);

    function itemKey(movie_id, screen_number, showtime) {
        return `${movie_id}-${screen_number}-${showtime}`;
    }

    function addToCart(item, quantity) {
        setCartItems(prev => {
            const key = itemKey(item.movie_id, item.screen_number, item.showtime);
            const existing = prev.find(i => itemKey(i.movie_id, i.screen_number, i.showtime) === key);
            if (existing) {
                return prev.map(i =>
                    itemKey(i.movie_id, i.screen_number, i.showtime) === key
                        ? { ...i, quantity: i.quantity + quantity }
                        : i
                );
            }
            return [...prev, { ...item, quantity }];
        });
    }

    function removeFromCart(movie_id, screen_number, showtime) {
        setCartItems(prev =>
            prev.filter(i => itemKey(i.movie_id, i.screen_number, i.showtime) !== itemKey(movie_id, screen_number, showtime))
        );
    }

    function clearCart() {
        setCartItems([]);
    }

    const totalItems = cartItems.reduce((sum, i) => sum + i.quantity, 0);

    return (
        <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, clearCart, totalItems }}>
            {children}
        </CartContext.Provider>
    );
}

export function useCart() {
    return useContext(CartContext);
}
