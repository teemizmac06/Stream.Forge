import type { Metadata } from 'next'
import ApplyFormClient from '@/components/ApplyFormClient'

export const metadata: Metadata = {
  title: 'Application Form — StreamForge',
  description: 'Complete your StreamForge application. Tell us about your channel and goals.',
  robots: { index: false, follow: false },
}

export default function ApplyFormPage() {
  return <ApplyFormClient />
}
