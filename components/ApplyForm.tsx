'use client'
import { useState } from 'react'

const GOALS = ['🏆 Reach Partner','⭐ Get Affiliate','📊 Rank in Category','💰 Make Income','🎮 Grow Community','📣 Beat Promoters','🤝 Get Brand Deals','👥 Build Fanbase']

export default function ApplyForm() {
  const [submitted, setSubmitted] = useState(false)
  const [email, setEmail] = useState('')
  const [name, setName] = useState('')
  const [plat, setPlat] = useState('')
  const [viewers, setViewers] = useState('')
  const [link, setLink] = useState('')
  const [plan, setPlan] = useState('')
  const [bio, setBio] = useState('')
  const [goals, setGoals] = useState<string[]>([])
  const [mailtoUrl, setMailtoUrl] = useState('')

  function toggleGoal(g: string) {
    setGoals(prev => prev.includes(g) ? prev.filter(x => x !== g) : [...prev, g])
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!name.trim()) { alert('Please enter your streamer name.'); return }
    if (!email.trim()) { alert('Please enter your email address.'); return }
    const subject = `StreamForge Application: ${name} [${plat || 'Platform TBD'}]`
    const body = [
      'Hello StreamForge Team,',
      '',
      'I am applying to join the StreamForge community.',
      '',
      '==========================================',
      ' APPLICATION DETAILS',
      '==========================================',
      '',
      `Name:          ${name}`,
      `Reply Email:   ${email}`,
      `Platform:      ${plat || 'Not specified'}`,
      `Avg Viewers:   ${viewers || 'Not specified'}`,
      `Channel Link:  ${link || 'Not provided'}`,
      `Plan:          ${plan || 'Not specified'}`,
      `Goals:         ${goals.length ? goals.join(', ') : 'Not specified'}`,
      '',
      '--- About My Stream ---',
      bio || 'Not provided',
      '',
      '==========================================',
      'Submitted via streamforge.gg/pricing',
    ].join('\n')

    const url = `mailto:contact.streamforge@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
    setMailtoUrl(url)
    window.location.href = url
    setTimeout(() => setSubmitted(true), 600)
  }

  if (submitted) {
    return (
      <div className="text-center py-8">
        <div className="text-5xl mb-4">📬</div>
        <h3 className="text-xl font-extrabold text-green-400 mb-2">Your Email App Just Opened!</h3>
        <p className="text-sm text-[#9b9580] mb-4 leading-relaxed">
          Everything is pre-filled — <strong className="text-[#f0ece4]">just press Send</strong> in your mail app.
        </p>
        <p className="text-xs text-[#504c44] mb-5">
          We will reply to <strong className="text-[#e8a83e]">{email}</strong> within 24 hours.
        </p>
        {mailtoUrl && (
          <a href={mailtoUrl} className="inline-block btn-gold px-6 py-3 rounded-xl text-sm font-bold no-underline mb-3">
            ✉ Open Email App →
          </a>
        )}
        <div className="mt-5 p-4 rounded-xl bg-white/[.03] border border-white/[.07] text-left text-xs text-[#9b9580] max-w-sm mx-auto">
          <div className="font-bold text-[#f0ece4] mb-2">What happens next:</div>
          <div className="space-y-1">
            <div>1️⃣ Send the email that opened in your mail app</div>
            <div>2️⃣ We reply to <span className="text-[#e8a83e]">{email}</span> within 24 hours</div>
            <div>3️⃣ Receive payment details and Discord access</div>
          </div>
          <div className="mt-2 text-[#504c44]">📬 Check your spam folder if you don&apos;t see our reply</div>
        </div>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <p className="text-xs text-[#9b9580] leading-relaxed">
        <strong className="text-[#e8a83e]">Paid community</strong> — payment details sent after approval. No automatic charges. Response within 24 hours.
      </p>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-xs text-[#9b9580] mb-1.5">Streamer Name *</label>
          <input required value={name} onChange={e=>setName(e.target.value)} placeholder="e.g. NightStrike" className="w-full px-3 py-2.5 text-sm rounded-lg" />
        </div>
        <div>
          <label className="block text-xs text-[#9b9580] mb-1.5">Email Address *</label>
          <input required type="email" value={email} onChange={e=>setEmail(e.target.value)} placeholder="your@email.com" className="w-full px-3 py-2.5 text-sm rounded-lg" />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-xs text-[#9b9580] mb-1.5">Primary Platform</label>
          <select value={plat} onChange={e=>setPlat(e.target.value)} className="w-full px-3 py-2.5 text-sm rounded-lg">
            <option value="">Select platform</option>
            {['Twitch','Kick','YouTube','TikTok','Multiple'].map(p=><option key={p}>{p}</option>)}
          </select>
        </div>
        <div>
          <label className="block text-xs text-[#9b9580] mb-1.5">Avg Live Viewers</label>
          <select value={viewers} onChange={e=>setViewers(e.target.value)} className="w-full px-3 py-2.5 text-sm rounded-lg">
            <option value="">Select range</option>
            {['0–5','5–20','20–100','100–500','500+'].map(v=><option key={v}>{v}</option>)}
          </select>
        </div>
      </div>

      <div>
        <label className="block text-xs text-[#9b9580] mb-1.5">Channel Link</label>
        <input value={link} onChange={e=>setLink(e.target.value)} placeholder="https://twitch.tv/yourchannel" className="w-full px-3 py-2.5 text-sm rounded-lg" />
      </div>

      <div>
        <label className="block text-xs text-[#9b9580] mb-1.5">Plan Interested In</label>
        <select value={plan} onChange={e=>setPlan(e.target.value)} className="w-full px-3 py-2.5 text-sm rounded-lg">
          <option value="">Select a plan</option>
          <option>Starter — $55/month</option>
          <option>Growth — $149/month</option>
          <option>Elite — $240/month</option>
        </select>
      </div>

      <div>
        <label className="block text-xs text-[#9b9580] mb-2">Your Goals</label>
        <div className="grid grid-cols-2 gap-2">
          {GOALS.map(g=>(
            <label key={g} onClick={()=>toggleGoal(g)}
              className={`flex items-center gap-2 text-xs cursor-pointer p-2 rounded-lg border transition-colors ${goals.includes(g) ? 'border-[rgba(232,168,62,.4)] bg-[rgba(232,168,62,.08)] text-[#e8a83e]' : 'border-white/[.08] text-[#9b9580] hover:border-[rgba(232,168,62,.25)]'}`}>
              <span className={`w-3.5 h-3.5 rounded flex items-center justify-center text-[9px] font-black flex-shrink-0 border ${goals.includes(g) ? 'bg-[#e8a83e] border-[#e8a83e] text-[#0a0806]' : 'border-white/20'}`}>
                {goals.includes(g) ? '✓' : ''}
              </span>
              {g}
            </label>
          ))}
        </div>
      </div>

      <div>
        <label className="block text-xs text-[#9b9580] mb-1.5">Tell us about your stream</label>
        <textarea value={bio} onChange={e=>setBio(e.target.value)} rows={3} placeholder="What do you stream? Current situation? What do you need most?" className="w-full px-3 py-2.5 text-sm rounded-lg resize-none" />
      </div>

      <button type="submit" className="btn-gold w-full py-3.5 rounded-xl text-sm font-bold border-none cursor-pointer">
        ✦ Submit Application — Opens Email App
      </button>
      <p className="text-[10px] text-[#504c44] text-center">Your email app opens pre-filled · Just press Send</p>
    </form>
  )
}
