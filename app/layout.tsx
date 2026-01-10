import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { SearchModal, FloatingSearchButton } from "@/components/search";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    default: "Passgage Kurulum Kılavuzu | iOS, Android ve Access Tag",
    template: "%s | Passgage Kurulum Kılavuzu",
  },
  description: "iOS, Android ve Access Tag için adım adım detaylı kurulum rehberi. Sisteminizi dakikalar içinde kurun ve kullanmaya başlayın. Şifresiz güvenli giriş sistemi.",
  keywords: [
    "passgage",
    "kurulum",
    "kılavuz",
    "iOS",
    "Android",
    "access tag",
    "nfc",
    "şifresiz giriş",
    "güvenli giriş",
    "qr kod",
    "kurulum rehberi",
    "adım adım",
    "sorun giderme",
  ],
  authors: [{ name: "Passgage", url: "https://passgage.com" }],
  creator: "Passgage",
  publisher: "Passgage",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    title: "Passgage Kurulum Kılavuzu | iOS, Android ve Access Tag",
    description: "iOS, Android ve Access Tag için adım adım detaylı kurulum rehberi. Sisteminizi dakikalar içinde kurun ve kullanmaya başlayın.",
    type: "website",
    locale: "tr_TR",
    url: "https://kilavuz.passgage.com",
    siteName: "Passgage Kurulum Kılavuzu",
  },
  twitter: {
    card: "summary_large_image",
    title: "Passgage Kurulum Kılavuzu",
    description: "iOS, Android ve Access Tag için adım adım kurulum rehberi",
  },
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION,
  },
  alternates: {
    canonical: "https://kilavuz.passgage.com",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="tr">
      <head>
        {/* Font Awesome */}
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css"
          integrity="sha512-DTOQO9RWCH3ppGqcWaEA1BIZOC6xxalwEsw9c2QQeAIftl+Vegovlnee1c9QX4TctnWMn13TZye+giMm8e2LwA=="
          crossOrigin="anonymous"
          referrerPolicy="no-referrer"
        />

        {/* Google Analytics */}
        <script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-374JCV17P7"
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-374JCV17P7');
            `,
          }}
        />
      </head>
      <body className={inter.className}>
        {children}
        <SearchModal />
        <FloatingSearchButton />
      </body>
    </html>
  );
}
