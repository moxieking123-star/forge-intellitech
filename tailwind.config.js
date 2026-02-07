/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: ['selector', '[data-mode="dark"]'],
  theme: {
    extend: {
      colors: {
        /* ----------------------------------------
           PRESERVED: Original Forge Colors
           ---------------------------------------- */
        forge: {
          dark: '#0a0a0a',
          darker: '#050505',
          light: '#fafafa',
          muted: '#a1a1aa',
          border: '#27272a',
        },
        
        /* ----------------------------------------
           PRESERVED: Original primary/accent
           (for backward compatibility)
           ---------------------------------------- */
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
           NEW: African-Inspired Semantic Palette
           ----------------------------------------
           Each color family carries meaning:
           - kente: Innovation, creativity (from Ghanaian textile)
           - baobab: Growth, resilience (iconic African tree)
           - sahel: Warmth, energy (savanna sunset)
           - indigo: Trust, depth (West African dye tradition)
           - ubuntu: Community, connection (philosophy)
           - clay: Foundation, authenticity (African soil)
        ---------------------------------------- */
        
        // Kente Gold - Innovation & Creativity
        kente: {
          50: '#fffbeb',
          100: '#fef3c7',
          200: '#fde68a',
          300: '#fcd34d',
          400: '#fbbf24',
          500: '#f59e0b',
          600: '#d97706',
          700: '#b45309',
          800: '#92400e',
          900: '#78350f',
        },
        
        // Baobab Green - Growth & Resilience
        baobab: {
          50: '#ecfdf5',
          100: '#d1fae5',
          200: '#a7f3d0',
          300: '#6ee7b7',
          400: '#34d399',
          500: '#10b981',
          600: '#059669',
          700: '#047857',
          800: '#065f46',
          900: '#064e3b',
        },
        
        // Sahel Amber - Warmth & Energy
        sahel: {
          50: '#fff7ed',
          100: '#ffedd5',
          200: '#fed7aa',
          300: '#fdba74',
          400: '#fb923c',
          500: '#f97316',
          600: '#ea580c',
          700: '#c2410c',
          800: '#9a3412',
          900: '#7c2d12',
        },
        
        // Indigo Deep - Trust & Depth
        indigo: {
          50: '#eef2ff',
          100: '#e0e7ff',
          200: '#c7d2fe',
          300: '#a5b4fc',
          400: '#818cf8',
          500: '#6366f1',
          600: '#4f46e5',
          700: '#4338ca',
          800: '#3730a3',
          900: '#312e81',
        },
        
        // Ubuntu Violet - Community & Connection
        ubuntu: {
          50: '#fdf4ff',
          100: '#fae8ff',
          200: '#f5d0fe',
          300: '#f0abfc',
          400: '#e879f9',
          500: '#d946ef',
          600: '#c026d3',
          700: '#a21caf',
          800: '#86198f',
          900: '#701a75',
        },
        
        // Clay Earth - Foundation & Authenticity
        clay: {
          50: '#fdf8f6',
          100: '#f2e8e5',
          200: '#eaddd7',
          300: '#e0cec7',
          400: '#d2bab0',
          500: '#bfa094',
          600: '#a18072',
          700: '#977669',
          800: '#846358',
          900: '#43302b',
        },

        /* ----------------------------------------
           CSS Variable-based colors (unchanged)
           ---------------------------------------- */
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
        display: ['Inter', 'system-ui', 'sans-serif'], // Can swap for African-founded font later
      },
      
      /* ----------------------------------------
         NEW: Refined Spacing Scale
         ---------------------------------------- */
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
        '128': '32rem',
      },
      
      /* ----------------------------------------
         NEW: Typography Scale
         ---------------------------------------- */
      fontSize: {
        'display-lg': ['4.5rem', { lineHeight: '1.1', letterSpacing: '-0.02em' }],
        'display': ['3.75rem', { lineHeight: '1.1', letterSpacing: '-0.02em' }],
        'display-sm': ['3rem', { lineHeight: '1.2', letterSpacing: '-0.02em' }],
        'headline': ['2.25rem', { lineHeight: '1.25', letterSpacing: '-0.01em' }],
        'title-lg': ['1.5rem', { lineHeight: '1.4', letterSpacing: '-0.01em' }],
        'title': ['1.25rem', { lineHeight: '1.4' }],
        'body-lg': ['1.125rem', { lineHeight: '1.75' }],
        'body': ['1rem', { lineHeight: '1.75' }],
        'caption': ['0.875rem', { lineHeight: '1.5' }],
        'overline': ['0.75rem', { lineHeight: '1.5', letterSpacing: '0.1em' }],
      },
      
      /* ----------------------------------------
         Animation timing tokens (unchanged)
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
         Box shadows (enhanced)
         ---------------------------------------- */
      boxShadow: {
        'glow': '0 0 20px var(--chapter-glow)',
        'glow-lg': '0 0 30px var(--chapter-glow-intense)',
        'glow-accent': '0 0 0 1px var(--chapter-accent), 0 0 20px var(--chapter-glow)',
        // New button-specific shadows
        'button': '0 1px 2px rgba(0, 0, 0, 0.05)',
        'button-hover': '0 4px 12px rgba(0, 0, 0, 0.15)',
        'button-active': '0 1px 2px rgba(0, 0, 0, 0.1)',
      },
      
      /* ----------------------------------------
         Keyframe animations (unchanged + new)
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
        // New: Button shine effect
        'shine': {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(100%)' },
        },
        // New: Gentle bounce for CTAs
        'bounce-subtle': {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-2px)' },
        },
      },
      animation: {
        'fade-in-up': 'fade-in-up 0.5s var(--ease-out-expo) forwards',
        'fade-in': 'fade-in 0.3s var(--ease-smooth) forwards',
        'slide-in-right': 'slide-in-right 0.5s var(--ease-out-expo) forwards',
        'subtle-pulse': 'subtle-pulse 3s var(--ease-smooth) infinite',
        'shine': 'shine 0.6s var(--ease-out-expo)',
        'bounce-subtle': 'bounce-subtle 2s var(--ease-smooth) infinite',
      },
    },
  },
  plugins: [],
};