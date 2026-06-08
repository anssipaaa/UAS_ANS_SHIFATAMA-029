import { query } from "@/lib/db";
import Link from "next/link";

const ICONS: Record<string, string> = {
  "roti-tawar": "🍞",
  "kue-kering": "🍪",
  "kue-basah": "🧁",
  "croissant": "🥐",
  "birthday-cake": "🎂",
  "wedding-cake": "💒",
  "minuman": "☕",
};

export default async function KategoriSection() {
  let categories: any[] = [];
  try {
    categories = await query<any>(
      "SELECT id_kategori, nama_kategori, slug, deskripsi FROM kategori WHERE aktif = 1 ORDER BY urutan ASC"
    );
  } catch {
    categories = [];
  }

  return (
    <section id="kategori">
      <h2 className="section-title">
        Menu <span className="text-gradient-cute">Lucu Kami</span>
      </h2>
      <p className="section-subtitle">
        Jelajahi berbagai pilihan kategori yang dibuat dengan 100% cinta 💖
      </p>
      <div className="kategori-cute-grid">
        {categories.map((cat: any, i: number) => (
          <Link href={`/produk?kategori=${cat.slug}`} className="cute-card" key={cat.id_kategori} style={{ animationDelay: `${i * 0.1}s` }}>
            <div className="cute-card-icon">{ICONS[cat.slug] || "🍰"}</div>
            <h3>{cat.nama_kategori}</h3>
            <p>{cat.deskripsi || "Produk berkualitas pilihan terbaik"}</p>
          </Link>
        ))}
      </div>
    </section>
  );
}
