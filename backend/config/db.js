// Importamos el módulo 'Pool' de la librería 'pg' (node-postgres)
const { Pool } = require('pg');
require('dotenv').config();

// Crear la conexión
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});

// Comprobar la conexión
pool.connect((err, client, release) => {
  if (err) {
    return console.error('Error adquiriendo el cliente de la base de datos', err.stack);
  }
  console.log('Base de datos PostgreSQL conectada exitosamente');
  release(); // Liberamos el cliente
});

module.exports = pool;