import { FAQEntry } from './types';

/**
 * Comprehensive FAQ database for Passgage Guide
 * Extracted from ios.html, android.html, and access-tag.html
 * Total: 22 entries (5 iOS + 12 Android + 5 Access Tag)
 */

export const faqData: FAQEntry[] = [
  // ==================== iOS FAQs ====================
  {
    id: 'ios-safari-location',
    platform: 'ios',
    category: 'permissions',
    question: 'Safari Konum İzni Sorunu',
    answer: `Safari'de "Bu web sitesi konumunuzu kullanmak istiyor" mesajı çıktığında "İzin Ver" seçeneğini işaretleyin.

**Ayarları Kontrol Edin:**
1. Ayarlar → Safari → Konum yolunu izleyin
2. "Sor" veya "İzin Ver" seçeneğinin aktif olduğundan emin olun`,
    keywords: ['safari', 'konum', 'izin', 'location', 'permission', 'web'],
    relatedSteps: [2],
    pageUrl: '/ios#step6',
    metadata: {
      importance: 'high',
      lastUpdated: '2024-01-06',
    },
  },

  {
    id: 'ios-gps-refresh',
    platform: 'ios',
    category: 'gps',
    question: 'GPS Yenileme (Uçak Modu)',
    answer: `GPS sinyalini yenilemek için uçak modu yöntemini kullanın:

**Adım 1: Uçak Modunu Açın**
- Kontrol Merkezi'ni açın (ekranın sağ üst köşesinden aşağı kaydırın)
- Uçak modu simgesine dokunun

**Adım 2: 10 Saniye Bekleyin**
- Bu süre GPS modülünün sıfırlanması için gereklidir

**Adım 3: Uçak Modunu Kapatın**
- Tekrar uçak modu simgesine dokunarak kapatın
- GPS sinyali yenilenecektir`,
    keywords: ['gps', 'konum', 'uçak modu', 'airplane mode', 'yenileme', 'refresh'],
    relatedSteps: [1],
    pageUrl: '/ios#step6',
    metadata: {
      importance: 'high',
      lastUpdated: '2024-01-06',
    },
  },

  {
    id: 'ios-icloud-sync',
    platform: 'ios',
    category: 'troubleshooting',
    question: 'iCloud Senkronizasyon Sorunları',
    answer: `Bazı durumlarda iCloud senkronizasyonu uygulama verilerini etkileyebilir.

**iCloud'u Yenileyin:**
1. Ayarlar → [Adınız] → iCloud yolunu izleyin
2. "iCloud Drive" kapalı ise açın
3. Açık ise 30 saniye kapatıp tekrar açın`,
    keywords: ['icloud', 'senkronizasyon', 'sync', 'cloud', 'veri'],
    relatedSteps: [3],
    pageUrl: '/ios#step6',
    metadata: {
      importance: 'medium',
      lastUpdated: '2024-01-06',
    },
  },

  {
    id: 'ios-find-my-nfc',
    platform: 'ios',
    category: 'nfc',
    question: '"Bul" (Find My) NFC Çakışması',
    answer: `Bazı durumlarda "Bul" (Find My) özelliği NFC okumalarını etkileyebilir.

**NFC Okumayı Yeniden Deneyin:**
1. Telefonu NFC okuyucuya 2-3 saniye daha uzun süre tutun
2. iPhone'un arka üst kısmını okuyucuya tam olarak yerleştirdiğinizden emin olun`,
    keywords: ['nfc', 'find my', 'bul', 'okuma', 'reading', 'çakışma'],
    relatedSteps: [5],
    pageUrl: '/ios#step6',
    metadata: {
      importance: 'medium',
      lastUpdated: '2024-01-06',
    },
  },

  {
    id: 'ios-background-refresh',
    platform: 'ios',
    category: 'troubleshooting',
    question: 'Arka Plan Uygulama Yenileme',
    answer: `Uygulamanın arka planda çalışması için bu ayarın açık olması önerilir.

**Ayarı Aktifleştirin:**
1. Ayarlar → Genel → Arka Plan Uygulama Yenileme yolunu izleyin
2. Passgage için açık olduğundan emin olun`,
    keywords: ['arka plan', 'background', 'refresh', 'yenileme', 'uygulama'],
    relatedSteps: [5],
    pageUrl: '/ios#step6',
    metadata: {
      importance: 'medium',
      lastUpdated: '2024-01-06',
    },
  },

  // ==================== Android Manufacturer-Specific NFC Setup ====================
  {
    id: 'android-samsung-nfc',
    platform: 'android',
    category: 'nfc',
    question: 'Samsung (One UI) NFC Kurulumu',
    answer: `Samsung cihazlarda NFC'yi açmak için:

**Adım 1:** Ayarlar → Bağlantılar (Connections)

**Adım 2:** NFC and contactless payments → NFC
- NFC anahtarını AÇIK (ON) konuma getirin

**Adım 3:** Hızlı Ayarlar panelini açın
- NFC simgesinin mavi olduğundan emin olun`,
    keywords: ['samsung', 'one ui', 'nfc', 'kurulum', 'setup', 'bağlantılar'],
    relatedSteps: [5],
    pageUrl: '/android#step5',
    metadata: {
      importance: 'high',
      lastUpdated: '2024-01-06',
    },
  },

  {
    id: 'android-huawei-nfc',
    platform: 'android',
    category: 'nfc',
    question: 'Huawei (EMUI / HarmonyOS) NFC Kurulumu',
    answer: `Huawei cihazlarda NFC'yi açmak için:

**Adım 1:** Ayarlar → Cihaz bağlantısı (Device connectivity)

**Adım 2:** NFC
- NFC anahtarını AÇIK (ON) konuma getirin

**Adım 3:** Huawei Wallet (Opsiyonel)
- Eğer Huawei Wallet kullanıyorsanız, varsayılan ödeme uygulamasını ayarlayabilirsiniz`,
    keywords: ['huawei', 'emui', 'harmonyos', 'nfc', 'kurulum', 'wallet'],
    relatedSteps: [5],
    pageUrl: '/android#step5',
    metadata: {
      importance: 'high',
      lastUpdated: '2024-01-06',
    },
  },

  {
    id: 'android-xiaomi-nfc',
    platform: 'android',
    category: 'nfc',
    question: 'Xiaomi (MIUI) NFC Kurulumu',
    answer: `Xiaomi cihazlarda NFC'yi açmak için iki yöntem vardır:

**Yöntem 1:**
- Ayarlar → Connection & sharing → NFC
- NFC anahtarını AÇIK (ON) konuma getirin

**Yöntem 2:**
- Ayarlar → More connectivity options → NFC
- Bazı MIUI versiyonlarında bu yol kullanılabilir

**Adım 3:** Android Beam (Opsiyonel)
- NFC açıkken "Android Beam" özelliğini aktif edebilirsiniz`,
    keywords: ['xiaomi', 'miui', 'nfc', 'kurulum', 'setup', 'connection'],
    relatedSteps: [5],
    pageUrl: '/android#step5',
    metadata: {
      importance: 'high',
      lastUpdated: '2024-01-06',
    },
  },

  {
    id: 'android-pixel-nfc',
    platform: 'android',
    category: 'nfc',
    question: 'Stock Android (Google Pixel) NFC Kurulumu',
    answer: `Google Pixel ve diğer stock Android cihazlarda:

**Adım 1:** Ayarlar → Connected devices → Connection preferences

**Adım 2:** NFC
- NFC anahtarını AÇIK (ON) konuma getirin

**Adım 3:** Hızlı Ayarlar panelinde NFC simgesinin aktif olduğundan emin olun`,
    keywords: ['pixel', 'google', 'stock android', 'nfc', 'kurulum', 'setup'],
    relatedSteps: [5],
    pageUrl: '/android#step5',
    metadata: {
      importance: 'high',
      lastUpdated: '2024-01-06',
    },
  },

  {
    id: 'android-other-nfc',
    platform: 'android',
    category: 'nfc',
    question: 'Diğer Üreticiler (Oppo, Vivo, Realme, OnePlus) NFC Kurulumu',
    answer: `Diğer Android üreticilerde NFC'yi açmak için:

**Yöntem 1:** Arama Kullanın
- Ayarlar uygulamasında üst kısımdaki arama kutusuna "NFC" yazın
- Sonuçlara tıklayın

**Yöntem 2:** Manuel Yol
- Ayarlar → Bağlantılar / Wireless & Networks → NFC

**Yöntem 3:** Hızlı Ayarlar
- Ekranın üst kısmından aşağı kaydırarak Hızlı Ayarlar panelini açın
- NFC simgesine basın`,
    keywords: ['oppo', 'vivo', 'realme', 'oneplus', 'nfc', 'kurulum', 'setup'],
    relatedSteps: [5],
    pageUrl: '/android#step5',
    metadata: {
      importance: 'medium',
      lastUpdated: '2024-01-06',
    },
  },

  // ==================== Android Troubleshooting ====================
  {
    id: 'android-play-services',
    platform: 'android',
    category: 'troubleshooting',
    question: 'Google Play Services Güncel Değil',
    answer: `Uygulama Google Play Services gerektirir. Güncel değilse sorun yaşayabilirsiniz.

**Güncelleme Adımları:**
1. Google Play Store'u açın
2. Arama kutusuna "Google Play Services" yazın
3. Eğer "Güncelle" butonu görünüyorsa tıklayarak güncelleyin`,
    keywords: ['google play services', 'güncelleme', 'update', 'play store'],
    relatedSteps: [1],
    pageUrl: '/android#step6',
    metadata: {
      importance: 'high',
      lastUpdated: '2024-01-06',
    },
  },

  {
    id: 'android-miui-permissions',
    platform: 'android',
    category: 'permissions',
    question: 'MIUI / One UI Özel İzin Sorunları',
    answer: `Xiaomi (MIUI) ve Samsung (One UI) cihazlarda ek güvenlik katmanları bulunur.

**MIUI İçin:**
- **Autostart:** Ayarlar → Uygulamalar → Manage apps → Passgage → Autostart - Açık konuma getirin
- **Pil Tasarrufu:** Güvenlik → Battery → App battery saver → Passgage - "No restrictions" seçin

**Samsung One UI İçin:**
- **Device Care:** Ayarlar → Device care → Battery → App power management
- Passgage'i "Never sleeping apps" listesine ekleyin`,
    keywords: ['miui', 'one ui', 'samsung', 'xiaomi', 'izin', 'permission', 'autostart', 'pil'],
    relatedSteps: [2],
    pageUrl: '/android#step6',
    metadata: {
      importance: 'high',
      lastUpdated: '2024-01-06',
    },
  },

  {
    id: 'android-doze-mode',
    platform: 'android',
    category: 'battery',
    question: 'Doze Mode / Uykuda Bekletme',
    answer: `Android'in Doze Mode özelliği uzun süre kullanılmayan uygulamaları uyku moduna alır.

**Pil Optimizasyonu İstisnası:**
1. Ayarlar → Uygulamalar → Passgage → Pil
2. "Optimize Etme" seçeneğini kapatın veya istisna listesine ekleyin`,
    keywords: ['doze mode', 'pil', 'battery', 'optimization', 'uyku', 'bekletme'],
    relatedSteps: [2],
    pageUrl: '/android#step6',
    metadata: {
      importance: 'high',
      lastUpdated: '2024-01-06',
    },
  },

  {
    id: 'android-nfc-not-working',
    platform: 'android',
    category: 'nfc',
    question: 'NFC Çalışmıyor',
    answer: `NFC okuma sorunları yaşıyorsanız aşağıdaki adımları deneyin:

**1. NFC Açık mı Kontrol Edin**
- Yukarıdaki üretici özel talimatları takip ederek NFC'nin açık olduğundan emin olun

**2. Telefon Konumu**
- Telefonun arka kısmını (genellikle üst veya orta bölüm) NFC okuyucuya yaklaştırın
- 1-2 saniye tutun

**3. Kılıf Sorunu**
- Kalın veya metalik kılıflar NFC sinyalini engelleyebilir
- Kılıfı çıkarıp tekrar deneyin

**4. Telefonu Yeniden Başlatın**
- Telefonu kapatıp açmak NFC modülünü yeniler`,
    keywords: ['nfc', 'çalışmıyor', 'not working', 'okuma', 'kılıf', 'reading'],
    relatedSteps: [5],
    pageUrl: '/android#step6',
    metadata: {
      importance: 'high',
      lastUpdated: '2024-01-06',
    },
  },

  {
    id: 'android-location-accuracy',
    platform: 'android',
    category: 'gps',
    question: 'Konum Doğruluğu Sorunları',
    answer: `GPS konumunuz yanlış veya hassas değilse aşağıdaki ayarları kontrol edin:

**1. Yüksek Doğruluk Modu:**
- Ayarlar → Konum → Konum Servisleri → Konum Modu
- "Yüksek doğruluk" seçeneğini işaretleyin

**2. Wi-Fi ve Bluetooth Taraması:**
- Ayarlar → Konum → Wi-Fi and Bluetooth scanning
- Her iki seçeneği de AÇIK konuma getirin

**3. GPS'i Yenileyin:**
- Uçak modunu 10 saniye açıp kapatın`,
    keywords: ['konum', 'location', 'gps', 'doğruluk', 'accuracy', 'wifi', 'bluetooth'],
    relatedSteps: [2],
    pageUrl: '/android#step6',
    metadata: {
      importance: 'high',
      lastUpdated: '2024-01-06',
    },
  },

  {
    id: 'android-background-restrictions',
    platform: 'android',
    category: 'battery',
    question: 'Arka Plan Uygulama Kısıtlamaları',
    answer: `Android cihazınız uygulamanın arka planda çalışmasını kısıtlıyor olabilir.

**1. Arka Plan Veri Kullanımı:**
- Ayarlar → Uygulamalar → Passgage → Mobil veri ve Wi-Fi
- "Arka planda veri kullanımı" seçeneğini aktif edin

**2. Arka Plan Etkinliği:**
- Ayarlar → Uygulamalar → Passgage → Pil
- Arka plan kısıtlamasını KAPALI konuma getirin`,
    keywords: ['arka plan', 'background', 'kısıtlama', 'restriction', 'veri', 'data'],
    relatedSteps: [2],
    pageUrl: '/android#step6',
    metadata: {
      importance: 'high',
      lastUpdated: '2024-01-06',
    },
  },

  // ==================== Access Tag FAQs ====================
  {
    id: 'access-tag-qr-faded',
    platform: 'access-tag',
    category: 'maintenance',
    question: 'QR Kod Soluk veya Bozuk',
    answer: `**Neden Olur:**
Doğrudan güneş ışığı, UV maruziyeti, hava koşulları, fiziksel aşınma

**Çözüm: QR Kod Etiketi Değiştirin**
1. Admin panelden aynı lokasyon için yeni QR kod oluşturun
2. Eski tag'i çıkarın, yeni tag'i monte edin
3. Sistemi test edin ve personele bildirin

**Önleme:**
- Tag'i gölgeli alana taşıyın veya saçak altına monte edin
- UV koruyucu laminasyon uygulayın
- Metal tag kullanımını düşünün (daha dayanıklı)`,
    keywords: ['qr kod', 'soluk', 'bozuk', 'faded', 'güneş', 'uv', 'değiştir'],
    relatedSteps: [4],
    pageUrl: '/access-tag#step7',
    metadata: {
      importance: 'high',
      lastUpdated: '2024-01-06',
    },
  },

  {
    id: 'access-tag-mounting-loose',
    platform: 'access-tag',
    category: 'installation',
    question: 'Montaj Gevşemesi',
    answer: `**Neden Olur:**
Yapışkan eskimesi, vibrasyon, sıcaklık değişimleri, vida gevşemesi

**Yapışkan Montaj İçin:**
1. Tag'i çıkarın, eski yapışkan artığını temizleyin
2. Yüzeyi yeniden hazırlayın
3. Yeni yapışkan pad ile tekrar monte edin
4. 24 saat bekleme süresi verin

**Vida Montaj İçin:**
1. Vidaları sıkıştırın (aşırı sıkmadan)
2. Dübeller hasarlı ise yenisiyle değiştirin
3. Titreşim varsa kauçuk aralayıcı ekleyin`,
    keywords: ['montaj', 'gevşeme', 'loose', 'mounting', 'yapışkan', 'vida', 'screw'],
    relatedSteps: [4],
    pageUrl: '/access-tag#step7',
    metadata: {
      importance: 'high',
      lastUpdated: '2024-01-06',
    },
  },

  {
    id: 'access-tag-poor-lighting',
    platform: 'access-tag',
    category: 'installation',
    question: 'Aydınlatma Yetersizliği',
    answer: `**Neden Olur:**
Karanlık koridor, gece vardiyası, yetersiz doğal/yapay ışık

**Çözüm 1: Ek Aydınlatma**
- LED spot lamba ekleyin (QR kod'u aydınlatacak şekilde)
- Pilli LED ışık kullanabilirsiniz (elektrik gerektirmez)
- Aydınlatma yeterli olana kadar test edin

**Çözüm 2: Tag Pozisyonu Değişikliği**
- Tag'i daha aydınlık bir alana taşıyın
- Pencere veya lamba yakınına monte edin
- Daha açık renkli arka plan tercih edin (kontrast artar)`,
    keywords: ['aydınlatma', 'lighting', 'karanlık', 'dark', 'led', 'ışık', 'pozisyon'],
    relatedSteps: [4],
    pageUrl: '/access-tag#step7',
    metadata: {
      importance: 'medium',
      lastUpdated: '2024-01-06',
    },
  },

  {
    id: 'access-tag-weather-damage',
    platform: 'access-tag',
    category: 'maintenance',
    question: 'Hava Koşulları Hasarı',
    answer: `**Neden Olur:**
Yağmur, kar, dolu, aşırı sıcaklık, rüzgar, nem birikimi

**Koruyucu Önlemler:**
- Şeffaf akrilik koruyucu kaplama ekleyin
- Saçak veya çatı altına taşıyın
- IP65+ sertifikalı tag kullanın
- Düzenli bakım yapın (3 ayda bir)

**İç Mekana Taşıma:**
- Mümkünse tag'i iç mekana taşıyın (giriş holü)
- Dış kapı yerine iç kapıya monte edin
- Ömrü önemli ölçüde uzar`,
    keywords: ['hava', 'weather', 'yağmur', 'rain', 'kar', 'snow', 'hasar', 'damage', 'koruma'],
    relatedSteps: [4],
    pageUrl: '/access-tag#step7',
    metadata: {
      importance: 'high',
      lastUpdated: '2024-01-06',
    },
  },

  {
    id: 'access-tag-scanning-errors',
    platform: 'access-tag',
    category: 'troubleshooting',
    question: 'QR Kod Tarama Hataları',
    answer: `**Neden Olur:**
Kamera odaklanma sorunu, QR kod kirli, kontrast yetersiz, barkod hasarlı

**Adım 1: Temizlik**
1. QR kod yüzeyini yumuşak bez ile temizleyin
2. Parmak izleri, toz, kir çıkarın
3. Kuru bez ile silip kurutun
4. Tekrar tarayın

**Adım 2: Kontrast Kontrolü**
- QR kod ile arka plan arasında yeterli kontrast var mı kontrol edin
- Açık arka plan üzerinde koyu QR veya tam tersi olmalı
- Gerekirse arka plan rengini değiştirin veya tag pozisyonunu ayarlayın

**Adım 3: Tag Değişimi**
- Yukarıdaki çözümler işe yaramazsa QR kod hasar görmüş olabilir
- Yeni bir Access Tag ile değiştirin
- Admin panelden yeni QR kod oluşturun ve aynı lokasyona atayın`,
    keywords: ['qr kod', 'tarama', 'scanning', 'error', 'hata', 'kamera', 'temizlik', 'kontrast'],
    relatedSteps: [3],
    pageUrl: '/access-tag#step7',
    metadata: {
      importance: 'high',
      lastUpdated: '2024-01-06',
    },
  },
];

