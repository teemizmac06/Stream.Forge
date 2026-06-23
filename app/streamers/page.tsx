import type { Metadata } from 'next'
import Link from 'next/link'
import { STREAMERS } from '@/lib/streamersData'

export const metadata: Metadata = {
  title: 'Streamer Success Stories — StreamForge',
  description: 'Real StreamForge members sharing their growth results. From 2 viewers to Twitch Partner. Real stats, real stories, real proof.',
  alternates: { canonical: 'https://streamforge.gg/streamers' },
}

const PLAT_COLORS: Record<string,string> = {
  Twitch:'#9147ff', Kick:'#53fc18', YouTube:'#ff4444',
  TikTok:'#ff0050', Twitter:'#1da1f2',
}
const PLAN_COLORS: Record<string,string> = {
  Starter:'rgba(8,145,178,.8)', Standard:'rgba(232,168,62,.9)', Premium:'rgba(124,58,237,.9)'
}

export default function StreamersPage() {
  return (
    <>
      {/* HERO */}
      <section className="py-20 px-5 text-center border-b" style={{ background:'linear-gradient(180deg,rgba(124,58,237,.1),transparent)', borderColor:'rgba(255,255,255,.07)' }}>
        <div className="max-w-2xl mx-auto">
          <div className="section-tag mb-3">Proof It Works</div>
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight mb-4 grad-txt">Real Members. Real Results.</h1>
          <p className="text-base leading-relaxed" style={{ color:'var(--txt2)' }}>Every profile below is a real StreamForge member. Click any card to see their full dashboard, story, and stats.</p>
        </div>
      </section>

      {/* GRID */}
      <section className="py-16 px-5">
        <div className="max-w-6xl mx-auto grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {STREAMERS.map(s => {
            const growth = Math.round(((s.stats.avgViewers.after - s.stats.avgViewers.before) / s.stats.avgViewers.before) * 100)
            return (
              <Link key={s.slug} href={`/streamers/${s.slug}`}
                className="iphone-card block no-underline p-5 rounded-2xl group">
                <div className="flex items-center gap-3 mb-4">
                  <div className="relative flex-shrink-0">
                    <img src={s.avatar} alt={s.name} className="w-12 h-12 rounded-xl object-cover border-2" style={{ borderColor:'rgba(255,255,255,.15)' }}/>
                    {s.verified && <div className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full flex items-center justify-center text-[8px] text-white" style={{ background:'linear-gradient(135deg,#7c3aed,#0891b2)' }}>✓</div>}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-bold truncate" style={{ color:'var(--txt)' }}>{s.name}</div>
                    <div className="text-xs truncate" style={{ color:'var(--txt3)' }}>@{s.handle} · {s.location}</div>
                  </div>
                  <span className="text-[10px] font-bold px-2 py-1 rounded-full text-white flex-shrink-0" style={{ background: PLAN_COLORS[s.plan] }}>{s.plan}</span>
                </div>

                {/* Before → After */}
                <div className="flex items-center gap-3 p-3 rounded-xl mb-3" style={{ background:'rgba(255,255,255,.04)', border:'1px solid rgba(255,255,255,.06)' }}>
                  <div className="text-center flex-1">
                    <div className="text-xs mb-0.5" style={{ color:'var(--txt3)' }}>Before</div>
                    <div className="text-xl font-extrabold" style={{ color:'var(--txt2)' }}>{s.stats.avgViewers.before}</div>
                    <div className="text-[10px]" style={{ color:'var(--txt3)' }}>avg viewers</div>
                  </div>
                  <div className="text-center">
                    <div className="text-sm font-extrabold" style={{ color:'#22c55e' }}>+{growth}%</div>
                    <div className="text-lg">→</div>
                    <div className="text-[10px]" style={{ color:'var(--txt3)' }}>{s.joinedDays}d</div>
                  </div>
                  <div className="text-center flex-1">
                    <div className="text-xs mb-0.5" style={{ color:'var(--txt3)' }}>After</div>
                    <div className="text-xl font-extrabold" style={{ color:'#e8a83e' }}>{s.stats.avgViewers.after}</div>
                    <div className="text-[10px]" style={{ color:'var(--txt3)' }}>avg viewers</div>
                  </div>
                </div>

                {/* Milestones */}
                <div className="flex flex-wrap gap-1 mb-3">
                  {s.milestones.slice(0,2).map(m => (
                    <span key={m.label} className="text-[10px] font-bold px-2 py-0.5 rounded-full" style={{ background:'rgba(232,168,62,.1)', color:'#e8a83e', border:'1px solid rgba(232,168,62,.2)' }}>
                      {m.icon} {m.label}
                    </span>
                  ))}
                </div>

                {/* Quote preview */}
                <p className="text-xs italic leading-relaxed mb-3" style={{ color:'var(--txt2)' }}>"{s.review.quote.slice(0,90)}..."</p>

                {/* Platforms + CTA */}
                <div className="flex items-center justify-between">
                  <div className="flex gap-1">
                    {s.platforms.slice(0,3).map(p => (
                      <span key={p} className="text-[10px] font-bold px-2 py-0.5 rounded-full" style={{ background:`${PLAT_COLORS[p]}15`, color: PLAT_COLORS[p], border:`1px solid ${PLAT_COLORS[p]}25` }}>{p}</span>
                    ))}
                  </div>
                  <span className="text-xs font-bold transition-colors" style={{ color:'var(--txt3)' }}>
                    View story →
                  </span>
                </div>
              </Link>
            )
          })}
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 px-5 border-t text-center" style={{ borderColor:'rgba(255,255,255,.07)' }}>
        <div className="max-w-xl mx-auto">
          <h2 className="text-2xl font-extrabold tracking-tight mb-3" style={{ color:'var(--txt)' }}>Your Name Could Be Here Next</h2>
          <p className="text-sm mb-6" style={{ color:'var(--txt2)' }}>Join StreamForge today and start building your own success story.</p>
          <Link href="/pricing" className="btn-gold px-8 py-3.5 rounded-xl text-base font-bold no-underline inline-flex items-center gap-2">🚀 Join StreamForge — From $49/mo</Link>
        </div>
      </section>
    </>
  )
}
