/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  /* 
   * Enable dark mode via data attribute
   * This allows us to control it independently of system preference
   */
  darkMode: ['selector', '[data-mode="dark"]'],
  theme: {
    extend: {
      colors: {
        /* ----------------------------------------
           Existing colors — PRESERVED
           ---------------------------------------- */
        forge: {
          dark: '#0a0a0a',
          darker: '#050505',
          light: '#fafafa',
          muted: '#a1a1aa',
          border: '#27272a',
        },
        primary: {
          50: '#eff6ff',
          100: '#dbeafe',
          200: '#bfdbfe',
          300: '#93c5fd',
          400: '#60a5fa',
          500: '#3b82f6',
          600: '#2563eb',
          700: '#1d4ed8',
          800: '#1e40af',
          900: '#1e3a8a',
        },
        accent: {
          50: '#faf5ff',
          100: '#f3e8ff',
          200: '#e9d5ff',
          300: '#d8b4fe',
          400: '#c084fc',
          500: '#a855f7',
          600: '#9333ea',
          700: '#7e22ce',
          800: '#6b21a8',
          900: '#581c87',
        },
        /* ----------------------------------------
           NEW: CSS Variable-based colors
           ----------------------------------------
           These reference CSS custom properties,
           enabling runtime theming.
        */
        env: {
          bg: {
            primary: 'var(--env-bg-primary)',
            secondary: 'var(--env-bg-secondary)',
            tertiary: 'var(--env-bg-tertiary)',
          },
          surface: 'var(--env-surface)',
          'surface-hover': 'var(--env-surface-hover)',
          border: 'var(--env-border)',
          'border-subtle': 'var(--env-border-subtle)',
        },
        text: {
          primary: 'var(--env-text-primary)',
          secondary: 'var(--env-text-secondary)',
          tertiary: 'var(--env-text-tertiary)',
          inverse: 'var(--env-text-inverse)',
        },
        chapter: {
          accent: 'var(--chapter-accent)',
          'accent-hover': 'var(--chapter-accent-hover)',
          'accent-soft': 'var(--chapter-accent-soft)',
          'accent-softer': 'var(--chapter-accent-softer)',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      /* ----------------------------------------
         NEW: Animation timing tokens
         ---------------------------------------- */
      transitionTimingFunction: {
        'smooth': 'var(--ease-smooth)',
        'bounce': 'var(--ease-bounce)',
        'out-expo': 'var(--ease-out-expo)',
      },
      transitionDuration: {
        'fast': 'var(--duration-fast)',
        'normal': 'var(--duration-normal)',
        'slow': 'var(--duration-slow)',
      },
      /* ----------------------------------------
         NEW: Box shadow for glow effects
         ---------------------------------------- */
      boxShadow: {
        'glow': '0 0 20px var(--chapter-glow)',
        'glow-lg': '0 0 30px var(--chapter-glow-intense)',
        'glow-accent': '0 0 0 1px var(--chapter-accent), 0 0 20px var(--chapter-glow)',
      },
      /* ----------------------------------------
         NEW: Keyframe animations
         ---------------------------------------- */
      keyframes: {
        'fade-in-up': {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        'slide-in-right': {
          '0%': { opacity: '0', transform: 'translateX(20px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        'subtle-pulse': {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.8' },
        },
      },
      animation: {
        'fade-in-up': 'fade-in-up 0.5s var(--ease-out-expo) forwards',
        'fade-in': 'fade-in 0.3s var(--ease-smooth) forwards',
        'slide-in-right': 'slide-in-right 0.5s var(--ease-out-expo) forwards',
        'subtle-pulse': 'subtle-pulse 3s var(--ease-smooth) infinite',
      },
    },
  },
  plugins: [],
};