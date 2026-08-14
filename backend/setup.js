// Script de un solo uso
const pool = require('./config/db');

const createTables = async () => {
  const queryText = `
    -- Tabla de Destinos
    CREATE TABLE IF NOT EXISTS destinations (
      id SERIAL PRIMARY KEY,
      name VARCHAR(100) NOT NULL,
      country VARCHAR(100) NOT NULL,
      description TEXT,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );

    -- Tabla de Paquetes de Viaje (Relacionada con Destinos)
    CREATE TABLE IF NOT EXISTS travel_packages (
      id SERIAL PRIMARY KEY,
      title VARCHAR(150) NOT NULL,
      destination_id INTEGER REFERENCES destinations(id) ON DELETE CASCADE,
      price DECIMAL(10, 2) NOT NULL,
      duration_days INTEGER NOT NULL,
      available_spots INTEGER NOT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
  `;

  try {
    console.log('Creando tablas en la base de datos.');
    await pool.query(queryText);
    console.log('Tablas creadas correctamente en Neon.');
  } catch (err) {
    console.error('Error creando las tablas:', err);
  } finally {
    pool.end(); //Cierre de conexión
  }
};

createTables();