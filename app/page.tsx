import type { Metadata } from 'next'
import IntroScreen from '@/components/IntroScreen'
import HomePage from '@/components/HomePage'

export const metadata: Metadata = {
  title: 'StreamForge — The Private Creator Network Serious Streamers Use',
  description: 'StreamForge is a vetted private creator network helping streamers grow on Twitch, Kick, YouTube and TikTok through real peer collaboration. Join 5,800+ creators. From $49/month.',
  openGraph: {
    title: 'StreamForge — The Private Creator Network Serious Streamers Use',
    description: 'Real creator collaboration. Platform-compliant. Sustainable growth. Join 5,800+ streamers.',
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
