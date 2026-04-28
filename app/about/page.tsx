import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About — Warner Robins Beauty Directory",
  description: "Warner Robins Beauty Directory is the premier local guide to salons, spas, and beauty studios in Warner Robins, GA.",
};

export default function AboutPage() {
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
            <Link href="/waxing" className="hover:text-[#D4A574] transition-colors">Waxing</Link>
            <Link href="/nail-salons" className="hover:text-[#D4A574] transition-colors">Nails</Link>
            <Link href="/hair-salons" className="hover:text-[#D4A574] transition-colors">Hair</Link>
            <Link href="/spas" className="hover:text-[#D4A574] transition-colors">Spas</Link>
            <Link href="/about" className="hover:text-[#D4A574] transition-colors">About</Link>
<Link href="/contact" className="hover:text-[#D4A574] transition-colors">Contact</Link><Link href="/privacy" className="hover:text-[#D4A574] transition-colors">Privacy</Link>
          </nav>
        </div>
      </header>

      {/* Hero */}
      <section className="relative py-16 px-6 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#1a0f0a] via-[#0A0A0A] to-[#0A0A0A]" />
        <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-[#D4A574] opacity-[0.06] blur-[100px]" />
        <div className="relative max-w-6xl mx-auto">
          <p className="text-[#D4A574] text-xs font-medium tracking-widest uppercase mb-2">Our Story</p>
          <h1 className="text-4xl md:text-5xl font-bold mb-3">About Us</h1>
          <p className="text-white/40 text-lg max-w-xl">
            The premier local guide to beauty businesses in Warner Robins, GA.
          </p>
        </div>
      </section>

      {/* Content */}
      <div className="max-w-3xl mx-auto px-6 py-12 space-y-10">

        <div>
          <h2 className="text-2xl font-bold mb-4">What We Do</h2>
          <p className="text-white/50 leading-relaxed mb-4">Warner Robins Beauty Directory is a free local resource for residents of Warner Robins, Centerville, Bonaire, and Kathleen, GA looking for the best salons, spas, waxing studios, and nail salons in the area.</p>
          <p className="text-white/50 leading-relaxed">We list 80+ verified local beauty businesses with real ratings, reviews, hours, and contact information — all in one place. No ads, no paywalls, just honest local recommendations.</p>
        </div>

        <div>
          <h2 className="text-2xl font-bold mb-4">Our Mission</h2>
          <p className="text-white/50 leading-relaxed">We believe finding a great local salon or spa should be easy. Our mission is to make Warner Robins beauty businesses more discoverable — and to help residents find exactly what they're looking for, fast.</p>
        </div>

        <div>
          <h2 className="text-2xl font-bold mb-4">For Business Owners</h2>
          <p className="text-white/50 leading-relaxed mb-4">Is your salon or spa listed? Basic listings are free. If you want to stand out with premium placement, photos, testimonials, and a verified badge — we offer featured listing packages.</p>
          <Link href="/contact" className="inline-block bg-[#D4A574] hover:bg-[#C4956A] text-black px-6 py-3 rounded-full text-sm font-semibold transition-colors">
            Get Featured →
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4">
          {[["81+", "Local Businesses"], ["5", "Categories"], ["Warner Robins", "GA & Surrounds"]].map(([val, label]) => (
            <div key={label} className="bg-white/[0.02] border border-white/5 rounded-xl p-6 text-center">
              <span className="block text-[#D4A574] text-3xl font-bold mb-1">{val}</span>
              <span className="text-white/40 text-sm">{label}</span>
            </div>
          ))}
        </div>

      </div>

      {/* Footer */}
      <footer className="border-t border-white/5 py-10 px-6 mt-12">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-white/30">
          <div className="flex items-center gap-2 font-semibold text-white/70">
            <span className="text-[#D4A574]">✦</span> Warner Robins Beauty Directory
          </div>
          <nav className="flex gap-6">
            <Link href="/waxing" className="hover:text-[#D4A574] transition-colors">Waxing</Link>
            <Link href="/nail-salons" className="hover:text-[#D4A574] transition-colors">Nails</Link>
            <Link href="/hair-salons" className="hover:text-[#D4A574] transition-colors">Hair</Link>
            <Link href="/spas" className="hover:text-[#D4A574] transition-colors">Spas</Link>
            <Link href="/about" className="hover:text-[#D4A574] transition-colors">About</Link>
<Link href="/contact" className="hover:text-[#D4A574] transition-colors">Contact</Link><Link href="/privacy" className="hover:text-[#D4A574] transition-colors">Privacy</Link>
          </nav>
          <p>© {new Date().getFullYear()} warnerrobinsbeauty.com</p>
        </div>
      </footer>
    </main>
  );
}