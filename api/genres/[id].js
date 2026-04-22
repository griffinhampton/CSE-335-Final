import mysql from 'mysql';

function getConnection() {
  const { env } = globalThis.process;

  return mysql.createConnection({
    host: env.DB_HOST,
    user: env.DB_USER,
    password: env.DB_PASSWORD,
    database: env.DB_NAME,
  });
}

export default function handler(req, res) {
  if (req.method !== 'GET') return res.status(405).end();

  const { id } = req.query;
  const sql = `
    SELECT DISTINCT m.*
    FROM Movies m
    JOIN Movie_Genres mg ON m.movie_id = mg.movie_id
    WHERE mg.genre_id = ?
  `;

  const connection = getConnection();
  connection.connect((err) => {
    if (err) return res.status(500).json({ error: err.message });

    connection.query(sql, [id], (err, results) => {
      connection.end();
      if (err) return res.status(500).json({ error: err.message });
      res.json(results);
    });
  });
}