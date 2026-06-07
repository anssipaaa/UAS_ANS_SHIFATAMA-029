import { createProduk } from "@/app/actions/produk";
import { query } from "@/lib/db";
import Link from "next/link";

export const dynamic = "force-dynamic";

export default async function CreateProdukPage() {
  const kategori = await query<any>("SELECT id_kategori, nama_kategori FROM kategori WHERE aktif = 1 ORDER BY urutan ASC");

  return (
    <div>
      <div className="admin-page-header">
        <div>
          <h2 className="admin-page-title">Tambah Produk</h2>
          <Link href="/admin/produk" style={{ color: "#2563eb", textDecoration: "none", fontSize: "14px", marginTop: "4px", display: "inline-block" }}>
            ← Kembali ke daftar produk
          </Link>
        </div>
      </div>

      <div className="admin-card" style={{ maxWidth: "800px", padding: "32px" }}>
        <form action={createProduk}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px" }}>
            <div className="admin-form-group" style={{ gridColumn: "span 2" }}>
              <label className="admin-form-label">Nama Produk *</label>
              <input type="text" name="nama_produk" required className="admin-form-input" placeholder="Contoh: Roti Tawar Gandum" />
            </div>

            <div className="admin-form-group">
              <label className="admin-form-label">Kategori *</label>
              <select name="id_kategori" required className="admin-form-input">
                <option value="">-- Pilih Kategori --</option>
                {kategori.map((k: any) => (
                  <option key={k.id_kategori} value={k.id_kategori}>{k.nama_kategori}</option>
                ))}
              </select>
            </div>

            <div className="admin-form-group">
              <label className="admin-form-label">URL / Path Gambar (Opsional)</label>
              <input type="text" name="gambar_utama" className="admin-form-input" placeholder="/images/produk/..." />
            </div>

            <div className="admin-form-group">
              <label className="admin-form-label">Harga (Rp) *</label>
              <input type="number" name="harga" required className="admin-form-input" placeholder="Contoh: 15000" min="0" />
            </div>

            <div className="admin-form-group">
              <label className="admin-form-label">Harga Coret (Rp) (Opsional)</label>
              <input type="number" name="harga_coret" className="admin-form-input" placeholder="Harga sebelum diskon" min="0" />
            </div>

            <div className="admin-form-group">
              <label className="admin-form-label">Stok Awal</label>
              <input type="number" name="stok" className="admin-form-input" defaultValue="0" min="0" />
            </div>

            <div className="admin-form-group">
              <label className="admin-form-label">Satuan</label>
              <input type="text" name="satuan" className="admin-form-input" defaultValue="pcs" placeholder="pcs, loyang, toples..." />
            </div>

            <div className="admin-form-group">
              <label className="admin-form-label">Berat (Gram) (Opsional)</label>
              <input type="number" name="berat_gram" className="admin-form-input" placeholder="Contoh: 500" min="0" />
            </div>

            <div className="admin-form-group" style={{ gridColumn: "span 2", display: "flex", gap: "24px", alignItems: "center" }}>
              <label style={{ display: "flex", alignItems: "center", gap: "8px", cursor: "pointer", fontSize: "14px" }}>
                <input type="checkbox" name="unggulan" style={{ width: "18px", height: "18px" }} />
                Produk Unggulan
              </label>
              <label style={{ display: "flex", alignItems: "center", gap: "8px", cursor: "pointer", fontSize: "14px" }}>
                <input type="checkbox" name="aktif" defaultChecked style={{ width: "18px", height: "18px" }} />
                Aktif (Tampilkan di web)
              </label>
            </div>

            <div className="admin-form-group" style={{ gridColumn: "span 2" }}>
              <label className="admin-form-label">Deskripsi</label>
              <textarea name="deskripsi" className="admin-form-textarea" placeholder="Deskripsi produk..."></textarea>
            </div>
          </div>

          <div style={{ marginTop: "32px", display: "flex", justifyContent: "flex-end", gap: "12px" }}>
            <Link href="/admin/produk" className="admin-btn admin-btn-secondary">Batal</Link>
            <button type="submit" className="admin-btn admin-btn-primary">Simpan Produk</button>
          </div>
        </form>
      </div>
    </div>
  );
}
