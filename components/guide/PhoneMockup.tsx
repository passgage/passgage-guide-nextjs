import Image from 'next/image';

export interface PhoneMockupProps {
  /** Screenshot image path (also accepts imageSrc for compatibility) */
  screenshot?: string;
  imageSrc?: string;
  alt: string;
  /** Platform for styling (ios or android) */
  platform?: 'ios' | 'android';
  placeholder?: {
    icon: string;
    text: string;
  };
  className?: string;
}

export default function PhoneMockup({
  screenshot,
  imageSrc,
  alt,
  platform = 'ios',
  placeholder,
  className = '',
}: PhoneMockupProps) {
  // Support both screenshot and imageSrc props
  const imageSource = imageSrc || screenshot;

  // Check if image is SVG (for placeholder support)
  const isSVG = imageSource?.endsWith('.svg');

  // Platform-specific frame colors
  const frameColor = platform === 'android' ? 'bg-neutral-900' : 'bg-neutral-900';

  return (
    <div className={`relative mx-auto ${frameColor} rounded-[3rem] shadow-2xl border-[14px] ${frameColor} w-[375px] h-[812px] ${className}`}>
      {/* Phone Notch */}
      <div className={`absolute top-0 left-1/2 -translate-x-1/2 w-40 h-7 ${frameColor} rounded-b-3xl z-10`} />

      {/* Phone Screen */}
      <div className="w-full h-full overflow-hidden rounded-[2.2rem] bg-white relative">
        {imageSource ? (
          <Image
            src={imageSource}
            alt={alt}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 380px"
            priority={false}
            unoptimized={isSVG}
          />
        ) : placeholder ? (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-neutral-50">
            <i className={`${placeholder.icon} text-4xl mb-3 text-neutral-400`} />
            <p className="text-sm text-neutral-500 text-center px-4">{placeholder.text}</p>
          </div>
        ) : null}
      </div>
    </div>
  );
}
