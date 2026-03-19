const express = require('express');
const mysql = require('mysql');
const app = express();

// Credenciales hardcodeadas (VULNERABILIDAD)
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '123456',
  database: 'testdb'
});

app.get('/user', (req, res) => {
  const id = req.query.id;

  // SQL Injection
  const query = "SELECT * FROM users WHERE id = " + id;

  db.query(query, (err, result) => {
    if (err) throw err;
    res.send(result);
  });
});

// Uso de puerto fijo
app.listen(3000, () => {
  console.log('Server running on port 3000');
});