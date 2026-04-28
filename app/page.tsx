import fs from "fs";
import path from "path";
import Link from "next/link";
import type { Metadata } from "next";
import FeaturedListing from "./components/FeaturedListing";

export const metadata: Metadata = {
  title: "Warner Robins Beauty Directory — Salons, Spas & Waxing Near You",
  description: "Find the best salons, spas, nail studios, and waxing specialists in Warner Robins, GA. Browse 80+ verified local beauty businesses with ratings and reviews.",
};

interface Business {
  name: string;
  address: string;
  website?: string;
  rating?: number;
  reviewCount?: number;
  phone?: string | null;
  category: string;
  id?: string;
}

interface BeautyData {
  waxing: Business[];
  "hair-removal": Business[];
  "nail-salons": Business[];
  "hair-salons": Business[];
  spas: Business[];
}

function getData(): BeautyData {
  const filePath = path.join(process.cwd(), "data", "wr-beauty-data.json");
  const raw = fs.readFileSync(filePath, "utf-8");
  return JSON.parse(raw).categories;
}

function getTopRated(data: BeautyData, limit = 6) {
  const all = [
    ...data.waxing.map((b) => ({ ...b, categoryLabel: "Waxing" })),
    ...data["hair-removal"].map((b) => ({ ...b, categoryLabel: "Hair Removal" })),
    ...data["nail-salons"].map((b) => ({ ...b, categoryLabel: "Nail Salon" })),
    ...data["hair-salons"].map((b) => ({ ...b, categoryLabel: "Hair Salon" })),
    ...data.spas.map((b) => ({ ...b, categoryLabel: "Spa" })),
  ];
  return all
    .filter((b) => b.rating && b.reviewCount)
    .sort((a, b) => (b.rating! * Math.log(b.reviewCount! + 1)) - (a.rating! * Math.log(a.reviewCount! + 1)))
    .slice(0, limit);
}

const CATEGORIES = [
  { slug: "waxing", label: "Waxing", description: "Expert waxing salons for smooth, long-lasting results.", icon: "✦", count: 20 },
  { slug: "hair-removal", label: "Hair Removal", description: "Laser, threading, and professional hair removal services.", icon: "◈", count: 9 },
  { slug: "nail-salons", label: "Nail Salons", description: "Manicures, pedicures, nail art, and gel services.", icon: "❋", count: 19 },
  { slug: "hair-salons", label: "Hair Salons", description: "Cuts, color, styling, and treatments for every hair type.", icon: "✿", count: 19 },
  { slug: "spas", label: "Spas", description: "Full-service spas for facials, massages, and relaxation.", icon: "◉", count: 13 },
  { slug: "brazilian-wax", label: "Brazilian Wax", description: "Specialist Brazilian and bikini wax services nearby.", icon: "◆", count: null },
];

function Stars({ rating }: { rating: number }) {
  const full = Math.floor(rating);
  const half = rating - full >= 0.5;
  return (
    <span className="flex gap-0.5 text-[#C4856A]">
      {Array.from({ length: 5 }, (_, i) => (
        <span key={i} className={i < full ? "opacity-100" : half && i === full ? "opacity-60" : "opacity-20"}>★</span>
      ))}
    </span>
  );
}

