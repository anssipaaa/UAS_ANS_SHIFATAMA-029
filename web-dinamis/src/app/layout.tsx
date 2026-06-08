import type { Metadata } from "next";
import { Quicksand, Fredoka } from "next/font/google";
import SiteLayout from "@/components/SiteLayout";
import Providers from "@/components/Providers";
import "./globals.css";

const quicksand = Quicksand({ subsets: ["latin"], variable: "--font-quicksand" });
const fredoka = Fredoka({ subsets: ["latin"], variable: "--font-fredoka", weight: ["400", "500", "600", "700"] });

export const metadata: Metadata = {
  title: "Cipa's Bakery | Freshly Baked with Love",
  description: "Toko roti dan kue segar terbaik di Cirebon. Roti tawar, kue kering, croissant, birthday cake, wedding cake, dan minuman.",
  keywords: ["bakery", "roti", "kue", "cake", "cirebon", "toko roti"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" className="scroll-smooth" suppressHydrationWarning>
      <body className={`${quicksand.variable} ${fredoka.variable}`} suppressHydrationWarning>
        <Providers>
          <SiteLayout>{children}</SiteLayout>
        </Providers>
      </body>
    </html>
  );
}
