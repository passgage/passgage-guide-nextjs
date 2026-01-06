export interface InfoBoxProps {
  icon?: string;
  title: string;
  children: React.ReactNode;
  variant?: 'default' | 'warning' | 'success';
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
  };

  const iconColors = {
    default: 'text-blue-600',
    warning: 'text-amber-600',
    success: 'text-green-600',
  };

  return (
    <div className={`border-l-4 rounded-r-xl p-6 flex gap-4 items-start ${variantStyles[variant]} ${className}`}>
      <i className={`${icon} text-2xl flex-shrink-0 ${iconColors[variant]}`} />
      <div className="flex-1">
        <h4 className="text-lg font-bold text-neutral-900 mb-2">{title}</h4>
        <div className="text-neutral-700 leading-relaxed">{children}</div>
      </div>
    </div>
  );
}
