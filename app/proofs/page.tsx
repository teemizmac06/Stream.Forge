import type { Metadata } from 'next'
import Link from 'next/link'
import { STREAMERS } from '@/lib/streamersData'

export const metadata: Metadata = {
  title: 'Live Results & Proof — StreamForge Member Success Stories',
  description: 'Real StreamForge member results. Before and after stats, success stories, milestones. See exactly what streamers achieved after joining.',
  alternates: { canonical: 'https://streamforge.gg/proofs' },
}

const PLAN_COLORS: Record<string,string> = {Starter:'#0891b2',Standard:'#e8a83e',Premium:'#7c3aed'}
const PLAT_COLORS: Record<string,string> = {Twitch:'#9147ff',Kick:'#53fc18',YouTube:'#ff4444',TikTok:'#ff0050'}
const BADGE_STYLES: Record<string,{bg:string,color:string,border:string}> = {
  partner:{bg:'rgba(232,168,62,.12)',color:'#e8a83e',border:'rgba(232,168,62,.3)'},
  aff:{bg:'rgba(22,163,74,.1)',color:'#22c55e',border:'rgba(22,163,74,.25)'},
  top:{bg:'rgba(8,145,178,.1)',color:'#0891b2',border:'rgba(8,145,178,.25)'},
  deal:{bg:'rgba(234,88,12,.1)',color:'#ea580c',border:'rgba(234,88,12,.25)'},
}
const BADGE_MAP: Record<string,{style:string,label:string,icon:string}> = {
  glitchrex:{style:'partner',label:'Twitch Partner',icon:'🏆'},
  skylafps:{style:'partner',label:'Twitch Partner',icon:'🏆'},
  coastaltv:{style:'aff',label:'Twitch Affiliate',icon:'⭐'},
  zaralive:{style:'deal',label:'First Brand Deal',icon:'💼'},
  pulsegamer:{style:'top',label:'Top Category Rank',icon:'📊'},
  ironsight:{style:'aff',label:'Twitch Affiliate',icon:'⭐'},
}

