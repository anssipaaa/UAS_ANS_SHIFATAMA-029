import { query } from "@/lib/db";
import Link from "next/link";
import { deleteProduk, toggleAktifProduk, toggleUnggulanProduk } from "@/app/actions/produk";
import DeleteButton from "../components/DeleteButton";

export const dynamic = "force-dynamic";

function formatRupiah(num: number) {
  return new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", minimumFractionDigits: 0 }).format(num);
}

export default async function AdminProduk() {
  const produk = await query<any>(
    `SELECT p.id_produk, p.nama_produk, p.harga, p.stok, p.unggulan, p.aktif, k.nama_kategori 
     FROM produk p 
     JOIN kategori k ON p.id_kategori = k.id_kategori 
     ORDER BY p.id_produk DESC`
  );

  return (
    <div className="admin-page-header">
      <div>
        <h2 className="admin-page-title">Kelola Produk</h2>
        <p className="admin-page-subtitle">Daftar semua produk, harga, dan stok.</p>
      </div>
      <Link href="/admin/produk/create" className="admin-btn admin-btn-primary">
        + Tambah Produk
      </Link>

      <div className="admin-card" style={{ width: "100%", marginTop: "24px" }}>
        <div className="admin-table-wrap">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Nama Produk</th>
                <th>Kategori</th>
                <th>Harga</th>
                <th>Stok</th>
                <th>Status</th>
                <th style={{ textAlign: "right" }}>Aksi</th>
              </tr>
            </thead>
            <tbody>
              {produk.length === 0 ? (
                <tr><td colSpan={6} style={{ textAlign: "center", padding: "32px", color: "#94a3b8" }}>Belum ada produk.</td></tr>
              ) : produk.map((p: any) => (
                <tr key={p.id_produk}>
                  <td>
                    <div style={{ fontWeight: 600 }}>{p.nama_produk}</div>
                  </td>
                  <td>{p.nama_kategori}</td>
                  <td style={{ fontWeight: 600, color: "#059669" }}>{formatRupiah(Number(p.harga))}</td>
                  <td>{p.stok}</td>
                  <td>
                    <div style={{ display: "flex", gap: "6px", flexDirection: "column", alignItems: "flex-start" }}>
                      <form action={async () => { "use server"; await toggleAktifProduk(p.id_produk, p.aktif); }}>
                        <button type="submit" className={`admin-badge ${p.aktif ? "admin-badge-green" : "admin-badge-gray"}`} style={{ border: "none", cursor: "pointer" }}>
                          {p.aktif ? "Aktif" : "Nonaktif"}
                        </button>
                      </form>
                      <form action={async () => { "use server"; await toggleUnggulanProduk(p.id_produk, p.unggulan); }}>
                        <button type="submit" className={`admin-badge ${p.unggulan ? "admin-badge-blue" : "admin-badge-gray"}`} style={{ border: "none", cursor: "pointer" }}>
                          {p.unggulan ? "★ Unggulan" : "Biasa"}
                        </button>
                      </form>
                    </div>
                  </td>
                  <td style={{ textAlign: "right" }}>
                    <div style={{ display: "flex", gap: "8px", justifyContent: "flex-end" }}>
                      <Link href={`/admin/produk/${p.id_produk}/edit`} className="admin-btn-icon" title="Edit">
                        ✏️
                      </Link>
                      <form action={async () => { "use server"; await deleteProduk(p.id_produk); }}>
                        <DeleteButton confirmMessage="Yakin ingin menghapus produk ini?" />
                      </form>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
