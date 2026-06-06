import { query } from "@/lib/db";

export default async function ContactSection() {
  let settings: Record<string, string> = {};
  try {
    const rows = await query<any>("SELECT kunci, nilai FROM pengaturan");
    rows.forEach((r: any) => { settings[r.kunci] = r.nilai; });
  } catch {
    settings = {};
  }

  return (
    <section id="kontak" className="contact-section">
      <h2 className="section-title">
        Sapa <span className="text-gradient-cute">Kami!</span>
      </h2>
      <p className="section-subtitle">
        Punya pertanyaan atau pesanan khusus? Kirimkan surat cinta buat kami 💌
      </p>

      <div className="cute-contact-container">
        {/* Kiri: Info */}
        <div className="cute-contact-info">
          <div className="cute-info-item">
            <div className="cute-info-icon">📍</div>
            <div>
              <div className="cute-info-label">Alamat Toko</div>
              <div className="cute-info-value">{settings.alamat_toko || "Jl. Roti Manis No. 1, Cirebon"}</div>
            </div>
          </div>
          <div className="cute-info-item">
            <div className="cute-info-icon">📞</div>
            <div>
              <div className="cute-info-label">Telepon</div>
              <div className="cute-info-value">{settings.telepon_toko || "0812-3456-7890"}</div>
            </div>
          </div>
          <div className="cute-info-item">
            <div className="cute-info-icon">✉️</div>
            <div>
              <div className="cute-info-label">Email</div>
              <div className="cute-info-value">{settings.email_toko || "hello@bakerykita.id"}</div>
            </div>
          </div>
          <div className="cute-info-item">
            <div className="cute-info-icon">🕐</div>
            <div>
              <div className="cute-info-label">Jam Operasional</div>
              <div className="cute-info-value">{settings.jam_buka || "07:00 - 21:00 WIB"}</div>
            </div>
          </div>
        </div>

        {/* Kanan: Form */}
        <div className="cute-contact-form">
          <h3 style={{ fontFamily: "var(--font-fredoka)", fontSize: "1.5rem", marginBottom: "1.5rem" }}>Kirim Pesan Bintang Lima ⭐</h3>
          <div className="cute-form-group">
            <input type="text" className="cute-input" placeholder="Nama Panggilanmu..." />
          </div>
          <div className="cute-form-group">
            <input type="email" className="cute-input" placeholder="Alamat Emailmu..." />
          </div>
          <div className="cute-form-group">
            <textarea rows={4} className="cute-input" placeholder="Ceritakan pesanan manismu di sini..."></textarea>
          </div>
          <button className="btn-primary" style={{ width: "100%", justifyContent: "center" }}>
            Kirim Sekarang 🚀
          </button>
        </div>
      </div>
    </section>
  );
}
