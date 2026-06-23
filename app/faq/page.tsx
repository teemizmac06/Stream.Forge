import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'FAQ — StreamForge Streamer Growth Questions Answered',
  description: 'All your questions about StreamForge answered. Is it safe? Are viewers real? How fast can I grow? How does payment work? Full FAQ for streamers.',
  alternates: { canonical: 'https://streamforge.gg/faq' },
}

const faqGroups = [
  {
    category: 'Safety & Legitimacy',
    icon: '🛡️',
    faqs: [
      { q: 'Is StreamForge safe for my Twitch channel?', a: 'Yes. StreamForge uses 100% real human engagement — no bots, no view injection, no automation scripts. Every viewer is a real streamer from our network. This is fully compliant with Twitch, Kick and YouTube terms of service. We have never had a member banned for using StreamForge correctly.' },
      { q: 'Is StreamForge against Twitch rules?', a: 'No. StreamForge operates through a community of real streamers supporting each other — similar to how streamers naturally network, raid, and host one another. This is not against Twitch rules. Buying bot viewers or using automated view inflation tools is against Twitch rules. StreamForge does not do either of those things.' },
      { q: 'Are the viewers real people?', a: 'Yes, absolutely. Every member of StreamForge is a real, verified streamer. They join your stream, watch, and chat — because they receive the same support in return. This is a coordinated community of real creators, not software or automation.' },
      { q: 'Has StreamForge been reviewed or flagged by Twitch?', a: 'StreamForge has not been flagged by Twitch. We operate as a legitimate streamer community and growth network. We do not use any techniques that violate platform guidelines.' },
    ],
  },
  {
    category: 'How It Works',
    icon: '⚙️',
    faqs: [
      { q: 'How does StreamForge actually work?', a: 'StreamForge places you in active engagement groups with compatible streamers. When you go live, members of your group join, watch and chat in your stream. When they go live, you do the same. This mutual support creates real engagement signals that help platforms discover and recommend your channel to organic viewers.' },
      { q: 'What platforms does StreamForge support?', a: 'StreamForge supports Twitch, Kick, YouTube and TikTok. Many members grow on multiple platforms simultaneously using the same network. Groups are matched by platform, category and timezone.' },
      { q: 'How am I matched with other streamers?', a: 'After joining, our team manually matches you with compatible streamers based on your game category, streaming schedule, platform and goals. This ensures the viewers you receive are genuinely interested in your content type.' },
      { q: 'What happens if I stop streaming for a while?', a: 'You can pause your membership at any time by contacting us. There are no penalties for breaks. When you return, you will be re-integrated into your group.' },
    ],
  },
  {
    category: 'Results & Growth',
    icon: '📈',
    faqs: [
      { q: 'How fast can I see results?', a: 'Most members see increased viewer counts within their first 1–3 streams. Our average member achieves Twitch Affiliate status in 14 days. Some achieve it in as few as 9 days. Results depend on your consistency, streaming schedule and content quality.' },
      { q: 'Can StreamForge help me reach Twitch Partner?', a: 'Yes. We have members who have achieved Twitch Partner through the combination of StreamForge network support and the coaching included in the Elite plan. Partner requires sustained 75 average viewers over 30 days — achievable with consistent effort and the right community behind you.' },
      { q: 'Will I get organic viewers, not just network viewers?', a: 'Yes. Real engagement from network members creates the activity signals (chat rate, concurrent viewers, session length) that Twitch, Kick and YouTube use to recommend your stream to completely new organic viewers. Network support creates the conditions for organic discovery — it does not replace it.' },
      { q: 'Is there a guarantee of specific viewer numbers?', a: 'No. We do not guarantee specific viewer counts because results depend on content quality, consistency and schedule. What we guarantee is that you will have real, active support from the network — the rest depends on how you use it.' },
    ],
  },
  {
    category: 'Pricing & Payment',
    icon: '💳',
    faqs: [
      { q: 'How does payment work?', a: 'Apply using the form on the pricing page. After approval (within 24 hours), we send payment instructions via email. There are no automatic charges. You only pay after being accepted. Payment is currently handled manually via email for security.' },
      { q: 'Can I cancel anytime?', a: 'Yes. No long-term contracts. Cancel at any time by emailing contact.streamforge@gmail.com. Your access continues until the end of the current billing period.' },
      { q: 'What is included in each plan?', a: 'Starter ($55/mo): Basic network access, Discord, 5 collabs/month, analytics. Growth ($149/mo): Everything in Starter plus priority placement, verified badge, brand deal alerts, 1 free video edit. Elite ($240/mo): Everything in Growth plus homepage feature, 7k+ visitor exposure, coaching, brand deal introductions, Partner support, 3 free video edits.' },
      { q: 'Can I upgrade or downgrade my plan?', a: 'Yes. Contact us at contact.streamforge@gmail.com to switch plans. Upgrades take effect immediately. Downgrades take effect at the next renewal.' },
      { q: 'Is there a free trial?', a: 'We do not currently offer a free trial. The Starter plan at $55/month is designed as a low-risk entry point. Most members see measurable results within their first week — making the investment easy to evaluate quickly.' },
    ],
  },
  {
    category: 'Community & Discord',
    icon: '💬',
    faqs: [
      { q: 'What do I get access to after joining?', a: 'After payment confirmation you receive your exclusive Discord invite with access to: active raid networks, collab matching channels, growth coaching, analytics resources, brand deal alerts (Elite), the StreamForge member directory, and your private engagement group.' },
      { q: 'One of your teams contacted me on Discord — is that real?', a: 'StreamForge has four verified teams: Jedidiah, Temmy, levelUpX and Jeremiah. If any of these teams reached out to you, you can verify them on our main website — same name, same logo, same handle listed. Never pay anyone outside our official email: contact.streamforge@gmail.com.' },
      { q: 'Is StreamForge open to international streamers?', a: 'Yes — 100% worldwide. We have members from Nigeria, UK, USA, France, Brazil, Canada, Germany and 40+ other countries. The community is active around the clock across all time zones.' },
    ],
  },
]

