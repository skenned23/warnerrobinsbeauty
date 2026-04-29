import fs from "fs";
import path from "path";
import Link from "next/link";
import type { Metadata } from "next";
import Navbar from "../components/Navbar";

export const metadata: Metadata = {
  title: "Tanning Salons in Warner Robins, GA — Best Tanning Near You",
  description: "Find the best tanning salons in Warner Robins, GA. Browse spray tans, UV tanning, and airbrush services near you.",
};

interface Business {
  id: string;
  name: string;
  address: string;
  website?: string;
  phone?: string | null;
  rating?: number;
  reviewCount?: number;
  hours?: string[];
  photoUrl?: string;
  category: string;
}

function getData(): Business[] {
  const filePath = path.join(process.cwd(), "data", "wr-beauty-data.json");
  const raw = fs.readFileSync(filePath, "utf-8");
  const data = JSON.parse(raw);
  return data.categories["tanning-salons"] || [];
}

function Stars({ rating }: { rating: number }) {
  const full = Math.floor(rating);
  const half = rating - full >= 0.5;
  return (
    <span className="flex gap-0.5 text-[#D4A574]">
      {Array.from({ length: 5 }, (_, i) => (
        <span key={i} className={i < full ? "opacity-100" : half && i === full ? "opacity-60" : "opacity-20"}>★</span>
      ))}
    </span>
  );
}

export default function TanningSalonsPage() {
  const businesses = getData();

  return (
    <main className="min-h-screen bg-[#0A0A0A] text-white font-sans">

      {/* Nav */}
      <header className="sticky top-0 z-50 bg-[#0A0A0A]/90 backdrop-blur-md border-b border-white/5">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <span className="text-[#D4A574] text-2xl">✦</span>
            <span className="text-xl font-semibold tracking-tight">Warner Robins Beauty</span>
          </Link>
          <nav className="hidden md:flex gap-6 text-sm text-white/50">
            <Link href="/waxing" className="hover:text-[#D4A574] transition-colors">Waxing</Link>
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
      <section className="relative overflow-hidden py-16 px-6 border-b border-white/5">
        <div className="absolute inset-0 bg-gradient-to-br from-[#1a0f0a] via-[#0A0A0A] to-[#0A0A0A]" />
        <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full bg-[#D4A574] opacity-[0.05] blur-[120px]" />
        <div className="relative max-w-6xl mx-auto">
          <div className="text-sm text-white/30 mb-4">
            <Link href="/" className="hover:text-[#D4A574]">Home</Link>
            <span className="mx-2">›</span>
            <span className="text-white/60">Tanning Salons</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold mb-4">
            Tanning Salons in <span className="text-[#D4A574]">Warner Robins</span>
          </h1>
          <p className="text-white/40 text-lg max-w-xl">
            {businesses.length} tanning salons near Warner Robins, GA — spray tans, UV beds, airbrush services, and more.
          </p>
        </div>
      </section>

      {/* Listings */}
      <section className="max-w-6xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {businesses.map((biz) => (
            <Link key={biz.id} href={`/${biz.id}`}
              className="group bg-white/[0.02] rounded-xl border border-white/5 hover:border-[#D4A574]/30 hover:bg-white/[0.05] overflow-hidden transition-all duration-200">
              {biz.photoUrl && (
                <div className="h-40 overflow-hidden">
                  <img src={biz.photoUrl} alt={biz.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                </div>
              )}
              <div className="p-5">
                <h2 className="font-semibold text-lg mb-1 group-hover:text-[#D4A574] transition-colors">{biz.name}</h2>
                <p className="text-xs text-white/30 mb-3">{biz.address}</p>
                {biz.rating && (
                  <div className="flex items-center gap-2 mb-3">
                    <Stars rating={biz.rating} />
                    <span className="text-xs text-white/40">{biz.rating} ({biz.reviewCount?.toLocaleString()})</span>
                  </div>
                )}
                <div className="flex gap-2 flex-wrap">
                  {biz.website && (
                    <span className="text-xs bg-[#D4A574]/10 text-[#D4A574] px-2.5 py-1 rounded-full">Website</span>
                  )}
                  {biz.phone && (
                    <span className="text-xs bg-white/5 text-white/40 px-2.5 py-1 rounded-full">{biz.phone}</span>
                  )}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-6xl mx-auto px-6 py-12">
        <div className="rounded-2xl border border-[#D4A574]/20 bg-gradient-to-br from-[#1a0f0a] to-[#0A0A0A] p-10 text-center relative overflow-hidden">
          <div className="absolute top-0 right-0 w-80 h-80 rounded-full bg-[#D4A574] opacity-[0.06] blur-[80px]" />
          <div className="relative">
            <span className="text-[#D4A574] text-4xl">✦</span>
            <h2 className="text-2xl md:text-3xl font-bold mt-4 mb-3">Own a Tanning Salon in Warner Robins?</h2>
            <p className="text-white/40 mb-6 max-w-xl mx-auto">Get your business listed and reach local customers looking for tanning services.</p>
            <a href="mailto:warnerrobinsbeauty@gmail.com"
              className="inline-block bg-[#D4A574] hover:bg-[#C4956A] text-black px-8 py-3 rounded-full font-semibold transition-colors">
              Get Listed Today
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/5 py-10 px-6">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-white/30">
          <div className="flex items-center gap-2 font-semibold text-white/70">
            <span className="text-[#D4A574]">✦</span> Warner Robins Beauty Directory
          </div>
          <nav className="flex gap-6">
            <Link href="/waxing" className="hover:text-[#D4A574] transition-colors">Waxing</Link>
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