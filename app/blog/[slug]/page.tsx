import fs from "fs";
import path from "path";
import Link from "next/link";
import matter from "gray-matter";
import ReactMarkdown from "react-markdown";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

function getPost(slug: string) {
  const filePath = path.join(process.cwd(), "data", "posts", `${slug}.md`);
  if (!fs.existsSync(filePath)) return null;
  const raw = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(raw);
  return { title: data.title || slug, date: data.date || "", content };
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return { title: "Not Found" };
  return {
    title: `${post.title} — Warner Robins Beauty`,
    description: `${post.title} — local beauty guide for Warner Robins, GA.`,
  };
}

export async function generateStaticParams() {
  const postsDir = path.join(process.cwd(), "data", "posts");
  const files = fs.readdirSync(postsDir).filter((f) => f.endsWith(".md"));
  return files.map((f) => ({ slug: f.replace(".md", "") }));
}

export default async function BlogPost({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

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
            <Link href="/blog" className="hover:text-[#D4A574] transition-colors">Blog</Link>
          </nav>
        </div>
      </header>

      <div className="max-w-3xl mx-auto px-6 py-16">
        <Link href="/blog" className="text-sm text-[#D4A574]/60 hover:text-[#D4A574] transition-colors mb-8 block">← Back to Blog</Link>
        <p className="text-xs text-[#D4A574]/60 uppercase tracking-widest mb-4">{post.date}</p>
        <h1 className="text-4xl font-bold mb-12">{post.title}</h1>
        <div className="prose prose-invert prose-headings:text-white prose-p:text-white/70 prose-a:text-[#D4A574] prose-strong:text-white prose-li:text-white/70 max-w-none">
          <ReactMarkdown>{post.content}</ReactMarkdown>
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