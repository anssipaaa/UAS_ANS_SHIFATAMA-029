import { query } from "@/lib/db";
import Link from "next/link";

export const dynamic = "force-dynamic";

function formatRupiah(num: number) {
  return new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", minimumFractionDigits: 0 }).format(num);
}

export default async function ProdukPage({ searchParams }: { searchParams: Promise<{ kategori?: string }> }) {
  const params = await searchParams;
  const kategoriSlug = params.kategori || "";

  const categories = await query<any>(
    "SELECT id_kategori, nama_kategori, slug FROM kategori WHERE aktif = 1 ORDER BY urutan ASC"
  );

  let produk: any[];
  if (kategoriSlug) {
    produk = await query<any>(
      `SELECT p.id_produk, p.nama_produk, p.slug, p.harga, p.harga_coret, p.gambar_utama, p.rating, p.total_terjual, p.stok, p.satuan,
              k.nama_kategori 
       FROM produk p 
       JOIN kategori k ON p.id_kategori = k.id_kategori 
       WHERE p.aktif = 1 AND k.slug = ?
       ORDER BY p.unggulan DESC, p.total_terjual DESC`,
      [kategoriSlug]
    );
  } else {
    produk = await query<any>(
      `SELECT p.id_produk, p.nama_produk, p.slug, p.harga, p.harga_coret, p.gambar_utama, p.rating, p.total_terjual, p.stok, p.satuan,
              k.nama_kategori 
       FROM produk p 
       JOIN kategori k ON p.id_kategori = k.id_kategori 
       WHERE p.aktif = 1
       ORDER BY p.unggulan DESC, p.total_terjual DESC`
    );
  }

  const activeKategori = categories.find((c: any) => c.slug === kategoriSlug);

  return (
    <section className="catalog-section">
      <h2 className="section-title">
        {activeKategori ? activeKategori.nama_kategori : "Semua"} <span className="text-gradient">Produk</span>
      </h2>
      <p className="section-subtitle">
        {activeKategori
          ? `Menampilkan ${produk.length} produk dalam kategori ${activeKategori.nama_kategori}`
          : `Menampilkan ${produk.length} produk dari semua kategori`}
      </p>

      {/* Category filter */}
      <div className="catalog-filter">
        <Link
          href="/produk"
          className={`catalog-filter__btn ${!kategoriSlug ? "catalog-filter__btn--active" : ""}`}
        >
          Semua
        </Link>
        {categories.map((cat: any) => (
          <Link
            key={cat.id_kategori}
            href={`/produk?kategori=${cat.slug}`}
            className={`catalog-filter__btn ${kategoriSlug === cat.slug ? "catalog-filter__btn--active" : ""}`}
          >
            {cat.nama_kategori}
          </Link>
        ))}
      </div>

      {/* Products grid */}
      {produk.length === 0 ? (
        <div style={{ textAlign: "center", color: "var(--text-dim)", padding: "4rem 0", fontSize: "1.1rem" }}>
          Belum ada produk dalam kategori ini.
        </div>
      ) : (
        <div className="produk-grid">
          {produk.map((p: any) => (
            <Link href={`/produk/${p.slug}`} className="produk-card" key={p.id_produk}>
              <div className="produk-card__img">
                {p.gambar_utama ? (
                  <img src={p.gambar_utama} alt={p.nama_produk} />
                ) : (
                  "🍞"
                )}
                {p.stok <= 5 && p.stok > 0 && (
                  <span className="produk-card__badge">Stok Terbatas</span>
                )}
                {p.stok === 0 && (
                  <span className="produk-card__badge" style={{ background: "rgba(239,68,68,0.9)" }}>Habis</span>
                )}
              </div>
              <div className="produk-card__body">
                <div className="produk-card__kategori">{p.nama_kategori}</div>
                <div className="produk-card__nama">{p.nama_produk}</div>
                <div className="produk-card__harga">
                  {formatRupiah(Number(p.harga))}
                  {p.harga_coret && (
                    <span className="produk-card__harga-coret">{formatRupiah(Number(p.harga_coret))}</span>
                  )}
                </div>
                <div className="produk-card__meta">
                  <span>⭐ {Number(p.rating).toFixed(1)}</span>
                  <span>/{p.satuan}</span>
                  <span>🛒 {p.total_terjual} terjual</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </section>
  );
}
