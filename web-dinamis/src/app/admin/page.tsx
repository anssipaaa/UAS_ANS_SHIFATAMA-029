import { query } from "@/lib/db";
import Link from "next/link";

export const dynamic = "force-dynamic";

function formatRupiah(num: number) {
  return new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", minimumFractionDigits: 0 }).format(num);
}

export default async function AdminDashboard() {
  const produkCount = await query<any>("SELECT COUNT(*) as total FROM produk WHERE aktif = 1");
  const pesananCount = await query<any>("SELECT COUNT(*) as total FROM pesanan WHERE DATE(dibuat_pada) = CURDATE()");
  const pelangganCount = await query<any>("SELECT COUNT(*) as total FROM pelanggan");
  
  // Total pendapatan dari pesanan yang selesai/dibayar bulan ini
  const pendapatan = await query<any>(
    "SELECT SUM(total_bayar) as total FROM pesanan WHERE status IN ('selesai', 'dibayar', 'dikirim', 'siap_kirim') AND MONTH(dibuat_pada) = MONTH(CURRENT_DATE()) AND YEAR(dibuat_pada) = YEAR(CURRENT_DATE())"
  );

  const stats = [
    { name: "Total Produk Aktif", value: produkCount[0]?.total ?? 0, href: "/admin/produk", color: "#EC4899", bg: "#FCE7F3", border: "#FBCFE8" },
    { name: "Pesanan Hari Ini", value: pesananCount[0]?.total ?? 0, href: "/admin/pesanan", color: "#059669", bg: "#d1fae5", border: "#a7f3d0" },
    { name: "Total Pelanggan", value: pelangganCount[0]?.total ?? 0, href: "/admin/pelanggan", color: "#2563eb", bg: "#dbeafe", border: "#bfdbfe" },
    { name: "Pendapatan Bulan Ini", value: formatRupiah(pendapatan[0]?.total ?? 0), href: "/admin/pesanan", color: "#7c3aed", bg: "#ede9fe", border: "#ddd6fe" },
  ];

  const recentPesanan = await query<any>(
    `SELECT p.id_pesanan, p.nomor_pesanan, p.total_bayar, p.status, p.dibuat_pada, u.nama_lengkap
     FROM pesanan p
     JOIN pelanggan u ON p.id_pelanggan = u.id_pelanggan
     ORDER BY p.dibuat_pada DESC LIMIT 5`
  );
  
  const produkTerlaris = await query<any>(
    `SELECT p.id_produk, p.nama_produk, p.total_terjual, p.stok, k.nama_kategori
     FROM produk p
     JOIN kategori k ON p.id_kategori = k.id_kategori
     WHERE p.aktif = 1
     ORDER BY p.total_terjual DESC LIMIT 5`
  );

  return (
    <div>
      <div style={{ marginBottom: "28px", textAlign: "center", background: "url('https://images.unsplash.com/photo-1517433670267-08bbd4be890f?q=80&w=1000') center/cover", padding: "40px", borderRadius: "30px", color: "#FFF", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0, background: "rgba(255, 105, 180, 0.6)", backdropFilter: "blur(3px)" }}></div>
        <div style={{ position: "relative", zIndex: 1 }}>
          <h2 style={{ fontSize: "2rem", fontFamily: "var(--font-fredoka)", marginBottom: "10px", textShadow: "0 2px 10px rgba(0,0,0,0.2)" }}>
            Selamat Datang, Admin Ceria! ✨
          </h2>
          <p style={{ fontSize: "1.1rem", textShadow: "0 1px 5px rgba(0,0,0,0.2)" }}>
            Semoga hari ini penuh pesanan manis dan pelanggan yang bahagia 🍰
          </p>
        </div>
      </div>

      {/* Stats */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "20px", marginBottom: "32px" }}>
        {stats.map((s) => (
          <Link key={s.name} href={s.href} className="admin-stat-card" style={{ textDecoration: "none" }}>
            <div>
              <div style={{ fontSize: "13px", color: "var(--text-dim)", fontWeight: 600, marginBottom: "8px" }}>{s.name}</div>
              <div style={{ fontSize: "26px", fontFamily: "var(--font-fredoka)", color: "var(--accent-brown)", lineHeight: 1 }}>{s.value}</div>
            </div>
            <div style={{
              width: "55px", height: "55px", borderRadius: "50%",
              background: s.bg, border: `2px dashed ${s.border}`,
              display: "flex", alignItems: "center", justifyContent: "center",
              color: s.color, fontSize: "24px",
              boxShadow: "0 5px 15px rgba(255,105,180,0.1)"
            }}>
              {s.name.includes("Pendapatan") ? "💰" : s.name.includes("Pelanggan") ? "💖" : s.name.includes("Pesanan") ? "🎁" : "🥐"}
            </div>
          </Link>
        ))}
      </div>

      {/* Recent content */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(350px, 1fr))", gap: "24px" }}>
        {/* Recent Pesanan */}
        <div className="admin-card">
          <div style={{ paddingBottom: "15px", borderBottom: "2px dashed rgba(255,105,180,0.2)", display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "15px" }}>
            <div style={{ fontSize: "18px", fontFamily: "var(--font-fredoka)", color: "var(--accent-brown)" }}>Pesanan Masuk 💌</div>
            <Link href="/admin/pesanan" className="admin-btn admin-btn-secondary" style={{ padding: "6px 14px", fontSize: "12px", background: "#FFF0F5", color: "var(--accent-brown)" }}>Lihat Semua</Link>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
            {recentPesanan.length === 0 ? (
              <div style={{ padding: "32px", textAlign: "center", color: "var(--text-dim)" }}>Belum ada pesanan masuk nih.</div>
            ) : recentPesanan.map((p: any) => (
              <Link href={`/admin/pesanan/${p.id_pesanan}`} key={p.id_pesanan} style={{ padding: "12px 16px", borderRadius: "15px", background: "#FFF", border: "1px solid rgba(255,105,180,0.1)", display: "flex", justifyContent: "space-between", alignItems: "center", textDecoration: "none", color: "inherit", transition: "transform 0.2s", boxShadow: "0 4px 10px rgba(255,182,193,0.05)" }}>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: "14px", fontWeight: 700, color: "var(--text-main)", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                    {p.nomor_pesanan} • {p.nama_lengkap}
                  </div>
                  <div style={{ fontSize: "12px", color: "var(--text-dim)", marginTop: "4px" }}>
                    {new Date(p.dibuat_pada).toLocaleString("id-ID")} • <span style={{ color: "var(--accent-amber)", fontWeight: "bold" }}>{formatRupiah(Number(p.total_bayar))}</span>
                  </div>
                </div>
                <span className={`admin-badge ${p.status === 'selesai' ? "admin-badge-green" : p.status === 'dibatalkan' ? "bg-red-100 text-red-600 border-red-200" : "admin-badge-blue"}`} style={{ marginLeft: "12px", flexShrink: 0, textTransform: "capitalize" }}>
                  {p.status.replace("_", " ")}
                </span>
              </Link>
            ))}
          </div>
        </div>

        {/* Produk Terlaris */}
        <div className="admin-card">
          <div style={{ paddingBottom: "15px", borderBottom: "2px dashed rgba(255,105,180,0.2)", display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "15px" }}>
            <div style={{ fontSize: "18px", fontFamily: "var(--font-fredoka)", color: "var(--accent-brown)" }}>Paling Laris ✨</div>
            <Link href="/admin/produk" className="admin-btn admin-btn-secondary" style={{ padding: "6px 14px", fontSize: "12px", background: "#FFF0F5", color: "var(--accent-brown)" }}>Kelola Produk</Link>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
            {produkTerlaris.length === 0 ? (
              <div style={{ padding: "32px", textAlign: "center", color: "var(--text-dim)" }}>Belum ada data penjualan.</div>
            ) : produkTerlaris.map((p: any, index: number) => (
              <div key={p.id_produk} style={{ padding: "12px 16px", borderRadius: "15px", background: "#FFF", border: "1px solid rgba(255,105,180,0.1)", display: "flex", justifyContent: "space-between", alignItems: "center", boxShadow: "0 4px 10px rgba(255,182,193,0.05)" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "12px", minWidth: 0, flex: 1 }}>
                  <div style={{ width: "35px", height: "35px", borderRadius: "50%", background: "var(--accent-amber)", color: "#FFF", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: "bold", fontFamily: "var(--font-fredoka)", flexShrink: 0 }}>
                    #{index + 1}
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontSize: "14px", fontWeight: 700, color: "var(--text-main)", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{p.nama_produk}</div>
                    <div style={{ fontSize: "12px", color: "var(--text-dim)", marginTop: "2px", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{p.nama_kategori} • Stok: {p.stok}</div>
                  </div>
                </div>
                <div style={{ fontSize: "14px", fontWeight: 800, color: "var(--accent-brown)", marginLeft: "12px", flexShrink: 0, background: "#FFF0F5", padding: "4px 10px", borderRadius: "20px" }}>
                  {p.total_terjual}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
