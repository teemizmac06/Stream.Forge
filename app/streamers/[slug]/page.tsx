import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { STREAMERS, getStreamer } from '@/lib/streamersData'
import StreamerProfileClient from '@/components/StreamerProfileClient'

export async function generateStaticParams() {
  return STREAMERS.map(s => ({ slug: s.slug }))
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const s = getStreamer(params.slug)
  if (!s) return { title: 'Streamer Not Found' }
  return {
    title: `${s.name} — StreamForge Success Story`,
    description: `${s.name} went from ${s.stats.avgViewers.before} to ${s.stats.avgViewers.after} avg viewers in ${s.joinedDays} days using StreamForge. Read their full story.`,
    alternates: { canonical: `https://streamforge.gg/streamers/${s.slug}` },
  }
}

export default function StreamerPage({ params }: { params: { slug: string } }) {
  const streamer = getStreamer(params.slug)
  if (!streamer) notFound()
  return <StreamerProfileClient streamer={streamer} />
}
