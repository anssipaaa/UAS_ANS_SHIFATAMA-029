import { query } from "@/lib/db";
import Link from "next/link";

export default async function ArtikelSection() {
  let articles: any[] = [];
  try {
    articles = await query<any>(
      "SELECT id_artikel, judul, slug, gambar_url, dibuat_pada FROM artikel WHERE status = 'publish' ORDER BY dibuat_pada DESC LIMIT 3"
    );
  } catch {
    articles = [];
  }

  if (articles.length === 0) {
    return (
      <section id="artikel">
        <h2 className="section-title">
          Artikel <span className="text-gradient">Terbaru</span>
        </h2>
        <p className="section-subtitle">
          Tips, resep, dan berita terbaru seputar dunia bakery
        </p>
        <div style={{ textAlign: "center", color: "var(--text-dim)", padding: "2rem 0" }}>
          Belum ada artikel yang dipublikasikan.
        </div>
      </section>
    );
  }

  return (
    <section id="artikel">
      <h2 className="section-title">
        Cerita & <span className="text-gradient-cute">Resep Lucu</span>
      </h2>
      <p className="section-subtitle">
        Intip rahasia dapur kami dan cerita manis lainnya 📖
      </p>
      <div className="artikel-cute-grid">
        {articles.map((a: any) => (
          <Link href={`/artikel/${a.slug}`} className="artikel-cute-card" key={a.id_artikel}>
            <div className="artikel-cute-card__img">
              {a.gambar_url ? (
                <img src={a.gambar_url} alt={a.judul} />
              ) : (
                <div style={{ fontSize: "3rem" }}>📰</div>
              )}
            </div>
            <div className="artikel-cute-card__body">
              <span className="artikel-cute-card__date">
                {new Date(a.dibuat_pada).toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric" })}
              </span>
              <h3>{a.judul}</h3>
              <p className="read-more">Baca Selengkapnya ➔</p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
