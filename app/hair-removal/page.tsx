import fs from "fs";
import path from "path";
import type { Metadata } from "next";
import Navbar from "../components/Navbar";
import BusinessCard from "../components/BusinessCard";
import FeaturedListing from "../components/FeaturedListing";

export const metadata: Metadata = {
  title: "Hair Removal in Warner Robins, GA — Waxing, Laser & Threading",
  description: "Find the best hair removal services in Warner Robins, GA. Browse top-rated studios for waxing, laser hair removal, threading, and sugaring.",
  keywords: ["hair removal warner robins", "laser hair removal warner robins", "threading warner robins", "waxing warner robins ga"],
};

interface Business {
  id: string;
  name: string;
  address: string;
  website?: string;
  rating?: number;
  reviewCount?: number;
  phone?: string | null;
  hours?: string[];
  photoUrl?: string;
}

function getData(): Business[] {
  const filePath = path.join(process.cwd(), "data", "wr-beauty-data.json");
  const raw = fs.readFileSync(filePath, "utf-8");
  return JSON.parse(raw).categories["hair-removal"] as Business[];
}

export default function HairRemovalPage() {
  const businesses = getData();
  const sorted = [...businesses].sort((a, b) => {
    if (!a.rating) return 1;
    if (!b.rating) return -1;
    return (b.rating * Math.log((b.reviewCount || 1) + 1)) - (a.rating * Math.log((a.reviewCount || 1) + 1));
  });

  return (
    <main className="min-h-screen bg-[#0A0A0A] text-white">
      <Navbar />

      {/* Hero */}
      <section className="relative py-16 px-6 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#1a0f0a] via-[#0A0A0A] to-[#0A0A0A]" />
        <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-[#D4A574] opacity-[0.06] blur-[100px]" />
        <div className="relative max-w-6xl mx-auto">
          <a href="/" className="text-[#D4A574] text-sm hover:underline mb-4 inline-block">← Back to Directory</a>
          <p className="text-[#D4A574] text-xs font-medium tracking-widest uppercase mb-2">Warner Robins, GA</p>
          <h1 className="text-4xl md:text-5xl font-bold mb-3">Hair Removal in Warner Robins</h1>
          <p className="text-white/40 text-lg max-w-xl">
            Browse {businesses.length} top-rated hair removal studios in Warner Robins — waxing, laser, threading, sugaring, and more.
          </p>
        </div>
      </section>

      {/* Services strip */}
      <section className="border-b border-white/5 bg-white/[0.02]">
        <div className="max-w-6xl mx-auto px-6 py-4 flex flex-wrap gap-3">
          {["Waxing", "Laser Hair Removal", "Threading", "Sugaring", "Brazilian Wax", "Full Body", "Facial Hair", "Electrolysis"].map((s) => (
            <span key={s} className="text-xs bg-white/5 text-white/40 px-2.5 py-1 rounded-md">{s}</span>
          ))}
        </div>
      </section>

      {/* Featured */}
      <FeaturedListing />

      {/* Listings */}
      <div className="max-w-6xl mx-auto px-6 py-12">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold">All Hair Removal in Warner Robins</h2>
          <span className="text-sm text-white/30">{businesses.length} listings</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {sorted.map((biz) => (
            <BusinessCard key={biz.id || biz.name} biz={biz} />
          ))}
        </div>

        {/* SEO text */}
        <div className="mt-16 pt-8 border-t border-white/5 text-white/40">
          <h2 className="text-2xl font-bold text-white mb-3">Finding the Best Hair Removal in Warner Robins, GA</h2>
          <p className="mb-3">Warner Robins has a growing number of professional hair removal studios offering everything from traditional waxing to modern laser treatments. Whether you're looking for a quick eyebrow thread or permanent laser hair removal, the studios listed here are reviewed and rated by real customers.</p>
          <p>Popular hair removal services in Warner Robins include Brazilian wax, laser hair removal, sugaring, and threading. Use this directory to compare ratings and find the best hair removal studio nearest to you in Warner Robins, Centerville, Bonaire, or Kathleen, GA.</p>
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t border-white/5 py-10 px-6 mt-12">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-white/30">
          <div className="flex items-center gap-2 font-semibold text-white/70">
            <span className="text-[#D4A574]">✦</span> Warner Robins Beauty Directory
          </div>
          <nav className="flex gap-6 flex-wrap justify-center">
            <a href="/waxing" className="hover:text-[#D4A574] transition-colors">Waxing</a>
            <a href="/nail-salons" className="hover:text-[#D4A574] transition-colors">Nails</a>
            <a href="/hair-salons" className="hover:text-[#D4A574] transition-colors">Hair</a>
            <a href="/spas" className="hover:text-[#D4A574] transition-colors">Spas</a>
            <a href="/hair-removal" className="text-[#D4A574]">Hair Removal</a>
            <a href="/brazilian-wax" className="hover:text-[#D4A574] transition-colors">Brazilian Wax</a>
            <a href="/tanning-salons" className="hover:text-[#D4A574] transition-colors">Tanning</a>
            <a href="/about" className="hover:text-[#D4A574] transition-colors">About</a>
            <a href="/contact" className="hover:text-[#D4A574] transition-colors">Contact</a>
            <a href="/privacy" className="hover:text-[#D4A574] transition-colors">Privacy</a>
          </nav>
          <p>© {new Date().getFullYear()} warnerrobinsbeauty.com</p>
        </div>
      </footer>
    </main>
  );
}