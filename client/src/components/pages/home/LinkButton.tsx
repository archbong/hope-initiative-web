import React from 'react';
import { Link } from 'react-router-dom';
import { cn } from '../../ui/cn';

interface LinkButtonProps {
  to: string;
  // Expanded variants to cover your entire UI design system
  variant?: 'primary' | 'secondary' | 'dark' | 'outline-white';
  children: React.ReactNode;
  className?: string;
  Icon?: React.ComponentType<{ className?: string }>; // Optional icon support
}

export const LinkButton = ({
  to,
  variant = 'primary',
  children,
  className,
  Icon
}: LinkButtonProps) => {

  const variants: Record<'primary' | 'secondary' | 'dark' | 'outline-white', string> = {
    // Hero variants
    primary: "bg-orange-600 text-white hover:bg-orange-700 shadow-orange-950/20",
    secondary: "bg-white/5 backdrop-blur-sm border border-white/20 text-white hover:bg-white hover:text-slate-900",

    // CTA variants
    dark: "bg-slate-950 text-white hover:bg-slate-900 shadow-lg",
    'outline-white': "border-2 border-white/30 hover:border-white text-white hover:bg-white/10"
  };

  return (
    <Link
      to={to}
      className={cn(
        // Core alignment and transitions shared by ALL buttons
        "px-8 py-4 rounded-xl font-bold transition-all text-center active:scale-95 inline-flex items-center justify-center space-x-2",
        variants[variant],
        className
      )}
    >
      {/* If an Icon component is provided, render it dynamically */}
      {Icon && <Icon className="h-4 w-4 balance-icon-style" />}
      <span>{children}</span>
    </Link>
  );
};