import Link from "next/link";

interface SidebarMenuProps {
  mainMenu: { label: string; href: string }[];
  helpMenu: { label: string; href: string }[];
  mainMenuHeading: string;
  helpMenuHeading: string;
}

export default function SidebarMenu({
  mainMenu,
  helpMenu,
  mainMenuHeading,
  helpMenuHeading,
}: SidebarMenuProps) {
  return (
    <aside className="space-y-6">
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <div className="bg-brand-dark px-4 py-3">
          <h2 className="text-brand-teal font-semibold text-sm uppercase tracking-wide">
            {mainMenuHeading}
          </h2>
        </div>
        <ul className="divide-y divide-gray-100">
          {mainMenu.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className="flex items-center gap-2 px-4 py-3 text-sm text-gray-700 hover:bg-brand-teal/10 hover:text-brand-dark transition-colors"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-3.5 w-3.5 text-gray-400 flex-shrink-0"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9 5l7 7-7 7"
                  />
                </svg>
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <div className="bg-brand-mid px-4 py-3">
          <h2 className="text-white font-semibold text-sm uppercase tracking-wide">
            {helpMenuHeading}
          </h2>
        </div>
        <ul className="divide-y divide-gray-100">
          {helpMenu.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className="flex items-center gap-2 px-4 py-3 text-sm text-gray-700 hover:bg-brand-teal/10 hover:text-brand-dark transition-colors"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-3.5 w-3.5 text-gray-400 flex-shrink-0"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9 5l7 7-7 7"
                  />
                </svg>
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </aside>
  );
}
