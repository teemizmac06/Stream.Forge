import type { Metadata } from 'next'
import IntroScreen from '@/components/IntroScreen'
import HomePage from '@/components/HomePage'

export const metadata: Metadata = {
  title: 'StreamForge — Get Real Viewers & Grow on Twitch, Kick & YouTube',
  description: 'StreamForge is the active viewer network helping streamers increase visibility, improve engagement, and grow organically on Twitch, Kick, YouTube and TikTok. Join 5,800+ streamers. Average Twitch Affiliate in 14 days.',
  openGraph: {
    title: 'StreamForge — Get Real Viewers & Grow on Twitch, Kick & YouTube',
    description: 'Active viewer network. Real engagement. No bots. Twitch Affiliate in 14 days average.',
    url: 'https://streamforge.gg',
  },
  alternates: { canonical: 'https://streamforge.gg' },
}

export default function Page() {
  return (
    <>
      <IntroScreen />
      <HomePage />
    </>
  )
}
