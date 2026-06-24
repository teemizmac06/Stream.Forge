import type { Metadata } from 'next'
import PricingClient from '@/components/PricingClient'

export const metadata: Metadata = {
  title: 'Pricing — StreamForge Streamer Growth Plans',
  description: 'StreamForge pricing: Starter $49/mo, Standard $149/mo, Premium $249/mo. Join the active viewer network and grow on Twitch, Kick and YouTube.',
  openGraph: { title: 'StreamForge Pricing', description: 'Simple plans. Real growth. No bots.' },
  alternates: { canonical: 'https://streamforge.gg/pricing' },
}

export default function PricingPage() {
  return <PricingClient />
}
