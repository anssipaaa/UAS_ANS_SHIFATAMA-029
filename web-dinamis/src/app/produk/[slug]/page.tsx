import { query } from "@/lib/db";
import Link from "next/link";
import { notFound } from "next/navigation";

export const dynamic = "force-dynamic";

function formatRupiah(num: number) {
  return new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", minimumFractionDigits: 0 }).format(num);
}

export default async function ProdukDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  const rows = await query<any>(
    `SELECT p.*, k.nama_kategori, k.slug AS kategori_slug
     FROM produk p
     JOIN kategori k ON p.id_kategori = k.id_kategori
     WHERE p.slug = ? AND p.aktif = 1`,
    [slug]
  );

  if (rows.length === 0) return notFound();
  const produk = rows[0];

  // Related products from same category
  const related = await query<any>(
    `SELECT p.id_produk, p.nama_produk, p.slug, p.harga, p.harga_coret, p.gambar_utama, p.rating, p.total_terjual,
            k.nama_kategori
     FROM produk p
     JOIN kategori k ON p.id_kategori = k.id_kategori
     WHERE p.id_kategori = ? AND p.id_produk != ? AND p.aktif = 1
     ORDER BY p.total_terjual DESC LIMIT 4`,
    [produk.id_kategori, produk.id_produk]
  );

  return (
    <>
      <section className="detail-section">
        <div style={{ marginBottom: "2rem" }}>
          <Link href="/produk" style={{ color: "var(--text-dim)", textDecoration: "none", fontSize: "0.9rem" }}>
            ← Kembali ke Produk
          </Link>
        </div>

        <div className="detail-grid">
          {/* Image */}
          <div className="detail-image">
            {produk.gambar_utama ? (
              <img src={produk.gambar_utama} alt={produk.nama_produk} />
            ) : (
              "🍞"
            )}
          </div>

          {/* Info */}
          <div className="detail-info">
            <div className="detail-kategori">{produk.nama_kategori}</div>
            <h1 className="detail-nama">{produk.nama_produk}</h1>

            <div className="detail-harga">
              {formatRupiah(Number(produk.harga))}
              {produk.harga_coret && (
                <span className="detail-harga-coret">{formatRupiah(Number(produk.harga_coret))}</span>
              )}
            </div>

            {produk.deskripsi && (
              <p className="detail-desc">{produk.deskripsi}</p>
            )}

            <div className="detail-meta">
              <div className="detail-meta-item">
                <span className="detail-meta-label">Stok</span>
                <span className="detail-meta-value">{produk.stok > 0 ? `${produk.stok} ${produk.satuan}` : "Habis"}</span>
              </div>
              <div className="detail-meta-item">
                <span className="detail-meta-label">Rating</span>
                <span className="detail-meta-value">⭐ {Number(produk.rating).toFixed(1)}</span>
              </div>
              <div className="detail-meta-item">
                <span className="detail-meta-label">Terjual</span>
                <span className="detail-meta-value">{produk.total_terjual}</span>
              </div>
              {produk.berat_gram && (
                <div className="detail-meta-item">
                  <span className="detail-meta-label">Berat</span>
                  <span className="detail-meta-value">{produk.berat_gram}g</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Related products */}
      {related.length > 0 && (
        <section style={{ padding: "2rem 10% 6rem", minHeight: "auto" }}>
          <h2 className="section-title" style={{ fontSize: "1.8rem" }}>
            Produk <span className="text-gradient">Serupa</span>
          </h2>
          <div className="produk-grid" style={{ marginTop: "2rem" }}>
            {related.map((r: any) => (
              <Link href={`/produk/${r.slug}`} className="produk-card" key={r.id_produk}>
                <div className="produk-card__img">
                  {r.gambar_utama ? <img src={r.gambar_utama} alt={r.nama_produk} /> : "🍞"}
                </div>
                <div className="produk-card__body">
                  <div className="produk-card__kategori">{r.nama_kategori}</div>
                  <div className="produk-card__nama">{r.nama_produk}</div>
                  <div className="produk-card__harga">
                    {formatRupiah(Number(r.harga))}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}
    </>
  );
}
