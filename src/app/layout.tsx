import type { Metadata } from "next";
import { Inter, Plus_Jakarta_Sans } from "next/font/google";
import { LanguageProvider } from "@/context/LanguageContext";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter", weight: ["400", "500", "600"] });
const plusJakarta = Plus_Jakarta_Sans({ subsets: ["latin"], variable: "--font-display", weight: ["400", "500", "600", "700"] });

export const metadata: Metadata = {
  title: "Nalan Sarı Pilates & Fitness | Pilates, Fitness ve Personal Training",
  description: "Nalan Sarı Pilates & Fitness ile Pilates, Fitness, Reformer ve Personal Training deneyimini keşfedin. Size uygun programı seçin ve ilk dersinizi planlayın.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="tr">
      <body className={`${inter.variable} ${plusJakarta.variable}`}>
        <LanguageProvider>
          {children}
        </LanguageProvider>
      </body>
    </html>
  );
}
