import React from 'react';

interface TeamLogoProps {
  src: string;
  alt: string;
  size?: 'small' | 'medium' | 'large';
}

const TeamLogo: React.FC<TeamLogoProps> = ({ src, alt, size = 'medium' }) => {
  const sizeClasses = {
    small: 'w-6 h-6',
    medium: 'w-8 h-8',
    large: 'w-12 h-12'
  };

  return (
    <div className={`${sizeClasses[size]} flex-shrink-0`}>
      <img
        src={src}
        alt={`Escudo do ${alt}`}
        className="w-full h-full object-contain"
        onError={(e) => {
          // Fallback para quando a imagem não carrega
          (e.target as HTMLImageElement).src = 'https://via.placeholder.com/40?text=?';
        }}
      />
    </div>
  );
};

export default TeamLogo;