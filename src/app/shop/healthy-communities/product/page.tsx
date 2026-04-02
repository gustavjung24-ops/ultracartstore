import Breadcrumbs from '@/components/Breadcrumbs';
import ProductGallery from '@/components/ProductGallery';
import ProductInfo from '@/components/ProductInfo';
import SidebarMenu from '@/components/SidebarMenu';
import RelatedResources from '@/components/RelatedResources';
import product from '@/data/product';

const crumbs = [
  { label: 'Home', href: '/' },
  { label: 'Shop', href: '/shop' },
  { label: 'Healthy Communities', href: '/shop/healthy-communities' },
  { label: 'Resources for Building Healthy Communities Pod Leaders', href: '/shop/healthy-communities/resources' },
  { label: 'Building Healthy Communities Brochure' },
];

export default function ProductPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-6">
      {/* Breadcrumb */}
      <Breadcrumbs crumbs={crumbs} />

      {/* Product + Sidebar layout */}
      <div className="mt-4 flex flex-col lg:flex-row gap-8">
        {/* Main product area */}
        <div className="flex-1 min-w-0">
          {/* 2-col on desktop, 1-col on mobile */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <ProductGallery images={product.images} title={product.title} />
            <ProductInfo product={product} />
          </div>

          {/* Description section */}
          <section className="mt-12 bg-white border border-gray-200 rounded-xl p-6">
            <h2 className="text-lg font-bold text-gray-800 mb-4">About This Resource</h2>
            <p className="text-gray-600 leading-relaxed">{product.shortDescription}</p>
            <p className="text-gray-600 leading-relaxed mt-4">
              The BHC brochure is designed for easy distribution at events, meetings, or through
              mail. Printed on durable stock, it is ideal for community health fairs, church
              outreach programs, and workplace wellness initiatives.
            </p>
          </section>

          {/* Related Resources */}
          <RelatedResources resources={product.relatedResources} />
        </div>

        {/* Sidebar */}
        <aside className="w-full lg:w-64 flex-shrink-0">
          <SidebarMenu />
        </aside>
      </div>
    </div>
  );
}
