import fs from "fs";
import path from "path";
import Link from "next/link";
import matter from "gray-matter";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Beauty Blog — Warner Robins Beauty Directory",
  description: "Tips, guides, and local insights for beauty services in Warner Robins, GA.",
};

function getPosts() {
  const postsDir = path.join(process.cwd(), "data", "posts");
  const files = fs.readdirSync(postsDir).filter((f) => f.endsWith(".md"));
  return files.map((filename) => {
    const raw = fs.readFileSync(path.join(postsDir, filename), "utf-8");
    const { data, content } = matter(raw);
    const slug = filename.replace(".md", "");
    const excerpt = content.replace(/[#*!\[\]()]/g, "").slice(0, 160).trim() + "...";
    return { slug, title: data.title || slug, date: data.date || "", excerpt };
  });
}

export default function BlogIndex() {
  const posts = getPosts();
  return (
    <main className="min-h-screen bg-[#0A0A0A] text-white">
      <header className="sticky top-0 z-50 bg-[#0A0A0A]/90 backdrop-blur-md border-b border-white/5">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <span className="text-[#D4A574] text-2xl">✦</span>
            <span className="text-xl font-semibold tracking-tight">Warner Robins Beauty</span>
          </Link>
          <nav className="hidden md:flex gap-6 text-sm text-white/50">
            <Link href="/hair-salons" className="hover:text-[#D4A574] transition-colors">Hair</Link>
            <Link href="/nail-salons" className="hover:text-[#D4A574] transition-colors">Nails</Link>
            <Link href="/waxing" className="hover:text-[#D4A574] transition-colors">Waxing</Link>
            <Link href="/spas" className="hover:text-[#D4A574] transition-colors">Spas</Link>
            <Link href="/blog" className="text-[#D4A574]">Blog</Link>
          </nav>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-6 py-16">
        <h1 className="text-4xl font-bold mb-2">Beauty Blog</h1>
        <p className="text-white/40 mb-12">Local guides and tips for Warner Robins, GA</p>
        <div className="grid gap-6">
          {posts.map((post) => (
            <Link key={post.slug} href={`/blog/${post.slug}`}
              className="block bg-white/[0.02] border border-white/5 rounded-2xl p-6 hover:border-[#D4A574]/30 transition-colors">
              <p className="text-xs text-[#D4A574]/60 uppercase tracking-widest mb-2">{post.date}</p>
              <h2 className="text-xl font-semibold mb-2">{post.title}</h2>
              <p className="text-white/40 text-sm">{post.excerpt}</p>
            </Link>
          ))}
        </div>
      </div>

      <footer className="border-t border-white/5 py-10 px-6 mt-12">
        <div className="max-w-6xl mx-auto text-center text-sm text-white/30">
          © {new Date().getFullYear()} warnerrobinsbeauty.com
        </div>
      </footer>
    </main>
  );
}