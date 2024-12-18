import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors:{
        'text': '#d8ecf5',
        'bg': '#0f0f0f',
        'lightgray': '#383938',
        'primary': '#8fc2e2',
        'secondary': '#5e2286',
        'accent': '#bd3dcd',
        'brightbg': '#000000',
        'lightaccent': '#ec5bff'

      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      dropShadow: {
        'purple': '0 35px 35px #ec5bff'
      },
      boxShadow:{
        'custom': '0 7px 30px rgba(236, 91, 255, 0.4)',
        'card': '0 0 20px rgba(236, 91, 255, 0.4)',
        'card2': '0 0 30px rgba(236, 91, 255, 0.5)'
      }
    },
  },
  plugins: [],
}
export default config
