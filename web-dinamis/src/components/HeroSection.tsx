"use client";

import { useEffect, useRef } from "react";

export default function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) el.classList.add("hero--visible");
      },
      { threshold: 0.15 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="hero" className="hero-split" ref={sectionRef}>
      {/* Kiri: Teks */}
      <div className="hero-text-content">
        <span className="hero-tagline">🍰 Freshly Baked with Love</span>
        <h1 className="hero-title-cute">
          Cicipi Manisnya
          <br />
          <span className="text-gradient-cute">Tiap Gigitan!</span>
        </h1>
        <p className="hero-description-cute">
          Dari roti super empuk yang bikin kangen sampai cake cantik buat hari spesialmu. 
          Cipa's Bakery selalu ada buat manjain lidah kamu setiap hari! 🎀
        </p>
        <div style={{ marginTop: "2rem" }}>
          <a href="/produk" className="btn-primary" style={{ fontSize: "1.2rem", padding: "1.2rem 3rem" }}>
            Pesan Sekarang ✨
          </a>
        </div>
      </div>

      {/* Kanan: Blob & Gambar (pakai div kosongan bentuk blob dengan background image) */}
      <div className="hero-visual">
        <div className="cute-blob">
          {/* Placeholder image for bakery */}
          <img src="https://images.unsplash.com/photo-1517433670267-08bbd4be890f?q=80&w=1000&auto=format&fit=crop" alt="Cute Cupcakes" className="blob-img" />
        </div>
        
        {/* Hiasan melayang */}
        <div className="floating-item item-1">🥐</div>
        <div className="floating-item item-2">🍩</div>
        <div className="floating-item item-3">✨</div>
      </div>
    </section>
  );
}
