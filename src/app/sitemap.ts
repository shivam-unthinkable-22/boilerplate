import { sitemapUrls } from "@/constants/sitemapUrls";
import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  // Dynamically map over the URLs array and return the metadata for each URL
  return sitemapUrls.map((url) => ({
    url,
    lastModified: new Date(), // Customize this as necessary
    changeFrequency: "weekly", // Adjust the frequency based on your needs
    priority: 0.5, // Modify priority if necessary
  }));
}
