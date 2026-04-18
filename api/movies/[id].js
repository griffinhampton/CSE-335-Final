import mysql from 'mysql';

function getConnection() {
  return mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
  });
}

export default function handler(req, res) {
  if (req.method !== 'GET') return res.status(405).end();

  const { id } = req.query;

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

  const connection = getConnection();
  connection.connect((err) => {
    if (err) return res.status(500).json({ error: err.message });
    connection.query(movieQuery, [id], (err, movieResults) => {
      if (err) { connection.end(); return res.status(500).json({ error: err.message }); }
      if (!movieResults.length) { connection.end(); return res.status(404).json({ error: 'Not found' }); }

      connection.query(screeningsQuery, [id], (err, screeningResults) => {
        connection.end();
        if (err) return res.status(500).json({ error: err.message });
        res.json({ ...movieResults[0], screenings: screeningResults });
      });
    });
  });
}
