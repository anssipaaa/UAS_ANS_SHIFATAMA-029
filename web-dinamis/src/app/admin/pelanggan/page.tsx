import { query } from "@/lib/db";

export const dynamic = "force-dynamic";

export default async function AdminPelanggan() {
  const pelanggan = await query<any>(
    `SELECT p.*, 
            COUNT(o.id_pesanan) as total_pesanan, 
            SUM(o.total_bayar) as total_belanja
     FROM pelanggan p
     LEFT JOIN pesanan o ON p.id_pelanggan = o.id_pelanggan AND o.status = 'selesai'
     GROUP BY p.id_pelanggan
     ORDER BY p.dibuat_pada DESC`
  );

  function formatRupiah(num: number) {
    if (!num) return "Rp 0";
    return new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", minimumFractionDigits: 0 }).format(num);
  }

  return (
    <div className="admin-page-header" style={{ flexDirection: "column" }}>
      <div style={{ width: "100%", display: "flex", justifyContent: "space-between", marginBottom: "24px" }}>
        <div>
          <h2 className="admin-page-title">Pelanggan</h2>
          <p className="admin-page-subtitle">Daftar pelanggan dan ringkasan aktivitas belanja mereka.</p>
        </div>
      </div>

      <div className="admin-card" style={{ width: "100%" }}>
        <div className="admin-table-wrap">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Nama Pelanggan</th>
                <th>Kontak</th>
                <th>Bergabung</th>
                <th>Poin</th>
                <th>Pesanan Selesai</th>
                <th>Total Belanja</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {pelanggan.length === 0 ? (
                <tr><td colSpan={7} style={{ textAlign: "center", padding: "32px", color: "#94a3b8" }}>Belum ada pelanggan.</td></tr>
              ) : pelanggan.map((p: any) => (
                <tr key={p.id_pelanggan}>
                  <td style={{ fontWeight: 600 }}>{p.nama_lengkap}</td>
                  <td>
                    <div>{p.email}</div>
                    <div style={{ fontSize: "12px", color: "#64748b" }}>{p.no_telepon || "-"}</div>
                  </td>
                  <td>{new Date(p.dibuat_pada).toLocaleDateString("id-ID")}</td>
                  <td style={{ fontWeight: 600, color: "#EC4899" }}>{p.poin_reward}</td>
                  <td style={{ textAlign: "center", fontWeight: 600 }}>{p.total_pesanan}</td>
                  <td style={{ fontWeight: 600, color: "#059669" }}>{formatRupiah(Number(p.total_belanja))}</td>
                  <td>
                    <span className={`admin-badge ${p.aktif ? "admin-badge-green" : "admin-badge-gray"}`}>
                      {p.aktif ? "Aktif" : "Nonaktif"}
                    </span>
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
