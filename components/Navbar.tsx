'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [theme, setTheme] = useState<'dark'|'light'>('dark')
  const [lang, setLang] = useState('en')

  useEffect(() => {
    // Auto-detect device theme — respects system dark/light mode in real time
    const mq = window.matchMedia('(prefers-color-scheme: dark)')

    function applyTheme(dark: boolean) {
      // Check if user has manually overridden
      const stored = localStorage.getItem('sf-theme-manual')
      const resolved = stored ? (stored as 'dark'|'light') : (dark ? 'dark' : 'light')
      setTheme(resolved)
      document.documentElement.setAttribute('data-theme', resolved)
    }

    // Initial apply
    applyTheme(mq.matches)

    // Listen for OS theme changes in real time
    const onMqChange = (e: MediaQueryListEvent) => {
      // Only auto-switch if user hasn't manually overridden
      if (!localStorage.getItem('sf-theme-manual')) applyTheme(e.matches)
    }
    mq.addEventListener('change', onMqChange)

    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll)
    return () => {
      mq.removeEventListener('change', onMqChange)
      window.removeEventListener('scroll', onScroll)
    }
  }, [])

  function toggleTheme() {
    const next = theme === 'dark' ? 'light' : 'dark'
    setTheme(next)
    document.documentElement.setAttribute('data-theme', next)
    // Store as manual override so auto-detection respects user choice
    localStorage.setItem('sf-theme-manual', next)
  }

  function handleLang(l: string) {
    setLang(l)
    // Dispatch custom event so page components can react
    window.dispatchEvent(new CustomEvent('sf-lang', { detail: l }))
  }

  const links = [
    { href: '/#discover', label: 'Discover' },
    { href: '/#results',  label: 'Results' },
    { href: '/#how',      label: 'How It Works' },
    { href: '/pricing',   label: 'Pricing' },
    { href: '/#apply',    label: 'Apply' },
  ]

  return (
    <nav className={`sticky top-0 z-[200] transition-all duration-300 ${scrolled ? 'py-3 shadow-2xl' : 'py-4'}`}
      style={{ background:'var(--glass)', borderBottom:'1px solid var(--bdr)', backdropFilter:'blur(24px) saturate(1.6)', WebkitBackdropFilter:'blur(24px) saturate(1.6)' }}>
      <div className="max-w-6xl mx-auto px-5 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 no-underline">
          <div className="w-8 h-8 rounded-lg flex items-center justify-center text-xs font-black text-white flex-shrink-0"
            style={{ background:'linear-gradient(135deg,#7c3aed,#0891b2)', boxShadow:'0 0 18px rgba(124,58,237,.45)' }}>SF</div>
          <span className="font-extrabold text-lg tracking-tight" style={{color:'var(--txt)'}}>StreamForge</span>
        </Link>

        {/* Desktop links */}
        <ul className="hidden md:flex items-center gap-5 list-none m-0 p-0">
          {links.map(l => (
            <li key={l.href}>
              <a href={l.href} className="text-sm font-medium no-underline relative group transition-colors" style={{color:'var(--txt2)'}}>
                {l.label}
                <span className="absolute -bottom-0.5 left-0 w-0 h-px group-hover:w-full transition-all duration-300" style={{background:'var(--gold)'}} />
              </a>
            </li>
          ))}
          <li>
            <Link href="/community" className="text-sm font-bold no-underline" style={{color:'var(--gold)'}}>✍ Community</Link>
          </li>
        </ul>

        {/* Right */}
        <div className="hidden md:flex items-center gap-3">
          {/* Lang */}
          <select value={lang} onChange={e => handleLang(e.target.value)}
            className="text-xs px-2 py-1 rounded-lg border cursor-pointer"
            style={{background:'transparent', borderColor:'var(--bdr)', color:'var(--txt2)'}}>
            <option value="en">🌐 EN</option>
            <option value="fr">🇫🇷 FR</option>
            <option value="es">🇪🇸 ES</option>
            <option value="pt">🇧🇷 PT</option>
          </select>

          {/* Theme toggle — default DARK, light mode on toggle */}
          <button onClick={toggleTheme}
            className="w-12 h-6 rounded-full relative cursor-pointer border flex-shrink-0 transition-colors"
            style={{ background: theme==='light' ? 'rgba(232,168,62,.2)' : 'rgba(255,255,255,.08)', borderColor:'var(--bdr)' }}
            title={theme==='dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}>
            <div className="absolute top-0.5 w-5 h-5 rounded-full flex items-center justify-center text-xs transition-all duration-300"
              style={{ background:'linear-gradient(135deg,#e8a83e,#ea580c)', left: theme==='light' ? 'calc(100% - 22px)' : '2px', boxShadow:'0 2px 8px rgba(232,168,62,.4)' }}>
              {theme==='dark' ? '☀️' : '🌙'}
            </div>
          </button>

          <button onClick={() => {
            const modal = document.getElementById('dc-modal')
            if (modal) { modal.style.display='flex'; document.body.style.overflow='hidden' }
          }} className="text-sm font-bold px-3 py-2 rounded-lg transition-all no-underline"
            style={{background:'rgba(88,101,242,.2)', color:'#7c87f0', border:'1px solid rgba(88,101,242,.3)'}}>
            💬 Discord
          </button>

          <a href="https://www.twitch.tv" target="_blank" className="text-sm font-bold px-3 py-2 rounded-lg no-underline transition-all"
            style={{background:'rgba(145,71,255,.2)', color:'#9147ff', border:'1px solid rgba(145,71,255,.3)'}}>
            Twitch
          </a>
        </div>

        {/* Mobile burger */}
        <button className="md:hidden p-2" onClick={() => setMenuOpen(!menuOpen)} style={{color:'var(--txt2)'}}>
          <div className="w-5 flex flex-col gap-1.5">
            <span className={`block h-0.5 bg-current transition-all ${menuOpen?'rotate-45 translate-y-2':''}`}/>
            <span className={`block h-0.5 bg-current transition-all ${menuOpen?'opacity-0':''}`}/>
            <span className={`block h-0.5 bg-current transition-all ${menuOpen?'-rotate-45 -translate-y-2':''}`}/>
          </div>
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden px-5 py-4 flex flex-col gap-3 border-t" style={{background:'var(--bg2)', borderColor:'var(--bdr)'}}>
          {links.map(l => (
            <a key={l.href} href={l.href} onClick={()=>setMenuOpen(false)}
              className="text-sm font-medium no-underline py-1 transition-colors" style={{color:'var(--txt2)'}}>{l.label}</a>
          ))}
          <div className="flex items-center gap-3 pt-2 border-t" style={{borderColor:'var(--bdr)'}}>
            <select value={lang} onChange={e=>handleLang(e.target.value)} className="text-xs px-2 py-1.5 rounded-lg flex-1" style={{background:'transparent',borderColor:'var(--bdr)',color:'var(--txt2)'}}>
              <option value="en">🌐 EN</option><option value="fr">🇫🇷 FR</option>
              <option value="es">🇪🇸 ES</option><option value="pt">🇧🇷 PT</option>
            </select>
            <button onClick={toggleTheme} className="text-sm px-3 py-1.5 rounded-lg border" style={{borderColor:'var(--bdr)',color:'var(--txt2)'}}>
              {theme==='dark'?'☀️ Light':'🌙 Dark'}
            </button>
          </div>
          <Link href="/pricing" onClick={()=>setMenuOpen(false)} className="btn-gold text-center py-3 rounded-xl text-sm font-bold no-underline">🚀 Start Growing</Link>
        </div>
      )}
    </nav>
  )
}
