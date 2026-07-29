'use client';

import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'accent' | 'text';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
  fullWidth?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  children,
  icon,
  iconPosition = 'right',
  fullWidth = false,
  className = '',
  ...props
}) => {
  const baseStyles = 'inline-flex items-center justify-center font-semibold transition-all duration-[var(--dur-fast)] ease-[var(--ease-out)] cursor-pointer rounded-sm border text-center active:scale-[.98] focus:outline-none focus:ring-2 focus:ring-[var(--focus-ring)] focus:ring-offset-1';
  
  let variantStyles = '';
  switch (variant) {
    case 'primary':
      variantStyles = 'bg-[var(--brand-primary)] hover:bg-[var(--brand-primary-hover)] text-[var(--text-on-brand)] border-transparent shadow-sm';
      break;
    case 'secondary':
      variantStyles = 'bg-[var(--brand-secondary)] hover:bg-[var(--brand-secondary-hover)] text-[var(--text-on-secondary)] border-transparent shadow-sm';
      break;
    case 'accent':
      variantStyles = 'bg-[var(--accent)] hover:bg-[var(--accent-hover)] text-[var(--neutral-900)] border-transparent shadow-sm font-bold';
      break;
    case 'outline':
      variantStyles = 'bg-transparent text-[var(--text-primary)] border-[var(--border-strong)] hover:border-[var(--brand-primary)] hover:text-[var(--brand-primary)]';
      break;
    case 'text':
      variantStyles = 'bg-transparent text-[var(--text-primary)] border-transparent hover:text-[var(--brand-primary)] hover:bg-[var(--surface-sunken)]';
      break;
  }

  let sizeStyles = '';
  switch (size) {
    case 'sm':
      sizeStyles = 'px-3 py-1.5 text-xs gap-1.5';
      break;
    case 'md':
      sizeStyles = 'px-4 py-2 text-sm gap-2';
      break;
    case 'lg':
      sizeStyles = 'px-6 py-3 text-base gap-2.5';
      break;
  }

  const widthStyle = fullWidth ? 'w-full' : '';

  return (
    <button
      className={`${baseStyles} ${variantStyles} ${sizeStyles} ${widthStyle} ${className}`}
      {...props}
    >
      {icon && iconPosition === 'left' && <span className="flex-shrink-0">{icon}</span>}
      <span>{children}</span>
      {icon && iconPosition === 'right' && <span className="flex-shrink-0">{icon}</span>}
    </button>
  );
};
