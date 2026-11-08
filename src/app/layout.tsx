import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import { GeistSans } from "geist/font/sans";
import { LanguageProvider } from "@/context/LanguageContext";
import { MAINTENANCE_MODE } from "@/config/maintenance";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter", weight: ["400", "500", "600", "700"] });

export const viewport: Viewport = {
  themeColor: "#0A0A0A",
};

export const metadata: Metadata = {
  title: MAINTENANCE_MODE ? "Bilgilendirme | Nalan Sarı" : "Nalan Sarı Pilates & Fitness | Kocaeli Pilates ve Reformer",
  description: MAINTENANCE_MODE ? "Web sitemiz şu anda geçici olarak hizmet dışıdır." : "Nalan Sarı Pilates & Fitness ile Körfez Kocaeli'de Reformer, Fitness ve Personal Training deneyimini keşfedin. Size uygun programı seçin ve ilk dersinizi planlayın.",
  robots: MAINTENANCE_MODE ? {
    index: false,
    follow: false,
    nocache: true,
    googleBot: {
      index: false,
      follow: false,
      noimageindex: true,
      'max-video-preview': -1,
      'max-image-preview': 'none',
      'max-snippet': -1,
    },
  } : {
    index: true,
    follow: true,
  },
  verification: {
    google: 'JvrjU5-sQIkESMp9PuwpvYUoq58LiTnI3PhM6lrSkDw',
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
