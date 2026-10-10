import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import { GeistSans } from "geist/font/sans";
import { LanguageProvider } from "@/context/LanguageContext";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter", weight: ["400", "500", "600", "700"] });

export const viewport: Viewport = {
  themeColor: "#0A0A0A",
};

export const metadata: Metadata = {
  title: "Nalan Sarı Pilates & Fitness | Kocaeli Pilates ve Reformer",
  description: "Nalan Sarı Pilates & Fitness ile Körfez Kocaeli'de Reformer, Fitness ve Personal Training deneyimini keşfedin. Size uygun programı seçin ve ilk dersinizi planlayın.",
  verification: {
    google: 'google4e56950f4c5560ba',
  },
  keywords: ["pilates", "reformer pilates", "kocaeli pilates", "körfez pilates", "fitness", "personal training", "nalan sarı", "hamile pilatesi"],
  authors: [{ name: "Muse Creative House" }],
  metadataBase: new URL('https://nalansari.com'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: "Nalan Sarı Pilates & Fitness | Kocaeli Pilates Stüdyosu",
    description: "Reformer, Fitness ve Klinik Pilates hizmetlerimizle gücünüzü keşfedin. Körfez'in en donanımlı pilates stüdyosu.",
    url: 'https://nalansari.com',
    siteName: 'Nalan Sarı Pilates & Fitness',
    locale: 'tr_TR',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Nalan Sarı Pilates & Fitness",
    description: "Reformer, Fitness ve Klinik Pilates hizmetlerimizle gücünüzü keşfedin.",
  },
  manifest: "/manifest.json",
  icons: {
    icon: [
      { url: '/favicon.ico' },
      { url: '/favicon-32x32.png', type: 'image/png', sizes: '32x32' },
    ],
    apple: [
      { url: '/apple-icon.png' }
    ]
  },
  appleWebApp: {
    capable: true,
    title: "NS Pilates",
    statusBarStyle: "black-translucent",
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="tr" className={`${GeistSans.variable} ${inter.variable}`}>
      <body>
        <LanguageProvider>
          {children}
        </LanguageProvider>
      </body>
    </html>
  );
}
