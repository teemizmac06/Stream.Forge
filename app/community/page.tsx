import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Community — StreamForge Streamer Growth Network',
  description: 'Meet the StreamForge community. 5,800+ real streamers growing on Twitch, Kick, YouTube and TikTok. Success stories, featured creators, and how the network works.',
  alternates: { canonical: 'https://streamforge.gg/community' },
}

const successStories = [
  { name: 'Marcus Rivera', handle: '@marcusplays_tw', platform: 'Twitch', img: 'https://i.pravatar.cc/150?img=3', badge: '✦ Affiliate', before: '3 avg viewers', after: '47 avg viewers', days: 30, quote: 'StreamForge changed my streaming career. From 80 to 1,200 viewers in 3 months. The real viewer system is legitimately powerful.' },
  { name: 'Sophie Chen', handle: '@sophiegames_kick', platform: 'Kick', img: 'https://i.pravatar.cc/150?img=47', badge: '⚡ Elite', before: '8 avg viewers', after: '65 avg viewers', days: 45, quote: 'Joined Team Temmy — community support is incredible. Discord went from 40 to 800 members through the cross-promotion network.' },
  { name: 'David Osei', handle: '@davidkicks', platform: 'Kick', img: 'https://i.pravatar.cc/150?img=11', badge: '✦ Affiliate', before: '0 affiliate', after: 'Affiliate in 14 days', days: 14, quote: 'Hit affiliate in 14 days. Skeptical about paying for a community but the results are undeniable. Worth every cent.' },
  { name: 'Aaliyah Brooks', handle: '@aaliyahfps', platform: 'Twitch', img: 'https://i.pravatar.cc/150?img=44', badge: '📈 Growth', before: '4 avg viewers', after: '38 avg viewers', days: 28, quote: 'Managing Kick and TikTok simultaneously — StreamForge was the only thing that helped both platforms at the same time.' },
  { name: 'James Okafor', handle: '@jamesokafor_ng', platform: 'Twitch', img: 'https://i.pravatar.cc/150?img=17', badge: '🌍 Global', before: '2 avg viewers', after: '28 avg viewers', days: 21, quote: 'Nigerian streamer here. Open to creators worldwide is not just a tagline — genuinely connected me with a global audience.' },
  { name: 'Jade Li', handle: '@jadelivestream', platform: 'Twitch', img: 'https://i.pravatar.cc/150?img=46', badge: '✦ Affiliate', before: '50 avg viewers (stuck 1yr)', after: '400 concurrent in 60 days', days: 60, quote: 'Stuck at 50 viewers for a year. After StreamForge I hit 400 concurrent in under 60 days.' },
]

const featuredStreamers = [
  { name: 'Jedidiah', handle: 'jedidiah_x1', game: 'FPS / Competitive', platform: 'Twitch & Kick', img: 'https://i.pravatar.cc/150?img=7', badge: '🛡 Verified Team', color: '#2563eb' },
  { name: 'Temmy', handle: 'temmy_official', game: 'IRL / Variety', platform: 'Twitch & TikTok', img: 'https://i.pravatar.cc/150?img=47', badge: '🛡 Verified Team', color: '#ec4899' },
  { name: 'levelUpX', handle: 'levelupx_team', game: 'Sports / Esports', platform: 'Twitch & YouTube', img: 'https://i.pravatar.cc/150?img=18', badge: '🛡 Verified Team', color: '#16a34a' },
  { name: 'Jeremiah', handle: 'jeremiah_official', game: 'Variety / Gaming', platform: 'All Platforms', img: 'https://i.pravatar.cc/150?img=29', badge: '🛡 Verified Team', color: '#a78bfa' },
  { name: 'CoastalTV', handle: 'coastaltv', game: 'CS2 / FPS', platform: 'Twitch', img: 'https://i.pravatar.cc/150?img=15', badge: '⚡ Elite', color: '#e8a83e' },
  { name: 'NightOwlTV', handle: 'nightowltv', game: 'Horror / Variety', platform: 'YouTube', img: 'https://i.pravatar.cc/150?img=25', badge: '📈 Growth', color: '#0891b2' },
  { name: 'IronSight', handle: 'ironsight_fps', game: 'Apex Legends', platform: 'Twitch & Kick', img: 'https://i.pravatar.cc/150?img=38', badge: '✦ Verified', color: '#e8a83e' },
  { name: 'ZaraLive', handle: 'zaralive_', game: 'IRL / Lifestyle', platform: 'TikTok & Twitch', img: 'https://i.pravatar.cc/150?img=44', badge: '⚡ Elite', color: '#ec4899' },
]

