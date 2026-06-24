import type { Config } from 'tailwindcss'

const config: Config = {
  content: ['./pages/**/*.{js,ts,jsx,tsx,mdx}', './components/**/*.{js,ts,jsx,tsx,mdx}', './app/**/*.{js,ts,jsx,tsx,mdx}', './lib/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        gold: '#e8a83e', 'gold-hi': '#ffc85a', 'gold-lo': '#a06820',
        violet: '#7c3aed', teal: '#0891b2',
      },
      fontFamily: { sans: ['var(--font-jakarta)', 'system-ui', 'sans-serif'] },
      typography: { invert: { css: { '--tw-prose-body': '#9b9580', '--tw-prose-headings': '#f0ece4', '--tw-prose-links': '#e8a83e', '--tw-prose-bold': '#f0ece4', '--tw-prose-quotes': '#9b9580', '--tw-prose-quote-borders': '#e8a83e', '--tw-prose-bullets': '#504c44', '--tw-prose-counters': '#504c44', } } },
    },
  },
  plugins: [require('@tailwindcss/typography')],
}
export default config
