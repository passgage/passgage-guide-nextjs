import Image from 'next/image';

export interface PhoneMockupProps {
  screenshot: string;
  alt: string;
  className?: string;
  priority?: boolean;
}

export default function PhoneMockup({
  screenshot,
  alt,
  className = '',
  priority = false,
}: PhoneMockupProps) {
  return (
    <div className={`phone-mockup ${className}`}>
      <div className="phone-screen relative">
        <Image
          src={screenshot}
          alt={alt}
          fill
          className="object-cover object-top"
          priority={priority}
          sizes="(max-width: 768px) 100vw, 375px"
        />
      </div>
    </div>
  );
}

export interface PhoneMockupGridProps {
  screenshots: Array<{
    src: string;
    alt: string;
  }>;
  className?: string;
}

export function PhoneMockupGrid({ screenshots, className = '' }: PhoneMockupGridProps) {
  return (
    <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 ${className}`}>
      {screenshots.map((screenshot, index) => (
        <PhoneMockup
          key={index}
          screenshot={screenshot.src}
          alt={screenshot.alt}
          priority={index === 0}
        />
      ))}
    </div>
  );
}
