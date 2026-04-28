import fs from "fs";
import path from "path";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

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
  lat?: number;
  lng?: number;
}

function getAllBusinesses(): Business[] {
  const filePath = path.join(process.cwd(), "data", "wr-beauty-data.json");
  const raw = fs.readFileSync(filePath, "utf-8");
  const data = JSON.parse(raw);
  return Object.values(data.categories).flat() as Business[];
}

function getSlug(biz: Business): string {
  return biz.id || biz.name.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "");
}

function getCategoryLabel(cat: string): string {
  const map: Record<string, string> = {
    waxing: "Waxing Salons",
    "nail-salons": "Nail Salons",
    "hair-salons": "Hair Salons",
    spas: "Spas",
    "hair-removal": "Hair Removal",
  };
  return map[cat] || cat;
}

function getCategoryPath(cat: string): string {
  const map: Record<string, string> = {
    waxing: "/waxing",
    "nail-salons": "/nail-salons",
    "hair-salons": "/hair-salons",
    spas: "/spas",
    "hair-removal": "/hair-removal",
  };
  return map[cat] || "/";
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const businesses = getAllBusinesses();
  const biz = businesses.find((b) => getSlug(b) === slug);
  if (!biz) return { title: "Not Found" };
  return {
    title: `${biz.name} — Warner Robins Beauty Directory`,
    description: `${biz.name} in Warner Robins, GA. ${biz.rating ? `Rated ${biz.rating} stars` : ""} ${biz.reviewCount ? `by ${biz.reviewCount} customers.` : ""}`,
  };
}

export async function generateStaticParams() {
  const businesses = getAllBusinesses();
  return businesses.map((biz) => ({ slug: getSlug(biz) }));
}

function Stars({ rating }: { rating: number }) {
  const full = Math.floor(rating);
  const half = rating - full >= 0.5;
  return (
    <span className="flex gap-0.5 text-[#C4856A] text-xl">
      {Array.from({ length: 5 }, (_, i) => (
        <span key={i} className={i < full ? "opacity-100" : half && i === full ? "opacity-50" : "opacity-20"}>★</span>
      ))}
    </span>
  );
}

export default async function BusinessPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const businesses = getAllBusinesses();
  const biz = businesses.find((b) => getSlug(b) === slug);
  if (!biz) notFound();

  const initials = biz.name.split(" ").slice(0, 2).map((w) => w[0]).join("").toUpperCase();

  return (
    <main className="min-h-screen bg-[#FDFAF7] text-[#2C1810]">

      {/* Nav */}
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

      {/* Breadcrumb */}
      <div className="max-w-6xl mx-auto px-6 py-4 text-sm text-[#A0786A]">
        <Link href="/" className="hover:text-[#C4856A]">Home</Link>
        <span className="mx-2">›</span>
        <Link href={getCategoryPath(biz.category)} className="hover:text-[#C4856A]">{getCategoryLabel(biz.category)}</Link>
        <span className="mx-2">›</span>
        <span className="text-[#2C1810]">{biz.name}</span>
      </div>

      {/* Business Card */}
      <div className="max-w-4xl mx-auto px-6 py-8">
        <div className="bg-white rounded-2xl border border-[#E8D5C4] overflow-hidden shadow-sm">

          {/* Photo */}
          <div className="h-64 md:h-80 overflow-hidden relative">
            {biz.photoUrl ? (
              <img src={biz.photoUrl} alt={biz.name} className="w-full h-full object-cover" />
            ) : (
              <div className="w-full h-full bg-gradient-to-br from-[#E8D5C4] to-[#C4856A]/30 flex items-center justify-center">
                <span className="text-[#C4856A] text-6xl font-display font-bold">{initials}</span>
              </div>
            )}
          </div>

          {/* Info */}
          <div className="p-8">
            <h1 className="font-display text-3xl font-bold text-[#2C1810] mb-2">{biz.name}</h1>
            <p className="text-[#6B4C3B] mb-4">{biz.address}</p>

            {biz.rating && (
              <div className="flex items-center gap-3 mb-6">
                <Stars rating={biz.rating} />
                <span className="font-semibold">{biz.rating}</span>
                <span className="text-[#A0786A]">· {biz.reviewCount?.toLocaleString()} Google reviews</span>
              </div>
            )}

            {/* CTA buttons */}
            <div className="flex flex-wrap gap-3 mb-8">
              {biz.website && (
                <a href={biz.website} target="_blank" rel="noopener noreferrer"
                  className="bg-[#C4856A] hover:bg-[#B5745A] text-white px-6 py-2.5 rounded-full text-sm font-medium transition-colors">
                  Visit Website →
                </a>
              )}
              {biz.phone && (
                <a href={`tel:${biz.phone}`}
                  className="bg-[#2C1810] hover:bg-[#3D2415] text-white px-6 py-2.5 rounded-full text-sm font-medium transition-colors">
                  {biz.phone}
                </a>
              )}
              <a href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(biz.name + " " + biz.address)}`}
                target="_blank" rel="noopener noreferrer"
                className="border border-[#C4856A] text-[#C4856A] hover:bg-[#C4856A]/5 px-6 py-2.5 rounded-full text-sm font-medium transition-colors">
                Get Directions
              </a>
            </div>

            {/* Hours */}
            {biz.hours && biz.hours.length > 0 && (
              <div className="mb-8">
                <h2 className="text-xs font-semibold text-[#A0786A] uppercase tracking-widest mb-3">Hours</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-1">
                  {biz.hours.map((h, i) => (
                    <p key={i} className="text-sm text-[#6B4C3B]">{h}</p>
                  ))}
                </div>
              </div>
            )}

            {/* Claim CTA */}
            <div className="border border-dashed border-[#C4856A] rounded-xl p-6 text-center bg-[#FDF3EE]/50">
              <p className="text-sm font-semibold text-[#2C1810] mb-1">Is this your business?</p>
              <p className="text-xs text-[#A0786A] mb-3">Claim this listing to add photos, respond to reviews, and get featured.</p>
              <a href="mailto:hello@warnerrobinsbeauty.com"
                className="inline-block bg-[#C4856A] hover:bg-[#B5745A] text-white px-6 py-2 rounded-full text-sm font-medium transition-colors">
                Claim This Listing
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t border-[#E8D5C4] bg-[#FDFAF7] py-10 px-6 mt-12">
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