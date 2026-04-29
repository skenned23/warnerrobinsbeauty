import Link from "next/link";
import type { Metadata } from "next";
import Navbar from "../components/Navbar";

export const metadata: Metadata = {
  title: "Privacy Policy — Warner Robins Beauty Directory",
  description: "Privacy Policy for Warner Robins Beauty Directory.",
};

export default function PrivacyPage() {
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
            <Link href="/contact" className="hover:text-[#D4A574] transition-colors">Contact</Link><Link href="/privacy" className="hover:text-[#D4A574] transition-colors">Privacy</Link>
          </nav>
        </div>
      </header>

      {/* Content */}
      <div className="max-w-3xl mx-auto px-6 py-16 space-y-8">
        <div>
          <p className="text-[#D4A574] text-xs font-medium tracking-widest uppercase mb-2">Legal</p>
          <h1 className="text-4xl font-bold mb-2">Privacy Policy</h1>
          <p className="text-white/30 text-sm">Last updated: April 28, 2026</p>
        </div>

        {[
          ["Information We Collect", "Warner Robins Beauty Directory does not collect personal information from visitors unless voluntarily submitted through our contact form. Information submitted via the contact form (such as name, email, and business name) is used solely to respond to your inquiry."],
          ["Business Listings", "Business information displayed on this site (including names, addresses, phone numbers, ratings, and photos) is sourced from publicly available data including Google Maps and other public directories. If you are a business owner and wish to update or remove your listing, please contact us at warnerrobinsbeauty@gmail.com."],
          ["Cookies", "This site may use basic analytics cookies to understand how visitors use the site. We do not use advertising cookies or sell your data to third parties."],
          ["Third Party Links", "Our directory contains links to third-party websites including business websites and booking platforms. We are not responsible for the privacy practices of those sites."],
          ["Google Maps Data", "Some business information and photos are sourced via Google Maps. This data is subject to Google's Terms of Service and Privacy Policy."],
          ["Changes to This Policy", "We may update this privacy policy from time to time. Changes will be posted on this page with an updated date."],
          ["Contact", "If you have any questions about this privacy policy, please contact us at warnerrobinsbeauty@gmail.com."],
        ].map(([title, content]) => (
          <div key={title} className="border-t border-white/5 pt-6">
            <h2 className="text-lg font-semibold mb-2">{title}</h2>
            <p className="text-white/40 leading-relaxed text-sm">{content}</p>
          </div>
        ))}
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
            <Link href="/contact" className="hover:text-[#D4A574] transition-colors">Contact</Link><Link href="/privacy" className="hover:text-[#D4A574] transition-colors">Privacy</Link>
          </nav>
          <p>© {new Date().getFullYear()} warnerrobinsbeauty.com</p>
        </div>
      </footer>
    </main>
  );
}