import Link from 'next/link';
import Image from 'next/image';

export default function HomePage() {
  const featured = [
    {
      href: '/shop/healthy-communities/product',
      image: 'https://placehold.co/400x300/e8f5ee/2d7a4f?text=BHC+Brochure',
      title: 'Building Healthy Communities Brochure',
      price: '$0.15',
    },
    {
      href: '#',
      image: 'https://placehold.co/400x300/dbeafe/1e40af?text=BHC+Poster',
      title: 'BHC Community Poster',
      price: 'Free',
    },
    {
      href: '#',
      image: 'https://placehold.co/400x300/fef9c3/92400e?text=Quick-Start+Guide',
      title: 'Pod Leader Quick-Start Guide',
      price: 'Free',
    },
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      {/* Hero */}
      <section className="bg-brand-light rounded-2xl p-8 md:p-12 mb-12 text-center">
        <h1 className="text-3xl md:text-4xl font-bold text-brand-green mb-4">
          Building Healthy Communities
        </h1>
        <p className="text-gray-600 max-w-2xl mx-auto mb-6">
          Resources, brochures, and toolkits for pod leaders and community advocates. Share the
          mission. Grow your community.
        </p>
        <Link
          href="/shop/healthy-communities/product"
          className="inline-block bg-brand-green text-white font-semibold px-8 py-3 rounded-xl hover:bg-green-700 transition-colors"
        >
          View Resources
        </Link>
      </section>

      {/* Featured Products */}
      <section>
        <h2 className="text-xl font-bold text-gray-800 mb-6">Featured Resources</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {featured.map((item) => (
            <Link
              key={item.href + item.title}
              href={item.href}
              className="group bg-white border border-gray-200 rounded-xl overflow-hidden hover:shadow-md transition-shadow"
            >
              <div className="relative w-full aspect-[4/3]">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className="object-cover"
                  unoptimized
                />
              </div>
              <div className="p-4">
                <h3 className="font-semibold text-gray-800 group-hover:text-brand-green transition-colors">
                  {item.title}
                </h3>
                <p className="text-brand-green font-bold mt-1">{item.price}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
