import { query } from "@/lib/db";
import { createKategori, updateKategori, deleteKategori } from "@/app/actions/kategori";
import DeleteButton from "../components/DeleteButton";

export const dynamic = "force-dynamic";

export default async function AdminKategori() {
  const kategori = await query<any>("SELECT * FROM kategori ORDER BY urutan ASC");

  return (
    <div className="admin-page-header" style={{ flexDirection: "column" }}>
      <div style={{ width: "100%", display: "flex", justifyContent: "space-between", marginBottom: "24px" }}>
        <div>
          <h2 className="admin-page-title">Kategori Produk</h2>
          <p className="admin-page-subtitle">Kelola kategori untuk pengelompokan produk.</p>
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 2fr", gap: "24px", width: "100%" }}>
        {/* Form Tambah */}
        <div className="admin-card" style={{ padding: "24px", height: "fit-content" }}>
          <h3 style={{ fontSize: "16px", marginBottom: "20px" }}>Tambah Kategori</h3>
          <form action={createKategori}>
            <div className="admin-form-group">
              <label className="admin-form-label">Nama Kategori *</label>
              <input type="text" name="nama_kategori" required className="admin-form-input" />
            </div>
            <div className="admin-form-group">
              <label className="admin-form-label">Deskripsi</label>
              <textarea name="deskripsi" className="admin-form-textarea" style={{ minHeight: "80px" }}></textarea>
            </div>
            <div className="admin-form-group">
              <label className="admin-form-label">Urutan</label>
              <input type="number" name="urutan" className="admin-form-input" defaultValue="0" />
            </div>
            <div className="admin-form-group" style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <input type="checkbox" name="aktif" defaultChecked style={{ width: "16px", height: "16px" }} />
              <span style={{ fontSize: "14px" }}>Aktif</span>
            </div>
            <button type="submit" className="admin-btn admin-btn-primary" style={{ width: "100%", justifyContent: "center" }}>Tambah</button>
          </form>
        </div>

        {/* Tabel */}
        <div className="admin-card">
          <div className="admin-table-wrap">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Urutan</th>
                  <th>Nama Kategori</th>
                  <th>Status</th>
                  <th style={{ textAlign: "right" }}>Aksi</th>
                </tr>
              </thead>
              <tbody>
                {kategori.map((k: any) => (
                  <tr key={k.id_kategori}>
                    <td>{k.urutan}</td>
                    <td>
                      <div style={{ fontWeight: 600 }}>{k.nama_kategori}</div>
                      <div style={{ fontSize: "12px", color: "#64748b" }}>/{k.slug}</div>
                    </td>
                    <td>
                      <span className={`admin-badge ${k.aktif ? "admin-badge-green" : "admin-badge-gray"}`}>
                        {k.aktif ? "Aktif" : "Nonaktif"}
                      </span>
                    </td>
                    <td style={{ textAlign: "right" }}>
                      <form action={async () => { "use server"; await deleteKategori(k.id_kategori); }}>
                        <DeleteButton confirmMessage="Yakin ingin menghapus kategori ini?" />
                      </form>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
