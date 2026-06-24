import type { Metadata } from 'next'
import './globals.css'
import Navbar from '@/components/Navbar'
import ChatWidget from '@/components/ChatWidget'

export const metadata: Metadata = {
  metadataBase: new URL('https://streamforge.gg'),
  title: { default: 'StreamForge — The Private Creator Network Serious Streamers Use', template: '%s | StreamForge' },
  description: 'StreamForge is a vetted private creator network helping streamers grow on Twitch, Kick, YouTube and TikTok through real peer collaboration. Join 5,800+ creators.',
  keywords: ['how to grow on twitch','twitch growth community','kick streamer growth','streamer network','twitch affiliate fast','streamforge','creator collaboration network'],
  openGraph: { siteName:'StreamForge', type:'website', locale:'en_US', url:'https://streamforge.gg', images:[{url:'/og-image.jpg',width:1200,height:630}] },
  twitter: { card:'summary_large_image', site:'@streamforgegg' },
  robots: { index:true, follow:true },
  alternates: { canonical:'https://streamforge.gg' },
  verification: {
    google: 'google4235f6e63f51c807',
    other: { 'msvalidate.01': '469C98384B62006F72AE769DEAE1C929' }
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" data-theme="dark">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap" rel="stylesheet" />
        <meta name="google-site-verification" content="google4235f6e63f51c807" />
        <meta name="msvalidate.01" content="469C98384B62006F72AE769DEAE1C929" />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
          "@context":"https://schema.org","@type":"Organization","name":"StreamForge",
          "url":"https://streamforge.gg","email":"contact.streamforge@gmail.com",
          "description":"Private creator collaboration network helping streamers grow on Twitch, Kick, YouTube and TikTok.",
          "sameAs":["https://twitter.com/streamforgegg"]
        })}} />
      </head>
      <body style={{ fontFamily:"'Plus Jakarta Sans',system-ui,sans-serif" }}>
        <Navbar />
        <main>{children}</main>

        <footer className="border-t mt-20 py-12 px-6" style={{ background:'#04040e', borderColor:'rgba(255,255,255,.07)' }}>
          <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 mb-10">
            <div className="col-span-2 md:col-span-1">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-8 h-8 rounded-lg flex items-center justify-center text-xs font-black text-white"
                  style={{background:'linear-gradient(135deg,#7c3aed,#0891b2)',boxShadow:'0 0 18px rgba(124,58,237,.45)'}}>SF</div>
                <span className="font-extrabold text-lg tracking-tight" style={{color:'var(--txt)'}}>StreamForge</span>
              </div>
              <p className="text-xs leading-relaxed mb-3" style={{color:'var(--txt3)'}}>Private creator collaboration network. Real streamers growing together on Twitch, Kick, YouTube and TikTok.</p>
              <a href="mailto:contact.streamforge@gmail.com" className="text-xs transition-colors" style={{color:'var(--gold-lo)'}}>contact.streamforge@gmail.com</a>
            </div>
            {[
              { title:'Platform', links:[['/', 'Home'],['/pricing','Pricing'],['/proofs','Live Results'],['/community','Community'],['/faq','FAQ'],['/streamers','Streamers']] },
              { title:'Blog', links:[['/blog/how-to-grow-on-twitch','Grow on Twitch'],['/blog/twitch-algorithm-explained','Twitch Algorithm'],['/blog/what-is-streamforge','What is StreamForge'],['/blog/is-streamforge-real','Is it Real?']] },
              { title:'Contact', links:[['mailto:contact.streamforge@gmail.com','Email Us'],['/faq','FAQ'],['/community','Community'],['/applyform?plan=custom','Apply (Custom)']] }
            ].map(col => (
              <div key={col.title}>
                <h4 className="text-xs font-bold uppercase tracking-wider mb-4" style={{color:'var(--txt2)'}}>{col.title}</h4>
                <ul className="space-y-2 list-none p-0">
                  {col.links.map(([href, label]) => (
                    <li key={href}><a href={href} className="text-xs transition-colors no-underline" style={{color:'var(--txt3)'}}>{label}</a></li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div className="max-w-6xl mx-auto pt-6 flex flex-wrap justify-between items-center gap-3" style={{borderTop:'1px solid rgba(255,255,255,.05)'}}>
            <p className="text-xs" style={{color:'var(--txt3)'}}>© 2026 StreamForge. All rights reserved.</p>
            <p className="text-xs" style={{color:'var(--txt3)'}}>contact.streamforge@gmail.com</p>
          </div>
        </footer>

        <ChatWidget />
      </body>
    </html>
  )
}
