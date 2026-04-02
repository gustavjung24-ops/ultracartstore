import Image from 'next/image';
import Link from 'next/link';
import { RelatedResource } from '@/data/product';

interface RelatedResourcesProps {
  resources: RelatedResource[];
}

export default function RelatedResources({ resources }: RelatedResourcesProps) {
  return (
    <section className="mt-12">
      <h2 className="text-xl font-bold text-gray-800 mb-6">Related Resources</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {resources.map((resource) => (
          <div
            key={resource.id}
            className="bg-white border border-gray-200 rounded-xl overflow-hidden hover:shadow-md transition-shadow"
          >
            <div className="relative w-full aspect-[4/3]">
              <Image
                src={resource.image}
                alt={resource.title}
                fill
                className="object-cover"
                unoptimized
              />
            </div>
            <div className="p-4 flex flex-col gap-3">
              <h3 className="font-semibold text-gray-800 text-base leading-snug">{resource.title}</h3>
              <p className="text-gray-500 text-sm leading-relaxed">{resource.shortDescription}</p>
              <Link
                href={resource.href}
                className="mt-auto inline-block text-sm font-medium text-brand-green hover:underline"
              >
                View Resource →
              </Link>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
