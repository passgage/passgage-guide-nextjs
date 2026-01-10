import Link from 'next/link';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-neutral-900 text-white py-12 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div className="md:col-span-1">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-passgage-red to-passgage-gold rounded-xl flex items-center justify-center">
                <svg
                  className="w-6 h-6 text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <div>
                <h2 className="text-lg font-bold">Passgage</h2>
                <p className="text-xs text-white/70">Kurulum Kılavuzu</p>
              </div>
            </div>
            <p className="text-white/70 text-sm">
              iOS, Android ve Access Tag için detaylı kurulum rehberi.
            </p>
          </div>

          {/* Platform Links */}
          <div>
            <h3 className="font-bold mb-4">Platformlar</h3>
            <ul className="space-y-2 text-white/70 text-sm">
              <li>
                <Link href="/ios" className="hover:text-white transition-colors">
                  iOS Kurulumu
                </Link>
              </li>
              <li>
                <Link href="/android" className="hover:text-white transition-colors">
                  Android Kurulumu
                </Link>
              </li>
              <li>
                <Link href="/access-tag" className="hover:text-white transition-colors">
                  Access Tag Kurulumu
                </Link>
              </li>
            </ul>
          </div>

          {/* Help Links */}
          <div>
            <h3 className="font-bold mb-4">Yardım</h3>
            <ul className="space-y-2 text-white/70 text-sm">
              <li>
                <a
                  href="https://passgage.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors"
                >
                  Ana Sayfa
                </a>
              </li>
              <li>
                <a
                  href="https://passgage.com/support"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors"
                >
                  Destek
                </a>
              </li>
              <li>
                <a
                  href="https://passgage.com/contact"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors"
                >
                  İletişim
                </a>
              </li>
            </ul>
          </div>

          {/* App Download */}
          <div>
            <h3 className="font-bold mb-4">Uygulamayı İndir</h3>
            <div className="space-y-3">
              <a
                href="https://apps.apple.com/app/passgage/id6477761817"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 bg-white/10 hover:bg-white/20 px-4 py-2 rounded-xl transition-colors"
              >
                <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
                </svg>
                <div className="text-left">
                  <div className="text-xs text-white/70">App Store</div>
                  <div className="text-sm font-semibold">iOS</div>
                </div>
              </a>

              <a
                href="https://play.google.com/store/apps/details?id=com.passgage.app"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 bg-white/10 hover:bg-white/20 px-4 py-2 rounded-xl transition-colors"
              >
                <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M3,20.5V3.5C3,2.91 3.34,2.39 3.84,2.15L13.69,12L3.84,21.85C3.34,21.6 3,21.09 3,20.5M16.81,15.12L6.05,21.34L14.54,12.85L16.81,15.12M20.16,10.81C20.5,11.08 20.75,11.5 20.75,12C20.75,12.5 20.5,12.92 20.16,13.19L17.89,14.5L15.39,12L17.89,9.5L20.16,10.81M6.05,2.66L16.81,8.88L14.54,11.15L6.05,2.66Z"/>
                </svg>
                <div className="text-left">
                  <div className="text-xs text-white/70">Google Play</div>
                  <div className="text-sm font-semibold">Android</div>
                </div>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/10">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-white/70">
            <p>© {currentYear} Passgage. Tüm hakları saklıdır.</p>
            <div className="flex gap-4">
              <Link href="/privacy" className="hover:text-white transition-colors">
                Gizlilik Politikası
              </Link>
              <Link href="/terms" className="hover:text-white transition-colors">
                Kullanım Koşulları
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
