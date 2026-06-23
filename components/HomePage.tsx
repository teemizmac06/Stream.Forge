'use client'
import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'

/* ── Avatar helper — unique per name ── */
function strHash(s: string) { let h=0; for(let i=0;i<s.length;i++){h=((h<<5)-h)+s.charCodeAt(i);h|=0;} return Math.abs(h); }
const AVIDS = [1,2,3,4,5,6,7,8,9,10,11,12,14,15,16,17,18,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52]
function av(name: string) { return `https://i.pravatar.cc/150?img=${AVIDS[strHash(name)%AVIDS.length]}` }

/* ── DATA ── */
const TW = [
  {n:'Beaulo',u:'beaulo',g:'Rainbow Six Siege',c:'fps',v:11200,t:'Diamond Ranked Queue'},
  {n:'Pengu',u:'pengu',g:'Rainbow Six Siege',c:'fps',v:8800,t:'Pro League Scrims'},
  {n:'Clix',u:'clix',g:'Fortnite',c:'fps',v:18700,t:'Zero Build Cash Cup',boost:true},
  {n:'Bugha',u:'bugha',g:'Fortnite',c:'fps',v:14200,t:'FNCS Qualifier Day 2'},
  {n:'Mongraal',u:'mongraal',g:'Fortnite',c:'fps',v:11300,t:'EU Arena Top Lobby'},
  {n:'Aydan',u:'aydan',g:'Warzone',c:'fps',v:13800,t:'Ranked Resurgence Grind',boost:true},
  {n:'s1mple',u:'s1mple',g:'CS2',c:'fps',v:32000,t:'FPL Match Live',boost:true},
  {n:'shroud',u:'shroud',g:'CS2',c:'fps',v:28700,t:'Premier 18k Rating'},
  {n:'ImperialHal',u:'imperialhal',g:'Apex Legends',c:'fps',v:17600,t:'ALGS Scrims',boost:true},
  {n:'Buddha',u:'buddha',g:'GTA V',c:'variety',v:21000,t:'NoPixel New Arc',boost:true},
  {n:'Sykkuno',u:'sykkuno',g:'GTA V',c:'variety',v:16400,t:'NoPixel Chill RP'},
  {n:'Tyler1',u:'tyler1',g:'League of Legends',c:'strategy',v:31400,t:'Iron to Challenger',boost:true},
  {n:'Faker',u:'faker',g:'League of Legends',c:'strategy',v:44800,t:'T1 Scrim Watch'},
  {n:'GMHikaru',u:'gmhikaru',g:'Chess',c:'strategy',v:18400,t:'Speed Chess Championship',boost:true},
  {n:'Asmongold',u:'asmongold',g:'World of Warcraft',c:'rpg',v:22400,t:'Mythic+ Raid',boost:true},
  {n:'Agent00',u:'agent00',g:'NBA 2K',c:'sports',v:12400,t:'2K League Qualifying',boost:true},
  {n:'Tubbo',u:'tubbo',g:'Minecraft',c:'variety',v:14600,t:'SMP Season 4',boost:true},
  {n:'Jinnytty',u:'jinnytty',g:'IRL',c:'irl',v:9800,t:'Seoul City Walk'},
] as const

const KK = [
  {n:'Swagg',u:'swagg',g:'Warzone',c:'fps',v:14800,t:'Ranked Resurgence',boost:true},
  {n:'Mutex',u:'mutex',g:'Warzone',c:'fps',v:9100,t:'Solo Warzone Ranked'},
  {n:'Clix',u:'clix',g:'Fortnite',c:'fps',v:16200,t:'Zero Build Ranked',boost:true},
  {n:'Tfue',u:'tfue',g:'Fortnite',c:'fps',v:14100,t:'Solo Cash Cup Finals'},
  {n:'N3on',u:'n3on',g:'Just Chatting',c:'irl',v:22400,t:'Reacting to Viral Clips'},
  {n:'Jack Doherty',u:'jackdoherty',g:'IRL',c:'irl',v:18600,t:'Live Debate'},
  {n:'Adin Ross',u:'adinross',g:'Just Chatting',c:'irl',v:48200,t:'IRL Miami Beach',boost:true},
  {n:'Buddha',u:'buddha',g:'GTA V',c:'variety',v:19200,t:'NoPixel New Character'},
  {n:'Summit1g',u:'summit1g',g:'Variety',c:'variety',v:18900,t:'Tarkov Wipe Day',boost:true},
  {n:'Trainwreckstv',u:'trainwreckstv',g:'Variety',c:'variety',v:28400,t:'Live with the Boys',boost:true},
  {n:'YourRAGE',u:'yourrage',g:'Just Chatting',c:'irl',v:12800,t:'Viewer Call-In'},
  {n:'DDG',u:'ddg',g:'Just Chatting',c:'irl',v:11400,t:'Music + Gaming'},
] as const

const YT = [
  {n:'FaZe Jev',g:'FPS',c:'fps',sub:'7M',t:'COD Warzone Season 3',link:'https://youtube.com/@FaZeJev'},
  {n:'NickMercs',g:'FPS',c:'fps',sub:'7.2M',t:'Warzone Ranked',link:'https://youtube.com/@NickMercs',boost:true},
  {n:'Markiplier',g:'Variety',c:'variety',sub:'36M',t:'Horror Game Playthrough',link:'https://youtube.com/@markiplier',boost:true},
  {n:'Jacksepticeye',g:'Variety',c:'variety',sub:'32M',t:'Indie Game Deep Dive',link:'https://youtube.com/@jacksepticeye'},
  {n:'Dream',g:'Minecraft',c:'rpg',sub:'32M',t:'Minecraft Manhunt Finale',link:'https://youtube.com/@Dream',boost:true},
  {n:'TommyInnit',g:'Minecraft',c:'rpg',sub:'15M',t:'DSMP Reunion Special',link:'https://youtube.com/@TommyInnit'},
  {n:'MKBHD',g:'Tech',c:'tech',sub:'18M',t:'Best Phone 2026 Review',link:'https://youtube.com/@mkbhd',boost:true},
  {n:'MoistCr1TiKaL',g:'Commentary',c:'irl',sub:'15M',t:'Internet Drama Breakdown',link:'https://youtube.com/@penguinz0',boost:true},
  {n:'Ludwig',g:'Variety',c:'variety',sub:'4.8M',t:'Chess vs Poker Challenge',link:'https://youtube.com/@Ludwig'},
  {n:'Valkyrae',g:'Variety',c:'variety',sub:'4.1M',t:'New Game Release',link:'https://youtube.com/@Valkyrae'},
] as const

const TT = [
  {n:'Zach King',g:'Comedy/FX',flw:'82M',t:'Magic Trick',link:'https://tiktok.com/@zachking',boost:true},
  {n:'Funny Mike',g:'Comedy',flw:'14M',t:'Family Prank',link:'https://tiktok.com/@funnymike'},
  {n:'Jason Derulo',g:'Music',flw:'58M',t:'Song Preview',link:'https://tiktok.com/@jasonderulo'},
  {n:'Logan Paul',g:'Entertainment',flw:'23M',t:'Prime Challenge',link:'https://tiktok.com/@loganpaul'},
  {n:'Liza Koshy',g:'Comedy',flw:'30M',t:'Comedy Skit',link:'https://tiktok.com/@lizakoshy',boost:true},
  {n:'Brent Rivera',g:'Entertainment',flw:'42M',t:'Challenge Video',link:'https://tiktok.com/@brentrivera'},
  {n:'SSSniperWolf',g:'Gaming',flw:'22M',t:'Gaming Reactions',link:'https://tiktok.com/@sssniperwolf'},
  {n:'Alix Earle',g:'Lifestyle',flw:'11M',t:'GRWM Story Time',link:'https://tiktok.com/@alixearle'},
] as const

const ACHS = [
  {n:'GlitchRex',plat:'Twitch',badge:'partner',label:'Twitch Partner',days:74,q:'Went from 40 avg viewers to Partner in 74 days. The real viewer system changed everything.'},
  {n:'SkylaFPS',plat:'Twitch',badge:'partner',label:'Twitch Partner',days:92,q:'Partner in under 3 months. Community members showed up every single stream.'},
  {n:'TemmyCreator',plat:'Kick',badge:'aff',label:'Kick Affiliate',days:14,q:'Reached Affiliate milestone quickly. The matching put me in front of the right creator community.'},
  {n:'CoastalTV',plat:'Twitch',badge:'aff',label:'Twitch Affiliate',days:11,q:'Reached Affiliate milestone in record time. Had 3 viewers before. Now averaging 60+ every stream.'},
  {n:'NightOwlTV',plat:'YouTube',badge:'top',label:'Top Category Rank',days:30,q:'Ranked #4 in my game category within 30 days. Organic reach exploded.'},
  {n:'ZaraLive',plat:'TikTok',badge:'inc',label:'First Brand Deal',days:45,q:'$800 brand deal through the network. More than a month of promo spend.'},
  {n:'IronSight',plat:'Twitch',badge:'aff',label:'Twitch Affiliate',days:9,q:'One of the fastest milestone achievements we have seen. Peer support makes the difference.'},
  {n:'PulseGamer',plat:'Kick',badge:'top',label:'Top Category Rank',days:21,q:'Ranked top 10 in Sports on Kick. The team cross-promotion is real.'},
]

