'use client'
import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { STREAMERS } from '@/lib/streamersData'

function strHash(s:string){let h=0;for(let i=0;i<s.length;i++){h=((h<<5)-h)+s.charCodeAt(i);h|=0;}return Math.abs(h)}
const AVIDS=[1,2,3,4,5,6,7,8,9,10,11,12,14,15,16,17,18,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52]
function av(n:string){return `https://i.pravatar.cc/150?img=${AVIDS[strHash(n)%AVIDS.length]}`}

const NOTIFS=[
  {i:'📈',t:'Marcus just reached 34 viewers — a new personal best',c:'#e8a83e'},
  {i:'👁',t:'CoastalTV averaging 60+ viewers this week',c:'#0891b2'},
  {i:'⚡',t:'TemmyPlays: 60 community members joined their session',c:'#f59e0b'},
  {i:'✅',t:'SkylaFPS achieved Twitch Partner status',c:'#22c55e'},
  {i:'🚀',t:'GlitchRex earned their Verified badge',c:'#9147ff'},
  {i:'💼',t:'ZaraLive secured their first brand partnership — $800',c:'#ea580c'},
  {i:'🏅',t:'IronSight reached Affiliate milestone in 9 days',c:'#22c55e'},
  {i:'🏆',t:'PulseGamer ranked Top 10 in Sports on Kick',c:'#e8a83e'},
]

const HOW=[
  {n:'01',t:'Apply & Get Approved',d:'Submit your application. Reviewed within 24 hours. Payment details sent via email after approval — no automatic charges.'},
  {n:'02',t:'Get Matched Into Active Groups',d:'Placed into engagement groups with creators in your exact category, schedule and platform. Tailored to you.'},
  {n:'03',t:'Community Shows Up Every Stream',d:'Network members join, watch and engage consistently — creating the activity that triggers platform discovery.'},
  {n:'04',t:'Track Growth & Scale',d:'Monitor your channel momentum. Upgrade your plan as your channel scales toward Partner.'},
  {n:'05',t:'Unlock Collabs & Co-Streams',d:'Get matched with compatible streamers for co-streams. Both audiences grow at the same time.'},
  {n:'06',t:'Access Brand Deals',d:'Elite members get direct introductions to brands actively looking for gaming and streaming creators.'},
]

const PLAT_COLORS:Record<string,string>={Twitch:'#9147ff',Kick:'#53fc18',YouTube:'#ff4444',TikTok:'#ff0050'}
const BADGE_MAP:Record<string,{label:string,icon:string,color:string,bg:string}> = {
  glitchrex:{label:'Twitch Partner',icon:'🏆',color:'#e8a83e',bg:'rgba(232,168,62,.12)'},
  skylafps:{label:'Twitch Partner',icon:'🏆',color:'#e8a83e',bg:'rgba(232,168,62,.12)'},
  coastaltv:{label:'Affiliate in 11d',icon:'⭐',color:'#22c55e',bg:'rgba(22,163,74,.1)'},
  zaralive:{label:'$800 Brand Deal',icon:'💼',color:'#ea580c',bg:'rgba(234,88,12,.1)'},
  pulsegamer:{label:'Top Category Rank',icon:'📊',color:'#0891b2',bg:'rgba(8,145,178,.1)'},
  ironsight:{label:'Affiliate in 9d',icon:'⭐',color:'#22c55e',bg:'rgba(22,163,74,.1)'},
}

const FAQS=[
  {q:'Is StreamForge safe for my Twitch channel?',a:'Yes. StreamForge uses real creator collaboration — no bots, no automation, no artificial engagement. 100% compliant with Twitch, Kick and YouTube guidelines. Zero members have been banned for using StreamForge.'},
  {q:'Are these real people or automated accounts?',a:'Every member is a verified real creator who participates because they receive the same support in return. This is a community of real streamers, not software.'},
  {q:'How fast can I see results?',a:'Most members see consistent community activity in their first 1–3 streams. Platform milestones typically follow within the first 2–4 weeks.'},
  {q:'How does payment work?',a:'Apply first. After approval we send payment details via email. No automatic charges. You only pay after being accepted. Plans start at $49/month.'},
  {q:'One of your teams contacted me on Discord — is that real?',a:'StreamForge has four verified teams: Jedidiah, Temmy, levelUpX and Jeremiah. Verify them on our Teams section — same name, same logo, same handle = verified. Never pay outside contact.streamforge@gmail.com.'},
]

