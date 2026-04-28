"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

const REVIEWS = [
  { text: "The best waxer ever!!! Sedra is very knowledgeable.", author: "Chelsea E." },
  { text: "Very first time going and it was a very relaxing atmosphere. Sedra made me feel so comfortable.", author: "Twilight T." },
  { text: "Service is amazing. She does a really good job & she is so sweet & professional. I will be back!", author: "Jasmine H." },
  { text: "Sedra was incredibly friendly and had a sweet personality. I felt very comfortable and relaxed.", author: "Regina R." },
  { text: "The best waxing place in Warner Robins.", author: "Phylisa H." },
];

export default function FeaturedListing() {
  const [current, setCurrent] = useState(0);
  const [fading, setFading] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setFading(true);
      setTimeout(() => {
        setCurrent((prev) => (prev + 1) % REVIEWS.length);
        setFading(false);
      }, 400);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="max-w-6xl mx-auto px-6 py-12">
      <div className="relative rounded-2xl border border-[#D4A574]/20 bg-gradient-to-br from-[#1a0f0a] to-[#111] overflow-hidden shadow-xl shadow-black/40">

        {/* Featured badge */}
        <div className="absolute top-4 right-4 z-10 flex items-center gap-1.5 bg-[#D4A574] text-black text-xs font-semibold tracking-widest uppercase px-3 py-1.5 rounded-full">
          <span>✦</span> Featured Listing
        </div>

        {/* Top section */}
        <div className="flex flex-col md:flex-row">

          {/* Photo */}
          <div className="md:w-72 h-56 md:h-auto shrink-0 relative overflow-hidden">
            <img
              src="/waxology.jpg"
              alt="Waxology Studio"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-transparent to-[#1a0f0a]/40" />
          </div>

          {/* Info */}
          <div className="flex-1 p-7 md:p-8">
            {/* Verified + rank */}
            <div className="flex items-center gap-2 mb-3 flex-wrap">
              <span className="flex items-center gap-1 text-xs bg-green-500/10 text-green-400 border border-green-500/20 px-2.5 py-1 rounded-full font-medium">
                ✓ Verified Listing
              </span>
              <span className="text-xs text-[#D4A574] font-medium tracking-wide uppercase">
                #1 Brazilian Wax · Warner Robins
              </span>
            </div>

            <h2 className="text-3xl font-bold text-white mb-1">
              Waxology Studio
            </h2>
            <p className="text-white/40 text-sm mb-3">
              154 S Houston Lake Rd #200, Warner Robins, GA 31088
            </p>

            {/* Stars + rating */}
            <div className="flex items-center gap-3 mb-4">
              <span className="flex gap-0.5 text-[#D4A574] text-lg">★★★★★</span>
              <span className="text-sm font-semibold text-white">4.7</span>
              <span className="text-sm text-white/40">· 113 Google reviews</span>
            </div>

            {/* Hours */}
            <div className="mb-5">
              <p className="text-xs font-semibold text-[#D4A574]/60 uppercase tracking-widest mb-1.5">Hours</p>
              <div className="grid grid-cols-2 gap-x-6 gap-y-0.5 text-xs text-white/40">
                <span>Mon: Closed</span>
                <span>Tue: 11:00 AM – 7:00 PM</span>
                <span>Wed: 11:00 AM – 7:00 PM</span>
                <span>Thu: 11:00 AM – 8:00 PM</span>
                <span>Fri: 11:00 AM – 8:00 PM</span>
                <span>Sat: 11:00 AM – 8:00 PM</span>
                <span>Sun: 12:00 – 6:00 PM</span>
              </div>
            </div>

            {/* CTA buttons */}
            <div className="flex flex-wrap gap-3">
              <a href="http://waxologybysedra.com" target="_blank" rel="noopener noreferrer"
                className="bg-[#D4A574] hover:bg-[#C4956A] text-black px-6 py-2.5 rounded-full text-sm font-semibold transition-colors">
                Visit Website →
              </a>
              <a href="http://waxologybysedra.com" target="_blank" rel="noopener noreferrer"
                className="bg-white/5 hover:bg-white/10 border border-white/10 text-white px-6 py-2.5 rounded-full text-sm font-medium transition-colors">
                Book Now
              </a>
              <Link href="/waxology-studio"
                className="border border-[#D4A574]/20 text-[#D4A574] hover:bg-[#D4A574]/5 px-6 py-2.5 rounded-full text-sm font-medium transition-colors">
                View Profile
              </Link>
            </div>
          </div>
        </div>

        {/* Testimonials */}
        <div className="border-t border-white/5 bg-white/[0.02] px-8 py-4">
          <div className="flex items-start gap-4">
            <span className="text-[#D4A574] text-2xl leading-none mt-0.5 shrink-0">"</span>
            <div className="flex-1 min-h-[48px] transition-opacity duration-400" style={{ opacity: fading ? 0 : 1 }}>
              <p className="text-sm text-white/70 font-medium leading-relaxed">{REVIEWS[current].text}</p>
              <p className="text-xs text-white/30 mt-1">
                — {REVIEWS[current].author} &nbsp;
                <span className="text-[#D4A574]">★★★★★</span>
              </p>
            </div>
            <div className="flex gap-1.5 items-center shrink-0 mt-1">
              {REVIEWS.map((_, i) => (
                <button key={i} onClick={() => setCurrent(i)}
                  className={`h-1.5 rounded-full transition-all ${i === current ? "bg-[#D4A574] w-3" : "bg-white/20 w-1.5"}`}
                />
              ))}
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}