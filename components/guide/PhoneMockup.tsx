import Image from 'next/image';

export interface PhoneMockupProps {
  screenshot?: string;
  alt: string;
  placeholder?: {
    icon: string;
    text: string;
  };
  className?: string;
}

export default function PhoneMockup({
  screenshot,
  alt,
  placeholder,
  className = '',
}: PhoneMockupProps) {
  return (
    <div className={`relative mx-auto bg-neutral-900 rounded-[3rem] shadow-2xl border-[14px] border-neutral-900 w-[375px] h-[812px] ${className}`}>
      {/* Phone Notch */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-40 h-7 bg-neutral-900 rounded-b-3xl z-10" />

      {/* Phone Screen */}
      <div className="w-full h-full overflow-hidden rounded-[2.2rem] bg-white relative">
        {screenshot ? (
          <Image
            src={screenshot}
            alt={alt}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 380px"
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
