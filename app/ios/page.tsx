'use client';

import Header from '@/components/layout/Header';
import Hero from '@/components/layout/Hero';
import Footer from '@/components/layout/Footer';
import { PhoneMockup, InfoBox, Accordion } from '@/components/guide';
import type { AccordionItem } from '@/components/guide';
import { generateCombinedFAQSchema } from '@/lib/seo';

export default function IOSGuidePage() {

  // Progress navigation steps with descriptive IDs
  const iosSteps = [
    { id: 'install-app', number: 1, label: 'Uygulamayı indirin' },
    { id: 'permissions', number: 2, label: 'Gerekli izinleri verin' },
    { id: 'login-password', number: 3, label: 'Giriş yapın ve şifre oluşturun' },
    { id: 'device-pairing', number: 4, label: 'Cihaz eşleştirme' },
    { id: 'nfc-setup', number: 5, label: 'NFC kurulumu' },
    { id: 'troubleshooting', number: 6, label: 'Sorun giderme' },
  ];

  // HowTo Schema for SEO
  const iosHowToSchema = {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    'name': 'Passgage iOS Kurulum Rehberi',
    'description': 'iPhone ve iPad için Passgage şifresiz giriş uygulamasını adım adım kurma kılavuzu. NFC ayarları, izinler, cihaz eşleştirme ve sorun giderme rehberi.',
    'image': 'https://kilavuz.passgage.com/logo.png',
    'estimatedCost': {
      '@type': 'MonetaryAmount',
      'currency': 'TRY',
      'value': '0'
    },
    'totalTime': 'PT15M',
    'tool': [
      {
        '@type': 'HowToTool',
        'name': 'iPhone veya iPad (iPhone 7+, iOS 13+)'
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
      }
    ],
    'step': [
      {
        '@type': 'HowToStep',
        'position': 1,
        'name': 'Uygulamayı İndirin',
        'text': 'App Store\'dan Passgage uygulamasını ücretsiz indirin. iOS 13.0 veya üstü gereklidir. Uygulama iPhone 7 ve üstü modellerde çalışır.',
        'url': 'https://kilavuz.passgage.com/ios#install-app',
        'image': 'https://kilavuz.passgage.com/logo.png'
      },
      {
        '@type': 'HowToStep',
        'position': 2,
        'name': 'Gerekli İzinleri Verin',
        'text': 'Konum, kamera ve bildirim izinlerini aktifleştirin. Ayarlar → Gizlilik ve Güvenlik menüsünden Passgage uygulamasına gerekli izinleri verin. Konum izni giriş-çıkış kayıtları için, kamera izni QR kod okutma için, bildirim izni güncellemeler için gereklidir.',
        'url': 'https://kilavuz.passgage.com/ios#permissions',
        'image': 'https://kilavuz.passgage.com/screenshots/ios/step2-location-permission.jpg'
      },
      {
        '@type': 'HowToStep',
        'position': 3,
        'name': 'Giriş Yapın ve Şifre Oluşturun',
        'text': 'Şifre Al butonuna tıklayın. Şirket e-posta adresinizi veya telefon numaranızı girin. Size gönderilen 6 haneli OTP kodunu girin. Güvenli bir şifre oluşturun (minimum 8 karakter, en az 1 büyük harf, 1 küçük harf ve 1 rakam içermeli).',
        'url': 'https://kilavuz.passgage.com/ios#login-password',
        'image': 'https://kilavuz.passgage.com/screenshots/ios/step3-1-login-screen.jpg'
      },
      {
        '@type': 'HowToStep',
        'position': 4,
        'name': 'Cihaz Eşleştirme',
        'text': 'Eşleştir butonuna tıklayın. iPhone\'unuza gelen SMS doğrulama kodunu girerek eşleştirme işlemini onaylayın. Her kullanıcı aynı anda sadece bir cihazla eşleştirilebilir.',
        'url': 'https://kilavuz.passgage.com/ios#device-pairing',
        'image': 'https://kilavuz.passgage.com/screenshots/ios/step4-device-pairing.jpg'
      },
      {
        '@type': 'HowToStep',
        'position': 5,
        'name': 'NFC Kurulumu',
        'text': 'iOS 13 ve sonrası cihazlarda NFC otomatik olarak etkindir. iPhone 7 ve üstü modeller NFC destekler. NFC etiket okumak için iPhone\'un üst kısmını (kamera bölgesi) etikete yaklaştırın. iOS 14 ve sonrasında arka planda otomatik NFC okuma özelliği vardır.',
        'url': 'https://kilavuz.passgage.com/ios#nfc-setup',
        'image': 'https://kilavuz.passgage.com/logo.png'
      },
      {
        '@type': 'HowToStep',
        'position': 6,
        'name': 'Sorun Giderme',
        'text': 'Yaygın sorunlar ve çözümleri: Uygulama açılmıyorsa Safari önbelleğini temizleyin. Giriş yapamıyorsanız internet bağlantınızı kontrol edin. Bildirimler gelmiyorsa Ayarlar → Bildirimler → Safari → Passgage yolunu izleyin. NFC çalışmıyorsa iPhone modelinizin NFC desteklediğinden emin olun.',
        'url': 'https://kilavuz.passgage.com/ios#troubleshooting',
        'image': 'https://kilavuz.passgage.com/logo.png'
      }
    ]
  };

  // NFC Troubleshooting Accordion
  const nfcTroubleshootingItems: AccordionItem[] = [
    {
      id: 'nfc-not-working',
      question: 'NFC Çalışmıyor',
      answer: (
        <div className="space-y-4">
          <p className="text-neutral-700 font-semibold mb-3">Aşağıdaki adımları sırayla deneyin:</p>
          <ol className="list-decimal list-inside space-y-3 text-neutral-700">
            <li>iPhone modeli NFC destekliyor mu kontrol edin (iPhone 7 ve üstü)</li>
            <li>iOS sürümü 13.0 veya üstü olmalı (Ayarlar → Genel → Yazılım Güncelleme)</li>
            <li>Airplane Mode kapalı olmalı</li>
            <li>Kart/etiketi iPhone'un üst kısmına (kameranın yanına) yaklaştırın</li>
            <li>iPhone'u yeniden başlatın</li>
          </ol>
          <div className="mt-4 p-4 bg-blue-50 border-l-4 border-blue-500 rounded-r-xl">
            <p className="text-sm text-blue-900">
              <strong>iPhone 12 ve sonrası:</strong> NFC anteni iPhone'un arka yüzeyinin üst kısmındadır.
            </p>
          </div>
        </div>
      ),
    },
    {
      id: 'background-tag-reading',
      question: 'Arka Planda NFC Okuma',
      answer: (
        <div className="space-y-4">
          <p className="text-neutral-700">
            iOS 14 ve sonrası cihazlarda, NFC etiketleri arka planda otomatik okunabilir.
          </p>
          <div className="inline-block bg-gray-100 px-4 py-2 rounded-lg font-mono text-sm text-gray-800 my-2">
            Ayarlar <span className="text-gray-500 mx-2">→</span> Genel <span className="text-gray-500 mx-2">→</span> NFC <span className="text-gray-500 mx-2">→</span> Açık
          </div>
          <p className="text-sm text-neutral-600">
            Bu özellik kapalıysa, ekran kilitliyken NFC etiketleri okunamaz.
          </p>
        </div>
      ),
    },
  ];

  // General Troubleshooting Accordion
  const troubleshootingItems: AccordionItem[] = [
    {
      id: 'app-not-loading',
      question: 'Uygulama Açılmıyor',
      answer: (
        <div className="space-y-4">
          <p className="text-neutral-700 font-semibold mb-3">Çözüm adımları:</p>
          <ol className="list-decimal list-inside space-y-2 text-neutral-700">
            <li>Safari tarayıcısını kapatın ve tekrar açın</li>
            <li>Safari önbelleğini temizleyin: Ayarlar → Safari → Geçmişi ve Web Sitesi Verilerini Temizle</li>
            <li>iPhone'u yeniden başlatın</li>
            <li>iOS sürümünüzü kontrol edin (en az iOS 13.0 gerekli)</li>
            <li>Safari'nin güncel olduğundan emin olun</li>
          </ol>
        </div>
      ),
    },
    {
      id: 'login-issues',
      question: 'Giriş Yapamıyorum',
      answer: (
        <div className="space-y-4">
          <p className="text-neutral-700">Giriş sorunları için:</p>
          <ol className="list-decimal list-inside space-y-2 text-neutral-700">
            <li>Kullanıcı adı ve şifrenizi doğru girdiğinizden emin olun</li>
            <li>Caps Lock kapalı olmalı</li>
            <li>İnternet bağlantınızı kontrol edin (Wi-Fi veya hücresel veri)</li>
            <li>Şifrenizi unuttuysanız, "Şifremi Unuttum" linkine tıklayın</li>
            <li>Sorun devam ederse, sistem yöneticinizle iletişime geçin</li>
          </ol>
        </div>
      ),
    },
    {
      id: 'notifications-not-working',
      question: 'Bildirimler Gelmiyor',
      answer: (
        <div className="space-y-4">
          <p className="text-neutral-700">Bildirim sorunları için kontrol listesi:</p>
          <ol className="list-decimal list-inside space-y-2 text-neutral-700">
            <li>Ayarlar → Bildirimler → Safari → Bildirimlere İzin Ver (Açık)</li>
            <li>Ayarlar → Safari → Bildirimler → passgage.com (İzin Ver)</li>
            <li>Odak Modu (Focus Mode) kapalı olmalı</li>
            <li>Rahatsız Etmeyin (Do Not Disturb) kapalı olmalı</li>
            <li>Safari'de bildirimleri engellemiş olabilirsiniz, site ayarlarından kontrol edin</li>
          </ol>
        </div>
      ),
    },
  ];

  // Generate FAQPage Schema from troubleshooting sections
  const iosFAQSchema = generateCombinedFAQSchema(
    [nfcTroubleshootingItems, troubleshootingItems],
    'https://kilavuz.passgage.com',
    'https://kilavuz.passgage.com/ios'
  );

  // BreadcrumbList Schema for navigation
  const iosBreadcrumbSchema = {
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
        'name': 'iOS Kurulum Rehberi',
        'item': 'https://kilavuz.passgage.com/ios'
      }
    ]
  };

  return (
    <>
      {/* HowTo Schema JSON-LD for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(iosHowToSchema) }}
      />

      {/* FAQPage Schema JSON-LD for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(iosFAQSchema) }}
      />

      {/* BreadcrumbList Schema JSON-LD for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(iosBreadcrumbSchema) }}
      />

      {/* Standard Header Component */}
      <Header
        isGuide={true}
        progressSteps={iosSteps}
      />

      <main itemScope itemType="https://schema.org/HowTo">
        {/* AI-readable semantic metadata */}
        <meta itemProp="name" content="Passgage iOS Installation Guide" />
        <meta itemProp="inLanguage" content="tr" />
        <meta itemProp="genre" content="Technical Documentation" />
        <meta itemProp="audience" content="iPhone and iPad users" />
        <meta itemProp="educationalLevel" content="Beginner" />
        <meta itemProp="timeRequired" content="PT15M" />
        <meta itemProp="keywords" content="iOS, iPhone, iPad, Passgage, kurulum, NFC, Safari, giriş" />

        {/* Hero Section */}
        <Hero
          icon={<i className="fab fa-apple"></i>}
          titleBefore="Passgage"
          titleHighlight="iOS"
          titleAfter="Kurulumu"
          description="iPhone ve iPad için detaylı kurulum adımları, Safari ayarları ve sorun giderme rehberi."
          primaryButtonText="Başlayalım"
          primaryButtonHref="#install-app"
          secondaryButtonText="Sorun Giderme"
          secondaryButtonHref="#troubleshooting"
        />

        {/* Main Content */}
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-16 md:py-20 lg:py-24">
          {/* Step 1: Uygulamayı İndirin */}
          <section id="install-app" aria-labelledby="install-app-title" className="mb-20 md:mb-28 lg:mb-32 scroll-mt-24">
            <div className="flex flex-col sm:flex-row items-start gap-4 sm:gap-6 mb-10 md:mb-12">
              <div
                className="flex-shrink-0 w-14 h-14 sm:w-16 sm:h-16 text-white rounded-xl sm:rounded-2xl flex items-center justify-center text-2xl sm:text-3xl font-bold shadow-medium"
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
                <p className="text-base sm:text-lg md:text-xl text-neutral-600">App Store'dan ücretsiz indirin</p>
              </div>
            </div>

            <div className="max-w-xl mx-auto mb-12">
              {/* App Store */}
              <a
                href="https://apps.apple.com/tr/app/passgage/id6738549848"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => {
                  if (typeof window !== 'undefined' && (window as any).gtag) {
                    (window as any).gtag('event', 'download_click', {
                      event_category: 'engagement',
                      event_label: 'iOS - App Store',
                      platform: 'ios'
                    });
                  }
                }}
                className="bg-white rounded-3xl shadow-card hover:shadow-hover transition-all duration-300 p-8 hover:-translate-y-2 no-underline block group"
              >
                <div
                  className="w-16 h-16 rounded-2xl flex items-center justify-center text-white text-3xl mb-6"
                  style={{ background: 'linear-gradient(to bottom right, #1d1d1f, #3a3a3c)' }}
                >
                  <i className="fab fa-apple" />
                </div>
                <h3 className="text-2xl font-bold text-neutral-900 mb-3">Apple App Store</h3>
                <p className="text-neutral-600 mb-4">iPhone ve iPad için resmi mağaza</p>
                <div className="flex items-center gap-2 text-ios-black font-semibold group-hover:gap-3 transition-all">
                  <span>Ücretsiz İndir</span>
                  <i className="fas fa-arrow-right" />
                </div>
              </a>
            </div>

            <div className="space-y-8 md:space-y-10">
              <InfoBox
                icon="fas fa-info-circle"
                title="Sistem Gereksinimleri"
                variant="info"
              >
                <ul className="space-y-2 text-neutral-700">
                  <li className="flex items-start gap-2">
                    <i className="fas fa-check-circle text-sky-600 mt-1 flex-shrink-0"></i>
                    <span><strong>iOS Sürümü:</strong> iOS 13.0 veya üstü</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <i className="fas fa-check-circle text-sky-600 mt-1 flex-shrink-0"></i>
                    <span><strong>Desteklenen Cihazlar:</strong> iPhone 7 ve üstü, iPad Pro, iPad Air, iPad mini</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <i className="fas fa-check-circle text-sky-600 mt-1 flex-shrink-0"></i>
                    <span><strong>Gerekli Alan:</strong> Yaklaşık 50 MB</span>
                  </li>
                </ul>
              </InfoBox>
            </div>
          </section>

          {/* Step 2: Gerekli İzinleri Verin */}
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
                  iOS ayarlarından izinleri aktifleştirin
                </p>
              </div>
            </div>

            {/* Substep 2.1: Konum İzni */}
            <div className="grid grid-cols-1 md:grid-cols-[380px_1fr] lg:grid-cols-[420px_1fr] gap-8 md:gap-12 mb-16">
              <PhoneMockup
                imageSrc="/screenshots/ios/step2-location-permission.jpg"
                alt="Konum izni ekranı"
                platform="ios"
              />
              <div className="flex flex-col justify-center">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-ios-black rounded-xl flex items-center justify-center">
                    <i className="fas fa-map-marker-alt text-white text-xl"></i>
                  </div>
                  <h4 className="text-2xl font-bold text-neutral-900">1. Konum İzni</h4>
                </div>
                <p className="text-neutral-700 mb-6 text-lg leading-relaxed">
                  Giriş-çıkış kayıtlarını doğru konumda yapmak için konum iznini vermeniz gerekir.
                </p>
                <div className="inline-block bg-gray-100 px-4 py-3 rounded-lg font-mono text-sm text-gray-800 my-2">
                  Ayarlar <span className="text-gray-500 mx-2">→</span> Gizlilik ve Güvenlik{' '}
                  <span className="text-gray-500 mx-2">→</span> Konum Servisleri{' '}
                  <span className="text-gray-500 mx-2">→</span> Passgage
                </div>
                <p className="text-neutral-600 text-sm mt-4 bg-blue-50 border-l-4 border-blue-500 p-4 rounded">
                  💡 <strong>Önemli:</strong> &quot;Uygulamayı Kullanırken&quot; veya &quot;Her Zaman&quot; seçeneğini işaretleyin.
                  Bu, uygulamanın konum bilgisi alabilmesini sağlar.
                </p>
              </div>
            </div>

            {/* Substep 2.2: Kamera İzni */}
            <div className="grid grid-cols-1 md:grid-cols-[380px_1fr] lg:grid-cols-[420px_1fr] gap-8 md:gap-12 mb-16">
              <PhoneMockup
                imageSrc="/screenshots/ios/step2-camera-permission.jpg"
                alt="Kamera izni ekranı"
                platform="ios"
              />
              <div className="flex flex-col justify-center">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-ios-black rounded-xl flex items-center justify-center">
                    <i className="fas fa-camera text-white text-xl"></i>
                  </div>
                  <h4 className="text-2xl font-bold text-neutral-900">2. Kamera İzni</h4>
                </div>
                <p className="text-neutral-700 mb-6 text-lg leading-relaxed">
                  QR kod okutmak ve fotoğraf çekmek için kamera iznine ihtiyaç vardır.
                </p>
                <div className="inline-block bg-gray-100 px-4 py-3 rounded-lg font-mono text-sm text-gray-800 my-2">
                  Ayarlar <span className="text-gray-500 mx-2">→</span> Gizlilik ve Güvenlik{' '}
                  <span className="text-gray-500 mx-2">→</span> Kamera{' '}
                  <span className="text-gray-500 mx-2">→</span> Passgage
                </div>
                <p className="text-neutral-600 text-sm mt-4 bg-blue-50 border-l-4 border-blue-500 p-4 rounded">
                  💡 <strong>Öneri:</strong> Kamera izni sadece QR kod okutma sırasında kullanılır.
                </p>
              </div>
            </div>

            {/* Substep 2.3: Bildirim İzni */}
            <div className="grid grid-cols-1 md:grid-cols-[380px_1fr] lg:grid-cols-[420px_1fr] gap-8 md:gap-12 mb-16">
              <PhoneMockup
                imageSrc="/screenshots/ios/step2-notification-permission.jpg"
                alt="Bildirim izni ekranı"
                platform="ios"
              />
              <div className="flex flex-col justify-center">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-ios-black rounded-xl flex items-center justify-center">
                    <i className="fas fa-bell text-white text-xl"></i>
                  </div>
                  <h4 className="text-2xl font-bold text-neutral-900">3. Bildirim İzni</h4>
                </div>
                <p className="text-neutral-700 mb-6 text-lg leading-relaxed">
                  Önemli güncellemeler ve hatırlatmalar için bildirim iznine ihtiyaç vardır.
                </p>
                <div className="inline-block bg-gray-100 px-4 py-3 rounded-lg font-mono text-sm text-gray-800 my-2">
                  Ayarlar <span className="text-gray-500 mx-2">→</span> Bildirimler{' '}
                  <span className="text-gray-500 mx-2">→</span> Passgage
                </div>
                <p className="text-neutral-600 text-sm mt-4 bg-blue-50 border-l-4 border-blue-500 p-4 rounded">
                  💡 <strong>Bilgi:</strong> Kritik Uyarılar özelliğini açmanız önerilir. Bu, acil
                  bildirimlerin Sessiz Mod&apos;da bile gelmesin sağlar.
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

          {/* Step 3: Giriş Yapın ve Şifre Oluşturun */}
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
                imageSrc="/screenshots/ios/step3-1-login-screen.jpg"
                alt="Giriş ekranı"
                platform="ios"
              />
              <div className="flex flex-col justify-center">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-ios-black rounded-xl flex items-center justify-center">
                    <i className="fas fa-key text-white text-xl"></i>
                  </div>
                  <h4 className="text-2xl font-bold text-neutral-900">1. Şifre Al Butonuna Tıklayın</h4>
                </div>
                <p className="text-neutral-700 mb-4 text-lg leading-relaxed">
                  Uygulamayı açtığınızda karşınıza gelen giriş ekranında{' '}
                  <strong className="text-passgage-blue">&quot;Şifre Al&quot;</strong> butonuna
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
                imageSrc="/screenshots/ios/step3-2-account-verification.jpg"
                alt="Hesap doğrulama ekranı"
                platform="ios"
              />
              <div className="flex flex-col justify-center">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-ios-black rounded-xl flex items-center justify-center">
                    <i className="fas fa-envelope text-white text-xl"></i>
                  </div>
                  <h4 className="text-2xl font-bold text-neutral-900">
                    2. E-posta veya Telefon Numarası Girin
                  </h4>
                </div>
                <p className="text-neutral-700 mb-4 text-lg leading-relaxed">
                  Şirket e-posta adresinizi veya telefon numaranızı girin. Sistem size bir{' '}
                  <strong className="text-passgage-blue">6 haneli OTP kodu</strong> gönderecektir.
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
                imageSrc="/screenshots/ios/step3-3-otp-entry.jpg"
                alt="OTP kod girişi ekranı"
                platform="ios"
              />
              <div className="flex flex-col justify-center">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-ios-black rounded-xl flex items-center justify-center">
                    <i className="fas fa-mobile-alt text-white text-xl"></i>
                  </div>
                  <h4 className="text-2xl font-bold text-neutral-900">3. OTP Kodunu Girin</h4>
                </div>
                <p className="text-neutral-700 mb-4 text-lg leading-relaxed">
                  E-posta veya SMS ile gelen <strong className="text-passgage-blue">6 haneli kodu</strong>{' '}
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
                imageSrc="/screenshots/ios/step3-4-set-password.jpg"
                alt="Şifre oluşturma ekranı"
                platform="ios"
              />
              <div className="flex flex-col justify-center">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-ios-black rounded-xl flex items-center justify-center">
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
                      <span className="text-passgage-blue">✓</span> Minimum 8 karakter
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="text-passgage-blue">✓</span> En az 1 büyük harf
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="text-passgage-blue">✓</span> En az 1 küçük harf
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="text-passgage-blue">✓</span> En az 1 rakam
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

          {/* Step 4: Cihaz Eşleştirme */}
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
                  iPhone'unuzu hesabınızla eşleştirin
                </p>
              </div>
            </div>

            {/* Substep 4.1: Eşleştirme İsteği */}
            <div className="grid grid-cols-1 md:grid-cols-[380px_1fr] lg:grid-cols-[420px_1fr] gap-8 md:gap-12 mb-16">
              <PhoneMockup
                imageSrc="/screenshots/ios/step4-device-pairing.jpg"
                alt="Cihaz eşleştirme ekranı"
                platform="ios"
              />
              <div className="flex flex-col justify-center">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-ios-black rounded-xl flex items-center justify-center">
                    <i className="fas fa-mobile-alt text-white text-xl"></i>
                  </div>
                  <h4 className="text-2xl font-bold text-neutral-900">1. Eşleştirme İsteği Gönderin</h4>
                </div>
                <p className="text-neutral-700 mb-4 text-lg leading-relaxed">
                  Giriş yaptıktan sonra sistem otomatik olarak cihazınızı eşleştirmek için bir
                  istek gönderir. <strong className="text-passgage-blue">&quot;Eşleştir&quot;</strong>{' '}
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
                imageSrc="/screenshots/ios/step4-add-device.jpg"
                alt="SMS doğrulama ekranı"
                platform="ios"
              />
              <div className="flex flex-col justify-center">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-ios-black rounded-xl flex items-center justify-center">
                    <i className="fas fa-sms text-white text-xl"></i>
                  </div>
                  <h4 className="text-2xl font-bold text-neutral-900">2. SMS ile Doğrulama Yapın</h4>
                </div>
                <p className="text-neutral-700 mb-4 text-lg leading-relaxed">
                  iPhone'unuza gelen{' '}
                  <strong className="text-passgage-blue">doğrulama kodunu</strong> girerek
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
                imageSrc="/screenshots/ios/step4-connected-devices.jpg"
                alt="Eşleştirilmiş cihazlar ekranı"
                platform="ios"
              />
              <div className="flex flex-col justify-center">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-ios-black rounded-xl flex items-center justify-center">
                    <i className="fas fa-check-circle text-white text-xl"></i>
                  </div>
                  <h4 className="text-2xl font-bold text-neutral-900">3. Eşleştirme Tamamlandı!</h4>
                </div>
                <p className="text-neutral-700 mb-4 text-lg leading-relaxed">
                  Tebrikler! iPhone'unuz başarıyla eşleştirildi. Artık Passgage&apos;ı kullanmaya
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

          {/* Step 5: NFC Kurulumu */}
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
                    NFC Ayarlarını Yapın
                  </a>
                </h2>
                <p className="text-base md:text-lg text-neutral-600">
                  iPhone NFC özelliklerini kontrol edin
                </p>
              </div>
            </div>

            <div className="space-y-8 md:space-y-10">
              <InfoBox
                icon="fas fa-wifi"
                title="iOS NFC Desteği"
                variant="success"
              >
                <p className="mb-4">
                  <strong>iOS 13 ve sonrası</strong> cihazlarda NFC otomatik olarak etkindir.
                  Ayrı bir ayar yapmanıza gerek yoktur.
                </p>
                <div className="p-4 bg-white rounded-xl border border-green-200">
                  <h5 className="font-bold text-neutral-900 mb-2">NFC Destekleyen iPhone Modelleri:</h5>
                  <ul className="grid grid-cols-2 gap-2 text-sm text-neutral-700">
                    <li><i className="fas fa-check text-green-600 mr-2"></i>iPhone 7 ve üstü</li>
                    <li><i className="fas fa-check text-green-600 mr-2"></i>iPhone SE (2. nesil ve üstü)</li>
                    <li><i className="fas fa-check text-green-600 mr-2"></i>iPhone XR, XS, XS Max</li>
                    <li><i className="fas fa-check text-green-600 mr-2"></i>iPhone 11, 12, 13, 14, 15 serileri</li>
                  </ul>
                </div>
              </InfoBox>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="p-6 bg-neutral-50 rounded-2xl border border-neutral-200">
                  <h4 className="text-lg font-bold text-neutral-900 mb-3 flex items-center gap-2">
                    <i className="fas fa-mobile-alt text-blue-600"></i>
                    iOS 14 ve Sonrası
                  </h4>
                  <p className="text-sm text-neutral-700 mb-4">
                    Arka planda otomatik NFC okuma özelliği vardır.
                  </p>
                  <div className="inline-block bg-gray-100 px-4 py-2 rounded-lg font-mono text-sm text-gray-800">
                    Ayarlar <span className="text-gray-500 mx-2">→</span> Genel <span className="text-gray-500 mx-2">→</span> NFC <span className="text-gray-500 mx-2">→</span> Açık
                  </div>
                </div>

                <div className="p-6 bg-neutral-50 rounded-2xl border border-neutral-200">
                  <h4 className="text-lg font-bold text-neutral-900 mb-3 flex items-center gap-2">
                    <i className="fas fa-hand-pointer text-blue-600"></i>
                    NFC Etiket Okuma
                  </h4>
                  <p className="text-sm text-neutral-700 mb-4">
                    iPhone'u NFC etiketine yaklaştırın:
                  </p>
                  <ul className="space-y-2 text-sm text-neutral-700">
                    <li><i className="fas fa-check text-green-600 mr-2"></i>Ekran açık veya kilitli olabilir</li>
                    <li><i className="fas fa-check text-green-600 mr-2"></i>iPhone'un üst kısmını (kamera bölgesi) yaklaştırın</li>
                    <li><i className="fas fa-check text-green-600 mr-2"></i>Bildirim otomatik görünecektir</li>
                  </ul>
                </div>
              </div>

              {/* NFC Troubleshooting */}
              <div>
                <h3 className="text-xl md:text-2xl font-bold text-neutral-900 mb-4">
                  NFC Sorun Giderme
                </h3>
                <Accordion
                  items={nfcTroubleshootingItems}
                  platform="ios"
                />
              </div>
            </div>
          </section>

          {/* Step 6: Sorun Giderme */}
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
                <p className="text-xl text-neutral-600">iOS'e özel sorunlar ve çözümleri</p>
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
                    Uygulamayı kapatıp tekrar açın, iPhone'u yeniden başlatın,
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
                    event_label: 'iOS Guide - Email Contact',
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
