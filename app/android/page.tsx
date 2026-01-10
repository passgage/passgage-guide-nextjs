'use client';

import { useState } from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { PhoneMockup, Accordion, InfoBox } from '@/components/guide';
import type { AccordionItem } from '@/components/guide';

export default function AndroidGuidePage() {
  // Troubleshooting FAQ data - 7 comprehensive items
  const troubleshootingItems: AccordionItem[] = [
    {
      id: 'google-play-services',
      question: 'Google Play Services Güncel Değil',
      answer: (
        <div className="space-y-4">
          <p>Google Play Services uygulamanın çalışması için gereklidir. Güncelleme için:</p>
          <ol className="list-decimal list-inside space-y-2 ml-4">
            <li>Google Play Store uygulamasını açın</li>
            <li>Üst menüden "Uygulamalarım ve oyunlarım" seçeneğine gidin</li>
            <li>"Google Play Services" uygulamasını bulun</li>
            <li>"Güncelle" butonuna tıklayın</li>
            <li>Güncelleme tamamlandıktan sonra cihazınızı yeniden başlatın</li>
          </ol>
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
            <h5 className="font-bold text-orange-900 mb-2">Xiaomi (MIUI)</h5>
            <p className="text-sm text-orange-800 mb-2">Ayarlar → Uygulamalar → Passgage → Otomatik başlatma → <strong>Açık</strong></p>
            <p className="text-sm text-orange-800">Ayarlar → Pil ve performans → Uygulama pil tasarrufu → Passgage → <strong>Kısıtlama yok</strong></p>
          </div>

          <div className="mt-4 p-4 bg-blue-50 border-l-4 border-blue-500 rounded-r-xl">
            <h5 className="font-bold text-blue-900 mb-2">Samsung (One UI)</h5>
            <p className="text-sm text-blue-800">Ayarlar → Cihaz bakımı → Pil → Uygulama güç yönetimi → Passgage → <strong>Optimize edilmemiş</strong></p>
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
            <li>Telefonunuzun arkasını QR koda yaklaştırın (1-2 saniye bekleyin)</li>
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
  ];

  return (
    <>
      <Header showSearch={true} />

      <main>
        {/* Hero Section */}
        <section className="relative min-h-[60vh] flex items-center justify-center overflow-hidden bg-gradient-to-br from-android-green via-green-600 to-green-700">
          {/* Background Grid */}
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAwIDEwIEwgNDAgMTAgTSAxMCAwIEwgMTAgNDAgTSAwIDIwIEwgNDAgMjAgTSAyMCAwIEwgMjAgNDAgTSAwIDMwIEwgNDAgMzAgTSAzMCAwIEwgMzAgNDAiIGZpbGw9Im5vbmUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS1vcGFjaXR5PSIwLjA1IiBzdHJva2Utd2lkdGg9IjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')] opacity-30" />

          {/* Animated Blobs */}
          <div className="absolute top-20 right-20 w-72 h-72 bg-white/10 rounded-full blur-3xl animate-blob" />
          <div className="absolute bottom-20 left-20 w-96 h-96 bg-white/10 rounded-full blur-3xl animate-blob animation-delay-2000" />

          <div className="relative z-10 max-w-4xl mx-auto px-6 text-center py-20">
            {/* Android Icon */}
            <div className="w-20 h-20 mx-auto mb-6 bg-white/10 backdrop-blur-sm rounded-3xl flex items-center justify-center">
              <i className="fab fa-android text-4xl text-white" />
            </div>

            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6">
              Passgage
              <br />
              <span className="bg-gradient-to-r from-white to-white/70 bg-clip-text text-transparent">
                Android Kurulumu
              </span>
            </h1>

            <p className="text-xl md:text-2xl text-white/90 mb-10 leading-relaxed">
              Android telefonlar için kapsamlı kurulum rehberi.
              <br />
              Android 7.0 ve üzeri cihazlar için optimize edilmiştir.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="#step1"
                className="px-8 py-4 bg-white text-android-green rounded-2xl font-bold text-lg shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2"
              >
                <i className="fas fa-play" />
                Başlayalım
              </a>
              <a
                href="#step6"
                className="px-8 py-4 bg-white/10 backdrop-blur-sm text-white border-2 border-white/30 rounded-2xl font-bold text-lg hover:bg-white/20 hover:border-white/50 transition-all duration-300 flex items-center justify-center gap-2"
              >
                <i className="fas fa-question-circle" />
                Sorun mu Var?
              </a>
            </div>
          </div>
        </section>

        {/* Main Content */}
        <div className="max-w-7xl mx-auto px-6 py-20">
          {/* Battery Optimization Warning */}
          <div className="mb-16 p-8 bg-gradient-to-r from-amber-50 to-orange-50 border-l-4 border-amber-500 rounded-r-2xl shadow-lg">
            <div className="flex items-start gap-6">
              <div className="flex-shrink-0 w-16 h-16 bg-gradient-to-br from-amber-500 to-orange-600 rounded-full flex items-center justify-center">
                <i className="fas fa-exclamation-triangle text-2xl text-white animate-pulse" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-amber-900 mb-3">Önemli: Pil Optimizasyonu</h3>
                <p className="text-amber-800 leading-relaxed mb-4">
                  Android telefonlarda pil tasarrufu özellikleri uygulamanın arka planda çalışmasını engelleyebilir. 
                  Passgage'in düzgün çalışması için <strong>pil optimizasyonunu kapatmanız</strong> gerekiyor.
                </p>
                <p className="text-amber-800 leading-relaxed">
                  Kurulum adımlarında bu ayarların nasıl yapılandırılacağı detaylı olarak açıklanmıştır.
                </p>
              </div>
            </div>
          </div>

          {/* Step 1: Download */}
          <section id="step1" className="mb-24 scroll-mt-24">
            <div className="flex items-start gap-6 mb-12">
              <div className="flex-shrink-0 w-16 h-16 bg-gradient-to-br from-android-green to-green-600 text-white rounded-2xl flex items-center justify-center text-2xl font-bold shadow-lg">
                1
              </div>
              <div className="flex-1">
                <h2 className="text-4xl md:text-5xl font-extrabold text-neutral-900 mb-3">
                  Uygulamayı <span className="text-android-green">İndirin</span>
                </h2>
                <p className="text-xl text-neutral-600">Google Play Store veya Huawei AppGallery'den ücretsiz indirin</p>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6 max-w-3xl mx-auto mb-12">
              {/* Google Play Store */}
              <a
                href="https://play.google.com/store/apps/details?id=com.passgage.app"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white rounded-3xl shadow-card hover:shadow-hover transition-shadow duration-300 p-6 hover:-translate-y-2 no-underline block group"
              >
                <div className="w-16 h-16 bg-gradient-to-br from-android-green to-green-600 rounded-2xl flex items-center justify-center text-white text-3xl mb-4">
                  <i className="fab fa-google-play" />
                </div>
                <h3 className="text-xl font-bold text-neutral-900 mb-2">Google Play Store</h3>
                <p className="text-neutral-600 mb-4">Android cihazlar için</p>
                <div className="flex items-center gap-2 text-android-green font-semibold group-hover:gap-3 transition-all">
                  <span>Ücretsiz İndir</span>
                  <i className="fas fa-arrow-right" />
                </div>
              </a>

              {/* Huawei AppGallery */}
              <a
                href="https://appgallery.huawei.com/app/C104521415"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white rounded-3xl shadow-card hover:shadow-hover transition-shadow duration-300 p-6 hover:-translate-y-2 no-underline block group"
              >
                <div className="w-16 h-16 bg-gradient-to-br from-red-500 to-red-600 rounded-2xl flex items-center justify-center text-white text-3xl mb-4">
                  <i className="fas fa-store" />
                </div>
                <h3 className="text-xl font-bold text-neutral-900 mb-2">Huawei AppGallery</h3>
                <p className="text-neutral-600 mb-4">Huawei cihazlar için</p>
                <div className="flex items-center gap-2 text-red-600 font-semibold group-hover:gap-3 transition-all">
                  <span>Ücretsiz İndir</span>
                  <i className="fas fa-arrow-right" />
                </div>
              </a>
            </div>

            <div className="grid md:grid-cols-2 gap-8 max-w-2xl mx-auto">
              <div className="bg-white rounded-3xl shadow-card hover:shadow-hover transition-shadow duration-300 p-6 text-center">
                <div className="w-12 h-12 bg-android-green/10 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <i className="fas fa-mobile-alt text-2xl text-android-green" />
                </div>
                <h4 className="font-bold text-neutral-900 mb-2">Android 7.0 ve Üzeri</h4>
                <p className="text-neutral-600 text-sm">
                  Nougat ve sonrası tüm Android cihazlar desteklenir
                </p>
              </div>

              <div className="bg-white rounded-3xl shadow-card hover:shadow-hover transition-shadow duration-300 p-6 text-center">
                <div className="w-12 h-12 bg-android-green/10 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <i className="fas fa-cog text-2xl text-android-green" />
                </div>
                <h4 className="font-bold text-neutral-900 mb-2">Google Play Services</h4>
                <p className="text-neutral-600 text-sm">
                  Google Play Services gereklidir
                </p>
              </div>
            </div>
          </section>

          {/* Step 6: Troubleshooting */}
          <section id="step6" className="mb-24 scroll-mt-24">
            <div className="flex items-start gap-6 mb-12">
              <div className="flex-shrink-0 w-16 h-16 bg-gradient-to-br from-amber-500 to-orange-600 text-white rounded-2xl flex items-center justify-center text-2xl font-bold shadow-lg">
                6
              </div>
              <div className="flex-1">
                <h2 className="text-4xl md:text-5xl font-extrabold text-neutral-900 mb-3">
                  Sorun <span className="text-amber-500">Giderme</span>
                </h2>
                <p className="text-xl text-neutral-600">Android cihazlarda sık karşılaşılan sorunlar ve çözümleri</p>
              </div>
            </div>

            <Accordion items={troubleshootingItems} />

            {/* Support Fallback */}
            <div className="mt-8 p-6 bg-yellow-50 border-l-4 border-yellow-500 rounded-r-xl">
              <div className="flex items-start gap-4">
                <i className="fas fa-info-circle text-2xl text-yellow-600 flex-shrink-0 mt-1" />
                <div>
                  <h4 className="font-bold text-yellow-900 mb-2">Sorun Devam Ediyorsa</h4>
                  <p className="text-yellow-800 leading-relaxed">
                    Yukarıdaki adımları denedikten sonra hala sorun yaşıyorsanız, lütfen 
                    <a href="mailto:support@passgage.com" className="font-semibold underline ml-1">
                      support@passgage.com
                    </a> 
                    {' '}adresinden bizimle iletişime geçin.
                  </p>
                </div>
              </div>
            </div>
          </section>
        </div>
      </main>

      <Footer />
    </>
  );
}
