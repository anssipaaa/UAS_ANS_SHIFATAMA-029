import { createArtikel } from "@/app/actions/artikel";
import Link from "next/link";

export const dynamic = "force-dynamic";

export default function CreateArtikelPage() {
  return (
    <div>
      <div className="admin-page-header">
        <div>
          <h2 className="admin-page-title">Tulis Artikel Baru</h2>
          <Link href="/admin/artikel" style={{ color: "#2563eb", textDecoration: "none", fontSize: "14px", marginTop: "4px", display: "inline-block" }}>
            ← Kembali ke daftar artikel
          </Link>
        </div>
      </div>

      <form action={createArtikel} className="admin-card" style={{ maxWidth: "900px", padding: "32px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px" }}>
          
          <div className="admin-form-group" style={{ gridColumn: "span 2" }}>
            <label className="admin-form-label">Judul Artikel *</label>
            <input type="text" name="judul" required className="admin-form-input" placeholder="Masukkan judul artikel" style={{ fontSize: "16px", padding: "12px 16px" }} />
          </div>

          <div className="admin-form-group">
            <label className="admin-form-label">Gambar URL (Opsional)</label>
            <input type="url" name="gambar_url" className="admin-form-input" placeholder="https://..." />
          </div>

          <div className="admin-form-group">
            <label className="admin-form-label">Penulis</label>
            <input type="text" name="penulis" className="admin-form-input" placeholder="Nama penulis" />
          </div>

          <div className="admin-form-group" style={{ gridColumn: "span 2" }}>
            <label className="admin-form-label">Isi Artikel *</label>
            <textarea name="isi" required className="admin-form-textarea" placeholder="Tulis konten artikel di sini..." style={{ minHeight: "300px", fontSize: "15px", lineHeight: 1.6 }}></textarea>
          </div>

          <div className="admin-form-group" style={{ gridColumn: "span 2" }}>
            <label className="admin-form-label">Status Publikasi</label>
            <select name="status" className="admin-form-input" style={{ maxWidth: "300px" }}>
              <option value="publish">Langsung Publish</option>
              <option value="draft">Simpan sebagai Draft</option>
            </select>
          </div>

        </div>

        <div style={{ marginTop: "32px", display: "flex", justifyContent: "flex-end", gap: "12px", borderTop: "1px solid #f1f5f9", paddingTop: "24px" }}>
          <Link href="/admin/artikel" className="admin-btn admin-btn-secondary">Batal</Link>
          <button type="submit" className="admin-btn admin-btn-primary" style={{ padding: "10px 24px" }}>Simpan Artikel</button>
        </div>
      </form>
    </div>
  );
}
