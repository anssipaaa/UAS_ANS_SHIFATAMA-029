import { updateArtikel } from "@/app/actions/artikel";
import { query } from "@/lib/db";
import Link from "next/link";
import { notFound } from "next/navigation";

export const dynamic = "force-dynamic";

export default async function EditArtikelPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  
  const artikelRows = await query<any>("SELECT * FROM artikel WHERE id_artikel = ?", [id]);
  if (artikelRows.length === 0) return notFound();
  
  const artikel = artikelRows[0];
  const updateAction = updateArtikel.bind(null, artikel.id_artikel);

  return (
    <div>
      <div className="admin-page-header">
        <div>
          <h2 className="admin-page-title">Edit Artikel</h2>
          <Link href="/admin/artikel" style={{ color: "#2563eb", textDecoration: "none", fontSize: "14px", marginTop: "4px", display: "inline-block" }}>
            ← Kembali ke daftar artikel
          </Link>
        </div>
      </div>

      <form action={updateAction} className="admin-card" style={{ maxWidth: "900px", padding: "32px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px" }}>
          
          <div className="admin-form-group" style={{ gridColumn: "span 2" }}>
            <label className="admin-form-label">Judul Artikel *</label>
            <input type="text" name="judul" required defaultValue={artikel.judul} className="admin-form-input" style={{ fontSize: "16px", padding: "12px 16px" }} />
          </div>

          <div className="admin-form-group">
            <label className="admin-form-label">Gambar URL (Opsional)</label>
            <input type="url" name="gambar_url" defaultValue={artikel.gambar_url || ""} className="admin-form-input" />
          </div>

          <div className="admin-form-group">
            <label className="admin-form-label">Penulis</label>
            <input type="text" name="penulis" defaultValue={artikel.penulis || ""} className="admin-form-input" />
          </div>

          <div className="admin-form-group" style={{ gridColumn: "span 2" }}>
            <label className="admin-form-label">Isi Artikel *</label>
            <textarea name="isi" required defaultValue={artikel.isi} className="admin-form-textarea" style={{ minHeight: "300px", fontSize: "15px", lineHeight: 1.6 }}></textarea>
          </div>

          <div className="admin-form-group" style={{ gridColumn: "span 2" }}>
            <label className="admin-form-label">Status Publikasi</label>
            <select name="status" defaultValue={artikel.status} className="admin-form-input" style={{ maxWidth: "300px" }}>
              <option value="publish">Publish</option>
              <option value="draft">Draft</option>
            </select>
          </div>

        </div>

        <div style={{ marginTop: "32px", display: "flex", justifyContent: "flex-end", gap: "12px", borderTop: "1px solid #f1f5f9", paddingTop: "24px" }}>
          <Link href="/admin/artikel" className="admin-btn admin-btn-secondary">Batal</Link>
          <button type="submit" className="admin-btn admin-btn-primary" style={{ padding: "10px 24px" }}>Simpan Perubahan</button>
        </div>
      </form>
    </div>
  );
}
