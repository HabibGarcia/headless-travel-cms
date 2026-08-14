require('dotenv').config();
const express = require('express');
const cors = require('cors');

// Importamos nuestra conexión a la base de datos
const pool = require('./config/db');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json()); 

// RUTAS DE NUESTRA API
// Importamos el archivo de rutas que acabamos de crear
const destinationRoutes = require('./routes/destinations');
app.use('/api/destinations', destinationRoutes);


app.get('/api/status', (req, res) => {
  res.json({ message: "¡El backend Headless Travel CMS está funcionando perfectamente!" });
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});