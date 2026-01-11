import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'iOS Kurulum Rehberi',
  description: 'iPhone ve iPad için Passgage adım adım kurulum kılavuzu. NFC ayarları, izin verme, QR kod okutma ve sorun giderme. iPhone 7 ve üstü modeller için detaylı rehber.',
  keywords: [
    'passgage ios',
    'iphone kurulum',
    'ipad kurulum',
    'ios nfc ayarları',
    'apple passgage',
    'iphone nfc kurulum',
    'ios app kurulum',
    'app store passgage',
    'iphone şifresiz giriş',
  ],
  openGraph: {
    title: 'Passgage iOS Kurulum Rehberi | iPhone & iPad',
    description: 'iPhone ve iPad için adım adım Passgage kurulum kılavuzu. NFC, izinler ve QR kod okutma detaylı anlatım.',
    type: 'article',
    locale: 'tr_TR',
    url: 'https://kilavuz.passgage.com/ios',
    siteName: 'Passgage Kurulum Kılavuzu',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Passgage iOS Kurulum Rehberi',
    description: 'iPhone ve iPad için detaylı kurulum kılavuzu',
  },
  alternates: {
    canonical: 'https://kilavuz.passgage.com/ios',
  },
};

export default function IOSLayout({ children }: { children: React.ReactNode }) {
  return children;
}
