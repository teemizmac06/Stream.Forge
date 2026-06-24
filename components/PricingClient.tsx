'use client'
import { useState } from 'react'
import Link from 'next/link'

const DODO = {
  Starter:  'https://checkout.dodopayments.com/buy/pdt_0NfAyFcEQeysnKTtiGsRM?quantity=1',
  Standard: 'https://checkout.dodopayments.com/buy/pdt_0NfB0D6grqzpkYwydOiDd?quantity=1',
  Premium:  'https://checkout.dodopayments.com/buy/pdt_0NfB11ufsZtof47YiaFug?quantity=1',
}

interface Feature { yes: boolean; text: string; star?: boolean }
interface Plan {
  key: 'Starter' | 'Standard' | 'Premium'
  price: number; tagline: string; badge: string | null
  popular: boolean; color: string; borderColor: string; glowColor: string
  features: Feature[]; note: string; noteIcon: string
  stack?: { item: string; val: string }[]
}

const PLANS: Plan[] = [
  {
    key: 'Starter', price: 49,
    tagline: 'Perfect for getting into the network',
    badge: null, popular: false,
    color: 'rgba(255,255,255,.04)', borderColor: 'rgba(255,255,255,.1)', glowColor: 'rgba(255,255,255,.06)',
    features: [
      { yes: true,  text: 'Full network access from day 1' },
      { yes: true,  text: 'Active creator community Discord' },
      { yes: true,  text: '5 collab & co-stream requests/month' },
      { yes: true,  text: 'Basic growth analytics dashboard' },
      { yes: true,  text: 'Streamer directory listing' },
      { yes: false, text: 'Priority placement in groups' },
      { yes: false, text: 'Professional video edits' },
      { yes: false, text: 'Brand deal introductions' },
      { yes: false, text: 'Homepage feature slot' },
    ],
    note: 'Best entry point — full network access from day one',
    noteIcon: '⚡',
  },
  {
    key: 'Standard', price: 149,
    tagline: 'For streamers serious about scaling',
    badge: '⭐ Most Popular', popular: true,
    color: 'rgba(232,168,62,.05)', borderColor: 'rgba(232,168,62,.5)', glowColor: 'rgba(232,168,62,.15)',
    features: [
      { yes: true,  text: 'Everything in Starter' },
      { yes: true,  text: 'Priority placement in engagement groups' },
      { yes: true,  text: 'Increase visibility in your category' },
      { yes: true,  text: 'Reach 75+ active community members' },
      { yes: true,  text: 'Grow subscribers and returning supporters' },
      { yes: true,  text: 'Access to brand deals & sponsorship opportunities' },
      { yes: true,  text: 'Verified badge on StreamForge' },
      { yes: true,  text: 'Advanced analytics dashboard' },
      { yes: true,  text: '1 FREE professional video edit', star: true },
      { yes: false, text: 'Homepage feature slot' },
    ],
    note: 'Most popular — members see the strongest ROI on this plan',
    noteIcon: '🔥',
  },
  {
    key: 'Premium', price: 249,
    tagline: 'For streamers who want everything',
    badge: '👑 Maximum Growth', popular: false,
    color: 'rgba(124,58,237,.05)', borderColor: 'rgba(124,58,237,.5)', glowColor: 'rgba(124,58,237,.15)',
    features: [
      { yes: true, text: 'Everything in Standard' },
      { yes: true, text: 'Maximum priority in all engagement groups' },
      { yes: true, text: 'Dominate your game category presence' },
      { yes: true, text: 'Channel listed on StreamForge homepage' },
      { yes: true, text: 'Exposed to 7,000+ daily site visitors' },
      { yes: true, text: '1-on-1 growth coaching sessions' },
      { yes: true, text: 'Direct brand deal introductions' },
      { yes: true, text: 'Partner application support' },
      { yes: true, text: '3 FREE professional video edits', star: true },
    ],
    stack: [
      { item: '3 professional video edits', val: '$120' },
      { item: 'Homepage feature slot',      val: '$80'  },
      { item: '7k+ daily visitor exposure', val: '$60'  },
      { item: '1-on-1 coaching sessions',   val: '$90'  },
    ],
    note: 'Brand deals alone cover the monthly cost for most Premium members',
    noteIcon: '💰',
  },
]

