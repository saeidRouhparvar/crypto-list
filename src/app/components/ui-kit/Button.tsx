'use client';

import { ButtonHTMLAttributes } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'pagination';
  isActive?: boolean;
}

const Button = ({
  children,
  variant = 'default',
  isActive = false,
  className = '',
  ...rest
}: ButtonProps) => {
  const base =
    'inline-flex w-fit whitespace-nowrap items-center justify-center transition hover:bg-slate-100 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer';

  const variants = {
    default: 'px-4 py-2 rounded-md border',
    pagination: `
      w-8 h-8 rounded-md text-sm
      border border-slate-400
      hover:bg-gray-100
    `,
  };

  const activeStyles = isActive
    ? 'bg-gray-900 text-white border-gray-900 hover:bg-gray-900'
    : '';

  return (
    <button
      className={`${base} ${variants[variant]} ${activeStyles} ${className}`}
      {...rest}
    >
      {children}
    </button>
  );
};

export default Button;