const REVS = [
  {n:'Marcus Rivera',h:'@marcusplays_tw',p:'twitch',q:'StreamForge changed my career. From 80 to 1,200 viewers in 3 months. Legitimately powerful.'},
  {n:'Sophie Chen',h:'@sophiegames_kick',p:'kick',q:'Joined Team Temmy — community support incredible. Discord from 40 to 800 members.'},
  {n:'David Osei',h:'@davidkicks',p:'kick',q:'Hit affiliate in 14 days. Skeptical about paying but results are undeniable.'},
  {n:'Aaliyah Brooks',h:'@aaliyahfps',p:'twitch',q:'Managing Kick and TikTok simultaneously — StreamForge helped both platforms at once.'},
  {n:'Tyler Washington',h:'@tylerb_live',p:'twitch',q:'The placement system is fair. I finally get real exposure instead of being lost.'},
  {n:'Priya Sharma',h:'@priyagames',p:'youtube',q:'Best investment for my streaming career. Credibility sponsors actually noticed.'},
  {n:'James Okafor',h:'@jamesokafor_ng',p:'twitch',q:'Nigerian streamer. Open to worldwide — connected me genuinely with a global audience.'},
  {n:'Jade Li',h:'@jadelivestream',p:'twitch',q:'Stuck at 50 viewers for a year. After StreamForge I hit 400 concurrent in 60 days.'},
  {n:'DeShawn Carter',h:'@deshawnfps',p:'twitch',q:'Real viewer groups worth the price alone. People in my chat within minutes every stream.'},
  {n:'Nathan Park',h:'@nathanpark_gg',p:'twitch',q:'Hit Twitch Partner in 8 months. The Elite coaching was genuinely game changing.'},
  {n:'Kezia Nwosu',h:'@keziafps',p:'kick',q:'First brand deal through the network. Elite plan paid for itself 10x over.'},
  {n:'Caleb Monroe',h:'@calebgaming',p:'youtube',q:'Collab matching is the best feature. Found three long-term partners in my first week.'},
]

const NOTIFS = [
  {i:'📈',t:'🔥 Marcus just hit a new milestone from a live session',c:'#e8a83e'},
  {i:'👁',t:'CoastalTV had a strong community session tonight',c:'#0891b2'},
  {i:'⚡',t:'TemmyPlays: 60 community members joined their session',c:'#f59e0b'},
  {i:'✅',t:'SkylaFPS reached Twitch Partner status',c:'#16a34a'},
  {i:'🚀',t:'GlitchRex earned Verified badge',c:'#9147ff'},
  {i:'💬',t:'NightOwlTV: chat going — 890 messages sent',c:'#a78bfa'},
  {i:'🎮',t:'IronSight reached Affiliate milestone',c:'#53fc18'},
  {i:'🏆',t:'ZaraLive ranked Top 5 in IRL feed',c:'#e8a83e'},
  {i:'💰',t:'PulseGamer secured their first brand partnership',c:'#ea580c'},
]

const GOALS = [
  {key:'partner',icon:'🏆',title:'Achieve Partner',desc:'Serious creator ready for the Partner badge.',msg:"You're aiming for Partner — members hit it 3× faster with real viewer groups and coaching."},
  {key:'affiliate',icon:'⭐',title:'Attain Affiliate',desc:'50 followers, 7 days, 3 avg viewer requirements.',msg:'14 days to affiliate is our average. Real viewers get you there fast.'},
  {key:'rank',icon:'📊',title:'Rank in Category',desc:'Dominate the discovery feed in your niche.',msg:'Members coordinate watch events that push you up the discovery feed every stream.'},
  {key:'income',icon:'💰',title:'Make Income',desc:'Real revenue — subs, bits, brand deals.',msg:'Elite plan includes brand deal introductions and monetization coaching.'},
  {key:'fun',icon:'🎮',title:'Stream for Fun',desc:'You love it and want a community that shows up.',msg:'Even casual streamers deserve real engaged audience. Join the community.'},
  {key:'promo',icon:'📣',title:'Beat Promoters',desc:'Tired of going it alone? Peer collaboration delivers.',msg:"One-time shoutouts don't build real viewers. StreamForge gives you permanent groups."},
  {key:'grow',icon:'👥',title:'Build a Community',desc:'Want loyal fans who return every stream.',msg:'Members support each other — your regulars become their regulars.'},
  {key:'brand',icon:'🤝',title:'Get Brand Deals',desc:'Connect with brands and sponsorship opportunities.',msg:'Elite members get direct introductions to brands looking for creators.'},
  {key:'other',icon:'✏️',title:'Other',desc:'Something else? Tell us below.',msg:'Tell us your goal and we will explain exactly how StreamForge helps.'},
]

const HOW = [
  {n:'01',t:'Join the Private Network',d:'Apply and get access to our exclusive paid community of serious streamers across all platforms.'},
  {n:'02',t:'Get Placed Into Active Groups',d:"You're matched into live engagement groups based on your category, schedule and platform."},
  {n:'03',t:'Real Viewers Join & Interact',d:'Creators in your group collaborate on your streams — building community activity that supports organic discovery.'},
  {n:'04',t:'Track Your Growth',d:'Track your channel activity and community growth in your exclusive member analytics dashboard.'},
  {n:'05',t:'Collab & Co-Stream',d:'Get matched with compatible streamers for co-streams — both audiences grow at the same time.'},
  {n:'06',t:'Unlock Brand Deals',d:'Elite members get introduced directly to brands looking for gaming and streaming creators.'},
]

const plat_colors: Record<string,string> = {twitch:'#9147ff',kick:'#53fc18',youtube:'#ff4444',tiktok:'#ff0050'}

