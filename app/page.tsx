'use client';

import Header from '@/components/layout/Header';
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

      <Header showSearch={true} />

      <main>
        {/* Hero Section */}
        <section className="relative overflow-hidden pt-[140px] md:pt-[180px] pb-[80px] md:pb-[100px] px-6 md:px-8">
          {/* Background Gradient */}
          <div className="hero-bg" />

          {/* Grid Pattern */}
          <div className="hero-grid" />

          {/* Hero Content */}
          <div className="relative z-10 max-w-[800px] mx-auto text-center">
            {/* Floating Icon */}
            <div
              className="w-[100px] h-[100px] mx-auto mb-8 rounded-[28px] flex items-center justify-center text-white text-6xl shadow-strong animate-float"
              style={{
                background: 'linear-gradient(135deg, #FF501D 0%, #FFD700 100%)'
              }}
            >
              <i className="fas fa-rocket"></i>
            </div>

            {/* Heading */}
            <h1 className="text-[clamp(2.5rem,6vw,3.5rem)] font-extrabold leading-tight text-white mb-6">
              Passgage{' '}
              <span
                className="inline-block"
                style={{
                  background: 'linear-gradient(135deg, #FF501D 0%, #FFD700 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text'
                }}
              >
                Kurulum
              </span>{' '}
              Rehberi
            </h1>

            {/* Description */}
            <p className="text-[clamp(1rem,2vw,1.2rem)] text-white/90 mb-12 max-w-[600px] mx-auto leading-relaxed">
              Birkaç dakikada uygulamayı kurun ve kullanmaya başlayın. Size adım adım, görsel ve interaktif olarak rehberlik ediyoruz.
            </p>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              {/* Primary Button */}
              <a
                href="#platforms"
                className="inline-flex items-center gap-3 px-8 py-4 rounded-full bg-gradient-to-r from-passgage-red to-passgage-gold text-white font-bold text-base sm:text-lg shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300 w-full sm:w-auto justify-center"
                onClick={() => {
                  if (typeof window !== 'undefined' && (window as any).gtag) {
                    (window as any).gtag('event', 'cta_click', {
                      event_category: 'engagement',
                      event_label: 'hero_get_started',
                    });
                  }
                }}
              >
                <i className="fas fa-play"></i>
                Başlayalım
              </a>

              {/* Secondary Button */}
              <button
                className="inline-flex items-center gap-3 px-8 py-4 rounded-full bg-transparent text-white font-bold text-base sm:text-lg border-2 border-white/30 hover:bg-white/10 hover:border-white/50 transition-all duration-300 w-full sm:w-auto justify-center"
                onClick={() => {
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
              >
                <i className="fas fa-question-circle"></i>
                Sorun mu Var?
              </button>
            </div>
          </div>
        </section>

        {/* Platform Selection Section */}
        <section id="platforms" className="py-20 px-6 bg-neutral-50">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-neutral-900 mb-4">
                Platformunuzu Seçin
              </h2>
              <p className="text-xl text-neutral-600 max-w-2xl mx-auto">
                Kurulum yapmak istediğiniz platformu seçerek adım adım rehbere ulaşın
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* iOS Card */}
              <PlatformCard
                type="ios"
                title="iOS Kurulumu"
                description="iPhone ve iPad için detaylı kurulum adımları, Safari ayarları ve sorun giderme rehberi."
                href="/ios"
                gradient="bg-gradient-to-br from-ios-black to-ios-gray"
                icon={
                  <svg className="w-16 h-16 text-white" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
                  </svg>
                }
              />

              {/* Android Card */}
              <PlatformCard
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
                type="access-tag"
                title="Access Tag Kurulumu"
                description="Fiziksel NFC etiket kurulumu, QR kod yapılandırması ve bakım rehberi."
                href="/access-tag"
                gradient="bg-gradient-to-br from-tag-blue to-blue-500"
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

        {/* Features Section */}
        <section className="py-20 px-6 bg-white">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-neutral-900 mb-4">
                Neden Passgage?
              </h2>
              <p className="text-xl text-neutral-600 max-w-2xl mx-auto">
                Güvenli, hızlı ve kullanıcı dostu giriş sistemi
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {/* Feature 1 */}
              <div className="bg-white rounded-3xl shadow-card hover:shadow-hover transition-shadow duration-300 p-8 text-center hover:-translate-y-2 group">
                <div className="w-16 h-16 bg-gradient-to-br from-passgage-red to-passgage-gold rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"/>
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-neutral-900 mb-3">Güvenli</h3>
                <p className="text-neutral-600">
                  Şifresiz giriş ile maksimum güvenlik
                </p>
              </div>

              {/* Feature 2 */}
              <div className="bg-white rounded-3xl shadow-card hover:shadow-hover transition-shadow duration-300 p-8 text-center hover:-translate-y-2 group">
                <div className="w-16 h-16 bg-gradient-to-br from-android-green to-green-600 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z"/>
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-neutral-900 mb-3">Hızlı</h3>
                <p className="text-neutral-600">
                  Saniyeler içinde giriş yapın
                </p>
              </div>

              {/* Feature 3 */}
              <div className="bg-white rounded-3xl shadow-card hover:shadow-hover transition-shadow duration-300 p-8 text-center hover:-translate-y-2 group">
                <div className="w-16 h-16 bg-gradient-to-br from-tag-blue to-blue-500 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"/>
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-neutral-900 mb-3">Kolay</h3>
                <p className="text-neutral-600">
                  Kullanıcı dostu arayüz ve kurulum
                </p>
              </div>

              {/* Feature 4 */}
              <div className="bg-white rounded-3xl shadow-card hover:shadow-hover transition-shadow duration-300 p-8 text-center hover:-translate-y-2 group">
                <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-purple-700 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/>
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-neutral-900 mb-3">Güvenilir</h3>
                <p className="text-neutral-600">
                  7/24 kesintisiz hizmet
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section className="py-20 px-6 bg-gradient-to-br from-passgage-red to-passgage-gold">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Yardıma mı İhtiyacınız Var?
            </h2>
            <p className="text-xl text-white/90 mb-10 leading-relaxed">
              Kurulum sırasında sorun yaşıyorsanız veya sorularınız varsa,
              <br className="hidden md:block" />
              destek ekibimiz size yardımcı olmaktan mutluluk duyacaktır.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <a
                href="mailto:support@passgage.com"
                className="group px-8 py-4 bg-white text-passgage-red rounded-2xl font-bold text-lg shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300 flex items-center gap-2"
                onClick={() => {
                  if (typeof window !== 'undefined' && (window as any).gtag) {
                    (window as any).gtag('event', 'contact_click', {
                      event_category: 'engagement',
                      event_label: 'email_support',
                    });
                  }
                }}
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
                </svg>
                support@passgage.com
              </a>

              <a
                href="https://passgage.com/support"
                target="_blank"
                rel="noopener noreferrer"
                className="px-8 py-4 bg-white/10 backdrop-blur-sm text-white border-2 border-white/30 rounded-2xl font-bold text-lg hover:bg-white/20 hover:border-white/50 transition-all duration-300"
                onClick={() => {
                  if (typeof window !== 'undefined' && (window as any).gtag) {
                    (window as any).gtag('event', 'contact_click', {
                      event_category: 'engagement',
                      event_label: 'support_center',
                    });
                  }
                }}
              >
                Destek Merkezi
              </a>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
