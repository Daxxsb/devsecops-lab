const express = require('express');
const mysql = require('mysql2');
require('dotenv').config();

const app = express();

// Variables de entorno
const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME
});

app.get('/user', (req, res) => {
  const id = req.query.id;

  // Query parametrizada (evita SQL Injection)
  const query = "SELECT * FROM users WHERE id = ?";

  db.execute(query, [id], (err, result) => {
    if (err) return res.status(500).send("Error");
    res.send(result);
  });
});

// Puerto dinámico
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});