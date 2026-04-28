import fs from "fs";
import path from "path";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Waxing Salons in Warner Robins, GA — Top Rated Local Wax Studios",
  description:
    "Find the best waxing salons in Warner Robins, GA. Browse top-rated wax studios for Brazilian wax, full body wax, eyebrow wax, and more.",
  keywords: [
    "waxing salon warner robins",
    "brazilian wax warner robins",
    "wax studio warner robins ga",
    "eyebrow wax warner robins",
  ],
};

// ─── Types ────────────────────────────────────────────────────────────────────
interface Business {
  id: string;
  name: string;
  address: string;
  website?: string;
  rating?: number;
  reviewCount?: number;
  phone?: string | null;
  photoReference?: string;
  photoName?: string;
  placeId?: string;
  slug?: string;
  hours?: string[];
}

// ─── Helpers ──────────────────────────────────────────────────────────────────
const API_KEY = process.env.GOOGLE_API_KEY || "";

function getPhotoUrl(biz: Business): string | null {
  if (biz.photoName) {
    return `/api/photo?name=${biz.photoName}`;
  }
  if (biz.photoReference) {
    return `/api/photo?ref=${biz.photoReference}`;
  }
  return null;
}

function getSlug(biz: Business): string {
  return biz.slug || biz.id || biz.name.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "");
}

function getInitials(name: string): string {
  return name
    .split(" ")
    .slice(0, 2)
    .map((w) => w[0])
    .join("")
    .toUpperCase();
}

function Stars({ rating }: { rating: number }) {
  const full = Math.floor(rating);
  const half = rating - full >= 0.5;
  return (
    <span className="flex gap-0.5 text-[#C4856A]" aria-label={`${rating} stars`}>
      {Array.from({ length: 5 }, (_, i) => (
        <span key={i} className={i < full ? "opacity-100" : half && i === full ? "opacity-50" : "opacity-20"}>
          ★
        </span>
      ))}
    </span>
  );
}

