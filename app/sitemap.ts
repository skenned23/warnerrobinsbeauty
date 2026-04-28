import { MetadataRoute } from "next";
import fs from "fs";
import path from "path";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://warnerrobinsbeauty.com";

  const filePath = path.join(process.cwd(), "data", "wr-beauty-data.json");
  const raw = fs.readFileSync(filePath, "utf-8");
  const { categories } = JSON.parse(raw);

  const allBusinesses = [
    ...categories.waxing,
    ...categories["hair-removal"],
    ...categories["nail-salons"],
    ...categories["hair-salons"],
    ...categories.spas,
  ];

  const slugPages = allBusinesses
    .filter((b: any) => b.id)
    .map((b: any) => ({
      url: `${base}/${b.id}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    }));

  const categoryPages = [
    "waxing",
    "hair-removal",
    "nail-salons",
    "hair-salons",
    "spas",
    "brazilian-wax",
  ].map((slug) => ({
    url: `${base}/${slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.9,
  }));

  const staticPages = ["", "about", "contact", "privacy"].map((slug) => ({
    url: `${base}/${slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: slug === "" ? 1.0 : 0.5,
  }));

  return [...staticPages, ...categoryPages, ...slugPages];
}