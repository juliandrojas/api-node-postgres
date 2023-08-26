import pg from 'pg';
const { Pool } = pg;

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'supermercado',
  password: '140201',
  port: 5432,
});

// Conectar a la base de datos
pool.connect((err, client, done) => {
  if (err) {
    console.error('Error al conectar a la base de datos:', err);
    return;
  }

  console.log('Conexión a la base de datos establecida');

  // Libera el cliente cuando hayas terminado
  done();
});

export default pool;