export default function FAQPage() {
  const allFaqs = faqGroups.flatMap(g => g.faqs.map(f => ({ ...f, category: g.category })))

  return (
    <>
      {/* HERO */}
      <section className="py-20 px-5 text-center border-b border-white/[.07]" style={{ background: 'linear-gradient(180deg,rgba(124,58,237,.08),transparent)' }}>
        <div className="max-w-2xl mx-auto">
          <div className="section-tag mb-3">FAQ</div>
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight mb-4 gradient-text">All Your Questions. Answered.</h1>
          <p className="text-[#9b9580] text-base leading-relaxed">Everything you need to know before joining StreamForge. Can't find your answer? Email us.</p>
          <a href="mailto:contact.streamforge@gmail.com" className="inline-block mt-4 text-sm text-[#a06820] hover:text-[#e8a83e] transition-colors">contact.streamforge@gmail.com →</a>
        </div>
      </section>

      {/* CATEGORIES NAV */}
      <section className="py-6 px-5 border-b border-white/[.07] bg-[#0e0e28]/60">
        <div className="max-w-4xl mx-auto flex flex-wrap justify-center gap-2">
          {faqGroups.map(g => (
            <a key={g.category} href={`#${g.category.toLowerCase().replace(/\s+&\s+/g, '-').replace(/\s+/g, '-')}`}
              className="text-xs font-semibold text-[#9b9580] hover:text-[#e8a83e] glass glass-gold px-4 py-2 rounded-full transition-colors no-underline">
              {g.icon} {g.category}
            </a>
          ))}
        </div>
      </section>

      {/* FAQ GROUPS */}
      <section className="py-16 px-5">
        <div className="max-w-3xl mx-auto flex flex-col gap-16">
          {faqGroups.map(group => (
            <div key={group.category} id={group.category.toLowerCase().replace(/\s+&\s+/g, '-').replace(/\s+/g, '-')}>
              <div className="flex items-center gap-3 mb-6">
                <span className="text-2xl">{group.icon}</span>
                <h2 className="text-xl font-extrabold tracking-tight text-[#f0ece4]">{group.category}</h2>
              </div>
              <div className="flex flex-col gap-3">
                {group.faqs.map(f => (
                  <details key={f.q}
                    className="group p-5 rounded-xl bg-white/[.03] border border-white/[.08] hover:border-[rgba(232,168,62,.25)] transition-colors cursor-pointer">
                    <summary className="flex justify-between items-start text-sm font-bold text-[#f0ece4] list-none gap-4">
                      <span>{f.q}</span>
                      <span className="text-[#e8a83e] group-open:rotate-180 transition-transform text-xs flex-shrink-0 mt-0.5">▼</span>
                    </summary>
                    <p className="text-sm text-[#9b9580] leading-relaxed mt-4">{f.a}</p>
                  </details>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* STILL HAVE QUESTIONS */}
      <section className="py-16 px-5 border-t border-white/[.07]">
        <div className="max-w-xl mx-auto text-center glass glass-gold rounded-2xl p-10">
          <div className="text-3xl mb-3">💬</div>
          <h2 className="text-2xl font-extrabold tracking-tight mb-3 text-[#f0ece4]">Still Have Questions?</h2>
          <p className="text-[#9b9580] text-sm mb-6 leading-relaxed">Our team responds within 24 hours. We are happy to answer anything before you commit.</p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <a href="mailto:contact.streamforge@gmail.com?subject=StreamForge Question" className="btn-gold px-6 py-3 rounded-xl text-sm font-bold no-underline">✉ Email Us Directly</a>
            <Link href="/pricing" className="btn-outline-gold px-6 py-3 rounded-xl text-sm no-underline">View Pricing →</Link>
          </div>
        </div>
      </section>

      {/* JSON-LD FAQPage */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": allFaqs.map(f => ({
          "@type": "Question",
          "name": f.q,
          "acceptedAnswer": { "@type": "Answer", "text": f.a }
        }))
      })}} />
    </>
  )
}
