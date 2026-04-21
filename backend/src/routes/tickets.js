import { Router } from 'express';
import connection from '../db.js';

const router = Router();

router.post('/', (req, res) => {
    const { customer_id, items } = req.body;
    if (!customer_id || !Array.isArray(items) || items.length === 0) {
        return res.status(400).json({ error: 'customer_id and items are required' });
    }

    const purchaseDate = new Date();
    const values = [];
    for (const item of items) {
        const showtime = item.showtime;
        for (let i = 0; i < item.quantity; i++) {
            values.push([customer_id, item.movie_id, item.screen_number, showtime, purchaseDate]);
        }
    }

    const sql = 'INSERT INTO Tickets (customer_id, movie_id, screen_number, showtime, purchase_date) VALUES ?';
    connection.query(sql, [values], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ inserted: result.affectedRows });
    });
});

export default router;
