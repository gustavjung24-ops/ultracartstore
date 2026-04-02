import Link from 'next/link';

interface Crumb {
  label: string;
  href?: string;
}

interface BreadcrumbsProps {
  crumbs: Crumb[];
}

export default function Breadcrumbs({ crumbs }: BreadcrumbsProps) {
  return (
    <nav aria-label="breadcrumb" className="text-sm text-gray-500 py-3">
      <ol className="flex flex-wrap items-center gap-1">
        {crumbs.map((crumb, index) => (
          <li key={index} className="flex items-center gap-1">
            {index > 0 && <span className="text-gray-300">/</span>}
            {crumb.href ? (
              <Link href={crumb.href} className="hover:text-brand-green hover:underline transition-colors">
                {crumb.label}
              </Link>
            ) : (
              <span className="text-gray-700 font-medium">{crumb.label}</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
