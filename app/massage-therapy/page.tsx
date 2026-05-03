import fs from "fs";
import path from "path";
import type { Metadata } from "next";
import Navbar from "../components/Navbar";
import BusinessCard from "../components/BusinessCard";

export const metadata: Metadata = {
  title: "Massage Therapy in Warner Robins, GA — Best Massage Near You",
  description: "Find the best massage therapy in Warner Robins, GA. Browse top-rated therapists for Swedish, deep tissue, prenatal, couples massage and more.",
  keywords: ["massage therapy warner robins", "massage warner robins ga", "deep tissue massage warner robins", "couples massage warner robins", "prenatal massage warner robins"],
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
  return JSON.parse(raw).categories["massage-therapy"] as Business[];
}

export default function MassageTherapyPage() {
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
          <h1 className="text-4xl md:text-5xl font-bold mb-3">Massage Therapy in Warner Robins</h1>
          <p className="text-white/40 text-lg max-w-xl">
            Browse {businesses.length} top-rated massage therapists in Warner Robins — Swedish, deep tissue, prenatal, couples and more.
          </p>
        </div>
      </section>

      {/* Services strip */}
      <section className="border-b border-white/5 bg-white/[0.02]">
        <div className="max-w-6xl mx-auto px-6 py-4 flex flex-wrap gap-3">
          {["Swedish", "Deep Tissue", "Prenatal", "Couples", "Hot Stone", "Sports", "Reflexology", "Reiki"].map((s) => (
            <span key={s} className="text-xs bg-white/5 text-white/40 px-2.5 py-1 rounded-md">{s}</span>
          ))}
        </div>
      </section>

      {/* Listings */}
      <div className="max-w-6xl mx-auto px-6 py-12">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold">All Massage Therapists in Warner Robins</h2>
          <span className="text-sm text-white/30">{businesses.length} listings</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {sorted.map((biz) => (
            <BusinessCard key={biz.id || biz.name} biz={biz} />
          ))}
        </div>

        {/* SEO text */}
        <div className="mt-16 pt-8 border-t border-white/5 text-white/40">
          <h2 className="text-2xl font-bold text-white mb-3">Finding the Best Massage Therapy in Warner Robins, GA</h2>
          <p className="mb-3">Warner Robins has a wide range of licensed massage therapists offering everything from relaxing Swedish massage to targeted deep tissue and sports therapy. Whether you need relief from chronic pain, stress reduction, or a prenatal massage, the therapists listed here serve clients across Warner Robins, Bonaire, Kathleen, and Centerville, GA.</p>
          <p>Popular massage services in Warner Robins include couples massage, hot stone therapy, reflexology, and prenatal massage. Use this directory to compare ratings, read reviews, and book with a trusted massage therapist near you.</p>
        </div>
      </div>

      {/* Related Categories */}
      <section className="max-w-6xl mx-auto px-6 py-12 border-t border-white/5">
        <h2 className="text-xl font-bold mb-6">Explore Related Beauty Services in Warner Robins</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { slug: "spas", label: "Spas" },
            { slug: "medical-spas", label: "Medical Spas" },
            { slug: "waxing", label: "Waxing" },
            { slug: "hair-extensions", label: "Hair Extensions" },
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
            <a href="/hair-extensions" className="hover:text-[#D4A574] transition-colors">Extensions</a>
            <a href="/massage-therapy" className="text-[#D4A574]">Massage</a>
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