import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { AIBottomBar, AIBottomSheet } from "@/components/search";

const inter = Inter({ subsets: ["latin"] });

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  viewportFit: 'cover', // Required for safe-area-inset support
};

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
    images: [
      {
        url: "/logo.png",
        width: 800,
        height: 600,
        alt: "Passgage Logo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Passgage Kurulum Kılavuzu",
    description: "iOS, Android ve Access Tag için adım adım kurulum rehberi",
    images: ["/logo.png"],
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon16.svg", type: "image/svg+xml", sizes: "16x16" },
      { url: "/favicon32.svg", type: "image/svg+xml", sizes: "32x32" },
      { url: "/favicon64.svg", type: "image/svg+xml", sizes: "64x64" },
    ],
    shortcut: "/favicon.ico",
    apple: [
      { url: "/favicon64.png", sizes: "64x64", type: "image/png" },
      { url: "/favicon32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon16.png", sizes: "16x16", type: "image/png" },
    ],
  },
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION,
  },
  alternates: {
    canonical: "https://kilavuz.passgage.com",
  },
  // AI-specific metadata for agent indexing
  other: {
    'ai:purpose': 'Installation guide for Passgage passwordless authentication system',
    'ai:audience': 'End users, retail workers, warehouse staff, delivery personnel',
    'ai:language': 'Turkish (tr)',
    'ai:topics': 'mobile app installation, NFC setup, QR code scanning, troubleshooting, iOS, Android, Access Tag hardware',
    'ai:platforms': 'iOS (iPhone 7+, iOS 13+), Android (8.0+), Access Tag (NFC/QR)',
    'ai:content-type': 'step-by-step technical documentation',
    'ai:skill-level': 'beginner to intermediate',
    'ai:indexed-for': 'ChatGPT, Claude, Gemini, Perplexity AI',
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

        {/* Organization Schema for SEO */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Organization',
              'name': 'Passgage',
              'url': 'https://passgage.com',
              'logo': 'https://passgage.com/wp-content/uploads/2024/02/passgage-logo.png',
              'description': 'Şifresiz güvenli giriş sistemi. NFC ve QR kod teknolojisi ile çalışan modern personel takip çözümü.',
              'sameAs': [
                'https://www.linkedin.com/company/passgage',
                'https://twitter.com/passgage',
                'https://www.facebook.com/passgage',
                'https://www.instagram.com/passgage'
              ],
              'contactPoint': {
                '@type': 'ContactPoint',
                'email': 'deneyim@passgage.com',
                'contactType': 'customer support',
                'availableLanguage': ['tr', 'en']
              }
            }),
          }}
        />
      </head>
      <body className={inter.className}>
        {children}
        <AIBottomBar variant="landing" />
        <AIBottomSheet />
      </body>
    </html>
  );
}
