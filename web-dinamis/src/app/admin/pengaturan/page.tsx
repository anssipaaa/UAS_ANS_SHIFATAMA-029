import { query } from "@/lib/db";
import { updatePengaturan } from "@/app/actions/pengaturan";

export const dynamic = "force-dynamic";

export default async function AdminPengaturan() {
  const settingsRows = await query<any>("SELECT kunci, nilai FROM pengaturan");
  const settings: Record<string, string> = {};
  settingsRows.forEach((r: any) => { settings[r.kunci] = r.nilai; });

  return (
    <div className="admin-page-header" style={{ flexDirection: "column" }}>
      <div style={{ width: "100%", display: "flex", justifyContent: "space-between", marginBottom: "24px" }}>
        <div>
          <h2 className="admin-page-title">Pengaturan Toko</h2>
          <p className="admin-page-subtitle">Kelola informasi kontak dan pengaturan pengiriman toko Anda.</p>
        </div>
      </div>

      <form action={updatePengaturan} className="admin-card" style={{ maxWidth: "800px", padding: "32px" }}>
        <h3 style={{ fontSize: "16px", marginBottom: "24px", paddingBottom: "12px", borderBottom: "1px solid #e2e8f0" }}>Informasi Umum</h3>
        
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px" }}>
          <div className="admin-form-group">
            <label className="admin-form-label">Nama Toko</label>
            <input type="text" name="nama_toko" defaultValue={settings.nama_toko} className="admin-form-input" />
          </div>
          <div className="admin-form-group">
            <label className="admin-form-label">Tagline</label>
            <input type="text" name="tagline" defaultValue={settings.tagline} className="admin-form-input" />
          </div>
          <div className="admin-form-group" style={{ gridColumn: "span 2" }}>
            <label className="admin-form-label">Alamat Toko</label>
            <textarea name="alamat_toko" defaultValue={settings.alamat_toko} className="admin-form-textarea" style={{ minHeight: "80px" }}></textarea>
          </div>
          <div className="admin-form-group">
            <label className="admin-form-label">Telepon Toko</label>
            <input type="text" name="telepon_toko" defaultValue={settings.telepon_toko} className="admin-form-input" />
          </div>
          <div className="admin-form-group">
            <label className="admin-form-label">Email Toko</label>
            <input type="email" name="email_toko" defaultValue={settings.email_toko} className="admin-form-input" />
          </div>
          <div className="admin-form-group" style={{ gridColumn: "span 2" }}>
            <label className="admin-form-label">Jam Buka</label>
            <input type="text" name="jam_buka" defaultValue={settings.jam_buka} className="admin-form-input" placeholder="Contoh: Senin - Minggu, 07:00 - 21:00" />
          </div>
        </div>

        <h3 style={{ fontSize: "16px", margin: "32px 0 24px", paddingBottom: "12px", borderBottom: "1px solid #e2e8f0" }}>Pengaturan Pengiriman (Delivery)</h3>
        
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px" }}>
          <div className="admin-form-group">
            <label className="admin-form-label">Min. Order Delivery (Rp)</label>
            <input type="number" name="min_order_delivery" defaultValue={settings.min_order_delivery} className="admin-form-input" />
          </div>
          <div className="admin-form-group">
            <label className="admin-form-label">Ongkir per KM (Rp)</label>
            <input type="number" name="ongkir_per_km" defaultValue={settings.ongkir_per_km} className="admin-form-input" />
          </div>
          <div className="admin-form-group">
            <label className="admin-form-label">Maksimal Radius Delivery (KM)</label>
            <input type="number" name="radius_delivery_km" defaultValue={settings.radius_delivery_km} className="admin-form-input" />
          </div>
        </div>

        <div style={{ marginTop: "32px", display: "flex", justifyContent: "flex-end" }}>
          <button type="submit" className="admin-btn admin-btn-primary" style={{ padding: "10px 24px" }}>Simpan Pengaturan</button>
        </div>
      </form>
    </div>
  );
}
