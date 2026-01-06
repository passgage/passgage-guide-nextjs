import { HTMLAttributes, ReactNode } from 'react';

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  hover?: boolean;
  platform?: 'ios' | 'android' | 'access-tag' | 'neutral';
  children: ReactNode;
}

export default function Card({
  className = '',
  hover = false,
  platform = 'neutral',
  children,
  ...props
}: CardProps) {
  const baseStyles = 'bg-white rounded-3xl shadow-card transition-all duration-300';

  const hoverStyles = hover
    ? 'hover:shadow-hover hover:-translate-y-1 cursor-pointer'
    : '';

  const platformStyles = {
    ios: 'border-t-4 border-ios-blue',
    android: 'border-t-4 border-android-green',
    'access-tag': 'border-t-4 border-tag-blue',
    neutral: '',
  };

  return (
    <div
      className={`${baseStyles} ${hoverStyles} ${platformStyles[platform]} ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}

export interface CardHeaderProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
}

export function CardHeader({ className = '', children, ...props }: CardHeaderProps) {
  return (
    <div className={`px-8 pt-8 pb-4 ${className}`} {...props}>
      {children}
    </div>
  );
}

export interface CardBodyProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
}

export function CardBody({ className = '', children, ...props }: CardBodyProps) {
  return (
    <div className={`px-8 pb-8 ${className}`} {...props}>
      {children}
    </div>
  );
}

export interface CardFooterProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
}

export function CardFooter({ className = '', children, ...props }: CardFooterProps) {
  return (
    <div className={`px-8 pb-8 pt-4 border-t border-neutral-100 ${className}`} {...props}>
      {children}
    </div>
  );
}
