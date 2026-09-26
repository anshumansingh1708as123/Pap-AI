/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        background: '#FAF6F0', // Soft warm light beige canvas
        surface: '#FFFFFF',    // Crisp warm white for cards and modals
        border: '#E8E2D9',     // Warm stone dividers
        brand: {
          50: '#F0FDFA',
          100: '#CCFBF1',
          200: '#99F6E4',
          500: '#14B8A6',
          600: '#0D9488',     // Primary clinical teal
          700: '#0F766E',     // Deep interactive teal
          900: '#134E4A',
        },
        clinical: {
          navy: '#0F172A',    // Slate-900: High-contrast primary headings
          slate: '#334155',   // Slate-700: Body text
          muted: '#64748B',   // Slate-500: Captions and secondary metadata
          subtle: '#94A3B8',  // Slate-400: Icons and empty states
        },
        health: {
          normal: {
            bg: '#F0FDF4',
            text: '#166534',
            border: '#BBF7D0',
          },
          warning: {
            bg: '#FFFBEB',
            text: '#B45309',
            border: '#FDE68A',
          },
          critical: {
            bg: '#FEF2F2',
            text: '#991B1B',
            border: '#FECACA',
          },
        },
        emergency: {
          red: '#DC2626',
          darkRed: '#991B1B',
          lightRed: '#FEF2F2',
        },
      },
      boxShadow: {
        'health-card': '0 1px 3px 0 rgba(0, 0, 0, 0.04), 0 1px 2px -1px rgba(0, 0, 0, 0.02)',
        'health-card-hover': '0 10px 25px -5px rgba(15, 23, 42, 0.06), 0 8px 10px -6px rgba(15, 23, 42, 0.03)',
        'health-modal': '0 20px 25px -5px rgba(15, 23, 42, 0.1), 0 8px 10px -6px rgba(15, 23, 42, 0.04)',
      },
      borderRadius: {
        '2xl': '1rem',
        '3xl': '1.5rem',
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
