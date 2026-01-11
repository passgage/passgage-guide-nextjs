import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Android Kurulum Rehberi',
  description: 'Samsung, Xiaomi, Huawei ve tüm Android telefonlar için Passgage adım adım kurulum kılavuzu. NFC, pil optimizasyonu, izinler ve sorun giderme. Android 8.0+ için detaylı rehber.',
  keywords: [
    'passgage android',
    'android kurulum',
    'samsung passgage',
    'xiaomi passgage',
    'huawei passgage',
    'android nfc ayarları',
    'google play passgage',
    'android app kurulum',
    'android pil optimizasyonu',
    'miui passgage',
    'one ui passgage',
  ],
  openGraph: {
    title: 'Passgage Android Kurulum Rehberi | Tüm Android Telefonlar',
    description: 'Samsung, Xiaomi, Huawei ve tüm Android telefonlar için adım adım Passgage kurulum kılavuzu.',
    type: 'article',
    locale: 'tr_TR',
    url: 'https://kilavuz.passgage.com/android',
    siteName: 'Passgage Kurulum Kılavuzu',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Passgage Android Kurulum Rehberi',
    description: 'Tüm Android telefonlar için detaylı kurulum kılavuzu',
  },
  alternates: {
    canonical: 'https://kilavuz.passgage.com/android',
  },
};

export default function AndroidLayout({ children }: { children: React.ReactNode }) {
  return children;
}
