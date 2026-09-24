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
        keyvo: {
          bg: '#edf5ee',
          canvas: '#f4f9f4',
          card: '#ffffff',
          cardMuted: '#f8fbf9',
          sidebar: '#092218',
          sidebarHover: '#103325',
          sidebarActive: '#163d2e',
          pill: '#d7f2df',
          pillText: '#0d5934',
          pillBorder: '#b9e5c5',
          rowHighlight: '#e6f7ec',
          rowHighlightBorder: '#b8e8c6',
          dark: '#092218',
          darkSecondary: '#19382b',
          muted: '#526d60',
          mutedLight: '#859f92',
          border: '#e2ede5',
          borderLight: '#edf3ee',
          emerald: '#059669',
          emeraldHover: '#047857',
          mint: '#10b981',
          danger: '#dc2626',
          dangerBg: '#fef2f2',
          dangerBorder: '#fecaca',
          warning: '#d97706',
          warningBg: '#fffbeb',
          warningBorder: '#fde68a',
        },
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
        sans: ['Roboto', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
        mono: ['"Roboto Mono"', 'monospace'],
      },
      animation: {
        'pulse-fast': 'pulse 1.2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'glow-green': 'glowGreen 2s ease-in-out infinite alternate',
        'glow-red': 'glowRed 2s ease-in-out infinite alternate',
        'float-3d': 'float3d 4s ease-in-out infinite alternate',
        'radar-spin': 'radarSpin 4s linear infinite',
      },
      keyframes: {
        glowGreen: {
          '0%': { boxShadow: '0 0 10px rgba(0, 245, 155, 0.2)' },
          '100%': { boxShadow: '0 0 25px rgba(0, 245, 155, 0.5)' },
        },
        glowRed: {
          '0%': { boxShadow: '0 0 10px rgba(255, 51, 75, 0.2)' },
          '100%': { boxShadow: '0 0 25px rgba(255, 51, 75, 0.5)' },
        },
        float3d: {
          '0%': { transform: 'translateY(0px) rotateX(0deg) rotateY(0deg)' },
          '100%': { transform: 'translateY(-10px) rotateX(4deg) rotateY(-3deg)' },
        },
        radarSpin: {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        }
      }
    },
  },
  plugins: [],
}
