import type { Metadata } from "next";
import { DM_Sans, Montserrat } from "next/font/google";
import { LanguageProvider } from "@/context/LanguageContext";
import "./globals.css";

const dmSans = DM_Sans({ subsets: ["latin"], variable: "--font-inter", weight: ["400", "500"] });
const montserrat = Montserrat({ subsets: ["latin"], variable: "--font-display", weight: ["400", "500", "600", "700"] });

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
      <body className={`${dmSans.variable} ${montserrat.variable}`}>
        <LanguageProvider>
          {children}
        </LanguageProvider>
      </body>
    </html>
  );
}
