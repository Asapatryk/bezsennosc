import type { Metadata } from "next";
import { League_Spartan } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll";
import CustomCursor from "@/components/CustomCursor";

const leagueSpartan = League_Spartan({
  variable: "--font-league-spartan",
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "Studio Bezsenność — Kreatywne Studio Cyfrowe",
  description:
    "Tworzymy cyfrowe doświadczenia które hipnotyzują, konwertują i zostają w głowie. Strony internetowe, marketing Meta, automatyzacja AI.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pl" className={`${leagueSpartan.variable} antialiased`}>
      <body
        className="min-h-screen font-sans"
        style={{ background: "#050505", color: "#ffffff" }}
      >
        <SmoothScroll>
          <CustomCursor />
          {children}
        </SmoothScroll>
      </body>
    </html>
  );
}
