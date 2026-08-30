import type { MetadataRoute } from "next";

/**
 * Generate robots.txt metadata for search engines
 * @returns Robots metadata configuration
 */
export default function robots(): MetadataRoute.Robots {
  const baseUrl = "https://blog.likandokayombo.com";
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
