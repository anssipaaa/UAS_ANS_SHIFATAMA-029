const { createConnection } = require('mysql2/promise');

async function checkImages() {
  const connection = await createConnection({
    host: 'localhost',
    user: 'db_uas', 
    password: 'cipacantik',
    database: 'dbuas029'
  });
  
  const [rows] = await connection.execute('SELECT id_produk, nama_produk, gambar_utama FROM produk');
  console.log(rows);
  process.exit(0);
}

checkImages().catch(console.error);
