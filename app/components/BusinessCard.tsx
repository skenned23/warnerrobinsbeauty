import Link from 'next/link'

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

export default function BusinessCard({ biz }: { biz: Business }) {
  const slug = getSlug(biz);
  const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(biz.name + " " + biz.address)}`;

  return (
    <a href={`/${slug}`}
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
        <div className="mt-2 flex items-center gap-3">
          <a href={mapsUrl} target="_blank" rel="noopener noreferrer" className="inline-block text-xs text-[#D4A574] hover:underline">📍 Get Directions</a>
          {biz.phone && (
            <a href={`tel:${biz.phone}`} className="inline-block text-xs bg-[#D4A574] text-black font-bold px-3 py-1 rounded-full hover:opacity-90 transition-opacity">📞 Call Now</a>
          )}
        </div>
      </div>
    </a>
  );
}