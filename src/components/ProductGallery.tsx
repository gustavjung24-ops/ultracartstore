'use client';

import Image from 'next/image';
import { useState } from 'react';

interface ProductGalleryProps {
  images: string[];
  title: string;
}

export default function ProductGallery({ images, title }: ProductGalleryProps) {
  const [selected, setSelected] = useState(0);
  const main = images[0] ?? 'https://placehold.co/600x500/e8f5ee/2d7a4f?text=Product';
  const thumbnails = images.slice(1);

  return (
    <div className="flex flex-col gap-4">
      {/* Main image */}
      <div className="relative w-full aspect-[4/3] rounded-xl overflow-hidden border border-gray-200 bg-white">
        <Image
          src={selected === 0 ? main : images[selected]}
          alt={title}
          fill
          className="object-contain p-4"
          unoptimized
        />
      </div>

      {/* Thumbnails */}
      {thumbnails.length > 0 && (
        <div className="flex gap-3">
          {/* main thumb */}
          <button
            onClick={() => setSelected(0)}
            className={`relative w-20 h-16 rounded-lg overflow-hidden border-2 transition-colors ${
              selected === 0 ? 'border-brand-green' : 'border-gray-200 hover:border-gray-400'
            }`}
          >
            <Image src={main} alt={`${title} main`} fill className="object-cover" unoptimized />
          </button>
          {thumbnails.map((thumb, i) => (
            <button
              key={i}
              onClick={() => setSelected(i + 1)}
              className={`relative w-20 h-16 rounded-lg overflow-hidden border-2 transition-colors ${
                selected === i + 1 ? 'border-brand-green' : 'border-gray-200 hover:border-gray-400'
              }`}
            >
              <Image src={thumb} alt={`${title} ${i + 1}`} fill className="object-cover" unoptimized />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
