/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // Allow SVG images from the /public directory (handled by Next.js Image)
    dangerouslyAllowSVG: true,
    contentDispositionType: "attachment",
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },
};

export default nextConfig;
