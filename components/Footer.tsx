import Link from "next/link";

interface FooterProps {
  info?: {
    brandName?: string;
    address?: string;
    city?: string;
    phone?: string;
    email?: string;
    copyright?: string;
  };
}

export default function Footer({ info }: FooterProps) {
  return (
    <footer className="mt-16 bg-[#00425f] text-white">
      <div className="mx-auto grid max-w-7xl gap-8 px-4 py-10 md:grid-cols-3 md:px-6">
        <div>
          <h3 className="text-sm font-bold uppercase tracking-wide text-[#9ed9ee]">PCRM</h3>
          <p className="mt-3 text-sm leading-6 text-sky-100">
            Physicians Committee for Responsible Medicine - bản tham khảo tiếng Việt.
          </p>
        </div>

        <div>
          <h3 className="text-sm font-bold uppercase tracking-wide text-[#9ed9ee]">Liên kết</h3>
          <ul className="mt-3 space-y-2 text-sm">
            <li>
              <Link href="/news/blog" className="text-sky-100 hover:text-white">
                Blog và bài viết
              </Link>
            </li>
            <li>
              <Link href="/contact" className="text-sky-100 hover:text-white">
                Liên hệ
              </Link>
            </li>
            <li>
              <Link href="/donate" className="text-sky-100 hover:text-white">
                Donate
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="text-sm font-bold uppercase tracking-wide text-[#9ed9ee]">Thông tin</h3>
          <p className="mt-3 text-sm leading-6 text-sky-100">
            {info?.address ?? "5100 Wisconsin Ave NW"}
            {info?.city ? `, ${info.city}` : ", Washington, DC 20016"}
          </p>
          <p className="text-sm text-sky-100">{info?.phone ?? "202-527-7306"}</p>
          <p className="text-sm text-sky-100">{info?.email ?? "info@pcrm.org"}</p>
        </div>
      </div>
      <div className="border-t border-sky-700 px-4 py-4 text-center text-xs text-sky-200 md:px-6">
        {info?.copyright ?? "© 2026 PCRM mirror structure for Vietnamese reference."}
      </div>
    </footer>
  );
}
