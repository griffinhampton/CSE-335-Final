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

  const connection = getConnection();
  connection.connect((err) => {
    if (err) return res.status(500).json({ error: err.message });
    connection.query('SELECT * FROM Genres', (err, results) => {
      connection.end();
      if (err) return res.status(500).json({ error: err.message });
      res.json(results);
    });
  });
}