// ─── Data ─────────────────────────────────────────────────────────────────────
function getData(): Business[] {
  const filePath = path.join(process.cwd(), "data", "wr-beauty-data.json");
  const raw = fs.readFileSync(filePath, "utf-8");
  const json = JSON.parse(raw);
  return json.categories.waxing as Business[];
}

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function WaxingPage() {
  const businesses = getData();
  const sedra = businesses.find((b) => b.name === "Waxology Studio");
  const others = businesses.filter((b) => b.name !== "Waxology Studio");

  return (
    <main className="min-h-screen bg-[#FDFAF7] text-[#2C1810]">

      {/* ── Nav ─────────────────────────────────────────────────────────────── */}
      <header className="sticky top-0 z-50 bg-[#FDFAF7]/95 backdrop-blur-sm border-b border-[#E8D5C4]">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <span className="text-[#C4856A] text-2xl">✦</span>
            <span className="font-display text-xl font-semibold tracking-tight">
              Warner Robins Beauty
            </span>
          </Link>
          <nav className="hidden md:flex gap-6 text-sm text-[#6B4C3B]">
            <Link href="/waxing" className="text-[#C4856A] font-medium">Waxing</Link>
            <Link href="/nail-salons" className="hover:text-[#C4856A] transition-colors">Nails</Link>
            <Link href="/hair-salons" className="hover:text-[#C4856A] transition-colors">Hair</Link>
            <Link href="/spas" className="hover:text-[#C4856A] transition-colors">Spas</Link>
          </nav>
        </div>
      </header>

      {/* ── Hero ────────────────────────────────────────────────────────────── */}
      <section className="bg-[#2C1810] text-white py-16 px-6 relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage: "repeating-linear-gradient(45deg, #C4856A 0, #C4856A 1px, transparent 0, transparent 50%)",
            backgroundSize: "12px 12px",
          }}
        />
        <div className="absolute -top-20 -right-20 w-80 h-80 rounded-full bg-[#C4856A] opacity-10 blur-3xl" />
        <div className="relative max-w-6xl mx-auto">
          <Link href="/" className="text-[#C4856A] text-sm hover:underline mb-4 inline-block">
            ← Back to Directory
          </Link>
          <p className="text-[#C4856A] text-xs font-medium tracking-widest uppercase mb-2">
            Warner Robins, GA
          </p>
          <h1 className="font-display text-4xl md:text-5xl font-bold mb-3">
            Waxing Salons
          </h1>
          <p className="text-[#C4B89A] text-lg max-w-xl">
            Browse {businesses.length} top-rated waxing studios in Warner Robins — from Brazilian wax to full body treatments.
          </p>
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-6 py-12">

        {/* ── Featured: Waxology Studio ──────────────────────────────────────── */}
        {sedra && (
          <div className="mb-12">
            <p className="text-[#C4856A] text-xs font-medium tracking-widest uppercase mb-3">
              Featured Studio
            </p>
            <div className="relative rounded-2xl border-2 border-[#C4856A] bg-gradient-to-br from-[#FDF3EE] to-[#FDFAF7] overflow-hidden">
              <div className="absolute top-4 right-4 bg-[#C4856A] text-white text-xs font-medium tracking-widest uppercase px-3 py-1 rounded-full">
                Featured
              </div>

              <div className="flex flex-col md:flex-row">
                {/* Photo */}
                <div className="md:w-72 h-52 md:h-auto shrink-0 relative overflow-hidden">
                  {getPhotoUrl(sedra) ? (
                    <img
                      src={getPhotoUrl(sedra)!}
                      alt={sedra.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full bg-[#C4856A] flex items-center justify-center">
                      <span className="text-white text-4xl font-display font-bold">
                        {getInitials(sedra.name)}
                      </span>
                    </div>
                  )}
                </div>

                {/* Info */}
                <div className="p-8 flex-1">
                  <p className="text-[#C4856A] text-xs font-medium tracking-widest uppercase mb-1">
                    #1 Brazilian Wax · Warner Robins
                  </p>
                  <h2 className="font-display text-3xl font-bold mb-1">{sedra.name}</h2>
                  <p className="text-[#6B4C3B] text-sm mb-3">{sedra.address}</p>

                  <div className="flex items-center gap-3 mb-4">
                    {sedra.rating && <Stars rating={sedra.rating} />}
                    <span className="text-sm text-[#6B4C3B]">
                      {sedra.rating} · {sedra.reviewCount} reviews
                    </span>
                  </div>

                  {sedra.hours && (
                    <div className="mb-5">
                      <p className="text-xs font-medium text-[#A0786A] uppercase tracking-wide mb-1">Hours</p>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-0.5 text-xs text-[#6B4C3B]">
                        {sedra.hours.map((h) => (
                          <span key={h}>{h}</span>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="flex flex-wrap gap-3">
                    {sedra.website && (
                      <a
                        href={sedra.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-[#C4856A] hover:bg-[#B5745A] text-white px-6 py-2.5 rounded-full text-sm font-medium transition-colors"
                      >
                        Visit Website →
                      </a>
                    )}
                    {sedra.phone && (
                      <a
                        href={`tel:${sedra.phone}`}
                        className="border border-[#C4856A] text-[#C4856A] hover:bg-[#C4856A]/5 px-6 py-2.5 rounded-full text-sm font-medium transition-colors"
                      >
                        {sedra.phone}
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ── All Waxing Salons ──────────────────────────────────────────────── */}
        <div>
          <h2 className="font-display text-2xl font-bold mb-6">
            All Waxing Salons in Warner Robins
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {others.map((biz) => {
              const photoUrl = getPhotoUrl(biz);
              const slug = getSlug(biz);
              return (
                <Link
                  key={biz.id || biz.name}
                  href={`/${slug}`}
                  className="group bg-white rounded-xl border border-[#E8D5C4] hover:border-[#C4856A] hover:shadow-lg hover:shadow-[#C4856A]/10 overflow-hidden transition-all duration-200"
                >
                  {/* Photo */}
                  <div className="h-44 overflow-hidden relative">
                    {photoUrl ? (
                      <img
                        src={photoUrl}
                        alt={biz.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-[#E8D5C4] to-[#C4856A]/30 flex items-center justify-center">
                        <span className="text-[#C4856A] text-3xl font-display font-bold">
                          {getInitials(biz.name)}
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Info */}
                  <div className="p-5">
                    <h3 className="font-semibold text-[#2C1810] group-hover:text-[#C4856A] transition-colors mb-1 leading-tight">
                      {biz.name}
                    </h3>
                    <p className="text-xs text-[#A0786A] mb-3 leading-relaxed">{biz.address}</p>

                    {biz.rating && (
                      <div className="flex items-center gap-2 mb-3">
                        <Stars rating={biz.rating} />
                        <span className="text-xs text-[#6B4C3B]">
                          {biz.rating} ({biz.reviewCount?.toLocaleString()})
                        </span>
                      </div>
                    )}

                    {biz.phone && (
                      <p className="text-xs text-[#6B4C3B]">{biz.phone}</p>
                    )}
                  </div>
                </Link>
              );
            })}
          </div>
        </div>

        {/* ── SEO text ──────────────────────────────────────────────────────── */}
        <div className="mt-16 pt-8 border-t border-[#E8D5C4] prose prose-sm max-w-none text-[#6B4C3B]">
          <h2 className="font-display text-2xl font-bold text-[#2C1810] mb-3">
            Finding the Best Waxing Salon in Warner Robins, GA
          </h2>
          <p>
            Warner Robins has a growing number of professional waxing studios offering everything from
            eyebrow shaping to full Brazilian wax services. Whether you're looking for a quick brow wax
            or a full body treatment, the salons listed here are reviewed and rated by real customers in
            the Warner Robins area.
          </p>
          <p className="mt-3">
            For Brazilian wax specialists, Waxology Studio on Houston Lake Road is consistently ranked
            among the top in the region with a 4.7 rating and over 113 reviews. Other popular options
            include Southern Charm Waxing Co. in Bonaire and The Wax Strip in Kathleen — both within a
            short drive of Warner Robins.
          </p>
        </div>
      </div>

      {/* ── Footer ──────────────────────────────────────────────────────────── */}
      <footer className="border-t border-[#E8D5C4] bg-[#FDFAF7] py-10 px-6 mt-12">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-[#A0786A]">
          <div className="flex items-center gap-2 font-display font-semibold text-[#2C1810]">
            <span className="text-[#C4856A]">✦</span> Warner Robins Beauty Directory
          </div>
          <nav className="flex gap-6">
            <Link href="/waxing" className="text-[#C4856A]">Waxing</Link>
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