'use client';

import { useState, useEffect } from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { PhoneMockup, Accordion } from '@/components/guide';
import type { AccordionItem } from '@/components/guide';

export default function IOSGuidePage() {
  const [activeStep, setActiveStep] = useState(1);

  // Troubleshooting FAQ data
  const troubleshootingItems: AccordionItem[] = [
    {
      id: 'safari-location',
      question: 'Safari Konum İznine İzin Vermedi',
      answer: (
        <div className="space-y-4">
          <p>Safari tarayıcısı konum iznini engellediyse, aşağıdaki adımları izleyin:</p>
          <ol className="list-decimal list-inside space-y-2 ml-4">
            <li>Ayarlar uygulamasını açın</li>
            <li>Safari seçeneğine gidin</li>
            <li>Konum bölümünü bulun</li>
            <li>"Sorarken İzin Ver" seçeneğini seçin</li>
            <li>Passgage uygulamasını yeniden açın ve tekrar deneyin</li>
          </ol>
        </div>
      ),
    },
    {
      id: 'gps-refresh',
      question: 'GPS Konumum Yenilenmiyor',
      answer: (
        <div className="space-y-4">
          <p>GPS konumunuz düzgün yenilenmiyorsa:</p>
          <ol className="list-decimal list-inside space-y-2 ml-4">
            <li>Ayarlar  Gizlilik ve Güvenlik  Konum Servisleri</li>
            <li>Passgage uygulamasını bulun</li>
            <li>"Uygulama Kullanımda İken" seçeneğini seçin</li>
            <li>"Kesin Konum" ayarının açık olduğundan emin olun</li>
            <li>Uygulamayı tamamen kapatıp tekrar açın</li>
          </ol>
        </div>
      ),
    },
  ];

  return (
    <>
      <Header showSearch={true} />

      <main>
        {/* Hero Section */}
        <section className="relative min-h-[60vh] flex items-center justify-center overflow-hidden bg-gradient-to-br from-ios-black via-neutral-800 to-neutral-900">
          {/* Background Grid */}
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAwIDEwIEwgNDAgMTAgTSAxMCAwIEwgMTAgNDAgTSAwIDIwIEwgNDAgMjAgTSAyMCAwIEwgMjAgNDAgTSAwIDMwIEwgNDAgMzAgTSAzMCAwIEwgMzAgNDAiIGZpbGw9Im5vbmUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS1vcGFjaXR5PSIwLjAzIiBzdHJva2Utd2lkdGg9IjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')] opacity-30" />

          <div className="relative z-10 max-w-4xl mx-auto px-6 text-center py-20">
            {/* iOS Icon */}
            <div className="w-20 h-20 mx-auto mb-6 bg-white/10 backdrop-blur-sm rounded-3xl flex items-center justify-center">
              <i className="fab fa-apple text-4xl text-white" />
            </div>

            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6">
              Passgage
              <br />
              <span className="bg-gradient-to-r from-white to-white/70 bg-clip-text text-transparent">
                iOS Kurulumu
              </span>
            </h1>

            <p className="text-xl md:text-2xl text-white/90 mb-10 leading-relaxed">
              iPhone ve iPad için özel hazırlanmış kurulum rehberi.
              <br />
              iOS 13 ve üzeri cihazlar için optimize edilmiştir.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="#step1"
                className="px-8 py-4 bg-white text-ios-black rounded-2xl font-bold text-lg shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2"
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
          {/* Step 1: Download */}
          <section id="step1" className="mb-24 scroll-mt-24">
            <div className="flex items-start gap-6 mb-12">
              <div className="flex-shrink-0 w-16 h-16 bg-gradient-to-br from-passgage-red to-passgage-gold text-white rounded-2xl flex items-center justify-center text-2xl font-bold shadow-lg">
                1
              </div>
              <div className="flex-1">
                <h2 className="text-4xl md:text-5xl font-extrabold text-neutral-900 mb-3">
                  Uygulamayı <span className="bg-gradient-to-r from-passgage-red to-passgage-gold bg-clip-text text-transparent">İndirin</span>
                </h2>
                <p className="text-xl text-neutral-600">App Store'dan ücretsiz indirin</p>
              </div>
            </div>

            <div className="max-w-lg mx-auto mb-12">
              <a
                href="https://apps.apple.com/app/passgage/id6477761817"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white rounded-3xl shadow-card hover:shadow-hover transition-shadow duration-300 p-8 hover:-translate-y-2 no-underline flex items-center justify-between group block"
              >
                <div className="flex items-center gap-6">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center text-white text-3xl">
                    <i className="fab fa-apple" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-neutral-900 mb-1">App Store</h3>
                    <p className="text-neutral-600">iPhone & iPad için</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 text-ios-blue font-bold group-hover:gap-4 transition-all">
                  <span>Ücretsiz İndir</span>
                  <i className="fas fa-arrow-right" />
                </div>
              </a>
            </div>

            <div className="grid md:grid-cols-2 gap-8 max-w-2xl mx-auto">
              <div className="bg-white rounded-3xl shadow-card hover:shadow-hover transition-shadow duration-300 p-6 text-center">
                <div className="w-12 h-12 bg-ios-blue/10 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <i className="fas fa-mobile-alt text-2xl text-ios-blue" />
                </div>
                <h4 className="font-bold text-neutral-900 mb-2">iOS 13 ve Üzeri</h4>
                <p className="text-neutral-600 text-sm">
                  iPhone 6s ve sonrası tüm modeller desteklenir
                </p>
              </div>

              <div className="bg-white rounded-3xl shadow-card hover:shadow-hover transition-shadow duration-300 p-6 text-center">
                <div className="w-12 h-12 bg-ios-blue/10 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <i className="fas fa-wifi text-2xl text-ios-blue" />
                </div>
                <h4 className="font-bold text-neutral-900 mb-2">NFC Uyumluluğu</h4>
                <p className="text-neutral-600 text-sm">
                  iPhone 7 ve sonrası NFC destekler
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
                <p className="text-xl text-neutral-600">Sık karşılaşılan sorunlar ve çözümleri</p>
              </div>
            </div>

            <Accordion items={troubleshootingItems} />
          </section>
        </div>
      </main>

      <Footer />
    </>
  );
}
