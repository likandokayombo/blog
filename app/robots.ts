import type { MetadataRoute } from "next";

import { siteConfig } from "@config/site";

/**
 * Generate robots.txt metadata for search engines
 * @returns Robots metadata configuration
 */
export default function robots(): MetadataRoute.Robots {
  const baseUrl = siteConfig.url;
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: "/api/",
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
