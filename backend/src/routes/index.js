import { Router } from 'express';
import connection from '../db.js';
import accountsRouter from './accounts.js';
import ticketsRouter from './tickets.js';

const router = Router();

router.use('/auth', accountsRouter);
router.use('/tickets', ticketsRouter);

router.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

router.get('/movies', (req, res) => {
  connection.query('SELECT * FROM Movies', (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
});

router.get('/movies/search', (req, res) => {
  const { title } = req.query;
  if (!title) return res.status(400).json({ error: 'title query param required' });
  connection.query('SELECT * FROM Movies WHERE movie_title LIKE ?', [`%${title}%`], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
});

router.get('/movies/:id', (req, res) => {
  const movieQuery = `
    SELECT
      m.movie_id,
      m.movie_title,
      m.movie_runtime,
      m.movie_poster_url,
      m.movie_description,
      m.movie_tagline,
      pc.company_name,
      GROUP_CONCAT(g.genre_name SEPARATOR ', ') AS genres
    FROM Movies m
    LEFT JOIN Production_Companies pc ON m.production_company_id = pc.company_id
    LEFT JOIN Movie_Genres mg ON m.movie_id = mg.movie_id
    LEFT JOIN Genres g ON mg.genre_id = g.genre_id
    WHERE m.movie_id = ?
    GROUP BY m.movie_id
  `;
  const screeningsQuery = `
    SELECT screen_number, showtime, ticket_price
    FROM Screenings
    WHERE movie_id = ?
    ORDER BY showtime
  `;

  connection.query(movieQuery, [req.params.id], (err, movieResults) => {
    if (err) return res.status(500).json({ error: err.message });
    if (!movieResults.length) return res.status(404).json({ error: 'Not found' });

    connection.query(screeningsQuery, [req.params.id], (err, screeningResults) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ ...movieResults[0], screenings: screeningResults });
    });
  });
});

router.get('/genres', (req, res) => {
  connection.query('SELECT * FROM Genres', (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
});

router.get('/genres/:id', (req, res) => {
  connection.query(
    'SELECT m.* FROM Movies m JOIN Movie_Genres mg ON m.movie_id = mg.movie_id WHERE mg.genre_id = ?',
    [req.params.id],
    (err, results) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json(results);
    }
  );
});

export default router;
