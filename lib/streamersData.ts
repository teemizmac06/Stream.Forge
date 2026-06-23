export interface Streamer {
  slug: string
  name: string
  handle: string
  avatar: string
  verified: boolean
  plan: 'Starter' | 'Standard' | 'Premium'
  platforms: string[]
  games: string[]
  location: string
  bio: string
  joinedDays: number
  story: string
  stats: {
    avgViewers: { before: number; after: number }
    peakViewers: { before: number; after: number }
    followers: { before: number; after: number }
    chatMessages: { before: number; after: number }
    hoursStreamed: number
    streamPerformance: number
    followerConversion: number
    mostActiveHour: string
    bestCategory: string
  }
  milestones: { icon: string; label: string; days: number }[]
  socials: { platform: string; handle: string; url: string }[]
  review: { quote: string; date: string; platform: string }
  teamLead: string
}

export const STREAMERS: Streamer[] = [
  {
    slug: 'glitchrex',
    name: 'GlitchRex',
    handle: 'glitchrex',
    avatar: 'https://i.pravatar.cc/150?img=3',
    verified: true,
    plan: 'Premium',
    platforms: ['Twitch', 'YouTube'],
    games: ['Valorant', 'CS2', 'Apex Legends'],
    location: 'United States',
    bio: 'Competitive FPS streamer grinding ranked since 2022. Started with 2 viewers, now consistently hitting 40+ with active chat every stream. StreamForge changed the trajectory completely.',
    joinedDays: 74,
    story: "I was streaming Valorant for 8 months consistently — good quality, good mic, decent gameplay. Still stuck at 2–3 viewers every single stream. Most of them were bots or friends who felt obligated to be there. I almost quit.\n\nA streamer I followed mentioned StreamForge in a DM. I was skeptical — I had tried two other services that were basically fake. But the difference was immediately obvious. Real people showed up. They chatted. They stuck around for 2+ hours.\n\nIn 74 days I went from averaging 2 viewers to consistently hitting 40+ with 847 chat messages per stream. I hit Twitch Partner last month. This is the thing that actually works.",
    stats: {
      avgViewers: { before: 2, after: 40 },
      peakViewers: { before: 6, after: 89 },
      followers: { before: 312, after: 1840 },
      chatMessages: { before: 47, after: 847 },
      hoursStreamed: 105,
      streamPerformance: 68,
      followerConversion: 8.2,
      mostActiveHour: '8:00 PM – 9:00 PM',
      bestCategory: 'Valorant',
    },
    milestones: [
      { icon: '⭐', label: 'Twitch Affiliate', days: 11 },
      { icon: '🏆', label: 'Twitch Partner', days: 74 },
      { icon: '💰', label: 'First Brand Deal', days: 42 },
      { icon: '👥', label: '1,000 Followers', days: 38 },
    ],
    socials: [
      { platform: 'twitch',  handle: 'glitchrex',   url: 'https://twitch.tv/glitchrex' },
      { platform: 'youtube', handle: '@GlitchRex',  url: 'https://youtube.com/@GlitchRex' },
      { platform: 'twitter', handle: '@glitchrex_', url: 'https://twitter.com/glitchrex_' },
    ],
    review: { quote: "Went from 2 avg viewers to Twitch Partner in 74 days. The real viewer system changed everything. I was about to quit streaming forever.", date: 'May 2026', platform: 'Twitch' },
    teamLead: 'Jedidiah',
  },
  {
    slug: 'skylafps',
    name: 'SkylaFPS',
    handle: 'skylafps',
    avatar: 'https://i.pravatar.cc/150?img=44',
    verified: true,
    plan: 'Standard',
    platforms: ['Twitch', 'TikTok'],
    games: ['Valorant', 'Apex Legends'],
    location: 'United Kingdom',
    bio: 'Female FPS streamer focused on ranked Valorant. Hit Partner in under 3 months through StreamForge. Community members showed up every single stream.',
    joinedDays: 92,
    story: "Everyone told me female FPS streamers either blow up fast or get ignored. I was getting ignored. 7 months of consistent streaming — still averaging 4 viewers.\n\nJoined StreamForge on the Standard plan. Within the first week I had 15+ people consistently in my chat who were actually engaged — responding to clips, asking about my settings, staying for the whole stream.\n\nThe algorithm started noticing the retention. Within 3 months I hit Twitch Partner. The brand deals came next. Everything compounded once the foundation was there.",
    stats: {
      avgViewers: { before: 4, after: 61 },
      peakViewers: { before: 12, after: 142 },
      followers: { before: 891, after: 4200 },
      chatMessages: { before: 89, after: 1240 },
      hoursStreamed: 142,
      streamPerformance: 84,
      followerConversion: 11.4,
      mostActiveHour: '7:00 PM – 8:00 PM',
      bestCategory: 'Valorant',
    },
    milestones: [
      { icon: '⭐', label: 'Twitch Affiliate', days: 9 },
      { icon: '🏆', label: 'Twitch Partner', days: 92 },
      { icon: '💼', label: 'First Brand Deal', days: 67 },
      { icon: '👥', label: '4,000 Followers', days: 90 },
    ],
    socials: [
      { platform: 'twitch',  handle: 'SkylaFPS',  url: 'https://twitch.tv/skylafps' },
      { platform: 'tiktok',  handle: '@skylafps', url: 'https://tiktok.com/@skylafps' },
      { platform: 'twitter', handle: '@SkylaFPS_', url: 'https://twitter.com/skylafps_' },
    ],
    review: { quote: "Partner in under 3 months. Community members showed up every single stream without fail. The consistency is what makes it work.", date: 'April 2026', platform: 'Twitch' },
    teamLead: 'Jedidiah',
  },
  {
    slug: 'coastaltv',
    name: 'CoastalTV',
    handle: 'coastaltv',
    avatar: 'https://i.pravatar.cc/150?img=15',
    verified: true,
    plan: 'Standard',
    platforms: ['Twitch'],
    games: ['CS2', 'Warzone'],
    location: 'Canada',
    bio: 'FPS streamer focused on CS2 ranked grind. Hit Affiliate in 11 days. Went from 3 avg viewers to 60+ every stream.',
    joinedDays: 11,
    story: "11 days. That is how long it took me to hit Twitch Affiliate after joining StreamForge. I had been streaming for 4 months before that — same result every time: 3 viewers.\n\nReal people started showing up and staying. Not for 5 minutes — for the whole stream. The chat was alive for the first time. My average climbed from 3 to 12 in week one, then to 35 by week three.\n\nNow I average 60+ consistently. When new organic viewers stumble on my stream they see an active chat and they stay. That is the cycle StreamForge starts.",
    stats: {
      avgViewers: { before: 3, after: 60 },
      peakViewers: { before: 8, after: 127 },
      followers: { before: 204, after: 1100 },
      chatMessages: { before: 31, after: 634 },
      hoursStreamed: 88,
      streamPerformance: 71,
      followerConversion: 7.8,
      mostActiveHour: '9:00 PM – 10:00 PM',
      bestCategory: 'CS2',
    },
    milestones: [
      { icon: '⭐', label: 'Twitch Affiliate', days: 11 },
      { icon: '👥', label: '1,000 Followers', days: 58 },
      { icon: '💰', label: 'First Sub Revenue', days: 14 },
    ],
    socials: [
      { platform: 'twitch',  handle: 'CoastalTV',   url: 'https://twitch.tv/coastaltv' },
      { platform: 'twitter', handle: '@CoastalTV_', url: 'https://twitter.com/coastaltv_' },
    ],
    review: { quote: "11 days to affiliate. Had 3 viewers before. Now averaging 60+ every stream. The chat activity alone changed how every stream feels.", date: 'March 2026', platform: 'Twitch' },
    teamLead: 'Jedidiah',
  },
  {
    slug: 'zaralive',
    name: 'ZaraLive',
    handle: 'zaralive_',
    avatar: 'https://i.pravatar.cc/150?img=46',
    verified: true,
    plan: 'Premium',
    platforms: ['Twitch', 'TikTok', 'Kick'],
    games: ['IRL', 'Just Chatting'],
    location: 'Nigeria',
    bio: 'IRL and lifestyle creator growing across Twitch, TikTok and Kick simultaneously. First brand deal came through the StreamForge Premium network.',
    joinedDays: 45,
    story: "Being a creator from Nigeria, I always felt like the international streaming community was not built for me. Most services do not work here. Most networks do not reach here.\n\nStreamForge was different. I had members supporting my streams from the UK, US, Canada, and other African countries within my first week.\n\nAt 45 days I landed my first brand deal through the Premium network. $800. More than I had made from streaming in the 6 months before. The brand found me through the StreamForge platform — I did not have to cold email anyone.",
    stats: {
      avgViewers: { before: 5, after: 38 },
      peakViewers: { before: 14, after: 94 },
      followers: { before: 430, after: 2800 },
      chatMessages: { before: 62, after: 520 },
      hoursStreamed: 76,
      streamPerformance: 79,
      followerConversion: 9.1,
      mostActiveHour: '6:00 PM – 7:00 PM',
      bestCategory: 'Just Chatting',
    },
    milestones: [
      { icon: '⭐', label: 'Twitch Affiliate', days: 14 },
      { icon: '💼', label: 'First Brand Deal — $800', days: 45 },
      { icon: '🌍', label: 'Top 5 IRL on Kick', days: 31 },
      { icon: '👥', label: '2,500 Followers', days: 42 },
    ],
    socials: [
      { platform: 'twitch',  handle: 'ZaraLive',   url: 'https://twitch.tv/zaralive_' },
      { platform: 'tiktok',  handle: '@zaralive_', url: 'https://tiktok.com/@zaralive_' },
      { platform: 'kick',    handle: 'ZaraLive',   url: 'https://kick.com/zaralive' },
      { platform: 'twitter', handle: '@ZaraLive_', url: 'https://twitter.com/zaralive_' },
    ],
    review: { quote: "$800 brand deal came through the network. Never had to cold DM anyone. The opportunity found me. StreamForge for international creators is genuinely game-changing.", date: 'May 2026', platform: 'Kick' },
    teamLead: 'Temmy',
  },
  {
    slug: 'pulsegamer',
    name: 'PulseGamer',
    handle: 'pulsegamer',
    avatar: 'https://i.pravatar.cc/150?img=11',
    verified: true,
    plan: 'Standard',
    platforms: ['Kick', 'YouTube'],
    games: ['FIFA', 'EA FC', 'NBA 2K'],
    location: 'France',
    bio: 'Sports gaming specialist — FIFA and NBA 2K ranked grind. Ranked top 10 in Sports category on Kick within 21 days of joining StreamForge.',
    joinedDays: 21,
    story: "Sports gaming on streaming platforms is brutally competitive. FIFA alone has thousands of streamers. Breaking through felt impossible.\n\nThe levelUpX team matched me into their sports-focused engagement group. For the first time I had viewers who actually knew what I was talking about — reacting to goals, debating tactics, challenging my squad choices.\n\nWithin 21 days I ranked top 10 in the Sports category on Kick. The organic discovery from that ranking position is still compounding today.",
    stats: {
      avgViewers: { before: 6, after: 44 },
      peakViewers: { before: 19, after: 98 },
      followers: { before: 567, after: 2100 },
      chatMessages: { before: 78, after: 720 },
      hoursStreamed: 62,
      streamPerformance: 74,
      followerConversion: 8.8,
      mostActiveHour: '8:30 PM – 9:30 PM',
      bestCategory: 'EA FC',
    },
    milestones: [
      { icon: '🏅', label: 'Top 10 Kick Sports', days: 21 },
      { icon: '⭐', label: 'Kick Affiliate', days: 14 },
      { icon: '👥', label: '2,000 Followers', days: 40 },
    ],
    socials: [
      { platform: 'kick',    handle: 'PulseGamer',   url: 'https://kick.com/pulsegamer' },
      { platform: 'youtube', handle: '@PulseGamer',  url: 'https://youtube.com/@PulseGamer' },
      { platform: 'twitter', handle: '@PulseGamer_', url: 'https://twitter.com/pulsegamer_' },
    ],
    review: { quote: "Ranked top 10 in Sports on Kick in 21 days. The team cross-promotion is absolutely real — sports viewers who actually understand the content.", date: 'April 2026', platform: 'Kick' },
    teamLead: 'levelUpX',
  },
  {
    slug: 'ironsight',
    name: 'IronSight',
    handle: 'ironsight_fps',
    avatar: 'https://i.pravatar.cc/150?img=38',
    verified: true,
    plan: 'Starter',
    platforms: ['Twitch', 'Kick'],
    games: ['Apex Legends', 'Warzone'],
    location: 'Brazil',
    bio: 'Latin American FPS streamer — Apex Legends main. Hit Twitch Affiliate in just 9 days on the Starter plan. Proves you do not need the most expensive plan to get real results.',
    joinedDays: 9,
    story: "9 days. I still cannot believe it.\n\nI joined on the Starter plan because I was not sure if it would work. I had been streaming Apex for 5 months and peaked at 8 viewers once, then crashed back to 2–3.\n\nDay one on StreamForge — 11 viewers in chat. Day three — 18 viewers. Day seven — averaging 22 with active chat the whole stream. On day nine I got the Affiliate notification.\n\nAs a Brazilian creator the global reach of the network was important. I had viewers from Portugal, Angola, other Latin American countries joining. Starter plan at $49. Affiliate in 9 days. It paid for itself 10 times over.",
    stats: {
      avgViewers: { before: 2, after: 28 },
      peakViewers: { before: 8, after: 67 },
      followers: { before: 156, after: 890 },
      chatMessages: { before: 24, after: 410 },
      hoursStreamed: 34,
      streamPerformance: 91,
      followerConversion: 12.1,
      mostActiveHour: '10:00 PM – 11:00 PM',
      bestCategory: 'Apex Legends',
    },
    milestones: [
      { icon: '⭐', label: 'Twitch Affiliate', days: 9 },
      { icon: '👥', label: '500 Followers', days: 22 },
      { icon: '💰', label: 'First Bits Revenue', days: 11 },
    ],
    socials: [
      { platform: 'twitch', handle: 'ironsight_fps', url: 'https://twitch.tv/ironsight_fps' },
      { platform: 'kick',   handle: 'IronSight',    url: 'https://kick.com/ironsight' },
    ],
    review: { quote: "9 days to Affiliate. Starter plan at $49. It paid for itself 10 times over. Peer support is what makes the real difference.", date: 'February 2026', platform: 'Twitch' },
    teamLead: 'Jedidiah',
  },
]

export function getStreamer(slug: string) {
  return STREAMERS.find(s => s.slug === slug)
}
