"use client";

import Link from "next/link";
import { useState } from "react";
import { usePathname } from "next/navigation";

const mainLinks = [
  { href: "/waxing", label: "Waxing" },
  { href: "/nail-salons", label: "Nails" },
  { href: "/hair-salons", label: "Hair" },
  { href: "/spas", label: "Spas" },
  { href: "/tanning-salons", label: "Tanning" },
];

const moreLinks = [
  { href: "/hair-removal", label: "Hair Removal" },
  { href: "/brazilian-wax", label: "Brazilian Wax" },
  { href: "/lash-extensions", label: "Lash Extensions" },
  { href: "/barber-shops", label: "Barber Shops" },
  { href: "/medical-spas", label: "Medical Spas" },
  { href: "/tattoo-shops", label: "Tattoos" },
  { href: "/hair-extensions", label: "Hair Extensions" },
  { href: "/massage-therapy", label: "Massage Therapy" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
  { href: "/privacy", label: "Privacy" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 bg-[#0A0A0A]/90 backdrop-blur-md border-b border-white/5">
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <span className="text-[#D4A574] text-2xl">✦</span>
          <span className="text-xl font-semibold tracking-tight">Warner Robins Beauty</span>
        </Link>
        <nav className="hidden md:flex items-center gap-6 text-sm text-white/50">
          {mainLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={pathname === link.href ? "text-[#D4A574] font-medium" : "hover:text-[#D4A574] transition-colors"}
            >
              {link.label}
            </Link>
          ))}

          {/* More dropdown */}
          <div className="relative">
            <button
              onClick={() => setOpen(!open)}
              className="flex items-center gap-1 hover:text-[#D4A574] transition-colors"
            >
              More
              <span className={`text-xs transition-transform ${open ? "rotate-180" : ""}`}>▾</span>
            </button>
            {open && (
              <div className="absolute right-0 top-8 w-48 bg-[#0A0A0A] border border-white/10 rounded-xl shadow-xl py-2 z-50">
                {moreLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className={`block px-4 py-2 text-sm hover:bg-white/5 hover:text-[#D4A574] transition-colors ${pathname === link.href ? "text-[#D4A574]" : "text-white/50"}`}
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            )}
          </div>
        </nav>
      </div>
    </header>
  );
}