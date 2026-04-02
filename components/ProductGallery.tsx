"use client";

import Image from "next/image";
import { useState } from "react";

const FALLBACK_IMAGE =
  "/images/placeholder-main.svg";

interface ProductGalleryProps {
  images: string[];
  title: string;
}

export default function ProductGallery({ images, title }: ProductGalleryProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const mainImage = images[0] ?? FALLBACK_IMAGE;
  const thumbnails = images.slice(1);

  return (
    <div className="space-y-3">
      {/* Main image */}
      <div className="relative w-full aspect-[4/3] rounded-xl overflow-hidden border border-zinc-800 bg-zinc-950">
        <Image
          src={activeIndex === 0 ? mainImage : images[activeIndex]}
          alt={title}
          fill
          className="object-contain p-4"
          sizes="(max-width: 768px) 100vw, 50vw"
          priority
          unoptimized
        />
      </div>

      {/* Thumbnails */}
      {thumbnails.length > 0 && (
        <div className="flex gap-3">
          {/* Main image thumbnail */}
          <button
            onClick={() => setActiveIndex(0)}
            className={`relative w-20 h-16 rounded-lg overflow-hidden border-2 transition-colors ${
              activeIndex === 0
                ? "border-green-600"
                : "border-zinc-700 hover:border-green-400"
            }`}
            aria-label="Xem ảnh chính"
          >
            <Image
              src={mainImage}
              alt={`${title} main`}
              fill
              className="object-contain p-1"
              sizes="80px"
              unoptimized
            />
          </button>

          {thumbnails.map((src, i) => (
            <button
              key={i}
              onClick={() => setActiveIndex(i + 1)}
              className={`relative w-20 h-16 rounded-lg overflow-hidden border-2 transition-colors ${
                activeIndex === i + 1
                  ? "border-green-600"
                  : "border-zinc-700 hover:border-green-400"
              }`}
              aria-label={`Xem ảnh ${i + 2}`}
            >
              <Image
                src={src}
                alt={`${title} thumbnail ${i + 2}`}
                fill
                className="object-contain p-1"
                sizes="80px"
                unoptimized
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
