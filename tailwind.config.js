/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: ['selector', '[data-mode="dark"]'],
  theme: {
    extend: {
      /* ========================================
         FORGE INTELLITECH - DESIGN TOKENS
         ======================================== */
      
      /* ----------------------------------------
         PRIMARY BRAND COLORS
         Based on the specified palette
         ---------------------------------------- */
      colors: {
        // === CORE BRAND PALETTE ===
        brand: {
          // Blueberry - Primary/Trust
          blueberry: {
            DEFAULT: '#6B7A8F',
            light: '#94A3B8',    // Brightened for dark mode
            dark: '#4A5568',     // Darker shade
          },
          // Apricot - Accent/CTA
          apricot: {
            DEFAULT: '#F7882F',
            light: '#FFAB73',    // Softened for dark mode
            dark: '#C96A1F',     // Darker shade
          },
          // Citrus - Highlight/Warning
          citrus: {
            DEFAULT: '#F7C331',
            light: '#FAD056',    // Softened for dark mode
            dark: '#D4A01D',     // Darker shade
          },
          // Apple Core - Neutral/Warm
          applecore: {
            DEFAULT: '#DCC7AA',
            light: '#EBD9C4',    // Lighter shade
            dark: '#A39078',     // Dimmed for dark mode
          },
        },

        // === DARK MODE BACKGROUNDS ===
        dark: {
          bg: {
            primary: '#121212',
            secondary: '#161B22',
            tertiary: '#1C2128',
          },
          surface: '#21262D',
          'surface-hover': '#282E36',
          border: '#30363D',
          'border-subtle': '#262C34',
        },

        // === LIGHT MODE BACKGROUNDS ===
        light: {
          bg: {
            primary: '#FAFAFA',
            secondary: '#F5F5F5',
            tertiary: '#FFFFFF',
          },
          surface: '#FFFFFF',
          'surface-hover': '#F0F0F0',
          border: '#E5E7EB',
          'border-subtle': '#F3F4F6',
        },

        // === TEXT COLORS ===
        content: {
          // Dark mode text
          dark: {
            primary: '#F0F6FC',
            secondary: '#8B949E',
            tertiary: '#6E7681',
          },
          // Light mode text
          light: {
            primary: '#1F2937',
            secondary: '#4B5563',
            tertiary: '#6B7280',
          },
        },

        /* ----------------------------------------
           PRESERVED: Legacy Forge Colors
           (for backward compatibility)
           ---------------------------------------- */
        forge: {
          dark: '#0a0a0a',
          darker: '#050505',
          light: '#fafafa',
          muted: '#a1a1aa',
          border: '#27272a',
        },

        /* ----------------------------------------
           CSS Variable-based colors
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

        /* ----------------------------------------
           AFRICAN-INSPIRED EXTENDED PALETTE
           (For future use / special elements)
           ---------------------------------------- */
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
      },
      
      /* ----------------------------------------
         TYPOGRAPHY - Font Families
         ---------------------------------------- */
      fontFamily: {
        // Primary fonts from design spec
        heading: ['var(--font-poppins)', 'system-ui', 'sans-serif'],
        body: ['var(--font-opensans)', 'system-ui', 'sans-serif'],
        // Aliases
        poppins: ['var(--font-poppins)', 'system-ui', 'sans-serif'],
        opensans: ['var(--font-opensans)', 'system-ui', 'sans-serif'],
        // Legacy support
        sans: ['var(--font-opensans)', 'system-ui', 'sans-serif'],
        display: ['var(--font-poppins)', 'system-ui', 'sans-serif'],
      },
      
      /* ----------------------------------------
         TYPOGRAPHY - Font Sizes
         ---------------------------------------- */
      fontSize: {
        // Display sizes (for heroes, big statements)
        'display-2xl': ['4.5rem', { lineHeight: '1.1', letterSpacing: '-0.02em', fontWeight: '700' }],
        'display-xl': ['3.75rem', { lineHeight: '1.1', letterSpacing: '-0.02em', fontWeight: '700' }],
        'display-lg': ['3rem', { lineHeight: '1.2', letterSpacing: '-0.02em', fontWeight: '600' }],
        'display-md': ['2.25rem', { lineHeight: '1.25', letterSpacing: '-0.01em', fontWeight: '600' }],
        'display-sm': ['1.875rem', { lineHeight: '1.3', letterSpacing: '-0.01em', fontWeight: '600' }],
        
        // Heading sizes
        'heading-xl': ['1.5rem', { lineHeight: '1.4', fontWeight: '600' }],
        'heading-lg': ['1.25rem', { lineHeight: '1.4', fontWeight: '600' }],
        'heading-md': ['1.125rem', { lineHeight: '1.5', fontWeight: '600' }],
        'heading-sm': ['1rem', { lineHeight: '1.5', fontWeight: '600' }],
        
        // Body sizes
        'body-xl': ['1.25rem', { lineHeight: '1.75' }],
        'body-lg': ['1.125rem', { lineHeight: '1.75' }],
        'body-md': ['1rem', { lineHeight: '1.75' }],
        'body-sm': ['0.875rem', { lineHeight: '1.7' }],
        'body-xs': ['0.75rem', { lineHeight: '1.6' }],
        
        // Special
        'caption': ['0.875rem', { lineHeight: '1.5' }],
        'overline': ['0.75rem', { lineHeight: '1.5', letterSpacing: '0.1em', fontWeight: '600' }],
      },
      
      /* ----------------------------------------
         SPACING
         ---------------------------------------- */
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
        '128': '32rem',
        // Section spacing
        'section-sm': '3rem',
        'section-md': '5rem',
        'section-lg': '7rem',
        'section-xl': '9rem',
      },
      
      /* ----------------------------------------
         ANIMATIONS
         ---------------------------------------- */
      transitionTimingFunction: {
        'smooth': 'cubic-bezier(0.4, 0, 0.2, 1)',
        'bounce': 'cubic-bezier(0.34, 1.56, 0.64, 1)',
        'out-expo': 'cubic-bezier(0.16, 1, 0.3, 1)',
      },
      transitionDuration: {
        'fast': '150ms',
        'normal': '300ms',
        'slow': '500ms',
      },
      
      /* ----------------------------------------
         BOX SHADOWS
         ---------------------------------------- */
      boxShadow: {
        'glow': '0 0 20px var(--chapter-glow)',
        'glow-lg': '0 0 30px var(--chapter-glow-intense)',
        'glow-accent': '0 0 0 1px var(--chapter-accent), 0 0 20px var(--chapter-glow)',
        'button': '0 1px 2px rgba(0, 0, 0, 0.05)',
        'button-hover': '0 4px 12px rgba(0, 0, 0, 0.15)',
        'card': '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
        'card-hover': '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
      },
      
      /* ----------------------------------------
         KEYFRAMES & ANIMATIONS
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
        'slide-in-left': {
          '0%': { opacity: '0', transform: 'translateX(-20px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        'scale-in': {
          '0%': { opacity: '0', transform: 'scale(0.95)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        'subtle-pulse': {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.8' },
        },
        'float': {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        'shine': {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(100%)' },
        },
        'bounce-subtle': {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-4px)' },
        },
      },
      animation: {
        'fade-in-up': 'fade-in-up 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'fade-in': 'fade-in 0.4s cubic-bezier(0.4, 0, 0.2, 1) forwards',
        'slide-in-right': 'slide-in-right 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'slide-in-left': 'slide-in-left 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'scale-in': 'scale-in 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'subtle-pulse': 'subtle-pulse 3s cubic-bezier(0.4, 0, 0.2, 1) infinite',
        'float': 'float 6s cubic-bezier(0.4, 0, 0.2, 1) infinite',
        'shine': 'shine 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
        'bounce-subtle': 'bounce-subtle 2s cubic-bezier(0.4, 0, 0.2, 1) infinite',
      },
      
      /* ----------------------------------------
         BORDER RADIUS
         ---------------------------------------- */
      borderRadius: {
        'xl': '1rem',
        '2xl': '1.5rem',
        '3xl': '2rem',
      },
    },
  },
  plugins: [],
};