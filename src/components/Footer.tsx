export default function Footer() {
  return (
    <footer className="bg-white border-t border-gray-200 mt-16">
      <div className="max-w-6xl mx-auto px-4 py-10 flex flex-col md:flex-row gap-8 items-start justify-between">
        {/* Brand + address */}
        <div>
          <p className="font-bold text-gray-800 text-base mb-2">Physicians Committee Shop</p>
          <address className="not-italic text-sm text-gray-500 space-y-1">
            <p>5100 Wisconsin Avenue, NW, Suite 400</p>
            <p>Washington, DC 20016</p>
            <p>ph. 202-527-7306</p>
            <p>
              <a
                href="mailto:fulfillment@PCRM.org"
                className="text-brand-green hover:underline"
              >
                fulfillment@PCRM.org
              </a>
            </p>
          </address>
        </div>

        {/* Copyright */}
        <div className="text-sm text-gray-400 md:text-right">
          <p>© {new Date().getFullYear()} Physicians Committee for Responsible Medicine.</p>
          <p>All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
