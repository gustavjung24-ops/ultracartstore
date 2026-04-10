'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';

type NewsImageProps = {
  src: string;
  alt: string;
  fallbackSrc: string;
  className?: string;
  priority?: boolean;
};

export default function NewsImage({ src, alt, fallbackSrc, className, priority }: NewsImageProps) {
  const [currentSrc, setCurrentSrc] = useState(src);

  useEffect(() => {
    setCurrentSrc(src);
  }, [src]);

  return (
    <Image
      src={currentSrc}
      alt={alt}
      fill
      unoptimized
      priority={priority}
      className={className}
      onError={() => {
        if (currentSrc !== fallbackSrc) {
          setCurrentSrc(fallbackSrc);
        }
      }}
    />
  );
}
