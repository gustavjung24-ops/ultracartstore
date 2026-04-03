import Link from "next/link";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-gray-100">
      {/* Main Footer Content */}
      <div className="mx-auto max-w-7xl px-4 md:px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* About Column */}
          <div>
            <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
              🏥 PCRM
            </h3>
            <p className="text-gray-300 text-sm leading-6">
              Physicians Committee for Responsible Medicine - Promoting preventive medicine, ethical research, and higher standards for medical training.
            </p>
            <div className="mt-4 flex gap-3">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-[#f0ad4e] hover:text-white transition">
                <span className="sr-only">Facebook</span>📘
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-[#f0ad4e] hover:text-white transition">
                <span className="sr-only">Twitter</span>🐦
              </a>
              <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="text-[#f0ad4e] hover:text-white transition">
                <span className="sr-only">YouTube</span>▶️
              </a>
            </div>
          </div>

          {/* Main Topics */}
          <div>
            <h4 className="text-base font-bold text-white mb-4">Our Work</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/good-nutrition" className="text-gray-300 hover:text-[#f0ad4e] transition">
                  Good Nutrition
                </Link>
              </li>
              <li>
                <Link href="/ethical-science" className="text-gray-300 hover:text-[#f0ad4e] transition">
                  Ethical Science
                </Link>
              </li>
              <li>
                <Link href="/clinical-research" className="text-gray-300 hover:text-[#f0ad4e] transition">
                  Clinical Research
                </Link>
              </li>
              <li>
                <Link href="/health-topics" className="text-gray-300 hover:text-[#f0ad4e] transition">
                  Health Topics
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="text-base font-bold text-white mb-4">Resources</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/news/blog" className="text-gray-300 hover:text-[#f0ad4e] transition">
                  News & Blog
                </Link>
              </li>
              <li>
                <Link href="/shop" className="text-gray-300 hover:text-[#f0ad4e] transition">
                  Shop & Downloads
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-300 hover:text-[#f0ad4e] transition">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link href="/privacy-policy" className="text-gray-300 hover:text-[#f0ad4e] transition">
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-base font-bold text-white mb-4">Contact & Donate</h4>
            <div className="space-y-3 text-sm text-gray-300">
              <p>
                <span className="font-semibold text-white">📍 Address:</span><br />
                5100 Wisconsin Ave NW<br />
                Washington, DC 20016
              </p>
              <p>
                <span className="font-semibold text-white">📞 Phone:</span><br />
                <a href="tel:+1-202-527-7306" className="text-[#f0ad4e] hover:underline">
                  (202) 527-7306
                </a>
              </p>
              <p>
                <span className="font-semibold text-white">📧 Email:</span><br />
                <a href="mailto:info@pcrm.org" className="text-[#f0ad4e] hover:underline">
                  info@pcrm.org
                </a>
              </p>
              <Link
                href="/donate"
                className="inline-block bg-[#f0ad4e] text-gray-900 font-bold px-4 py-2 rounded-md hover:bg-[#ec971f] transition mt-3"
              >
                💝 Donate
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-800 px-4 md:px-6 py-8">
        <div className="mx-auto max-w-7xl flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-400">
          <p>
            &copy; {currentYear} Physicians Committee for Responsible Medicine. All rights reserved.
          </p>
          <div className="flex gap-4">
            <Link href="/privacy-policy" className="hover:text-[#f0ad4e] transition">
              Privacy Policy
            </Link>
            <span>•</span>
            <a href="#" className="hover:text-[#f0ad4e] transition">
              Terms of Use
            </a>
            <span>•</span>
            <a href="#" className="hover:text-[#f0ad4e] transition">
              Sitemap
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
