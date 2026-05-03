import fs from "fs";
import path from "path";
import type { Metadata } from "next";
import Navbar from "../components/Navbar";
import BusinessCard from "../components/BusinessCard";

export const metadata: Metadata = {
  title: "Hair Extensions in Warner Robins, GA — Best Salons Near You",
  description: "Find the best hair extension salons in Warner Robins, GA. Browse top-rated stylists for tape-in, sew-in, clip-in, keratin, and custom hair extensions.",
  keywords: ["hair extensions warner robins", "hair extensions warner robins ga", "sew in warner robins", "tape in extensions warner robins", "weave warner robins ga"],
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
  return JSON.parse(raw).categories["hair-extensions"] as Business[];
}

export default function HairExtensionsPage() {
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
          <h1 className="text-4xl md:text-5xl font-bold mb-3">Hair Extensions in Warner Robins</h1>
          <p className="text-white/40 text-lg max-w-xl">
            Browse {businesses.length} top-rated hair extension salons in Warner Robins — tape-in, sew-in, clip-in, and more.
          </p>
        </div>
      </section>

      {/* Services strip */}
      <section className="border-b border-white/5 bg-white/[0.02]">
        <div className="max-w-6xl mx-auto px-6 py-4 flex flex-wrap gap-3">
          {["Tape-In", "Sew-In", "Clip-In", "Keratin Bond", "Micro-Bead", "Weave", "Wigs", "Natural Hair"].map((s) => (
            <span key={s} className="text-xs bg-white/5 text-white/40 px-2.5 py-1 rounded-md">{s}</span>
          ))}
        </div>
      </section>

      {/* Listings */}
      <div className="max-w-6xl mx-auto px-6 py-12">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold">All Hair Extension Salons in Warner Robins</h2>
          <span className="text-sm text-white/30">{businesses.length} listings</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {sorted.map((biz) => (
            <BusinessCard key={biz.id || biz.name} biz={biz} />
          ))}
        </div>

        {/* SEO text */}
        <div className="mt-16 pt-8 border-t border-white/5 text-white/40">
          <h2 className="text-2xl font-bold text-white mb-3">Finding the Best Hair Extensions in Warner Robins, GA</h2>
          <p className="mb-3">Warner Robins has a growing number of skilled stylists specializing in hair extensions — from tape-in and sew-in weaves to micro-bead and keratin bond extensions. Whether you want added length, volume, or a full transformation, the salons listed here serve clients across Warner Robins, Bonaire, Kathleen, and Centerville, GA.</p>
          <p>Popular extension methods in Warner Robins include sew-in weaves, tape-in extensions, and invisible bead extensions. Use this directory to compare ratings, read reviews, and book with a trusted hair extension specialist near you.</p>
        </div>
      </div>

      {/* Related Categories */}
      <section className="max-w-6xl mx-auto px-6 py-12 border-t border-white/5">
        <h2 className="text-xl font-bold mb-6">Explore Related Beauty Services in Warner Robins</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { slug: "hair-salons", label: "Hair Salons" },
            { slug: "waxing", label: "Waxing" },
            { slug: "lash-extensions", label: "Lash Extensions" },
            { slug: "spas", label: "Spas" },
          ].map((cat) => (
            <a key={cat.slug} href={`/${cat.slug}`}
              className="bg-white/[0.03] border border-white/5 hover:border-[#D4A574]/30 rounded-xl p-4 text-center hover:text-[#D4A574] transition-all">
              {cat.label}
            </a>
          ))}
        </div>
      </section>

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
            <a href="/hair-extensions" className="text-[#D4A574]">Extensions</a>
            <a href="/massage-therapy" className="hover:text-[#D4A574] transition-colors">Massage</a>
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