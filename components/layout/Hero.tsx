import { ReactNode } from 'react';

export interface HeroProps {
  title: string;
  subtitle?: string;
  platform?: 'ios' | 'android' | 'access-tag';
  gradient?: boolean;
  children?: ReactNode;
  className?: string;
}

export default function Hero({
  title,
  subtitle,
  platform,
  gradient = true,
  children,
  className = '',
}: HeroProps) {
  const gradients = {
    ios: 'from-ios-blue to-blue-600',
    android: 'from-android-green to-green-600',
    'access-tag': 'from-tag-blue to-tag-navy',
  };

  const bgClass = gradient && platform
    ? `bg-gradient-to-br ${gradients[platform]}`
    : gradient
    ? 'bg-gradient-to-br from-passgage-blue to-blue-600'
    : 'bg-passgage-dark';

  return (
    <section className={`relative py-20 md:py-32 px-6 overflow-hidden ${bgClass} ${className}`}>
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS13aWR0aD0iMSIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNncmlkKSIvPjwvc3ZnPg==')] bg-repeat"></div>
      </div>

      <div className="relative max-w-7xl mx-auto text-center">
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 animate-slide-up">
          {title}
        </h1>

        {subtitle && (
          <p className="text-xl md:text-2xl text-white/90 mb-8 max-w-3xl mx-auto animate-fade-in">
            {subtitle}
          </p>
        )}

        {children && (
          <div className="animate-scale-in">
            {children}
          </div>
        )}
      </div>
    </section>
  );
}
