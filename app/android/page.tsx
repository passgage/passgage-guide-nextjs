'use client';

import { useState } from 'react';
import Header from '@/components/layout/Header';
import Hero from '@/components/layout/Hero';
import Footer from '@/components/layout/Footer';
import { PhoneMockup, Accordion, InfoBox, CrossLinks } from '@/components/guide';
import type { AccordionItem } from '@/components/guide';
import { generateFAQSchema } from '@/lib/seo';

export default function AndroidGuidePage() {
  // Android Steps for ProgressNav with descriptive IDs
  const androidSteps = [
    { id: 'install-app', number: 1, label: 'Uygulamayı indirin' },
    { id: 'permissions', number: 2, label: 'Gerekli izinleri verin' },
    { id: 'login-password', number: 3, label: 'Giriş yapın ve şifre oluşturun' },
    { id: 'device-pairing', number: 4, label: 'Cihaz eşleştirme' },
    { id: 'nfc-setup', number: 5, label: 'NFC kurulumu' },
    { id: 'troubleshooting', number: 6, label: 'Sorun giderme' }
  ];

  // HowTo Schema for SEO
  const androidHowToSchema = {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    'name': 'Passgage Android Kurulum Rehberi',
    'description': 'Samsung, Xiaomi, Huawei ve tüm Android telefonlar için Passgage şifresiz giriş uygulamasını adım adım kurma kılavuzu. NFC ayarları, pil optimizasyonu, izinler ve marka-spesifik sorun giderme rehberi.',
    'image': 'https://kilavuz.passgage.com/logo.png',
    'datePublished': '2025-01-10T00:00:00Z',
    'dateModified': '2025-01-11T00:00:00Z',
    'estimatedCost': {
      '@type': 'MonetaryAmount',
      'currency': 'TRY',
      'value': '0'
    },
    'totalTime': 'PT20M',
    'tool': [
      {
        '@type': 'HowToTool',
        'name': 'Android telefon veya tablet (Android 8.0+)'
      }
    ],
    'supply': [
      {
        '@type': 'HowToSupply',
        'name': 'Passgage hesabı ve giriş bilgileri'
      },
      {
        '@type': 'HowToSupply',
        'name': 'İnternet bağlantısı (Wi-Fi veya hücresel veri)'
      },
      {
        '@type': 'HowToSupply',
        'name': 'Google Play Services (güncel sürüm)'
      }
    ],
    'step': [
      {
        '@type': 'HowToStep',
        'position': 1,
        'name': 'Uygulamayı İndirin',
        'text': 'Google Play Store veya Huawei AppGallery\'den Passgage uygulamasını ücretsiz indirin. Android 8.0 (Oreo) veya üstü gereklidir. Samsung, Xiaomi, Huawei, Oppo, Realme, OnePlus ve tüm Android cihazlar desteklenir.',
        'url': 'https://kilavuz.passgage.com/android#install-app',
        'image': 'https://kilavuz.passgage.com/logo.png'
      },
      {
        '@type': 'HowToStep',
        'position': 2,
        'name': 'Gerekli İzinleri Verin',
        'text': 'Konum, kamera ve bildirim izinlerini aktifleştirin. Ayarlar menüsünden Passgage uygulamasına gerekli izinleri verin. Xiaomi MIUI ve Samsung One UI için ek izinler gerekebilir: Otomatik başlatma ve pil optimizasyonu ayarlarını kontrol edin.',
        'url': 'https://kilavuz.passgage.com/android#permissions',
        'image': 'https://kilavuz.passgage.com/logo.png'
      },
      {
        '@type': 'HowToStep',
        'position': 3,
        'name': 'Giriş Yapın ve Şifre Oluşturun',
        'text': 'Şifre Al butonuna tıklayın. Şirket e-posta adresinizi veya telefon numaranızı girin. Size gönderilen 6 haneli OTP kodunu girin. Banking-style güvenli bir şifre oluşturun (minimum 8 karakter, en az 1 büyük harf, 1 küçük harf ve 1 rakam içermeli).',
        'url': 'https://kilavuz.passgage.com/android#login-password',
        'image': 'https://kilavuz.passgage.com/logo.png'
      },
      {
        '@type': 'HowToStep',
        'position': 4,
        'name': 'Cihaz Eşleştirme',
        'text': 'Eşleştir butonuna tıklayın. Telefonunuza gelen SMS doğrulama kodunu girerek eşleştirme işlemini onaylayın. ÖNEMLİ: Her kullanıcı aynı anda sadece bir Android cihazla eşleştirilebilir. Yeni cihaz eklendiğinde eski cihaz otomatik olarak kaldırılır.',
        'url': 'https://kilavuz.passgage.com/android#device-pairing',
        'image': 'https://kilavuz.passgage.com/logo.png'
      },
      {
        '@type': 'HowToStep',
        'position': 5,
        'name': 'NFC Kurulumu',
        'text': 'Marka-spesifik NFC ayarları: Samsung (One UI) için Ayarlar → Bağlantılar → NFC. Xiaomi (MIUI) için Ayarlar → Connection & sharing → NFC. Huawei için Ayarlar → Cihaz bağlantısı → NFC. Google Pixel için Ayarlar → Connected devices → NFC. NFC sensörü genellikle telefonun arka tarafında, kameranın yakınındadır.',
        'url': 'https://kilavuz.passgage.com/android#nfc-setup',
        'image': 'https://kilavuz.passgage.com/logo.png'
      },
      {
        '@type': 'HowToStep',
        'position': 6,
        'name': 'Sorun Giderme',
        'text': 'Yaygın Android sorunları ve çözümleri: Pil optimizasyonu uygulamayı engelliyorsa kapatın (MIUI/One UI için özel). Google Play Services güncel değilse güncelleyin. NFC çalışmıyorsa telefonu yeniden başlatın ve kalın kılıfları çıkarın. Konum doğruluğu için Google Location Accuracy özelliğini açın. MIUI ve One UI için arka plan kısıtlamalarını kaldırın.',
        'url': 'https://kilavuz.passgage.com/android#troubleshooting',
        'image': 'https://kilavuz.passgage.com/logo.png'
      }
    ]
  };

  // NFC Manufacturer Accordion Data
  const nfcManufacturerSteps: AccordionItem[] = [
    {
      id: 'samsung',
      question: 'Samsung (One UI)',
      badge: 'SAMSUNG',
      badgeStyle: { background: 'linear-gradient(135deg, #1428a0 0%, #0c52ff 100%)' },
      answer: (
        <div className="space-y-6">
          <div>
            <h5 className="font-bold text-neutral-900 mb-3 text-lg">Adım 1: Ayarları Açın</h5>
            <div
              className="inline-block px-4 py-2 rounded-lg font-mono text-sm my-2 border-l-4"
              style={{
                background: '#f1f5f9',
                color: '#1f2937',
                borderColor: '#3ddc84'
              }}
            >
              Ayarlar <span className="text-green-700 mx-2 font-bold">→</span> Bağlantılar (Connections)
            </div>
          </div>
          <div>
            <h5 className="font-bold text-neutral-900 mb-3 text-lg">Adım 2: NFC ve Temassız Ödemeler</h5>
            <div
              className="inline-block px-4 py-2 rounded-lg font-mono text-sm my-2 border-l-4"
              style={{
                background: '#f1f5f9',
                color: '#1f2937',
                borderColor: '#3ddc84'
              }}
            >
              NFC and contactless payments <span className="text-green-700 mx-2 font-bold">→</span> NFC <span className="text-green-700 mx-2 font-bold">→</span> Toggle ON
            </div>
          </div>
          <div>
            <h5 className="font-bold text-neutral-900 mb-3 text-lg">Adım 3: Doğrulama</h5>
            <p className="text-neutral-700">
              Quick Settings panelinde (üstten aşağı kaydırın) NFC simgesi <strong className="text-blue-600">mavi</strong> olmalıdır.
            </p>
          </div>
        </div>
      ),
    },
    {
      id: 'huawei',
      question: 'Huawei (EMUI / HarmonyOS)',
      badge: 'HUAWEI',
      badgeStyle: { background: 'linear-gradient(135deg, #c7112b 0%, #fa1a3c 100%)' },
      answer: (
        <div className="space-y-6">
          <div>
            <h5 className="font-bold text-neutral-900 mb-3 text-lg">Adım 1: Ayarları Açın</h5>
            <div
              className="inline-block px-4 py-2 rounded-lg font-mono text-sm my-2 border-l-4"
              style={{
                background: '#f1f5f9',
                color: '#1f2937',
                borderColor: '#3ddc84'
              }}
            >
              Ayarlar <span className="text-green-700 mx-2 font-bold">→</span> Cihaz bağlantısı (Device connectivity)
            </div>
          </div>
          <div>
            <h5 className="font-bold text-neutral-900 mb-3 text-lg">Adım 2: NFC Bölümü</h5>
            <div
              className="inline-block px-4 py-2 rounded-lg font-mono text-sm my-2 border-l-4"
              style={{
                background: '#f1f5f9',
                color: '#1f2937',
                borderColor: '#3ddc84'
              }}
            >
              NFC <span className="text-green-700 mx-2 font-bold">→</span> Toggle ON
            </div>
          </div>
          <div>
            <h5 className="font-bold text-neutral-900 mb-3 text-lg">Adım 3: Huawei Wallet (Opsiyonel)</h5>
            <p className="text-neutral-700">
              Varsayılan ödeme uygulaması olarak <strong>Huawei Wallet</strong> kullanıyorsanız, NFC ayarlarını buradan da yapabilirsiniz.
            </p>
          </div>
        </div>
      ),
    },
    {
      id: 'xiaomi',
      question: 'Xiaomi (MIUI)',
      badge: 'XIAOMI',
      badgeStyle: { background: 'linear-gradient(135deg, #ff6700 0%, #ff8533 100%)' },
      answer: (
        <div className="space-y-6">
          <div>
            <h5 className="font-bold text-neutral-900 mb-3 text-lg">Yöntem 1 (MIUI 12+)</h5>
            <div
              className="inline-block px-4 py-2 rounded-lg font-mono text-sm my-2 border-l-4"
              style={{
                background: '#f1f5f9',
                color: '#1f2937',
                borderColor: '#3ddc84'
              }}
            >
              Ayarlar <span className="text-green-700 mx-2 font-bold">→</span> Connection & sharing <span className="text-green-700 mx-2 font-bold">→</span> NFC <span className="text-green-700 mx-2 font-bold">→</span> Toggle ON
            </div>
          </div>
          <div>
            <h5 className="font-bold text-neutral-900 mb-3 text-lg">Yöntem 2 (Eski MIUI)</h5>
            <div
              className="inline-block px-4 py-2 rounded-lg font-mono text-sm my-2 border-l-4"
              style={{
                background: '#f1f5f9',
                color: '#1f2937',
                borderColor: '#3ddc84'
              }}
            >
              Ayarlar <span className="text-green-700 mx-2 font-bold">→</span> More connectivity options <span className="text-green-700 mx-2 font-bold">→</span> NFC <span className="text-green-700 mx-2 font-bold">→</span> Toggle ON
            </div>
          </div>
          <div>
            <h5 className="font-bold text-neutral-900 mb-3 text-lg">Adım 3: Android Beam (Opsiyonel)</h5>
            <p className="text-neutral-700">
              Android Beam kullanmıyorsanız, sadece NFC'yi açık bırakmanız yeterlidir.
            </p>
          </div>
        </div>
      ),
    },
    {
      id: 'stock-android',
      question: 'Stock Android (Google Pixel vb.)',
      badge: 'GOOGLE',
      badgeStyle: { background: 'linear-gradient(135deg, #4285f4 0%, #34a853 100%)' },
      answer: (
        <div className="space-y-6">
          <div>
            <h5 className="font-bold text-neutral-900 mb-3 text-lg">Adım 1: Bağlı Cihazlar</h5>
            <div
              className="inline-block px-4 py-2 rounded-lg font-mono text-sm my-2 border-l-4"
              style={{
                background: '#f1f5f9',
                color: '#1f2937',
                borderColor: '#3ddc84'
              }}
            >
              Ayarlar <span className="text-green-700 mx-2 font-bold">→</span> Connected devices <span className="text-green-700 mx-2 font-bold">→</span> Connection preferences
            </div>
          </div>
          <div>
            <h5 className="font-bold text-neutral-900 mb-3 text-lg">Adım 2: NFC Aktivasyonu</h5>
            <div
              className="inline-block px-4 py-2 rounded-lg font-mono text-sm my-2 border-l-4"
              style={{
                background: '#f1f5f9',
                color: '#1f2937',
                borderColor: '#3ddc84'
              }}
            >
              NFC <span className="text-green-700 mx-2 font-bold">→</span> Toggle ON
            </div>
          </div>
          <div>
            <h5 className="font-bold text-neutral-900 mb-3 text-lg">Adım 3: Doğrulama</h5>
            <p className="text-neutral-700">
              Quick Settings panelinde NFC simgesini kontrol edin.
            </p>
          </div>
        </div>
      ),
    },
    {
      id: 'other-manufacturers',
      question: 'Diğer Üreticiler (Oppo, Vivo, Realme, OnePlus vb.)',
      badge: 'DİĞER',
      badgeStyle: { background: '#6b7280' },
      answer: (
        <div className="space-y-6">
          <div>
            <h5 className="font-bold text-neutral-900 mb-3 text-lg">Yöntem 1: Ayarlar Arama</h5>
            <p className="text-neutral-700 mb-3">
              Ayarlar uygulamasını açın ve üst kısımdaki arama çubuğuna <strong>"NFC"</strong> yazın.
            </p>
          </div>
          <div>
            <h5 className="font-bold text-neutral-900 mb-3 text-lg">Yöntem 2: Bağlantılar Menüsü</h5>
            <div
              className="inline-block px-4 py-2 rounded-lg font-mono text-sm my-2 border-l-4"
              style={{
                background: '#f1f5f9',
                color: '#1f2937',
                borderColor: '#3ddc84'
              }}
            >
              Ayarlar <span className="text-green-700 mx-2 font-bold">→</span> Bağlantılar / Wireless & Networks <span className="text-green-700 mx-2 font-bold">→</span> NFC
            </div>
          </div>
          <div>
            <h5 className="font-bold text-neutral-900 mb-3 text-lg">Yöntem 3: Quick Settings</h5>
            <p className="text-neutral-700">
              Ekranın üst kısmından aşağı kaydırıp Quick Settings'i açın. NFC simgesine dokunun.
            </p>
          </div>
        </div>
      ),
    },
  ];

  // Troubleshooting FAQ data - 6 comprehensive items
  const troubleshootingItems: AccordionItem[] = [
    {
      id: 'google-play-services',
      question: 'Google Play Services Güncel Değil',
      answer: (
        <div className="space-y-4">
          <p>Google Play Services uygulamanın çalışması için gereklidir. Güncelleme için:</p>

          <div className="bg-green-50 border-l-4 border-green-500 p-4 rounded-r-xl">
            <h5 className="font-bold text-green-900 mb-3">Yöntem 1: Ayarlar Uygulaması (Önerilen - Android 12+)</h5>
            <ol className="list-decimal list-inside space-y-2 ml-4 text-sm text-green-800">
              <li>Ayarlar → Profil simgesi → Tüm servisler</li>
              <li>Gizlilik ve Güvenlik → Sistem servisleri</li>
              <li>Google Play Services → <strong>Güncelle</strong> veya <strong>Yükle</strong></li>
              <li>Cihazınızı yeniden başlatın</li>
            </ol>
            <p className="text-xs text-neutral-600 mt-3">
              📖 Kaynak: <a href="https://support.google.com/googleplay/answer/9037938?hl=tr" target="_blank" rel="noopener" className="underline">Google Play Yardım</a>
            </p>
          </div>

          <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded-r-xl">
            <h5 className="font-bold text-blue-900 mb-3">Yöntem 2: Play Store</h5>
            <ol className="list-decimal list-inside space-y-2 ml-4 text-sm text-blue-800">
              <li>Google Play Store uygulamasını açın</li>
              <li>Üst menüden "Uygulamalarım ve oyunlarım" seçeneğine gidin</li>
              <li>"Google Play Services" uygulamasını bulun</li>
              <li>"Güncelle" butonuna tıklayın</li>
              <li>Güncelleme tamamlandıktan sonra cihazınızı yeniden başlatın</li>
            </ol>
          </div>

          <p className="text-xs text-neutral-500 italic mt-2">
            💡 Android 6.0 ve üzeri cihazlarda Google Play Services otomatik güncellenir. Manuel güncelleme sadece sorun yaşanması durumunda gereklidir.
          </p>
        </div>
      ),
    },
    {
      id: 'manufacturer-permissions',
      question: 'MIUI / One UI Özel İzin Sorunları',
      answer: (
        <div className="space-y-4">
          <p>Bazı üreticiler ek izin gerektiriyor. Marka bazında çözümler:</p>

          <div className="mt-4 p-4 bg-orange-50 border-l-4 border-orange-500 rounded-r-xl">
            <h5 className="font-bold text-orange-900 mb-2">Xiaomi (MIUI 14 / HyperOS)</h5>
            <p className="text-sm text-orange-800 mb-2">Ayarlar → Uygulamalar → Passgage → Otomatik başlatma → <strong>Açık</strong></p>
            <p className="text-sm text-orange-800 mb-2">Ayarlar → Pil ve performans → Uygulama pil tasarrufu → Passgage → <strong>Kısıtlama yok</strong></p>
            <p className="text-sm text-orange-800 mb-2">Ayarlar → Uygulamalar → Passgage → Uygulama izinleri → <strong>Arka plan otomatik başlatma</strong> → Açık</p>
            <div className="mt-3 p-3 bg-red-100 rounded border border-red-300">
              <p className="text-xs text-red-900 font-semibold mb-1">
                ⚠️ UYARI: MIUI sistem güncellemelerinden sonra bu ayarları sıfırlayabilir. Uygulama düzgün çalışmıyorsa bu ayarları tekrar kontrol edin.
              </p>
              <p className="text-xs text-neutral-600 mt-2">
                📖 Kaynak: <a href="https://dontkillmyapp.com/xiaomi" target="_blank" rel="noopener" className="underline">dontkillmyapp.com/xiaomi</a>
              </p>
            </div>
          </div>

          <div className="mt-4 p-4 bg-blue-50 border-l-4 border-blue-500 rounded-r-xl">
            <h5 className="font-bold text-blue-900 mb-2">Samsung (One UI)</h5>
            <p className="text-sm text-blue-800 mb-3">Ayarlar → Cihaz bakımı → Pil → Uygulama güç yönetimi → Passgage → <strong>Optimize edilmemiş</strong></p>

            <div className="mt-3 p-3 bg-red-100 rounded border border-red-300">
              <p className="text-xs text-red-900 font-semibold mb-2">🚨 KRİTİK: Uykuda Olmayan Uygulamalar Listesine Ekleyin</p>
              <p className="text-xs text-red-800 mb-2">
                Ayarlar → Cihaz bakımı → Pil → Arka plan kullanım limitleri → <strong>Asla uyumayan uygulamalar</strong> → Passgage ekleyin
              </p>
              <p className="text-xs text-red-800 mb-2">
                <strong>"Kullanılmayan uygulamaları uykuya al"</strong> seçeneğini KAPATIN (yoksa sistem 3 gün sonra Passgage'ı otomatik uykuya alır)
              </p>
              <p className="text-xs text-neutral-600 mt-2">
                📖 Kaynak: <a href="https://dontkillmyapp.com/samsung" target="_blank" rel="noopener" className="underline">dontkillmyapp.com/samsung</a>
              </p>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: 'doze-mode',
      question: 'Doze Mode / Uykuda Bekletme',
      answer: (
        <div className="space-y-4">
          <p>Android pil tasarrufu için uygulamaları uykuya alabilir. Passgage için kapatın:</p>
          <ol className="list-decimal list-inside space-y-2 ml-4">
            <li>Ayarlar → Uygulamalar → Passgage</li>
            <li>Pil → Pil optimizasyonu</li>
            <li>"Tümü" sekmesine geçin</li>
            <li>Passgage uygulamasını bulun ve "Optimize etme" seçeneğini seçin</li>
            <li>Değişiklikleri kaydedin</li>
          </ol>
        </div>
      ),
    },
    {
      id: 'nfc-not-working',
      question: 'NFC Çalışmıyor',
      answer: (
        <div className="space-y-4">
          <p>NFC sorunları için şu adımları deneyin:</p>
          <ol className="list-decimal list-inside space-y-2 ml-4">
            <li>NFC özelliğinin açık olduğundan emin olun (Ayarlar → Bağlı cihazlar → NFC)</li>
            <li>Telefonunuzun arkasını okuyucuya yaklaştırın (1-2 saniye bekleyin)</li>
            <li>Kalın veya metal kılıfları çıkarın</li>
            <li>Cihazınızı yeniden başlatın</li>
          </ol>
          <div className="mt-4 p-4 bg-blue-50 border-l-4 border-blue-500 rounded-r-xl">
            <p className="text-sm text-blue-800">
              <strong>İpucu:</strong> NFC sensörü genellikle telefonun arka tarafında, kameranın yakınındadır.
              1-2 cm mesafeden okutmayı deneyin.
            </p>
          </div>
        </div>
      ),
    },
    {
      id: 'location-accuracy',
      question: 'Konum Doğruluğu Sorunları',
      answer: (
        <div className="space-y-6">
          <div>
            <h5 className="font-bold text-neutral-900 mb-3">Google Konum Doğruluğu (Location Accuracy)</h5>
            <div
              className="inline-block px-4 py-2 rounded-lg font-mono text-sm my-2 border-l-4"
              style={{
                background: '#f1f5f9',
                color: '#1f2937',
                borderColor: '#3ddc84'
              }}
            >
              Ayarlar <span className="text-green-700 mx-2 font-bold">→</span> Konum <span className="text-green-700 mx-2 font-bold">→</span> Gelişmiş <span className="text-green-700 mx-2 font-bold">→</span> <strong>Google Konum Doğruluğu</strong> <span className="text-green-700 mx-2 font-bold">→</span> Açık
            </div>
            <p className="text-xs text-neutral-600 mt-2">
              📖 Kaynak: <a href="https://support.google.com/android/answer/15157297" target="_blank" rel="noopener" className="underline">Google Location Accuracy Help</a>
            </p>
            <p className="text-xs text-neutral-500 mt-2 italic">
              Not: Eski Android sürümlerinde "Yüksek Doğruluk Modu" olarak geçiyordu. Güncel adı "Google Location Accuracy" şeklindedir.
            </p>
          </div>
          <div>
            <h5 className="font-bold text-neutral-900 mb-3">Wi-Fi ve Bluetooth Taraması</h5>
            <div
              className="inline-block px-4 py-2 rounded-lg font-mono text-sm my-2 border-l-4"
              style={{
                background: '#f1f5f9',
                color: '#1f2937',
                borderColor: '#3ddc84'
              }}
            >
              Ayarlar <span className="text-green-700 mx-2 font-bold">→</span> Konum <span className="text-green-700 mx-2 font-bold">→</span> Konum Servisleri <span className="text-green-700 mx-2 font-bold">→</span> Wi-Fi taraması / Bluetooth taraması <span className="text-green-700 mx-2 font-bold">→</span> Açık
            </div>
            <p className="text-xs text-neutral-600 mt-2">
              💡 Bu özellik GPS sinyalininضعیف olduğu durumlarda konum doğruluğunu artırır (kapalı alanlarda, binalar arasında).
            </p>
          </div>
          <div>
            <h5 className="font-bold text-neutral-900 mb-3">GPS'i Yenile</h5>
            <p className="text-neutral-700">
              Uçak modunu 10 saniye açıp kapatarak GPS'i yenileyebilirsiniz.
            </p>
          </div>
        </div>
      ),
    },
    {
      id: 'background-restrictions',
      question: 'Arka Plan Uygulama Kısıtlamaları',
      answer: (
        <div className="space-y-6">
          <div>
            <h5 className="font-bold text-neutral-900 mb-3">Arka Plan Veri Kullanımı</h5>
            <div
              className="inline-block px-4 py-2 rounded-lg font-mono text-sm my-2 border-l-4"
              style={{
                background: '#f1f5f9',
                color: '#1f2937',
                borderColor: '#3ddc84'
              }}
            >
              Ayarlar <span className="text-green-700 mx-2 font-bold">→</span> Uygulamalar <span className="text-green-700 mx-2 font-bold">→</span> Passgage <span className="text-green-700 mx-2 font-bold">→</span> Mobil veri ve Wi-Fi <span className="text-green-700 mx-2 font-bold">→</span> ON
            </div>
          </div>
          <div>
            <h5 className="font-bold text-neutral-900 mb-3">Arka Plan Etkinliği</h5>
            <div
              className="inline-block px-4 py-2 rounded-lg font-mono text-sm my-2 border-l-4"
              style={{
                background: '#f1f5f9',
                color: '#1f2937',
                borderColor: '#3ddc84'
              }}
            >
              Ayarlar <span className="text-green-700 mx-2 font-bold">→</span> Uygulamalar <span className="text-green-700 mx-2 font-bold">→</span> Passgage <span className="text-green-700 mx-2 font-bold">→</span> Pil <span className="text-green-700 mx-2 font-bold">→</span> Arka plan kısıtlaması <span className="text-green-700 mx-2 font-bold">→</span> OFF
            </div>
          </div>
          <div className="mt-4 p-4 bg-amber-50 border-l-4 border-amber-500 rounded-r-xl">
            <p className="text-sm text-amber-800">
              <strong>Not:</strong> Bazı cihazlarda arka plan kısıtlamaları "Pil optimizasyonu" altında bulunabilir.
            </p>
          </div>
        </div>
      ),
    },
  ];

  // Generate FAQPage Schema from troubleshooting section
  const androidFAQSchema = generateFAQSchema(
    troubleshootingItems,
    'https://kilavuz.passgage.com',
    'https://kilavuz.passgage.com/android'
  );

  // BreadcrumbList Schema for navigation
  const androidBreadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    'itemListElement': [
      {
        '@type': 'ListItem',
        'position': 1,
        'name': 'Ana Sayfa',
        'item': 'https://kilavuz.passgage.com'
      },
      {
        '@type': 'ListItem',
        'position': 2,
        'name': 'Android Kurulum Rehberi',
        'item': 'https://kilavuz.passgage.com/android'
      }
    ]
  };

  return (
    <>
      {/* HowTo Schema JSON-LD for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(androidHowToSchema) }}
      />

      {/* FAQPage Schema JSON-LD for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(androidFAQSchema) }}
      />

      {/* BreadcrumbList Schema JSON-LD for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(androidBreadcrumbSchema) }}
      />

      {/* Standard Header Component */}
      <Header
        isGuide={true}
        progressSteps={androidSteps}
      />

      <main itemScope itemType="https://schema.org/HowTo">
        {/* AI-readable semantic metadata */}
        <meta itemProp="name" content="Passgage Android Installation Guide" />
        <meta itemProp="inLanguage" content="tr" />
        <meta itemProp="genre" content="Technical Documentation" />
        <meta itemProp="audience" content="Android phone and tablet users" />
        <meta itemProp="educationalLevel" content="Beginner" />
        <meta itemProp="timeRequired" content="PT20M" />
        <meta itemProp="keywords" content="Android, Samsung, Xiaomi, Huawei, Passgage, kurulum, NFC, MIUI, One UI, pil optimizasyonu" />

        {/* Hero Section - Standard Component */}
        <Hero
          icon={<i className="fab fa-android" />}
          titleBefore="Passgage"
          titleHighlight="Android"
          titleAfter="Kurulumu"
          description="Android telefon ve tabletler için özel hazırlanmış kurulum rehberi. Android 7.0 ve üzeri cihazlar için optimize edilmiştir."
        />

        {/* Main Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16 md:py-20 lg:py-24">
          {/* STEP 1: Download App */}
          <section id="install-app" aria-labelledby="install-app-title" className="mb-20 md:mb-28 lg:mb-32 scroll-mt-24">
            <div className="flex flex-col sm:flex-row items-start gap-4 sm:gap-6 mb-10 md:mb-12">
              <div
                className="flex-shrink-0 w-14 h-14 sm:w-16 sm:h-16 text-white rounded-xl sm:rounded-2xl flex items-center justify-center text-xl sm:text-2xl font-bold shadow-medium"
                style={{ background: 'linear-gradient(135deg, #FF501D 0%, #FFD700 100%)' }}
              >
                1
              </div>
              <div className="flex-1">
                <h2 id="install-app-title" className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-neutral-900 mb-2 md:mb-3 leading-tight">
                  <a href="#install-app" className="no-underline hover:opacity-80 transition-opacity">
                    Uygulamayı{' '}
                    <span
                      style={{
                        background: 'linear-gradient(135deg, #FF501D 0%, #FFD700 100%)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        backgroundClip: 'text'
                      }}
                    >
                      İndirin
                    </span>
                  </a>
                </h2>
                <p className="text-base sm:text-lg md:text-xl text-neutral-600">Google Play Store veya Huawei AppGallery'den ücretsiz indirin</p>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6 max-w-3xl mx-auto mb-12">
              {/* Google Play Store */}
              <a
                href="https://play.google.com/store/apps/details?id=com.passgage"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => {
                  if (typeof window !== 'undefined' && (window as any).gtag) {
                    (window as any).gtag('event', 'download_click', {
                      event_category: 'engagement',
                      event_label: 'Android - Google Play',
                      platform: 'android'
                    });
                  }
                }}
                className="bg-white rounded-3xl shadow-card hover:shadow-hover transition-all duration-300 p-8 hover:-translate-y-2 no-underline block group"
              >
                <div
                  className="w-16 h-16 rounded-2xl flex items-center justify-center text-white text-3xl mb-6"
                  style={{ background: 'linear-gradient(to bottom right, #22c55e, #16a34a)' }}
                >
                  <i className="fab fa-google-play" />
                </div>
                <h3 className="text-2xl font-bold text-neutral-900 mb-3">Google Play Store</h3>
                <p className="text-neutral-600 mb-4">Android cihazlar için resmi mağaza</p>
                <div className="flex items-center gap-2 text-android-green font-semibold group-hover:gap-3 transition-all">
                  <span>Ücretsiz İndir</span>
                  <i className="fas fa-arrow-right" />
                </div>
              </a>

              {/* Huawei AppGallery */}
              <a
                href="https://appgallery.huawei.com/app/C106558653"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => {
                  if (typeof window !== 'undefined' && (window as any).gtag) {
                    (window as any).gtag('event', 'download_click', {
                      event_category: 'engagement',
                      event_label: 'Android - Huawei AppGallery',
                      platform: 'android'
                    });
                  }
                }}
                className="bg-white rounded-3xl shadow-card hover:shadow-hover transition-all duration-300 p-8 hover:-translate-y-2 no-underline block group"
              >
                <div
                  className="w-16 h-16 rounded-2xl flex items-center justify-center text-white text-3xl mb-6"
                  style={{ background: 'linear-gradient(to bottom right, #dc2626, #b91c1c)' }}
                >
                  <i className="fas fa-mobile-alt" />
                </div>
                <h3 className="text-2xl font-bold text-neutral-900 mb-3">Huawei AppGallery</h3>
                <p className="text-neutral-600 mb-4">Huawei cihazlar için alternatif indirme</p>
                <div className="flex items-center gap-2 text-red-600 font-semibold group-hover:gap-3 transition-all">
                  <span>Ücretsiz İndir</span>
                  <i className="fas fa-arrow-right" />
                </div>
              </a>
            </div>

            {/* Google Play Store Screenshot */}
            <div className="max-w-md mx-auto mb-12">
              <PhoneMockup
                imageSrc="/screenshots/android/step1-google-play.jpg"
                alt="Google Play Store'da Passgage uygulaması"
                platform="android"
              />
            </div>

            <div className="grid md:grid-cols-2 gap-8 max-w-2xl mx-auto">
              <InfoBox variant="info" icon="fas fa-mobile-alt" title="Android 7.0 ve Üzeri">
                Nougat ve sonrası tüm Android cihazlar desteklenir. Ayarlar → Telefon Hakkında → Android Sürümü'nden kontrol edebilirsiniz.
              </InfoBox>

              <InfoBox variant="info" icon="fas fa-cog" title="Google Play Services Gereklidir">
                Google Play Services uygulamanın çalışması için gereklidir. Huawei cihazlarda HMS Core kullanılır.
              </InfoBox>
            </div>
          </section>

          {/* STEP 2: Gerekli İzinleri Verin */}
          <section id="permissions" aria-labelledby="permissions-title" className="mb-20 md:mb-28 lg:mb-32 scroll-mt-24">
            <div className="flex flex-col sm:flex-row items-start gap-4 sm:gap-6 mb-10 md:mb-12">
              <div
                className="flex-shrink-0 w-14 h-14 sm:w-16 sm:h-16 text-white rounded-xl sm:rounded-2xl flex items-center justify-center text-xl sm:text-2xl font-bold shadow-medium"
                style={{ background: 'linear-gradient(135deg, #FF501D 0%, #FFD700 100%)' }}
              >
                2
              </div>
              <div className="flex-1">
                <h2 id="permissions-title" className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-neutral-900 mb-2 md:mb-3 leading-tight">
                  <a href="#permissions" className="no-underline hover:opacity-80 transition-opacity">
                    Gerekli{' '}
                    <span
                      style={{
                        background: 'linear-gradient(135deg, #FF501D 0%, #FFD700 100%)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        backgroundClip: 'text',
                      }}
                    >
                      İzinleri
                    </span>{' '}
                    Verin
                  </a>
                </h2>
                <p className="text-base sm:text-lg md:text-xl text-neutral-600">
                  Android ayarlarından izinleri aktifleştirin
                </p>
              </div>
            </div>

            {/* Substep 2.1: Konum İzni */}
            <div className="grid grid-cols-1 md:grid-cols-[380px_1fr] lg:grid-cols-[420px_1fr] gap-8 md:gap-12 mb-16">
              <PhoneMockup
                imageSrc="/screenshots/android/step2-location-permission.jpg"
                alt="Konum izni ekranı"
                platform="android"
              />
              <div className="flex flex-col justify-center">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-android-green rounded-xl flex items-center justify-center">
                    <i className="fas fa-map-marker-alt text-white text-xl"></i>
                  </div>
                  <h4 className="text-2xl font-bold text-neutral-900">1. Konum İzni</h4>
                </div>
                <p className="text-neutral-700 mb-6 text-lg leading-relaxed">
                  Giriş-çıkış kayıtlarını doğru konumda yapmak için konum iznini vermeniz gerekir.
                </p>
                <div
                  className="inline-block px-4 py-3 rounded-lg font-mono text-sm my-2 border-l-4"
                  style={{
                    background: '#f1f5f9',
                    color: '#1f2937',
                    borderColor: '#3ddc84',
                  }}
                >
                  Ayarlar <span className="text-green-700 mx-2 font-bold">→</span> Uygulamalar{' '}
                  <span className="text-green-700 mx-2 font-bold">→</span> Passgage{' '}
                  <span className="text-green-700 mx-2 font-bold">→</span> İzinler{' '}
                  <span className="text-green-700 mx-2 font-bold">→</span> Konum
                </div>
                <p className="text-neutral-600 text-sm mt-4 bg-blue-50 border-l-4 border-blue-500 p-4 rounded">
                  💡 <strong>Önemli:</strong> &quot;Her zaman izin ver&quot; seçeneğini işaretleyin. Bu,
                  uygulamanın arka planda da konum bilgisi alabilmesini sağlar.
                </p>
              </div>
            </div>

            {/* Substep 2.2: Kamera İzni */}
            <div className="grid grid-cols-1 md:grid-cols-[380px_1fr] lg:grid-cols-[420px_1fr] gap-8 md:gap-12 mb-16">
              <PhoneMockup
                imageSrc="/screenshots/android/step2-camera-permission.jpg"
                alt="Kamera izni ekranı"
                platform="android"
              />
              <div className="flex flex-col justify-center">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-android-green rounded-xl flex items-center justify-center">
                    <i className="fas fa-camera text-white text-xl"></i>
                  </div>
                  <h4 className="text-2xl font-bold text-neutral-900">2. Kamera İzni</h4>
                </div>
                <p className="text-neutral-700 mb-6 text-lg leading-relaxed">
                  QR kod okutmak ve fotoğraf çekmek için kamera iznine ihtiyaç vardır.
                </p>
                <div
                  className="inline-block px-4 py-3 rounded-lg font-mono text-sm my-2 border-l-4"
                  style={{
                    background: '#f1f5f9',
                    color: '#1f2937',
                    borderColor: '#3ddc84',
                  }}
                >
                  Ayarlar <span className="text-green-700 mx-2 font-bold">→</span> Uygulamalar{' '}
                  <span className="text-green-700 mx-2 font-bold">→</span> Passgage{' '}
                  <span className="text-green-700 mx-2 font-bold">→</span> İzinler{' '}
                  <span className="text-green-700 mx-2 font-bold">→</span> Kamera
                </div>
                <p className="text-neutral-600 text-sm mt-4 bg-blue-50 border-l-4 border-blue-500 p-4 rounded">
                  💡 <strong>Öneri:</strong> Kamera izni sadece QR kod okutma sırasında kullanılır.
                </p>
              </div>
            </div>

            {/* Substep 2.3: Bildirim İzni */}
            <div className="grid grid-cols-1 md:grid-cols-[380px_1fr] lg:grid-cols-[420px_1fr] gap-8 md:gap-12 mb-16">
              <PhoneMockup
                imageSrc="/screenshots/android/step2-notification-permission.jpg"
                alt="Bildirim izni ekranı"
                platform="android"
              />
              <div className="flex flex-col justify-center">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-android-green rounded-xl flex items-center justify-center">
                    <i className="fas fa-bell text-white text-xl"></i>
                  </div>
                  <h4 className="text-2xl font-bold text-neutral-900">3. Bildirim İzni</h4>
                </div>
                <p className="text-neutral-700 mb-6 text-lg leading-relaxed">
                  Önemli güncellemeler ve hatırlatmalar için bildirim iznine ihtiyaç vardır.
                </p>
                <div
                  className="inline-block px-4 py-3 rounded-lg font-mono text-sm my-2 border-l-4"
                  style={{
                    background: '#f1f5f9',
                    color: '#1f2937',
                    borderColor: '#3ddc84',
                  }}
                >
                  Ayarlar <span className="text-green-700 mx-2 font-bold">→</span> Uygulamalar{' '}
                  <span className="text-green-700 mx-2 font-bold">→</span> Passgage{' '}
                  <span className="text-green-700 mx-2 font-bold">→</span> Bildirimler
                </div>
                <p className="text-neutral-600 text-sm mt-4 bg-blue-50 border-l-4 border-blue-500 p-4 rounded">
                  💡 <strong>Bilgi:</strong> Bildirimler mesai saati içinde ve dışında farklı
                  seslerde çalabilir.
                </p>
              </div>
            </div>

            {/* Info Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-12">
              <InfoBox variant="info" icon="fas fa-shield-alt" title="Gizlilik Güvencesi">
                Konum bilgisi sadece giriş-çıkış anlarında kullanılır ve hiçbir üçüncü tarafla
                paylaşılmaz. Verileriniz Passgage sunucularında güvenle saklanır.
              </InfoBox>
              <InfoBox variant="info" icon="fas fa-mobile-alt" title="Otomatik İzin İstekleri">
                Uygulama ilk açılışta gerekli izinleri otomatik olarak talep eder. İzinleri daha
                sonra ayarlardan manuel olarak da değiştirebilirsiniz.
              </InfoBox>
            </div>
          </section>

          {/* STEP 3: Giriş Yapın ve Şifre Oluşturun */}
          <section id="login-password" aria-labelledby="login-password-title" className="mb-20 md:mb-28 lg:mb-32 scroll-mt-24">
            <div className="flex flex-col sm:flex-row items-start gap-4 sm:gap-6 mb-10 md:mb-12">
              <div
                className="flex-shrink-0 w-14 h-14 sm:w-16 sm:h-16 text-white rounded-xl sm:rounded-2xl flex items-center justify-center text-xl sm:text-2xl font-bold shadow-medium"
                style={{ background: 'linear-gradient(135deg, #FF501D 0%, #FFD700 100%)' }}
              >
                3
              </div>
              <div className="flex-1">
                <h2 id="login-password-title" className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-neutral-900 mb-2 md:mb-3 leading-tight">
                  <a href="#login-password" className="no-underline hover:opacity-80 transition-opacity">
                    Giriş Yapın ve{' '}
                    <span
                      style={{
                        background: 'linear-gradient(135deg, #FF501D 0%, #FFD700 100%)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        backgroundClip: 'text',
                      }}
                    >
                      Şifre
                    </span>{' '}
                    Oluşturun
                  </a>
                </h2>
                <p className="text-base sm:text-lg md:text-xl text-neutral-600">
                  OTP doğrulama ile güvenli giriş yapın
                </p>
              </div>
            </div>

            {/* Substep 3.1: Şifre Al Butonu */}
            <div className="grid grid-cols-1 md:grid-cols-[380px_1fr] lg:grid-cols-[420px_1fr] gap-8 md:gap-12 mb-16">
              <PhoneMockup
                imageSrc="/screenshots/android/step3-1-login-screen.jpg"
                alt="Giriş ekranı"
                platform="android"
              />
              <div className="flex flex-col justify-center">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-android-green rounded-xl flex items-center justify-center">
                    <i className="fas fa-key text-white text-xl"></i>
                  </div>
                  <h4 className="text-2xl font-bold text-neutral-900">1. Şifre Al Butonuna Tıklayın</h4>
                </div>
                <p className="text-neutral-700 mb-4 text-lg leading-relaxed">
                  Uygulamayı açtığınızda karşınıza gelen giriş ekranında{' '}
                  <strong className="text-android-green">&quot;Şifre Al&quot;</strong> butonuna
                  tıklayın.
                </p>
                <p className="text-neutral-600 text-sm bg-blue-50 border-l-4 border-blue-500 p-4 rounded">
                  💡 İlk giriş için şifre oluşturmanız gerekir. Sonraki girişlerde bu şifreyi
                  kullanacaksınız.
                </p>
              </div>
            </div>

            {/* Substep 3.2: E-posta/Telefon Girişi */}
            <div className="grid grid-cols-1 md:grid-cols-[380px_1fr] lg:grid-cols-[420px_1fr] gap-8 md:gap-12 mb-16">
              <PhoneMockup
                imageSrc="/screenshots/android/step3-2-account-verification.jpg"
                alt="Hesap doğrulama ekranı"
                platform="android"
              />
              <div className="flex flex-col justify-center">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-android-green rounded-xl flex items-center justify-center">
                    <i className="fas fa-envelope text-white text-xl"></i>
                  </div>
                  <h4 className="text-2xl font-bold text-neutral-900">
                    2. E-posta veya Telefon Numarası Girin
                  </h4>
                </div>
                <p className="text-neutral-700 mb-4 text-lg leading-relaxed">
                  Şirket e-posta adresinizi veya telefon numaranızı girin. Sistem size bir{' '}
                  <strong className="text-android-green">6 haneli OTP kodu</strong> gönderecektir.
                </p>
                <p className="text-neutral-600 text-sm bg-amber-50 border-l-4 border-amber-500 p-4 rounded">
                  ⚠️ <strong>Önemli:</strong> Şirket yöneticiniz tarafından sisteme tanımlanan
                  e-posta veya telefon numarasını kullanın.
                </p>
              </div>
            </div>

            {/* Substep 3.3: OTP Kodu Girişi */}
            <div className="grid grid-cols-1 md:grid-cols-[380px_1fr] lg:grid-cols-[420px_1fr] gap-8 md:gap-12 mb-16">
              <PhoneMockup
                imageSrc="/screenshots/android/step3-3-otp-entry.jpg"
                alt="OTP kod girişi ekranı"
                platform="android"
              />
              <div className="flex flex-col justify-center">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-android-green rounded-xl flex items-center justify-center">
                    <i className="fas fa-mobile-alt text-white text-xl"></i>
                  </div>
                  <h4 className="text-2xl font-bold text-neutral-900">3. OTP Kodunu Girin</h4>
                </div>
                <p className="text-neutral-700 mb-4 text-lg leading-relaxed">
                  E-posta veya SMS ile gelen <strong className="text-android-green">6 haneli kodu</strong>{' '}
                  uygulama ekranına girin.
                </p>
                <p className="text-neutral-600 text-sm bg-blue-50 border-l-4 border-blue-500 p-4 rounded">
                  💡 Kod gelmedi mi? &quot;Tekrar Gönder&quot; butonuna tıklayarak yeni kod
                  talep edebilirsiniz.
                </p>
              </div>
            </div>

            {/* Substep 3.4: Şifre Oluşturma */}
            <div className="grid grid-cols-1 md:grid-cols-[380px_1fr] lg:grid-cols-[420px_1fr] gap-8 md:gap-12 mb-16">
              <PhoneMockup
                imageSrc="/screenshots/android/step3-4-set-password.jpg"
                alt="Şifre oluşturma ekranı"
                platform="android"
              />
              <div className="flex flex-col justify-center">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-android-green rounded-xl flex items-center justify-center">
                    <i className="fas fa-lock text-white text-xl"></i>
                  </div>
                  <h4 className="text-2xl font-bold text-neutral-900">4. Güçlü Bir Şifre Belirleyin</h4>
                </div>
                <p className="text-neutral-700 mb-4 text-lg leading-relaxed">
                  OTP doğrulaması başarılı olduktan sonra, hesabınız için güvenli bir şifre
                  oluşturun.
                </p>
                <div className="bg-neutral-50 border border-neutral-200 rounded-lg p-4 mb-4">
                  <p className="text-sm font-semibold text-neutral-900 mb-2">
                    Şifre Gereksinimleri:
                  </p>
                  <ul className="text-sm text-neutral-700 space-y-1 ml-4">
                    <li className="flex items-center gap-2">
                      <span className="text-android-green">✓</span> Minimum 8 karakter
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="text-android-green">✓</span> En az 1 büyük harf
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="text-android-green">✓</span> En az 1 küçük harf
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="text-android-green">✓</span> En az 1 rakam
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Info Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-12">
              <InfoBox variant="info" icon="fas fa-user-shield" title="Güvenli Giriş">
                OTP (One-Time Password) sistemi, ilk girişinizde hesabınızın size ait olduğunu
                doğrular. Bu sayede yetkisiz erişimler engellenir.
              </InfoBox>
              <InfoBox variant="info" icon="fas fa-shield-alt" title="Şifre Güvenliği">
                Şifrenizi kimseyle paylaşmayın ve düzenli olarak değiştirin. Passgage şifrenizi
                asla size sormaz veya talep etmez.
              </InfoBox>
            </div>
          </section>

          {/* STEP 4: Cihaz Eşleştirme */}
          <section id="device-pairing" aria-labelledby="device-pairing-title" className="mb-20 md:mb-28 lg:mb-32 scroll-mt-24">
            <div className="flex flex-col sm:flex-row items-start gap-4 sm:gap-6 mb-10 md:mb-12">
              <div
                className="flex-shrink-0 w-14 h-14 sm:w-16 sm:h-16 text-white rounded-xl sm:rounded-2xl flex items-center justify-center text-xl sm:text-2xl font-bold shadow-medium"
                style={{ background: 'linear-gradient(135deg, #FF501D 0%, #FFD700 100%)' }}
              >
                4
              </div>
              <div className="flex-1">
                <h2 id="device-pairing-title" className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-neutral-900 mb-2 md:mb-3 leading-tight">
                  <a href="#device-pairing" className="no-underline hover:opacity-80 transition-opacity">
                    Cihaz{' '}
                    <span
                      style={{
                        background: 'linear-gradient(135deg, #FF501D 0%, #FFD700 100%)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        backgroundClip: 'text',
                      }}
                    >
                      Eşleştirme
                    </span>
                  </a>
                </h2>
                <p className="text-base sm:text-lg md:text-xl text-neutral-600">
                  Telefonunuzu hesabınızla eşleştirin
                </p>
              </div>
            </div>

            {/* Substep 4.1: Eşleştirme İsteği */}
            <div className="grid grid-cols-1 md:grid-cols-[380px_1fr] lg:grid-cols-[420px_1fr] gap-8 md:gap-12 mb-16">
              <PhoneMockup
                imageSrc="/screenshots/android/step4-device-pairing.jpg"
                alt="Cihaz eşleştirme ekranı"
                platform="android"
              />
              <div className="flex flex-col justify-center">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-android-green rounded-xl flex items-center justify-center">
                    <i className="fas fa-mobile-alt text-white text-xl"></i>
                  </div>
                  <h4 className="text-2xl font-bold text-neutral-900">1. Eşleştirme İsteği Gönderin</h4>
                </div>
                <p className="text-neutral-700 mb-4 text-lg leading-relaxed">
                  Giriş yaptıktan sonra sistem otomatik olarak cihazınızı eşleştirmek için bir
                  istek gönderir. <strong className="text-android-green">&quot;Eşleştir&quot;</strong>{' '}
                  butonuna tıklayın.
                </p>
                <p className="text-neutral-600 text-sm bg-blue-50 border-l-4 border-blue-500 p-4 rounded">
                  💡 Her kullanıcı aynı anda sadece bir cihazla eşleştirilebilir. Yeni cihaz
                  eklediğinizde eski cihazınız otomatik olarak kaldırılır.
                </p>
              </div>
            </div>

            {/* Substep 4.2: SMS Doğrulama */}
            <div className="grid grid-cols-1 md:grid-cols-[380px_1fr] lg:grid-cols-[420px_1fr] gap-8 md:gap-12 mb-16">
              <PhoneMockup
                imageSrc="/screenshots/android/step4-add-device.jpg"
                alt="SMS doğrulama ekranı"
                platform="android"
              />
              <div className="flex flex-col justify-center">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-android-green rounded-xl flex items-center justify-center">
                    <i className="fas fa-sms text-white text-xl"></i>
                  </div>
                  <h4 className="text-2xl font-bold text-neutral-900">2. SMS ile Doğrulama Yapın</h4>
                </div>
                <p className="text-neutral-700 mb-4 text-lg leading-relaxed">
                  Telefonunuza gelen{' '}
                  <strong className="text-android-green">doğrulama kodunu</strong> girerek
                  eşleştirme işlemini onaylayın.
                </p>
                <p className="text-neutral-600 text-sm bg-amber-50 border-l-4 border-amber-500 p-4 rounded">
                  ⚠️ SMS gelmediyse, telefon numaranızın sistemde doğru kayıtlı olduğundan emin
                  olun ve &quot;Tekrar Gönder&quot; butonunu deneyin.
                </p>
              </div>
            </div>

            {/* Substep 4.3: Eşleştirme Tamamlandı */}
            <div className="grid grid-cols-1 md:grid-cols-[380px_1fr] lg:grid-cols-[420px_1fr] gap-8 md:gap-12 mb-16">
              <PhoneMockup
                imageSrc="/screenshots/android/step4-connected-devices.jpg"
                alt="Eşleştirilmiş cihazlar ekranı"
                platform="android"
              />
              <div className="flex flex-col justify-center">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-android-green rounded-xl flex items-center justify-center">
                    <i className="fas fa-check-circle text-white text-xl"></i>
                  </div>
                  <h4 className="text-2xl font-bold text-neutral-900">3. Eşleştirme Tamamlandı!</h4>
                </div>
                <p className="text-neutral-700 mb-4 text-lg leading-relaxed">
                  Tebrikler! Cihazınız başarıyla eşleştirildi. Artık Passgage&apos;ı kullanmaya
                  başlayabilirsiniz.
                </p>
                <div className="bg-green-50 border-l-4 border-green-500 p-4 rounded">
                  <p className="text-sm text-green-800">
                    <i className="fas fa-info-circle mr-2"></i>
                    <strong>Bilgi:</strong> Eşleştirilmiş cihazlarınızı ayarlar menüsünden
                    kontrol edebilir ve yönetebilirsiniz.
                  </p>
                </div>
              </div>
            </div>

            {/* Security Info Box */}
            <InfoBox variant="info" icon="fas fa-shield-alt" title="Güvenlik">
              💡 Yeni bir cihaz eşleştirdiğinizde, önceki cihazınızın erişimi otomatik olarak iptal
              edilir. Bu, hesabınızın güvenliğini sağlar.
            </InfoBox>
          </section>

          {/* STEP 5: NFC Kurulumu */}
          <section id="nfc-setup" aria-labelledby="nfc-setup-title" className="mb-20 md:mb-28 lg:mb-32 scroll-mt-24">
            <div className="flex flex-col sm:flex-row items-start gap-4 sm:gap-6 mb-10 md:mb-12">
              <div
                className="flex-shrink-0 w-14 h-14 sm:w-16 sm:h-16 text-white rounded-xl sm:rounded-2xl flex items-center justify-center text-xl sm:text-2xl font-bold shadow-medium"
                style={{ background: 'linear-gradient(135deg, #FF501D 0%, #FFD700 100%)' }}
              >
                5
              </div>
              <div className="flex-1">
                <h2 id="nfc-setup-title" className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-neutral-900 mb-2 md:mb-3 leading-tight">
                  <a href="#nfc-setup" className="no-underline hover:opacity-80 transition-opacity">
                    NFC{' '}
                    <span
                      style={{
                        background: 'linear-gradient(135deg, #FF501D 0%, #FFD700 100%)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        backgroundClip: 'text',
                    }}
                    >
                      Kurulumu
                    </span>
                  </a>
                </h2>
                <p className="text-base sm:text-lg md:text-xl text-neutral-600">
                  Üretici bazlı NFC aktivasyon talimatları
                </p>
              </div>
            </div>

            {/* Green Message Box */}
            <div
              className="relative rounded-3xl p-12 mb-12 text-center overflow-hidden"
              style={{
                background: 'linear-gradient(135deg, #3DDC84 0%, #34a853 100%)',
                color: 'white',
              }}
            >
              {/* Radial gradient overlay */}
              <div
                className="absolute inset-0"
                style={{
                  background:
                    'radial-gradient(circle at 30% 50%, rgba(255, 255, 255, 0.15), transparent 60%)',
                  pointerEvents: 'none',
                }}
              />

              <div className="relative z-10">
                <i className="fab fa-android text-6xl mb-6 opacity-90"></i>
                <h3 className="text-3xl font-bold mb-4">
                  Android&apos;de NFC Manuel Aktivasyon Gerektirir
                </h3>
                <p className="text-lg text-white/95 max-w-3xl mx-auto leading-relaxed">
                  iOS&apos;tan farklı olarak Android cihazlarda NFC özelliğini manuel olarak açmanız
                  gerekmektedir. Aşağıdaki üretici özel talimatları takip ederek NFC&apos;yi aktif
                  hale getirebilirsiniz.
                </p>
              </div>
            </div>

            {/* Manufacturer Accordion */}
            <Accordion
              items={nfcManufacturerSteps}
              allowMultiple={false}
              defaultOpenIndex={0}
              platform="android"
            />

            {/* NFC Info Box */}
            <div className="mt-12">
              <InfoBox variant="info" icon="fas fa-info-circle" title="NFC Sensör Konumu">
                NFC sensörü genellikle telefonun arka kısmının üst veya orta bölümünde bulunur.
                Okuyucuya 1-2 cm mesafede tutmanız yeterlidir. Telefon kılıfınız metal ise NFC
                sinyalini engelleyebilir.
              </InfoBox>
            </div>
          </section>

          {/* STEP 6: Troubleshooting (Existing but updated) */}
          <section id="troubleshooting" aria-labelledby="troubleshooting-title" className="mb-20 md:mb-28 lg:mb-32 scroll-mt-24">
            <div className="flex flex-col sm:flex-row items-start gap-4 sm:gap-6 mb-10 md:mb-12">
              <div
                className="flex-shrink-0 w-14 h-14 sm:w-16 sm:h-16 text-white rounded-xl sm:rounded-2xl flex items-center justify-center text-xl sm:text-2xl font-bold shadow-medium"
                style={{ background: 'linear-gradient(135deg, #FF501D 0%, #FFD700 100%)' }}
              >
                6
              </div>
              <div className="flex-1">
                <h2 id="troubleshooting-title" className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-neutral-900 mb-2 md:mb-3 leading-tight">
                  <a href="#troubleshooting" className="no-underline hover:opacity-80 transition-opacity">
                    Sorun{' '}
                    <span
                      style={{
                        background: 'linear-gradient(135deg, #f59e0b 0%, #fb923c 100%)',
                        WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      backgroundClip: 'text'
                    }}
                    >
                      Giderme
                    </span>
                  </a>
                </h2>
                <p className="text-xl text-neutral-600">Android'e özel sorunlar ve çözümleri</p>
              </div>
            </div>

            <Accordion items={troubleshootingItems} />

            {/* Yellow Warning Box - Sorun Devam Ediyorsa */}
            <div
              className="rounded-3xl p-8 mt-12"
              style={{
                background: 'linear-gradient(135deg, rgba(245, 158, 11, 0.1) 0%, rgba(251, 191, 36, 0.1) 100%)',
                borderLeft: '6px solid #f59e0b'
              }}
            >
              <div className="flex items-start gap-4">
                <i className="fas fa-lightbulb text-amber-600 text-3xl"></i>
                <div>
                  <h5 className="text-xl font-bold text-amber-900 mb-2">
                    Sorun Devam Ediyorsa
                  </h5>
                  <p className="text-neutral-700 mb-4">
                    Uygulamayı kapatıp tekrar açın, telefonu yeniden başlatın,
                    uygulamayı yeniden yükleyin veya destek ekibiyle iletişime geçin.
                  </p>
                  <a
                    href="mailto:deneyim@passgage.com"
                    className="text-passgage-red font-semibold hover:underline"
                  >
                    deneyim@passgage.com
                  </a>
                </div>
              </div>
            </div>
          </section>
        </div>

        {/* Cross-Links to Other Guides */}
        <CrossLinks currentPlatform="android" />

        {/* Contact Section (Before Footer) */}
        <section className="py-20 px-6 bg-neutral-50">
          <div className="max-w-4xl mx-auto text-center">
            <div
              className="w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-6"
              style={{ background: 'linear-gradient(135deg, #FF501D 0%, #FFD700 100%)' }}
            >
              <i className="fas fa-headset text-white text-3xl"></i>
            </div>
            <h2 className="text-4xl font-bold text-neutral-900 mb-4">
              Yardıma mı{' '}
              <span
                style={{
                  background: 'linear-gradient(135deg, #FF501D 0%, #FFD700 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text'
                }}
              >
                İhtiyacınız Var?
              </span>
            </h2>
            <p className="text-lg text-neutral-600 mb-8 leading-relaxed">
              Sorularınız, geri bildirimleriniz veya önerileriniz için bizimle iletişime geçebilirsiniz
            </p>
            <a
              href="mailto:deneyim@passgage.com"
              onClick={() => {
                if (typeof window !== 'undefined' && (window as any).gtag) {
                  (window as any).gtag('event', 'contact_click', {
                    event_category: 'engagement',
                    event_label: 'Android Guide - Email Contact',
                  });
                }
              }}
              className="inline-flex items-center gap-3 px-8 py-4 rounded-full text-white font-bold text-base sm:text-lg shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300 w-full sm:w-auto justify-center"
              style={{
                background: 'linear-gradient(135deg, #FF501D 0%, #FFD700 100%)'
              }}
            >
              <i className="fas fa-envelope"></i>
              deneyim@passgage.com
            </a>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
