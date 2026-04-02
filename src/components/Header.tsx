'use client';

import Link from 'next/link';
import { useState } from 'react';

export default function Header() {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center gap-4">
        {/* Brand */}
        <Link href="/" className="flex-shrink-0 text-xl font-bold text-brand-green">
          Physicians Committee Shop
        </Link>

        {/* Search — center/right */}
        <div className="flex-1 flex justify-center">
          <div className="w-full max-w-md flex items-center border border-gray-300 rounded-full overflow-hidden bg-gray-50">
            <input
              type="text"
              placeholder="Search resources…"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="flex-1 px-4 py-2 text-sm bg-transparent outline-none placeholder-gray-400"
            />
            <button className="px-4 py-2 text-gray-400 hover:text-brand-green transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z" />
              </svg>
            </button>
          </div>
        </div>

        {/* Contact */}
        <a
          href="tel:+12025277306"
          className="flex-shrink-0 text-sm text-brand-green font-medium hover:underline hidden sm:block"
        >
          📞 202-527-7306
        </a>
      </div>
    </header>
  );
}
