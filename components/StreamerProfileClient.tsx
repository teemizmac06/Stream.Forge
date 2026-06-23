'use client'
import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import type { Streamer } from '@/lib/streamersData'

const PLAT_COLORS: Record<string,string> = {
  twitch:'#9147ff', kick:'#53fc18', youtube:'#ff4444',
  tiktok:'#ff0050', twitter:'#1da1f2', discord:'#5865f2', instagram:'#e1306c',
}
const PLAT_ICONS: Record<string,string> = {
  twitch:'📡', kick:'⚡', youtube:'▶️', tiktok:'🎵',
  twitter:'🐦', discord:'💬', instagram:'📸',
}
const PLAN_COLORS: Record<string,string> = {
  Starter:'rgba(8,145,178,.8)', Standard:'rgba(232,168,62,.9)', Premium:'rgba(124,58,237,.9)'
}

function pct(before:number, after:number) {
  return Math.round(((after - before) / before) * 100)
}

function AnimatedNumber({ target, duration=1400, prefix='', suffix='' }:{ target:number, duration?:number, prefix?:string, suffix?:string }) {
  const [val, setVal] = useState(0)
  const ref = useRef<HTMLDivElement>(null)
  const done = useRef(false)
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting && !done.current) {
        done.current = true
        const start = Date.now()
        const tick = () => {
          const p = Math.min((Date.now()-start)/duration, 1)
          const eased = 1 - Math.pow(1-p, 3)
          setVal(Math.round(eased * target))
          if (p < 1) requestAnimationFrame(tick)
        }
        requestAnimationFrame(tick)
        obs.disconnect()
      }
    }, { threshold: 0.3 })
    if (ref.current) obs.observe(ref.current)
    return () => obs.disconnect()
  }, [target, duration])
  return <span ref={ref}>{prefix}{val.toLocaleString()}{suffix}</span>
}

function StatBar({ label, pctVal, color }: { label:string, pctVal:number, color:string }) {
  const [width, setWidth] = useState(0)
  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setTimeout(() => setWidth(Math.min(pctVal, 100)), 200); obs.disconnect() }
    }, { threshold: 0.3 })
    if (ref.current) obs.observe(ref.current)
    return () => obs.disconnect()
  }, [pctVal])
  return (
    <div ref={ref} className="flex items-center gap-3 mb-3">
      <span className="text-xs w-36 flex-shrink-0" style={{ color:'var(--txt2)' }}>{label}</span>
      <div className="flex-1 h-2 rounded-full overflow-hidden" style={{ background:'rgba(255,255,255,.07)' }}>
        <div className="h-full rounded-full transition-all duration-1000 ease-out" style={{ width:`${width}%`, background: color }} />
      </div>
      <span className="text-xs font-bold w-12 text-right" style={{ color }}>{pctVal > 0 ? '+' : ''}{pctVal}%</span>
    </div>
  )
}

