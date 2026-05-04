import fs from "fs";
import path from "path";
import type { Metadata } from "next";
import Navbar from "../components/Navbar";
import BusinessCard from "../components/BusinessCard";

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

export default function TanningSalonsPage() {
  const businesses = getData();

  return (
    <main className="min-h-screen bg-[#0A0A0A] text-white font-sans">
      <Navbar />

      {/* Hero */}
      <section className="relative overflow-hidden py-16 px-6 border-b border-white/5">
        <div className="absolute inset-0 bg-gradient-to-br from-[#1a0f0a] via-[#0A0A0A] to-[#0A0A0A]" />
        <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full bg-[#D4A574] opacity-[0.05] blur-[120px]" />
        <div className="relative max-w-6xl mx-auto">
          <div className="text-sm text-white/30 mb-4">
            <a href="/" className="hover:text-[#D4A574]">Home</a>
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
            <BusinessCard key={biz.id} biz={biz} />
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

      {/* Related Categories */}
      <section className="max-w-6xl mx-auto px-6 py-12 border-t border-white/5">
        <h2 className="text-xl font-bold mb-6">Explore Related Beauty Services in Warner Robins</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { slug: "spas", label: "Spas" },
            { slug: "medical-spas", label: "Medical Spas" },
            { slug: "waxing", label: "Waxing" },
            { slug: "nail-salons", label: "Nail Salons" },
          ].map((cat) => (
            <a key={cat.slug} href={`/${cat.slug}`}
              className="bg-white/[0.03] border border-white/5 hover:border-[#D4A574]/30 rounded-xl p-4 text-center hover:text-[#D4A574] transition-all">
              {cat.label}
            </a>
          ))}
        </div>
      </section>

      {/* Related Categories */}
      <section className="max-w-6xl mx-auto px-6 py-12 border-t border-white/5">
        <h2 className="text-xl font-bold mb-6">Explore Related Beauty Services in Warner Robins</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { slug: "spas", label: "Spas" }, 
            { slug: "medical-spas", label: "Medical Spas" },
            { slug: "waxing", label: "Waxing" },
            { slug: "nail-salons", label: "Nail Salons" },
          ].map((cat) => (
            <a key={cat.slug} href={`/${cat.slug}`}
              className="bg-white/[0.03] border border-white/5 hover:border-[#D4A574]/30 rounded-xl p-4 text-center hover:text-[#D4A574] transition-all">
              {cat.label}
            </a>
          ))}
        </div>
      </section>

      {/* Related Categories */}
      <section className="max-w-6xl mx-auto px-6 py-12 border-t border-white/5">
        <h2 className="text-xl font-bold mb-6">Explore Related Beauty Services in Warner Robins</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { slug: "spas", label: "Spas" },
            { slug: "medical-spas", label: "Medical Spas" },
            { slug: "waxing", label: "Waxing" },
            { slug: "nail-salons", label: "Nail Salons" },
          ].map((cat) => (
            <a key={cat.slug} href={`/${cat.slug}`}
              className="bg-white/[0.03] border border-white/5 hover:border-[#D4A574]/30 rounded-xl p-4 text-center hover:text-[#D4A574] transition-all">
              {cat.label}
            </a>
          ))}
        </div>
      </section>

      {/* Related Categories */}
      <section className="max-w-6xl mx-auto px-6 py-12 border-t border-white/5">
        <h2 className="text-xl font-bold mb-6">Explore Related Beauty Services in Warner Robins</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { slug: "spas", label: "Spas" },
            { slug: "medical-spas", label: "Medical Spas" },
            { slug: "waxing", label: "Waxing" },
            { slug: "nail-salons", label: "Nail Salons" },
          ].map((cat) => (
            <a key={cat.slug} href={`/${cat.slug}`}
              className="bg-white/[0.03] border border-white/5 hover:border-[#D4A574]/30 rounded-xl p-4 text-center hover:text-[#D4A574] transition-all">
              {cat.label}
            </a>
          ))}
        </div>
      </section>

      {/* Related Categories */}
      <section className="max-w-6xl mx-auto px-6 py-12 border-t border-white/5">
        <h2 className="text-xl font-bold mb-6">Explore Related Beauty Services in Warner Robins</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { slug: "spas", label: "Spas" },
            { slug: "medical-spas", label: "Medical Spas" },
            { slug: "waxing", label: "Waxing" },
            { slug: "nail-salons", label: "Nail Salons" },
          ].map((cat) => (
            <a key={cat.slug} href={`/${cat.slug}`}
              className="bg-white/[0.03] border border-white/5 hover:border-[#D4A574]/30 rounded-xl p-4 text-center hover:text-[#D4A574] transition-all">
              {cat.label}
            </a>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/5 py-10 px-6">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-white/30">
          <div className="flex items-center gap-2 font-semibold text-white/70">
            <span className="text-[#D4A574]">✦</span> Warner Robins Beauty Directory
          </div>
          <nav className="flex gap-6 flex-wrap justify-center">
            <a href="/waxing" className="hover:text-[#D4A574] transition-colors">Waxing</a>
            <a href="/nail-salons" className="hover:text-[#D4A574] transition-colors">Nails</a>
            <a href="/hair-salons" className="hover:text-[#D4A574] transition-colors">Hair</a>
            <a href="/spas" className="hover:text-[#D4A574] transition-colors">Spas</a>
            <a href="/hair-removal" className="hover:text-[#D4A574] transition-colors">Hair Removal</a>
            <a href="/brazilian-wax" className="hover:text-[#D4A574] transition-colors">Brazilian Wax</a>
            <a href="/tanning-salons" className="text-[#D4A574]">Tanning</a>
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