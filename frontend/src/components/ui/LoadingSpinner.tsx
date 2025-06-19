// src/components/ui/LoadingSpinner.tsx
import { FiLoader } from 'react-icons/fi';

interface Props {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export default function LoadingSpinner({ size = 'md', className = '' }: Props) {
  const sizes = {
    sm: 'w-6 h-6',
    md: 'w-8 h-8',
    lg: 'w-12 h-12'
  };

  return (
    <div className={`flex justify-center items-center ${className}`}>
      <FiLoader className={`animate-spin text-indigo-600 ${sizes[size]}`} />
    </div>
  );
}