/**
 * Get FAQs by platform
 */
export function getFAQsByPlatform(platform: string): FAQEntry[] {
  return faqData.filter((faq) => faq.platform === platform);
}

/**
 * Get FAQs by category
 */
export function getFAQsByCategory(category: string): FAQEntry[] {
  return faqData.filter((faq) => faq.category === category);
}

/**
 * Search FAQs by keywords (simple client-side search)
 */
export function searchFAQs(query: string): FAQEntry[] {
  const lowerQuery = query.toLowerCase();
  return faqData.filter(
    (faq) =>
      faq.question.toLowerCase().includes(lowerQuery) ||
      faq.answer.toLowerCase().includes(lowerQuery) ||
      faq.keywords.some((keyword) => keyword.toLowerCase().includes(lowerQuery))
  );
}

/**
 * Get FAQ by ID
 */
export function getFAQById(id: string): FAQEntry | undefined {
  return faqData.find((faq) => faq.id === id);
}

/**
 * Get all platforms
 */
export function getAllPlatforms(): string[] {
  return Array.from(new Set(faqData.map((faq) => faq.platform)));
}

/**
 * Get all categories
 */
export function getAllCategories(): string[] {
  return Array.from(new Set(faqData.map((faq) => faq.category)));
}

/**
 * Statistics
 */
export const faqStats = {
  total: faqData.length,
  ios: faqData.filter((faq) => faq.platform === 'ios').length,
  android: faqData.filter((faq) => faq.platform === 'android').length,
  accessTag: faqData.filter((faq) => faq.platform === 'access-tag').length,
};
