'use client';

import { Platform } from '@/lib/faq/types';

interface QuickChip {
  icon: string;
  label: string;
  query: string;
  platform?: Platform;
  step?: string;
}

interface QuickActionChipsProps {
  variant: 'landing' | 'ios' | 'android' | 'access-tag';
  currentStep?: string;
  onChipClick: (query: string) => void;
}

// Chip data for each variant
const chipData: Record<string, QuickChip[]> = {
  landing: [
    { icon: '🔑', label: 'Login yapamıyorum', query: 'Giriş yapamıyorum ne yapmalıyım?' },
    { icon: '⚡', label: 'QR okutamıyorum', query: 'QR kod okutamıyorum nasıl çözebilirim?' },
  ],
  ios: [
    { icon: '📍', label: 'Konum izni', query: 'iOS konum izni nasıl verilir?', step: 'step2' },
    { icon: '🔔', label: 'Bildirim izni', query: 'iOS bildirim izni nasıl açılır?', step: 'step2' },
    { icon: '📡', label: 'NFC kontrol', query: 'iPhone NFC destekliyor mu?', step: 'step4' },
    { icon: '📸', label: 'QR okutamıyorum', query: 'iOS QR kod okuyamıyorum', step: 'step5' },
  ],
  android: [
    { icon: '🔋', label: 'Pil optimizasyonu', query: 'Android pil optimizasyonu nasıl kapatılır?' },
    { icon: '📡', label: 'NFC açmıyor', query: 'Samsung NFC nasıl açılır?' },
    { icon: '🔐', label: 'Cihaz eşleştirme', query: 'Android cihaz eşleştirme nasıl yapılır?' },
    { icon: '📍', label: 'GPS sorunu', query: 'Android GPS çalışmıyor' },
  ],
  'access-tag': [
    { icon: '📦', label: 'Kutu içeriği', query: 'Access Tag kutusunda neler var?' },
    { icon: '🔧', label: 'Montaj', query: 'Access Tag nasıl monte edilir?' },
    { icon: '🧹', label: 'Bakım', query: 'Access Tag bakımı nasıl yapılır?' },
    { icon: '🔋', label: 'Pil ömrü', query: 'Access Tag pil ömrü ne kadar?' },
  ],
};

// Platform-specific gradient styles (Tailwind utility classes)
const gradientStyles: Record<string, string> = {
  landing: 'bg-gradient-to-br from-passgage-red to-passgage-gold',
  ios: 'bg-gradient-to-br from-gray-700 to-gray-900',
  android: 'bg-gradient-to-br from-android-green to-green-600',
  'access-tag': 'bg-gradient-to-br from-tag-blue to-blue-700',
};

export default function QuickActionChips({
  variant,
  currentStep,
  onChipClick,
}: QuickActionChipsProps) {
  const chips = chipData[variant] || chipData.landing;
  const gradientClass = gradientStyles[variant] || gradientStyles.landing;

  // Inline gradient as fallback (for better visibility)
  const getInlineGradient = (variant: string) => {
    const gradientMap: Record<string, string> = {
      landing: 'linear-gradient(135deg, #FF501D 0%, #FFD700 100%)',
      ios: 'linear-gradient(135deg, #374151 0%, #111827 100%)',
      android: 'linear-gradient(135deg, #3DDC84 0%, #16a34a 100%)',
      'access-tag': 'linear-gradient(135deg, #2872fa 0%, #1e40af 100%)',
    };
    return gradientMap[variant] || gradientMap.landing;
  };

  // Filter chips by step if currentStep is provided
  const filteredChips = currentStep
    ? chips.filter((chip) => !chip.step || chip.step === currentStep)
    : chips;

  const handleChipClick = (chip: QuickChip) => {
    // Track analytics
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', 'quick_chip_click', {
        event_category: 'search',
        chip_label: chip.label,
        platform: variant,
      });
    }

    onChipClick(chip.query);
  };

  return (
    <div className="flex gap-2 overflow-x-auto scrollbar-hide pb-1">
      {filteredChips.map((chip, index) => (
        <button
          key={index}
          onClick={() => handleChipClick(chip)}
          className="
            bg-neutral-100 hover:bg-neutral-200
            text-neutral-700
            px-3 py-1.5 rounded-lg
            flex items-center gap-2 whitespace-nowrap
            transition-colors duration-150
            focus:outline-none focus:ring-2 focus:ring-passgage-blue/30
            flex-shrink-0
            text-sm font-medium
          "
          aria-label={`Hızlı eylem: ${chip.label}`}
        >
          <span className="text-base">{chip.icon}</span>
          <span>{chip.label}</span>
        </button>
      ))}
    </div>
  );
}
