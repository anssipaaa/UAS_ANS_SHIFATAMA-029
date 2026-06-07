const { createConnection } = require('mysql2/promise');

async function checkImages() {
  const connection = await createConnection({
    host: '13.212.233.207',
    user: 'userwebdinamis_2388010029', 
    password: '12345',
    database: 'dbcompro'
  });
  
  const [rows] = await connection.execute('SELECT id_produk, nama_produk, gambar_utama FROM produk');
  console.log(rows);
  process.exit(0);
}

checkImages().catch(console.error);
