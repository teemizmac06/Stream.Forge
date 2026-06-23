import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Blog — Twitch Growth Tips, Streaming Guides & StreamForge News',
  description: 'Free streamer guides: how to grow on Twitch, get more viewers, understand the Twitch algorithm, and grow on Kick and YouTube. Written by StreamForge.',
  alternates: { canonical: 'https://streamforge.gg/blog' },
}

const posts = [
  { slug: 'how-to-grow-on-twitch', cat: 'Twitch', catColor: '#9147ff', catBg: 'rgba(145,71,255,.14)', title: 'How to Grow on Twitch in 2026 (Complete Guide)', excerpt: "Small streamers face the same problem: streaming to zero viewers kills motivation. Here's the exact system serious streamers use to grow past affiliate and toward partner — without bots or fake promotion.", read: '8 min', date: 'May 4, 2026', emoji: '📡' },
  { slug: 'how-to-get-more-viewers-on-twitch', cat: 'Twitch', catColor: '#9147ff', catBg: 'rgba(145,71,255,.14)', title: 'How to Get More Viewers on Twitch — 12 Proven Methods', excerpt: 'Viewer count is the metric every Twitch streamer obsesses over. Here are 12 proven methods to increase your concurrent viewers — from algorithm optimisation to community building.', read: '7 min', date: 'May 3, 2026', emoji: '👁' },
  { slug: 'twitch-algorithm-explained', cat: 'Twitch', catColor: '#9147ff', catBg: 'rgba(145,71,255,.14)', title: 'Twitch Algorithm Explained — What Actually Moves the Needle', excerpt: "3 years of testing and analysis reveals what Twitch's algorithm actually rewards. Chat activity rate, session length, category ranking — here's what matters and what doesn't.", read: '9 min', date: 'May 2, 2026', emoji: '🔬' },
  { slug: 'why-your-stream-is-not-growing', cat: 'Growth', catColor: '#e8a83e', catBg: 'rgba(232,168,62,.12)', title: "Why Your Twitch Stream Is Not Growing (Real Reasons)", excerpt: "You're consistent. Your audio is clean. Your personality is good. So why aren't you growing? The honest answer most streamers don't want to hear — and what to do about it.", read: '6 min', date: 'May 1, 2026', emoji: '🔍' },
  { slug: 'is-streamforge-real', cat: 'StreamForge', catColor: '#22c55e', catBg: 'rgba(22,163,74,.1)', title: 'Is StreamForge Real? Honest Review From a Sceptical Streamer', excerpt: "I was burned by two fake viewer services before StreamForge. Here's my completely honest 6-month review — what works, what doesn't, and whether it's worth the cost.", read: '7 min', date: 'Apr 30, 2026', emoji: '⚖️' },
  { slug: 'what-is-streamforge', cat: 'StreamForge', catColor: '#22c55e', catBg: 'rgba(22,163,74,.1)', title: 'What is StreamForge? The Complete Explainer', excerpt: "StreamForge is described as an 'active viewer network' — but what does that actually mean? How is it different from buying viewers? Who is it for? Full explainer here.", read: '5 min', date: 'Apr 28, 2026', emoji: '💡' },
]

export default function BlogPage() {
  return (
    <>
      <section className="py-20 px-5 text-center border-b border-white/[.07]" style={{ background: 'linear-gradient(180deg,rgba(124,58,237,.08),transparent)' }}>
        <div className="max-w-2xl mx-auto">
          <div className="section-tag mb-3">Creator Resources</div>
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight mb-4 gradient-text">Streamer Growth Blog</h1>
          <p className="text-[#9b9580] text-base leading-relaxed">Free guides to help you grow on Twitch, Kick, YouTube and TikTok. Practical, honest, no fluff.</p>
        </div>
      </section>

      <section className="py-16 px-5">
        <div className="max-w-5xl mx-auto">
          {/* Featured */}
          <div className="mb-12">
            <Link href={`/blog/${posts[0].slug}`} className="no-underline group block p-8 rounded-2xl bg-white/[.03] border border-white/[.08] card-hover">
              <span className="text-xs font-bold px-2.5 py-1 rounded-full mb-4 inline-block" style={{ background: posts[0].catBg, color: posts[0].catColor }}>{posts[0].cat}</span>
              <h2 className="text-2xl font-extrabold tracking-tight text-[#f0ece4] mb-3 group-hover:text-[#e8a83e] transition-colors leading-snug">{posts[0].emoji} {posts[0].title}</h2>
              <p className="text-[#9b9580] text-sm leading-relaxed mb-4">{posts[0].excerpt}</p>
              <div className="flex items-center gap-3 text-xs text-[#504c44]">
                <span>{posts[0].read} read</span>
                <span>·</span>
                <span>{posts[0].date}</span>
                <span className="ml-auto text-[#e8a83e] font-semibold group-hover:underline">Read article →</span>
              </div>
            </Link>
          </div>

          {/* Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {posts.slice(1).map(p => (
              <Link key={p.slug} href={`/blog/${p.slug}`} className="no-underline group block p-5 rounded-2xl bg-white/[.03] border border-white/[.08] card-hover flex flex-col">
                <span className="text-[10px] font-bold px-2.5 py-1 rounded-full mb-3 inline-block w-fit" style={{ background: p.catBg, color: p.catColor }}>{p.cat}</span>
                <h3 className="text-sm font-bold text-[#f0ece4] mb-2 group-hover:text-[#e8a83e] transition-colors leading-snug flex-1">{p.emoji} {p.title}</h3>
                <p className="text-xs text-[#9b9580] leading-relaxed mb-4 line-clamp-3">{p.excerpt}</p>
                <div className="flex items-center justify-between text-[10px] text-[#504c44] mt-auto">
                  <span>{p.read} read · {p.date}</span>
                  <span className="text-[#e8a83e] font-semibold">Read →</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 px-5 border-t border-white/[.07] text-center">
        <div className="max-w-xl mx-auto">
          <h2 className="text-2xl font-extrabold tracking-tight mb-3 text-[#f0ece4]">Ready to apply what you learn?</h2>
          <p className="text-[#9b9580] text-sm mb-6">Join StreamForge and put these strategies into action with 5,800+ real streamers behind you.</p>
          <Link href="/pricing" className="btn-gold px-8 py-3.5 rounded-xl text-base no-underline inline-flex items-center gap-2">🚀 Join StreamForge</Link>
        </div>
      </section>
    </>
  )
}
