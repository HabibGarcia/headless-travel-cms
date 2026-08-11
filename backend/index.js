// backend/index.js
require('dotenv').config();
const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

// Middlewares
app.use(cors());
app.use(express.json()); // Permite a la API recibir JSON

// Ruta de prueba
app.get('/api/status', (req, res) => {
  res.json({ message: "¡El backend Headless Travel CMS está funcionando!" });
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});