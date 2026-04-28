import fs from "fs";
import FeaturedListing from "../components/FeaturedListing";
import path from "path";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Waxing Salons in Warner Robins, GA — Top Rated Local Wax Studios",
  description: "Find the best waxing salons in Warner Robins, GA. Browse top-rated wax studios for Brazilian wax, full body wax, eyebrow wax, and more.",
  keywords: ["waxing salon warner robins", "brazilian wax warner robins", "wax studio warner robins ga", "eyebrow wax warner robins"],
};

interface Business {
  id: string;
  name: string;
  address: string;
  website?: string;
  rating?: number;
  reviewCount?: number;
  phone?: string | null;
  photoUrl?: string;
  slug?: string;
  hours?: string[];
}

function getPhotoUrl(biz: Business): string | null {
  return biz.photoUrl || null;
}

function getSlug(biz: Business): string {
  return biz.slug || biz.id || biz.name.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "");
}

function getInitials(name: string): string {
  return name.split(" ").slice(0, 2).map((w) => w[0]).join("").toUpperCase();
}

function Stars({ rating }: { rating: number }) {
  const full = Math.floor(rating);
  const half = rating - full >= 0.5;
  return (
    <span className="flex gap-0.5 text-[#D4A574]">
      {Array.from({ length: 5 }, (_, i) => (
        <span key={i} className={i < full ? "opacity-100" : half && i === full ? "opacity-50" : "opacity-20"}>★</span>
      ))}
    </span>
  );
}

function getData(): Business[] {
  const filePath = path.join(process.cwd(), "data", "wr-beauty-data.json");
  const raw = fs.readFileSync(filePath, "utf-8");
  return JSON.parse(raw).categories.waxing as Business[];
}

