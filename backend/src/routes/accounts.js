import { Router } from 'express';
import connection from '../db.js';

const router = Router();
const ENC_KEY = process.env.DB_ENCRYPTION_KEY;

router.post('/login', (req, res) => {
    const { email, password } = req.body;
    if (!email || !password)
        return res.status(400).json({ error: 'Email and password are required.' });

    connection.query(
        'SELECT customer_id, customer_name, customer_email FROM Customers WHERE customer_email = ? AND customer_password = AES_ENCRYPT(?, ?)',
        [email, password, ENC_KEY],
        (err, results) => {
            if (err) return res.status(500).json({ error: 'Database error.' });
            if (!results.length)
                return res.status(401).json({ error: "Incorrect email or password. Don't have an account? Sign up below." });

            res.json(results[0]);
        }
    );
});

router.post('/register', (req, res) => {
    const { name, email, password } = req.body;
    if (!name || !email || !password)
        return res.status(400).json({ error: 'Name, email, and password are required.' });

    connection.query(
        'SELECT customer_id FROM Customers WHERE customer_email = ?',
        [email],
        (err, results) => {
            if (err) return res.status(500).json({ error: 'Database error.' });
            if (results.length)
                return res.status(409).json({ error: 'An account with that email already exists.' });

            const today = new Date().toISOString().slice(0, 19).replace('T', ' ');

            connection.query(
                'INSERT INTO Customers (customer_name, customer_email, customer_registered_at, customer_password) VALUES (?, ?, ?, AES_ENCRYPT(?, ?))',
                [name, email, today, password, ENC_KEY],
                (err, result) => {
                    if (err) return res.status(500).json({ error: 'Failed to create account.' });
                    res.status(201).json({
                        customer_id: result.insertId,
                        customer_name: name,
                        customer_email: email,
                    });
                }
            );
        }
    );
});

export default router;
