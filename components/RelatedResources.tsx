import Image from "next/image";
import Link from "next/link";
import type { RelatedResource } from "@/data/product";

interface RelatedResourcesProps {
  resources: RelatedResource[];
}

export default function RelatedResources({ resources }: RelatedResourcesProps) {
  return (
    <section className="mt-10">
      <h2 className="text-xl font-bold text-zinc-100 mb-6 pb-2 border-b border-emerald-500/30">
        Tài liệu liên quan
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {resources.map((resource) => (
          <article
            key={resource.id}
            className="bg-zinc-900 rounded-xl border border-zinc-800 overflow-hidden hover:shadow-lg hover:shadow-emerald-900/30 transition-shadow flex flex-col"
          >
            {/* Card image */}
            <div className="relative w-full aspect-[4/3] bg-zinc-950">
              <Image
                src={resource.image}
                alt={resource.title}
                fill
                className="object-cover"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                unoptimized
              />
            </div>

            {/* Card body */}
            <div className="p-4 flex flex-col flex-1 gap-2">
              <h3 className="font-semibold text-zinc-100 text-sm leading-snug">
                {resource.title}
              </h3>
              <p className="text-xs text-zinc-400 leading-relaxed flex-1">
                {resource.description}
              </p>
              <Link
                href={resource.href}
                className="mt-2 inline-flex items-center gap-1 text-xs font-semibold text-emerald-400 hover:text-emerald-300 hover:underline"
              >
                Xem chi tiết
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-3.5 w-3.5"
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
              </Link>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
