import { query } from "@/lib/db";
import Link from "next/link";
import { updateStatusPesanan } from "@/app/actions/pesanan";

export const dynamic = "force-dynamic";

function formatRupiah(num: number) {
  return new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", minimumFractionDigits: 0 }).format(num);
}

export default async function AdminPesanan() {
  const pesanan = await query<any>(
    `SELECT p.id_pesanan, p.nomor_pesanan, p.total_bayar, p.metode_kirim, p.status, p.dibuat_pada, 
            u.nama_lengkap, u.no_telepon
     FROM pesanan p
     JOIN pelanggan u ON p.id_pelanggan = u.id_pelanggan
     ORDER BY p.dibuat_pada DESC`
  );

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'menunggu_pembayaran': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'dibayar': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'diproses': return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'siap_kirim': return 'bg-indigo-100 text-indigo-800 border-indigo-200';
      case 'dikirim': return 'bg-cyan-100 text-cyan-800 border-cyan-200';
      case 'selesai': return 'admin-badge-green';
      case 'dibatalkan': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'admin-badge-gray';
    }
  };

  return (
    <div className="admin-page-header" style={{ flexDirection: "column" }}>
      <div style={{ width: "100%", display: "flex", justifyContent: "space-between", marginBottom: "24px" }}>
        <div>
          <h2 className="admin-page-title">Pesanan</h2>
          <p className="admin-page-subtitle">Kelola pesanan masuk dan update status pengiriman.</p>
        </div>
      </div>

      <div className="admin-card" style={{ width: "100%" }}>
        <div className="admin-table-wrap">
          <table className="admin-table">
            <thead>
              <tr>
                <th>No. Pesanan</th>
                <th>Tanggal</th>
                <th>Pelanggan</th>
                <th>Total</th>
                <th>Tipe Kirim</th>
                <th>Status</th>
                <th style={{ textAlign: "right" }}>Aksi</th>
              </tr>
            </thead>
            <tbody>
              {pesanan.length === 0 ? (
                <tr><td colSpan={7} style={{ textAlign: "center", padding: "32px", color: "#94a3b8" }}>Belum ada pesanan.</td></tr>
              ) : pesanan.map((p: any) => (
                <tr key={p.id_pesanan}>
                  <td style={{ fontWeight: 600 }}>{p.nomor_pesanan}</td>
                  <td>{new Date(p.dibuat_pada).toLocaleString("id-ID")}</td>
                  <td>
                    <div style={{ fontWeight: 600 }}>{p.nama_lengkap}</div>
                    <div style={{ fontSize: "12px", color: "#64748b" }}>{p.no_telepon}</div>
                  </td>
                  <td style={{ fontWeight: 600, color: "#059669" }}>{formatRupiah(Number(p.total_bayar))}</td>
                  <td style={{ textTransform: "capitalize" }}>{p.metode_kirim}</td>
                  <td>
                    <form action={async (formData) => { "use server"; await updateStatusPesanan(p.id_pesanan, formData.get("status") as string); }}>
                      <select 
                        name="status" 
                        defaultValue={p.status} 
                        onChange={(e) => e.target.form?.requestSubmit()}
                        className={`admin-badge ${getStatusBadge(p.status)}`}
                        style={{ border: "1px solid currentColor", outline: "none", cursor: "pointer", background: "transparent" }}
                      >
                        <option value="menunggu_pembayaran">Menunggu Pembayaran</option>
                        <option value="dibayar">Dibayar</option>
                        <option value="diproses">Diproses</option>
                        <option value="siap_kirim">Siap Kirim/Pickup</option>
                        <option value="dikirim">Dikirim</option>
                        <option value="selesai">Selesai</option>
                        <option value="dibatalkan">Dibatalkan</option>
                      </select>
                    </form>
                  </td>
                  <td style={{ textAlign: "right" }}>
                    <Link href={`/admin/pesanan/${p.id_pesanan}`} className="admin-btn admin-btn-secondary" style={{ padding: "6px 12px", fontSize: "12px" }}>
                      Detail
                    </Link>
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
