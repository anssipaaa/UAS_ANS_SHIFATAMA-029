"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { signOut, useSession } from "next-auth/react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { data: session } = useSession();
  
  // Hide global navbar and footer on admin and login pages
  const isHiddenRoute = pathname?.startsWith("/admin") || pathname === "/login";

  useEffect(() => {
    // Jika user pindah ke halaman publik (bukan admin) dan masih punya sesi, langsung hapus sesinya.
    if (!isHiddenRoute && session) {
      signOut({ redirect: false });
    }
  }, [isHiddenRoute, session]);

  return (
    <>
      {!isHiddenRoute && <div className="mesh-bg" />}
      {!isHiddenRoute && <Navbar />}
      <main className={isHiddenRoute ? "w-full min-h-screen" : ""}>{children}</main>
      {!isHiddenRoute && <Footer />}
    </>
  );
}
