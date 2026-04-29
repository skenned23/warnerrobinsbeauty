import fs from "fs";
import path from "path";
import type { Metadata } from "next";
import Navbar from "../components/Navbar";

export const metadata: Metadata = {
  title: "Medical Spas in Warner Robins, GA — Top Rated Med Spas Near You",
  description: "Find the best medical spas in Warner Robins, GA. Browse top-rated med spas for laser treatments, botox, fillers, facials, and aesthetic services.",
  keywords: ["medical spa warner robins", "med spa warner robins ga", "botox warner robins", "laser treatment warner robins"],
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
  return JSON.parse(raw).categories["medical-spas"] as Business[];
}

export default function MedicalSpasPage() {
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
          <h1 className="text-4xl md:text-5xl font-bold mb-3">Medical Spas in Warner Robins</h1>
          <p className="text-white/40 text-lg max-w-xl">
            Browse {businesses.length} top-rated medical spas in Warner Robins — laser treatments, botox, fillers, and advanced aesthetics.
          </p>
        </div>
      </section>

      {/* Services strip */}
      <section className="border-b border-white/5 bg-white/[0.02]">
        <div className="max-w-6xl mx-auto px-6 py-4 flex flex-wrap gap-3">
          {["Botox", "Fillers", "Laser Hair Removal", "Chemical Peels", "Microneedling", "CoolSculpting", "IV Therapy", "Skin Rejuvenation"].map((s) => (
            <span key={s} className="text-xs bg-white/5 text-white/40 px-2.5 py-1 rounded-md">{s}</span>
          ))}
        </div>
      </section>

      {/* Listings */}
      <div className="max-w-6xl mx-auto px-6 py-12">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold">All Medical Spas in Warner Robins</h2>
          <span className="text-sm text-white/30">{businesses.length} listings</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {sorted.map((biz) => {
            const slug = getSlug(biz);
            const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(biz.name + " " + biz.address)}`;
            return (
              <a key={biz.id || biz.name} href={`/${slug}`}
                className="group bg-white/[0.02] rounded-xl border border-white/5 hover:border-[#D4A574]/30 hover:bg-white/[0.05] overflow-hidden transition-all duration-200">
                <div className="h-44 overflow-hidden relative">
                  {biz.photoUrl ? (
                    <img src={biz.photoUrl} alt={biz.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
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
                  {biz.phone && <p className="text-xs text-white/30 mb-1">{biz.phone}</p>}
                  <a href={mapsUrl} target="_blank" rel="noopener noreferrer" className="mt-2 inline-block text-xs text-[#D4A574] hover:underline">📍 Get Directions</a>
                </div>
              </a>
            );
          })}
        </div>

        {/* SEO text */}
        <div className="mt-16 pt-8 border-t border-white/5 text-white/40">
          <h2 className="text-2xl font-bold text-white mb-3">Finding the Best Medical Spa in Warner Robins, GA</h2>
          <p className="mb-3">Warner Robins has a growing number of medical spas offering advanced aesthetic treatments including botox, dermal fillers, laser hair removal, chemical peels, and skin rejuvenation. Whether you're looking for anti-aging treatments or body contouring, the med spas listed here are reviewed and rated by real customers.</p>
          <p>Use this directory to compare ratings, read reviews, and find the best medical spa nearest to you in Warner Robins, Centerville, Bonaire, or Kathleen, GA.</p>
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
            <a href="/medical-spas" className="text-[#D4A574]">Medical Spas</a>
            <a href="/barber-shops" className="hover:text-[#D4A574] transition-colors">Barber Shops</a>
            <a href="/lash-extensions" className="hover:text-[#D4A574] transition-colors">Lash Extensions</a>
            <a href="/tattoo-shops" className="hover:text-[#D4A574] transition-colors">Tattoos</a>
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