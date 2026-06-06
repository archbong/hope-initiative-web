import { twMerge } from 'tailwind-merge';
import { clsx, type ClassValue } from 'clsx';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Then in your component:
// const Button = ({ className, ...props }: { className?: string;[key: string]: unknown }) => (
//   <button className={cn("base-styles-here", className)} {...props} />
// );