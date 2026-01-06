import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Passgage Kurulum Kılavuzu",
  description: "iOS, Android ve Access Tag için detaylı kurulum kılavuzu",
  keywords: ["passgage", "kurulum", "kılavuz", "iOS", "Android", "access tag", "nfc"],
  authors: [{ name: "Passgage" }],
  openGraph: {
    title: "Passgage Kurulum Kılavuzu",
    description: "iOS, Android ve Access Tag için detaylı kurulum kılavuzu",
    type: "website",
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
      <body className={inter.className}>{children}</body>
    </html>
  );
}
