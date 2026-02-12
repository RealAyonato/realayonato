import React, { useState, useEffect } from 'react';
import { Loader } from 'lucide-react';

interface LazyImageProps {
  src: string;
  alt: string;
  className?: string;
  onLoad?: () => void;
}

const LazyImage: React.FC<LazyImageProps> = ({ src, alt, className, onLoad }) => {
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);
  const [imgSrc, setImgSrc] = useState(src);

  useEffect(() => {
    const img = new Image();
    img.src = src;
    img.onload = () => {
      setImgSrc(src);
      setLoaded(true);
      onLoad?.();
    };
    img.onerror = () => {
      setError(true);
    };
  }, [src, onLoad]);

  if (error) {
    return (
      <div className={`${className} bg-gray-800 flex items-center justify-center`}>
        <span className="text-gray-500 text-sm">Failed to load image</span>
      </div>
    );
  }

  return (
    <div className="relative">
      {!loaded && (
        <div className={`absolute inset-0 bg-gray-800 animate-pulse ${className}`}>
          <div className="absolute inset-0 flex items-center justify-center">
            <Loader className="w-6 h-6 text-gray-600 animate-spin" />
          </div>
        </div>
      )}
      <img
        src={imgSrc}
        alt={alt}
        className={`${className} transition-opacity duration-300 ${
          loaded ? 'opacity-100' : 'opacity-0'
        }`}
        loading="lazy"
        decoding="async"
        onLoad={() => setLoaded(true)}
      />
    </div>
  );
};

export default LazyImage;