import { Router } from 'express';
import connection from '../db.js';

const router = Router();

router.get('/:id', (req, res) => {
    const sql = `
        SELECT *
        FROM Movies
        WHERE movie_id IN (SELECT movie_id FROM Movie_Genres WHERE genre_id = ?)
    `;

    connection.query(sql, [req.params.id], (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(results);
    });
});

export default router;
