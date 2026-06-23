'use client'
import { useEffect, useState } from 'react'

export default function IntroScreen() {
  const [dismissed, setDismissed] = useState(false)
  const [animOut, setAnimOut] = useState(false)

  useEffect(() => {
    // Auto dismiss after 3.8s
    const t = setTimeout(() => dismiss(), 3800)
    return () => clearTimeout(t)
  }, [])

  function dismiss() {
    setAnimOut(true)
    setTimeout(() => setDismissed(true), 900)
  }

  if (dismissed) return null

  return (
    <div
      onClick={dismiss}
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center cursor-pointer select-none"
      style={{
        background: '#040410',
        transition: 'transform .9s cubic-bezier(.76,0,.24,1), opacity .5s',
        transform: animOut ? 'translateY(-100%)' : 'translateY(0)',
        opacity: animOut ? 0 : 1,
      }}>

      {/* Ambient glow */}
      <div className="absolute inset-0 pointer-events-none" style={{
        background: 'radial-gradient(ellipse 50% 40% at 50% 50%, rgba(124,58,237,.2), transparent 70%)'
      }}/>

      {/* Logo */}
      <div style={{ animation: 'introFade .7s .3s both' }} className="flex flex-col items-center">
        <div className="w-20 h-20 rounded-2xl flex items-center justify-center text-2xl font-black text-white mb-5"
          style={{
            background: 'linear-gradient(135deg,#7c3aed,#0891b2)',
            boxShadow: '0 0 60px rgba(124,58,237,.5), 0 0 120px rgba(8,145,178,.2)',
          }}>SF</div>

        <div className="font-extrabold tracking-tight text-5xl sm:text-6xl mb-2"
          style={{
            background: 'linear-gradient(135deg,#f0ece4,#e8a83e 55%,#f0ece4)',
            WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
            letterSpacing: '-.04em',
          }}>StreamForge</div>

        <div className="text-xs uppercase tracking-[.3em] mt-1" style={{ color: '#6b6050', animation: 'introFade .7s .55s both' }}>
          Premium Streaming Growth Community
        </div>
      </div>

      {/* Progress bar */}
      <div className="mt-10 w-36 h-0.5 rounded-full overflow-hidden" style={{ background: 'rgba(255,255,255,.06)', animation: 'introFade .7s .8s both' }}>
        <div className="h-full rounded-full" style={{
          background: 'linear-gradient(90deg,#a06820,#e8a83e)',
          animation: 'introBar 2.2s 1s ease forwards',
          width: '0%',
        }}/>
      </div>

      {/* Chevron enter hint */}
      <div className="mt-8 flex flex-col items-center gap-1.5" style={{ animation: 'introFade .7s 1.4s both' }}>
        <div className="flex flex-col gap-1">
          {[0, 180].map((d, i) => (
            <div key={i} className="w-3 h-3" style={{
              borderRight: '2px solid #e8a83e', borderBottom: '2px solid #e8a83e',
              transform: 'rotate(45deg)',
              opacity: i === 1 ? 0.35 : 1,
              animation: `chevBounce 1.3s ${2.1 + i * 0.12}s infinite`,
            }}/>
          ))}
        </div>
        <span className="text-[10px] uppercase tracking-[.2em] mt-1" style={{ color: '#504c44' }}>Enter Site</span>
      </div>

    </div>
  )
}
