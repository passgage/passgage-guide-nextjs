'use client';

import Header from '@/components/layout/Header';
import Hero from '@/components/layout/Hero';
import Footer from '@/components/layout/Footer';
import { PlatformCard } from '@/components/landing';
import { useSearchStore } from '@/store/searchStore';

export default function Home() {
  const openModal = useSearchStore((state) => state.openModal);

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Passgage Kurulum Kılavuzu',
    url: 'https://kilavuz.passgage.com',
    description: 'iOS, Android ve Access Tag için adım adım detaylı kurulum rehberi',
    publisher: {
      '@type': 'Organization',
      name: 'Passgage',
      url: 'https://passgage.com',
    },
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: 'https://kilavuz.passgage.com/?q={search_term_string}',
      },
      'query-input': 'required name=search_term_string',
    },
  };

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Ana Sayfa',
        item: 'https://kilavuz.passgage.com',
      },
    ],
  };

  return (
    <>
      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />

      <Header />

      <main>
        {/* Hero Section - Standard Component */}
        <Hero
          icon={<i className="fas fa-rocket"></i>}
          titleBefore="Passgage"
          titleHighlight="Kurulum"
          titleAfter="Rehberi"
          description="Birkaç dakikada uygulamayı kurun ve kullanmaya başlayın. Size adım adım, görsel ve interaktif olarak rehberlik ediyoruz."
          primaryButtonText="Başlayalım"
          primaryButtonHref="#guides"
          secondaryButtonText="Sorun mu Var?"
          onSecondaryClick={() => {
            // Open search modal
            openModal();

            // Analytics tracking
            if (typeof window !== 'undefined' && (window as any).gtag) {
              (window as any).gtag('event', 'search_open', {
                event_category: 'engagement',
                event_label: 'hero_trouble_button',
              });
            }
          }}
        />

        {/* Guide Selection Section */}
        <section id="guides" className="py-20 px-6 bg-neutral-50">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-neutral-900 mb-4">
                Neye İhtiyacınız Var?
              </h2>
              <p className="text-xl text-neutral-600 max-w-2xl mx-auto">
                Mobil uygulama, fiziksel etiket veya diğer kurulumlar için rehberlerimize göz atın
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* iOS Card */}
              <PlatformCard
                badge="📱 Mobil Uygulama"
                type="ios"
                title="iOS Kurulumu"
                description="iPhone ve iPad için detaylı kurulum adımları, Safari ayarları ve sorun giderme rehberi."
                href="/ios"
                gradient="bg-neutral-900"
                icon={
                  <svg className="w-16 h-16 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
                  </svg>
                }
              />

              {/* Android Card */}
              <PlatformCard
                badge="📱 Mobil Uygulama"
                type="android"
                title="Android Kurulumu"
                description="Android telefonlar için kapsamlı kurulum rehberi, marka özel ayarlar ve pil optimizasyonu."
                href="/android"
                gradient="bg-gradient-to-br from-android-green to-green-600"
                icon={
                  <svg className="w-16 h-16 text-white" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M17.6,9.48l1.84-3.18c.16-.31.04-.69-.26-.85-.29-.15-.65-.06-.83.22l-1.88,3.24a11.46,11.46,0,0,0-8.94,0L5.65,5.67c-.19-.28-.54-.37-.83-.22-.3.16-.42.54-.26.85L6.4,9.48A10.88,10.88,0,0,0,1,18H23A10.88,10.88,0,0,0,17.6,9.48ZM7,15.25A1.25,1.25,0,1,1,8.25,14,1.25,1.25,0,0,1,7,15.25Zm10,0A1.25,1.25,0,1,1,18.25,14,1.25,1.25,0,0,1,17,15.25Z"/>
                  </svg>
                }
              />

              {/* Access Tag Card */}
              <PlatformCard
                badge="🏷️ NFC Kart + QR"
                type="access-tag"
                title="Access Tag Kurulumu"
                description="Fiziksel NFC etiket kurulumu, QR kod yapılandırması ve bakım rehberi."
                href="/access-tag"
                gradient="bg-gradient-to-br from-orange-600 to-yellow-400"
                icon={
                  <svg className="w-16 h-16 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <rect x="3" y="3" width="18" height="18" rx="2" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <rect x="7" y="7" width="4" height="4" fill="currentColor"/>
                    <rect x="7" y="13" width="4" height="4" fill="currentColor"/>
                    <rect x="13" y="7" width="4" height="4" fill="currentColor"/>
                    <path d="M13 13h2v2h-2v2h2v2h-2" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                }
              />
            </div>
          </div>
        </section>

        {/* Sık Karşılaşılan Sorunlar - Troubleshooting */}
        <section className="py-20 px-6 bg-white">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-neutral-900 mb-4">
                Sık Karşılaşılan Sorunlar
              </h2>
              <p className="text-xl text-neutral-600 max-w-2xl mx-auto">
                Kurulum sırasında yaşanan yaygın sorunlar ve çözümleri
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* iOS Troubleshooting */}
              <div className="bg-neutral-50 rounded-3xl p-8 hover:shadow-hover transition-shadow">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 bg-gradient-to-br from-ios-black to-neutral-700 rounded-xl flex items-center justify-center">
                    <i className="fab fa-apple text-white text-2xl"></i>
                  </div>
                  <h3 className="text-2xl font-bold text-neutral-900">iOS</h3>
                </div>
                <ul className="space-y-4">
                  <li>
                    <button
                      onClick={openModal}
                      className="text-left w-full group"
                    >
                      <p className="font-semibold text-neutral-900 group-hover:text-passgage-red transition-colors mb-1">
                        Safari izinleri verilmedi?
                      </p>
                      <p className="text-sm text-neutral-600">
                        Ayarlar → Safari → İzinler'den kontrol edin
                      </p>
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={openModal}
                      className="text-left w-full group"
                    >
                      <p className="font-semibold text-neutral-900 group-hover:text-passgage-red transition-colors mb-1">
                        Uygulama açılmıyor?
                      </p>
                      <p className="text-sm text-neutral-600">
                        Cihazı yeniden başlatın ve tekrar deneyin
                      </p>
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={openModal}
                      className="text-left w-full group"
                    >
                      <p className="font-semibold text-neutral-900 group-hover:text-passgage-red transition-colors mb-1">
                        Bildirimler gelmiyor?
                      </p>
                      <p className="text-sm text-neutral-600">
                        Bildirim izinlerini kontrol edin
                      </p>
                    </button>
                  </li>
                </ul>
              </div>

              {/* Android Troubleshooting */}
              <div className="bg-neutral-50 rounded-3xl p-8 hover:shadow-hover transition-shadow">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 bg-gradient-to-br from-android-green to-green-600 rounded-xl flex items-center justify-center">
                    <i className="fab fa-android text-white text-2xl"></i>
                  </div>
                  <h3 className="text-2xl font-bold text-neutral-900">Android</h3>
                </div>
                <ul className="space-y-4">
                  <li>
                    <button
                      onClick={openModal}
                      className="text-left w-full group"
                    >
                      <p className="font-semibold text-neutral-900 group-hover:text-android-green transition-colors mb-1">
                        Pil optimizasyonu engelliyor?
                      </p>
                      <p className="text-sm text-neutral-600">
                        Pil ayarlarından uygulamayı muaf tutun
                      </p>
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={openModal}
                      className="text-left w-full group"
                    >
                      <p className="font-semibold text-neutral-900 group-hover:text-android-green transition-colors mb-1">
                        Arka planda çalışmıyor?
                      </p>
                      <p className="text-sm text-neutral-600">
                        Uygulama izinlerini kontrol edin
                      </p>
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={openModal}
                      className="text-left w-full group"
                    >
                      <p className="font-semibold text-neutral-900 group-hover:text-android-green transition-colors mb-1">
                        Xiaomi/Samsung sorunları?
                      </p>
                      <p className="text-sm text-neutral-600">
                        Marka özel ayarlar rehberine bakın
                      </p>
                    </button>
                  </li>
                </ul>
              </div>

              {/* Access Tag Troubleshooting */}
              <div className="bg-neutral-50 rounded-3xl p-8 hover:shadow-hover transition-shadow">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 bg-gradient-to-br from-orange-600 to-yellow-400 rounded-xl flex items-center justify-center">
                    <i className="fas fa-tag text-white text-2xl"></i>
                  </div>
                  <h3 className="text-2xl font-bold text-neutral-900">Access Tag</h3>
                </div>
                <ul className="space-y-4">
                  <li>
                    <button
                      onClick={openModal}
                      className="text-left w-full group"
                    >
                      <p className="font-semibold text-neutral-900 group-hover:text-orange-600 transition-colors mb-1">
                        NFC çalışmıyor?
                      </p>
                      <p className="text-sm text-neutral-600">
                        Telefon ayarlarından NFC'yi açın
                      </p>
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={openModal}
                      className="text-left w-full group"
                    >
                      <p className="font-semibold text-neutral-900 group-hover:text-orange-600 transition-colors mb-1">
                        QR kod okunmuyor?
                      </p>
                      <p className="text-sm text-neutral-600">
                        Kamerayı temizleyin ve ışığı artırın
                      </p>
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={openModal}
                      className="text-left w-full group"
                    >
                      <p className="font-semibold text-neutral-900 group-hover:text-orange-600 transition-colors mb-1">
                        Kart çalışmıyor?
                      </p>
                      <p className="text-sm text-neutral-600">
                        Kartı telefona yaklaştırın
                      </p>
                    </button>
                  </li>
                </ul>
              </div>
            </div>

            {/* All Issues Link */}
            <div className="text-center mt-12">
              <button
                onClick={openModal}
                className="inline-flex items-center gap-2 px-8 py-4 bg-neutral-900 text-white rounded-2xl font-bold hover:bg-neutral-800 transition-colors"
              >
                Tüm Sorunları Görüntüle
                <i className="fas fa-arrow-right"></i>
              </button>
            </div>
          </div>
        </section>

        {/* Kurulum Sonrası Adımlar */}
        <section className="py-20 px-6 bg-neutral-50">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-neutral-900 mb-4">
                Kurulum Sonrası Adımlar
              </h2>
              <p className="text-xl text-neutral-600 max-w-2xl mx-auto">
                Kurulumu tamamladınız mı? İşte sıradaki adımlar
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {/* Step 1 - Test */}
              <div className="bg-white rounded-3xl p-8 text-center hover:-translate-y-2 transition-all shadow-card hover:shadow-hover">
                <div className="w-16 h-16 bg-gradient-to-br from-passgage-red to-passgage-gold rounded-2xl flex items-center justify-center mx-auto mb-6 text-white text-2xl font-bold">
                  1
                </div>
                <h3 className="text-2xl font-bold text-neutral-900 mb-4">
                  İlk Kullanımı Test Edin
                </h3>
                <p className="text-neutral-600 mb-6">
                  Uygulamayı açın ve giriş yaparak kurulumun başarılı olduğunu doğrulayın
                </p>
                <ul className="text-left space-y-2 text-sm text-neutral-600">
                  <li className="flex items-start gap-2">
                    <i className="fas fa-check-circle text-passgage-red mt-0.5"></i>
                    <span>Giriş yapın ve çıkış yapın</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <i className="fas fa-check-circle text-passgage-red mt-0.5"></i>
                    <span>Bildirimleri kontrol edin</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <i className="fas fa-check-circle text-passgage-red mt-0.5"></i>
                    <span>Ayarları inceleyin</span>
                  </li>
                </ul>
              </div>

              {/* Step 2 - Hesap */}
              <div className="bg-white rounded-3xl p-8 text-center hover:-translate-y-2 transition-all shadow-card hover:shadow-hover">
                <div className="w-16 h-16 bg-gradient-to-br from-passgage-blue to-blue-500 rounded-2xl flex items-center justify-center mx-auto mb-6 text-white text-2xl font-bold">
                  2
                </div>
                <h3 className="text-2xl font-bold text-neutral-900 mb-4">
                  Hesabınızı Yapılandırın
                </h3>
                <p className="text-neutral-600 mb-6">
                  Profil bilgilerinizi tamamlayın ve güvenlik ayarlarınızı yapın
                </p>
                <ul className="text-left space-y-2 text-sm text-neutral-600">
                  <li className="flex items-start gap-2">
                    <i className="fas fa-check-circle text-passgage-blue mt-0.5"></i>
                    <span>Profil fotoğrafı ekleyin</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <i className="fas fa-check-circle text-passgage-blue mt-0.5"></i>
                    <span>İletişim bilgilerini güncelleyin</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <i className="fas fa-check-circle text-passgage-blue mt-0.5"></i>
                    <span>İki faktörlü doğrulama ayarlayın</span>
                  </li>
                </ul>
              </div>

              {/* Step 3 - Ekip */}
              <div className="bg-white rounded-3xl p-8 text-center hover:-translate-y-2 transition-all shadow-card hover:shadow-hover">
                <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-purple-700 rounded-2xl flex items-center justify-center mx-auto mb-6 text-white text-2xl font-bold">
                  3
                </div>
                <h3 className="text-2xl font-bold text-neutral-900 mb-4">
                  Ekip Üyelerini Ekleyin
                </h3>
                <p className="text-neutral-600 mb-6">
                  Ekip arkadaşlarınızı davet edin ve roller atayın
                </p>
                <ul className="text-left space-y-2 text-sm text-neutral-600">
                  <li className="flex items-start gap-2">
                    <i className="fas fa-check-circle text-purple-600 mt-0.5"></i>
                    <span>Email ile davet gönderin</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <i className="fas fa-check-circle text-purple-600 mt-0.5"></i>
                    <span>Roller ve izinler atayın</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <i className="fas fa-check-circle text-purple-600 mt-0.5"></i>
                    <span>Ekip ayarlarını yapılandırın</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Video Rehberler */}
        <section className="py-20 px-6 bg-white">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-neutral-900 mb-4">
                Video Rehberler
              </h2>
              <p className="text-xl text-neutral-600 max-w-2xl mx-auto">
                Görsel anlatımla adım adım kurulum videoları
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* iOS Video */}
              <div className="group bg-neutral-50 rounded-3xl overflow-hidden hover:shadow-hover transition-all">
                <div className="relative aspect-video bg-gradient-to-br from-ios-black to-neutral-700 flex items-center justify-center">
                  <div className="absolute inset-0 bg-black/20"></div>
                  <div className="relative z-10">
                    <div className="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center group-hover:scale-110 transition-transform cursor-pointer">
                      <i className="fas fa-play text-white text-2xl ml-1"></i>
                    </div>
                  </div>
                  <div className="absolute bottom-4 left-4 right-4">
                    <span className="inline-block px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-white text-xs font-bold">
                      3:24
                    </span>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-neutral-900 mb-2">
                    iOS Kurulum Rehberi
                  </h3>
                  <p className="text-neutral-600 text-sm">
                    iPhone ve iPad için detaylı kurulum videosu
                  </p>
                </div>
              </div>

              {/* Vardiya Planlama Video */}
              <div className="group bg-neutral-50 rounded-3xl overflow-hidden hover:shadow-hover transition-all">
                <div className="relative aspect-video">
                  <iframe
                    className="absolute inset-0 w-full h-full rounded-t-3xl"
                    src="https://www.youtube.com/embed/bHPdMFhUmsc"
                    title="Vardiya Planlama Rehberi"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                  ></iframe>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-neutral-900 mb-2">
                    Vardiya Planlama Rehberi
                  </h3>
                  <p className="text-neutral-600 text-sm">
                    Vardiya oluşturma ve çalışan atama adımları
                  </p>
                </div>
              </div>

              {/* Şifre Oluşturma Video */}
              <div className="group bg-neutral-50 rounded-3xl overflow-hidden hover:shadow-hover transition-all">
                <div className="relative aspect-video">
                  <iframe
                    className="absolute inset-0 w-full h-full rounded-t-3xl"
                    src="https://www.youtube.com/embed/_g-zcaH-3bE"
                    title="Şifre Oluşturma Rehberi"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                  ></iframe>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-neutral-900 mb-2">
                    Şifre Oluşturma Rehberi
                  </h3>
                  <p className="text-neutral-600 text-sm">
                    Güvenli şifre oluşturma adımları
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Gelişmiş Ayarlar */}
        <section className="py-20 px-6 bg-neutral-50">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-neutral-900 mb-4">
                Gelişmiş Ayarlar
              </h2>
              <p className="text-xl text-neutral-600 max-w-2xl mx-auto">
                İleri düzey kullanıcılar için özelleştirme seçenekleri
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
              {/* API Entegrasyonu */}
              <div className="bg-white rounded-2xl p-6 hover:shadow-hover transition-shadow">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-passgage-blue to-blue-500 rounded-xl flex items-center justify-center flex-shrink-0">
                    <i className="fas fa-code text-white text-xl"></i>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-neutral-900 mb-2">
                      API Entegrasyonu
                    </h3>
                    <p className="text-sm text-neutral-600 mb-3">
                      REST API ile kendi sistemlerinize entegre edin
                    </p>
                    <a
                      href="https://passgage.com/api-docs"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-passgage-blue font-semibold hover:underline"
                    >
                      API Dokümantasyonu →
                    </a>
                  </div>
                </div>
              </div>

              {/* Webhook Kurulumu */}
              <div className="bg-white rounded-2xl p-6 hover:shadow-hover transition-shadow">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-700 rounded-xl flex items-center justify-center flex-shrink-0">
                    <i className="fas fa-webhook text-white text-xl"></i>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-neutral-900 mb-2">
                      Webhook Kurulumu
                    </h3>
                    <p className="text-sm text-neutral-600 mb-3">
                      Gerçek zamanlı event bildirimleri alın
                    </p>
                    <button
                      onClick={openModal}
                      className="text-sm text-purple-600 font-semibold hover:underline"
                    >
                      Webhook Rehberi →
                    </button>
                  </div>
                </div>
              </div>

              {/* SSO Entegrasyonu */}
              <div className="bg-white rounded-2xl p-6 hover:shadow-hover transition-shadow">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-orange-600 to-yellow-400 rounded-xl flex items-center justify-center flex-shrink-0">
                    <i className="fas fa-shield-alt text-white text-xl"></i>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-neutral-900 mb-2">
                      SSO Entegrasyonu
                    </h3>
                    <p className="text-sm text-neutral-600 mb-3">
                      Kurumsal kimlik yönetimi sistemleriyle entegrasyon
                    </p>
                    <button
                      onClick={openModal}
                      className="text-sm text-orange-600 font-semibold hover:underline"
                    >
                      SSO Kurulum Rehberi →
                    </button>
                  </div>
                </div>
              </div>

              {/* Özelleştirme */}
              <div className="bg-white rounded-2xl p-6 hover:shadow-hover transition-shadow">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-passgage-red to-passgage-gold rounded-xl flex items-center justify-center flex-shrink-0">
                    <i className="fas fa-palette text-white text-xl"></i>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-neutral-900 mb-2">
                      Tema ve Görünüm
                    </h3>
                    <p className="text-sm text-neutral-600 mb-3">
                      Markanıza uygun renk ve logo özelleştirmeleri
                    </p>
                    <button
                      onClick={openModal}
                      className="text-sm text-passgage-red font-semibold hover:underline"
                    >
                      Özelleştirme Rehberi →
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Yardım Merkezi */}
        <section className="py-20 px-6 bg-white">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-neutral-900 mb-4">
                Yardım Merkezi
              </h2>
              <p className="text-xl text-neutral-600 max-w-2xl mx-auto">
                Daha fazla kaynak ve destek için
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {/* Dokümantasyon */}
              <a
                href="https://passgage.com/docs"
                target="_blank"
                rel="noopener noreferrer"
                className="group bg-neutral-50 rounded-3xl p-8 text-center hover:-translate-y-2 transition-all hover:shadow-hover"
              >
                <div className="w-16 h-16 bg-gradient-to-br from-passgage-blue to-blue-500 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                  <i className="fas fa-book text-white text-2xl"></i>
                </div>
                <h3 className="text-lg font-bold text-neutral-900 mb-2">
                  Dokümantasyon
                </h3>
                <p className="text-sm text-neutral-600">
                  Detaylı teknik dökümanlar ve rehberler
                </p>
              </a>

              {/* Destek Talebi */}
              <button
                onClick={openModal}
                className="group bg-neutral-50 rounded-3xl p-8 text-center hover:-translate-y-2 transition-all hover:shadow-hover"
              >
                <div className="w-16 h-16 bg-gradient-to-br from-passgage-red to-passgage-gold rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                  <i className="fas fa-headset text-white text-2xl"></i>
                </div>
                <h3 className="text-lg font-bold text-neutral-900 mb-2">
                  Destek Talebi
                </h3>
                <p className="text-sm text-neutral-600">
                  7/24 teknik destek ekibimize ulaşın
                </p>
              </button>

              {/* Community */}
              <a
                href="https://passgage.com/community"
                target="_blank"
                rel="noopener noreferrer"
                className="group bg-neutral-50 rounded-3xl p-8 text-center hover:-translate-y-2 transition-all hover:shadow-hover"
              >
                <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-purple-700 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                  <i className="fas fa-users text-white text-2xl"></i>
                </div>
                <h3 className="text-lg font-bold text-neutral-900 mb-2">
                  Topluluk Forumu
                </h3>
                <p className="text-sm text-neutral-600">
                  Diğer kullanıcılarla deneyim paylaşın
                </p>
              </a>

              {/* Status Page */}
              <a
                href="https://status.passgage.com"
                target="_blank"
                rel="noopener noreferrer"
                className="group bg-neutral-50 rounded-3xl p-8 text-center hover:-translate-y-2 transition-all hover:shadow-hover"
              >
                <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-green-700 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                  <i className="fas fa-signal text-white text-2xl"></i>
                </div>
                <h3 className="text-lg font-bold text-neutral-900 mb-2">
                  Sistem Durumu
                </h3>
                <p className="text-sm text-neutral-600">
                  Servis durumunu ve bakımları izleyin
                </p>
              </a>
            </div>
          </div>
        </section>

        {/* Final CTA Section */}
        <section className="py-20 px-6 bg-gradient-to-br from-passgage-red to-passgage-gold">
          <div className="max-w-4xl mx-auto text-center">
            {/* Main CTA */}
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Yardıma mı İhtiyacınız Var?
            </h2>
            <p className="text-xl text-white/90 mb-10 leading-relaxed">
              Kurulum sırasında sorun yaşıyorsanız veya sorularınız varsa,
              <br className="hidden md:block" />
              destek ekibimiz size yardımcı olmaktan mutluluk duyacaktır
            </p>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
              {/* Primary - Search modal */}
              <button
                onClick={() => {
                  openModal();
                  if (typeof window !== 'undefined' && (window as any).gtag) {
                    (window as any).gtag('event', 'search_open', {
                      event_category: 'engagement',
                      event_label: 'final_cta_search',
                    });
                  }
                }}
                className="px-10 py-5 bg-white text-passgage-red rounded-2xl font-bold text-lg shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300 w-full sm:w-auto"
              >
                Sorun Arayın
              </button>

              {/* Secondary - Support center */}
              <a
                href="https://passgage.com/support"
                target="_blank"
                rel="noopener noreferrer"
                className="px-10 py-5 bg-white/10 backdrop-blur-sm text-white border-2 border-white/30 rounded-2xl font-bold text-lg hover:bg-white/20 hover:border-white/50 transition-all duration-300 w-full sm:w-auto"
                onClick={() => {
                  if (typeof window !== 'undefined' && (window as any).gtag) {
                    (window as any).gtag('event', 'contact_click', {
                      event_category: 'engagement',
                      event_label: 'final_cta_support_center',
                    });
                  }
                }}
              >
                Destek Merkezi
              </a>
            </div>

            {/* Divider */}
            <div className="w-32 h-1 bg-white/30 mx-auto mb-8"></div>

            {/* Support Contact */}
            <p className="text-white/80 text-base mb-4">
              Doğrudan destek ekibimize ulaşın
            </p>
            <a
              href="mailto:support@passgage.com"
              className="inline-flex items-center gap-2 text-white font-semibold hover:text-white/80 transition-colors"
              onClick={() => {
                if (typeof window !== 'undefined' && (window as any).gtag) {
                  (window as any).gtag('event', 'contact_click', {
                    event_category: 'engagement',
                    event_label: 'final_cta_email',
                  });
                }
              }}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
              </svg>
              support@passgage.com
            </a>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