export default function WaxingPage() {
  const businesses = getData();
  const others = businesses.filter((b) => b.name !== "Waxology Studio");

  return (
    <main className="min-h-screen bg-[#0A0A0A] text-white">

      {/* Nav */}
      <header className="sticky top-0 z-50 bg-[#0A0A0A]/90 backdrop-blur-md border-b border-white/5">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <span className="text-[#D4A574] text-2xl">✦</span>
            <span className="text-xl font-semibold tracking-tight">Warner Robins Beauty</span>
          </Link>
          <nav className="hidden md:flex gap-6 text-sm text-white/50">
            <Link href="/waxing" className="text-[#D4A574] font-medium">Waxing</Link>
            <Link href="/nail-salons" className="hover:text-[#D4A574] transition-colors">Nails</Link>
            <Link href="/hair-salons" className="hover:text-[#D4A574] transition-colors">Hair</Link>
            <Link href="/spas" className="hover:text-[#D4A574] transition-colors">Spas</Link>
            <Link href="/hair-removal" className="hover:text-[#D4A574] transition-colors">Hair Removal</Link>
            <Link href="/brazilian-wax" className="hover:text-[#D4A574] transition-colors">Brazilian Wax</Link>
            <Link href="/tanning-salons" className="hover:text-[#D4A574] transition-colors">Tanning</Link>
            <Link href="/about" className="hover:text-[#D4A574] transition-colors">About</Link>
            <Link href="/contact" className="hover:text-[#D4A574] transition-colors">Contact</Link>
            <Link href="/privacy" className="hover:text-[#D4A574] transition-colors">Privacy</Link>
          </nav>
        </div>
      </header>

      {/* Hero */}
      <section className="relative py-16 px-6 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#1a0f0a] via-[#0A0A0A] to-[#0A0A0A]" />
        <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-[#D4A574] opacity-[0.06] blur-[100px]" />
        <div className="relative max-w-6xl mx-auto">
          <Link href="/" className="text-[#D4A574] text-sm hover:underline mb-4 inline-block">← Back to Directory</Link>
          <p className="text-[#D4A574] text-xs font-medium tracking-widest uppercase mb-2">Warner Robins, GA</p>
          <h1 className="text-4xl md:text-5xl font-bold mb-3">Waxing Salons in Warner Robins</h1>
          <p className="text-white/40 text-lg max-w-xl">
            Browse {businesses.length} top-rated waxing studios in Warner Robins — from Brazilian wax to full body treatments.
          </p>
        </div>
      </section>

      {/* Services strip */}
      <section className="border-b border-white/5 bg-white/[0.02]">
        <div className="max-w-6xl mx-auto px-6 py-4 flex flex-wrap gap-3">
          {["Brazilian Wax", "Full Body Wax", "Eyebrow Wax", "Bikini Wax", "Leg Wax", "Back Wax", "Facial Wax", "Hard Wax"].map((s) => (
            <span key={s} className="text-xs bg-white/5 text-white/50 border border-white/10 px-3 py-1.5 rounded-full">{s}</span>
          ))}
        </div>
      </section>

      {/* Featured */}
      <FeaturedListing />

      {/* Listings */}
      <div className="max-w-6xl mx-auto px-6 py-12">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold">All Waxing Salons in Warner Robins</h2>
          <span className="text-sm text-white/30">{others.length} listings</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {others.map((biz) => {
            const photoUrl = getPhotoUrl(biz);
            const slug = getSlug(biz);
            return (
              <Link key={biz.id || biz.name} href={`/${slug}`}
                className="group bg-white/[0.02] rounded-xl border border-white/5 hover:border-[#D4A574]/30 hover:bg-white/[0.05] overflow-hidden transition-all duration-200">
                <div className="h-44 overflow-hidden relative">
                  {photoUrl ? (
                    <img src={photoUrl} alt={biz.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                  ) : (
                    <div className="w-full h-full bg-white/5 flex items-center justify-center">
                      <span className="text-[#D4A574] text-3xl font-bold">{getInitials(biz.name)}</span>
                    </div>
                  )}
                </div>
                <div className="p-5">
                  <h3 className="font-semibold group-hover:text-[#D4A574] transition-colors mb-1 leading-tight">{biz.name}</h3>
                  <p className="text-xs text-white/30 mb-3 leading-relaxed">{biz.address}</p>
                  {biz.rating && (
                    <div className="flex items-center gap-2 mb-2">
                      <Stars rating={biz.rating} />
                      <span className="text-xs text-white/40">{biz.rating} ({biz.reviewCount?.toLocaleString()})</span>
                    </div>
                  )}
                  {biz.phone && <p className="text-xs text-white/30">{biz.phone}</p>}
                </div>
              </Link>
            );
          })}
        </div>

        {/* SEO text */}
        <div className="mt-16 pt-8 border-t border-white/5 text-white/40">
          <h2 className="text-2xl font-bold text-white mb-3">Finding the Best Waxing Salon in Warner Robins, GA</h2>
          <p className="mb-3">Warner Robins has a growing number of professional waxing studios offering everything from eyebrow shaping to full Brazilian wax services. Whether you're looking for a quick brow wax or a full body treatment, the salons listed here are reviewed and rated by real customers in the Warner Robins area.</p>
          <p>For Brazilian wax specialists, Waxology Studio on Houston Lake Road is consistently ranked among the top in the region with a 4.7 rating and over 113 reviews. Other popular options include Southern Charm Waxing Co. in Bonaire and The Wax Strip in Kathleen — both within a short drive of Warner Robins.</p>
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t border-white/5 py-10 px-6 mt-12">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-white/30">
          <div className="flex items-center gap-2 font-semibold text-white/70">
            <span className="text-[#D4A574]">✦</span> Warner Robins Beauty Directory
          </div>
          <nav className="flex gap-6 flex-wrap justify-center">
            <Link href="/waxing" className="text-[#D4A574]">Waxing</Link>
            <Link href="/nail-salons" className="hover:text-[#D4A574] transition-colors">Nails</Link>
            <Link href="/hair-salons" className="hover:text-[#D4A574] transition-colors">Hair</Link>
            <Link href="/spas" className="hover:text-[#D4A574] transition-colors">Spas</Link>
            <Link href="/hair-removal" className="hover:text-[#D4A574] transition-colors">Hair Removal</Link>
            <Link href="/brazilian-wax" className="hover:text-[#D4A574] transition-colors">Brazilian Wax</Link>
            <Link href="/tanning-salons" className="hover:text-[#D4A574] transition-colors">Tanning</Link>
            <Link href="/about" className="hover:text-[#D4A574] transition-colors">About</Link>
            <Link href="/contact" className="hover:text-[#D4A574] transition-colors">Contact</Link>
            <Link href="/privacy" className="hover:text-[#D4A574] transition-colors">Privacy</Link>
          </nav>
          <p>© {new Date().getFullYear()} warnerrobinsbeauty.com</p>
        </div>
      </footer>
    </main>
  );
}