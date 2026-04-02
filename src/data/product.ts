export interface RelatedResource {
  id: string;
  title: string;
  shortDescription: string;
  image: string;
  href: string;
}

export interface Product {
  title: string;
  price: string;
  sku: string;
  shortDescription: string;
  whatsappUrl: string;   // e.g. https://wa.me/12025277306
  zaloUrl: string;        // e.g. https://zalo.me/0123456789
  phoneNumber: string;    // e.g. tel:+12025277306
  images: string[];
  relatedResources: RelatedResource[];
}

const product: Product = {
  title: 'Building Healthy Communities Brochure',
  price: '$0.15',
  sku: 'BHCOM-100',
  shortDescription:
    'The Building Healthy Communities (BHC) brochure is a two-page resource for leaders to share. It highlights the BHC mission, benefits, and how to join—helping grow your group and community.',
  // TODO: Replace with real WhatsApp number
  whatsappUrl: 'https://wa.me/',
  // TODO: Replace with real Zalo number
  zaloUrl: 'https://zalo.me/',
  // TODO: Replace with real phone number
  phoneNumber: 'tel:+12025277306',
  images: [
    'https://placehold.co/600x500/e8f5ee/2d7a4f?text=BHC+Brochure',
    'https://placehold.co/120x100/e8f5ee/2d7a4f?text=Front',
    'https://placehold.co/120x100/d1fae5/065f46?text=Back',
  ],
  relatedResources: [
    {
      id: 'bhc-poster',
      title: 'BHC Community Poster',
      shortDescription:
        'A colorful poster highlighting the key benefits of joining a Healthy Communities group.',
      image: 'https://placehold.co/400x300/dbeafe/1e40af?text=BHC+Poster',
      href: '#',
    },
    {
      id: 'bhc-guide',
      title: 'Pod Leader Quick-Start Guide',
      shortDescription:
        'Step-by-step guide for new pod leaders to launch and sustain their community groups.',
      image: 'https://placehold.co/400x300/fef9c3/92400e?text=Quick-Start+Guide',
      href: '#',
    },
    {
      id: 'bhc-toolkit',
      title: 'BHC Digital Toolkit',
      shortDescription:
        'A downloadable collection of social media graphics, flyers, and presentation slides.',
      image: 'https://placehold.co/400x300/fce7f3/9d174d?text=Digital+Toolkit',
      href: '#',
    },
  ],
};

export default product;
