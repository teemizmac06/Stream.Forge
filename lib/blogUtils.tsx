import Link from 'next/link'
import React from 'react'

export function BlogLayout({ children, meta }: { children: React.ReactNode, meta: { title: string, excerpt: string, cat: string, catColor: string, catBg: string, read: string, date: string, slug: string } }) {
  const relatedPosts = [
    { slug: 'how-to-grow-on-twitch', title: 'How to Grow on Twitch in 2026' },
    { slug: 'twitch-algorithm-explained', title: 'Twitch Algorithm Explained' },
    { slug: 'why-your-stream-is-not-growing', title: "Why Your Stream Is Not Growing" },
    { slug: 'is-streamforge-real', title: 'Is StreamForge Real?' },
    { slug: 'what-is-streamforge', title: 'What is StreamForge?' },
    { slug: 'how-to-get-more-viewers-on-twitch', title: 'How to Get More Viewers on Twitch' },
  ].filter(p => p.slug !== meta.slug).slice(0, 3)

  return (
    <div className="max-w-6xl mx-auto px-5 py-16 grid lg:grid-cols-[1fr_280px] gap-12">
      {/* ARTICLE */}
      <article>
        {/* HEADER */}
        <div className="mb-8">
          <Link href="/blog" className="text-xs text-[#9b9580] hover:text-[#e8a83e] transition-colors no-underline mb-4 inline-flex items-center gap-1">← All Articles</Link>
          <span className="block text-[10px] font-bold px-2.5 py-1 rounded-full mb-4 w-fit" style={{ background: meta.catBg, color: meta.catColor }}>{meta.cat}</span>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight leading-[1.12] mb-4 text-[#f0ece4]">{meta.title}</h1>
          <p className="text-[#9b9580] text-base leading-relaxed mb-4">{meta.excerpt}</p>
          <div className="flex items-center gap-3 text-xs text-[#504c44] pb-6 border-b border-white/[.07]">
            <span>StreamForge Team</span><span>·</span><span>{meta.read} read</span><span>·</span><span>{meta.date}</span>
          </div>
        </div>

        {/* CONTENT */}
        <div className="prose prose-invert prose-sm max-w-none
          prose-headings:font-extrabold prose-headings:tracking-tight prose-headings:text-[#f0ece4]
          prose-h2:text-2xl prose-h2:mt-10 prose-h2:mb-4
          prose-h3:text-lg prose-h3:mt-7 prose-h3:mb-3
          prose-p:text-[#9b9580] prose-p:leading-relaxed prose-p:mb-4
          prose-li:text-[#9b9580] prose-li:leading-relaxed
          prose-strong:text-[#f0ece4]
          prose-a:text-[#e8a83e] prose-a:no-underline hover:prose-a:underline
          prose-blockquote:border-l-[#e8a83e] prose-blockquote:text-[#9b9580] prose-blockquote:italic">
          {children}
        </div>

        {/* IN-ARTICLE CTA */}
        <div className="my-10 p-7 rounded-2xl border border-[rgba(232,168,62,.25)] text-center" style={{ background: 'linear-gradient(135deg,rgba(232,168,62,.08),rgba(124,58,237,.06))' }}>
          <div className="text-2xl mb-2">🚀</div>
          <h3 className="text-lg font-extrabold text-[#f0ece4] mb-2">Ready to Apply These Strategies?</h3>
          <p className="text-sm text-[#9b9580] mb-4">Join StreamForge and grow with 5,800+ real streamers behind you.</p>
          <Link href="/pricing" className="btn-gold px-6 py-3 rounded-xl text-sm font-bold no-underline inline-block">Join StreamForge →</Link>
        </div>
      </article>

      {/* SIDEBAR */}
      <aside className="flex flex-col gap-6 lg:sticky lg:top-24 lg:self-start">
        <div className="p-5 rounded-2xl glass glass-gold">
          <div className="text-sm font-bold text-[#e8a83e] mb-2">Ready to grow?</div>
          <p className="text-xs text-[#9b9580] mb-4 leading-relaxed">Join StreamForge — the active viewer network helping streamers grow organically on Twitch, Kick, YouTube and TikTok.</p>
          <Link href="/pricing" className="btn-gold w-full text-center py-2.5 rounded-lg text-xs font-bold no-underline block mb-2">🚀 Start Growing</Link>
          <Link href="/faq" className="btn-outline-gold w-full text-center py-2 rounded-lg text-xs no-underline block">Read FAQs first</Link>
        </div>

        <div className="p-5 rounded-2xl bg-white/[.03] border border-white/[.08]">
          <div className="text-xs font-bold text-[#9b9580] uppercase tracking-wider mb-3">More Articles</div>
          <div className="flex flex-col gap-2">
            {relatedPosts.map(p => (
              <Link key={p.slug} href={`/blog/${p.slug}`} className="text-xs text-[#9b9580] hover:text-[#e8a83e] transition-colors no-underline py-1.5 border-b border-white/[.05] last:border-none">
                → {p.title}
              </Link>
            ))}
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-white/[.03] border border-white/[.08]">
          <div className="text-xs font-bold text-[#9b9580] uppercase tracking-wider mb-3">Quick Stats</div>
          {[['5,800+', 'Active Members'], ['14 days', 'Avg to Affiliate'], ['98%', 'Satisfaction'], ['43+', 'Countries']].map(([n, l]) => (
            <div key={l} className="flex justify-between text-xs py-1.5 border-b border-white/[.05] last:border-none">
              <span className="text-[#9b9580]">{l}</span>
              <span className="font-bold text-[#e8a83e]">{n}</span>
            </div>
          ))}
        </div>
      </aside>
    </div>
  )
}

export function TipBox({ children }: { children: React.ReactNode }) {
  return <div className="my-4 p-4 rounded-xl border-l-4 border-green-500 bg-green-500/[.06] text-sm text-[#9b9580]">{children}</div>
}
export function WarnBox({ children }: { children: React.ReactNode }) {
  return <div className="my-4 p-4 rounded-xl border-l-4 border-[#ea580c] bg-[#ea580c]/[.06] text-sm text-[#9b9580]">{children}</div>
}
export function HighlightBox({ children }: { children: React.ReactNode }) {
  return <div className="my-6 p-5 rounded-xl border border-[rgba(232,168,62,.25)] bg-[rgba(232,168,62,.05)] text-sm text-[#f0ece4] italic">{children}</div>
}
