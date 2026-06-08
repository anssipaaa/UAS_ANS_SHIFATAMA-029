import Link from "next/link";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-brand">
          <Link href="/" className="footer-logo">Cipa's Bakery 🎀</Link>
          <p className="footer-desc">
            Menghadirkan senyum di setiap gigitan. Roti dan kue yang dibuat dengan 100% cinta dan bahan pilihan.
          </p>
        </div>
        <div className="footer-col">
          <h4>Menu Cepat</h4>
          <Link href="/#hero">Beranda</Link>
          <Link href="/produk">Semua Produk</Link>
          <Link href="/#kategori">Kategori</Link>
          <Link href="/#kontak">Kontak</Link>
        </div>
        <div className="footer-col">
          <h4>Kategori Manis</h4>
          <Link href="/produk?kategori=roti-tawar">Roti Lembut</Link>
          <Link href="/produk?kategori=kue-kering">Kue Renyah</Link>
          <Link href="/produk?kategori=croissant">Croissant Gurih</Link>
          <Link href="/produk?kategori=birthday-cake">Cake Spesial</Link>
        </div>
        <div className="footer-col">
          <h4>Pusat Bantuan</h4>
          <Link href="#">Cara Pesan</Link>
          <Link href="#">Syarat & Ketentuan</Link>
          <Link href="#">Tanya Jawab (FAQ)</Link>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; 2026 Cipa's Bakery. Dibuat dengan penuh 💖</p>
        <p style={{ marginTop: "0.5rem" }}>Tugas Akhir - SHIFATAMA-029</p>
      </div>
    </footer>
  );
}
