'use client'
import { useState, useEffect, useRef } from 'react'

/* ── DATA ── */
const PERSONAS: Record<string,{e:string,name:string}> = {
  vtuber: {e:'🌸',name:'VTuber'},
  fps:    {e:'🎯',name:'FPS'},
  irl:    {e:'📹',name:'IRL'},
  variety:{e:'🎮',name:'Variety'},
  sports: {e:'⚽',name:'Sports'},
  rp:     {e:'🎭',name:'RP'},
}

const CHARS: Record<string, {id:string,e:string,name:string,sub:string}[]> = {
  vtuber: [{id:'neko',e:'🐱',name:'Neko Chan',sub:'Cute & playful'},{id:'dragon',e:'🐉',name:'Dragon Lord',sub:'Powerful & dark'},{id:'angel',e:'👼',name:'Angel Aria',sub:'Pure & glowing'},{id:'devil',e:'😈',name:'Devil Ara',sub:'Dark & fierce'}],
  fps:    [{id:'soldier',e:'🪖',name:'Soldier',sub:'Tactical ops'},{id:'ghost',e:'👻',name:'Ghost',sub:'Silent killer'},{id:'assault',e:'🔫',name:'Assault Pro',sub:'Run & gun'},{id:'sniper',e:'🎯',name:'Sniper',sub:'One shot'}],
  irl:    [{id:'travel',e:'✈️',name:'Wanderer',sub:'Explorer'},{id:'foodie',e:'🍜',name:'Food King',sub:'Taste everything'},{id:'fitness',e:'💪',name:'Grind Mode',sub:'No days off'},{id:'chill',e:'☕',name:'Chill Vibes',sub:'Relaxed'}],
  variety:[{id:'chaos',e:'🌪️',name:'Chaos Agent',sub:'Unpredictable'},{id:'speedrun',e:'⚡',name:'Speedrunner',sub:'Fast & focused'},{id:'lore',e:'📖',name:'Lore Master',sub:'Deep thinker'},{id:'react',e:'😂',name:'Reactor King',sub:'Comedy gold'}],
  sports: [{id:'striker',e:'⚽',name:'Striker',sub:'FIFA/EA FC'},{id:'legend',e:'🏆',name:'Legend',sub:'2K champ'},{id:'rl',e:'🚗',name:'RL Pro',sub:'Rocket League'},{id:'coach',e:'📊',name:'Coach',sub:'Stats & strategy'}],
  rp:     [{id:'cop',e:'👮',name:'Officer',sub:'Law & order'},{id:'criminal',e:'🔪',name:'Gang Boss',sub:'Street hustle'},{id:'medic',e:'🏥',name:'Doc',sub:'Save lives'},{id:'civilian',e:'👔',name:'Business',sub:'Empire builder'}],
}

const PERSONA_CTX: Record<string,string> = {
  vtuber:"User is a VTuber/anime-style streamer. Use cute, enthusiastic language. Reference VTuber culture.",
  fps:"User is a competitive FPS gamer. Be direct, results-focused, use gamer language.",
  irl:"User is an IRL creator. Be sociable and warm, reference audience connection and brand deals.",
  variety:"User is a variety streamer. Be enthusiastic and creative.",
  sports:"User is a sports/esports streamer. Be competitive, reference FIFA, 2K, Rocket League.",
  rp:"User is an RP/NoPixel streamer. Be narrative-driven, reference roleplay community.",
}

