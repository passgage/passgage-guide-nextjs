export interface InfoBoxProps {
  icon?: string;
  title: string;
  children: React.ReactNode;
  variant?: 'default' | 'warning' | 'success' | 'info' | 'gradient';
  className?: string;
}

export default function InfoBox({
  icon = 'fas fa-info-circle',
  title,
  children,
  variant = 'default',
  className = '',
}: InfoBoxProps) {
  const variantStyles = {
    default: 'bg-blue-50 border-blue-400',
    warning: 'bg-amber-50 border-amber-400',
    success: 'bg-green-50 border-green-400',
    info: 'bg-sky-50 border-sky-400',
    gradient: '', // Handled separately with inline styles
  };

  const iconColors = {
    default: 'text-blue-600',
    warning: 'text-amber-600',
    success: 'text-green-600',
    info: 'text-sky-600',
    gradient: 'text-white',
  };

  if (variant === 'gradient') {
    return (
      <div
        className={`rounded-2xl md:rounded-3xl p-6 md:p-8 flex gap-4 md:gap-6 items-start shadow-strong ${className}`}
        style={{
          background: 'linear-gradient(135deg, #FF501D 0%, #FFD700 100%)',
        }}
      >
        <div
          className="w-12 h-12 md:w-14 md:h-14 rounded-xl md:rounded-2xl flex items-center justify-center flex-shrink-0"
          style={{
            background: 'rgba(255, 255, 255, 0.2)',
            backdropFilter: 'blur(10px)',
          }}
        >
          <i className={`${icon} text-2xl md:text-3xl ${iconColors[variant]}`} />
        </div>
        <div className="flex-1">
          <h4 className="text-lg md:text-xl font-bold text-white mb-2 md:mb-3">{title}</h4>
          <div className="text-white/95 leading-relaxed text-sm md:text-base">{children}</div>
        </div>
      </div>
    );
  }

  return (
    <div className={`border-l-4 rounded-r-xl md:rounded-r-2xl p-5 md:p-6 flex gap-4 items-start ${variantStyles[variant]} ${className}`}>
      <i className={`${icon} text-xl md:text-2xl flex-shrink-0 ${iconColors[variant]}`} />
      <div className="flex-1">
        <h4 className="text-base md:text-lg font-bold text-neutral-900 mb-2">{title}</h4>
        <div className="text-neutral-700 leading-relaxed text-sm md:text-base">{children}</div>
      </div>
    </div>
  );
}
