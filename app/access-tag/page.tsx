'use client';

import Link from 'next/link';
import Image from 'next/image';
import ProgressNav from '@/components/layout/ProgressNav';

const accessTagSteps = [
  { id: 'step1', number: 1, label: 'Paket içeriği' },
  { id: 'step2', number: 2, label: 'Lokasyon belirleme' },
  { id: 'step3', number: 3, label: 'Montaj' },
  { id: 'step4', number: 4, label: 'QR kod yapılandırma' },
  { id: 'step5', number: 5, label: 'Bakım' },
];

export default function AccessTagPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Custom Header with ProgressNav */}
      <header
        className="fixed top-0 left-0 right-0 z-[1000] px-8 py-4 border-b border-black/[0.06] transition-all duration-300"
        style={{
          background: 'rgba(255, 255, 255, 0.95)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)'
        }}
      >
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-3.5">
            <Link href="/" className="flex items-center gap-2 text-gray-700 hover:text-primary-blue transition-colors font-semibold text-sm">
              <i className="fas fa-arrow-left" />
              <span className="hidden sm:inline">Ana Sayfa</span>
            </Link>
            <div className="h-6 w-px bg-gray-300" />
            <Image
              src="https://passgage.com/wp-content/uploads/2023/11/Passgage-Primary-Logo.svg"
              alt="Passgage"
              width={120}
              height={30}
              className="h-7"
            />
            <span
              className="text-white text-[0.65rem] font-extrabold px-3 py-1.5 rounded-[20px] tracking-[0.8px] uppercase shadow-md"
              style={{
                background: 'linear-gradient(135deg, #2872fa 0%, #1a5fd9 100%)'
              }}
            >
              Access Tag Kurulumu
            </span>
          </div>
          <ProgressNav steps={accessTagSteps} />
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-8 overflow-hidden">
        <div
          className="absolute inset-0 z-0"
          style={{
            background: 'linear-gradient(135deg, #1a1a2e 0%, #252542 100%)'
          }}
        />
        <div
          className="absolute inset-0 z-0 opacity-10"
          style={{
            backgroundImage: `
              linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)
            `,
            backgroundSize: '50px 50px'
          }}
        />
        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <div
            className="w-24 h-24 mx-auto mb-10 rounded-[28px] flex items-center justify-center text-white text-5xl shadow-glow-lg animate-float"
            style={{
              background: 'linear-gradient(135deg, #2872fa 0%, #1a5fd9 100%)'
            }}
          >
            <i className="fas fa-qrcode" />
          </div>
          <h1 className="text-5xl md:text-6xl font-extrabold text-white mb-6">
            Passgage{' '}
            <span
              className="inline-block"
              style={{
                background: 'linear-gradient(135deg, #2872fa 0%, #1a5fd9 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text'
              }}
            >
              Access Tag
            </span>{' '}
            Kurulumu
          </h1>
          <p className="text-xl text-gray-300 mb-10 max-w-2xl mx-auto">
            QR kod etiketlerinizi profesyonelce kurun. Fiziksel montajdan dijital yapılandırmaya kadar eksiksiz rehber.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="#step1"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-full text-white font-bold text-base transition-all duration-300 hover:scale-105 shadow-lg"
              style={{
                background: 'linear-gradient(135deg, #FF501D 0%, #FFD700 100%)'
              }}
            >
              <i className="fas fa-play" />
              Başlayalım
            </a>
            <a
              href="#step5"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-full text-gray-900 font-bold text-base bg-white transition-all duration-300 hover:scale-105 shadow-lg"
            >
              <i className="fas fa-tools" />
              Bakım & Sorun Giderme
            </a>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <main className="py-16 md:py-20 px-8 max-w-7xl mx-auto">
        {/* Step 1: Package Contents */}
        <section className="mb-24" id="step1">
          <div className="flex items-start gap-6 mb-12">
            <div
              className="flex-shrink-0 w-16 h-16 text-white rounded-2xl flex items-center justify-center text-2xl font-bold shadow-medium"
              style={{
                background: 'linear-gradient(135deg, #FF501D 0%, #FFD700 100%)'
              }}
            >
              1
            </div>
            <div className="flex-1">
              <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-3">
                Paket İçeriği ve{' '}
                <span
                  className="inline-block"
                  style={{
                    background: 'linear-gradient(135deg, #FF501D 0%, #FFD700 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text'
                  }}
                >
                  Hazırlık
                </span>
              </h2>
              <p className="text-xl text-gray-600">Access Tag paketinizi açın ve içeriği kontrol edin</p>
            </div>
          </div>

          {/* Package Contents */}
          <h3 className="text-2xl font-bold text-gray-900 mb-6">Paket İçeriği</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            <div className="flex items-center gap-4 p-6 bg-white rounded-2xl border-2 border-gray-200 hover:border-primary-blue hover:shadow-soft transition-all duration-300">
              <i className="fas fa-qrcode text-3xl text-primary-blue" />
              <span className="text-gray-700 font-semibold">Access Tag (QR kod etiketi)</span>
            </div>
            <div className="flex items-center gap-4 p-6 bg-white rounded-2xl border-2 border-gray-200 hover:border-primary-blue hover:shadow-soft transition-all duration-300">
              <i className="fas fa-screwdriver text-3xl text-primary-blue" />
              <span className="text-gray-700 font-semibold">Montaj donanımı (vida, dübel)</span>
            </div>
            <div className="flex items-center gap-4 p-6 bg-white rounded-2xl border-2 border-gray-200 hover:border-primary-blue hover:shadow-soft transition-all duration-300">
              <i className="fas fa-sticky-note text-3xl text-primary-blue" />
              <span className="text-gray-700 font-semibold">Yapışkan pad</span>
            </div>
            <div className="flex items-center gap-4 p-6 bg-white rounded-2xl border-2 border-gray-200 hover:border-primary-blue hover:shadow-soft transition-all duration-300">
              <i className="fas fa-book text-3xl text-primary-blue" />
              <span className="text-gray-700 font-semibold">Kullanım kılavuzu</span>
            </div>
            <div className="flex items-center gap-4 p-6 bg-white rounded-2xl border-2 border-gray-200 hover:border-primary-blue hover:shadow-soft transition-all duration-300">
              <i className="fas fa-tag text-3xl text-primary-blue" />
              <span className="text-gray-700 font-semibold">Passgage logosu ve markalama</span>
            </div>
          </div>

          {/* Technical Specifications */}
          <h3 className="text-2xl font-bold text-gray-900 mt-12 mb-6">Teknik Özellikler</h3>
          <div className="bg-white rounded-3xl overflow-hidden shadow-card">
            <table className="w-full">
              <thead>
                <tr style={{ background: 'linear-gradient(135deg, #2872fa 0%, #1a5fd9 100%)' }}>
                  <th className="text-left text-white font-bold p-5">Özellik</th>
                  <th className="text-left text-white font-bold p-5">Değer</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-gray-200 hover:bg-gray-50 transition-colors">
                  <td className="p-5 text-gray-900 font-semibold">Boyutlar</td>
                  <td className="p-5 text-gray-700">150mm x 150mm (Standart) / 200mm x 200mm (Büyük)</td>
                </tr>
                <tr className="border-b border-gray-200 hover:bg-gray-50 transition-colors">
                  <td className="p-5 text-gray-900 font-semibold">Malzeme</td>
                  <td className="p-5 text-gray-700">Yüksek dayanıklı PVC / Metal (paslanmaz çelik)</td>
                </tr>
                <tr className="border-b border-gray-200 hover:bg-gray-50 transition-colors">
                  <td className="p-5 text-gray-900 font-semibold">Su geçirmezlik derecesi</td>
                  <td className="p-5 text-gray-700">IP65 (Dış mekan kullanımı için uygun)</td>
                </tr>
                <tr className="border-b border-gray-200 hover:bg-gray-50 transition-colors">
                  <td className="p-5 text-gray-900 font-semibold">Operasyon sıcaklığı</td>
                  <td className="p-5 text-gray-700">-20°C ile +60°C arası</td>
                </tr>
                <tr className="border-b border-gray-200 hover:bg-gray-50 transition-colors">
                  <td className="p-5 text-gray-900 font-semibold">UV koruması</td>
                  <td className="p-5 text-gray-700">
                    <i className="fas fa-check-circle text-green-600 text-xl mr-2" />
                    Evet
                  </td>
                </tr>
                <tr className="hover:bg-gray-50 transition-colors">
                  <td className="p-5 text-gray-900 font-semibold">Ömür beklentisi</td>
                  <td className="p-5 text-gray-700">5+ yıl (dış mekan koşullarında)</td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Required Tools */}
          <h3 className="text-2xl font-bold text-gray-900 mt-12 mb-6">Gerekli Araçlar</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white rounded-3xl p-8 border-2 border-gray-200 hover:border-primary-blue hover:shadow-card transition-all duration-300">
              <h4 className="flex items-center gap-3 text-xl font-bold text-gray-900 mb-6">
                <i className="fas fa-tools text-primary-blue" /> Zorunlu Araçlar
              </h4>
              <ul className="space-y-3">
                <li className="flex items-center gap-3 text-gray-700">
                  <i className="fas fa-check text-primary-blue" />
                  <span>Matkap (vida montajı için)</span>
                </li>
                <li className="flex items-center gap-3 text-gray-700">
                  <i className="fas fa-check text-primary-blue" />
                  <span>Seviye ölçer (düz montaj için)</span>
                </li>
                <li className="flex items-center gap-3 text-gray-700">
                  <i className="fas fa-check text-primary-blue" />
                  <span>Metre/mezura (yükseklik ölçümü)</span>
                </li>
                <li className="flex items-center gap-3 text-gray-700">
                  <i className="fas fa-check text-primary-blue" />
                  <span>Temizlik malzemeleri (yüzey temizliği)</span>
                </li>
                <li className="flex items-center gap-3 text-gray-700">
                  <i className="fas fa-check text-primary-blue" />
                  <span>Kalem/işaretleyici</span>
                </li>
              </ul>
            </div>
            <div className="bg-white rounded-3xl p-8 border-2 border-gray-200 hover:border-primary-blue hover:shadow-card transition-all duration-300">
              <h4 className="flex items-center gap-3 text-xl font-bold text-gray-900 mb-6">
                <i className="fas fa-plus-circle text-primary-blue" /> Opsiyonel Araçlar
              </h4>
              <ul className="space-y-3">
                <li className="flex items-center gap-3 text-gray-700">
                  <i className="fas fa-circle text-primary-blue text-sm" />
                  <span>Duvar dedektörü (kablo/boru kontrolü)</span>
                </li>
                <li className="flex items-center gap-3 text-gray-700">
                  <i className="fas fa-circle text-primary-blue text-sm" />
                  <span>Sıcak hava tabancası (yapışkan aktivasyonu)</span>
                </li>
                <li className="flex items-center gap-3 text-gray-700">
                  <i className="fas fa-circle text-primary-blue text-sm" />
                  <span>Tork tornavidası (hassas sıkma)</span>
                </li>
                <li className="flex items-center gap-3 text-gray-700">
                  <i className="fas fa-circle text-primary-blue text-sm" />
                  <span>Koruyucu eldiven</span>
                </li>
                <li className="flex items-center gap-3 text-gray-700">
                  <i className="fas fa-circle text-primary-blue text-sm" />
                  <span>Güvenlik gözlüğü</span>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* Step 2: Location Planning */}
        <section className="mb-24" id="step2">
          <div className="flex items-start gap-6 mb-12">
            <div
              className="flex-shrink-0 w-16 h-16 text-white rounded-2xl flex items-center justify-center text-2xl font-bold shadow-medium"
              style={{
                background: 'linear-gradient(135deg, #FF501D 0%, #FFD700 100%)'
              }}
            >
              2
            </div>
            <div className="flex-1">
              <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-3">
                Kurulum Lokasyonunu{' '}
                <span
                  className="inline-block"
                  style={{
                    background: 'linear-gradient(135deg, #FF501D 0%, #FFD700 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text'
                  }}
                >
                  Planlayın
                </span>
              </h2>
              <p className="text-xl text-gray-600">Optimal yerleşim için dikkat edilmesi gerekenler</p>
            </div>
          </div>

          {/* Ideal Height Diagram */}
          <h3 className="text-2xl font-bold text-gray-900 mb-6">İdeal Yerleşim Yüksekliği</h3>
          <div className="bg-white rounded-3xl p-10 shadow-card flex items-center justify-center min-h-[300px]">
            <div className="text-center flex flex-col items-center gap-6">
              <div
                className="w-24 h-24 rounded-full flex items-center justify-center text-white text-5xl shadow-strong"
                style={{
                  background: 'linear-gradient(135deg, #2872fa 0%, #1a5fd9 100%)'
                }}
              >
                <i className="fas fa-arrows-alt-v" />
              </div>
              <div className="text-4xl font-extrabold text-primary-blue">1.2m - 1.5m</div>
              <p className="text-gray-600 text-lg max-w-md">
                Göz hizası yüksekliği, kolay tarama ve erişim için optimal
              </p>
            </div>
          </div>

          {/* Site Survey Checklist */}
          <h3 className="text-2xl font-bold text-gray-900 mt-12 mb-6">Lokasyon Kontrol Listesi</h3>
          <div className="flex flex-col gap-4">
            <div className="flex items-start gap-4 p-5 bg-white rounded-xl border-2 border-gray-200 hover:border-primary-blue hover:bg-primary-blue/5 transition-all">
              <input
                type="checkbox"
                id="check1"
                className="w-6 h-6 cursor-pointer flex-shrink-0 mt-0.5"
                style={{ accentColor: '#2872fa' }}
              />
              <label htmlFor="check1" className="text-gray-700 leading-relaxed cursor-pointer flex-1">
                <strong>Yüksek trafik alanı:</strong> Çalışanların sık kullandığı giriş-çıkış noktaları
              </label>
            </div>
            <div className="flex items-start gap-4 p-5 bg-white rounded-xl border-2 border-gray-200 hover:border-primary-blue hover:bg-primary-blue/5 transition-all">
              <input
                type="checkbox"
                id="check2"
                className="w-6 h-6 cursor-pointer flex-shrink-0 mt-0.5"
                style={{ accentColor: '#2872fa' }}
              />
              <label htmlFor="check2" className="text-gray-700 leading-relaxed cursor-pointer flex-1">
                <strong>İyi aydınlatma:</strong> Doğal veya yapay ışık ile QR kod net görünür
              </label>
            </div>
            <div className="flex items-start gap-4 p-5 bg-white rounded-xl border-2 border-gray-200 hover:border-primary-blue hover:bg-primary-blue/5 transition-all">
              <input
                type="checkbox"
                id="check3"
                className="w-6 h-6 cursor-pointer flex-shrink-0 mt-0.5"
                style={{ accentColor: '#2872fa' }}
              />
              <label htmlFor="check3" className="text-gray-700 leading-relaxed cursor-pointer flex-1">
                <strong>Hava koşullarından korunma:</strong> Dış mekanda saçak veya koruma altında
              </label>
            </div>
            <div className="flex items-start gap-4 p-5 bg-white rounded-xl border-2 border-gray-200 hover:border-primary-blue hover:bg-primary-blue/5 transition-all">
              <input
                type="checkbox"
                id="check4"
                className="w-6 h-6 cursor-pointer flex-shrink-0 mt-0.5"
                style={{ accentColor: '#2872fa' }}
              />
              <label htmlFor="check4" className="text-gray-700 leading-relaxed cursor-pointer flex-1">
                <strong>Wi-Fi/cellular erişimi:</strong> Doğrulama için internet bağlantısı (mobil cihaz)
              </label>
            </div>
            <div className="flex items-start gap-4 p-5 bg-white rounded-xl border-2 border-gray-200 hover:border-primary-blue hover:bg-primary-blue/5 transition-all">
              <input
                type="checkbox"
                id="check5"
                className="w-6 h-6 cursor-pointer flex-shrink-0 mt-0.5"
                style={{ accentColor: '#2872fa' }}
              />
              <label htmlFor="check5" className="text-gray-700 leading-relaxed cursor-pointer flex-1">
                <strong>Temiz, düz yüzey:</strong> Montaj için uygun, düzgün yüzey
              </label>
            </div>
            <div className="flex items-start gap-4 p-5 bg-white rounded-xl border-2 border-gray-200 hover:border-primary-blue hover:bg-primary-blue/5 transition-all">
              <input
                type="checkbox"
                id="check6"
                className="w-6 h-6 cursor-pointer flex-shrink-0 mt-0.5"
                style={{ accentColor: '#2872fa' }}
              />
              <label htmlFor="check6" className="text-gray-700 leading-relaxed cursor-pointer flex-1">
                <strong>Engelsiz görüş hattı:</strong> Kullanıcıların kolayca görebileceği konum
              </label>
            </div>
          </div>

          {/* Visibility Tips */}
          <div
            className="border-l-4 rounded-r-3xl p-8 flex gap-5 items-start shadow-soft mt-8"
            style={{
              background: 'linear-gradient(to right, rgba(40, 114, 250, 0.1), rgba(26, 95, 217, 0.1))',
              borderColor: '#2872fa'
            }}
          >
            <i className="fas fa-eye text-primary-blue text-3xl flex-shrink-0" />
            <div>
              <h4 className="text-primary-blue font-extrabold text-xl mb-4">Görünürlük İpuçları</h4>
              <p className="text-gray-800 leading-relaxed">
                <strong>Yaklaşma yönü:</strong> Kullanıcıların tag&apos;e hangi yönden yaklaştığını düşünün. Doğal
                yürüme yolu üzerinde olmalı.
                <br />
                <br />
                <strong>Arka plan kontrast:</strong> QR kodun net görünmesi için arka plan ile yüksek kontrast
                sağlayın. Açık duvar üzerinde koyu QR veya tersi.
                <br />
                <br />
                <strong>Aydınlatma seviyeleri:</strong> Karanlık alanlarda ek aydınlatma düşünün. Gece vardiyaları için
                önemli.
              </p>
            </div>
          </div>
        </section>

        {/* Step 3: Physical Installation */}
        <section className="mb-24" id="step3">
          <div className="flex items-start gap-6 mb-12">
            <div
              className="flex-shrink-0 w-16 h-16 text-white rounded-2xl flex items-center justify-center text-2xl font-bold shadow-medium"
              style={{
                background: 'linear-gradient(135deg, #FF501D 0%, #FFD700 100%)'
              }}
            >
              3
            </div>
            <div className="flex-1">
              <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-3">
                Access Tag&apos;i{' '}
                <span
                  className="inline-block"
                  style={{
                    background: 'linear-gradient(135deg, #FF501D 0%, #FFD700 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text'
                  }}
                >
                  Monte Edin
                </span>
              </h2>
              <p className="text-xl text-gray-600">Fiziksel kurulum için üç farklı yöntem</p>
            </div>
          </div>

          {/* Mounting Methods */}
          <h3 className="text-2xl font-bold text-gray-900 mb-6">Montaj Yöntemleri</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Adhesive Mounting */}
            <div className="bg-white rounded-3xl p-8 border-2 border-gray-200 hover:border-primary-blue hover:shadow-strong hover:-translate-y-2 transition-all duration-300 relative overflow-hidden group">
              <div
                className="absolute top-0 left-0 right-0 h-1 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"
                style={{
                  background: 'linear-gradient(135deg, #2872fa 0%, #1a5fd9 100%)'
                }}
              />
              <div
                className="w-18 h-18 rounded-2xl flex items-center justify-center mb-6"
                style={{ background: 'rgba(40, 114, 250, 0.1)' }}
              >
                <i className="fas fa-sticky-note text-3xl text-primary-blue" />
              </div>
              <h4 className="text-2xl font-extrabold text-gray-900 mb-4">Yapışkan Montaj</h4>
              <span
                className="inline-block px-4 py-2 rounded-full text-sm font-semibold mb-5"
                style={{ background: 'rgba(40, 114, 250, 0.1)', color: '#2872fa' }}
              >
                En Kolay - Hızlı Kurulum
              </span>
              <div className="flex flex-col gap-3">
                <div className="flex items-start gap-3">
                  <span className="flex-shrink-0 w-6 h-6 bg-primary-blue text-white rounded-full flex items-center justify-center text-xs font-bold mt-0.5">
                    1
                  </span>
                  <span className="text-gray-700 leading-relaxed text-sm">
                    Yüzey temizliği ve kurulama (yukarıdaki adımlar)
                  </span>
                </div>
                <div className="flex items-start gap-3">
                  <span className="flex-shrink-0 w-6 h-6 bg-primary-blue text-white rounded-full flex items-center justify-center text-xs font-bold mt-0.5">
                    2
                  </span>
                  <span className="text-gray-700 leading-relaxed text-sm">
                    Yapışkan padın koruyucu filmini çıkarın
                  </span>
                </div>
                <div className="flex items-start gap-3">
                  <span className="flex-shrink-0 w-6 h-6 bg-primary-blue text-white rounded-full flex items-center justify-center text-xs font-bold mt-0.5">
                    3
                  </span>
                  <span className="text-gray-700 leading-relaxed text-sm">
                    Tag&apos;i yüzeye yerleştirin ve 30 saniye sabit basınç uygulayın
                  </span>
                </div>
                <div className="flex items-start gap-3">
                  <span className="flex-shrink-0 w-6 h-6 bg-primary-blue text-white rounded-full flex items-center justify-center text-xs font-bold mt-0.5">
                    4
                  </span>
                  <span className="text-gray-700 leading-relaxed text-sm">
                    24 saat boyunca tam yapışma için bekleme süresi
                  </span>
                </div>
              </div>
              <p className="mt-6 text-gray-600 text-sm leading-relaxed">
                <strong>Uygun:</strong> Düz yüzeyler, cam, metal, plastik. Geçici kurulumlar için ideal.
              </p>
            </div>

            {/* Screw Mounting */}
            <div className="bg-white rounded-3xl p-8 border-2 border-gray-200 hover:border-primary-blue hover:shadow-strong hover:-translate-y-2 transition-all duration-300 relative overflow-hidden group">
              <div
                className="absolute top-0 left-0 right-0 h-1 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"
                style={{
                  background: 'linear-gradient(135deg, #2872fa 0%, #1a5fd9 100%)'
                }}
              />
              <div
                className="w-18 h-18 rounded-2xl flex items-center justify-center mb-6"
                style={{ background: 'rgba(40, 114, 250, 0.1)' }}
              >
                <i className="fas fa-screwdriver text-3xl text-primary-blue" />
              </div>
              <h4 className="text-2xl font-extrabold text-gray-900 mb-4">Vida Montaj</h4>
              <span
                className="inline-block px-4 py-2 rounded-full text-sm font-semibold mb-5"
                style={{ background: 'rgba(40, 114, 250, 0.1)', color: '#2872fa' }}
              >
                En Güvenli - Kalıcı Kurulum
              </span>
              <div className="flex flex-col gap-3">
                <div className="flex items-start gap-3">
                  <span className="flex-shrink-0 w-6 h-6 bg-primary-blue text-white rounded-full flex items-center justify-center text-xs font-bold mt-0.5">
                    1
                  </span>
                  <span className="text-gray-700 leading-relaxed text-sm">
                    Tag&apos;i yüzeye tutun ve montaj noktalarını kalemle işaretleyin
                  </span>
                </div>
                <div className="flex items-start gap-3">
                  <span className="flex-shrink-0 w-6 h-6 bg-primary-blue text-white rounded-full flex items-center justify-center text-xs font-bold mt-0.5">
                    2
                  </span>
                  <span className="text-gray-700 leading-relaxed text-sm">
                    Matkap ile pilot delikler açın (genellikle 6mm)
                  </span>
                </div>
                <div className="flex items-start gap-3">
                  <span className="flex-shrink-0 w-6 h-6 bg-primary-blue text-white rounded-full flex items-center justify-center text-xs font-bold mt-0.5">
                    3
                  </span>
                  <span className="text-gray-700 leading-relaxed text-sm">
                    Dübelleri deliklere yerleştirin (beton/tuğla için)
                  </span>
                </div>
                <div className="flex items-start gap-3">
                  <span className="flex-shrink-0 w-6 h-6 bg-primary-blue text-white rounded-full flex items-center justify-center text-xs font-bold mt-0.5">
                    4
                  </span>
                  <span className="text-gray-700 leading-relaxed text-sm">
                    Vidaları tornavida ile sıkıştırın, aşırı sıkmayın
                  </span>
                </div>
              </div>
              <p className="mt-6 text-gray-600 text-sm leading-relaxed">
                <strong>Uygun:</strong> Kalıcı kurulumlar, yüksek trafik alanları, dış mekan. En dayanıklı yöntem.
              </p>
            </div>

            {/* Magnetic Mounting */}
            <div className="bg-white rounded-3xl p-8 border-2 border-gray-200 hover:border-primary-blue hover:shadow-strong hover:-translate-y-2 transition-all duration-300 relative overflow-hidden group">
              <div
                className="absolute top-0 left-0 right-0 h-1 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"
                style={{
                  background: 'linear-gradient(135deg, #2872fa 0%, #1a5fd9 100%)'
                }}
              />
              <div
                className="w-18 h-18 rounded-2xl flex items-center justify-center mb-6"
                style={{ background: 'rgba(40, 114, 250, 0.1)' }}
              >
                <i className="fas fa-magnet text-3xl text-primary-blue" />
              </div>
              <h4 className="text-2xl font-extrabold text-gray-900 mb-4">Manyetik Montaj</h4>
              <span
                className="inline-block px-4 py-2 rounded-full text-sm font-semibold mb-5"
                style={{ background: 'rgba(40, 114, 250, 0.1)', color: '#2872fa' }}
              >
                En Esnek - Kolay Pozisyon Değişimi
              </span>
              <div className="flex flex-col gap-3">
                <div className="flex items-start gap-3">
                  <span className="flex-shrink-0 w-6 h-6 bg-primary-blue text-white rounded-full flex items-center justify-center text-xs font-bold mt-0.5">
                    1
                  </span>
                  <span className="text-gray-700 leading-relaxed text-sm">
                    Manyetik tabanı metal yüzeye yapıştırın veya vidalayın
                  </span>
                </div>
                <div className="flex items-start gap-3">
                  <span className="flex-shrink-0 w-6 h-6 bg-primary-blue text-white rounded-full flex items-center justify-center text-xs font-bold mt-0.5">
                    2
                  </span>
                  <span className="text-gray-700 leading-relaxed text-sm">
                    Access Tag&apos;in arka yüzeyini manyetik tabana yaklaştırın
                  </span>
                </div>
                <div className="flex items-start gap-3">
                  <span className="flex-shrink-0 w-6 h-6 bg-primary-blue text-white rounded-full flex items-center justify-center text-xs font-bold mt-0.5">
                    3
                  </span>
                  <span className="text-gray-700 leading-relaxed text-sm">
                    Pozisyon testini yapın, gerekirse ayarlayın
                  </span>
                </div>
              </div>
              <p className="mt-6 text-gray-600 text-sm leading-relaxed">
                <strong>Uygun:</strong> Metal yüzeyler, kapılar, dolap kenarları. Esnek konumlandırma gerektiğinde.
              </p>
            </div>
          </div>
        </section>

        {/* Step 4: QR Code Configuration */}
        <section className="mb-24" id="step4">
          <div className="flex items-start gap-6 mb-12">
            <div
              className="flex-shrink-0 w-16 h-16 text-white rounded-2xl flex items-center justify-center text-2xl font-bold shadow-medium"
              style={{
                background: 'linear-gradient(135deg, #FF501D 0%, #FFD700 100%)'
              }}
            >
              4
            </div>
            <div className="flex-1">
              <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-3">
                Dijital{' '}
                <span
                  className="inline-block"
                  style={{
                    background: 'linear-gradient(135deg, #FF501D 0%, #FFD700 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text'
                  }}
                >
                  Yapılandırma
                </span>
              </h2>
              <p className="text-xl text-gray-600">QR kodu sisteme tanıtın ve yapılandırın</p>
            </div>
          </div>

          {/* QR Code Placeholder */}
          <div className="bg-white rounded-3xl p-12 text-center border-2 border-dashed border-gray-300 mb-8">
            <i className="fas fa-qrcode text-6xl text-primary-blue mb-4" />
            <h4 className="text-xl font-bold text-gray-900 mb-2">QR Kod Örneği</h4>
            <p className="text-gray-600">
              Her Access Tag benzersiz bir QR kod ile dijital lokasyon kaydına bağlanır
            </p>
          </div>

          {/* Admin Portal Info */}
          <div
            className="border-l-4 rounded-r-3xl p-8 flex gap-5 items-start shadow-soft"
            style={{
              background: 'linear-gradient(to right, rgba(40, 114, 250, 0.1), rgba(26, 95, 217, 0.1))',
              borderColor: '#2872fa'
            }}
          >
            <i className="fas fa-link text-primary-blue text-3xl flex-shrink-0" />
            <div>
              <h4 className="text-primary-blue font-extrabold text-xl mb-4">Fiziksel ve Dijital Eşleştirme</h4>
              <p className="text-gray-800 leading-relaxed">
                <strong>Tag ID kontrolü:</strong> Fiziksel tag&apos;in üzerindeki seri numarası ile dijital kayıttaki
                ID&apos;nin eşleştiğinden emin olun.
                <br />
                <br />
                <strong>Konum ataması:</strong> GPS koordinatları veya manuel adres ile lokasyonu tanımlayın. Mobil
                cihazdan check-in yapıldığında konum doğrulaması bu bilgiyi kullanır.
                <br />
                <br />
                <strong>İsim ve açıklama:</strong> Kullanıcı dostu isimler verin. &quot;B Binası 2. Kat Giriş&quot;
                gibi açıklayıcı isimler tercih edin.
              </p>
            </div>
          </div>
        </section>

        {/* Step 5: Maintenance */}
        <section className="mb-24" id="step5">
          <div className="flex items-start gap-6 mb-12">
            <div
              className="flex-shrink-0 w-16 h-16 text-white rounded-2xl flex items-center justify-center text-2xl font-bold shadow-medium"
              style={{
                background: 'linear-gradient(135deg, #FF501D 0%, #FFD700 100%)'
              }}
            >
              5
            </div>
            <div className="flex-1">
              <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-3">
                Bakım ve{' '}
                <span
                  className="inline-block"
                  style={{
                    background: 'linear-gradient(135deg, #FF501D 0%, #FFD700 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text'
                  }}
                >
                  Uzun Vadeli Yönetim
                </span>
              </h2>
              <p className="text-xl text-gray-600">Access Tag&apos;lerinizi optimal durumda tutun</p>
            </div>
          </div>

          {/* Maintenance Schedule */}
          <h3 className="text-2xl font-bold text-gray-900 mb-6">Bakım Takvimi</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Weekly */}
            <div className="bg-white rounded-3xl p-8 border-2 border-gray-200 hover:border-primary-blue hover:shadow-card hover:-translate-y-1 transition-all duration-300">
              <div className="flex items-center gap-4 mb-6">
                <div
                  className="w-14 h-14 rounded-xl flex items-center justify-center text-white text-2xl"
                  style={{
                    background: 'linear-gradient(135deg, #2872fa 0%, #1a5fd9 100%)'
                  }}
                >
                  <i className="fas fa-calendar-week" />
                </div>
                <h4 className="text-xl font-bold text-gray-900">Haftalık</h4>
              </div>
              <ul className="space-y-3">
                <li className="flex items-start gap-3 text-gray-700 text-sm leading-relaxed">
                  <i className="fas fa-eye text-primary-blue mt-1 flex-shrink-0" />
                  <span>Görsel kontrol (hasar, kir, konum)</span>
                </li>
                <li className="flex items-start gap-3 text-gray-700 text-sm leading-relaxed">
                  <i className="fas fa-broom text-primary-blue mt-1 flex-shrink-0" />
                  <span>Yüzey temizliği (toz ve kir)</span>
                </li>
                <li className="flex items-start gap-3 text-gray-700 text-sm leading-relaxed">
                  <i className="fas fa-qrcode text-primary-blue mt-1 flex-shrink-0" />
                  <span>Hızlı QR kod tarama testi</span>
                </li>
              </ul>
            </div>

            {/* Monthly */}
            <div className="bg-white rounded-3xl p-8 border-2 border-gray-200 hover:border-primary-blue hover:shadow-card hover:-translate-y-1 transition-all duration-300">
              <div className="flex items-center gap-4 mb-6">
                <div
                  className="w-14 h-14 rounded-xl flex items-center justify-center text-white text-2xl"
                  style={{
                    background: 'linear-gradient(135deg, #2872fa 0%, #1a5fd9 100%)'
                  }}
                >
                  <i className="fas fa-calendar-alt" />
                </div>
                <h4 className="text-xl font-bold text-gray-900">Aylık</h4>
              </div>
              <ul className="space-y-3">
                <li className="flex items-start gap-3 text-gray-700 text-sm leading-relaxed">
                  <i className="fas fa-spray-can text-primary-blue mt-1 flex-shrink-0" />
                  <span>Detaylı temizlik (dezenfektan ile)</span>
                </li>
                <li className="flex items-start gap-3 text-gray-700 text-sm leading-relaxed">
                  <i className="fas fa-mobile-alt text-primary-blue mt-1 flex-shrink-0" />
                  <span>QR kod okunabilirlik testi (farklı cihazlar)</span>
                </li>
                <li className="flex items-start gap-3 text-gray-700 text-sm leading-relaxed">
                  <i className="fas fa-screwdriver text-primary-blue mt-1 flex-shrink-0" />
                  <span>Montaj sağlamlığı kontrolü</span>
                </li>
                <li className="flex items-start gap-3 text-gray-700 text-sm leading-relaxed">
                  <i className="fas fa-chart-line text-primary-blue mt-1 flex-shrink-0" />
                  <span>Kullanım istatistiklerini inceleme</span>
                </li>
              </ul>
            </div>

            {/* Quarterly */}
            <div className="bg-white rounded-3xl p-8 border-2 border-gray-200 hover:border-primary-blue hover:shadow-card hover:-translate-y-1 transition-all duration-300">
              <div className="flex items-center gap-4 mb-6">
                <div
                  className="w-14 h-14 rounded-xl flex items-center justify-center text-white text-2xl"
                  style={{
                    background: 'linear-gradient(135deg, #2872fa 0%, #1a5fd9 100%)'
                  }}
                >
                  <i className="fas fa-calendar-check" />
                </div>
                <h4 className="text-xl font-bold text-gray-900">3 Aylık</h4>
              </div>
              <ul className="space-y-3">
                <li className="flex items-start gap-3 text-gray-700 text-sm leading-relaxed">
                  <i className="fas fa-cloud-rain text-primary-blue mt-1 flex-shrink-0" />
                  <span>Hava hasarı değerlendirmesi (dış mekan)</span>
                </li>
                <li className="flex items-start gap-3 text-gray-700 text-sm leading-relaxed">
                  <i className="fas fa-sun text-primary-blue mt-1 flex-shrink-0" />
                  <span>UV solması kontrolü</span>
                </li>
                <li className="flex items-start gap-3 text-gray-700 text-sm leading-relaxed">
                  <i className="fas fa-box text-primary-blue mt-1 flex-shrink-0" />
                  <span>Yedek tag ihtiyacı analizi</span>
                </li>
                <li className="flex items-start gap-3 text-gray-700 text-sm leading-relaxed">
                  <i className="fas fa-cogs text-primary-blue mt-1 flex-shrink-0" />
                  <span>Sistem entegrasyon testi</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Cleaning Instructions */}
          <h3 className="text-2xl font-bold text-gray-900 mt-12 mb-6">Temizlik Talimatları</h3>
          <div className="bg-white rounded-3xl p-8 border-2 border-gray-200">
            <h4 className="text-xl font-bold text-gray-900 mb-6">Doğru Temizlik Yöntemleri</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl hover:bg-primary-blue/5 transition-colors">
                <i className="fas fa-check-circle text-primary-blue text-2xl" />
                <span className="text-gray-700 text-sm leading-relaxed">
                  <strong>Yumuşak bez ve ılık su</strong> kullanın
                </span>
              </div>
              <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl hover:bg-primary-blue/5 transition-colors">
                <i className="fas fa-check-circle text-primary-blue text-2xl" />
                <span className="text-gray-700 text-sm leading-relaxed">
                  <strong>Hafif sabunlu su</strong> yağlı kirler için
                </span>
              </div>
              <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl hover:bg-primary-blue/5 transition-colors">
                <i className="fas fa-check-circle text-primary-blue text-2xl" />
                <span className="text-gray-700 text-sm leading-relaxed">
                  <strong>Microfiber bez</strong> çizilme riski azaltır
                </span>
              </div>
              <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl hover:bg-red-50 transition-colors">
                <i className="fas fa-times-circle text-red-600 text-2xl" />
                <span className="text-gray-700 text-sm leading-relaxed">
                  <strong>Alkol bazlı temizleyici KULLANMAYIN</strong>
                </span>
              </div>
              <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl hover:bg-red-50 transition-colors">
                <i className="fas fa-times-circle text-red-600 text-2xl" />
                <span className="text-gray-700 text-sm leading-relaxed">
                  <strong>Aşındırıcı malzeme KULLANMAYIN</strong>
                </span>
              </div>
              <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl hover:bg-red-50 transition-colors">
                <i className="fas fa-times-circle text-red-600 text-2xl" />
                <span className="text-gray-700 text-sm leading-relaxed">
                  <strong>Basınçlı su sıkmayın</strong>
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section className="text-center py-16 px-8">
          <h2 className="text-4xl font-extrabold text-gray-900 mb-4">Destek mi Gerekiyor?</h2>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Kurulum sırasında veya sonrasında herhangi bir sorun yaşarsanız, teknik destek ekibimizle iletişime geçin.
          </p>
          <a
            href="https://passgage.com/iletisim"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 px-10 py-5 rounded-full text-white font-bold text-lg transition-all duration-300 hover:scale-105 shadow-glow"
            style={{
              background: 'linear-gradient(135deg, #FF501D 0%, #FFD700 100%)'
            }}
          >
            <i className="fas fa-headset" />
            İletişime Geçin
          </a>
        </section>
      </main>

      {/* Footer */}
      <footer className="py-8 px-8 bg-white border-t border-gray-200">
        <p className="text-center text-gray-600">
          © 2024{' '}
          <a
            href="https://passgage.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-900 font-semibold hover:text-primary-red transition-colors no-underline"
          >
            Passgage
          </a>
          . Tüm hakları saklıdır. İK Süper Uygulaması
        </p>
      </footer>
    </div>
  );
}