const CHAR_THEMES: Record<string,{a1:string,a2:string,grad:string,pattern:string}> = {
  neko:    {a1:'#ec4899',a2:'#f472b6',grad:'linear-gradient(135deg,#ec4899,#f472b6)',pattern:'radial-gradient(circle at 20px 20px, rgba(236,72,153,.07) 8px, transparent 8px)'},
  dragon:  {a1:'#7c3aed',a2:'#c026d3',grad:'linear-gradient(135deg,#7c3aed,#c026d3)',pattern:'repeating-linear-gradient(45deg,rgba(124,58,237,.04) 0,rgba(124,58,237,.04) 2px,transparent 0,transparent 50%)'},
  angel:   {a1:'#f59e0b',a2:'#fbbf24',grad:'linear-gradient(135deg,#f59e0b,#fbbf24)',pattern:'radial-gradient(circle at 10px 10px,rgba(245,158,11,.06) 4px,transparent 4px)'},
  devil:   {a1:'#dc2626',a2:'#7c3aed',grad:'linear-gradient(135deg,#dc2626,#7c3aed)',pattern:'repeating-linear-gradient(135deg,rgba(220,38,38,.04) 0,rgba(220,38,38,.04) 2px,transparent 0,transparent 16px)'},
  soldier: {a1:'#22c55e',a2:'#16a34a',grad:'linear-gradient(135deg,#14532d,#22c55e)',pattern:'linear-gradient(rgba(34,197,94,.05) 1px,transparent 1px),linear-gradient(90deg,rgba(34,197,94,.05) 1px,transparent 1px)'},
  ghost:   {a1:'#64748b',a2:'#94a3b8',grad:'linear-gradient(135deg,#0f172a,#64748b)',pattern:'repeating-linear-gradient(45deg,rgba(100,116,139,.04) 0,rgba(100,116,139,.04) 2px,transparent 0,transparent 24px)'},
  assault: {a1:'#ef4444',a2:'#ea580c',grad:'linear-gradient(135deg,#ef4444,#ea580c)',pattern:'repeating-linear-gradient(0deg,rgba(239,68,68,.04) 0,rgba(239,68,68,.04) 2px,transparent 0,transparent 20px)'},
  sniper:  {a1:'#0891b2',a2:'#0e7490',grad:'linear-gradient(135deg,#0c1a2e,#0891b2)',pattern:'radial-gradient(circle at center,rgba(8,145,178,.08) 30px,transparent 31px),radial-gradient(circle at center,rgba(8,145,178,.05) 60px,transparent 61px)'},
  travel:  {a1:'#0891b2',a2:'#06b6d4',grad:'linear-gradient(135deg,#0c4a6e,#0891b2)',pattern:'linear-gradient(rgba(8,145,178,.04) 1px,transparent 1px),linear-gradient(90deg,rgba(8,145,178,.04) 1px,transparent 1px)'},
  foodie:  {a1:'#ea580c',a2:'#f59e0b',grad:'linear-gradient(135deg,#ea580c,#f59e0b)',pattern:'radial-gradient(circle at 15px 15px,rgba(234,88,12,.06) 6px,transparent 6px)'},
  fitness: {a1:'#16a34a',a2:'#22c55e',grad:'linear-gradient(135deg,#14532d,#16a34a)',pattern:'repeating-linear-gradient(90deg,rgba(22,163,74,.04) 0,rgba(22,163,74,.04) 3px,transparent 0,transparent 30px)'},
  chill:   {a1:'#6366f1',a2:'#8b5cf6',grad:'linear-gradient(135deg,#1e1b4b,#6366f1)',pattern:'radial-gradient(circle at 20px 20px,rgba(99,102,241,.05) 10px,transparent 10px)'},
  chaos:   {a1:'#f59e0b',a2:'#ef4444',grad:'linear-gradient(135deg,#f59e0b,#ef4444)',pattern:'repeating-conic-gradient(rgba(245,158,11,.04) 0deg 90deg,transparent 90deg 180deg)'},
  speedrun:{a1:'#22d3ee',a2:'#06b6d4',grad:'linear-gradient(135deg,#164e63,#22d3ee)',pattern:'repeating-linear-gradient(45deg,rgba(34,211,238,.04) 0,rgba(34,211,238,.04) 2px,transparent 0,transparent 12px)'},
  lore:    {a1:'#7c3aed',a2:'#4f46e5',grad:'linear-gradient(135deg,#1e1b4b,#7c3aed)',pattern:'radial-gradient(circle at 25px 25px,rgba(124,58,237,.05) 12px,transparent 12px)'},
  react:   {a1:'#f43f5e',a2:'#ec4899',grad:'linear-gradient(135deg,#f43f5e,#ec4899)',pattern:'radial-gradient(circle at 10px 10px,rgba(244,63,94,.06) 5px,transparent 5px)'},
  striker: {a1:'#16a34a',a2:'#15803d',grad:'linear-gradient(135deg,#14532d,#16a34a)',pattern:'linear-gradient(rgba(22,163,74,.05) 1px,transparent 1px),linear-gradient(90deg,rgba(22,163,74,.05) 1px,transparent 1px),linear-gradient(rgba(22,163,74,.03) 1px,transparent 1px),linear-gradient(90deg,rgba(22,163,74,.03) 1px,transparent 1px)'},
  legend:  {a1:'#eab308',a2:'#ca8a04',grad:'linear-gradient(135deg,#713f12,#eab308)',pattern:'radial-gradient(circle at 15px 15px,rgba(234,179,8,.06) 6px,transparent 6px)'},
  rl:      {a1:'#3b82f6',a2:'#2563eb',grad:'linear-gradient(135deg,#1e3a8a,#3b82f6)',pattern:'repeating-linear-gradient(120deg,rgba(59,130,246,.04) 0,rgba(59,130,246,.04) 2px,transparent 0,transparent 20px)'},
  coach:   {a1:'#64748b',a2:'#475569',grad:'linear-gradient(135deg,#0f172a,#475569)',pattern:'linear-gradient(rgba(100,116,139,.04) 1px,transparent 1px),linear-gradient(90deg,rgba(100,116,139,.04) 1px,transparent 1px)'},
  cop:     {a1:'#1d4ed8',a2:'#1e40af',grad:'linear-gradient(135deg,#172554,#1d4ed8)',pattern:'linear-gradient(rgba(29,78,216,.06) 2px,transparent 2px),linear-gradient(90deg,rgba(29,78,216,.06) 2px,transparent 2px)'},
  criminal:{a1:'#dc2626',a2:'#991b1b',grad:'linear-gradient(135deg,#450a0a,#dc2626)',pattern:'radial-gradient(circle at 10px 10px,rgba(220,38,38,.06) 4px,transparent 4px)'},
  medic:   {a1:'#ef4444',a2:'#fafafa',grad:'linear-gradient(135deg,#7f1d1d,#ef4444)',pattern:'linear-gradient(rgba(239,68,68,.06) 2px,transparent 2px),linear-gradient(90deg,rgba(239,68,68,.06) 2px,transparent 2px)'},
  civilian:{a1:'#374151',a2:'#4b5563',grad:'linear-gradient(135deg,#111827,#374151)',pattern:'repeating-linear-gradient(45deg,rgba(55,65,81,.05) 0,rgba(55,65,81,.05) 2px,transparent 0,transparent 18px)'},
}

