import { query } from "@/lib/db";
import Link from "next/link";
import { deleteArtikel, togglePublishArtikel } from "@/app/actions/artikel";
import DeleteButton from "../components/DeleteButton";

export const dynamic = "force-dynamic";

export default async function AdminArtikel() {
  const artikel = await query<any>(
    "SELECT id_artikel, judul, slug, status, dibuat_pada FROM artikel ORDER BY dibuat_pada DESC"
  );

  return (
    <div className="admin-page-header" style={{ flexDirection: "column" }}>
      <div style={{ width: "100%", display: "flex", justifyContent: "space-between", marginBottom: "24px" }}>
        <div>
          <h2 className="admin-page-title">Artikel & Berita</h2>
          <p className="admin-page-subtitle">Kelola artikel blog, resep, dan berita toko.</p>
        </div>
        <Link href="/admin/artikel/create" className="admin-btn admin-btn-primary">
          + Tulis Artikel
        </Link>
      </div>

      <div className="admin-card" style={{ width: "100%" }}>
        <div className="admin-table-wrap">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Judul Artikel</th>
                <th>Tanggal</th>
                <th>Status</th>
                <th style={{ textAlign: "right" }}>Aksi</th>
              </tr>
            </thead>
            <tbody>
              {artikel.length === 0 ? (
                <tr><td colSpan={4} style={{ textAlign: "center", padding: "32px", color: "#94a3b8" }}>Belum ada artikel.</td></tr>
              ) : artikel.map((a: any) => (
                <tr key={a.id_artikel}>
                  <td>
                    <div style={{ fontWeight: 600 }}>{a.judul}</div>
                    <div style={{ fontSize: "12px", color: "#64748b" }}>/artikel/{a.slug}</div>
                  </td>
                  <td>{new Date(a.dibuat_pada).toLocaleDateString("id-ID")}</td>
                  <td>
                    <form action={async () => { "use server"; await togglePublishArtikel(a.id_artikel, a.status); }}>
                      <button type="submit" className={`admin-badge ${a.status === 'publish' ? "admin-badge-green" : "admin-badge-gray"}`} style={{ border: "none", cursor: "pointer" }}>
                        {a.status === 'publish' ? "Publish" : "Draft"}
                      </button>
                    </form>
                  </td>
                  <td style={{ textAlign: "right" }}>
                    <div style={{ display: "flex", gap: "8px", justifyContent: "flex-end" }}>
                      <Link href={`/admin/artikel/${a.id_artikel}/edit`} className="admin-btn-icon" title="Edit">
                        ✏️
                      </Link>
                      <form action={async () => { "use server"; await deleteArtikel(a.id_artikel); }}>
                        <DeleteButton confirmMessage="Yakin ingin menghapus artikel ini?" />
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
