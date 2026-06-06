import { query } from "@/lib/db";
import Link from "next/link";
import { notFound } from "next/navigation";

export const dynamic = "force-dynamic";

function formatRupiah(num: number) {
  return new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", minimumFractionDigits: 0 }).format(num);
}

export default async function DetailPesananPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  
  const pesananRows = await query<any>(
    `SELECT p.*, u.nama_lengkap, u.email, u.no_telepon
     FROM pesanan p
     JOIN pelanggan u ON p.id_pelanggan = u.id_pelanggan
     WHERE p.id_pesanan = ?`, 
    [id]
  );
  if (pesananRows.length === 0) return notFound();
  const pesanan = pesananRows[0];

  const items = await query<any>(
    `SELECT pi.*, pr.gambar_utama
     FROM pesanan_item pi
     JOIN produk pr ON pi.id_produk = pr.id_produk
     WHERE pi.id_pesanan = ?`,
    [id]
  );

  const pembayaran = await query<any>("SELECT * FROM pembayaran WHERE id_pesanan = ?", [id]);
  const bayar = pembayaran[0];

  return (
    <div>
      <div className="admin-page-header">
        <div>
          <h2 className="admin-page-title">Detail Pesanan {pesanan.nomor_pesanan}</h2>
          <Link href="/admin/pesanan" style={{ color: "#2563eb", textDecoration: "none", fontSize: "14px", marginTop: "4px", display: "inline-block" }}>
            ← Kembali ke daftar pesanan
          </Link>
        </div>
        <div style={{ textTransform: "capitalize", padding: "6px 16px", borderRadius: "100px", background: "#f1f5f9", fontWeight: 600 }}>
          Status: {pesanan.status.replace("_", " ")}
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: "24px" }}>
        
        {/* Left Col - Items & Info */}
        <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
          <div className="admin-card" style={{ padding: "24px" }}>
            <h3 style={{ fontSize: "16px", marginBottom: "16px", borderBottom: "1px solid #f1f5f9", paddingBottom: "12px" }}>Item Pesanan</h3>
            <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
              {items.map((item: any) => (
                <div key={item.id_item} style={{ display: "flex", gap: "16px", alignItems: "center" }}>
                  <div style={{ width: "60px", height: "60px", borderRadius: "8px", background: "#f8fafc", overflow: "hidden", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "24px" }}>
                    {item.gambar_utama ? <img src={item.gambar_utama} alt={item.nama_produk} style={{ width: "100%", height: "100%", objectFit: "cover" }} /> : "🍞"}
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontWeight: 600 }}>{item.nama_produk}</div>
                    <div style={{ fontSize: "13px", color: "#64748b" }}>{formatRupiah(Number(item.harga_satuan))} x {item.jumlah}</div>
                    {item.catatan && <div style={{ fontSize: "12px", color: "#EC4899", marginTop: "4px" }}>Catatan: {item.catatan}</div>}
                  </div>
                  <div style={{ fontWeight: 700 }}>{formatRupiah(Number(item.subtotal))}</div>
                </div>
              ))}
            </div>
            
            <div style={{ marginTop: "24px", paddingTop: "16px", borderTop: "1px solid #f1f5f9", display: "flex", flexDirection: "column", gap: "8px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", color: "#64748b" }}>
                <span>Subtotal</span>
                <span>{formatRupiah(Number(pesanan.subtotal))}</span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", color: "#64748b" }}>
                <span>Diskon Kupon</span>
                <span style={{ color: "#ef4444" }}>- {formatRupiah(Number(pesanan.diskon_kupon))}</span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", color: "#64748b" }}>
                <span>Biaya Kirim</span>
                <span>{formatRupiah(Number(pesanan.biaya_kirim))}</span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", fontWeight: 800, fontSize: "18px", marginTop: "8px", paddingTop: "8px", borderTop: "1px dashed #e2e8f0" }}>
                <span>Total Bayar</span>
                <span style={{ color: "#059669" }}>{formatRupiah(Number(pesanan.total_bayar))}</span>
              </div>
            </div>
          </div>

          <div className="admin-card" style={{ padding: "24px" }}>
            <h3 style={{ fontSize: "16px", marginBottom: "16px", borderBottom: "1px solid #f1f5f9", paddingBottom: "12px" }}>Informasi Pengiriman / Pickup</h3>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px", fontSize: "14px" }}>
              <div>
                <div style={{ color: "#64748b", marginBottom: "4px" }}>Metode</div>
                <div style={{ fontWeight: 600, textTransform: "capitalize" }}>{pesanan.metode_kirim}</div>
              </div>
              <div>
                <div style={{ color: "#64748b", marginBottom: "4px" }}>Penerima</div>
                <div style={{ fontWeight: 600 }}>{pesanan.nama_penerima || pesanan.nama_lengkap}</div>
              </div>
              <div>
                <div style={{ color: "#64748b", marginBottom: "4px" }}>Telepon</div>
                <div style={{ fontWeight: 600 }}>{pesanan.no_telepon_kirim || pesanan.no_telepon}</div>
              </div>
              {pesanan.metode_kirim === 'delivery' ? (
                <div style={{ gridColumn: "span 2" }}>
                  <div style={{ color: "#64748b", marginBottom: "4px" }}>Alamat Kirim</div>
                  <div style={{ fontWeight: 600 }}>{pesanan.alamat_kirim}</div>
                </div>
              ) : (
                <div style={{ gridColumn: "span 2" }}>
                  <div style={{ color: "#64748b", marginBottom: "4px" }}>Tanggal Pickup</div>
                  <div style={{ fontWeight: 600 }}>{pesanan.tanggal_pickup ? new Date(pesanan.tanggal_pickup).toLocaleString("id-ID") : "-"}</div>
                </div>
              )}
              {pesanan.catatan && (
                <div style={{ gridColumn: "span 2", background: "#FCE7F3", padding: "12px", borderRadius: "8px", color: "#DB2777" }}>
                  <strong>Catatan Pesanan:</strong> {pesanan.catatan}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Right Col - Customer & Payment */}
        <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
          <div className="admin-card" style={{ padding: "24px" }}>
            <h3 style={{ fontSize: "16px", marginBottom: "16px", borderBottom: "1px solid #f1f5f9", paddingBottom: "12px" }}>Pelanggan</h3>
            <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
              <div style={{ width: "40px", height: "40px", borderRadius: "50%", background: "#e2e8f0", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 600 }}>
                {pesanan.nama_lengkap.charAt(0)}
              </div>
              <div>
                <div style={{ fontWeight: 600 }}>{pesanan.nama_lengkap}</div>
                <div style={{ fontSize: "13px", color: "#64748b" }}>{pesanan.email}</div>
              </div>
            </div>
          </div>

          <div className="admin-card" style={{ padding: "24px" }}>
            <h3 style={{ fontSize: "16px", marginBottom: "16px", borderBottom: "1px solid #f1f5f9", paddingBottom: "12px" }}>Pembayaran</h3>
            {bayar ? (
              <div style={{ display: "flex", flexDirection: "column", gap: "12px", fontSize: "14px" }}>
                <div>
                  <div style={{ color: "#64748b" }}>Metode</div>
                  <div style={{ fontWeight: 600, textTransform: "uppercase" }}>{bayar.metode.replace("_", " ")}</div>
                </div>
                <div>
                  <div style={{ color: "#64748b" }}>Status Pembayaran</div>
                  <div style={{ fontWeight: 600, color: bayar.status === 'sukses' ? "#059669" : bayar.status === 'menunggu' ? "#EC4899" : "#ef4444" }}>
                    {bayar.status.toUpperCase()}
                  </div>
                </div>
                {bayar.kode_transaksi && (
                  <div>
                    <div style={{ color: "#64748b" }}>Kode Transaksi</div>
                    <div style={{ fontWeight: 600, fontFamily: "monospace" }}>{bayar.kode_transaksi}</div>
                  </div>
                )}
                {bayar.dibayar_pada && (
                  <div>
                    <div style={{ color: "#64748b" }}>Waktu Bayar</div>
                    <div style={{ fontWeight: 600 }}>{new Date(bayar.dibayar_pada).toLocaleString("id-ID")}</div>
                  </div>
                )}
                {bayar.bukti_transfer && (
                  <div style={{ marginTop: "8px" }}>
                    <a href={bayar.bukti_transfer} target="_blank" className="admin-btn admin-btn-secondary" style={{ width: "100%", justifyContent: "center" }}>Lihat Bukti Transfer</a>
                  </div>
                )}
              </div>
            ) : (
              <div style={{ color: "#64748b", fontSize: "14px", textAlign: "center", padding: "12px 0" }}>Belum ada data pembayaran.</div>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}
