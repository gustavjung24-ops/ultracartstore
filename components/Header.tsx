import Link from "next/link";
import { getMainNavigation } from "@/lib/pcrm-content";

export default function Header() {
  const nav = getMainNavigation();

  return (
    <header className="sticky top-0 z-50 border-b border-sky-900 bg-[#005e86] text-white shadow-lg">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 md:px-6">
        <Link href="/" className="text-sm font-bold uppercase tracking-[0.18em] md:text-base">
          PCRM Vietnam
        </Link>
        <Link
          href="/donate"
          className="rounded bg-[#ffb53d] px-4 py-2 text-xs font-bold uppercase tracking-wide text-slate-900 transition hover:bg-[#ffc869]"
        >
          Donate
        </Link>
      </div>

      <nav className="border-t border-sky-700/80 bg-[#0f7ea8]">
        <ul className="mx-auto flex max-w-7xl gap-1 overflow-x-auto px-2 py-2 text-sm md:px-6">
          {nav.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className="block whitespace-nowrap rounded px-3 py-2 font-medium text-white/95 transition hover:bg-white/15"
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
