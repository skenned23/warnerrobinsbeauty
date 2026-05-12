import Link from "next/link";

const ALL_CATEGORIES = [
  { slug: "hair-salons", label: "Hair Salons" },
  { slug: "nail-salons", label: "Nail Salons" },
  { slug: "waxing", label: "Waxing" },
  { slug: "hair-removal", label: "Hair Removal" },
  { slug: "brazilian-wax", label: "Brazilian Wax" },
  { slug: "barber-shops", label: "Barber Shops" },
  { slug: "hair-extensions", label: "Hair Extensions" },
  { slug: "lash-extensions", label: "Lash Extensions" },
  { slug: "massage-therapy", label: "Massage Therapy" },
  { slug: "medical-spas", label: "Medical Spas" },
  { slug: "spas", label: "Spas" },
  { slug: "tanning-salons", label: "Tanning Salons" },
  { slug: "tattoo-shops", label: "Tattoo Shops" },
];

export default function RelatedCategories({ current }: { current: string }) {
  const others = ALL_CATEGORIES.filter((c) => c.slug !== current);
  return (
    <section className="max-w-6xl mx-auto px-6 py-12 border-t border-white/5">
      <h2 className="text-xl font-bold mb-6">Explore More Beauty Services in Warner Robins</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {others.map((cat) => (
          <Link key={cat.slug} href={`/${cat.slug}`}
            className="bg-white/[0.03] border border-white/5 hover:border-[#D4A574]/30 rounded-xl p-4 text-center hover:text-[#D4A574] transition-all">
            {cat.label}
          </Link>
        ))}
      </div>
    </section>
  );
}