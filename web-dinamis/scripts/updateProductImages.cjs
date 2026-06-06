const mysql = require('mysql2/promise');
require('dotenv').config({ path: './.env' });

(async () => {
  const pool = await mysql.createPool({
    host: process.env.DB_HOST || 'localhost',
    port: Number(process.env.DB_PORT) || 3306,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
  });

  const updates = [
    ['roti-tawar-putih-large', 'roti_tawar_putih.png'],
    ['roti-gandum-whole-wheat', 'roti_gandum.png'],
    ['nastar-keju', 'nastar_keju.png'],
    ['kastengel-butter', 'kastengel_butter.png'],
    ['bolu-kukus-pandan', 'bolu_kukus_pandan.png'],
    ['croissant-original', 'croissant_original.png'],
    ['birthday-cake-coklat', 'birthday_cake_coklat.png'],
    ['wedding-cake-3-tier', 'wedding_cake_3_tier.png'],
    ['kopi-susu-aren', 'kopi_susu_aren.png'],
  ];

  for (const [slug, file] of updates) {
    const imgPath = `/images/produk/${file}`;
    await pool.execute('UPDATE produk SET gambar_utama = ? WHERE slug = ?', [imgPath, slug]);
    console.log(`Updated ${slug} → ${imgPath}`);
  }

  await pool.end();
  console.log('All product image paths updated');
})();
