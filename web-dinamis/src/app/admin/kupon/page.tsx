import { query } from "@/lib/db";
import { createKupon, deleteKupon } from "@/app/actions/kupon";
import DeleteButton from "../components/DeleteButton";

export const dynamic = "force-dynamic";

function formatRupiah(num: number) {
  if (!num) return "Rp 0";
  return new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", minimumFractionDigits: 0 }).format(num);
}

export default async function AdminKupon() {
  const kupon = await query<any>("SELECT * FROM kupon ORDER BY dibuat_pada DESC");

  return (
    <div className="admin-page-header" style={{ flexDirection: "column" }}>
      <div style={{ width: "100%", display: "flex", justifyContent: "space-between", marginBottom: "24px" }}>
        <div>
          <h2 className="admin-page-title">Kupon Diskon</h2>
          <p className="admin-page-subtitle">Kelola kupon promosi untuk pelanggan.</p>
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 2fr", gap: "24px", width: "100%" }}>
        {/* Form Tambah */}
        <div className="admin-card" style={{ padding: "24px", height: "fit-content" }}>
          <h3 style={{ fontSize: "16px", marginBottom: "20px" }}>Buat Kupon Baru</h3>
          <form action={createKupon}>
            <div className="admin-form-group">
              <label className="admin-form-label">Kode Kupon *</label>
              <input type="text" name="kode_kupon" required className="admin-form-input" placeholder="Misal: PROMO2026" style={{ textTransform: "uppercase" }} />
            </div>
            
            <div className="admin-form-group">
              <label className="admin-form-label">Tipe Diskon *</label>
              <select name="tipe_diskon" className="admin-form-input">
                <option value="persen">Persentase (%)</option>
                <option value="nominal">Nominal (Rp)</option>
              </select>
            </div>
            
            <div className="admin-form-group">
              <label className="admin-form-label">Nilai Diskon *</label>
              <input type="number" name="nilai_diskon" required className="admin-form-input" placeholder="Misal: 10 (jika persen) atau 15000" min="0" />
            </div>
            
            <div className="admin-form-group">
              <label className="admin-form-label">Min. Belanja (Rp)</label>
              <input type="number" name="min_belanja" className="admin-form-input" defaultValue="0" min="0" />
            </div>
            
            <div className="admin-form-group">
              <label className="admin-form-label">Kuota Penggunaan</label>
              <input type="number" name="kuota" className="admin-form-input" placeholder="Kosongkan jika tanpa batas" min="1" />
            </div>
            
            <div className="admin-form-group">
              <label className="admin-form-label">Deskripsi</label>
              <textarea name="deskripsi" className="admin-form-textarea" style={{ minHeight: "60px" }}></textarea>
            </div>
            
            <div className="admin-form-group" style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <input type="checkbox" name="aktif" defaultChecked style={{ width: "16px", height: "16px" }} />
              <span style={{ fontSize: "14px" }}>Aktif</span>
            </div>
            <button type="submit" className="admin-btn admin-btn-primary" style={{ width: "100%", justifyContent: "center" }}>Buat Kupon</button>
          </form>
        </div>

        {/* Tabel */}
        <div className="admin-card">
          <div className="admin-table-wrap">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Kode</th>
                  <th>Diskon</th>
                  <th>Min. Belanja</th>
                  <th>Terpakai / Kuota</th>
                  <th>Status</th>
                  <th style={{ textAlign: "right" }}>Aksi</th>
                </tr>
              </thead>
              <tbody>
                {kupon.length === 0 ? (
                  <tr><td colSpan={6} style={{ textAlign: "center", padding: "32px", color: "#94a3b8" }}>Belum ada kupon.</td></tr>
                ) : kupon.map((k: any) => (
                  <tr key={k.id_kupon}>
                    <td>
                      <div style={{ fontWeight: 700, fontFamily: "monospace", fontSize: "14px" }}>{k.kode_kupon}</div>
                      {k.deskripsi && <div style={{ fontSize: "12px", color: "#64748b" }}>{k.deskripsi}</div>}
                    </td>
                    <td style={{ fontWeight: 600, color: "#EC4899" }}>
                      {k.tipe_diskon === "persen" ? `${k.nilai_diskon}%` : formatRupiah(Number(k.nilai_diskon))}
                    </td>
                    <td>{formatRupiah(Number(k.min_belanja))}</td>
                    <td style={{ textAlign: "center" }}>
                      {k.terpakai} / {k.kuota ? k.kuota : "∞"}
                    </td>
                    <td>
                      <span className={`admin-badge ${k.aktif ? "admin-badge-green" : "admin-badge-gray"}`}>
                        {k.aktif ? "Aktif" : "Nonaktif"}
                      </span>
                    </td>
                    <td style={{ textAlign: "right" }}>
                      <form action={async () => { "use server"; await deleteKupon(k.id_kupon); }}>
                        <DeleteButton confirmMessage="Yakin ingin menghapus kupon ini?" />
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
