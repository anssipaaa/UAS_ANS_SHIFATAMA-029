import { updateProduk } from "@/app/actions/produk";
import { query } from "@/lib/db";
import Link from "next/link";
import { notFound } from "next/navigation";

export const dynamic = "force-dynamic";

export default async function EditProdukPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  
  const produkRows = await query<any>("SELECT * FROM produk WHERE id_produk = ?", [id]);
  if (produkRows.length === 0) return notFound();
  
  const produk = produkRows[0];
  const kategori = await query<any>("SELECT id_kategori, nama_kategori FROM kategori WHERE aktif = 1 ORDER BY urutan ASC");

  const updateAction = updateProduk.bind(null, produk.id_produk);

  return (
    <div>
      <div className="admin-page-header">
        <div>
          <h2 className="admin-page-title">Edit Produk</h2>
          <Link href="/admin/produk" style={{ color: "#2563eb", textDecoration: "none", fontSize: "14px", marginTop: "4px", display: "inline-block" }}>
            ← Kembali ke daftar produk
          </Link>
        </div>
      </div>

      <div className="admin-card" style={{ maxWidth: "800px", padding: "32px" }}>
        <form action={updateAction}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px" }}>
            <div className="admin-form-group" style={{ gridColumn: "span 2" }}>
              <label className="admin-form-label">Nama Produk *</label>
              <input type="text" name="nama_produk" required className="admin-form-input" defaultValue={produk.nama_produk} />
            </div>

            <div className="admin-form-group">
              <label className="admin-form-label">Kategori *</label>
              <select name="id_kategori" required className="admin-form-input" defaultValue={produk.id_kategori}>
                <option value="">-- Pilih Kategori --</option>
                {kategori.map((k: any) => (
                  <option key={k.id_kategori} value={k.id_kategori}>{k.nama_kategori}</option>
                ))}
              </select>
            </div>

            <div className="admin-form-group">
              <label className="admin-form-label">URL / Path Gambar (Opsional)</label>
              <input type="text" name="gambar_utama" className="admin-form-input" defaultValue={produk.gambar_utama || ""} />
            </div>

            <div className="admin-form-group">
              <label className="admin-form-label">Harga (Rp) *</label>
              <input type="number" name="harga" required className="admin-form-input" defaultValue={produk.harga} min="0" />
            </div>

            <div className="admin-form-group">
              <label className="admin-form-label">Harga Coret (Rp) (Opsional)</label>
              <input type="number" name="harga_coret" className="admin-form-input" defaultValue={produk.harga_coret || ""} min="0" />
            </div>

            <div className="admin-form-group">
              <label className="admin-form-label">Stok</label>
              <input type="number" name="stok" className="admin-form-input" defaultValue={produk.stok} min="0" />
            </div>

            <div className="admin-form-group">
              <label className="admin-form-label">Satuan</label>
              <input type="text" name="satuan" className="admin-form-input" defaultValue={produk.satuan} />
            </div>

            <div className="admin-form-group">
              <label className="admin-form-label">Berat (Gram) (Opsional)</label>
              <input type="number" name="berat_gram" className="admin-form-input" defaultValue={produk.berat_gram || ""} min="0" />
            </div>

            <div className="admin-form-group" style={{ gridColumn: "span 2", display: "flex", gap: "24px", alignItems: "center" }}>
              <label style={{ display: "flex", alignItems: "center", gap: "8px", cursor: "pointer", fontSize: "14px" }}>
                <input type="checkbox" name="unggulan" defaultChecked={produk.unggulan === 1} style={{ width: "18px", height: "18px" }} />
                Produk Unggulan
              </label>
              <label style={{ display: "flex", alignItems: "center", gap: "8px", cursor: "pointer", fontSize: "14px" }}>
                <input type="checkbox" name="aktif" defaultChecked={produk.aktif === 1} style={{ width: "18px", height: "18px" }} />
                Aktif (Tampilkan di web)
              </label>
            </div>

            <div className="admin-form-group" style={{ gridColumn: "span 2" }}>
              <label className="admin-form-label">Deskripsi</label>
              <textarea name="deskripsi" className="admin-form-textarea" defaultValue={produk.deskripsi || ""}></textarea>
            </div>
          </div>

          <div style={{ marginTop: "32px", display: "flex", justifyContent: "flex-end", gap: "12px" }}>
            <Link href="/admin/produk" className="admin-btn admin-btn-secondary">Batal</Link>
            <button type="submit" className="admin-btn admin-btn-primary">Simpan Perubahan</button>
          </div>
        </form>
      </div>
    </div>
  );
}
