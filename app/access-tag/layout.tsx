import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Access Tag Kurulum Rehberi',
  description: 'Passgage Access Tag fiziksel kurulum kılavuzu. Kutu içeriği, montaj yöntemleri, lokasyon planlama ve bakım. QR kod tabanlı şifresiz giriş sistemi.',
  keywords: [
    'passgage access tag',
    'access tag kurulum',
    'fiziksel tag',
    'qr kod tag',
    'tag montaj',
    'access tag bakım',
    'tag yerleştirme',
    'şifresiz giriş tag',
    'passgage donanım',
  ],
  openGraph: {
    title: 'Passgage Access Tag Kurulum Rehberi',
    description: 'Access Tag fiziksel kurulum, montaj yöntemleri ve bakım kılavuzu.',
    type: 'article',
    locale: 'tr_TR',
    url: 'https://kilavuz.passgage.com/access-tag',
    siteName: 'Passgage Kurulum Kılavuzu',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Passgage Access Tag Kurulum Rehberi',
    description: 'Fiziksel tag kurulum ve montaj kılavuzu',
  },
  alternates: {
    canonical: 'https://kilavuz.passgage.com/access-tag',
  },
};

export default function AccessTagLayout({ children }: { children: React.ReactNode }) {
  return children;
}
