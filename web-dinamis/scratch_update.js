const { createConnection } = require('mysql2/promise');
async function testUpdate() {
  const connection = await createConnection({
    host: 'localhost',
    user: 'db_uas', 
    password: 'cipacantik',
    database: 'dbuas029'
  });
  
  try {
    const [result] = await connection.execute(
      `UPDATE produk SET id_kategori=?, nama_produk=?, slug=?, deskripsi=?, harga=?, harga_coret=?, stok=?, satuan=?, berat_gram=?, gambar_utama=?, unggulan=?, aktif=? WHERE id_produk=?`,
      [1, "Test", "test", "desc", 1000, null, 10, "pcs", null, "/images/test.png", 1, 1, 1]
    );
    console.log("Success", result);
  } catch(e) {
    console.error("Error", e);
  }
  process.exit(0);
}
testUpdate();
