const express = require('express');
const mysql = require('mysql2');
require('dotenv').config();

const app = express();

// Middleware para parsear JSON
app.use(express.json());

// Conexión a la base de datos usando variables de entorno
const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME
});

// Validación básica del parámetro
app.get('/user', (req, res) => {
  const id = req.query.id;

  // Validación de entrada
  if (!id || isNaN(id)) {
    return res.status(400).send("Invalid user ID");
  }

  // Consulta parametrizada (previene SQL Injection)
  const query = "SELECT * FROM users WHERE id = ?";

  db.execute(query, [id], (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).send("Database error");
    }

    res.json(result);
  });
});

// Puerto desde variable de entorno
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});