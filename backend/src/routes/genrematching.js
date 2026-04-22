import { Router } from 'express';
import connection from '../db.js';

const router = Router();

router.get('/:id', (req, res) => {
    const sql = `
        SELECT DISTINCT Movies.*
        FROM Movies
        JOIN Movie_Genres ON Movies.movie_id = Movie_Genres.movie_id
        WHERE Movie_Genres.genre_id = ?
    `;

    connection.query(sql, [req.params.id], (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(results);
    });
});

export default router;
