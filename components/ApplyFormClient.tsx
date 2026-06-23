'use client'
import { useState, useEffect, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'

/* ── Plan labels ── */
const PLAN_LABELS: Record<string, { label: string; price: string; color: string }> = {
  Starter:  { label: 'Starter',  price: '$49/mo',  color: '#e8a83e' },
  Standard: { label: 'Standard', price: '$149/mo', color: '#e8a83e' },
  Premium:  { label: 'Premium',  price: '$249/mo', color: '#a78bfa' },
  custom:   { label: 'Custom Budget', price: 'Custom', color: '#0891b2' },
}

const GOALS = [
  '🏆 Reach Partner', '⭐ Get Affiliate', '📊 Rank in Category',
  '💰 Make Income', '🎮 Grow Community', '📣 Beat Promoters',
  '🤝 Get Brand Deals', '👥 Build Fanbase',
]

const PLATFORMS = ['Twitch', 'Kick', 'YouTube', 'TikTok', 'Multiple']
const VIEWERS   = ['0–5', '5–20', '20–100', '100–500', '500+']

function ApplyFormInner() {
  const params = useSearchParams()

  /* ── Read URL params ── */
  const paid        = params.get('paid') === 'true'
  const planParam   = params.get('plan') || ''
  const budgetParam = params.get('budget') || ''
  const isCustom    = planParam === 'custom'
  const isAllowed   = paid || isCustom

  /* ── Form state ── */
  const [name,     setName]     = useState('')
  const [email,    setEmail]    = useState('')
  const [discord,  setDiscord]  = useState('')
  const [platform, setPlatform] = useState('')
  const [viewers,  setViewers]  = useState('')
  const [link,     setLink]     = useState('')
  const [bio,      setBio]      = useState('')
  const [goals,    setGoals]    = useState<string[]>([])
  const [other,    setOther]    = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [blocked,   setBlocked]   = useState(false)

  /* ── Check payment gate on mount ── */
  useEffect(() => {
    if (!isAllowed) setBlocked(true)
  }, [isAllowed])

  function toggleGoal(g: string) {
    setGoals(prev => prev.includes(g) ? prev.filter(x => x !== g) : [...prev, g])
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!name.trim() || !email.trim()) return
    if (!isAllowed) { setBlocked(true); return }

    const planInfo = PLAN_LABELS[planParam] || PLAN_LABELS['Starter']
    const allGoals = [...goals, ...(other.trim() ? [`Other: ${other}`] : [])]

    const subject = `StreamForge Application — ${name} [${planInfo.label} ${planInfo.price}]`
    const body = [
      'Hello StreamForge Team,',
      '',
      'A new application has been submitted.',
      '',
      '==========================================',
      ' APPLICATION DETAILS',
      '==========================================',
      '',
      `Name:             ${name}`,
      `Email:            ${email}`,
      `Discord Username: ${discord || 'Not provided'}`,
      `Platform:         ${platform || 'Not specified'}`,
      `Avg Live Viewers: ${viewers || 'Not specified'}`,
      `Channel Link:     ${link || 'Not provided'}`,
      `Plan Selected:    ${planInfo.label} (${planInfo.price})`,
      `Payment Status:   ${paid ? '✅ PAID via Dodo Payments' : isCustom ? '💬 Custom Budget: $' + budgetParam + '/mo' : 'Unknown'}`,
      `Goals:            ${allGoals.length ? allGoals.join(', ') : 'Not specified'}`,
      '',
      '--- About Their Stream ---',
      bio || 'Not provided',
      '',
      '==========================================',
      `Submitted via streamforge.gg/applyform`,
      paid ? 'Payment confirmed via Dodo Payments.' : `Custom budget request: $${budgetParam}/month`,
    ].join('\n')

    const mailto = `mailto:contact.streamforge@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
    window.location.href = mailto
    setTimeout(() => setSubmitted(true), 700)
  }

  /* ── BLOCKED: no payment, no custom budget ── */
  if (blocked) {
    return (
      <div className="min-h-screen flex items-center justify-center px-5" style={{ background: 'var(--bg)' }}>
        <div className="max-w-md w-full text-center p-8 rounded-2xl" style={{ background: 'rgba(220,38,38,.08)', border: '1px solid rgba(220,38,38,.25)' }}>
          <div className="text-5xl mb-4">🔒</div>
          <h2 className="text-xl font-extrabold mb-3" style={{ color: '#f0ece4' }}>Payment Required</h2>
          <p className="text-sm mb-6 leading-relaxed" style={{ color: '#9b9580' }}>
            You need to complete payment before accessing the application form. Please select a plan and pay via Dodo Payments first.
          </p>
          <Link href="/pricing" className="inline-block px-8 py-3.5 rounded-xl text-sm font-bold no-underline" style={{ background: 'linear-gradient(135deg,#a06820,#e8a83e)', color: '#0a0806' }}>
            ← Go to Pricing
          </Link>
        </div>
      </div>
    )
  }

  /* ── SUCCESS ── */
  if (submitted) {
    return (
      <div className="min-h-screen flex items-center justify-center px-5" style={{ background: 'var(--bg)' }}>
        <div className="max-w-md w-full text-center">
          <div className="text-6xl mb-5">📬</div>
          <h2 className="text-2xl font-extrabold mb-3" style={{ color: '#f0ece4' }}>Application Sent!</h2>
          <p className="text-sm mb-2 leading-relaxed" style={{ color: '#9b9580' }}>
            Your email app just opened with everything pre-filled.
          </p>
          <p className="text-sm mb-6 leading-relaxed" style={{ color: '#9b9580' }}>
            Just press <strong style={{ color: '#f0ece4' }}>Send</strong> — we will reply to{' '}
            <strong style={{ color: '#e8a83e' }}>{email}</strong> within 24 hours.
          </p>
          <div className="p-5 rounded-2xl mb-6 text-left" style={{ background: 'rgba(255,255,255,.04)', border: '1px solid rgba(255,255,255,.08)' }}>
            <div className="text-xs font-bold mb-3" style={{ color: '#f0ece4' }}>What happens next:</div>
            <div className="flex flex-col gap-2 text-xs" style={{ color: '#9b9580' }}>
              <div>1️⃣  Send the email that just opened</div>
              <div>2️⃣  We reply to <span style={{ color: '#e8a83e' }}>{email}</span> within 24 hours</div>
              <div>3️⃣  Receive your exclusive Discord invite</div>
              <div style={{ color: '#504c44' }}>📬 Check spam if you don't see our reply</div>
            </div>
          </div>
          <Link href="/" className="text-sm no-underline" style={{ color: '#a06820' }}>← Back to StreamForge</Link>
        </div>
      </div>
    )
  }

  const planInfo = PLAN_LABELS[planParam] || null

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg)' }}>

      {/* ── HEADER ── */}
      <section className="py-14 px-5 text-center border-b" style={{ background: 'linear-gradient(180deg,rgba(124,58,237,.08),transparent)', borderColor: 'rgba(255,255,255,.07)' }}>
        <div className="max-w-xl mx-auto">

          {/* Payment confirmed badge */}
          {paid && (
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-5 text-xs font-bold" style={{ background: 'rgba(22,163,74,.12)', border: '1px solid rgba(22,163,74,.3)', color: '#22c55e' }}>
              <span>✅</span> Payment Confirmed — Complete Your Application
            </div>
          )}
          {isCustom && (
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-5 text-xs font-bold" style={{ background: 'rgba(8,145,178,.12)', border: '1px solid rgba(8,145,178,.3)', color: '#0891b2' }}>
              <span>✏️</span> Custom Budget Application — ${budgetParam}/month
            </div>
          )}

          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-3" style={{ color: '#f0ece4' }}>
            Complete Your Application
          </h1>
          <p className="text-sm leading-relaxed" style={{ color: '#9b9580' }}>
            Fill in your details below. Clicking submit opens your email app pre-filled — just press Send.
          </p>

          {/* Selected plan pill */}
          {planInfo && (
            <div className="inline-flex items-center gap-2 mt-4 px-4 py-2 rounded-full text-xs font-bold" style={{ background: 'rgba(232,168,62,.1)', border: '1px solid rgba(232,168,62,.25)', color: planInfo.color }}>
              Plan: {planInfo.label} · {planInfo.price}
            </div>
          )}
        </div>
      </section>

      {/* ── FORM ── */}
      <section className="py-12 px-5">
        <div className="max-w-xl mx-auto">
          <form onSubmit={handleSubmit} className="rounded-2xl p-7 flex flex-col gap-5" style={{ background: 'rgba(255,255,255,.04)', border: '1px solid rgba(232,168,62,.2)', backdropFilter: 'blur(20px)' }}>

            {/* Hidden fields for email context */}
            <input type="hidden" name="plan" value={planParam} />
            <input type="hidden" name="paid" value={paid ? 'true' : 'false'} />
            <input type="hidden" name="budget" value={budgetParam} />

            {/* Name + Email */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold mb-1.5" style={{ color: '#9b9580' }}>Streamer Name *</label>
                <input required value={name} onChange={e => setName(e.target.value)}
                  placeholder="e.g. NightStrike" className="w-full px-3 py-2.5 rounded-xl text-sm" />
              </div>
              <div>
                <label className="block text-xs font-semibold mb-1.5" style={{ color: '#9b9580' }}>Email Address *</label>
                <input required type="email" value={email} onChange={e => setEmail(e.target.value)}
                  placeholder="your@email.com" className="w-full px-3 py-2.5 rounded-xl text-sm" />
              </div>
            </div>

            {/* Discord username */}
            <div>
              <label className="block text-xs font-semibold mb-1.5" style={{ color: '#9b9580' }}>
                Discord Username *
                <span className="ml-1 text-[10px] font-normal" style={{ color: '#504c44' }}>(required for community access)</span>
              </label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm font-bold" style={{ color: '#7c87f0' }}>@</span>
                <input required value={discord} onChange={e => setDiscord(e.target.value)}
                  placeholder="yourdiscordname" className="w-full pl-7 pr-3 py-2.5 rounded-xl text-sm" />
              </div>
            </div>

            {/* Platform + Viewers */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold mb-1.5" style={{ color: '#9b9580' }}>Primary Platform</label>
                <select value={platform} onChange={e => setPlatform(e.target.value)} className="w-full px-3 py-2.5 rounded-xl text-sm">
                  <option value="">Select platform</option>
                  {PLATFORMS.map(p => <option key={p}>{p}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-xs font-semibold mb-1.5" style={{ color: '#9b9580' }}>Avg Live Viewers</label>
                <select value={viewers} onChange={e => setViewers(e.target.value)} className="w-full px-3 py-2.5 rounded-xl text-sm">
                  <option value="">Select range</option>
                  {VIEWERS.map(v => <option key={v}>{v}</option>)}
                </select>
              </div>
            </div>

            {/* Channel link */}
            <div>
              <label className="block text-xs font-semibold mb-1.5" style={{ color: '#9b9580' }}>Channel Link</label>
              <input value={link} onChange={e => setLink(e.target.value)}
                placeholder="https://twitch.tv/yourchannel" className="w-full px-3 py-2.5 rounded-xl text-sm" />
            </div>

            {/* Goals */}
            <div>
              <label className="block text-xs font-semibold mb-2" style={{ color: '#9b9580' }}>
                Your Goals <span style={{ color: '#504c44', fontWeight: 400 }}>(select all that apply)</span>
              </label>
              <div className="grid grid-cols-2 gap-2">
                {GOALS.map(g => {
                  const sel = goals.includes(g)
                  return (
                    <label key={g} onClick={() => toggleGoal(g)}
                      className="flex items-center gap-2 text-xs cursor-pointer p-2.5 rounded-xl border transition-all select-none"
                      style={{
                        background: sel ? 'rgba(232,168,62,.08)' : 'rgba(255,255,255,.02)',
                        borderColor: sel ? 'rgba(232,168,62,.4)' : 'rgba(255,255,255,.08)',
                        color: sel ? '#e8a83e' : '#9b9580',
                      }}>
                      <span className="w-4 h-4 rounded flex items-center justify-center text-[9px] font-black flex-shrink-0 border transition-all"
                        style={{ background: sel ? '#e8a83e' : 'transparent', borderColor: sel ? '#e8a83e' : 'rgba(255,255,255,.2)', color: sel ? '#0a0806' : 'transparent' }}>
                        {sel ? '✓' : ''}
                      </span>
                      {g}
                    </label>
                  )
                })}
              </div>
              <div className="mt-2">
                <input value={other} onChange={e => setOther(e.target.value)}
                  placeholder="Other goal? Type here..." className="w-full px-3 py-2 rounded-xl text-xs" />
              </div>
            </div>

            {/* About */}
            <div>
              <label className="block text-xs font-semibold mb-1.5" style={{ color: '#9b9580' }}>Tell us about your stream</label>
              <textarea value={bio} onChange={e => setBio(e.target.value)} rows={3}
                placeholder="What do you stream? Current situation? What do you need most?"
                className="w-full px-3 py-2.5 rounded-xl text-sm resize-none" />
            </div>

            {/* Payment summary */}
            <div className="p-4 rounded-xl" style={{ background: paid ? 'rgba(22,163,74,.08)' : 'rgba(8,145,178,.08)', border: `1px solid ${paid ? 'rgba(22,163,74,.2)' : 'rgba(8,145,178,.2)'}` }}>
              <div className="text-xs font-bold mb-1" style={{ color: paid ? '#22c55e' : '#0891b2' }}>
                {paid ? '✅ Payment Confirmed' : '✏️ Custom Budget Application'}
              </div>
              <div className="text-xs" style={{ color: '#9b9580' }}>
                {paid
                  ? `Plan: ${planInfo?.label || 'StreamForge'} · ${planInfo?.price || ''} · Payment processed via Dodo Payments`
                  : `Custom budget: $${budgetParam}/month · We will contact you within 24 hours`}
              </div>
            </div>

            {/* Submit */}
            <button type="submit"
              disabled={!name.trim() || !email.trim() || !discord.trim()}
              className="w-full py-4 rounded-2xl text-sm font-extrabold border-none cursor-pointer transition-all duration-300"
              style={{
                background: (!name.trim() || !email.trim() || !discord.trim())
                  ? 'rgba(255,255,255,.06)'
                  : 'linear-gradient(135deg,#a06820,#e8a83e)',
                color: (!name.trim() || !email.trim() || !discord.trim()) ? '#504c44' : '#0a0806',
                cursor: (!name.trim() || !email.trim() || !discord.trim()) ? 'not-allowed' : 'pointer',
                boxShadow: (!name.trim() || !email.trim() || !discord.trim()) ? 'none' : '0 8px 24px rgba(232,168,62,.3)',
              }}>
              ✦ Submit Application — Opens Email App
            </button>
            <p className="text-[10px] text-center" style={{ color: '#504c44' }}>
              Your email app opens pre-filled · Just press Send · We reply within 24 hours
            </p>

          </form>
        </div>
      </section>
    </div>
  )
}

/* Wrap in Suspense because useSearchParams requires it in Next.js 14 */
export default function ApplyFormClient() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center" style={{ background: 'var(--bg)' }}>
        <div className="text-center">
          <div className="text-4xl mb-4">⏳</div>
          <p style={{ color: '#9b9580' }}>Loading your application...</p>
        </div>
      </div>
    }>
      <ApplyFormInner />
    </Suspense>
  )
}