export default function StreamerProfileClient({ streamer: s }: { streamer: Streamer }) {
  const [activeTab, setActiveTab] = useState<'story'|'stats'|'review'>('story')

  const avgGrowth  = pct(s.stats.avgViewers.before,  s.stats.avgViewers.after)
  const peakGrowth = pct(s.stats.peakViewers.before, s.stats.peakViewers.after)
  const follGrowth = pct(s.stats.followers.before,   s.stats.followers.after)
  const chatGrowth = pct(s.stats.chatMessages.before, s.stats.chatMessages.after)

  return (
    <div style={{ minHeight:'100vh', background:'var(--bg)', fontFamily:"'Plus Jakarta Sans',system-ui,sans-serif" }}>

      {/* ── BACK ── */}
      <div className="max-w-5xl mx-auto px-5 pt-6 pb-2">
        <Link href="/community" className="inline-flex items-center gap-2 text-xs font-semibold no-underline transition-colors" style={{ color:'var(--txt3)' }}>
          ← Back to Community
        </Link>
      </div>

      {/* ── HERO BANNER ── */}
      <section className="relative overflow-hidden" style={{ background:'linear-gradient(135deg,rgba(124,58,237,.15),rgba(8,145,178,.1))', borderBottom:'1px solid rgba(255,255,255,.07)' }}>
        <div className="max-w-5xl mx-auto px-5 py-10">
          <div className="flex flex-col sm:flex-row gap-6 items-start sm:items-center">

            {/* Avatar + badge */}
            <div className="relative flex-shrink-0">
              <div className="w-24 h-24 rounded-2xl overflow-hidden border-2" style={{ borderColor:'rgba(255,255,255,.2)', boxShadow:'0 0 30px rgba(124,58,237,.35)' }}>
                <img src={s.avatar} alt={s.name} className="w-full h-full object-cover" />
              </div>
              {s.verified && (
                <div className="absolute -bottom-2 -right-2 w-8 h-8 rounded-full flex items-center justify-center text-sm border-2" style={{ background:'linear-gradient(135deg,#7c3aed,#0891b2)', borderColor:'var(--bg)' }}>✓</div>
              )}
            </div>

            {/* Info */}
            <div className="flex-1">
              <div className="flex flex-wrap items-center gap-2 mb-2">
                <h1 className="text-3xl font-extrabold tracking-tight" style={{ color:'var(--txt)' }}>{s.name}</h1>
                <span className="text-xs font-bold px-2.5 py-1 rounded-full text-white" style={{ background: PLAN_COLORS[s.plan] }}>{s.plan}</span>
                <span className="text-xs font-bold px-2.5 py-1 rounded-full" style={{ background:'rgba(22,163,74,.15)', color:'#22c55e', border:'1px solid rgba(22,163,74,.3)' }}>✦ StreamForge Member</span>
              </div>

              <div className="flex flex-wrap gap-2 mb-3 text-xs" style={{ color:'var(--txt2)' }}>
                <span>@{s.handle}</span>
                <span>·</span>
                <span>📍 {s.location}</span>
                <span>·</span>
                <span>🎮 {s.games.join(', ')}</span>
                <span>·</span>
                <span>🛡️ Team {s.teamLead}</span>
              </div>

              <p className="text-sm leading-relaxed mb-4 max-w-xl" style={{ color:'var(--txt2)' }}>{s.bio}</p>

              {/* Platform pills */}
              <div className="flex flex-wrap gap-2">
                {s.socials.map(soc => (
                  <a key={soc.platform} href={soc.url} target="_blank" rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 rounded-full no-underline transition-all hover:scale-105"
                    style={{ background:`${PLAT_COLORS[soc.platform]}18`, color: PLAT_COLORS[soc.platform], border:`1px solid ${PLAT_COLORS[soc.platform]}30` }}>
                    {PLAT_ICONS[soc.platform]} {soc.handle}
                  </a>
                ))}
              </div>
            </div>

            {/* Quick stat */}
            <div className="flex-shrink-0 text-center p-5 rounded-2xl" style={{ background:'rgba(255,255,255,.05)', border:'1px solid rgba(255,255,255,.1)' }}>
              <div className="text-4xl font-extrabold" style={{ background:'linear-gradient(135deg,#e8a83e,#ffc85a)', WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent', backgroundClip:'text' }}>+{avgGrowth}%</div>
              <div className="text-xs mt-1" style={{ color:'var(--txt3)' }}>Avg viewer growth</div>
              <div className="text-xs mt-2 font-bold" style={{ color:'#22c55e' }}>In {s.joinedDays} days</div>
            </div>
          </div>
        </div>
      </section>

      {/* ── MILESTONE STRIP ── */}
      <div className="border-b" style={{ background:'rgba(232,168,62,.03)', borderColor:'rgba(232,168,62,.15)' }}>
        <div className="max-w-5xl mx-auto px-5 py-4 flex flex-wrap gap-4">
          {s.milestones.map(m => (
            <div key={m.label} className="flex items-center gap-2">
              <span className="text-lg">{m.icon}</span>
              <div>
                <div className="text-xs font-bold" style={{ color:'var(--txt)' }}>{m.label}</div>
                <div className="text-[10px]" style={{ color:'var(--txt3)' }}>Day {m.days}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── MAIN CONTENT ── */}
      <div className="max-w-5xl mx-auto px-5 py-10">

        {/* ── DASHBOARD ── */}
        <div className="mb-10">
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-xl font-extrabold tracking-tight" style={{ color:'var(--txt)' }}>📊 Stream Performance Dashboard</h2>
            <span className="text-[10px] font-bold px-2 py-1 rounded-full" style={{ background:'rgba(232,168,62,.1)', color:'#e8a83e', border:'1px solid rgba(232,168,62,.2)' }}>⚡ Powered by StreamForge</span>
          </div>

          {/* Dashboard window */}
          <div className="rounded-2xl overflow-hidden" style={{ background:'linear-gradient(145deg,#f8f7ff,#ede9ff)', border:'1px solid rgba(124,58,237,.2)', boxShadow:'0 20px 60px rgba(124,58,237,.15)' }}>

            {/* Titlebar */}
            <div className="flex items-center gap-3 px-5 py-3" style={{ background:'rgba(255,255,255,.8)', borderBottom:'1px solid rgba(124,58,237,.1)', backdropFilter:'blur(10px)' }}>
              <div className="flex gap-1.5">
                <span className="w-3 h-3 rounded-full bg-[#ff5f57]"/>
                <span className="w-3 h-3 rounded-full bg-[#febc2e]"/>
                <span className="w-3 h-3 rounded-full bg-[#28c840]"/>
              </div>
              <div className="flex items-center gap-2 flex-1">
                <div className="w-6 h-6 rounded-full bg-[#7c3aed] flex items-center justify-center text-white text-xs font-black">{s.name[0]}</div>
                <span className="text-sm font-bold text-[#1a0a3e]">{s.name}</span>
                <span className="text-xs text-[#9b9580]">twitch.tv/{s.handle}</span>
                {s.verified && <span className="text-[10px] text-[#7c3aed]">✓ Verified</span>}
              </div>
              <div className="text-xs text-[#9b9580]">Last 30 days · StreamForge Analytics</div>
            </div>

            <div className="p-6" style={{ color:'#1a0a3e' }}>

              {/* Top 4 stat cards */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                {[
                  { label:'AVERAGE VIEWERS',  val: s.stats.avgViewers.after,   prev: s.stats.avgViewers.before,  growth: avgGrowth,  icon:'👥', color:'#7c3aed' },
                  { label:'PEAK VIEWERS',     val: s.stats.peakViewers.after,  prev: s.stats.peakViewers.before, growth: peakGrowth, icon:'📈', color:'#ea580c' },
                  { label:'NEW FOLLOWERS',    val: s.stats.followers.after - s.stats.followers.before, prev: null, growth: follGrowth, icon:'👤', color:'#0891b2', prefix:'+' },
                  { label:'CHAT MESSAGES',    val: s.stats.chatMessages.after,  prev: s.stats.chatMessages.before, growth: chatGrowth, icon:'💬', color:'#16a34a' },
                ].map(card => (
                  <div key={card.label} className="rounded-xl p-4" style={{ background:'rgba(255,255,255,.85)', boxShadow:'0 2px 12px rgba(124,58,237,.08)', border:'1px solid rgba(124,58,237,.08)' }}>
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-lg">{card.icon}</span>
                      <span className="text-[9px] font-bold uppercase tracking-wider" style={{ color:'#9b9580' }}>{card.label}</span>
                    </div>
                    <div className="text-2xl font-extrabold leading-none mb-1" style={{ color:'#1a0a3e' }}>
                      <AnimatedNumber target={card.val} prefix={card.prefix||''} />
                    </div>
                    <div className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold" style={{ background:`${card.color}15`, color: card.color }}>
                      ▲ +{card.growth}% vs before
                    </div>
                  </div>
                ))}
              </div>

              {/* Before / After viewer highlight */}
              <div className="grid md:grid-cols-2 gap-4 mb-4">
                <div className="rounded-xl p-5" style={{ background:'rgba(255,255,255,.85)', boxShadow:'0 2px 12px rgba(124,58,237,.08)', border:'1px solid rgba(124,58,237,.08)' }}>
                  <div className="text-xs font-bold uppercase tracking-wider mb-4" style={{ color:'#7c3aed' }}>AVERAGE VIEWERS</div>
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-xs uppercase tracking-wide mb-1" style={{ color:'#9b9580' }}>BEFORE</div>
                      <div className="text-5xl font-extrabold" style={{ color:'#c4b5fd' }}>{s.stats.avgViewers.before}</div>
                      <div className="text-xs mt-1" style={{ color:'#9b9580' }}>vs last stream</div>
                    </div>
                    <div className="text-center">
                      <div className="text-xl font-extrabold" style={{ color:'#22c55e' }}>+{avgGrowth}%</div>
                      <div className="text-xs" style={{ color:'#9b9580' }}>GROWTH</div>
                      <div className="text-2xl mt-1">▶</div>
                    </div>
                    <div>
                      <div className="text-xs uppercase tracking-wide mb-1 text-right" style={{ color:'#7c3aed' }}>AFTER</div>
                      <div className="text-5xl font-extrabold" style={{ color:'#7c3aed' }}>
                        <AnimatedNumber target={s.stats.avgViewers.after} />
                      </div>
                      <div className="text-xs mt-1 text-right" style={{ color:'#7c3aed' }}>✓ this stream</div>
                    </div>
                  </div>
                </div>

                {/* Viewer over time simulated chart */}
                <div className="rounded-xl p-5" style={{ background:'rgba(255,255,255,.85)', boxShadow:'0 2px 12px rgba(124,58,237,.08)', border:'1px solid rgba(124,58,237,.08)' }}>
                  <div className="flex justify-between items-center mb-3">
                    <div className="text-xs font-bold uppercase tracking-wider" style={{ color:'#9b9580' }}>VIEWERS OVER TIME</div>
                    <div className="flex gap-3 text-[10px]">
                      <span className="flex items-center gap-1"><span className="w-4 h-0.5 bg-[#7c3aed] inline-block"/> This stream</span>
                      <span className="flex items-center gap-1"><span className="w-4 h-0.5 bg-[#c4b5fd] inline-block"/> Before</span>
                    </div>
                  </div>
                  {/* SVG simulated chart */}
                  <svg viewBox="0 0 300 100" className="w-full h-24">
                    <defs>
                      <linearGradient id="lineGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#7c3aed" stopOpacity="0.2"/>
                        <stop offset="100%" stopColor="#7c3aed" stopOpacity="0"/>
                      </linearGradient>
                    </defs>
                    {/* Previous stream line (flat low) */}
                    <polyline points="0,85 50,82 100,80 150,78 200,77 250,76 300,75" fill="none" stroke="#c4b5fd" strokeWidth="1.5" strokeDasharray="4,3"/>
                    {/* Current stream line (rising) */}
                    <path d="M0,90 C30,88 60,75 100,62 C140,50 170,38 200,30 C230,22 260,16 300,12" fill="none" stroke="#7c3aed" strokeWidth="2.5"/>
                    <path d="M0,90 C30,88 60,75 100,62 C140,50 170,38 200,30 C230,22 260,16 300,12 L300,100 L0,100 Z" fill="url(#lineGrad)"/>
                    {/* Time labels */}
                    {['7PM','7:30','8PM','8:30','9PM','9:15'].map((t,i) => (
                      <text key={t} x={i * 55} y={100} fill="#9b9580" fontSize="7">{t}</text>
                    ))}
                  </svg>
                </div>
              </div>

              {/* Bottom row */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="rounded-xl p-4" style={{ background:'rgba(255,255,255,.85)', border:'1px solid rgba(124,58,237,.08)' }}>
                  <div className="text-[10px] uppercase tracking-wider mb-2" style={{ color:'#9b9580' }}>STREAM PERFORMANCE</div>
                  <div className="text-3xl font-extrabold mb-1" style={{ color:'#7c3aed' }}>{s.stats.streamPerformance}%</div>
                  <div className="text-xs" style={{ color:'#9b9580' }}>better than previous stream 🔥</div>
                </div>
                <div className="rounded-xl p-4" style={{ background:'rgba(255,255,255,.85)', border:'1px solid rgba(124,58,237,.08)' }}>
                  <div className="text-[10px] uppercase tracking-wider mb-2" style={{ color:'#9b9580' }}>MOST ACTIVE HOUR</div>
                  <div className="text-base font-extrabold mb-1" style={{ color:'#1a0a3e' }}>{s.stats.mostActiveHour}</div>
                  <div className="flex gap-0.5 mt-2">
                    {[3,5,4,7,9,8,6].map((h,i) => (
                      <div key={i} className="flex-1 rounded-sm" style={{ height:`${h*4}px`, background: i >= 4 ? '#ec4899' : '#f9a8d4' }}/>
                    ))}
                  </div>
                </div>
                <div className="rounded-xl p-4" style={{ background:'rgba(255,255,255,.85)', border:'1px solid rgba(124,58,237,.08)' }}>
                  <div className="text-[10px] uppercase tracking-wider mb-2" style={{ color:'#9b9580' }}>BEST CATEGORY</div>
                  <div className="text-base font-extrabold mb-1" style={{ color:'#1a0a3e' }}>{s.stats.bestCategory}</div>
                  <div className="w-full h-1.5 rounded-full overflow-hidden mt-2" style={{ background:'rgba(124,58,237,.15)' }}>
                    <div className="h-full rounded-full bg-[#7c3aed]" style={{ width:'74%' }}/>
                  </div>
                  <div className="text-[10px] mt-1" style={{ color:'#22c55e' }}>+26% vs last stream</div>
                </div>
                <div className="rounded-xl p-4" style={{ background:'rgba(255,255,255,.85)', border:'1px solid rgba(124,58,237,.08)' }}>
                  <div className="text-[10px] uppercase tracking-wider mb-2" style={{ color:'#9b9580' }}>FOLLOWER CONVERSION</div>
                  <div className="flex items-center gap-3">
                    <div className="text-3xl font-extrabold" style={{ color:'#7c3aed' }}>{s.stats.followerConversion}%</div>
                    <svg viewBox="0 0 36 36" className="w-12 h-12">
                      <path d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="#f0ebff" strokeWidth="3"/>
                      <path d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="#7c3aed" strokeWidth="3" strokeDasharray={`${s.stats.followerConversion*4},100`}/>
                    </svg>
                  </div>
                  <div className="text-[10px]" style={{ color:'#9b9580' }}>Viewers → Followers</div>
                  <div className="text-[10px] mt-0.5" style={{ color:'#22c55e' }}>+3.4% vs last stream</div>
                </div>
              </div>

            </div>
          </div>
        </div>

        {/* ── TABS: Story / Growth Bars / Review ── */}
        <div className="mb-3 flex gap-2 border-b" style={{ borderColor:'rgba(255,255,255,.08)' }}>
          {(['story','stats','review'] as const).map(t => (
            <button key={t} onClick={()=>setActiveTab(t)}
              className="px-5 py-2.5 text-sm font-bold capitalize border-b-2 transition-all border-none cursor-pointer"
              style={{
                background:'transparent', fontFamily:'inherit',
                color: activeTab===t ? 'var(--txt)' : 'var(--txt3)',
                borderBottom: `2px solid ${activeTab===t ? '#e8a83e' : 'transparent'}`,
              }}>
              {t === 'story' ? '📖 Their Story' : t === 'stats' ? '📊 Growth Bars' : '⭐ Review'}
            </button>
          ))}
        </div>

        {/* Story */}
        {activeTab === 'story' && (
          <div className="max-w-2xl">
            <h3 className="text-lg font-extrabold mb-4" style={{ color:'var(--txt)' }}>In Their Own Words</h3>
            {s.story.split('\n\n').map((para, i) => (
              <p key={i} className="text-sm leading-relaxed mb-4" style={{ color:'var(--txt2)' }}>{para}</p>
            ))}
            <div className="mt-6 p-5 rounded-2xl" style={{ background:'linear-gradient(135deg,rgba(232,168,62,.08),rgba(124,58,237,.06))', border:'1px solid rgba(232,168,62,.2)' }}>
              <div className="text-2xl mb-2">💬</div>
              <p className="text-sm italic font-medium leading-relaxed" style={{ color:'var(--txt)' }}>"{s.review.quote}"</p>
              <div className="flex items-center gap-2 mt-3">
                <img src={s.avatar} alt={s.name} className="w-7 h-7 rounded-full border object-cover" style={{ borderColor:'rgba(232,168,62,.3)' }}/>
                <span className="text-xs font-bold" style={{ color:'var(--txt2)' }}>{s.name} · {s.review.platform} · {s.review.date}</span>
              </div>
            </div>
          </div>
        )}

        {/* Stats bars */}
        {activeTab === 'stats' && (
          <div className="max-w-2xl">
            <h3 className="text-lg font-extrabold mb-4" style={{ color:'var(--txt)' }}>Before vs After StreamForge</h3>
            <StatBar label="Avg Viewer Growth"    pctVal={avgGrowth}  color="linear-gradient(90deg,#a06820,#e8a83e)" />
            <StatBar label="Peak Viewer Growth"   pctVal={peakGrowth} color="linear-gradient(90deg,#0891b2,#67e8f9)" />
            <StatBar label="Follower Growth"      pctVal={follGrowth} color="linear-gradient(90deg,#16a34a,#4ade80)" />
            <StatBar label="Chat Message Growth"  pctVal={chatGrowth} color="linear-gradient(90deg,#7c3aed,#c4b5fd)" />
            <div className="mt-6 grid grid-cols-3 gap-4">
              {[
                { label:'Hours Streamed', val:`${s.stats.hoursStreamed}h`, color:'#e8a83e' },
                { label:'Stream Performance', val:`${s.stats.streamPerformance}%`, color:'#22c55e' },
                { label:'Follower Conversion', val:`${s.stats.followerConversion}%`, color:'#0891b2' },
              ].map(stat => (
                <div key={stat.label} className="p-4 rounded-xl text-center" style={{ background:'rgba(255,255,255,.04)', border:'1px solid rgba(255,255,255,.07)' }}>
                  <div className="text-2xl font-extrabold mb-1" style={{ color: stat.color }}>{stat.val}</div>
                  <div className="text-xs" style={{ color:'var(--txt3)' }}>{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Review */}
        {activeTab === 'review' && (
          <div className="max-w-2xl">
            <div className="p-7 rounded-2xl mb-5" style={{ background:'rgba(255,255,255,.04)', border:'1px solid rgba(232,168,62,.2)' }}>
              <div className="text-3xl mb-4">⭐⭐⭐⭐⭐</div>
              <p className="text-lg font-bold italic leading-relaxed mb-5" style={{ color:'var(--txt)' }}>"{s.review.quote}"</p>
              <div className="flex items-center gap-3 pt-4" style={{ borderTop:'1px solid rgba(255,255,255,.07)' }}>
                <img src={s.avatar} alt={s.name} className="w-10 h-10 rounded-full object-cover border-2" style={{ borderColor:'rgba(232,168,62,.3)' }}/>
                <div>
                  <div className="text-sm font-bold" style={{ color:'var(--txt)' }}>{s.name}</div>
                  <div className="text-xs" style={{ color:'var(--txt3)' }}>{s.review.platform} Streamer · {s.review.date} · Joined {s.joinedDays} days before review</div>
                </div>
                <div className="ml-auto text-xs font-bold px-2.5 py-1 rounded-full" style={{ background:'rgba(22,163,74,.12)', color:'#22c55e', border:'1px solid rgba(22,163,74,.25)' }}>✓ Verified Member</div>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {s.milestones.map(m => (
                <div key={m.label} className="flex items-center gap-3 p-3 rounded-xl" style={{ background:'rgba(255,255,255,.03)', border:'1px solid rgba(255,255,255,.07)' }}>
                  <span className="text-xl">{m.icon}</span>
                  <div>
                    <div className="text-xs font-bold" style={{ color:'var(--txt)' }}>{m.label}</div>
                    <div className="text-[10px]" style={{ color:'var(--txt3)' }}>Achieved Day {m.days}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ── CTA ── */}
        <div className="mt-12 p-8 rounded-2xl text-center" style={{ background:'linear-gradient(135deg,rgba(124,58,237,.1),rgba(8,145,178,.07))', border:'1px solid rgba(232,168,62,.2)' }}>
          <div className="text-3xl mb-3">🚀</div>
          <h3 className="text-2xl font-extrabold tracking-tight mb-3" style={{ color:'var(--txt)' }}>Want Results Like {s.name}?</h3>
          <p className="text-sm mb-6 max-w-lg mx-auto leading-relaxed" style={{ color:'var(--txt2)' }}>
            {s.name} started on the <strong style={{ color:'var(--txt)' }}>{s.plan} plan (${s.plan === 'Starter' ? 49 : s.plan === 'Standard' ? 149 : 249}/month)</strong> and achieved these results in just {s.joinedDays} days. Your stream could be next.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link href="/pricing" className="btn-gold px-8 py-3.5 rounded-xl text-sm font-bold no-underline inline-flex items-center justify-center gap-2">
              Start Growing — From $49/mo
            </Link>
            <Link href="/community" className="btn-outline-gold px-8 py-3.5 rounded-xl text-sm no-underline inline-flex items-center justify-center gap-2">
              See More Success Stories
            </Link>
          </div>
          <p className="text-xs mt-4" style={{ color:'var(--txt3)' }}>No automatic charges · Cancel anytime · Discord access within 24 hours</p>
        </div>

      </div>

      {/* JSON-LD */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context":"https://schema.org","@type":"Review",
        "name":`${s.name} StreamForge Success Story`,
        "reviewBody": s.review.quote,
        "author":{ "@type":"Person","name": s.name },
        "itemReviewed":{ "@type":"Service","name":"StreamForge","url":"https://streamforge.gg" },
        "reviewRating":{ "@type":"Rating","ratingValue":"5","bestRating":"5" },
        "datePublished": s.review.date,
      })}} />
    </div>
  )
}
