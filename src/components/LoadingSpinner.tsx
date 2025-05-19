import React from 'react';

interface LoadingSpinnerProps {
  size?: 'small' | 'medium' | 'large';
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ size = 'medium' }) => {
  const sizeClasses = {
    small: 'w-6 h-6 border-2',
    medium: 'w-10 h-10 border-3',
    large: 'w-16 h-16 border-4'
  };

  return (
    <div className="flex justify-center items-center py-8">
      <div
        className={`${sizeClasses[size]} rounded-full border-t-green-500 border-r-green-500 border-b-transparent border-l-transparent animate-spin`}
      ></div>
    </div>
  );
};

export default LoadingSpinner;