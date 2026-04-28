import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact — Warner Robins Beauty Directory",
  description: "Get in touch with Warner Robins Beauty Directory. List your salon, spa, or studio — free basic listings and premium featured placement available.",
};

export default function ContactPage() {
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
            <Link href="/spas" className="hover:text-[#D4A574] transition-colors">Spas</Link><Link href="/contact" className="hover:text-[#D4A574] transition-colors">Contact</Link><Link href="/privacy" className="hover:text-[#D4A574] transition-colors">Privacy</Link>
          </nav>
        </div>
      </header>

      {/* Hero */}
      <section className="relative py-16 px-6 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#1a0f0a] via-[#0A0A0A] to-[#0A0A0A]" />
        <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-[#D4A574] opacity-[0.06] blur-[100px]" />
        <div className="relative max-w-6xl mx-auto">
          <p className="text-[#D4A574] text-xs font-medium tracking-widest uppercase mb-2">Get In Touch</p>
          <h1 className="text-4xl md:text-5xl font-bold mb-3">Contact Us</h1>
          <p className="text-white/40 text-lg max-w-xl">
            Want to list your business or get featured? We'd love to hear from you.
          </p>
        </div>
      </section>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-2 gap-12">

        {/* Left — info */}
        <div>
          <h2 className="text-2xl font-bold mb-6">List Your Business</h2>
          
          <div className="space-y-6 mb-10">
            <div className="bg-white/[0.02] border border-white/5 rounded-xl p-6">
              <h3 className="text-[#D4A574] font-semibold mb-2">✦ Free Basic Listing</h3>
              <p className="text-white/40 text-sm leading-relaxed">Get your salon or spa listed in our directory with your name, address, phone, and rating. Free forever.</p>
            </div>
            <div className="bg-white/[0.02] border border-[#D4A574]/20 rounded-xl p-6">
              <h3 className="text-[#D4A574] font-semibold mb-2">★ Featured Listing</h3>
              <p className="text-white/40 text-sm leading-relaxed">Get premium placement at the top of your category with photos, testimonials, booking links, and a verified badge. Contact us for pricing.</p>
            </div>
          </div>

          <div className="space-y-4 text-sm text-white/40">
            <div className="flex items-center gap-3">
              <span className="text-[#D4A574]">✉</span>
              <a href="mailto:warnerrobinsbeauty@gmail.com" className="hover:text-[#D4A574] transition-colors">warnerrobinsbeauty@gmail.com</a>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-[#D4A574]">◉</span>
              <span>Warner Robins, GA & Surrounds</span>
            </div>
          </div>
        </div>

        {/* Right — contact form */}
        <div>
          <h2 className="text-2xl font-bold mb-6">Send a Message</h2>
          <form action={`mailto:warnerrobinsbeauty@gmail.com`} method="get" encType="text/plain" className="space-y-4">
            <div>
              <label className="text-xs text-white/40 uppercase tracking-widest mb-1.5 block">Business Name</label>
              <input type="text" name="Business Name" placeholder="Your salon or spa name"
                className="w-full bg-white/[0.03] border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-white/20 focus:outline-none focus:border-[#D4A574]/40 transition-colors" />
            </div>
            <div>
              <label className="text-xs text-white/40 uppercase tracking-widest mb-1.5 block">Your Name</label>
              <input type="text" name="Name" placeholder="Your full name"
                className="w-full bg-white/[0.03] border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-white/20 focus:outline-none focus:border-[#D4A574]/40 transition-colors" />
            </div>
            <div>
              <label className="text-xs text-white/40 uppercase tracking-widest mb-1.5 block">Email</label>
              <input type="email" name="Email" placeholder="your@email.com"
                className="w-full bg-white/[0.03] border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-white/20 focus:outline-none focus:border-[#D4A574]/40 transition-colors" />
            </div>
            <div>
              <label className="text-xs text-white/40 uppercase tracking-widest mb-1.5 block">Message</label>
              <textarea name="Message" rows={4} placeholder="Tell us about your business and what you're looking for..."
                className="w-full bg-white/[0.03] border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-white/20 focus:outline-none focus:border-[#D4A574]/40 transition-colors resize-none" />
            </div>
            <button type="submit"
              className="w-full bg-[#D4A574] hover:bg-[#C4956A] text-black py-3.5 rounded-full text-sm font-semibold transition-colors">
              Send Message
            </button>
          </form>
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
            <Link href="/spas" className="hover:text-[#D4A574] transition-colors">Spas</Link><Link href="/contact" className="hover:text-[#D4A574] transition-colors">Contact</Link><Link href="/privacy" className="hover:text-[#D4A574] transition-colors">Privacy</Link>
          </nav>
          <p>© {new Date().getFullYear()} warnerrobinsbeauty.com</p>
        </div>
      </footer>
    </main>
  );
}