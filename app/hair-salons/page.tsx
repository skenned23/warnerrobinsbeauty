import fs from "fs";
import path from "path";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Hair Salons in Warner Robins, GA — Best Manicure & Pedicure Near You",
  description:
    "Find the best Hair Salons in Warner Robins, GA. Browse top-rated nail studios forcuts, color, blowouts, braids, and styling.",
  keywords: [
    "nail salon warner robins",
    "Hair Salons warner robins ga",
    "manicure warner robins",
    "pedicure warner robins",
    "gel nails warner robins",
    "acrylic nails warner robins",
  ],
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

function getSlug(biz: Business): string {
  return biz.id || biz.name.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "");
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
  return JSON.parse(raw).categories["hair-salons"] as Business[];
}

export default function HairSalonsPage() {
  const businesses = getData();
  const sorted = [...businesses].sort((a, b) => {
    if (!a.rating) return 1;
    if (!b.rating) return -1;
    return (b.rating * Math.log((b.reviewCount || 1) + 1)) - (a.rating * Math.log((a.reviewCount || 1) + 1));
  });

  return (
    <main className="min-h-screen bg-[#0A0A0A] text-white">

      {/* Nav */}
      <header className="sticky top-0 z-50 bg-[#0A0A0A]/95 backdrop-blur-sm border-b border-white/5">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <span className="text-[#D4A574] text-2xl">✦</span>
            <span className="font-display text-xl font-semibold tracking-tight">Warner Robins Beauty</span>
          </Link>
          <nav className="hidden md:flex gap-6 text-sm text-white/40">
            <Link href="/waxing" className="hover:text-[#D4A574] transition-colors">Waxing</Link>
            <Link href="/hair-salons" className="text-[#D4A574] font-medium">Nails</Link>
            <Link href="/hair-salons" className="hover:text-[#D4A574] transition-colors">Hair</Link>
            <Link href="/spas" className="hover:text-[#D4A574] transition-colors">Spas</Link><Link href="/contact" className="hover:text-[#D4A574] transition-colors">Contact</Link>
          </nav>
        </div>
      </header>

      {/* Hero */}
      <section className="bg-[#1a0f0a] text-white py-16 px-6 relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: "repeating-linear-gradient(45deg, #C4856A 0, #C4856A 1px, transparent 0, transparent 50%)", backgroundSize: "12px 12px" }} />
        <div className="absolute -top-20 -right-20 w-80 h-80 rounded-full bg-[#C4856A] opacity-10 blur-3xl" />
        <div className="relative max-w-6xl mx-auto">
          <Link href="/" className="text-[#D4A574] text-sm hover:underline mb-4 inline-block">← Back to Directory</Link>
          <p className="text-[#D4A574] text-xs font-medium tracking-widest uppercase mb-2">Warner Robins, GA</p>
          <h1 className="font-display text-4xl md:text-5xl font-bold mb-3">Hair Salons</h1>
          <p className="text-[#C4B89A] text-lg max-w-xl">
            Browse {businesses.length} top-rated Hair Salons in Warner Robins —cuts, color, blowouts, braids, and styling.
          </p>
        </div>
      </section>

      {/* Services strip */}
      <section className="border-b border-white/5 bg-white/[0.02]">
        <div className="max-w-6xl mx-auto px-6 py-4 flex flex-wrap gap-3">
          {["Haircut", "Balayage", "Color", "Blowout", "Braids", "Extensions", "Keratin", "Natural Hair"].map((s) => (
            <span key={s} className="text-xs text-xs bg-white/5 text-white/50 border border-white/10 px-3 py-1.5 rounded-full">{s}</span>
          ))}
        </div>
      </section>

      {/* Listings */}
      <div className="max-w-6xl mx-auto px-6 py-12">
        <div className="flex items-center justify-between mb-6">
          <h2 className="font-display text-2xl font-bold">All Hair Salons in Warner Robins</h2>
          <span className="text-sm text-white/30">{businesses.length} listings</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {sorted.map((biz) => {
            const slug = getSlug(biz);
            return (
              <Link
                key={biz.id || biz.name}
                href={`/${slug}`}
                className="group bg-white/[0.02] rounded-xl border border-white/5 hover:border-[#C4856A] hover:shadow-lg hover:shadow-[#C4856A]/10 overflow-hidden transition-all duration-200"
              >
                {/* Photo */}
                <div className="h-44 overflow-hidden relative">
                  {biz.photoUrl ? (
                    <img src={biz.photoUrl} alt={biz.name} className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-[#E8D5C4] to-[#C4856A]/30 flex items-center justify-center">
                      <span className="text-[#D4A574] text-3xl font-display font-bold">{getInitials(biz.name)}</span>
                    </div>
                  )}
                </div>

                {/* Info */}
                <div className="p-5">
                  <h3 className="font-semibold text-white group-hover:text-[#D4A574] transition-colors mb-1 leading-tight">{biz.name}</h3>
                  <p className="text-xs text-white/30 mb-3 leading-relaxed">{biz.address}</p>
                  {biz.rating && (
                    <div className="flex items-center gap-2 mb-2">
                      <Stars rating={biz.rating} />
                      <span className="text-xs text-white/40">{biz.rating} ({biz.reviewCount?.toLocaleString()})</span>
                    </div>
                  )}
                  {biz.phone && <p className="text-xs text-white/40">{biz.phone}</p>}
                </div>
              </Link>
            );
          })}
        </div>

        {/* SEO text */}
        <div className="mt-16 pt-8 border-t border-white/5 text-white/40">
          <h2 className="font-display text-2xl font-bold text-white mb-3">Finding the Best Nail Salon in Warner Robins, GA</h2>
          <p className="mb-3">Warner Robins has a strong selection of Hair Salons offering everything from basic manicures and pedicures to elaborate nail art, gel extensions, and dip powder treatments. Whether you need a quick touch-up or a full nail makeover, the salons listed here are rated by real customers in the Warner Robins area.</p>
          <p>Popular services in Warner Robins Hair Salons include gel manicures, acrylic sets, SNS dip powder, and spa pedicures. Many salons also offer nail art and custom designs. Use this directory to compare ratings, read reviews, and find the nail salon nearest to you in Warner Robins, Centerville, Bonaire, or Kathleen, GA.</p>
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t border-white/5 bg-[#0A0A0A] py-10 px-6 mt-12">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-white/30">
          <div className="flex items-center gap-2 font-display font-semibold text-white">
            <span className="text-[#D4A574]">✦</span> Warner Robins Beauty Directory
          </div>
          <nav className="flex gap-6">
            <Link href="/waxing" className="hover:text-[#D4A574] transition-colors">Waxing</Link>
            <Link href="/hair-salons" className="text-[#D4A574]">Nails</Link>
            <Link href="/hair-salons" className="hover:text-[#D4A574] transition-colors">Hair</Link>
            <Link href="/spas" className="hover:text-[#D4A574] transition-colors">Spas</Link><Link href="/contact" className="hover:text-[#D4A574] transition-colors">Contact</Link>
          </nav>
          <p>© {new Date().getFullYear()} warnerrobinsbeauty.com</p>
        </div>
      </footer>
    </main>
  );
}