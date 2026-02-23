import type { MetadataRoute } from "next";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

const routes = [
  { path: "", priority: 1 },
  { path: "/developer", priority: 0.9 },
  { path: "/90stimes.com", priority: 0.85 },
  { path: "/projects", priority: 0.8 },
  { path: "/games", priority: 0.8 },
  { path: "/tools", priority: 0.8 },
  { path: "/contact", priority: 0.7 },
  { path: "/privacy", priority: 0.4 },
  { path: "/terms", priority: 0.4 },
  { path: "/cookies", priority: 0.4 },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  return routes.map((route) => ({
    url: `${siteUrl}${route.path}`,
    lastModified,
    changeFrequency: "weekly",
    priority: route.priority,
  }));
}