type PlanKey = 'Starter' | 'Standard' | 'Premium' | 'Custom' | null

export default function PricingClient() {
  const [selected, setSelected] = useState<PlanKey>(null)
  const [customBudget, setCustomBudget] = useState('')
  const [customSubmitted, setCustomSubmitted] = useState(false)

  const selectedPlan = PLANS.find(p => p.key === selected)

  function getButtonLabel() {
    if (!selected) return 'Select a Plan Above to Continue'
    if (selected === 'Custom') {
      if (!customBudget.trim()) return 'Enter Your Budget First'
      return `Submit Application — $${customBudget}/month`
    }
    return `Continue to Checkout — $${selectedPlan?.price}`
  }

  function handleMainCTA() {
    if (!selected) return
    if (selected === 'Custom') {
      if (!customBudget.trim()) return
      // Build mailto for custom budget
      const subject = `StreamForge Custom Budget Application — $${customBudget}/month`
      const body = [
        'Hello StreamForge Team,',
        '',
        'I would like to apply with a custom budget.',
        '',
        `Custom Budget: $${customBudget}/month`,
        '',
        'Please send me details on what plan would work for my budget.',
        '',
        '(Fill in your details):',
        'Name: ',
        'Discord: ',
        'Platform: ',
        'Channel link: ',
        '',
        'Submitted from streamforge.gg/pricing',
      ].join('\n')
      const mailto = `mailto:contact.streamforge@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
      window.location.href = mailto
      setTimeout(() => setCustomSubmitted(true), 600)
      return
    }
    window.location.href = DODO[selected as keyof typeof DODO]
  }

  const isDisabled = !selected || (selected === 'Custom' && !customBudget.trim())

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg)', fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif" }}>

      {/* ── HERO ── */}
      <section className="py-16 px-5 text-center border-b" style={{ background: 'linear-gradient(180deg,rgba(124,58,237,.1),transparent)', borderColor: 'rgba(255,255,255,.07)' }}>
        <div className="max-w-3xl mx-auto">
          <div className="inline-block text-xs font-bold uppercase tracking-widest px-4 py-1.5 rounded-full mb-4" style={{ background: 'rgba(232,168,62,.1)', border: '1px solid rgba(232,168,62,.22)', color: '#e8a83e' }}>
            Choose Your Plan
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight mb-4" style={{ background: 'linear-gradient(135deg,#f0ece4,#e8a83e 50%,#67e8f9)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
            One Decision That Changes Everything
          </h1>
          <p className="text-base max-w-xl mx-auto mb-4 leading-relaxed" style={{ color: 'var(--txt2)' }}>
            Join 5,800+ creators growing together. Select your plan, checkout securely, fill your application — get Discord access within 24 hours.
          </p>
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-bold" style={{ background: 'rgba(22,163,74,.12)', border: '1px solid rgba(22,163,74,.3)', color: '#22c55e' }}>
            <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
            14 streamers joined in the last 24 hours
          </div>
        </div>
      </section>

      {/* ── STEP BAR ── */}
      <div className="max-w-lg mx-auto px-5 py-5">
        <div className="flex items-center justify-center gap-2">
          {([['1','Select Plan', true], ['2','Checkout', selected && selected !== 'Custom'], ['3','Application', false]] as [string,string,boolean|null][]).map(([n,label,active],i)=>(
            <div key={i} className="flex items-center gap-2">
              <div className="flex items-center gap-1.5">
                <div className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-300"
                  style={{ background: active ? 'linear-gradient(135deg,#a06820,#e8a83e)' : 'rgba(255,255,255,.08)', color: active ? '#0a0806' : 'var(--txt3)', border: active ? 'none' : '1px solid rgba(255,255,255,.1)' }}>
                  {n}
                </div>
                <span className="text-xs font-semibold hidden sm:block" style={{ color: active ? 'var(--txt)' : 'var(--txt3)' }}>{label}</span>
              </div>
              {i < 2 && <div className="w-8 h-px" style={{ background: 'rgba(255,255,255,.1)' }} />}
            </div>
          ))}
        </div>
      </div>

      {/* ── PLAN CARDS ── */}
      <section className="px-5 pb-4">
        <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-5 items-start">
          {PLANS.map(plan => {
            const isSel = selected === plan.key
            return (
              <div key={plan.key}
                onClick={() => setSelected(plan.key)}
                className="relative rounded-2xl p-6 cursor-pointer transition-all duration-300 select-none"
                style={{
                  background: isSel ? plan.color : 'rgba(255,255,255,.03)',
                  border: `2px solid ${isSel ? plan.borderColor : 'rgba(255,255,255,.08)'}`,
                  boxShadow: isSel ? `0 0 40px ${plan.glowColor}, 0 8px 32px rgba(0,0,0,.3)` : '0 2px 12px rgba(0,0,0,.2)',
                  transform: isSel ? 'translateY(-4px) scale(1.01)' : 'none',
                }}>

                {/* Badge */}
                {plan.badge && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full text-xs font-extrabold whitespace-nowrap"
                    style={{ background: plan.popular ? 'linear-gradient(135deg,#a06820,#e8a83e)' : 'linear-gradient(135deg,#7c3aed,#0891b2)', color: plan.popular ? '#0a0806' : '#fff' }}>
                    {plan.badge}
                  </div>
                )}

                {/* Selected check */}
                {isSel && (
                  <div className="absolute top-3 right-3 w-7 h-7 rounded-full flex items-center justify-center font-black text-sm text-[#0a0806]"
                    style={{ background: 'linear-gradient(135deg,#a06820,#e8a83e)', boxShadow: '0 0 12px rgba(232,168,62,.5)' }}>✓</div>
                )}

                <div className="text-xs font-bold uppercase tracking-widest mb-1 mt-2" style={{ color: 'var(--txt2)' }}>{plan.key}</div>
                <div className="flex items-end gap-1 mb-1">
                  <span className="text-5xl font-extrabold leading-none" style={{ color: '#e8a83e' }}>${plan.price}</span>
                  <span className="text-sm mb-1.5" style={{ color: 'var(--txt3)' }}>/month</span>
                </div>
                <div className="text-xs mb-4 pb-4" style={{ color: 'var(--txt2)', borderBottom: '1px solid rgba(255,255,255,.07)' }}>{plan.tagline}</div>

                <ul className="flex flex-col gap-2.5 mb-4">
                  {plan.features.map(f => (
                    <li key={f.text} className="flex items-start gap-2.5 text-xs leading-relaxed">
                      <span className="flex-shrink-0 mt-0.5 w-4 h-4 rounded-full flex items-center justify-center text-[9px] font-black"
                        style={{
                          background: f.yes ? (f.star ? 'rgba(232,168,62,.2)' : 'rgba(22,163,74,.2)') : 'rgba(255,255,255,.06)',
                          color: f.yes ? (f.star ? '#e8a83e' : '#22c55e') : 'var(--txt3)',
                          border: f.yes ? (f.star ? '1px solid rgba(232,168,62,.4)' : '1px solid rgba(22,163,74,.35)') : '1px solid rgba(255,255,255,.08)',
                        }}>
                        {f.yes ? (f.star ? '★' : '✓') : '✗'}
                      </span>
                      <span style={{ color: f.yes ? (f.star ? '#e8a83e' : 'var(--txt)') : 'var(--txt3)', fontWeight: f.star ? 700 : 400 }}>{f.text}</span>
                    </li>
                  ))}
                </ul>

                {/* Value stack */}
                {plan.stack && (
                  <div className="mb-4 p-3 rounded-xl" style={{ background: 'rgba(232,168,62,.06)', border: '1px solid rgba(232,168,62,.18)' }}>
                    <div className="text-[10px] font-bold uppercase tracking-wider mb-2" style={{ color: '#e8a83e' }}>📦 Included Value</div>
                    {plan.stack.map(s => (
                      <div key={s.item} className="flex justify-between text-xs py-1.5" style={{ borderBottom: '1px solid rgba(255,255,255,.05)' }}>
                        <span style={{ color: 'var(--txt2)' }}>{s.item}</span>
                        <span className="font-bold" style={{ color: '#22c55e' }}>{s.val}</span>
                      </div>
                    ))}
                    <div className="flex justify-between text-sm font-bold pt-2 mt-0.5">
                      <span style={{ color: 'var(--txt)' }}>Total value inside</span>
                      <span style={{ color: '#e8a83e' }}>$350+ free</span>
                    </div>
                  </div>
                )}

                {/* Select button */}
                <div className="w-full text-center py-2.5 rounded-xl text-xs font-bold transition-all duration-300"
                  style={{
                    background: isSel ? 'linear-gradient(135deg,#a06820,#e8a83e)' : 'rgba(255,255,255,.05)',
                    color: isSel ? '#0a0806' : 'var(--txt2)',
                    border: isSel ? 'none' : '1px solid rgba(255,255,255,.1)',
                    boxShadow: isSel ? '0 4px 16px rgba(232,168,62,.3)' : 'none',
                  }}>
                  {isSel ? '✓ Selected' : `Select ${plan.key}`}
                </div>

                {/* Note */}
                <div className="flex items-center gap-1.5 mt-2 p-2 rounded-lg" style={{ background: 'rgba(255,255,255,.03)' }}>
                  <span className="text-sm">{plan.noteIcon}</span>
                  <span className="text-[10px] leading-tight" style={{ color: 'var(--txt3)' }}>{plan.note}</span>
                </div>
              </div>
            )
          })}
        </div>

        {/* ── CUSTOM BUDGET ── */}
        <div className="max-w-6xl mx-auto mt-5">
          {customSubmitted ? (
            <div className="rounded-2xl p-6 text-center" style={{ background: 'rgba(22,163,74,.08)', border: '1px solid rgba(22,163,74,.25)' }}>
              <div className="text-4xl mb-3">📬</div>
              <h3 className="text-lg font-extrabold mb-2" style={{ color: '#22c55e' }}>Application Sent!</h3>
              <p className="text-sm" style={{ color: 'var(--txt2)' }}>Your email app opened pre-filled. Just press Send — we reply within 24 hours.</p>
            </div>
          ) : (
            <div
              onClick={() => setSelected('Custom')}
              className="relative rounded-2xl p-6 cursor-pointer transition-all duration-300"
              style={{
                background: selected === 'Custom' ? 'rgba(8,145,178,.08)' : 'rgba(255,255,255,.03)',
                border: `2px solid ${selected === 'Custom' ? 'rgba(8,145,178,.5)' : 'rgba(255,255,255,.08)'}`,
                boxShadow: selected === 'Custom' ? '0 0 30px rgba(8,145,178,.12)' : 'none',
                transform: selected === 'Custom' ? 'translateY(-2px)' : 'none',
              }}>
              {selected === 'Custom' && (
                <div className="absolute top-3 right-3 w-6 h-6 rounded-full flex items-center justify-center text-xs font-black text-white"
                  style={{ background: 'linear-gradient(135deg,#0891b2,#67e8f9)' }}>✓</div>
              )}
              <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xl">✏️</span>
                    <span className="text-base font-extrabold tracking-tight" style={{ color: 'var(--txt)' }}>Custom Budget</span>
                  </div>
                  <p className="text-sm" style={{ color: 'var(--txt2)' }}>
                    None of the plans fit right now? Tell us what you can afford — we will work something out.
                    <br /><span className="text-xs" style={{ color: 'var(--txt3)' }}>Submits a request directly to our team via email.</span>
                  </p>
                </div>
                {selected === 'Custom' && (
                  <div className="flex items-center gap-3" onClick={e => e.stopPropagation()}>
                    <span className="text-lg font-bold" style={{ color: '#e8a83e' }}>$</span>
                    <input
                      type="number"
                      value={customBudget}
                      onChange={e => setCustomBudget(e.target.value)}
                      placeholder="Your monthly budget"
                      autoFocus
                      min="1"
                      className="px-4 py-2.5 rounded-xl text-sm w-52"
                      style={{ background: 'rgba(255,255,255,.08)', border: '1px solid rgba(8,145,178,.4)', color: 'var(--txt)' }}
                    />
                    <span className="text-xs whitespace-nowrap" style={{ color: 'var(--txt3)' }}>/month</span>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* ── STICKY CTA BUTTON ── */}
      <div className="sticky bottom-0 left-0 right-0 z-50 px-5 pb-5 pt-3"
        style={{ background: 'linear-gradient(to top, var(--bg) 55%, transparent)', backdropFilter: 'blur(12px)' }}>
        <div className="max-w-lg mx-auto">
          <button
            onClick={handleMainCTA}
            disabled={isDisabled}
            className="w-full py-4 rounded-2xl text-base font-extrabold transition-all duration-300 border-none"
            style={{
              background: isDisabled ? 'rgba(255,255,255,.06)' : selected === 'Custom' ? 'linear-gradient(135deg,#0891b2,#67e8f9)' : 'linear-gradient(135deg,#a06820,#e8a83e)',
              color: isDisabled ? 'var(--txt3)' : '#0a0806',
              cursor: isDisabled ? 'not-allowed' : 'pointer',
              boxShadow: !isDisabled ? `0 8px 32px ${selected === 'Custom' ? 'rgba(8,145,178,.35)' : 'rgba(232,168,62,.35)'}` : 'none',
              transform: !isDisabled ? 'translateY(-1px)' : 'none',
              fontSize: '1rem', fontFamily: 'inherit',
            }}>
            {getButtonLabel()}
          </button>

          {selected && selected !== 'Custom' && (
            <p className="text-center text-xs mt-2" style={{ color: 'var(--txt3)' }}>
              🔒 Secure checkout via Dodo Payments · After payment you complete your application
            </p>
          )}
          {selected === 'Custom' && !customSubmitted && (
            <p className="text-center text-xs mt-2" style={{ color: 'var(--txt3)' }}>
              Opens your email app pre-filled · Just press Send · We reply within 24 hours
            </p>
          )}
          {!selected && (
            <p className="text-center text-xs mt-2" style={{ color: 'var(--txt3)' }}>
              ↑ Tap a plan above to continue
            </p>
          )}
        </div>
      </div>

      {/* ── HOW IT WORKS ── */}
      <section className="py-14 px-5 border-t" style={{ borderColor: 'rgba(255,255,255,.07)' }}>
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl font-extrabold tracking-tight text-center mb-8" style={{ color: 'var(--txt)' }}>What Happens After You Pay</h2>
          <div className="grid sm:grid-cols-3 gap-5">
            {[
              { n:'1', icon:'🛒', t:'Pay Securely', d:'Select your plan and checkout via Dodo Payments. Takes under 60 seconds. Instant confirmation email sent to you.' },
              { n:'2', icon:'📋', t:'Fill Application', d:'You are redirected to a short application form. Tell us about your channel and goals. Takes 2 minutes.' },
              { n:'3', icon:'🚀', t:'Get Discord Access', d:'We review your application and send your exclusive Discord invite within 24 hours. You are inside the network.' },
            ].map(s => (
              <div key={s.n} className="text-center p-5 rounded-2xl" style={{ background: 'rgba(255,255,255,.03)', border: '1px solid rgba(255,255,255,.07)' }}>
                <div className="w-10 h-10 rounded-full mx-auto mb-3 flex items-center justify-center text-sm font-black text-[#0a0806]"
                  style={{ background: 'linear-gradient(135deg,#a06820,#e8a83e)' }}>{s.n}</div>
                <div className="text-xl mb-2">{s.icon}</div>
                <div className="text-sm font-bold mb-1" style={{ color: 'var(--txt)' }}>{s.t}</div>
                <div className="text-xs leading-relaxed" style={{ color: 'var(--txt2)' }}>{s.d}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── GUARANTEE + TRUST ── */}
      <section className="py-10 px-5 border-t" style={{ borderColor: 'rgba(255,255,255,.07)', background: 'linear-gradient(180deg,rgba(22,163,74,.04),transparent)' }}>
        <div className="max-w-4xl mx-auto grid sm:grid-cols-3 gap-5">
          {[
            { icon:'🛡️', t:'30-Day Promise', d:'If you follow the process and see no community growth in 30 days, contact us. We will work with you until it works.' },
            { icon:'🔒', t:'Secure Checkout', d:'All payments via Dodo Payments — PCI compliant, encrypted, trusted globally. We never see your card details.' },
            { icon:'⚡', t:'Access in 24 Hours', d:'After payment and application, your Discord invite arrives within 24 hours. No long waits.' },
          ].map(g => (
            <div key={g.t} className="text-center p-5 rounded-2xl" style={{ background: 'rgba(255,255,255,.03)', border: '1px solid rgba(255,255,255,.07)' }}>
              <div className="text-3xl mb-3">{g.icon}</div>
              <div className="text-sm font-bold mb-2" style={{ color: 'var(--txt)' }}>{g.t}</div>
              <div className="text-xs leading-relaxed" style={{ color: 'var(--txt2)' }}>{g.d}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── ROI SECTION ── */}
      <section className="py-10 px-5 border-t" style={{ borderColor: 'rgba(255,255,255,.07)' }}>
        <div className="max-w-3xl mx-auto rounded-2xl p-7" style={{ background: 'rgba(232,168,62,.06)', border: '1px solid rgba(232,168,62,.2)' }}>
          <h3 className="text-lg font-extrabold mb-5 text-center" style={{ color: 'var(--txt)' }}>💰 What Members Typically Earn Back</h3>
          <div className="grid sm:grid-cols-2 gap-6">
            <div>
              <div className="text-xs font-bold uppercase tracking-wider mb-3" style={{ color: '#ef4444' }}>Without StreamForge</div>
              {['Months grinding alone with no results','No brand deal opportunities','No structured accountability','Motivation fades — many quit','Lost income from delayed monetisation'].map(i=>(
                <div key={i} className="flex items-start gap-2 mb-2 text-xs" style={{ color: 'var(--txt2)' }}>
                  <span style={{ color: '#ef4444', flexShrink:0 }}>✗</span>{i}
                </div>
              ))}
            </div>
            <div>
              <div className="text-xs font-bold uppercase tracking-wider mb-3" style={{ color: '#22c55e' }}>With StreamForge Standard ($149/mo)</div>
              {['Immediate community and collaboration','Brand deal alerts from day one','1 free professional video edit ($40 value)','Verified badge = credibility with sponsors','Most members earn plan cost back in month 1'].map(i=>(
                <div key={i} className="flex items-start gap-2 mb-2 text-xs" style={{ color: 'var(--txt2)' }}>
                  <span style={{ color: '#22c55e', flexShrink:0 }}>✓</span>{i}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="py-10 px-5 border-t" style={{ borderColor: 'rgba(255,255,255,.07)' }}>
        <div className="max-w-2xl mx-auto">
          <h2 className="text-xl font-extrabold text-center mb-6" style={{ color: 'var(--txt)' }}>Quick Answers</h2>
          {[
            { q:'Is payment secure?', a:'Yes. Dodo Payments is PCI compliant and encrypted. We never see your card details.' },
            { q:'What happens after I pay?', a:'You are redirected to a short application form. Fill it in and we review within 24 hours, then send your Discord invite.' },
            { q:'Can I cancel anytime?', a:'Yes. No contracts. Email contact.streamforge@gmail.com anytime to cancel.' },
            { q:'What if I cannot afford any plan?', a:'Select Custom Budget above, enter what you can afford, and click the button. It opens your email pre-filled — just press Send.' },
            { q:'How quickly will I see results?', a:'Most members notice community activity in their first 1–3 streams. Platform milestones typically follow within the first 2–4 weeks.' },
          ].map((f, i) => (
            <details key={i} className="mb-3 p-4 rounded-xl cursor-pointer" style={{ background: 'rgba(255,255,255,.03)', border: '1px solid rgba(255,255,255,.08)' }}>
              <summary className="text-sm font-bold list-none flex justify-between items-center" style={{ color: 'var(--txt)' }}>
                {f.q}<span style={{ color: '#e8a83e', flexShrink:0, marginLeft:'8px' }}>▼</span>
              </summary>
              <p className="text-xs leading-relaxed mt-3" style={{ color: 'var(--txt2)' }}>{f.a}</p>
            </details>
          ))}
        </div>
      </section>

      {/* Schema */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context":"https://schema.org","@type":"PriceSpecification","name":"StreamForge Pricing","url":"https://streamforge.gg/pricing",
        "offers":[
          {"@type":"Offer","name":"Starter","price":"49","priceCurrency":"USD","description":"Basic network access"},
          {"@type":"Offer","name":"Standard","price":"149","priceCurrency":"USD","description":"Priority placement and full features"},
          {"@type":"Offer","name":"Premium","price":"249","priceCurrency":"USD","description":"Maximum growth with coaching and brand deals"},
        ]
      })}} />
    </div>
  )
}
