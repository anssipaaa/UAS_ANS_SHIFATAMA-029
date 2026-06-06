import { query } from "@/lib/db";
import Link from "next/link";

function formatRupiah(num: number) {
  return new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", minimumFractionDigits: 0 }).format(num);
}

export default async function ProdukUnggulanSection() {
  let produk: any[] = [];
  try {
    produk = await query<any>(
      `SELECT p.id_produk, p.nama_produk, p.slug, p.harga, p.harga_coret, p.gambar_utama, p.rating, p.total_terjual,
              k.nama_kategori 
       FROM produk p 
       JOIN kategori k ON p.id_kategori = k.id_kategori 
       WHERE p.unggulan = 1 AND p.aktif = 1 
       ORDER BY p.total_terjual DESC 
       LIMIT 6`
    );
  } catch {
    produk = [];
  }

  return (
    <section id="unggulan">
      <h2 className="section-title">
        Menu <span className="text-gradient-cute">Tervaforit</span>
      </h2>
      <p className="section-subtitle">
        Yang paling sering dibeli karena rasanya bikin nagih! 🍩
      </p>
      <div className="produk-cute-grid">
        {produk.map((p: any) => (
          <Link href={`/produk/${p.slug}`} className="produk-cute-card" key={p.id_produk}>
            <div className="produk-cute-card__img">
              {p.gambar_utama ? (
                <img src={p.gambar_utama} alt={p.nama_produk} />
              ) : (
                <div style={{ fontSize: "4rem" }}>🎂</div>
              )}
              <span className="produk-cute-card__badge">Paling Laris ✨</span>
            </div>
            <div className="produk-cute-card__body">
              <div className="produk-cute-card__kategori">{p.nama_kategori}</div>
              <div className="produk-cute-card__nama">{p.nama_produk}</div>
              <div className="produk-cute-card__harga">
                {formatRupiah(Number(p.harga))}
                {p.harga_coret && (
                  <span className="produk-cute-card__harga-coret">{formatRupiah(Number(p.harga_coret))}</span>
                )}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
