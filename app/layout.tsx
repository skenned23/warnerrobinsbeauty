import type { Metadata } from "next";
import { Playfair_Display, DM_Sans } from "next/font/google";
import "./globals.css";
import { Analytics } from "@vercel/analytics/react";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Warner Robins Beauty Directory — Salons, Spas & Waxing Near You",
  description:
    "Find the best salons, spas, nail studios, and waxing specialists in Warner Robins, GA. Browse 140+ verified local beauty businesses with ratings and reviews.",
  keywords: [
    "beauty salon warner robins",
    "waxing warner robins ga",
    "nail salon warner robins",
    "spa warner robins",
    "brazilian wax warner robins",
    "hair salon warner robins",
  ],
  openGraph: {
    title: "Warner Robins Beauty Directory",
    description:
      "Browse 140+ verified salons, spas, and studios in Warner Robins, GA.",
    url: "https://warnerrobinsbeauty.com",
    siteName: "Warner Robins Beauty",
    type: "website",
  },
};

const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "name": "Warner Robins Beauty Directory",
  "description": "Find the best salons, spas, nail studios, and waxing specialists in Warner Robins, GA.",
  "url": "https://warnerrobinsbeauty.com",
  "address": {
    "@type": "PostalAddress",
    "addressLocality": "Warner Robins",
    "addressRegion": "GA",
    "addressCountry": "US"
  },
  "areaServed": {
    "@type": "City",
    "name": "Warner Robins"
  }
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${playfair.variable} ${dmSans.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
        />
      </head>
      <body className="font-sans antialiased">
        {children}
        <Analytics />
      </body>
    </html>
  );
}