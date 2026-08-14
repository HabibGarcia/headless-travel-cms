const express = require('express');
const router = express.Router();
const pool = require('../config/db');

// GET - http://localhost:5000/api/destinations
router.get('/', async (req, res) => {
  try {
    //Consulta SQL del GET
    const result = await pool.query('SELECT * FROM destinations ORDER BY created_at DESC');
    res.json(result.rows); // Devolvemos en formato JSON
  } catch (err) {
    console.error('Error obteniendo destinos:', err.message);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});

//POST: Crear un nuevo destino
router.post('/', async (req, res) => {
  try {
    // Extraemos datos que vienen en el body de la petición
    const { name, country, description } = req.body;
    // Validación básica
    if (!name || !country) {
      return res.status(400).json({ error: 'El nombre y el país son obligatorios' });
    }

    // Insertamos en la base de datos usando parámetros ($1, $2, $3) para evitar inyecciones SQL (Seguridad)
    const newDestination = await pool.query(
      'INSERT INTO destinations (name, country, description) VALUES ($1, $2, $3) RETURNING *',
      [name, country, description]
    );

    // Devolvemos el destino recién creado con un código de estado 201 (Created)
    res.status(201).json(newDestination.rows[0]);
  } catch (err) {
    console.error('Error creando destino:', err.message);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});

module.exports = router;