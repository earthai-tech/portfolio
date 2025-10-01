import { NAV, SITE } from "@/utils/metadata";

export default async function sitemap() {
  const now = new Date().toISOString();
  const routes = NAV.map((n) => ({
    url: new URL(n.href, SITE.url).toString(),
    lastModified: now,
    changeFrequency: "monthly",
    priority: n.href === "/" ? 1 : 0.6
  }));
  return routes;
}
