import { getPool } from "../../src/lib/db";

(async () => {
  const pool = getPool();
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
    const path = `/images/produk/${file}`;
    await pool.execute('UPDATE produk SET gambar_utama = ? WHERE slug = ?', [path, slug]);
    console.log(`Updated ${slug} -> ${path}`);
  }
  await pool.end();
  console.log('All updates done');
})();