interface Msg { role:'bot'|'user'; text:string; time:string }

export default function ChatWidget() {
  const [open, setOpen]         = useState(false)
  const [persona, setPersona]   = useState<string|null>(null)
  const [char, setChar]         = useState<{id:string,e:string,name:string,sub:string}|null>(null)
  const [msgs, setMsgs]         = useState<Msg[]>([])
  const [qrs, setQrs]           = useState<{label:string,fn:()=>void,pr?:boolean}[]|'persona'|'char'|null>(null)
  const [typing, setTyping]     = useState(false)
  const [input, setInput]       = useState('')
  const [history, setHistory]   = useState<{role:string,content:string}[]>([])
  const [pulse, setPulse]       = useState(false)
  const msgsRef = useRef<HTMLDivElement>(null)

  const theme = char ? CHAR_THEMES[char.id] : null
  const botE  = char ? char.e : (persona ? PERSONAS[persona].e : '🔥')

  useEffect(() => { if(msgsRef.current) msgsRef.current.scrollTop = msgsRef.current.scrollHeight }, [msgs, typing])

  /* Pulse button every 30s to attract attention */
  useEffect(() => {
    if(open) return
    const iv = setInterval(() => { setPulse(true); setTimeout(()=>setPulse(false),1200) }, 30000)
    setTimeout(() => { setPulse(true); setTimeout(()=>setPulse(false),1200) }, 4000)
    return ()=>clearInterval(iv)
  }, [open])

  /* Open → init */
  useEffect(() => { if(open && msgs.length===0) initChat() }, [open])

  function now() { return new Date().toLocaleTimeString([],{hour:'2-digit',minute:'2-digit'}) }

  function addBot(text:string) {
    setMsgs(p=>[...p,{role:'bot',text,time:now()}])
  }
  function addUser(text:string) {
    setMsgs(p=>[...p,{role:'user',text,time:now()}])
  }

  function initChat() {
    setTimeout(()=>{
      setTyping(true)
      setTimeout(()=>{
        setTyping(false)
        addBot("Hey! 👋 Welcome to **StreamForge**.\n\nI'm your personal AI guide — ask me _anything_. But first, let me personalise your experience.\n\n**What kind of streamer are you?** 👇")
        setQrs('persona')
      },900)
    },300)
  }

  function pickPersona(key:string) {
    setPersona(key); addUser(PERSONAS[key].e+' '+PERSONAS[key].name); setQrs(null)
    setTyping(true)
    setTimeout(()=>{
      setTyping(false)
      addBot('Love it! 🔥 A **'+PERSONAS[key].name+' streamer** — you\'re exactly who StreamForge was built for.\n\nPick your character to fully customise your chat 👇')
      setQrs('char')
    },700)
  }

  function pickChar(c:{id:string,e:string,name:string,sub:string}) {
    setChar(c); addUser(c.e+' '+c.name); setQrs(null)
    setTyping(true)
    setTimeout(()=>{
      setTyping(false)
      addBot('🎉 **'+c.name+'** — perfect vibe! Your chat is now themed just for you.\n\nI can answer _any_ question about StreamForge. What do you want to know?')
      setQrs(mainMenuItems())
    },800)
  }

  function mainMenuItems() {
    return [
      {label:'🤔 What is StreamForge?',  fn:()=>askAI('What is StreamForge?')},
      {label:'⚙️ How does it work?',     fn:()=>askAI('How does StreamForge work step by step?')},
      {label:'💰 Pricing plans',          fn:()=>askAI('What are the pricing plans?')},
      {label:'🚀 Get started now',        fn:()=>askAI('How do I get started with StreamForge?'), pr:true},
      {label:'💼 Brand deals?',           fn:()=>askAI('Tell me about brand deals on StreamForge.')},
      {label:'🛡️ Is it safe?',           fn:()=>askAI('Is StreamForge safe for my Twitch or Kick channel?')},
      {label:'👤 Contact team',           fn:()=>askAI('How do I contact the StreamForge team?')},
    ]
  }

  function buildSystem() {
    return [
      "You are the StreamForge AI assistant — friendly, warm, enthusiastic.",
      persona ? PERSONA_CTX[persona] : '',
      char ? 'Their character is "'+char.name+'" ('+char.sub+'). Match that energy.' : '',
      "StreamForge is a private creator collaboration network — NOT bots or fake viewers. Real creators support each other. Fully platform compliant.",
      "PRICING: Starter $49/mo (network, Discord, 5 collabs, analytics). Standard $149/mo (+ priority, verified badge, brand deal alerts, 1 free video edit — most popular). Premium $249/mo (+ max priority, homepage, coaching, brand deal intros, 3 video edits).",
      "TO START: streamforge.gg/pricing → select plan → Dodo Payments checkout → application form → Discord within 24hrs.",
      "CONTACT: contact.streamforge@gmail.com",
      "Keep replies under 120 words. Use **bold** for prices. End with a question or next step. Never mention Claude or Anthropic.",
    ].filter(Boolean).join('\n')
  }

  async function askAI(msg:string, fromInput=false) {
    if(!fromInput) addUser(msg)
    setQrs(null)
    const newHistory = [...history, {role:'user',content:msg}]
    setHistory(newHistory)
    setTyping(true)
    try {
      const res = await fetch('https://api.anthropic.com/v1/messages',{
        method:'POST',
        headers:{'Content-Type':'application/json'},
        body:JSON.stringify({
          model:'claude-sonnet-4-20250514',
          max_tokens:350,
          system:buildSystem(),
          messages:newHistory.slice(-10)
        })
      })
      const d = await res.json()
      setTyping(false)
      const reply = d.content?.[0]?.text ?? "Something went wrong! Email **contact.streamforge@gmail.com** 🙏"
      setHistory(p=>[...p,{role:'assistant',content:reply}])
      addBot(reply)
      setQrs(mainMenuItems())
    } catch {
      setTyping(false)
      addBot("Oops, hit a snag 😅 Email **contact.streamforge@gmail.com** and we'll help fast!")
      setQrs(mainMenuItems())
    }
  }

  function sendMsg() {
    if(!input.trim()) return
    const txt = input.trim(); setInput('')
    if(!persona) {
      addUser(txt)
      const l = txt.toLowerCase()
      const k = l.match(/vtuber|anime|neko/) ? 'vtuber'
        : l.match(/fps|shooter|warzone|valorant/) ? 'fps'
        : l.match(/irl|real life/) ? 'irl'
        : l.match(/sport|fifa|2k|rocket/) ? 'sports'
        : l.match(/rp|roleplay|nopixel/) ? 'rp' : 'variety'
      setTimeout(()=>pickPersona(k),300)
      return
    }
    addUser(txt); askAI(txt, true)
  }

  function resetChat() {
    setPersona(null); setChar(null); setMsgs([]); setQrs(null); setTyping(false); setHistory([])
    setTimeout(initChat, 200)
  }

  function formatMsg(text:string) {
    return text
      .replace(/\n/g,'<br>')
      .replace(/\*\*(.*?)\*\*/g,'<strong>$1</strong>')
      .replace(/_(.*?)_/g,'<em style="color:var(--sf-a3,#e8a83e);font-style:normal">$1</em>')
  }

  const a1 = theme?.a1 ?? '#7c3aed'
  const a2 = theme?.a2 ?? '#0891b2'
  const grad = theme?.grad ?? 'linear-gradient(135deg,#7c3aed,#0891b2)'
  const pattern = theme?.pattern ?? ''

  return (
    <>
      {/* ── FLOATING BUTTON ── */}
      <button
        onClick={()=>setOpen(o=>!o)}
        style={{
          position:'fixed', bottom:'24px', right:'24px', zIndex:9999,
          width:'58px', height:'58px', borderRadius:'50%', border:'none',
          background: grad, cursor:'pointer',
          boxShadow:`0 8px 28px ${a1}55, 0 0 0 ${pulse?'8px':'0px'} ${a1}22`,
          display:'flex', alignItems:'center', justifyContent:'center',
          fontSize:'24px', transition:'all .3s cubic-bezier(.2,0,0,1)',
          transform: open ? 'rotate(180deg) scale(1.1)' : pulse ? 'scale(1.15)' : 'scale(1)',
        }}>
        {open ? '✕' : '💬'}
      </button>

      {/* ── UNREAD BADGE ── */}
      {!open && msgs.length === 0 && (
        <div style={{position:'fixed',bottom:'72px',right:'24px',zIndex:9999,background:grad,borderRadius:'12px',padding:'4px 10px',fontSize:'11px',fontWeight:700,color:'#fff',fontFamily:'var(--font)',animation:'fadeUp .5s 2s both',boxShadow:`0 4px 12px ${a1}44`,pointerEvents:'none'}}>
          Chat with us 👋
        </div>
      )}

      {/* ── CHAT PANEL ── */}
      {open && (
        <div style={{
          position:'fixed', bottom:'96px', right:'24px', zIndex:9998,
          width:'380px', maxWidth:'calc(100vw - 32px)',
          height:'580px', maxHeight:'calc(100vh - 120px)',
          borderRadius:'24px', overflow:'hidden',
          border:`1px solid ${a1}33`,
          boxShadow:`0 32px 80px rgba(0,0,0,.7), 0 0 0 1px rgba(255,255,255,.06), 0 0 60px ${a1}12`,
          display:'flex', flexDirection:'column',
          fontFamily:"'Plus Jakarta Sans',system-ui,sans-serif",
          animation:'chatIn .3s cubic-bezier(.2,0,0,1)',
        }}>

          {/* Background */}
          <div style={{
            position:'absolute', inset:0, zIndex:0,
            background:'#0d0d24',
            backgroundImage: pattern,
            backgroundSize: char ? '30px 30px' : '40px 40px',
          }}/>
          <div style={{position:'absolute',inset:0,zIndex:1,background:'linear-gradient(180deg,rgba(7,7,26,.9) 0%,rgba(7,7,26,.65) 50%,rgba(7,7,26,.92) 100%)'}}/>

          {/* Header */}
          <div style={{position:'relative',zIndex:10,display:'flex',alignItems:'center',gap:'10px',padding:'12px 14px',background:'rgba(0,0,0,.5)',borderBottom:`1px solid rgba(255,255,255,.07)`,backdropFilter:'blur(20px)',flexShrink:0}}>
            <div style={{width:'36px',height:'36px',borderRadius:'50%',background:grad,display:'flex',alignItems:'center',justifyContent:'center',fontSize:'16px',flexShrink:0,boxShadow:`0 0 16px ${a1}55`,border:'2px solid rgba(255,255,255,.15)',transition:'all .4s'}}>
              {botE}
            </div>
            <div style={{flex:1}}>
              <div style={{fontSize:'13px',fontWeight:700,color:'#f0ece4',display:'flex',alignItems:'center',gap:'6px'}}>
                StreamForge AI
                {char && <span style={{fontSize:'10px',fontWeight:700,padding:'2px 7px',borderRadius:'20px',background:grad,color:'#fff'}}>{char.name}</span>}
              </div>
              <div style={{fontSize:'11px',color:a2,display:'flex',alignItems:'center',gap:'4px',marginTop:'1px',transition:'color .4s'}}>
                <span style={{width:'6px',height:'6px',borderRadius:'50%',background:'#22c55e',display:'inline-block',boxShadow:'0 0 0 2px rgba(34,197,94,.3)'}}/>
                {char ? `${PERSONAS[persona!]?.name} Mode · Online` : 'Growth Assistant · Online'}
              </div>
            </div>
            <button onClick={resetChat} style={{width:'28px',height:'28px',borderRadius:'8px',background:'rgba(255,255,255,.07)',border:'1px solid rgba(255,255,255,.1)',cursor:'pointer',color:'#9b9580',fontSize:'13px',display:'flex',alignItems:'center',justifyContent:'center'}}>↺</button>
          </div>

          {/* Messages */}
          <div ref={msgsRef} style={{position:'relative',zIndex:5,flex:1,overflowY:'auto',padding:'12px',display:'flex',flexDirection:'column',gap:'10px',scrollBehavior:'smooth'}}>
            {msgs.map((m,i)=>(
              <div key={i} style={{display:'flex',alignItems:'flex-end',gap:'7px',flexDirection:m.role==='user'?'row-reverse':'row',animation:'mIn .3s both'}}>
                <div style={{width:'28px',height:'28px',borderRadius:'50%',flexShrink:0,display:'flex',alignItems:'center',justifyContent:'center',fontSize:'13px',background:m.role==='bot'?grad:'rgba(255,255,255,.1)',border:`1.5px solid ${m.role==='bot'?'rgba(255,255,255,.15)':'rgba(255,255,255,.1)'}`,boxShadow:m.role==='bot'?`0 0 8px ${a1}33`:'none',transition:'all .4s'}}>
                  {m.role==='bot' ? botE : '👤'}
                </div>
                <div style={{display:'flex',flexDirection:'column',gap:'3px',maxWidth:'78%'}}>
                  <div
                    style={{padding:'9px 13px',fontSize:'13px',lineHeight:1.6,transition:'background .4s',
                      ...(m.role==='bot'
                        ? {background:'rgba(255,255,255,.08)',color:'#f0ece4',borderRadius:'16px 16px 16px 4px',border:'1px solid rgba(255,255,255,.07)'}
                        : {background:grad,color:'#fff',borderRadius:'16px 16px 4px 16px',boxShadow:`0 4px 14px ${a1}33`})
                    }}
                    dangerouslySetInnerHTML={{__html:formatMsg(m.text)}}
                  />
                  <div style={{fontSize:'10px',color:'#504c44',padding:'0 4px',textAlign:m.role==='user'?'right':'left'}}>{m.time}</div>
                </div>
              </div>
            ))}
            {typing && (
              <div style={{display:'flex',alignItems:'center',gap:'7px'}}>
                <div style={{width:'28px',height:'28px',borderRadius:'50%',background:grad,display:'flex',alignItems:'center',justifyContent:'center',fontSize:'13px',flexShrink:0}}>{botE}</div>
                <div style={{background:'rgba(255,255,255,.08)',padding:'10px 14px',borderRadius:'16px 16px 16px 4px',display:'flex',gap:'4px',alignItems:'center'}}>
                  {[0,1,2].map(i=><div key={i} style={{width:'6px',height:'6px',borderRadius:'50%',background:a2,animation:`td 1s ${i*0.16}s infinite`}}/>)}
                </div>
              </div>
            )}
          </div>

          {/* Quick replies */}
          {qrs && (
            <div style={{position:'relative',zIndex:10,padding:'8px 10px 6px',display:'flex',flexWrap:'wrap',gap:'6px',borderTop:'1px solid rgba(255,255,255,.06)',background:'rgba(0,0,0,.2)',flexShrink:0}}>
              {qrs === 'persona' && Object.keys(PERSONAS).map(k=>(
                <button key={k} onClick={()=>pickPersona(k)}
                  style={{padding:'6px 11px',borderRadius:'20px',fontSize:'12px',fontWeight:600,cursor:'pointer',border:'1.5px solid rgba(255,255,255,.13)',background:'rgba(255,255,255,.05)',color:'#f0ece4',fontFamily:'inherit',transition:'all .2s'}}>
                  {PERSONAS[k].e} {PERSONAS[k].name}
                </button>
              ))}
              {qrs === 'char' && (
                <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'7px',width:'100%',padding:'2px 0'}}>
                  {(CHARS[persona!]||[]).map(c=>(
                    <button key={c.id} onClick={()=>pickChar(c)}
                      style={{background:'rgba(255,255,255,.05)',border:`1.5px solid rgba(255,255,255,.1)`,borderRadius:'14px',padding:'10px 8px',cursor:'pointer',textAlign:'center',fontFamily:'inherit',transition:'all .25s'}}>
                      <div style={{fontSize:'22px',marginBottom:'3px'}}>{c.e}</div>
                      <div style={{fontSize:'11px',fontWeight:700,color:'#f0ece4'}}>{c.name}</div>
                      <div style={{fontSize:'10px',color:'#504c44',marginTop:'1px'}}>{c.sub}</div>
                    </button>
                  ))}
                </div>
              )}
              {Array.isArray(qrs) && qrs.map((q,i)=>(
                <button key={i} onClick={q.fn}
                  style={{padding:'6px 11px',borderRadius:'20px',fontSize:'12px',fontWeight:600,cursor:'pointer',fontFamily:'inherit',transition:'all .2s',
                    ...(q.pr
                      ? {background:grad,border:'none',color:'#fff',boxShadow:`0 4px 12px ${a1}33`}
                      : {border:'1.5px solid rgba(255,255,255,.13)',background:'rgba(255,255,255,.05)',color:'#f0ece4'})
                  }}>
                  {q.label}
                </button>
              ))}
            </div>
          )}

          {/* Input */}
          <div style={{position:'relative',zIndex:10,display:'flex',gap:'8px',padding:'10px 12px 14px',background:'rgba(0,0,0,.35)',backdropFilter:'blur(20px)',borderTop:'1px solid rgba(255,255,255,.06)',flexShrink:0}}>
            <input
              value={input} onChange={e=>setInput(e.target.value)}
              onKeyDown={e=>{ if(e.key==='Enter') sendMsg() }}
              placeholder="Ask me anything…"
              style={{flex:1,background:'rgba(255,255,255,.07)',border:`1px solid ${input ? a1+'66' : 'rgba(255,255,255,.1)'}`,borderRadius:'24px',padding:'9px 15px',color:'#f0ece4',fontSize:'13px',fontFamily:'inherit',outline:'none',transition:'border .2s'}}
            />
            <button onClick={sendMsg}
              style={{width:'38px',height:'38px',borderRadius:'50%',background:grad,border:'none',cursor:'pointer',fontSize:'14px',color:'#fff',display:'flex',alignItems:'center',justifyContent:'center',flexShrink:0,boxShadow:`0 4px 12px ${a1}44`,transition:'all .2s'}}>
              ➤
            </button>
          </div>
        </div>
      )}

      <style>{`
        @keyframes chatIn { from{opacity:0;transform:translateY(16px) scale(.97)} to{opacity:1;transform:translateY(0) scale(1)} }
        @keyframes mIn { from{opacity:0;transform:translateY(8px)} to{opacity:1;transform:translateY(0)} }
        @keyframes td { 0%,60%,100%{transform:translateY(0);opacity:.4} 30%{transform:translateY(-4px);opacity:1} }
        @keyframes fadeUp { from{opacity:0;transform:translateY(6px)} to{opacity:1;transform:translateY(0)} }
      `}</style>
    </>
  )
}