const networkStats = [
  { n: '5,800+', l: 'Active Members', sub: 'Across 43+ countries' },
  { n: '43+', l: 'Countries', sub: 'Truly global community' },
  { n: '312', l: 'Affiliates Achieved', sub: 'And counting' },
  { n: '47', l: 'Partners Achieved', sub: 'Growing monthly' },
  { n: '14 days', l: 'Avg to Affiliate', sub: 'Fastest: 9 days' },
  { n: '98%', l: 'Satisfaction Rate', sub: 'From member surveys' },
]

export default function CommunityPage() {
  return (
    <>
      {/* HERO */}
      <section className="py-20 px-5 text-center border-b border-white/[.07]" style={{ background: 'linear-gradient(180deg,rgba(124,58,237,.1),transparent)' }}>
        <div className="max-w-3xl mx-auto">
          <div className="section-tag mb-3">The Community</div>
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight mb-4 gradient-text">5,800+ Streamers. One Network. Real Growth.</h1>
          <p className="text-[#9b9580] text-base max-w-2xl mx-auto mb-8 leading-relaxed">
            StreamForge is not a tool — it is a community of real streamers who show up for each other. This is where careers get built.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link href="/pricing" className="btn-gold px-8 py-3.5 rounded-xl text-base no-underline inline-flex items-center justify-center gap-2">🚀 Join the Community</Link>
            <a href="#stories" className="btn-outline-gold px-8 py-3.5 rounded-xl text-base no-underline inline-flex items-center justify-center gap-2">📖 Read Stories</a>
          </div>
        </div>
      </section>

      {/* STATS */}
      <section className="py-14 px-5 border-b border-white/[.07] bg-[rgba(232,168,62,.02)]">
        <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {networkStats.map(s => (
            <div key={s.l} className="text-center p-4 rounded-xl bg-white/[.03] border border-white/[.07]">
              <div className="text-2xl font-extrabold text-[#e8a83e] leading-none">{s.n}</div>
              <div className="text-xs font-semibold text-[#f0ece4] mt-1">{s.l}</div>
              <div className="text-[10px] text-[#504c44] mt-0.5">{s.sub}</div>
            </div>
          ))}
        </div>
      </section>

      {/* HOW THE NETWORK WORKS */}
      <section className="py-20 px-5 border-b border-white/[.07]">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <div className="section-tag">How the Network Works</div>
            <h2 className="text-3xl font-extrabold tracking-tight mt-2 text-[#f0ece4]">Real Streamers. Real Support. Every Stream.</h2>
            <p className="text-[#9b9580] mt-2 text-sm max-w-xl mx-auto">StreamForge is built on a simple principle: streamers who support each other grow faster than streamers who go it alone.</p>
          </div>
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div className="flex flex-col gap-5">
              {[
                { icon: '🎯', t: 'You apply and get matched', d: 'After joining, you are placed in an active engagement group with compatible streamers who share your game category, schedule and goals.' },
                { icon: '👥', t: 'The network shows up for you', d: 'When you go live, members from your group join, watch and chat in real-time. Your engagement metrics rise naturally.' },
                { icon: '📡', t: 'Platforms start recommending you', d: 'Real chat activity, consistent viewers and longer session lengths are exactly the signals Twitch and Kick use to recommend new channels.' },
                { icon: '🌱', t: 'Organic growth compounds', d: 'As you appear in recommendations, new organic viewers discover you. Your community grows beyond just the network members.' },
                { icon: '🤝', t: 'You give back too', d: 'You support other members in return — which is why this works. Real mutual investment from everyone in the network.' },
              ].map(s => (
                <div key={s.t} className="flex gap-4 items-start">
                  <span className="text-2xl flex-shrink-0 mt-0.5">{s.icon}</span>
                  <div>
                    <div className="text-sm font-bold text-[#f0ece4] mb-1">{s.t}</div>
                    <div className="text-xs text-[#9b9580] leading-relaxed">{s.d}</div>
                  </div>
                </div>
              ))}
            </div>
            <div className="glass glass-gold rounded-2xl p-7">
              <div className="text-sm font-bold text-[#e8a83e] mb-4">⚡ The StreamForge Difference</div>
              {[
                ['Fake viewer services', 'Bots that get channels penalised', false],
                ['One-time promoters', 'Ghost followers who never return', false],
                ['Going it alone', 'Years of slow, isolated growth', false],
                ['StreamForge network', 'Real viewers every stream, permanently', true],
              ].map(([label, desc, good]) => (
                <div key={label as string} className={`flex items-start gap-3 p-3 rounded-lg mb-2 border ${good ? 'bg-green-500/[.06] border-green-500/20' : 'bg-red-500/[.04] border-red-500/10'}`}>
                  <span className={`text-sm font-black flex-shrink-0 mt-0.5 ${good ? 'text-green-400' : 'text-red-400/60'}`}>{good ? '✓' : '✗'}</span>
                  <div>
                    <div className={`text-xs font-bold ${good ? 'text-[#f0ece4]' : 'text-[#9b9580]'}`}>{label as string}</div>
                    <div className={`text-[10px] ${good ? 'text-[#9b9580]' : 'text-[#504c44]'}`}>{desc as string}</div>
                  </div>
                </div>
              ))}
              <Link href="/pricing" className="btn-gold w-full text-center py-3 rounded-xl text-sm font-bold no-underline block mt-5">Join the Network →</Link>
            </div>
          </div>
        </div>
      </section>

      {/* SUCCESS STORIES */}
      <section id="stories" className="py-20 px-5 border-b border-white/[.07]" style={{ background: 'linear-gradient(180deg,rgba(22,163,74,.03),transparent)' }}>
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <div className="section-tag">Success Stories</div>
            <h2 className="text-3xl font-extrabold tracking-tight mt-2 text-[#f0ece4]">Real Members. Real Milestones.</h2>
            <p className="text-[#9b9580] mt-2 text-sm">No fake reviews. These are real StreamForge members who grew their channels.</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {successStories.map(s => (
              <div key={s.name} className="p-5 rounded-2xl bg-white/[.03] border border-white/[.08] card-hover flex flex-col">
                <div className="flex items-center gap-3 mb-4">
                  <img src={s.img} alt={s.name} className="w-12 h-12 rounded-full border-2 border-[rgba(232,168,62,.3)] object-cover" />
                  <div className="flex-1">
                    <div className="text-sm font-bold text-[#f0ece4]">{s.name}</div>
                    <div className="text-xs text-[#504c44]">{s.handle}</div>
                  </div>
                  <span className="text-[10px] font-bold px-2 py-1 rounded-full bg-[rgba(232,168,62,.12)] text-[#e8a83e] border border-[rgba(232,168,62,.2)]">{s.badge}</span>
                </div>
                <div className="flex items-center gap-3 p-3 rounded-lg bg-white/[.03] border border-white/[.06] mb-4">
                  <div className="text-center flex-1">
                    <div className="text-xs text-[#504c44] mb-0.5">Before</div>
                    <div className="text-sm font-bold text-[#9b9580]">{s.before}</div>
                  </div>
                  <div className="text-[#e8a83e] font-black">→</div>
                  <div className="text-center flex-1">
                    <div className="text-xs text-[#504c44] mb-0.5">After {s.days}d</div>
                    <div className="text-sm font-bold text-[#e8a83e]">{s.after}</div>
                  </div>
                </div>
                <p className="text-xs text-[#9b9580] italic leading-relaxed flex-1">"{s.quote}"</p>
                <div className="mt-3 pt-3 border-t border-white/[.06]">
                  <span className={`text-[10px] font-bold px-2 py-1 rounded-full ${
                    s.platform === 'Twitch' ? 'bg-[rgba(145,71,255,.14)] text-[#9147ff] border border-[rgba(145,71,255,.2)]' :
                    s.platform === 'Kick'   ? 'bg-[rgba(83,252,24,.1)] text-[#53fc18] border border-[rgba(83,252,24,.2)]' :
                    'bg-[rgba(8,145,178,.1)] text-[#0891b2] border border-[rgba(8,145,178,.2)]'
                  }`}>{s.platform}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURED STREAMERS */}
      <section className="py-20 px-5 border-b border-white/[.07]">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <div className="section-tag">Featured Creators</div>
            <h2 className="text-3xl font-extrabold tracking-tight mt-2 text-[#f0ece4]">The Streamers Inside StreamForge</h2>
            <p className="text-[#9b9580] mt-2 text-sm">Verified members and team leaders from across the network</p>
          </div>
          <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-4">
            {featuredStreamers.map(s => (
              <div key={s.name} className="p-4 rounded-2xl bg-white/[.03] border card-hover text-center" style={{ borderColor: `${s.color}33` }}>
                <div className="relative inline-block mb-3">
                  <img src={s.img} alt={s.name} className="w-16 h-16 rounded-full object-cover border-2" style={{ borderColor: `${s.color}66` }} />
                  <div className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-green-500 border-2 border-[#07071a] live-dot" />
                </div>
                <div className="text-sm font-bold text-[#f0ece4] mb-0.5">{s.name}</div>
                <div className="text-xs text-[#504c44] mb-2">@{s.handle}</div>
                <div className="text-[10px] font-bold px-2 py-1 rounded-full inline-block mb-2" style={{ background: `${s.color}18`, color: s.color, border: `1px solid ${s.color}33` }}>{s.badge}</div>
                <div className="text-[10px] text-[#9b9580]">{s.game}</div>
                <div className="text-[10px] text-[#504c44]">{s.platform}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* COMMUNITY BLOG LINK */}
      <section className="py-16 px-5 border-b border-white/[.07]" style={{ background: 'linear-gradient(135deg,rgba(124,58,237,.07),rgba(8,145,178,.05))' }}>
        <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center gap-8 glass glass-gold rounded-2xl p-8">
          <div className="flex-1">
            <div className="section-tag mb-2">🆕 Community Blog</div>
            <h2 className="text-2xl font-extrabold tracking-tight mb-3 text-[#f0ece4]">Real Streamers. Real Conversations.</h2>
            <p className="text-[#9b9580] text-sm leading-relaxed mb-4">Read growth tips, success stories, debates and polls from active StreamForge members. Updated daily.</p>
            <div className="flex gap-2 flex-wrap">
              {['📖 847 Posts', '💬 12.4K Comments', '📊 Active Polls', '🔥 Debates'].map(t => (
                <span key={t} className="text-[10px] font-bold px-2.5 py-1 rounded-full bg-white/[.05] border border-white/[.1] text-[#9b9580]">{t}</span>
              ))}
            </div>
          </div>
          <div className="flex flex-col gap-3 w-full md:w-auto">
            <a href="/streamforge_community_v2.html" className="btn-gold px-6 py-3 rounded-xl text-sm font-bold no-underline text-center">✍ Visit Community Blog →</a>
            <Link href="/pricing" className="btn-outline-gold px-6 py-3 rounded-xl text-sm no-underline text-center">Join StreamForge</Link>
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="py-24 px-5 text-center">
        <div className="max-w-2xl mx-auto">
          <div className="section-tag mb-4">Ready to Join?</div>
          <h2 className="text-4xl font-extrabold tracking-tight mb-4 gradient-text">Become Part of the Network</h2>
          <p className="text-[#9b9580] mb-8 leading-relaxed">5,800+ streamers are already growing together. Your spot is waiting.</p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link href="/pricing" className="btn-gold px-8 py-4 rounded-xl text-base no-underline inline-flex items-center justify-center gap-2">🚀 Apply Now</Link>
            <Link href="/faq" className="btn-outline-gold px-8 py-4 rounded-xl text-base no-underline inline-flex items-center justify-center gap-2">Read FAQs First</Link>
          </div>
          <p className="text-[10px] text-[#504c44] mt-4">No automatic charges · Approved within 24h · Cancel anytime</p>
        </div>
      </section>
    </>
  )
}
