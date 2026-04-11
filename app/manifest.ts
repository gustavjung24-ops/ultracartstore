import type { MetadataRoute } from "next";
import { DEFAULT_SITE_DESCRIPTION, SITE_NAME } from "@/lib/seo";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: SITE_NAME,
    short_name: SITE_NAME,
    description: DEFAULT_SITE_DESCRIPTION,
    start_url: "/",
    display: "standalone",
    background_color: "#F6F1E8",
    theme_color: "#123B5D",
    lang: "vi",
    icons: [
      {
        src: "/favicon.ico",
        sizes: "any",
        type: "image/x-icon",
      },
    ],
  };
}
