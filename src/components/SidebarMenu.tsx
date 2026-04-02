import Link from 'next/link';

const mainMenu = [
  { label: 'Home', href: '/' },
  { label: 'Shop', href: '/shop' },
  { label: 'Free Downloads', href: '/downloads' },
];

const helpMenu = [
  { label: 'Privacy Policy', href: '/privacy-policy' },
  { label: 'Order Turnaround Time', href: '/turnaround-time' },
  { label: 'Contact Form', href: '/contact' },
];

export default function SidebarMenu() {
  return (
    <aside className="bg-white border border-gray-200 rounded-xl p-5 text-sm">
      {/* Main Menu */}
      <div className="mb-6">
        <h3 className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-3">Main Menu</h3>
        <ul className="space-y-2">
          {mainMenu.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className="block text-gray-700 hover:text-brand-green transition-colors py-1 border-b border-gray-100 last:border-0"
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>

      {/* Help */}
      <div>
        <h3 className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-3">Help</h3>
        <ul className="space-y-2">
          {helpMenu.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className="block text-gray-700 hover:text-brand-green transition-colors py-1 border-b border-gray-100 last:border-0"
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </aside>
  );
}