export default function ProofsPage() {
  return (
    <>
      <section className="py-20 px-5 text-center border-b" style={{background:'linear-gradient(180deg,rgba(124,58,237,.1),transparent)',borderColor:'rgba(255,255,255,.07)'}}>
        <div className="max-w-3xl mx-auto">
          <div className="stag mb-3">Real Proof · No Actors</div>
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight mb-4 grad-txt">Live Results From Real Members</h1>
          <p className="text-base leading-relaxed mb-5" style={{color:'var(--txt2)'}}>
            Every card below is a verified StreamForge member with real before/after stats.<br/>
            <strong style={{color:'var(--txt)'}}>Click any card to see their full dashboard and success story.</strong>
          </p>
          <div className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-bold" style={{background:'rgba(232,168,62,.1)',border:'1.5px solid rgba(232,168,62,.3)',color:'var(--gold)',animation:'pulse 2s infinite'}}>
            👆 Tap any card to see the full results dashboard
          </div>
        </div>
      </section>

      <div className="border-b" style={{background:'rgba(232,168,62,.03)',borderColor:'rgba(232,168,62,.15)'}}>
        <div className="max-w-5xl mx-auto px-5 py-5 grid grid-cols-2 md:grid-cols-4 gap-4">
          {[['312','Affiliates Achieved','and counting'],['47','Partners Achieved','this year'],['$800+','Avg First Brand Deal','via Premium plan'],['9 days','Fastest to Affiliate','IronSight · Brazil']].map(([n,l,s])=>(
            <div key={l} className="text-center">
              <div className="text-2xl font-extrabold grad-gold">{n}</div>
              <div className="text-xs font-semibold mt-1" style={{color:'var(--txt)'}}>{l}</div>
              <div className="text-[10px] mt-0.5" style={{color:'var(--txt3)'}}>{s}</div>
            </div>
          ))}
        </div>
      </div>

      <section className="py-14 px-5">
        <div className="max-w-6xl mx-auto">
          <p className="text-center text-sm mb-8 font-semibold" style={{color:'var(--txt2)'}}>
            👇 Click any card — opens full story, analytics dashboard, and verified review
          </p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {STREAMERS.map(s=>{
              const growth = Math.round(((s.stats.avgViewers.after-s.stats.avgViewers.before)/s.stats.avgViewers.before)*100)
              const bdg = BADGE_MAP[s.slug]
              const bdgStyle = bdg ? BADGE_STYLES[bdg.style] : BADGE_STYLES.aff
              return (
                <Link key={s.slug} href={`/streamers/${s.slug}`} className="no-underline group block"
                  style={{background:'var(--card)',borderRadius:'18px',border:'1.5px solid var(--bdr)',overflow:'hidden',transition:'all .3s',position:'relative',display:'block',textDecoration:'none'}}>

                  {/* Always-visible click hint */}
                  <div className="absolute top-3 right-3 z-10 text-[10px] font-bold px-2 py-1 rounded-full transition-all"
                    style={{background:'rgba(232,168,62,.15)',color:'var(--gold)',border:'1px solid rgba(232,168,62,.3)'}}>
                    👆 Click for full story
                  </div>

                  <div className="p-5">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="relative flex-shrink-0">
                        <img src={s.avatar} alt={s.name} className="w-14 h-14 rounded-xl object-cover border-2" style={{borderColor:'rgba(255,255,255,.15)'}}/>
                        {s.verified&&<div className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full flex items-center justify-center text-[9px] text-white font-black" style={{background:'linear-gradient(135deg,#7c3aed,#0891b2)'}}>✓</div>}
                      </div>
                      <div className="flex-1 min-w-0 pr-16">
                        <div className="text-base font-extrabold truncate" style={{color:'var(--txt)'}}>{s.name}</div>
                        <div className="text-xs" style={{color:'var(--txt3)'}}>@{s.handle} · {s.location}</div>
                        <div className="text-xs mt-0.5" style={{color:'var(--txt3)'}}>{s.games.slice(0,2).join(', ')}</div>
                      </div>
                    </div>

                    {bdg&&(
                      <span className="inline-flex items-center gap-1 text-xs font-bold px-2.5 py-1 rounded-full mb-2"
                        style={{background:bdgStyle.bg,color:bdgStyle.color,border:`1px solid ${bdgStyle.border}`}}>
                        {bdg.icon} {bdg.label}
                      </span>
                    )}
                    <div className="text-[10px] mb-4" style={{color:'var(--txt3)'}}>⏱ Achieved in {s.joinedDays} days after joining</div>

                    {/* Before → After hero */}
                    <div className="p-4 rounded-xl mb-4" style={{background:'rgba(255,255,255,.04)',border:'1px solid rgba(255,255,255,.06)'}}>
                      <div className="text-[9px] font-bold uppercase tracking-wider mb-3" style={{color:'var(--txt3)'}}>Average Viewers — Before vs After</div>
                      <div className="flex items-center justify-between">
                        <div className="text-center">
                          <div className="text-3xl font-extrabold leading-none" style={{color:'var(--txt3)'}}>{s.stats.avgViewers.before}</div>
                          <div className="text-[9px] mt-1" style={{color:'var(--txt3)'}}>BEFORE</div>
                        </div>
                        <div className="text-center">
                          <div className="text-base font-extrabold" style={{color:'#22c55e'}}>+{growth}%</div>
                          <div className="text-2xl my-0.5" style={{color:'var(--gold)'}}>→</div>
                          <div className="text-[9px]" style={{color:'var(--txt3)'}}>{s.joinedDays} days</div>
                        </div>
                        <div className="text-center">
                          <div className="text-3xl font-extrabold leading-none" style={{color:'var(--gold)'}}>{s.stats.avgViewers.after}</div>
                          <div className="text-[9px] mt-1" style={{color:'var(--gold)'}}>AFTER ✓</div>
                        </div>
                      </div>
                    </div>

                    {/* Mini stats row */}
                    <div className="grid grid-cols-3 gap-2 mb-4">
                      {[
                        {l:'Peak Viewers',v:s.stats.peakViewers.after},
                        {l:'New Followers',v:`+${s.stats.followers.after-s.stats.followers.before}`},
                        {l:'Chat Messages',v:s.stats.chatMessages.after},
                      ].map(st=>(
                        <div key={st.l} className="text-center p-2 rounded-lg" style={{background:'rgba(255,255,255,.03)',border:'1px solid rgba(255,255,255,.05)'}}>
                          <div className="text-sm font-extrabold" style={{color:'var(--txt)'}}>{st.v}</div>
                          <div className="text-[9px] mt-0.5" style={{color:'var(--txt3)'}}>{st.l}</div>
                        </div>
                      ))}
                    </div>

                    {/* Quote */}
                    <p className="text-xs italic leading-relaxed mb-4" style={{color:'var(--txt2)'}}>
                      "{s.review.quote.length>90?s.review.quote.slice(0,90)+'...':s.review.quote}"
                    </p>

                    {/* Footer row */}
                    <div className="flex items-center justify-between pt-3" style={{borderTop:'1px solid rgba(255,255,255,.06)'}}>
                      <div className="flex gap-1">
                        {s.platforms.slice(0,2).map(p=>(
                          <span key={p} className="text-[9px] font-bold px-2 py-0.5 rounded-full"
                            style={{background:`${PLAT_COLORS[p]||'#9b9580'}18`,color:PLAT_COLORS[p]||'#9b9580',border:`1px solid ${PLAT_COLORS[p]||'#9b9580'}25`}}>
                            {p}
                          </span>
                        ))}
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-[9px] font-bold px-2 py-0.5 rounded-full text-white"
                          style={{background:`${PLAN_COLORS[s.plan]}cc`}}>{s.plan}</span>
                        <span className="text-xs font-bold" style={{color:'var(--gold)'}}>View story →</span>
                      </div>
                    </div>
                  </div>
                </Link>
              )
            })}
          </div>
        </div>
      </section>

      <section className="py-16 px-5 border-t text-center" style={{borderColor:'rgba(255,255,255,.07)'}}>
        <div className="max-w-xl mx-auto iphone-card rounded-2xl p-8">
          <h2 className="text-2xl font-extrabold tracking-tight mb-3" style={{color:'var(--txt)'}}>Your Results Could Be Here Next</h2>
          <p className="text-sm mb-6" style={{color:'var(--txt2)'}}>Join StreamForge and build your own success story. Plans from $49/month.</p>
          <Link href="/pricing" className="btn-gold px-8 py-3.5 rounded-xl text-base font-bold no-underline inline-flex items-center gap-2">🚀 Join StreamForge — From $49/mo</Link>
          <p className="text-xs mt-3" style={{color:'var(--txt3)'}}>No automatic charges · Cancel anytime · Discord access within 24 hours</p>
        </div>
      </section>
    </>
  )
}
