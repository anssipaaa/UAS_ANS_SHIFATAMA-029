import HeroSection from "@/components/HeroSection";
import KategoriSection from "@/components/KategoriSection";
import ProdukUnggulanSection from "@/components/ProdukUnggulanSection";
import ArtikelSection from "@/components/ArtikelSection";
import ContactSection from "@/components/ContactSection";

export const dynamic = "force-dynamic";

export default function Home() {
  return (
    <div style={{ background: "var(--bg-color)" }}>
      <HeroSection />
      
      {/* Cute Wavy Divider */}
      <div style={{ overflow: "hidden", lineHeight: 0, transform: "translateY(2px)" }}>
        <svg viewBox="0 0 1200 120" preserveAspectRatio="none" style={{ display: "block", width: "100%", height: "80px" }}>
          <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V120H0V95.8C52.16,114.3,109.11,123.6,165.7,121.2,221.31,118.84,275.39,94.94,321.39,56.44Z" fill="rgba(255, 182, 193, 0.2)"></path>
        </svg>
      </div>

      <KategoriSection />
      <ProdukUnggulanSection />
      <ArtikelSection />
      
      {/* Footer Wave */}
      <div style={{ overflow: "hidden", lineHeight: 0, transform: "rotate(180deg) translateY(-2px)" }}>
        <svg viewBox="0 0 1200 120" preserveAspectRatio="none" style={{ display: "block", width: "100%", height: "80px" }}>
          <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V120H0V95.8C52.16,114.3,109.11,123.6,165.7,121.2,221.31,118.84,275.39,94.94,321.39,56.44Z" fill="rgba(255, 105, 180, 0.1)"></path>
        </svg>
      </div>
      <ContactSection />
    </div>
  );
}
