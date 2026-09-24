/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        vector: {
          bg: '#080c14',
          card: '#0f172a',
          cardMuted: '#131d33',
          border: 'rgba(255, 255, 255, 0.08)',
          borderActive: 'rgba(255, 255, 255, 0.16)',
          neonGreen: '#00f59b',
          neonGreenDim: '#00f59b20',
          danger: '#ff334b',
          dangerDim: '#ff334b20',
          warning: '#f59e0b',
          warningDim: '#f59e0b20',
          cyan: '#00e5ff',
          cyanDim: '#00e5ff20',
          blue: '#3b82f6',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
        mono: ['"JetBrains Mono"', '"Fira Code"', 'monospace'],
      },
      animation: {
        'pulse-fast': 'pulse 1.2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'glow-green': 'glowGreen 2s ease-in-out infinite alternate',
        'glow-red': 'glowRed 2s ease-in-out infinite alternate',
      },
      keyframes: {
        glowGreen: {
          '0%': { boxShadow: '0 0 10px rgba(0, 245, 155, 0.2)' },
          '100%': { boxShadow: '0 0 25px rgba(0, 245, 155, 0.5)' },
        },
        glowRed: {
          '0%': { boxShadow: '0 0 10px rgba(255, 51, 75, 0.2)' },
          '100%': { boxShadow: '0 0 25px rgba(255, 51, 75, 0.5)' },
        }
      }
    },
  },
  plugins: [],
}
