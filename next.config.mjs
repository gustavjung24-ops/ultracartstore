/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // Allow SVG images from the /public directory (handled by Next.js Image)
    dangerouslyAllowSVG: true,
    contentDispositionType: "attachment",
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
    remotePatterns: [
      {
        protocol: "https",
        hostname: "v5.airtableusercontent.com",
      },
      {
        protocol: "https",
        hostname: "dl.airtable.com",
      },
      {
        protocol: "https",
        hostname: "airtableusercontent.com",
      },
    ],
  },
};

export default nextConfig;