export default function HomePage(){
  const [visitors,setVisitors]=useState(7284)
  const [members,setMembers]=useState(258)
  const [apps,setApps]=useState(17)
  const [notifs,setNotifs]=useState<{i:string,t:string,c:string,id:number}[]>([])
  const [openFaq,setOpenFaq]=useState<number|null>(null)
  const notifIdx=useRef(0)

  useEffect(()=>{
    // Reveal on scroll
    const obs=new IntersectionObserver(entries=>{
      entries.forEach(e=>{if(e.isIntersecting)(e.target as HTMLElement).classList.add('vis')})
    },{threshold:.1})
    document.querySelectorAll('.rv').forEach(el=>obs.observe(el))

    // Counters
    const d=new Date(),doy=Math.floor((d.getTime()-new Date(d.getFullYear(),0,0).getTime())/86400000),seed=doy*17+3847
    setVisitors(6800+(seed%1600));setMembers(248+(seed%36));setApps(9+(seed%13))
    const iv1=setInterval(()=>setVisitors(v=>v+Math.floor(Math.random()*2+1)),14000)
    const iv2=setInterval(()=>{if(Math.random()>.7)setMembers(m=>m+1)},50000)

    // Notifications
    function fireNotif(){
      const n=NOTIFS[notifIdx.current%NOTIFS.length];notifIdx.current++
      const id=Date.now()
      setNotifs(p=>[...p.slice(-2),{...n,id}])
      setTimeout(()=>setNotifs(p=>p.filter(x=>x.id!==id)),5500)
    }
    const iv3=setInterval(fireNotif,7500)
    setTimeout(fireNotif,2500)

    // IP language detection
    fetch('https://ipapi.co/json/',{signal:AbortSignal.timeout?.(3000)})
      .then(r=>r.json()).then(d=>{
        const map:Record<string,string>={FR:'fr',BE:'fr',SN:'fr',CI:'fr',ES:'es',MX:'es',AR:'es',BR:'pt',PT:'pt',DE:'de',AT:'de'}
        const detected=map[d.country_code]||(navigator.language||'en').slice(0,2)
        if(detected!=='en')window.dispatchEvent(new CustomEvent('sf-lang',{detail:detected}))
      }).catch(()=>{})

    return()=>{clearInterval(iv1);clearInterval(iv2);clearInterval(iv3);obs.disconnect()}
  },[])

  return(
    <div style={{position:'relative',zIndex:1}}>

      {/* ── DISCORD MODAL ── */}
      <div id="dc-modal" className="fixed inset-0 z-[500] items-center justify-center px-4"
        style={{display:'none',background:'rgba(0,0,0,.8)',backdropFilter:'blur(6px)'}}>
        <div className="iphone-card rounded-2xl p-7 max-w-md w-full mx-auto relative"
          style={{background:'var(--bg2)',border:'1px solid rgba(232,168,62,.25)',maxHeight:'90vh',overflowY:'auto'}}>
          <button onClick={()=>{const m=document.getElementById('dc-modal');if(m){m.style.display='none';document.body.style.overflow=''}}}
            className="absolute top-3 right-3 text-xs px-2 py-1 rounded border"
            style={{background:'transparent',borderColor:'var(--bdr)',color:'var(--txt2)'}}>✕</button>
          <div className="text-3xl mb-3">💬</div>
          <h3 className="text-lg font-extrabold mb-2" style={{color:'var(--txt)'}}>Apply First — Then Join Discord</h3>
          <p className="text-sm mb-5 leading-relaxed" style={{color:'var(--txt2)'}}>StreamForge is a <strong style={{color:'var(--gold)'}}>paid, exclusive community</strong>. Apply and get approved before accessing Discord.</p>
          <div className="flex flex-col gap-3 mb-5">
            {[['1','Submit Application','Fill the application form with your channel details.'],['2','Approved Within 24hrs','We review and respond via email.'],['3','Payment Details Sent','Payment info comes after approval — no automatic charges.'],['4','Discord Access Granted','Exclusive invite sent after payment confirmation.']].map(([n,t,d])=>(
              <div key={n} className="flex gap-3 items-start p-3 rounded-xl" style={{background:'rgba(255,255,255,.04)',border:'1px solid var(--bdr)'}}>
                <div className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-black flex-shrink-0 text-[#0a0806]" style={{background:'linear-gradient(135deg,#a06820,#e8a83e)'}}>{n}</div>
                <div><div className="text-sm font-bold" style={{color:'var(--txt)'}}>{t}</div><div className="text-xs mt-0.5" style={{color:'var(--txt2)'}}>{d}</div></div>
              </div>
            ))}
          </div>
          <div className="flex gap-3 flex-wrap">
            <Link href="/pricing" onClick={()=>{const m=document.getElementById('dc-modal');if(m){m.style.display='none';document.body.style.overflow=''}}}
              className="btn-gold flex-1 text-center py-2.5 rounded-xl text-sm font-bold no-underline">Apply Now →</Link>
            <a href="mailto:contact.streamforge@gmail.com" className="btn-outline-gold flex-1 text-center py-2.5 rounded-xl text-sm no-underline">Email Us</a>
          </div>
        </div>
      </div>

      {/* ══════════════════════════════════
          HERO — razor-focused, no fluff
      ══════════════════════════════════ */}
      <section className="relative min-h-[90vh] flex items-center justify-center text-center px-5 py-20 overflow-hidden">
        {/* Floating platform pills */}
        {[{c:'#9147ff',t:'Twitch · 2,100+ active',pos:'left-2 top-[30%]'},{c:'#53fc18',t:'Kick · 890+ active',pos:'right-2 top-[28%]'},{c:'#ff4444',t:'YouTube · 660+ active',pos:'left-4 top-[60%]'},{c:'#ff0050',t:'TikTok · 780+ active',pos:'right-4 top-[58%]'}].map((p,i)=>(
          <div key={i} className={`absolute hidden lg:flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-bold iphone-card ${p.pos}`}
            style={{color:p.c,animation:`floatPill 6s ease-in-out ${i*1.8}s infinite`}}>
            <span className="w-2 h-2 rounded-full live-dot" style={{background:p.c}}/>
            {p.t}
          </div>
        ))}

        <div className="max-w-3xl mx-auto">
          <div className="fade-up-1 inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6 text-xs font-bold"
            style={{background:'rgba(232,168,62,.08)',border:'1px solid var(--bdr-g)',color:'var(--gold)'}}>
            <span className="w-2 h-2 rounded-full bg-green-500 live-dot"/>
            Private Creator Network · Twitch · Kick · YouTube · TikTok
          </div>

          <h1 className="fade-up-2 font-extrabold tracking-tight leading-[1.08] mb-5 text-4xl sm:text-5xl lg:text-6xl">
            <span style={{color:'var(--txt)'}}>The Private Network</span><br/>
            <span className="grad-gold">Serious Streamers Actually Use</span>
          </h1>

          <p className="fade-up-3 text-base sm:text-lg max-w-2xl mx-auto mb-6 leading-relaxed" style={{color:'var(--txt2)'}}>
            Stop streaming alone. StreamForge is a vetted creator network where real streamers collaborate, support each other consistently, and grow together — on every platform.
          </p>

          {/* Trust pills */}
          <div className="fade-up-3 flex flex-wrap justify-center gap-2 mb-8">
            {['✓ Real creator collaboration','✓ Platform-compliant','✓ Sustainable growth','✓ Cancel anytime'].map(p=>(
              <span key={p} className="text-xs font-semibold px-3 py-1.5 rounded-full" style={{color:'#22c55e',background:'rgba(22,163,74,.1)',border:'1px solid rgba(22,163,74,.2)'}}>{p}</span>
            ))}
          </div>

          <div className="fade-up-4 flex flex-col sm:flex-row gap-3 justify-center mb-14">
            <Link href="/pricing" className="btn-gold px-8 py-4 rounded-xl text-base font-bold no-underline inline-flex items-center justify-center gap-2">🚀 Start Growing</Link>
            <Link href="/proofs" className="btn-outline-gold px-8 py-4 rounded-xl text-base no-underline inline-flex items-center justify-center gap-2">📊 View Live Results</Link>
          </div>

          {/* Social proof numbers */}
          <div className="fade-up-5 flex flex-wrap justify-center gap-10">
            {[['5,800+','Active Creators'],['$800+','Avg Brand Deal'],['94%','Hit Milestones'],['4.9★','Member Rating']].map(([n,l])=>(
              <div key={l} className="text-center">
                <div className="text-2xl font-extrabold grad-gold">{n}</div>
                <div className="text-xs mt-1" style={{color:'var(--txt3)'}}>{l}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TICKER ── */}
      <div className="border-y overflow-hidden h-9 flex items-center" style={{borderColor:'rgba(232,168,62,.15)',background:'rgba(232,168,62,.03)'}}>
        <div className="ticker-run flex gap-14 whitespace-nowrap">
          {[...Array(2)].map((_,ri)=>(
            <span key={ri} className="flex gap-14">
              {['📈 +94% stream consistency improvement','⭐ Platform milestones reached faster','🔥 5,800+ active creators','👁 Real community activity every stream','🏆 7,000+ daily site visitors','✅ 98% member satisfaction'].map(t=>(
                <span key={t} className="text-xs" style={{color:'var(--txt2)'}}>{t}</span>
              ))}
            </span>
          ))}
        </div>
      </div>

      {/* ── ACTIVITY BAR ── */}
      <div className="flex flex-wrap items-center justify-center gap-6 px-5 py-3 border-b" style={{background:'linear-gradient(90deg,transparent,rgba(232,168,62,.04),transparent)',borderColor:'rgba(232,168,62,.12)'}}>
        <div className="flex items-center gap-2 text-sm"><span className="w-2 h-2 rounded-full bg-green-500 live-dot"/><span className="font-extrabold grad-gold">{members}</span><span style={{color:'var(--txt2)'}}>creators active right now</span></div>
        <div className="flex items-center gap-2 text-sm"><span>👁</span><span className="font-extrabold grad-gold">{visitors.toLocaleString()}</span><span style={{color:'var(--txt2)'}}>streamers on this site today</span></div>
        <div className="flex items-center gap-2 text-sm"><span>⚡</span><span className="font-extrabold grad-gold">{apps}</span><span style={{color:'var(--txt2)'}}>creators joined this week</span></div>
        <div className="text-sm font-bold" style={{color:'var(--ember)'}}>⚠️ Limited spots this month</div>
      </div>

      {/* ── PAIN COPY — the empathy section ── */}
      <section className="py-14 px-5 border-b" style={{borderColor:'var(--bdr)'}}>
        <div className="max-w-3xl mx-auto rv">
          <div className="iphone-card rounded-2xl p-7">
            <div className="stag mb-4">Sound familiar?</div>
            <div className="flex flex-col gap-4 mb-6">
              {[
                {i:'😤',q:'Streaming consistently but stuck at 0–5 viewers?',a:'The algorithm ignores you until you already have activity. It is a cycle that kills most streaming careers before they start.'},
                {i:'💸',q:'Wasted money on promotions that sent ghost followers?',a:"One-time shoutouts don't build real audiences. People click and leave. Your stats stay flat. Your motivation drops."},
                {i:'🤖',q:'Scared of fake viewer services that could get you banned?',a:"You should be. Bot services tank your engagement rate and Twitch detects them. We are not that."},
              ].map(item=>(
                <div key={item.q} className="flex gap-3 items-start p-4 rounded-xl" style={{background:'rgba(255,255,255,.03)',border:'1px solid var(--bdr)'}}>
                  <span className="text-2xl flex-shrink-0">{item.i}</span>
                  <div>
                    <div className="text-sm font-bold mb-1" style={{color:'var(--txt)'}}>{item.q}</div>
                    <div className="text-xs leading-relaxed" style={{color:'var(--txt2)'}}>{item.a}</div>
                  </div>
                </div>
              ))}
            </div>
            <div className="pt-5 border-t" style={{borderColor:'rgba(232,168,62,.15)'}}>
              <p className="text-lg font-extrabold mb-2 grad-gold">StreamForge solves all three.</p>
              <p className="text-sm leading-relaxed" style={{color:'var(--txt2)'}}>It is a private paid network of real creators who collaborate consistently — building the community activity that platforms use to recommend you to organic audiences.</p>
              <Link href="/pricing" className="btn-gold inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-bold no-underline mt-4">See How It Works →</Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section className="py-16 px-5 border-b" id="how" style={{borderColor:'var(--bdr)'}}>
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-10 rv">
            <div className="stag">How It Works</div>
            <h2 className="text-3xl font-extrabold tracking-tight mt-2" style={{color:'var(--txt)'}}>Four Steps to Real Growth</h2>
            <p className="text-sm mt-2 max-w-xl mx-auto" style={{color:'var(--txt2)'}}>No complicated setup. No fake promises. Just a structured creator network that works.</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {HOW.map((h,i)=>(
              <div key={h.n} className={`rv rv-d${(i%4)+1} iphone-card p-6 rounded-2xl text-center`}>
                <div className="w-11 h-11 rounded-full mx-auto mb-4 flex items-center justify-center text-sm font-black text-[#0a0806]"
                  style={{background:'linear-gradient(135deg,#a06820,#e8a83e)',boxShadow:'0 0 18px rgba(232,168,62,.3)'}}>{h.n}</div>
                <div className="text-sm font-bold mb-2" style={{color:'var(--txt)'}}>{h.t}</div>
                <div className="text-xs leading-relaxed" style={{color:'var(--txt2)'}}>{h.d}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PROOF CARDS — CLICKABLE — link to /proofs ── */}
      <section className="py-16 px-5 border-b" id="results" style={{borderColor:'var(--bdr)',background:'linear-gradient(180deg,rgba(124,58,237,.04),transparent)'}}>
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-4 rv">
            <div className="stag">Proof It Works</div>
            <h2 className="text-3xl font-extrabold tracking-tight mt-2" style={{color:'var(--txt)'}}>Real Members. Real Milestones.</h2>
            <p className="text-sm mt-2" style={{color:'var(--txt2)'}}>Platform milestones, category ranking, and income — achieved through StreamForge collaboration</p>
          </div>

          {/* Big click prompt */}
          <div className="text-center mb-8 rv">
            <div className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-bold"
              style={{background:'rgba(232,168,62,.1)',border:'1.5px solid rgba(232,168,62,.3)',color:'var(--gold)'}}>
              👆 Click any card to see their full story + analytics dashboard
            </div>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {STREAMERS.map((s,i)=>{
              const growth=Math.round(((s.stats.avgViewers.after-s.stats.avgViewers.before)/s.stats.avgViewers.before)*100)
              const bdg=BADGE_MAP[s.slug]
              return(
                <Link key={s.slug} href={`/streamers/${s.slug}`}
                  className={`rv rv-d${(i%4)+1} block no-underline proof-card group`}>
                  {/* Always-visible click badge */}
                  <div className="absolute top-2 right-2 z-10 text-[9px] font-bold px-2 py-0.5 rounded-full"
                    style={{background:'rgba(232,168,62,.15)',color:'var(--gold)',border:'1px solid rgba(232,168,62,.3)'}}>
                    Click →
                  </div>
                  <div className="p-4">
                    <div className="flex items-center gap-2 mb-3">
                      <img src={s.avatar} alt={s.name} className="w-10 h-10 rounded-xl border-2 object-cover" style={{borderColor:'rgba(255,255,255,.2)'}}/>
                      <div><div className="text-sm font-bold" style={{color:'var(--txt)'}}>{s.name}</div><div className="text-xs" style={{color:'var(--txt3)'}}>{s.platforms[0]} Streamer</div></div>
                    </div>
                    {bdg&&(
                      <span className="inline-flex items-center gap-1 text-xs font-bold px-2 py-1 rounded-full mb-2"
                        style={{background:bdg.bg,color:bdg.color,border:`1px solid ${bdg.color}40`}}>
                        {bdg.icon} {bdg.label}
                      </span>
                    )}
                    <div className="text-[10px] mb-3" style={{color:'var(--txt3)'}}>⏱ Achieved in {s.joinedDays} days after joining</div>
                    {/* Before → After */}
                    <div className="flex items-center gap-2 p-2.5 rounded-lg mb-3" style={{background:'rgba(255,255,255,.04)'}}>
                      <div className="text-center flex-1"><div className="text-lg font-extrabold" style={{color:'var(--txt3)'}}>{s.stats.avgViewers.before}</div><div className="text-[9px]" style={{color:'var(--txt3)'}}>before</div></div>
                      <div className="text-center"><div className="text-xs font-extrabold" style={{color:'#22c55e'}}>+{growth}%</div><div style={{color:'var(--gold)'}}>→</div></div>
                      <div className="text-center flex-1"><div className="text-lg font-extrabold" style={{color:'var(--gold)'}}>{s.stats.avgViewers.after}</div><div className="text-[9px]" style={{color:'var(--gold)'}}>after ✓</div></div>
                    </div>
                    <p className="text-xs italic leading-relaxed" style={{color:'var(--txt2)'}}>"{s.review.quote.slice(0,75)}..."</p>
                  </div>
                </Link>
              )
            })}
          </div>

          <div className="text-center mt-8 rv">
            <Link href="/proofs" className="btn-gold px-8 py-3.5 rounded-xl text-base font-bold no-underline inline-flex items-center gap-2">
              📊 View All Results & Full Dashboards →
            </Link>
            <p className="text-xs mt-3" style={{color:'var(--txt3)'}}>Click any card above or visit /proofs to see full analytics dashboards</p>
          </div>
        </div>
      </section>

      {/* ── VS SECTION ── */}
      <section className="py-16 px-5 border-b" style={{borderColor:'var(--bdr)'}}>
        <div className="max-w-5xl mx-auto rv">
          <div className="text-center mb-8">
            <div className="stag">Why StreamForge</div>
            <h2 className="text-3xl font-extrabold tracking-tight mt-2" style={{color:'var(--txt)'}}>Stop Going It Alone. Build a Real Creator Network.</h2>
          </div>
          <div className="grid md:grid-cols-2 gap-5">
            <div className="iphone-card p-6 rounded-2xl" style={{borderColor:'rgba(220,38,38,.2)'}}>
              <div className="text-base font-bold mb-4 pb-3 border-b" style={{color:'#ef4444',borderColor:'rgba(255,255,255,.07)'}}>❌ Going It Alone</div>
              {['No community support or peer collaboration','Slow, discouraging solo growth','No structured accountability','Motivation fades without consistent activity','Organic discovery is harder without community signals'].map(t=>(
                <div key={t} className="flex items-start gap-2 py-2 border-b text-xs" style={{borderColor:'rgba(255,255,255,.04)',color:'var(--txt2)'}}>
                  <span className="text-red-400 font-bold flex-shrink-0 mt-0.5">✗</span>{t}
                </div>
              ))}
            </div>
            <div className="iphone-card p-6 rounded-2xl" style={{borderColor:'rgba(232,168,62,.35)',boxShadow:'0 0 30px rgba(232,168,62,.08)'}}>
              <div className="text-base font-bold mb-4 pb-3 border-b" style={{color:'var(--gold)',borderColor:'rgba(255,255,255,.07)'}}>⚡ StreamForge Network</div>
              {['Creators collaborate and support your streams consistently','Real community activity every stream','Structured accountability keeps everyone committed','Motivation stays high with a team behind you','Platform algorithms reward real consistent engagement'].map(t=>(
                <div key={t} className="flex items-start gap-2 py-2 border-b text-xs" style={{borderColor:'rgba(255,255,255,.04)',color:'var(--txt2)'}}>
                  <span className="text-green-400 font-bold flex-shrink-0 mt-0.5">✓</span>{t}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── TEAMS ── */}
      <section className="py-16 px-5 border-b" id="teams" style={{borderColor:'var(--bdr)'}}>
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-10 rv">
            <div className="stag">Teams</div>
            <h2 className="text-3xl font-extrabold tracking-tight mt-2" style={{color:'var(--txt)'}}>Verified Creator Teams</h2>
            <p className="text-sm mt-2" style={{color:'var(--txt2)'}}>Join an elite team for scouting, credibility, and coordinated growth</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {[
              {n:'Jedidiah',handle:'jedidiah_x1',c:'#2563eb',game:'FPS / Competitive',plat:'Twitch & Kick',members:['NightStrike','SkylaFPS','IronSight','CoastalTV','ZephyrFPS'],desc:'Elite FPS competitive squad. If Jedidiah reached out on Discord, verify here — same name, same logo, same team.'},
              {n:'Temmy',handle:'temmy_official',c:'#ec4899',game:'IRL / Variety',plat:'Twitch, TikTok & Kick',members:['TemmyPlays','JaydenIRL','ZaraLive','NightOwlTV'],desc:'IRL & variety content collective. If Temmy contacted you on Discord, verify right here.'},
              {n:'levelUpX',handle:'levelupx_team',c:'#16a34a',game:'Sports / Esports',plat:'Twitch & YouTube',members:['LevelUpX','PulseGamer','ProdigyPete'],desc:'Sports & esports team dominating FIFA, NBA 2K and Rocket League.'},
              {n:'Jeremiah',handle:'jeremiah_official',c:'#a78bfa',game:'Variety / Gaming',plat:'All Platforms',members:['GlitchRex','NoirGaming','CoastalTV'],desc:'Multi-platform creator & community builder. Verified StreamForge team.'},
            ].map((t,i)=>(
              <div key={t.n} className={`rv rv-d${i+1} iphone-card p-5 rounded-2xl`} style={{borderTop:`3px solid ${t.c}`}}>
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-12 h-12 rounded-xl overflow-hidden flex-shrink-0 border-2 flex items-center justify-center text-2xl font-black text-white" style={{borderColor:`${t.c}55`,background:`${t.c}22`}}>{t.n[0]}</div>
                  <div>
                    <div className="text-base font-extrabold" style={{color:t.c}}>{t.n}</div>
                    <div className="text-xs" style={{color:'var(--txt2)'}}>@{t.handle}</div>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full mt-1 inline-block" style={{background:`${t.c}1a`,color:t.c,border:`1px solid ${t.c}44`}}>✦ Verified Team</span>
                  </div>
                </div>
                <p className="text-xs leading-relaxed mb-3" style={{color:'var(--txt2)'}}>{t.desc}</p>
                <div className="text-xs space-y-1.5 mb-3 p-3 rounded-lg" style={{background:'rgba(255,255,255,.03)'}}>
                  <div className="flex justify-between"><span style={{color:'var(--txt3)'}}>🎮 Game</span><span className="font-semibold" style={{color:'var(--txt)'}}>{t.game}</span></div>
                  <div className="flex justify-between"><span style={{color:'var(--txt3)'}}>📡 Platform</span><span className="font-semibold" style={{color:'var(--txt)'}}>{t.plat}</span></div>
                </div>
                <div className="flex items-start gap-2 p-2.5 rounded-lg text-xs" style={{background:'rgba(22,163,74,.06)',border:'1px solid rgba(22,163,74,.2)'}}>
                  <span className="flex-shrink-0">🛡️</span>
                  <span style={{color:'rgba(34,197,94,.9)'}}>Verify on Discord: same name, same logo, same handle = verified.</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="py-16 px-5 border-b" id="faq" style={{borderColor:'var(--bdr)'}}>
        <div className="max-w-3xl mx-auto rv">
          <div className="text-center mb-8">
            <div className="stag">FAQ</div>
            <h2 className="text-3xl font-extrabold tracking-tight mt-2" style={{color:'var(--txt)'}}>Common Questions</h2>
          </div>
          {FAQS.map((f,i)=>(
            <div key={i} className="iphone-card mb-3 rounded-xl overflow-hidden">
              <button onClick={()=>setOpenFaq(openFaq===i?null:i)}
                className="w-full flex justify-between items-start text-left gap-4 p-5 border-none cursor-pointer"
                style={{background:'transparent',color:'var(--txt)',fontFamily:'inherit'}}>
                <span className="text-sm font-bold">{f.q}</span>
                <span className="text-xs flex-shrink-0 mt-0.5 transition-transform" style={{color:'var(--gold)',transform:openFaq===i?'rotate(180deg)':'none'}}>▼</span>
              </button>
              {openFaq===i&&<div className="px-5 pb-5 text-sm leading-relaxed" style={{color:'var(--txt2)'}}>{f.a}</div>}
            </div>
          ))}
          <div className="text-center mt-6">
            <Link href="/faq" className="btn-outline-gold px-6 py-2.5 rounded-xl text-sm no-underline inline-flex items-center gap-2">View All FAQs →</Link>
          </div>
        </div>
      </section>

      {/* ── FINAL CTA ── */}
      <section className="py-24 px-5 text-center" id="apply">
        <div className="max-w-2xl mx-auto rv">
          <div className="stag mb-4">Ready to Grow?</div>
          <h2 className="text-4xl sm:text-5xl font-extrabold tracking-tight mb-4">
            <span className="grad-txt">One Community.<br/>Unlimited Potential.</span>
          </h2>
          <p className="text-lg mb-3 leading-relaxed" style={{color:'var(--txt2)'}}>
            5,800+ creators. Brand deals. Partner status. Consistent income.<br/>
            <strong style={{color:'var(--txt)'}}>This is what structured peer collaboration delivers.</strong>
          </p>
          <p className="text-sm mb-8" style={{color:'var(--txt3)'}}>Plans start at $49/month. Most members earn that back from their first brand deal or sponsorship.</p>
          <div className="grid grid-cols-3 gap-4 mb-8 max-w-sm mx-auto">
            {[['$49','/mo entry'],['$800+','avg brand deal'],['24hrs','to get access']].map(([n,l])=>(
              <div key={l} className="p-4 rounded-2xl iphone-card text-center">
                <div className="text-xl font-extrabold grad-gold">{n}</div>
                <div className="text-xs mt-1" style={{color:'var(--txt3)'}}>{l}</div>
              </div>
            ))}
          </div>
          <div className="flex flex-col sm:flex-row gap-3 justify-center mb-4">
            <Link href="/pricing" className="btn-gold px-10 py-4 rounded-xl text-base font-bold no-underline inline-flex items-center justify-center gap-2">🚀 Join StreamForge — From $49/mo</Link>
            <button onClick={()=>{const m=document.getElementById('dc-modal');if(m){m.style.display='flex';document.body.style.overflow='hidden'}}}
              className="px-8 py-4 rounded-xl text-base font-bold border transition-all cursor-pointer"
              style={{background:'rgba(88,101,242,.15)',color:'#7c87f0',borderColor:'rgba(88,101,242,.3)',fontFamily:'inherit'}}>
              💬 Ask Us Anything
            </button>
          </div>
          <p className="text-xs" style={{color:'var(--txt3)'}}>Secure checkout · Cancel anytime · Discord access within 24 hours</p>
        </div>
      </section>

      {/* ── STICKY MOBILE CTA ── */}
      <div className="fixed bottom-0 left-0 right-0 z-[300] md:hidden border-t" style={{background:'var(--glass)',backdropFilter:'blur(18px)',WebkitBackdropFilter:'blur(18px)',borderColor:'rgba(232,168,62,.2)'}}>
        <div className="px-4 py-3">
          <Link href="/pricing" className="btn-gold w-full block text-center py-3.5 rounded-xl text-sm font-bold no-underline">🔥 Join StreamForge — Apply Now</Link>
          <p className="text-center text-xs mt-1.5" style={{color:'var(--txt3)'}}>⚡ Limited spots · Paid community · 24hr response</p>
        </div>
      </div>

      {/* ── NOTIFICATIONS ── */}
      <div className="fixed bottom-5 left-4 z-[1000] flex flex-col gap-2 pointer-events-none">
        {notifs.map(n=>(
          <div key={n.id} className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs min-w-[220px] max-w-[280px]"
            style={{background:'rgba(10,8,26,.96)',border:'1px solid rgba(232,168,62,.2)',backdropFilter:'blur(18px)',boxShadow:'0 4px 20px rgba(0,0,0,.5)',animation:'notifIn .3s ease'}}>
            <div className="w-7 h-7 rounded-full flex items-center justify-center text-sm flex-shrink-0" style={{background:`${n.c}1a`,color:n.c}}>{n.i}</div>
            <span style={{color:'var(--txt2)'}}>{n.t}</span>
          </div>
        ))}
      </div>

    </div>
  )
}
