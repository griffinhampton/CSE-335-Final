import { Router } from 'express';
import connection from '../db.js';

const router = Router();

router.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

router.get('/Movies', (req, res) => {
  connection.query('SELECT * FROM Movies', (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
});

router.get('/Movies/search', (req, res) => {
  const { title } = req.query;
  if (!title) return res.status(400).json({ error: 'title query param required' });
  connection.query('SELECT * FROM Movies WHERE movie_title LIKE ?', [`%${title}%`], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
});

router.get('/genres', (req, res) => {
  connection.query('SELECT * FROM Genres', (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
});

export default router;