export default function HomePage() {
  const data = getData();
  const topRated = getTopRated(data);

  return (
    <main className="min-h-screen bg-[#FDFAF7] text-[#2C1810] font-sans">

      <header className="sticky top-0 z-50 bg-[#FDFAF7]/95 backdrop-blur-sm border-b border-[#E8D5C4]">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <span className="text-[#C4856A] text-2xl">✦</span>
            <span className="font-display text-xl font-semibold tracking-tight">Warner Robins Beauty</span>
          </Link>
          <nav className="hidden md:flex gap-6 text-sm text-[#6B4C3B]">
            <Link href="/waxing" className="hover:text-[#C4856A] transition-colors">Waxing</Link>
            <Link href="/nail-salons" className="hover:text-[#C4856A] transition-colors">Nails</Link>
            <Link href="/hair-salons" className="hover:text-[#C4856A] transition-colors">Hair</Link>
            <Link href="/spas" className="hover:text-[#C4856A] transition-colors">Spas</Link>
          </nav>
        </div>
      </header>

      <section className="relative overflow-hidden bg-[#2C1810] text-[#FDFAF7] py-24 px-6">
        <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: "repeating-linear-gradient(45deg, #C4856A 0, #C4856A 1px, transparent 0, transparent 50%)", backgroundSize: "12px 12px" }} />
        <div className="absolute -top-32 -right-32 w-[500px] h-[500px] rounded-full bg-[#C4856A] opacity-10 blur-3xl" />
        <div className="relative max-w-6xl mx-auto">
          <p className="text-[#C4856A] text-sm font-medium tracking-[0.2em] uppercase mb-4">Warner Robins, Georgia</p>
          <h1 className="font-display text-5xl md:text-7xl font-bold leading-[1.05] mb-6 max-w-3xl">
            Your Local Beauty <span className="text-[#C4856A]">Directory</span>
          </h1>
          <p className="text-[#C4B89A] text-xl max-w-xl mb-10 leading-relaxed">
            Browse {Object.values(data).flat().length}+ verified salons, spas, and studios across Warner Robins — rated, reviewed, and ready to book.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link href="/waxing" className="bg-[#C4856A] hover:bg-[#B5745A] text-white px-7 py-3.5 rounded-full text-sm font-medium transition-colors">Browse Waxing Salons</Link>
            <Link href="/nail-salons" className="border border-[#C4856A]/40 hover:border-[#C4856A] text-[#C4B89A] hover:text-[#C4856A] px-7 py-3.5 rounded-full text-sm font-medium transition-colors">Nail Salons</Link>
          </div>
          <div className="mt-16 pt-8 border-t border-white/10 flex flex-wrap gap-8 text-sm text-[#C4B89A]">
            {[["81+", "Verified Businesses"], ["5", "Beauty Categories"], ["Warner Robins", "GA & Surrounds"]].map(([val, label]) => (
              <div key={label}>
                <span className="block text-white text-2xl font-display font-semibold">{val}</span>
                <span>{label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <FeaturedListing />

      <section className="max-w-6xl mx-auto px-6 py-12">
        <div className="mb-8">
          <p className="text-[#C4856A] text-xs font-medium tracking-widest uppercase mb-1">Browse by Category</p>
          <h2 className="font-display text-3xl md:text-4xl font-bold">Find What You Need</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {CATEGORIES.map((cat) => (
            <Link key={cat.slug} href={`/${cat.slug}`} className="group relative rounded-xl border border-[#E8D5C4] bg-white hover:border-[#C4856A] hover:shadow-lg hover:shadow-[#C4856A]/10 p-6 transition-all duration-200">
              <div className="flex items-start justify-between mb-4">
                <span className="text-[#C4856A] text-3xl leading-none">{cat.icon}</span>
                {cat.count && <span className="text-xs text-[#A0786A] bg-[#F5EBE6] px-2.5 py-1 rounded-full">{cat.count} listings</span>}
              </div>
              <h3 className="font-display text-xl font-semibold mb-1 group-hover:text-[#C4856A] transition-colors">{cat.label}</h3>
              <p className="text-sm text-[#6B4C3B] leading-relaxed">{cat.description}</p>
              <div className="mt-4 text-[#C4856A] text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity">Browse all →</div>
            </Link>
          ))}
        </div>
      </section>

      <section className="bg-[#F5EBE6]/50 py-16 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="mb-8">
            <p className="text-[#C4856A] text-xs font-medium tracking-widest uppercase mb-1">Community Favorites</p>
            <h2 className="font-display text-3xl md:text-4xl font-bold">Top-Rated in Warner Robins</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {topRated.map((biz, i) => (
              <Link key={biz.id || biz.name} href={`/${biz.id || biz.name.toLowerCase().replace(/\s+/g, "-")}`} className="group bg-white rounded-xl border border-[#E8D5C4] hover:border-[#C4856A] hover:shadow-md p-6 transition-all duration-200">
                <div className="flex items-start gap-4">
                  <span className="w-9 h-9 rounded-full bg-[#F5EBE6] text-[#C4856A] flex items-center justify-center text-sm font-bold shrink-0">{i + 1}</span>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-[#2C1810] group-hover:text-[#C4856A] transition-colors truncate mb-0.5">{biz.name}</h3>
                    <p className="text-xs text-[#A0786A] mb-2">{biz.categoryLabel}</p>
                    <div className="flex items-center gap-2">
                      <Stars rating={biz.rating!} />
                      <span className="text-xs text-[#6B4C3B]">{biz.rating} ({biz.reviewCount?.toLocaleString()})</span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-6 py-16">
        <div className="rounded-2xl bg-[#2C1810] text-white p-10 md:p-14 text-center relative overflow-hidden">
          <div className="absolute inset-0 opacity-[0.05]" style={{ backgroundImage: "repeating-linear-gradient(45deg, #C4856A 0, #C4856A 1px, transparent 0, transparent 50%)", backgroundSize: "12px 12px" }} />
          <div className="relative">
            <span className="text-[#C4856A] text-4xl">✦</span>
            <h2 className="font-display text-3xl md:text-4xl font-bold mt-4 mb-3">Own a Beauty Business in Warner Robins?</h2>
            <p className="text-[#C4B89A] mb-8 max-w-xl mx-auto">Get your salon or spa listed — free basic listings and premium featured placement available.</p>
            <a href="mailto:hello@warnerrobinsbeauty.com" className="inline-block bg-[#C4856A] hover:bg-[#B5745A] text-white px-8 py-4 rounded-full font-medium transition-colors">Get Listed Today</a>
          </div>
        </div>
      </section>

      <footer className="border-t border-[#E8D5C4] bg-[#FDFAF7] py-10 px-6">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-[#A0786A]">
          <div className="flex items-center gap-2 font-display font-semibold text-[#2C1810]">
            <span className="text-[#C4856A]">✦</span> Warner Robins Beauty Directory
          </div>
          <nav className="flex gap-6">
            <Link href="/waxing" className="hover:text-[#C4856A] transition-colors">Waxing</Link>
            <Link href="/nail-salons" className="hover:text-[#C4856A] transition-colors">Nails</Link>
            <Link href="/hair-salons" className="hover:text-[#C4856A] transition-colors">Hair</Link>
            <Link href="/spas" className="hover:text-[#C4856A] transition-colors">Spas</Link>
          </nav>
          <p>© {new Date().getFullYear()} warnerrobinsbeauty.com</p>
        </div>
      </footer>

    </main>
  );
}
