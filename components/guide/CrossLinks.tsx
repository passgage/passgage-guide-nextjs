import Link from 'next/link';

interface CrossLink {
  title: string;
  description: string;
  href: string;
  icon: string;
  gradient: string;
}

interface CrossLinksProps {
  currentPlatform: 'ios' | 'android' | 'access-tag';
}

export default function CrossLinks({ currentPlatform }: CrossLinksProps) {
  const allLinks: Record<string, CrossLink> = {
    ios: {
      title: 'iOS Kurulum',
      description: 'iPhone ve iPad için adım adım kurulum rehberi',
      href: '/ios',
      icon: 'fab fa-apple',
      gradient: 'linear-gradient(135deg, #1d1d1f 0%, #86868b 100%)',
    },
    android: {
      title: 'Android Kurulum',
      description: 'Samsung, Xiaomi, Huawei için kurulum kılavuzu',
      href: '/android',
      icon: 'fab fa-android',
      gradient: 'linear-gradient(135deg, #3ddc84 0%, #34a853 100%)',
    },
    'access-tag': {
      title: 'Access Tag Kurulum',
      description: 'Fiziksel Access Tag montaj ve yapılandırma',
      href: '/access-tag',
      icon: 'fas fa-qrcode',
      gradient: 'linear-gradient(135deg, #2872fa 0%, #1a5490 100%)',
    },
  };

  // Filter out current platform
  const links = Object.entries(allLinks)
    .filter(([key]) => key !== currentPlatform)
    .map(([, link]) => link);

  return (
    <section className="py-20 px-6 bg-white border-t border-neutral-100">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-4">
            Diğer{' '}
            <span
              style={{
                background: 'linear-gradient(135deg, #FF501D 0%, #FFD700 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              Kılavuzlar
            </span>
          </h2>
          <p className="text-lg text-neutral-600 max-w-2xl mx-auto">
            Farklı platformlar için kurulum rehberlerimizi keşfedin
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 max-w-4xl mx-auto">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="group relative rounded-3xl p-8 bg-neutral-50 border-2 border-neutral-200 hover:border-neutral-300 transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
            >
              {/* Icon */}
              <div
                className="w-16 h-16 rounded-2xl flex items-center justify-center text-white text-3xl mb-6 shadow-lg transition-transform duration-300 group-hover:scale-110"
                style={{ background: link.gradient }}
              >
                <i className={link.icon}></i>
              </div>

              {/* Content */}
              <h3 className="text-2xl font-bold text-neutral-900 mb-3 group-hover:text-passgage-red transition-colors">
                {link.title}
                <i className="fas fa-arrow-right text-base ml-2 opacity-0 group-hover:opacity-100 transition-opacity"></i>
              </h3>
              <p className="text-neutral-600 leading-relaxed">{link.description}</p>

              {/* Decorative gradient line */}
              <div
                className="absolute bottom-0 left-0 right-0 h-1 rounded-b-3xl opacity-0 group-hover:opacity-100 transition-opacity"
                style={{ background: link.gradient }}
              ></div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