export default function HomePage() {
  const [twCat, setTwCat] = useState('all')
  const [kkCat, setKkCat] = useState('all')
  const [ytCat, setYtCat] = useState('all')
  const [twCount, setTwCount] = useState(8)
  const [kkCount, setKkCount] = useState(8)
  const [ytCount, setYtCount] = useState(8)
  const [ttCount, setTtCount] = useState(8)
  const [selGoals, setSelGoals] = useState<string[]>([])
  const [otherGoal, setOtherGoal] = useState('')
  const [visitors, setVisitors] = useState(7284)
  const [members, setMembers] = useState(258)
  const [apps, setApps] = useState(17)
  const [notifs, setNotifs] = useState<{i:string,t:string,c:string,id:number}[]>([])
  const notifIdx = useRef(0)
  const [openFaq, setOpenFaq] = useState<number|null>(null)

  useEffect(() => {
    // Reveal animation
    const obs = new IntersectionObserver(entries => {
      entries.forEach(e => { if(e.isIntersecting){(e.target as HTMLElement).classList.add('vis'); obs.unobserve(e.target)} })
    }, {threshold:.1})
    document.querySelectorAll('.rv').forEach(el => obs.observe(el))

    // Live counters
    const today = new Date(); const doy = Math.floor((today.getTime()-new Date(today.getFullYear(),0,0).getTime())/86400000)
    const seed = doy*17+3847
    setVisitors(6800+(seed%1600))
    setMembers(248+(seed%36))
    setApps(9+(seed%13))
    const iv1 = setInterval(()=>setVisitors(v=>v+Math.floor(Math.random()*2+1)),14000)
    const iv2 = setInterval(()=>{if(Math.random()>.7)setMembers(m=>m+1)},50000)
    const iv3 = setInterval(()=>{if(Math.random()>.6)setApps(a=>a+1)},120000)

    // Notifications
    function fireNotif(){
      const n = NOTIFS[notifIdx.current%NOTIFS.length]; notifIdx.current++
      const id = Date.now()
      setNotifs(prev=>[...prev.slice(-2),{...n,id}])
      setTimeout(()=>setNotifs(prev=>prev.filter(x=>x.id!==id)),5500)
    }
    const iv4 = setInterval(fireNotif, 7500)
    setTimeout(fireNotif, 2000)

    // IP language detection
    fetch('https://ipapi.co/json/',{signal:AbortSignal.timeout?AbortSignal.timeout(3000):undefined})
      .then(r=>r.json()).then(d=>{
        const map:Record<string,string>={FR:'fr',BE:'fr',CH:'fr',CA:'fr',SN:'fr',CI:'fr',
          ES:'es',MX:'es',AR:'es',CO:'es',PE:'es',VE:'es',BR:'pt',PT:'pt',DE:'de',AT:'de'}
        const detected = map[d.country_code] || (navigator.language||'en').slice(0,2)
        if(detected!=='en') window.dispatchEvent(new CustomEvent('sf-lang',{detail:detected}))
      }).catch(()=>{})

    return ()=>{clearInterval(iv1);clearInterval(iv2);clearInterval(iv3);clearInterval(iv4)}
  }, [])

  function toggleGoal(key:string){
    setSelGoals(prev=>prev.includes(key)?prev.filter(g=>g!==key):[...prev,key])
  }

  function buildMailto(){
    const subject = `StreamForge Application [${selGoals.join(', ')||'General'}]`
    const body = ['Hello StreamForge Team,','','I want to apply to join StreamForge.','','Goals: '+selGoals.join(', ')+(otherGoal?`, Other: ${otherGoal}`:''),'','(Complete the form on the pricing page)','','streamforge.gg'].join('\n')
    return `mailto:contact.streamforge@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
  }

  const twFiltered = TW.filter((s:any)=>twCat==='all'||s.c===twCat)
  const kkFiltered = KK.filter((s:any)=>kkCat==='all'||s.c===kkCat)
  const ytFiltered = YT.filter((s:any)=>ytCat==='all'||s.c===ytCat)

  return (
    <div style={{position:'relative',zIndex:1}}>

      {/* ── AMBIENT BG ── */}
      <div className="fixed inset-0 -z-10 pointer-events-none" style={{background:'radial-gradient(ellipse 60% 40% at 15% 20%,rgba(124,58,237,.18),transparent 65%),radial-gradient(ellipse 50% 50% at 85% 80%,rgba(8,145,178,.15),transparent 65%),var(--bg)'}}/>

      {/* ── DISCORD MODAL ── */}
      <div id="dc-modal" className="fixed inset-0 z-[500] items-center justify-content-center px-4" style={{display:'none',background:'rgba(0,0,0,.8)',backdropFilter:'blur(6px)'}}>
        <div className="iphone-card rounded-2xl p-7 max-w-md w-full mx-auto relative" style={{background:'#0e0e28',border:'1px solid rgba(232,168,62,.25)',maxHeight:'90vh',overflowY:'auto'}}>
          <button onClick={()=>{const m=document.getElementById('dc-modal');if(m){m.style.display='none';document.body.style.overflow=''}}}
            className="absolute top-3 right-3 text-xs px-2 py-1 rounded border transition-colors" style={{background:'transparent',borderColor:'var(--bdr)',color:'var(--txt2)'}}>✕</button>
          <div className="text-3xl mb-3">💬</div>
          <h3 className="text-lg font-extrabold mb-2" style={{color:'var(--txt)'}}>Apply First — Then Join Discord</h3>
          <p className="text-sm mb-5 leading-relaxed" style={{color:'var(--txt2)'}}>StreamForge is a <strong style={{color:'var(--gold)'}}>paid, exclusive community</strong>. Apply and get approved before accessing Discord.</p>
          <div className="flex flex-col gap-3 mb-5">
            {[['1','Submit Application','Fill the form with your channel details.'],['2','Approved Within 24hrs','We review and respond via email.'],['3','Payment Details Sent','After approval, payment info comes via email.'],['4','Discord Access Granted','Exclusive invite sent after payment confirmation.']].map(([n,t,d])=>(
              <div key={n} className="flex gap-3 items-start p-3 rounded-xl" style={{background:'rgba(255,255,255,.04)',border:'1px solid var(--bdr)'}}>
                <div className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-black flex-shrink-0 text-[#0a0806]" style={{background:'linear-gradient(135deg,#a06820,#e8a83e)'}}>{n}</div>
                <div><div className="text-sm font-bold" style={{color:'var(--txt)'}}>{t}</div><div className="text-xs mt-0.5" style={{color:'var(--txt2)'}}>{d}</div></div>
              </div>
            ))}
          </div>
          <div className="flex gap-3 flex-wrap">
            <Link href="/pricing" onClick={()=>{const m=document.getElementById('dc-modal');if(m){m.style.display='none';document.body.style.overflow=''}}} className="btn-gold flex-1 text-center py-2.5 rounded-xl text-sm font-bold no-underline">Apply Now →</Link>
            <a href="mailto:contact.streamforge@gmail.com" className="btn-outline-gold flex-1 text-center py-2.5 rounded-xl text-sm no-underline">Email Us</a>
          </div>
          <p className="text-xs text-center mt-3" style={{color:'var(--txt3)'}}>contact.streamforge@gmail.com</p>
        </div>
      </div>

      {/* ── HERO ── */}
      <section className="relative min-h-[95vh] flex items-center justify-center text-center px-5 py-24 overflow-hidden">
        {/* Floating pills */}
        {[{c:'#9147ff',t:'Twitch · 2,100+ live'},{c:'#53fc18',t:'Kick · 890+ live'},{c:'#ff4444',t:'YouTube · 660+ live'},{c:'#ff0050',t:'TikTok · 780+ live'}].map((p,i)=>(
          <div key={i} className="absolute hidden lg:flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold iphone-card"
            style={{color:p.c, animationName:'floatPill',animationDuration:'6s',animationTimingFunction:'ease-in-out',animationIterationCount:'infinite',animationDelay:`${i*1.8}s`,
              left:i%2===0?'2%':'auto', right:i%2===1?'2%':'auto', top:i<2?'30%':'55%'}}>
            <span className="w-2 h-2 rounded-full live-dot" style={{background:p.c}}/>
            {p.t}
          </div>
        ))}

        <div className="max-w-4xl mx-auto">
          <div className="fade-up-1 inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6 text-xs font-bold" style={{background:'rgba(232,168,62,.08)',border:'1px solid var(--bdr-g)',color:'var(--gold)'}}>
            <span className="w-2 h-2 rounded-full bg-green-500 live-dot"/>
            Creator Collaboration Network · Twitch · Kick · YouTube · TikTok
          </div>

          <h1 className="fade-up-2 font-extrabold tracking-tight leading-[1.08] mb-4 text-4xl sm:text-5xl lg:text-6xl">
            <span className="block" style={{color:'var(--txt)'}}>Join a Creator Networking Community —</span>
            <span className="grad-gold block">Build Consistent Stream Growth Together</span>
          </h1>

          <p className="fade-up-3 text-base sm:text-lg max-w-2xl mx-auto mb-6 leading-relaxed" style={{color:'var(--txt2)'}}>
            StreamForge is a streamer collaboration network. Connect with active creators, build consistent community activity, and grow your channel through genuine peer support — on every platform.
          </p>

          <div className="fade-up-3 flex flex-wrap justify-center gap-2 mb-8">
            {['✓ Genuine creator collaboration','✓ Consistent community activity','✓ Platform-compliant networking','✓ Sustainable, long-term growth'].map(p=>(
              <span key={p} className="text-xs font-semibold px-3 py-1.5 rounded-full" style={{color:'#22c55e',background:'rgba(22,163,74,.1)',border:'1px solid rgba(22,163,74,.2)'}}>{p}</span>
            ))}
          </div>

          <div className="fade-up-4 flex flex-col sm:flex-row gap-3 justify-center mb-14">
            <Link href="/pricing" className="btn-gold px-8 py-4 rounded-xl text-base font-bold no-underline inline-flex items-center justify-center gap-2">🚀 Start Growing</Link>
            <a href="#proof" className="btn-outline-gold px-8 py-4 rounded-xl text-base no-underline inline-flex items-center justify-center gap-2">📊 View Live Results</a>
          </div>

          <div className="fade-up-5 flex flex-wrap justify-center gap-8">
            {[['5,800+','Active Creators'],['$800+','Avg First Brand Deal'],['94%','Reach Milestones'],['4.9★','Member Rating']].map(([n,l])=>(
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
              {['📈 +94% stream consistency improvement','⭐ Platform milestones reached faster','🔥 5,800+ active members','👁 Strong community activity metrics','🏆 7,000+ daily site visitors','✅ 98% member satisfaction'].map(t=>(
                <span key={t} className="text-xs" style={{color:'var(--txt2)'}}>{t}</span>
              ))}
            </span>
          ))}
        </div>
      </div>

      {/* ── ACTIVITY BAR ── */}
      <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-8 px-5 py-3 border-b" style={{background:'linear-gradient(90deg,transparent,rgba(232,168,62,.04),transparent)',borderColor:'rgba(232,168,62,.15)'}}>
        <div className="flex items-center gap-2 text-sm"><span className="w-2 h-2 rounded-full bg-green-500 live-dot"/><span className="font-extrabold grad-gold">{members}</span><span style={{color:'var(--txt2)'}}>creators active right now</span></div>
        <div className="flex items-center gap-2 text-sm"><span>👁</span><span className="font-extrabold grad-gold">{visitors.toLocaleString()}</span><span style={{color:'var(--txt2)'}}>streamers visiting today</span></div>
        <div className="flex items-center gap-2 text-sm"><span>⚡</span><span className="font-extrabold grad-gold">{apps}</span><span style={{color:'var(--txt2)'}}>creators joined this week</span></div>
        <div className="text-sm font-bold" style={{color:'var(--ember)'}}>⚠️ Exclusive network — limited membership</div>
      </div>

      {/* ── HERO PAIN COPY (from image) ── */}
      <section className="py-14 px-5 border-b" style={{borderColor:'var(--bdr)',background:'linear-gradient(180deg,rgba(124,58,237,.05),transparent)'}}>
        <div className="max-w-3xl mx-auto rv">
          <div className="iphone-card rounded-2xl p-7">
            <div className="flex flex-col gap-5 mb-6">
              {[
                {icon:'🎯',q:'Are you trying to build a streaming community?',a:'Looking for consistent peer support and creator collaboration?'},
                {icon:'😤',q:'Want to reach platform milestones more consistently?',a:"Looking for structured networking with other serious creators?"},
                {icon:'💸',q:'Tired of wasting money on promotions that don\'t work?',a:'Ready for a structured approach to creator growth?'},
              ].map(item=>(
                <div key={item.q} className="flex gap-3 items-start">
                  <span className="text-2xl flex-shrink-0">{item.icon}</span>
                  <div>
                    <div className="text-sm font-bold mb-1" style={{color:'var(--txt)'}}>{item.q}</div>
                    <div className="text-xs" style={{color:'var(--txt2)'}}>{item.a}</div>
                  </div>
                </div>
              ))}
            </div>
            <div className="pt-5 border-t" style={{borderColor:'rgba(232,168,62,.15)'}}>
              <p className="text-lg font-extrabold mb-2 grad-gold">You&apos;re in the right place.</p>
              <p className="text-sm mb-4 leading-relaxed" style={{color:'var(--txt2)'}}>Welcome to <strong style={{color:'var(--txt)'}}>StreamForge</strong> — the community built for streamers who are serious about growth.</p>
              <div className="grid grid-cols-2 gap-2">
                {['🚀 Build a consistent, active community around your channel','🎯 Improve stream consistency and category presence','🤝 Connect with creators who support your content','🏆 Reach platform milestones through structured collaboration'].map(b=>(
                  <div key={b} className="text-xs" style={{color:'var(--txt2)'}}>{b}</div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── GOALS (What Are You Trying to Achieve) ── */}
      <section className="py-16 px-5 border-b" style={{borderColor:'var(--bdr)'}}>
        <div className="max-w-5xl mx-auto rv">
          <div className="text-center mb-6">
            <div className="stag">Who Is This For?</div>
            <h2 className="text-3xl font-extrabold tracking-tight mt-2 mb-2" style={{color:'var(--txt)'}}>What Are You Trying to Achieve?</h2>
            <p className="text-sm mb-3" style={{color:'var(--txt2)'}}>Tap the cards below that apply to you — you can select multiple</p>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold" style={{background:'rgba(232,168,62,.1)',border:'1px solid rgba(232,168,62,.25)',color:'var(--gold)'}}>
              <span>👆</span> Tap to select · Select as many as you want
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 mb-6">
            {GOALS.map(g=>{
              const sel = selGoals.includes(g.key)
              return (
                <div key={g.key} onClick={()=>toggleGoal(g.key)} className="relative p-4 rounded-2xl cursor-pointer transition-all tilt-card select-none"
                  style={{background:sel?'rgba(232,168,62,.1)':'var(--card)',border:`1px solid ${sel?'rgba(232,168,62,.4)':'var(--bdr)'}`,boxShadow:sel?'0 0 20px rgba(232,168,62,.12)':'none'}}>
                  {sel && <div className="absolute top-2 right-2 w-5 h-5 rounded-full flex items-center justify-center text-xs font-black text-[#0a0806]" style={{background:'var(--gold-lo)'}}>✓</div>}
                  <div className="text-2xl mb-2">{g.icon}</div>
                  <div className="text-sm font-bold mb-1" style={{color:'var(--txt)'}}>{g.title}</div>
                  <div className="text-xs leading-relaxed" style={{color:'var(--txt2)'}}>{g.desc}</div>
                  <div className="text-xs mt-2 font-semibold" style={{color:sel?'var(--gold)':'var(--txt3)'}}>{sel?'Selected ✓':'Tap to select'}</div>
                  {g.key==='other' && sel && (
                    <textarea value={otherGoal} onChange={e=>{e.stopPropagation();setOtherGoal(e.target.value)}} onClick={e=>e.stopPropagation()}
                      placeholder="Type your goal here..." className="w-full mt-2 px-2 py-1.5 text-xs rounded-lg resize-none" rows={2}/>
                  )}
                </div>
              )
            })}
          </div>

          {selGoals.length>0 && (
            <div className="iphone-card rounded-2xl p-6 text-center">
              <p className="text-sm font-bold mb-1" style={{color:'var(--gold)'}}>
                {selGoals.length} goal{selGoals.length>1?'s':''} selected — here&apos;s why StreamForge fits you
              </p>
              <p className="text-sm mb-5" style={{color:'var(--txt2)'}}>
                {GOALS.find(g=>g.key===selGoals[0])?.msg}
              </p>
              <div className="flex flex-wrap justify-center gap-3">
                <Link href="/pricing" className="btn-gold px-6 py-3 rounded-xl text-sm font-bold no-underline">Join the Community →</Link>
                <button onClick={()=>{const m=document.getElementById('dc-modal');if(m){m.style.display='flex';document.body.style.overflow='hidden'}}}
                  className="px-6 py-3 rounded-xl text-sm font-bold border transition-all" style={{background:'rgba(88,101,242,.15)',color:'#7c87f0',borderColor:'rgba(88,101,242,.3)'}}>
                  💬 Discord
                </button>
              </div>
              <p className="text-xs mt-3" style={{color:'var(--txt3)'}}>Paid community · Apply below · Payment details after approval</p>
            </div>
          )}
        </div>
      </section>

      {/* ── PROBLEM / SOLUTION ── */}
      <section className="py-16 px-5 border-b" style={{borderColor:'var(--bdr)',background:'linear-gradient(180deg,rgba(124,58,237,.04),transparent 60%)'}}>
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-10 items-start">
          <div className="rv">
            <div className="stag">The Problem</div>
            <h2 className="text-3xl font-extrabold tracking-tight mt-2 mb-6 leading-tight" style={{color:'var(--txt)'}}>Why Most Streamers Struggle to Build Momentum</h2>
            {[{icon:'😔',t:'Zero discovery',d:'Without an active community, streams feel isolated — making it hard to build any momentum.'},
              {icon:'🤖',t:'Bots get you banned',d:'Paid promotion services rarely deliver lasting results and can put your channel at risk.'},
              {icon:'😩',t:'Streaming alone is demoralising',d:'Streaming without peer support or community activity makes it hard to stay motivated.'},
              {icon:'💸',t:'Promoters waste money',d:'One-time promotions rarely build genuine long-term community engagement.'},
            ].map(p=>(
              <div key={p.t} className="iphone-card flex gap-3 items-start p-4 rounded-xl mb-3">
                <span className="text-2xl flex-shrink-0 mt-0.5">{p.icon}</span>
                <div><div className="text-sm font-bold mb-1" style={{color:'var(--txt)'}}>{p.t}</div><div className="text-xs leading-relaxed" style={{color:'var(--txt2)'}}>{p.d}</div></div>
              </div>
            ))}
          </div>
          <div className="rv rv-d2">
            <div className="stag" style={{background:'rgba(22,163,74,.1)',borderColor:'rgba(22,163,74,.25)',color:'#22c55e'}}>The StreamForge Solution</div>
            <h2 className="text-3xl font-extrabold tracking-tight mt-2 mb-6 leading-tight" style={{color:'var(--txt)'}}>A Community That <span className="grad-gold">Actually Works</span></h2>
            {[{t:'Creators who genuinely support each other',d:'Every member is a verified creator who participates in mutual collaboration — genuine peer support, not paid promotion.'},
              {t:'Consistent community activity',d:'Active groups collaborate consistently, creating the community activity that builds real channel momentum.'},
              {t:'Growth that builds over time',d:'Consistent activity → stronger community → organic discovery → more followers. It compounds naturally.'},
              {t:'Sustainable, platform-compliant growth',d:'Built for long-term channel health. No rule violations, no shortcuts — just structured creator collaboration.'},
            ].map(s=>(
              <div key={s.t} className="iphone-card flex gap-3 items-start p-4 rounded-xl mb-3">
                <div className="w-5 h-5 rounded-full flex items-center justify-center text-xs font-black flex-shrink-0 mt-0.5" style={{background:'rgba(22,163,74,.15)',border:'1px solid rgba(22,163,74,.3)',color:'#22c55e'}}>✓</div>
                <div><div className="text-sm font-bold mb-1" style={{color:'var(--txt)'}}>{s.t}</div><div className="text-xs leading-relaxed" style={{color:'var(--txt2)'}}>{s.d}</div></div>
              </div>
            ))}
            <Link href="/pricing" className="btn-gold inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-bold no-underline mt-4">Start Growing Today →</Link>
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section className="py-16 px-5 border-b" id="how" style={{borderColor:'var(--bdr)'}}>
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-10 rv">
            <div className="stag">How It Works</div>
            <h2 className="text-3xl font-extrabold tracking-tight mt-2" style={{color:'var(--txt)'}}>How StreamForge Works</h2>
            <p className="text-sm mt-2 max-w-xl mx-auto" style={{color:'var(--txt2)'}}>Three simple steps to go from 0 viewers to a growing, active channel</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {HOW.map((h,i)=>(
              <div key={h.n} className={`rv rv-d${(i%4)+1} tilt-card iphone-card p-6 rounded-2xl text-center`}>
                <div className="w-11 h-11 rounded-full mx-auto mb-4 flex items-center justify-center text-sm font-black text-[#0a0806]" style={{background:'linear-gradient(135deg,#a06820,#e8a83e)',boxShadow:'0 0 18px rgba(232,168,62,.3)'}}>{h.n}</div>
                <div className="text-sm font-bold mb-2" style={{color:'var(--txt)'}}>{h.t}</div>
                <div className="text-xs leading-relaxed" style={{color:'var(--txt2)'}}>{h.d}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── ACHIEVEMENTS / PROOF ── */}
      <section className="py-16 px-5 border-b" id="proof results" style={{borderColor:'var(--bdr)'}}>
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-10 rv">
            <div className="stag">Proof It Works</div>
            <h2 className="text-3xl font-extrabold tracking-tight mt-2" style={{color:'var(--txt)'}}>Real Members. Real Milestones.</h2>
            <p className="text-sm mt-2 max-w-xl mx-auto" style={{color:'var(--txt2)'}}>Platform milestones, category ranking, and income — achieved through StreamForge collaboration</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4" id="results">
            {ACHS.map((a,i)=>{
              const bmap:{[k:string]:{bg:string,color:string,border:string}} = {
                partner:{bg:'rgba(232,168,62,.12)',color:'var(--gold)',border:'rgba(232,168,62,.25)'},
                aff:{bg:'rgba(22,163,74,.1)',color:'#22c55e',border:'rgba(22,163,74,.25)'},
                top:{bg:'rgba(8,145,178,.1)',color:'var(--teal)',border:'rgba(8,145,178,.25)'},
                inc:{bg:'rgba(234,88,12,.1)',color:'var(--ember)',border:'rgba(234,88,12,.25)'},
              }
              const b = bmap[a.badge] || bmap.aff
              return (
                <div key={a.n} className={`rv rv-d${(i%4)+1} iphone-card p-5 rounded-2xl`}>
                  <div className="flex items-center gap-3 mb-3">
                    <img src={av(a.n)} alt={a.n} className="w-11 h-11 rounded-full border-2 object-cover" style={{borderColor:'rgba(232,168,62,.3)'}}/>
                    <div><div className="text-sm font-bold" style={{color:'var(--txt)'}}>{a.n}</div><div className="text-xs" style={{color:'var(--txt2)'}}>{a.plat} Streamer</div></div>
                  </div>
                  <span className="inline-flex items-center gap-1 text-xs font-bold px-2 py-1 rounded-full mb-2" style={{background:b.bg,color:b.color,border:`1px solid ${b.border}`}}>✦ {a.label}</span>
                  <div className="text-xs mb-2" style={{color:'var(--txt3)'}}>⏱ Achieved in {a.days} days after joining</div>
                  <p className="text-xs italic leading-relaxed" style={{color:'var(--txt2)'}}>"{a.q}"</p>
                </div>
              )
            })}
          </div>
          <div className="text-center mt-8">
            <Link href="/pricing" className="btn-gold px-8 py-3.5 rounded-xl text-base font-bold no-underline inline-flex items-center gap-2">Get These Results →</Link>
          </div>
        </div>
      </section>

      {/* ── VS SECTION ── */}
      <section className="py-16 px-5 border-b" style={{borderColor:'var(--bdr)'}}>
        <div className="max-w-5xl mx-auto rv">
          <div className="text-center mb-10">
            <div className="stag">Why StreamForge</div>
            <h2 className="text-3xl font-extrabold tracking-tight mt-2" style={{color:'var(--txt)'}}>Stop Going It Alone. Build a Real Creator Network.</h2>
            <p className="text-sm mt-2" style={{color:'var(--txt2)'}}>Solo grinding is slow and discouraging. StreamForge connects you with creators who show up consistently.</p>
          </div>
          <div className="grid md:grid-cols-2 gap-5">
            <div className="iphone-card p-6 rounded-2xl" style={{borderColor:'rgba(220,38,38,.2)'}}>
              <div className="text-base font-bold mb-4 pb-3 border-b" style={{color:'#ef4444',borderColor:'rgba(255,255,255,.07)'}}>❌ Going It Alone</div>
              {['No community support or peer collaboration','Slow, discouraging solo growth','No structured accountability or progress tracking','No consistent activity or community presence','Motivation fades without peer support','Organic discovery is harder without community signals'].map(t=>(
                <div key={t} className="flex items-start gap-2 py-2 border-b text-xs" style={{borderColor:'rgba(255,255,255,.04)',color:'var(--txt2)'}}>
                  <span className="text-red-400 font-bold flex-shrink-0 mt-0.5">✗</span>{t}
                </div>
              ))}
            </div>
            <div className="iphone-card p-6 rounded-2xl" style={{borderColor:'rgba(232,168,62,.35)',boxShadow:'0 0 30px rgba(232,168,62,.08)'}}>
              <div className="text-base font-bold mb-4 pb-3 border-b" style={{color:'var(--gold)',borderColor:'rgba(255,255,255,.07)'}}>⚡ StreamForge Community</div>
              {['Creators collaborate and support your streams consistently','Members who participate in structured peer collaboration','Growth dashboard — track every metric live','Coordinated creator activity and mutual stream support','Collab matching, brand deals, verified badge','Algorithm reads real engagement and boosts you'].map(t=>(
                <div key={t} className="flex items-start gap-2 py-2 border-b text-xs" style={{borderColor:'rgba(255,255,255,.04)',color:'var(--txt2)'}}>
                  <span className="text-green-400 font-bold flex-shrink-0 mt-0.5">✓</span>{t}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── TWITCH STREAMERS ── */}
      <section className="py-16 px-5 border-b" id="discover" style={{borderColor:'var(--bdr)'}}>
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-between flex-wrap gap-3 mb-4">
            <div className="flex items-center gap-3">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="#9147ff"><path d="M11.571 4.714h1.715v5.143H11.57zm4.715 0H18v5.143h-1.714zM6 0L1.714 4.286v15.428h5.143V24l4.286-4.286h3.428L22.286 12V0zm14.571 11.143l-3.428 3.428h-3.429l-3 3v-3H6.857V1.714h13.714z"/></svg>
              <span className="text-xl font-extrabold tracking-tight" style={{color:'#9147ff'}}>Twitch Streamers</span>
              <span className="text-xs font-bold px-2 py-0.5 rounded-full" style={{background:'rgba(145,71,255,.14)',color:'#9147ff',border:'1px solid rgba(145,71,255,.25)'}}>LIVE</span>
            </div>
            <a href="https://twitch.tv" target="_blank" className="text-xs font-semibold px-3 py-1.5 rounded-lg no-underline transition-all" style={{border:'1px solid rgba(232,168,62,.25)',color:'var(--gold-lo)'}}>Browse Twitch →</a>
          </div>
          <div className="flex gap-2 flex-wrap mb-4">
            {['all','fps','irl','strategy','sports','variety','rpg'].map(c=>(
              <button key={c} onClick={()=>setTwCat(c)} className="px-3 py-1 rounded-full text-xs font-semibold capitalize border transition-all" style={{background:twCat===c?'rgba(232,168,62,.1)':'transparent',borderColor:twCat===c?'rgba(232,168,62,.3)':'var(--bdr)',color:twCat===c?'var(--gold)':'var(--txt3)'}}>
                {c==='all'?'All':c.toUpperCase()}
              </button>
            ))}
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
            {twFiltered.slice(0,twCount).map((s:any,i:number)=>(
              <a key={s.n+i} href={`https://twitch.tv/${s.u}`} target="_blank" className="sc p-3">
                {s.boost&&<div className="absolute top-2 right-2 text-[9px] font-extrabold px-1.5 py-0.5 rounded text-[#0a0806]" style={{background:'linear-gradient(135deg,#a06820,#e8a83e)'}}>⚡ BOOSTED</div>}
                <div className="flex items-center gap-2 mb-3">
                  <img src={av(s.n)} alt={s.n} className="w-10 h-10 rounded-full object-cover border-2 flex-shrink-0" style={{borderColor:'rgba(145,71,255,.4)'}}/>
                  <div className="min-w-0"><div className="text-sm font-bold truncate" style={{color:'var(--txt)'}}>{s.n}</div><div className="text-xs truncate" style={{color:'var(--txt2)'}}>{s.g}</div></div>
                </div>
                <div className="w-full h-24 rounded-lg flex items-center justify-center mb-2 relative" style={{background:'linear-gradient(135deg,#1a0a3e,#0d0d26)'}}>
                  <span className="text-3xl opacity-20 text-white">▶</span>
                  <span className="absolute bottom-1.5 left-2 right-2 text-xs truncate" style={{color:'rgba(255,255,255,.5)'}}>{s.t}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xs" style={{color:'var(--txt2)'}}>👁 {s.v.toLocaleString()}</span>
                  <span className="text-xs font-bold px-1.5 py-0.5 rounded" style={{background:'rgba(239,68,68,.12)',color:'#ef4444',border:'1px solid rgba(239,68,68,.2)'}}>LIVE</span>
                </div>
              </a>
            ))}
          </div>
          {twFiltered.length>twCount&&<button onClick={()=>setTwCount(c=>c+8)} className="block mx-auto mt-4 px-6 py-2 rounded-full text-sm border transition-all" style={{background:'transparent',borderColor:'var(--bdr)',color:'var(--txt2)'}}>Load More →</button>}
        </div>
      </section>

      {/* ── KICK STREAMERS ── */}
      <section className="py-16 px-5 border-b" style={{borderColor:'var(--bdr)'}}>
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-between flex-wrap gap-3 mb-4">
            <div className="flex items-center gap-3">
              <span className="w-4 h-4 rounded text-xs font-black flex items-center justify-center text-black" style={{background:'#53fc18',fontSize:'9px'}}>K</span>
              <span className="text-xl font-extrabold tracking-tight" style={{color:'#53fc18'}}>Kick Streamers</span>
              <span className="text-xs font-bold px-2 py-0.5 rounded-full" style={{background:'rgba(83,252,24,.1)',color:'#53fc18',border:'1px solid rgba(83,252,24,.2)'}}>LIVE</span>
            </div>
            <a href="https://kick.com" target="_blank" className="text-xs font-semibold px-3 py-1.5 rounded-lg no-underline" style={{border:'1px solid rgba(232,168,62,.25)',color:'var(--gold-lo)'}}>Browse Kick →</a>
          </div>
          <div className="flex gap-2 flex-wrap mb-4">
            {['all','irl','fps','variety'].map(c=>(
              <button key={c} onClick={()=>setKkCat(c)} className="px-3 py-1 rounded-full text-xs font-semibold capitalize border transition-all" style={{background:kkCat===c?'rgba(83,252,24,.1)':'transparent',borderColor:kkCat===c?'rgba(83,252,24,.3)':'var(--bdr)',color:kkCat===c?'#53fc18':'var(--txt3)'}}>
                {c==='all'?'All':c==='irl'?'IRL / Chat':c.toUpperCase()}
              </button>
            ))}
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
            {kkFiltered.slice(0,kkCount).map((s:any,i:number)=>(
              <a key={s.n+i} href={`https://kick.com/${s.u}`} target="_blank" className="sc p-3">
                {s.boost&&<div className="absolute top-2 right-2 text-[9px] font-extrabold px-1.5 py-0.5 rounded text-[#0a0806]" style={{background:'linear-gradient(135deg,#a06820,#e8a83e)'}}>⚡ BOOSTED</div>}
                <div className="flex items-center gap-2 mb-3">
                  <img src={av(s.n+'k')} alt={s.n} className="w-10 h-10 rounded-full object-cover border-2 flex-shrink-0" style={{borderColor:'rgba(83,252,24,.4)'}}/>
                  <div className="min-w-0"><div className="text-sm font-bold truncate" style={{color:'var(--txt)'}}>{s.n}</div><div className="text-xs truncate" style={{color:'var(--txt2)'}}>{s.g}</div></div>
                </div>
                <div className="w-full h-24 rounded-lg flex items-center justify-center mb-2 relative" style={{background:'linear-gradient(135deg,#0a1a0a,#0d1a0d)'}}>
                  <span className="text-3xl opacity-20 text-white">▶</span>
                  <span className="absolute bottom-1.5 left-2 right-2 text-xs truncate" style={{color:'rgba(255,255,255,.5)'}}>{s.t}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xs" style={{color:'var(--txt2)'}}>👁 {s.v.toLocaleString()}</span>
                  <span className="text-xs font-bold px-1.5 py-0.5 rounded" style={{background:'rgba(239,68,68,.12)',color:'#ef4444',border:'1px solid rgba(239,68,68,.2)'}}>LIVE</span>
                </div>
              </a>
            ))}
          </div>
          {kkFiltered.length>kkCount&&<button onClick={()=>setKkCount(c=>c+8)} className="block mx-auto mt-4 px-6 py-2 rounded-full text-sm border transition-all" style={{background:'transparent',borderColor:'var(--bdr)',color:'var(--txt2)'}}>Load More →</button>}
        </div>
      </section>

      {/* ── YOUTUBE ── */}
      <section className="py-16 px-5 border-b" style={{borderColor:'var(--bdr)'}}>
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-between flex-wrap gap-3 mb-4">
            <div className="flex items-center gap-3">
              <svg width="18" height="13" viewBox="0 0 576 512" fill="#ff4444"><path d="M549.7 124.1c-6.3-23.7-24.8-42.3-48.3-48.6C458.8 64 288 64 288 64S117.2 64 74.6 75.5c-23.5 6.3-42 24.9-48.3 48.6-11.4 42.9-11.4 132.3-11.4 132.3s0 89.4 11.4 132.3c6.3 23.7 24.8 41.5 48.3 47.8C117.2 448 288 448 288 448s170.8 0 213.4-11.5c23.5-6.3 42-24.2 48.3-47.8 11.4-42.9 11.4-132.3 11.4-132.3s0-89.4-11.4-132.3zm-317.5 213.5V175.2l142.7 81.2-142.7 81.2z"/></svg>
              <span className="text-xl font-extrabold tracking-tight" style={{color:'#ff4444'}}>YouTube Creators</span>
              <span className="text-xs font-bold px-2 py-0.5 rounded-full" style={{background:'rgba(255,68,68,.1)',color:'#ff4444',border:'1px solid rgba(255,68,68,.2)'}}>LIVE</span>
            </div>
            <a href="https://youtube.com/gaming" target="_blank" className="text-xs font-semibold px-3 py-1.5 rounded-lg no-underline" style={{border:'1px solid rgba(232,168,62,.25)',color:'var(--gold-lo)'}}>Browse YouTube →</a>
          </div>
          <div className="flex gap-2 flex-wrap mb-4">
            {['all','fps','variety','rpg','tech','irl'].map(c=>(
              <button key={c} onClick={()=>setYtCat(c)} className="px-3 py-1 rounded-full text-xs font-semibold capitalize border transition-all" style={{background:ytCat===c?'rgba(255,68,68,.1)':'transparent',borderColor:ytCat===c?'rgba(255,68,68,.3)':'var(--bdr)',color:ytCat===c?'#ff4444':'var(--txt3)'}}>
                {c==='all'?'All':c==='irl'?'Commentary':c.toUpperCase()}
              </button>
            ))}
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
            {ytFiltered.slice(0,ytCount).map((s:any,i:number)=>(
              <a key={s.n+i} href={s.link} target="_blank" className="sc p-3">
                {s.boost&&<div className="absolute top-2 right-2 text-[9px] font-extrabold px-1.5 py-0.5 rounded text-[#0a0806]" style={{background:'linear-gradient(135deg,#a06820,#e8a83e)'}}>⚡ BOOSTED</div>}
                <div className="flex items-center gap-2 mb-3">
                  <img src={av(s.n+'y')} alt={s.n} className="w-10 h-10 rounded-full object-cover border-2 flex-shrink-0" style={{borderColor:'rgba(255,68,68,.4)'}}/>
                  <div className="min-w-0"><div className="text-sm font-bold truncate" style={{color:'var(--txt)'}}>{s.n}</div><div className="text-xs truncate" style={{color:'var(--txt2)'}}>{s.g}</div></div>
                </div>
                <div className="w-full h-24 rounded-lg flex items-center justify-center mb-2 relative" style={{background:'linear-gradient(135deg,#1a0a0a,#26100a)'}}>
                  <span className="text-3xl opacity-20 text-white">▶</span>
                  <span className="absolute bottom-1.5 left-2 right-2 text-xs truncate" style={{color:'rgba(255,255,255,.5)'}}>{s.t}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xs" style={{color:'var(--txt2)'}}>👥 {s.sub}</span>
                  <span className="text-xs font-bold px-1.5 py-0.5 rounded" style={{background:'rgba(255,68,68,.12)',color:'#ff4444',border:'1px solid rgba(255,68,68,.2)'}}>YouTube</span>
                </div>
              </a>
            ))}
          </div>
          {ytFiltered.length>ytCount&&<button onClick={()=>setYtCount(c=>c+8)} className="block mx-auto mt-4 px-6 py-2 rounded-full text-sm border transition-all" style={{background:'transparent',borderColor:'var(--bdr)',color:'var(--txt2)'}}>Load More →</button>}
        </div>
      </section>

      {/* ── TIKTOK ── */}
      <section className="py-16 px-5 border-b" style={{borderColor:'var(--bdr)'}}>
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-between flex-wrap gap-3 mb-4">
            <div className="flex items-center gap-3">
              <span className="text-xl">🎵</span>
              <span className="text-xl font-extrabold tracking-tight" style={{color:'#ff0050'}}>TikTok Creators</span>
              <span className="text-xs font-bold px-2 py-0.5 rounded-full" style={{background:'rgba(255,0,80,.1)',color:'#ff0050',border:'1px solid rgba(255,0,80,.2)'}}>LIVE</span>
            </div>
            <a href="https://tiktok.com/live" target="_blank" className="text-xs font-semibold px-3 py-1.5 rounded-lg no-underline" style={{border:'1px solid rgba(232,168,62,.25)',color:'var(--gold-lo)'}}>Browse TikTok →</a>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
            {TT.slice(0,ttCount).map((s:any,i:number)=>(
              <a key={s.n+i} href={s.link} target="_blank" className="sc p-3">
                {s.boost&&<div className="absolute top-2 right-2 text-[9px] font-extrabold px-1.5 py-0.5 rounded text-[#0a0806]" style={{background:'linear-gradient(135deg,#a06820,#e8a83e)'}}>⚡ BOOSTED</div>}
                <div className="flex items-center gap-2 mb-3">
                  <img src={av(s.n+'t')} alt={s.n} className="w-10 h-10 rounded-full object-cover border-2 flex-shrink-0" style={{borderColor:'rgba(255,0,80,.4)'}}/>
                  <div className="min-w-0"><div className="text-sm font-bold truncate" style={{color:'var(--txt)'}}>{s.n}</div><div className="text-xs truncate" style={{color:'var(--txt2)'}}>{s.g}</div></div>
                </div>
                <div className="w-full h-24 rounded-lg flex items-center justify-center mb-2 relative" style={{background:'linear-gradient(135deg,#1a0010,#1a000a)'}}>
                  <span className="text-3xl opacity-20 text-white">▶</span>
                  <span className="absolute bottom-1.5 left-2 right-2 text-xs truncate" style={{color:'rgba(255,255,255,.5)'}}>{s.t}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xs" style={{color:'var(--txt2)'}}>👥 {s.flw}</span>
                  <span className="text-xs font-bold px-1.5 py-0.5 rounded" style={{background:'rgba(255,0,80,.12)',color:'#ff0050',border:'1px solid rgba(255,0,80,.2)'}}>TikTok</span>
                </div>
              </a>
            ))}
          </div>
          {TT.length>ttCount&&<button onClick={()=>setTtCount(c=>c+8)} className="block mx-auto mt-4 px-6 py-2 rounded-full text-sm border transition-all" style={{background:'transparent',borderColor:'var(--bdr)',color:'var(--txt2)'}}>Load More →</button>}
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
              {n:'Jedidiah',handle:'jedidiah_x1',c:'#2563eb',desc:'Elite FPS competitive squad. If Jedidiah reached out to you on Discord, verify them here — same name, same logo, same team.',game:'FPS / Competitive',platform:'Twitch & Kick',members:['NightStrike','SkylaFPS','IronSight','CoastalTV','ZephyrFPS'],img:av('Jedidiah')},
              {n:'Temmy',handle:'temmy_official',c:'#ec4899',desc:'IRL & variety content collective. If Temmy contacted you on Discord, verify them right here on StreamForge.',game:'IRL / Variety',platform:'Twitch, TikTok & Kick',members:['TemmyPlays','JaydenIRL','ZaraLive','NightOwlTV'],img:av('Temmy')},
              {n:'levelUpX',handle:'levelupx_team',c:'#16a34a',desc:'Sports & esports team dominating FIFA, NBA 2K and Rocket League. Verified StreamForge member team.',game:'Sports / Esports',platform:'Twitch & YouTube',members:['LevelUpX','PulseGamer','ProdigyPete'],img:av('levelUpX')},
              {n:'Jeremiah',handle:'jeremiah_official',c:'#a78bfa',desc:'Multi-platform creator & community builder. If Jeremiah reached out to you on Discord, this is the verified team on StreamForge.',game:'Variety / Gaming',platform:'All Platforms',members:['GlitchRex','NoirGaming','CoastalTV','ZaraLive'],img:av('Jeremiah')},
            ].map((t,i)=>(
              <div key={t.n} className={`rv rv-d${i+1} iphone-card p-5 rounded-2xl`} style={{borderTop:`3px solid ${t.c}`}}>
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-14 h-14 rounded-xl border-2 overflow-hidden flex-shrink-0" style={{borderColor:`${t.c}55`}}>
                    <img src={t.img} alt={t.n} className="w-full h-full object-cover"/>
                  </div>
                  <div>
                    <div className="text-base font-extrabold" style={{color:t.c}}>{t.n}</div>
                    <div className="text-xs" style={{color:'var(--txt2)'}}>@{t.handle}</div>
                    <span className="text-xs font-bold px-2 py-0.5 rounded-full mt-1 inline-block" style={{background:`${t.c}1a`,color:t.c,border:`1px solid ${t.c}44`}}>✦ Verified StreamForge Team</span>
                  </div>
                </div>
                <p className="text-xs leading-relaxed mb-3" style={{color:'var(--txt2)'}}>{t.desc}</p>
                <div className="text-xs space-y-1.5 mb-3 p-3 rounded-lg" style={{background:'rgba(255,255,255,.03)'}}>
                  <div className="flex justify-between"><span style={{color:'var(--txt3)'}}>🎮 Game</span><span className="font-semibold" style={{color:'var(--txt)'}}>{t.game}</span></div>
                  <div className="flex justify-between"><span style={{color:'var(--txt3)'}}>📡 Platform</span><span className="font-semibold" style={{color:'var(--txt)'}}>{t.platform}</span></div>
                  <div className="flex justify-between"><span style={{color:'var(--txt3)'}}>👥 Members</span><span className="font-semibold" style={{color:'var(--txt)'}}>{t.members.length} verified</span></div>
                </div>
                <div className="flex flex-wrap gap-1 mb-3">
                  {t.members.map(m=><span key={m} className="text-xs px-2 py-0.5 rounded-full" style={{background:'rgba(255,255,255,.04)',border:'1px solid var(--bdr)',color:'var(--txt2)'}}>{m}</span>)}
                </div>
                <div className="flex items-start gap-2 p-2.5 rounded-lg text-xs" style={{background:'rgba(22,163,74,.06)',border:'1px solid rgba(22,163,74,.2)'}}>
                  <span className="flex-shrink-0">🛡️</span>
                  <span style={{color:'rgba(34,197,94,.9)'}}>If this team contacted you on Discord, verify them here — same name, same logo, same handle listed above.</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── REVIEWS ── */}
      <section className="py-16 px-5 border-b" style={{borderColor:'var(--bdr)',background:'linear-gradient(180deg,rgba(22,163,74,.03),transparent)'}}>
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-10 rv">
            <div className="stag">Success Stories</div>
            <h2 className="text-3xl font-extrabold tracking-tight mt-2" style={{color:'var(--txt)'}}>Real Streamers. Real Results.</h2>
            <p className="text-sm mt-2" style={{color:'var(--txt2)'}}>No paid reviews. Real creators sharing their StreamForge experience.</p>
          </div>
          <div className="overflow-hidden">
            <div className="flex gap-4" style={{animation:'ticker 50s linear infinite',width:'max-content'}}>
              {[...REVS,...REVS].map((r,i)=>(
                <div key={i} className="iphone-card p-5 rounded-2xl flex-shrink-0" style={{width:'280px'}}>
                  <span className="text-xs font-bold px-2 py-1 rounded-full mb-3 inline-block" style={{background:`${plat_colors[r.p]}18`,color:plat_colors[r.p],border:`1px solid ${plat_colors[r.p]}30`}}>{r.p.charAt(0).toUpperCase()+r.p.slice(1)}</span>
                  <div className="flex items-center gap-2 mb-3">
                    <img src={av(r.n+r.h)} alt={r.n} className="w-9 h-9 rounded-full border object-cover flex-shrink-0" style={{borderColor:'rgba(232,168,62,.3)'}}/>
                    <div><div className="text-sm font-bold" style={{color:'var(--txt)'}}>{r.n}</div><div className="text-xs" style={{color:'var(--txt3)'}}>{r.h}</div></div>
                  </div>
                  <div className="text-xs mb-2" style={{color:'var(--gold)'}}>★★★★★</div>
                  <p className="text-xs leading-relaxed" style={{color:'var(--txt2)'}}>{r.q}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── COMMUNITY HUB ── */}
      <section className="py-16 px-5 border-b" id="community-hub" style={{borderColor:'var(--bdr)',background:'linear-gradient(135deg,rgba(124,58,237,.07),rgba(8,145,178,.05))'}}>
        <div className="max-w-5xl mx-auto rv">
          <div className="iphone-card rounded-2xl p-8 flex flex-col md:flex-row items-center gap-8">
            <div className="flex-1">
              <div className="stag mb-2">🆕 Now Live</div>
              <h2 className="text-2xl font-extrabold tracking-tight mb-3" style={{color:'var(--txt)'}}>StreamForge Community Blog</h2>
              <p className="text-sm leading-relaxed mb-4" style={{color:'var(--txt2)'}}>Real streamers posting growth stories, Twitch tips, polls, debates and guides. Read posts, drop comments, vote in polls.</p>
              <div className="flex gap-2 flex-wrap">
                {['📖 847 Posts','💬 12.4K Comments','📊 Active Polls','🔥 Debates'].map(t=>(
                  <span key={t} className="text-xs font-bold px-2.5 py-1 rounded-full" style={{background:'rgba(255,255,255,.05)',border:'1px solid var(--bdr)',color:'var(--txt2)'}}>{t}</span>
                ))}
              </div>
            </div>
            <div className="flex flex-col gap-3 w-full md:w-auto">
              <Link href="/community" className="btn-gold px-6 py-3 rounded-xl text-sm font-bold no-underline text-center">✍ Visit Community Blog →</Link>
              <Link href="/pricing" className="btn-outline-gold px-6 py-3 rounded-xl text-sm no-underline text-center">Join StreamForge</Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="py-16 px-5 border-b" id="faq" style={{borderColor:'var(--bdr)'}}>
        <div className="max-w-3xl mx-auto rv">
          <div className="text-center mb-8">
            <div className="stag">FAQ</div>
            <h2 className="text-3xl font-extrabold tracking-tight mt-2" style={{color:'var(--txt)'}}>Common Questions</h2>
            <p className="text-sm mt-2" style={{color:'var(--txt2)'}}>Everything new streamers ask before joining</p>
          </div>
          {[
            {q:'Is StreamForge safe for my Twitch channel?',a:'Yes. StreamForge is a creator collaboration network — no artificial engagement, no automation. Fully compliant with Twitch, Kick and YouTube terms of service.'},
            {q:'Is this fake engagement or viewer bots?',a:'No. Every member is a verified creator who participates in mutual collaboration. Support flows both ways — this is a genuine peer networking community.'},
            {q:'How fast can I get Twitch Affiliate?',a:'Members consistently reach platform milestones faster through structured peer collaboration and community support. Results depend on consistency and streaming schedule.'},
            {q:'Can Kick, YouTube and TikTok streamers join?',a:'Yes. StreamForge supports all major platforms — Twitch, Kick, YouTube and TikTok. Many members grow on multiple platforms simultaneously.'},
            {q:'How does payment work?',a:'Apply first. After approval we send payment details via email. No automatic charges — you only pay after being accepted. Plans start at $55/month.'},
            {q:'One of your teams contacted me on Discord — is it real?',a:'If a StreamForge team leader reached out, scroll to our Teams section above. Same name, same logo, same handle = verified. Never pay anyone outside contact.streamforge@gmail.com.'},
          ].map((f,i)=>(
            <div key={i} className="iphone-card mb-3 rounded-xl overflow-hidden">
              <button onClick={()=>setOpenFaq(openFaq===i?null:i)} className="w-full flex justify-between items-start text-left gap-4 p-5 border-none cursor-pointer" style={{background:'transparent',color:'var(--txt)'}}>
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

      {/* ── BLOG TEASER ── */}
      <section className="py-16 px-5 border-b" id="blog" style={{borderColor:'var(--bdr)'}}>
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-10 rv">
            <div className="stag">Creator Resources</div>
            <h2 className="text-3xl font-extrabold tracking-tight mt-2" style={{color:'var(--txt)'}}>Streamer Growth Guides</h2>
            <p className="text-sm mt-2" style={{color:'var(--txt2)'}}><Link href="/blog" style={{color:'var(--gold)'}}>See all articles →</Link></p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {[
              {cat:'Twitch',cc:'#9147ff',cb:'rgba(145,71,255,.14)',title:'How to Grow on Twitch in 2026',excerpt:"The exact system serious streamers use to grow past affiliate and toward partner — without bots.",href:'/blog/how-to-grow-on-twitch',read:'8 min'},
              {cat:'Twitch',cc:'#9147ff',cb:'rgba(145,71,255,.14)',title:'Twitch Algorithm Explained',excerpt:'What Twitch actually rewards: chat activity rate, session length, category ranking.',href:'/blog/twitch-algorithm-explained',read:'9 min'},
              {cat:'StreamForge',cc:'#22c55e',cb:'rgba(22,163,74,.1)',title:'Is StreamForge Real?',excerpt:"An honest 6-month review — what works, what doesn't, and whether it's worth the cost.",href:'/blog/is-streamforge-real',read:'7 min'},
              {cat:'Growth',cc:'#e8a83e',cb:'rgba(232,168,62,.12)',title:"Why Your Stream Is Not Growing",excerpt:"You're consistent. Your audio is clean. So why aren't you growing? The honest answer.",href:'/blog/why-your-stream-is-not-growing',read:'6 min'},
              {cat:'Twitch',cc:'#9147ff',cb:'rgba(145,71,255,.14)',title:'Get More Viewers on Twitch',excerpt:'12 proven methods to increase your concurrent viewers — ranked from easiest to most powerful.',href:'/blog/how-to-get-more-viewers-on-twitch',read:'7 min'},
              {cat:'StreamForge',cc:'#22c55e',cb:'rgba(22,163,74,.1)',title:'What is StreamForge?',excerpt:"An 'active viewer network' — but what does that actually mean? Full explainer here.",href:'/blog/what-is-streamforge',read:'5 min'},
            ].map((p,i)=>(
              <Link key={i} href={p.href} className={`rv rv-d${(i%4)+1} iphone-card block no-underline p-5 rounded-2xl flex flex-col`}>
                <span className="text-xs font-bold px-2.5 py-1 rounded-full mb-3 inline-block w-fit" style={{background:p.cb,color:p.cc}}>{p.cat}</span>
                <h3 className="text-sm font-bold mb-2 leading-snug" style={{color:'var(--txt)'}}>{p.title}</h3>
                <p className="text-xs leading-relaxed flex-1 mb-3" style={{color:'var(--txt2)'}}>{p.excerpt}</p>
                <div className="flex justify-between items-center text-xs" style={{color:'var(--txt3)'}}>
                  <span>{p.read} read</span>
                  <span style={{color:'var(--gold)'}}>Read →</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── APPLY / FINAL CTA ── */}
      <section className="py-24 px-5 text-center" id="apply" style={{background:'linear-gradient(180deg,transparent,rgba(124,58,237,.08),transparent)'}}>
        <div className="max-w-2xl mx-auto rv">
          <div className="stag mb-4">Your Next Move</div>
          <h2 className="text-4xl sm:text-5xl font-extrabold tracking-tight mb-4 grad-txt">One Community.<br/>Unlimited Potential.</h2>
          <p className="text-lg mb-3 leading-relaxed" style={{color:'var(--txt2)'}}>
            5,800+ creators. Brand deals. Partner status. Consistent income.<br/>
            <strong style={{color:'var(--txt)'}}>This is what structured peer collaboration delivers.</strong>
          </p>
          <p className="text-sm mb-8" style={{color:'var(--txt3)'}}>
            Plans start at $49/month. Most members earn that back in their first brand deal or sponsorship.
          </p>

          {/* Value boxes */}
          <div className="grid grid-cols-3 gap-4 mb-8 max-w-lg mx-auto">
            {[
              {n:'$49', l:'Entry plan/mo'},
              {n:'$800+', l:'Avg brand deal'},
              {n:'24hrs', l:'To get access'},
            ].map(s=>(
              <div key={s.l} className="p-4 rounded-2xl iphone-card text-center">
                <div className="text-xl font-extrabold grad-gold">{s.n}</div>
                <div className="text-xs mt-1" style={{color:'var(--txt3)'}}>{s.l}</div>
              </div>
            ))}
          </div>

          <div className="flex flex-col sm:flex-row gap-3 justify-center mb-4">
            <Link href="/pricing" className="btn-gold px-10 py-4 rounded-xl text-base font-bold no-underline inline-flex items-center justify-center gap-2" style={{fontSize:'1rem'}}>
              🚀 Join StreamForge — From $49/mo
            </Link>
            <button onClick={()=>{const m=document.getElementById('dc-modal');if(m){m.style.display='flex';document.body.style.overflow='hidden'}}}
              className="px-8 py-4 rounded-xl text-base font-bold border transition-all" style={{background:'rgba(88,101,242,.15)',color:'#7c87f0',borderColor:'rgba(88,101,242,.3)'}}>
              💬 Ask Us Anything
            </button>
          </div>
          <p className="text-xs" style={{color:'var(--txt3)'}}>Secure checkout · Cancel anytime · Discord access within 24 hours</p>
        </div>
      </section>

      {/* ── STICKY MOBILE CTA ── */}
      <div className="fixed bottom-0 left-0 right-0 z-[300] md:hidden border-t" style={{background:'var(--glass)',backdropFilter:'blur(18px)',WebkitBackdropFilter:'blur(18px)',borderColor:'rgba(232,168,62,.2)'}}>
        <div className="px-4 py-3">
          <Link href="/pricing" className="btn-gold w-full block text-center py-3.5 rounded-xl text-sm font-bold no-underline">🚀 Join StreamForge — Apply Now</Link>
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
