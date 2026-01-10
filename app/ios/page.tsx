'use client';

import Header from '@/components/layout/Header';
import Hero from '@/components/layout/Hero';
import Footer from '@/components/layout/Footer';
import { PhoneMockup, InfoBox, Accordion } from '@/components/guide';
import type { AccordionItem } from '@/components/guide';

export default function IOSGuidePage() {

  // Progress navigation steps
  const iosSteps = [
    { id: 'step1', number: 1, label: 'Uygulamayı indirin' },
    { id: 'step2', number: 2, label: 'Gerekli izinleri verin' },
    { id: 'step3', number: 3, label: 'Giriş yapın' },
    { id: 'step4', number: 4, label: 'NFC ayarlarını yapın' },
    { id: 'step5', number: 5, label: 'Bildirim ayarları' },
    { id: 'step6', number: 6, label: 'Konum servisleri' },
  ];

  // iOS App Permissions Accordion
  const appPermissionsItems: AccordionItem[] = [
    {
      id: 'camera',
      question: 'Kamera İzni',
      answer: (
        <div className="space-y-4">
          <p className="text-neutral-700">
            Passgage uygulaması QR kod okutmak için kamera iznine ihtiyaç duyar.
          </p>
          <div className="inline-block bg-gray-100 px-4 py-2 rounded-lg font-mono text-sm text-gray-800 my-2">
            Ayarlar <span className="text-gray-500 mx-2">→</span> Passgage <span className="text-gray-500 mx-2">→</span> Kamera <span className="text-gray-500 mx-2">→</span> İzin Ver
          </div>
          <p className="text-sm text-neutral-600">
            İlk QR kod okutma işleminde iOS otomatik olarak izin isteyecektir. "İzin Ver" seçeneğine dokunun.
          </p>
        </div>
      ),
    },
    {
      id: 'location',
      question: 'Konum İzni',
      answer: (
        <div className="space-y-4">
          <p className="text-neutral-700">
            GPS bazlı giriş/çıkış işlemleri için konum iznine ihtiyaç vardır.
          </p>
          <div className="inline-block bg-gray-100 px-4 py-2 rounded-lg font-mono text-sm text-gray-800 my-2">
            Ayarlar <span className="text-gray-500 mx-2">→</span> Passgage <span className="text-gray-500 mx-2">→</span> Konum <span className="text-gray-500 mx-2">→</span> Uygulama Kullanımda İken
          </div>
          <div className="mt-4 p-4 bg-amber-50 border-l-4 border-amber-500 rounded-r-xl">
            <p className="text-sm text-amber-900">
              <strong>Önemli:</strong> "Asla" seçeneği seçilmişse, Passgage konum bazlı özellikleri kullanamaz.
              "Kesin Konum" ayarını da açmanız önerilir.
            </p>
          </div>
        </div>
      ),
    },
    {
      id: 'notifications',
      question: 'Bildirim İzni',
      answer: (
        <div className="space-y-4">
          <p className="text-neutral-700">
            Giriş/çıkış, alarm ve vardiya bildirimleri için izin gereklidir.
          </p>
          <div className="inline-block bg-gray-100 px-4 py-2 rounded-lg font-mono text-sm text-gray-800 my-2">
            Ayarlar <span className="text-gray-500 mx-2">→</span> Bildirimler <span className="text-gray-500 mx-2">→</span> Passgage <span className="text-gray-500 mx-2">→</span> Bildirimlere İzin Ver
          </div>
          <p className="text-sm text-neutral-600">
            Passgage ilk açılışta bildirim izni isteyecektir. "İzin Ver" butonuna dokunun.
          </p>
        </div>
      ),
    },
  ];

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

  return (
    <>
      {/* Standard Header Component */}
      <Header
        isGuide={true}
        progressSteps={iosSteps}
      />

      <main>
        {/* Hero Section */}
        <Hero
          icon={<i className="fab fa-apple"></i>}
          titleBefore="Passgage"
          titleHighlight="iOS"
          titleAfter="Kurulumu"
          description="iPhone ve iPad için detaylı kurulum adımları, Safari ayarları ve sorun giderme rehberi."
          primaryButtonText="Başlayalım"
          primaryButtonHref="#step1"
          secondaryButtonText="Sorun Giderme"
          secondaryButtonHref="#step6"
        />

        {/* Main Content */}
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-16 md:py-20 lg:py-24">
          {/* Step 1: Uygulamayı İndirin */}
          <section id="step1" className="mb-20 md:mb-28 lg:mb-32 scroll-mt-24">
            <div className="flex flex-col sm:flex-row items-start gap-4 sm:gap-6 mb-10 md:mb-12">
              <div
                className="flex-shrink-0 w-14 h-14 sm:w-16 sm:h-16 text-white rounded-xl sm:rounded-2xl flex items-center justify-center text-2xl sm:text-3xl font-bold shadow-medium"
                style={{ background: 'linear-gradient(135deg, #FF501D 0%, #FFD700 100%)' }}
              >
                1
              </div>
              <div className="flex-1">
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-neutral-900 mb-2 md:mb-3 leading-tight">
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
          <section id="step2" className="mb-20 md:mb-28 lg:mb-32 scroll-mt-24">
            <div className="flex flex-col sm:flex-row items-start gap-4 sm:gap-6 mb-10 md:mb-12">
              <div
                className="flex-shrink-0 w-14 h-14 sm:w-16 sm:h-16 text-white rounded-xl sm:rounded-2xl flex items-center justify-center text-2xl sm:text-3xl font-bold shadow-medium"
                style={{ background: 'linear-gradient(135deg, #FF501D 0%, #FFD700 100%)' }}
              >
                2
              </div>
              <div className="flex-1">
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-neutral-900 mb-2 md:mb-3 leading-tight">
                  Gerekli İzinleri Verin
                </h2>
                <p className="text-base md:text-lg text-neutral-600">
                  Passgage uygulamasının iOS sistem izinlerini yapılandırın
                </p>
              </div>
            </div>

            <div className="space-y-8 md:space-y-10">
              <InfoBox
                icon="fas fa-shield-alt"
                title="Uygulama İzinleri"
                variant="gradient"
              >
                <p className="mb-4">
                  Passgage uygulamasının düzgün çalışması için kamera, konum ve bildirim izinlerine ihtiyaç vardır.
                  İlk kullanımda iOS otomatik olarak bu izinleri isteyecektir.
                </p>
                <p className="font-semibold">
                  Tüm izin isteklerine <strong>"İzin Ver"</strong> butonuna tıklayın.
                </p>
              </InfoBox>

              {/* App Permissions Accordion */}
              <div>
                <h3 className="text-xl md:text-2xl font-bold text-neutral-900 mb-4">
                  Uygulama İzin Detayları
                </h3>
                <Accordion
                  items={appPermissionsItems}
                  platform="ios"
                  defaultOpenIndex={0}
                />
              </div>

              <div className="p-6 md:p-8 bg-amber-50 border-l-4 border-amber-500 rounded-r-xl">
                <div className="flex gap-4 items-start">
                  <i className="fas fa-exclamation-triangle text-2xl md:text-3xl text-amber-600 flex-shrink-0 mt-1"></i>
                  <div>
                    <h4 className="text-lg md:text-xl font-bold text-amber-900 mb-2">Önemli Not</h4>
                    <p className="text-sm md:text-base text-amber-800 leading-relaxed">
                      Eğer herhangi bir izni yanlışlıkla <strong>"İzin Verme"</strong> olarak seçtiyseniz,
                      Ayarlar → Passgage bölümünden bu izinleri manuel olarak değiştirebilirsiniz.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Step 3: Giriş Yapın */}
          <section id="step3" className="mb-20 md:mb-28 lg:mb-32 scroll-mt-24">
            <div className="flex flex-col sm:flex-row items-start gap-4 sm:gap-6 mb-10 md:mb-12">
              <div
                className="flex-shrink-0 w-14 h-14 sm:w-16 sm:h-16 text-white rounded-xl sm:rounded-2xl flex items-center justify-center text-2xl sm:text-3xl font-bold shadow-medium"
                style={{ background: 'linear-gradient(135deg, #FF501D 0%, #FFD700 100%)' }}
              >
                3
              </div>
              <div className="flex-1">
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-neutral-900 mb-2 md:mb-3 leading-tight">
                  Giriş Yapın
                </h2>
                <p className="text-base md:text-lg text-neutral-600">
                  Kurumsal hesabınızla Passgage'e giriş yapın
                </p>
              </div>
            </div>

            <div className="space-y-8 md:space-y-10">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                {/* Phone Mockup - iPhone */}
                <div className="order-2 lg:order-1">
                  <PhoneMockup
                    type="iphone"
                    screenshotPlaceholder="ios-login-screen.png"
                  />
                  <p className="text-center text-sm text-neutral-500 mt-4">
                    Görsel: ios-login-screen.png
                  </p>
                </div>

                {/* Instructions */}
                <div className="order-1 lg:order-2 space-y-6">
                  <InfoBox
                    icon="fas fa-user-lock"
                    title="Kullanıcı Bilgileri"
                    variant="info"
                  >
                    <p className="mb-4">
                      Sistem yöneticiniz tarafından sağlanan kullanıcı adı ve şifrenizi girin.
                    </p>
                    <ul className="space-y-2 text-neutral-700">
                      <li className="flex items-start gap-2">
                        <i className="fas fa-check-circle text-sky-600 mt-1 flex-shrink-0"></i>
                        <span><strong>Kullanıcı Adı:</strong> Genellikle email adresiniz</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <i className="fas fa-check-circle text-sky-600 mt-1 flex-shrink-0"></i>
                        <span><strong>Şifre:</strong> İlk giriş için geçici şifrenizi kullanın</span>
                      </li>
                    </ul>
                  </InfoBox>

                  <div className="p-4 bg-blue-50 border border-blue-200 rounded-xl">
                    <p className="text-sm text-blue-900">
                      <i className="fas fa-info-circle mr-2"></i>
                      <strong>İpucu:</strong> İlk giriş sonrası şifrenizi değiştirmeniz istenecektir.
                      Güçlü bir şifre seçtiğinizden emin olun.
                    </p>
                  </div>

                  <div className="p-4 bg-amber-50 border border-amber-200 rounded-xl">
                    <p className="text-sm text-amber-900">
                      <i className="fas fa-key mr-2"></i>
                      <strong>Şifrenizi mi unuttunuz?</strong> Giriş ekranındaki "Şifremi Unuttum" linkine
                      tıklayın veya sistem yöneticinizle iletişime geçin.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Step 4: NFC Ayarlarını Yapın */}
          <section id="step4" className="mb-20 md:mb-28 lg:mb-32 scroll-mt-24">
            <div className="flex flex-col sm:flex-row items-start gap-4 sm:gap-6 mb-10 md:mb-12">
              <div
                className="flex-shrink-0 w-14 h-14 sm:w-16 sm:h-16 text-white rounded-xl sm:rounded-2xl flex items-center justify-center text-2xl sm:text-3xl font-bold shadow-medium"
                style={{ background: 'linear-gradient(135deg, #FF501D 0%, #FFD700 100%)' }}
              >
                4
              </div>
              <div className="flex-1">
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-neutral-900 mb-2 md:mb-3 leading-tight">
                  NFC Ayarlarını Yapın
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

          {/* Step 5: Bildirim Ayarları */}
          <section id="step5" className="mb-20 md:mb-28 lg:mb-32 scroll-mt-24">
            <div className="flex flex-col sm:flex-row items-start gap-4 sm:gap-6 mb-10 md:mb-12">
              <div
                className="flex-shrink-0 w-14 h-14 sm:w-16 sm:h-16 text-white rounded-xl sm:rounded-2xl flex items-center justify-center text-2xl sm:text-3xl font-bold shadow-medium"
                style={{ background: 'linear-gradient(135deg, #FF501D 0%, #FFD700 100%)' }}
              >
                5
              </div>
              <div className="flex-1">
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-neutral-900 mb-2 md:mb-3 leading-tight">
                  Bildirim Ayarları
                </h2>
                <p className="text-base md:text-lg text-neutral-600">
                  Passgage bildirimlerini yapılandırın
                </p>
              </div>
            </div>

            <div className="space-y-8 md:space-y-10">
              <InfoBox
                icon="fas fa-bell"
                title="Bildirim İzinleri"
                variant="info"
              >
                <p className="mb-4">
                  Passgage önemli olaylar (giriş/çıkış, alarm, vardiya değişiklikleri) için bildirim gönderir.
                </p>
                <p className="font-semibold text-sky-900">
                  Bildirimlerin düzgün çalışması için aşağıdaki ayarları yapın:
                </p>
              </InfoBox>

              <div className="space-y-6">
                <div className="p-6 bg-white rounded-2xl border-2 border-blue-200 shadow-card">
                  <h4 className="text-lg font-bold text-neutral-900 mb-4 flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-blue-100 flex items-center justify-center">
                      <i className="fas fa-cog text-blue-600"></i>
                    </div>
                    Sistem Bildirimleri
                  </h4>
                  <div className="inline-block bg-gray-100 px-4 py-2 rounded-lg font-mono text-sm text-gray-800 mb-4">
                    Ayarlar <span className="text-gray-500 mx-2">→</span> Bildirimler <span className="text-gray-500 mx-2">→</span> Safari <span className="text-gray-500 mx-2">→</span> Bildirimlere İzin Ver
                  </div>
                  <ul className="space-y-2 text-sm text-neutral-700">
                    <li className="flex items-start gap-2">
                      <i className="fas fa-check-circle text-blue-600 mt-1"></i>
                      <span><strong>Bildirimlere İzin Ver:</strong> Açık</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <i className="fas fa-check-circle text-blue-600 mt-1"></i>
                      <span><strong>Kilit Ekranında Göster:</strong> Açık</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <i className="fas fa-check-circle text-blue-600 mt-1"></i>
                      <span><strong>Bildirim Merkezi:</strong> Açık</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <i className="fas fa-check-circle text-blue-600 mt-1"></i>
                      <span><strong>Banner Göster:</strong> Açık</span>
                    </li>
                  </ul>
                </div>

                <div className="p-6 bg-white rounded-2xl border-2 border-red-200 shadow-card">
                  <h4 className="text-lg font-bold text-neutral-900 mb-4 flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-red-100 flex items-center justify-center">
                      <i className="fas fa-exclamation-circle text-red-600"></i>
                    </div>
                    Kritik Bildirimler
                  </h4>
                  <p className="text-sm text-neutral-700 mb-4">
                    Passgage kritik olaylar (acil durum, güvenlik uyarıları) için özel bildirimler gönderebilir.
                  </p>
                  <div className="inline-block bg-gray-100 px-4 py-2 rounded-lg font-mono text-sm text-gray-800 mb-4">
                    Ayarlar <span className="text-gray-500 mx-2">→</span> Bildirimler <span className="text-gray-500 mx-2">→</span> Safari <span className="text-gray-500 mx-2">→</span> Kritik Uyarılar
                  </div>
                  <div className="p-3 bg-red-50 rounded-lg border border-red-200">
                    <p className="text-xs text-red-900">
                      <strong>Not:</strong> Kritik uyarılar Rahatsız Etmeyin modunda bile görüntülenir.
                    </p>
                  </div>
                </div>

                <div className="p-6 bg-amber-50 border-l-4 border-amber-500 rounded-r-xl">
                  <div className="flex gap-4 items-start">
                    <i className="fas fa-moon text-2xl text-amber-600 flex-shrink-0 mt-1"></i>
                    <div>
                      <h4 className="text-lg font-bold text-amber-900 mb-2">Odak Modu (Focus Mode)</h4>
                      <p className="text-sm text-amber-800 leading-relaxed mb-3">
                        Eğer Odak Modu veya Rahatsız Etmeyin özelliğini kullanıyorsanız, Passgage'i izin verilen
                        uygulamalar listesine eklemeniz gerekir.
                      </p>
                      <div className="inline-block bg-white px-3 py-2 rounded-lg font-mono text-xs text-gray-800">
                        Ayarlar <span className="text-gray-500 mx-1">→</span> Odak <span className="text-gray-500 mx-1">→</span> İzin Verilen Bildirimler <span className="text-gray-500 mx-1">→</span> Safari
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Step 6: Konum Servisleri */}
          <section id="step6" className="mb-20 md:mb-28 lg:mb-32 scroll-mt-24">
            <div className="flex flex-col sm:flex-row items-start gap-4 sm:gap-6 mb-10 md:mb-12">
              <div
                className="flex-shrink-0 w-14 h-14 sm:w-16 sm:h-16 text-white rounded-xl sm:rounded-2xl flex items-center justify-center text-2xl sm:text-3xl font-bold shadow-medium"
                style={{ background: 'linear-gradient(135deg, #FF501D 0%, #FFD700 100%)' }}
              >
                6
              </div>
              <div className="flex-1">
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-neutral-900 mb-2 md:mb-3 leading-tight">
                  Konum Servisleri
                </h2>
                <p className="text-base md:text-lg text-neutral-600">
                  GPS bazlı özellikleri etkinleştirin
                </p>
              </div>
            </div>

            <div className="space-y-8 md:space-y-10">
              <InfoBox
                icon="fas fa-map-marker-alt"
                title="Konum İzinleri"
                variant="gradient"
              >
                <p className="mb-4">
                  Passgage GPS bazlı giriş/çıkış ve konum takibi özellikleri için konum servislerine ihtiyaç duyar.
                </p>
                <p className="font-semibold">
                  Safari ve sistem seviyesinde konum izinlerini vermeniz gerekir.
                </p>
              </InfoBox>

              <div className="space-y-6">
                <div className="p-6 bg-white rounded-2xl border-2 border-green-200 shadow-card">
                  <h4 className="text-lg font-bold text-neutral-900 mb-4 flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-green-100 flex items-center justify-center">
                      <i className="fas fa-toggle-on text-green-600"></i>
                    </div>
                    Konum Servislerini Açın
                  </h4>
                  <div className="inline-block bg-gray-100 px-4 py-2 rounded-lg font-mono text-sm text-gray-800 mb-4">
                    Ayarlar <span className="text-gray-500 mx-2">→</span> Gizlilik ve Güvenlik <span className="text-gray-500 mx-2">→</span> Konum Servisleri <span className="text-gray-500 mx-2">→</span> Açık
                  </div>
                  <p className="text-sm text-neutral-600">
                    Konum Servisleri kapalıysa, hiçbir uygulama konumunuza erişemez.
                  </p>
                </div>

                <div className="p-6 bg-white rounded-2xl border-2 border-blue-200 shadow-card">
                  <h4 className="text-lg font-bold text-neutral-900 mb-4 flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-blue-100 flex items-center justify-center">
                      <i className="fab fa-safari text-blue-600"></i>
                    </div>
                    Safari Konum İzni
                  </h4>
                  <div className="inline-block bg-gray-100 px-4 py-2 rounded-lg font-mono text-sm text-gray-800 mb-4">
                    Ayarlar <span className="text-gray-500 mx-2">→</span> Gizlilik ve Güvenlik <span className="text-gray-500 mx-2">→</span> Konum Servisleri <span className="text-gray-500 mx-2">→</span> Safari
                  </div>
                  <div className="space-y-2 text-sm">
                    <label className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg cursor-pointer border-2 border-blue-500">
                      <input type="radio" name="location" className="w-4 h-4 text-blue-600" checked readOnly />
                      <div>
                        <div className="font-semibold text-neutral-900">Uygulama Kullanımda İken</div>
                        <div className="text-xs text-neutral-600">Önerilen seçenek</div>
                      </div>
                    </label>
                    <label className="flex items-center gap-3 p-3 bg-neutral-50 rounded-lg cursor-pointer">
                      <input type="radio" name="location" className="w-4 h-4 text-blue-600" />
                      <div>
                        <div className="font-semibold text-neutral-900">Sorarken İzin Ver</div>
                        <div className="text-xs text-neutral-600">Her seferinde sor</div>
                      </div>
                    </label>
                  </div>
                </div>

                <div className="p-6 bg-white rounded-2xl border-2 border-purple-200 shadow-card">
                  <h4 className="text-lg font-bold text-neutral-900 mb-4 flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-purple-100 flex items-center justify-center">
                      <i className="fas fa-crosshairs text-purple-600"></i>
                    </div>
                    Kesin Konum (Precise Location)
                  </h4>
                  <p className="text-sm text-neutral-700 mb-4">
                    Passgage için <strong>Kesin Konum</strong> özelliğini açmanız önerilir.
                  </p>
                  <div className="inline-block bg-gray-100 px-4 py-2 rounded-lg font-mono text-sm text-gray-800 mb-4">
                    Konum Servisleri <span className="text-gray-500 mx-2">→</span> Safari <span className="text-gray-500 mx-2">→</span> Kesin Konum <span className="text-gray-500 mx-2">→</span> Açık
                  </div>
                  <div className="p-3 bg-purple-50 rounded-lg border border-purple-200">
                    <p className="text-xs text-purple-900">
                      <strong>Neden Gerekli?</strong> Giriş/çıkış noktalarının doğru tespiti için yüksek hassasiyetli konum verisi gerekir.
                    </p>
                  </div>
                </div>
              </div>

              <div className="p-6 md:p-8 bg-green-50 border-l-4 border-green-500 rounded-r-xl">
                <div className="flex gap-4 items-start">
                  <i className="fas fa-check-circle text-2xl md:text-3xl text-green-600 flex-shrink-0 mt-1"></i>
                  <div>
                    <h4 className="text-lg md:text-xl font-bold text-green-900 mb-2">Kurulum Tamamlandı!</h4>
                    <p className="text-sm md:text-base text-green-800 leading-relaxed mb-4">
                      Tebrikler! iOS kurulumunuz başarıyla tamamlandı. Artık Passgage uygulamasını kullanmaya başlayabilirsiniz.
                    </p>
                    <a
                      href="https://app.passgage.com"
                      className="inline-flex items-center gap-2 text-green-900 font-semibold hover:underline"
                    >
                      <i className="fas fa-rocket"></i>
                      Passgage'i Başlat
                    </a>
                  </div>
                </div>
              </div>

              {/* General Troubleshooting */}
              <div>
                <h3 className="text-xl md:text-2xl font-bold text-neutral-900 mb-4">
                  Genel Sorun Giderme
                </h3>
                <Accordion
                  items={troubleshootingItems}
                  platform="ios"
                />
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
