/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,ts,tsx,json}'],
  theme: {
    extend: {
      colors: {
        // 深蓝工业风主色（与俄罗斯站保持同一套品牌色）
        brand: {
          50: '#eef3fa',
          100: '#d6e2f2',
          200: '#adc4e4',
          300: '#7fa1d2',
          400: '#4d76b3',
          500: '#2b5695',
          600: '#193b70', // 主色
          700: '#163463',
          800: '#122a4f',
          900: '#0e203c',
        },
        // 辅助橙色（CTA / 强调）
        accent: {
          50: '#fef4ea',
          100: '#fde5cd',
          200: '#fbc99b',
          300: '#f8ab68',
          400: '#f5923e',
          500: '#f27c22', // 辅助色
          600: '#d9660f',
          700: '#b34f0c',
          800: '#8c3d0c',
          900: '#6e310c',
        },
      },
      /**
       * 字体：拉丁用 Inter，阿拉伯语用 Cairo（正文清晰）+ Noto Kufi Arabic（标题方正）
       * 顺序上把 Cairo 放在 Inter 之后：拉丁字符走 Inter，阿拉伯字符自动落到 Cairo。
       */
      fontFamily: {
        sans: [
          'Inter',
          'Cairo',
          '"Noto Sans Arabic"',
          '"Noto Sans"',
          '"Noto Sans SC"',
          'ui-sans-serif',
          'system-ui',
          '-apple-system',
          'Segoe UI',
          'Roboto',
          'Arial',
          'sans-serif',
        ],
        display: [
          'Inter',
          '"Noto Kufi Arabic"',
          'Cairo',
          '"Noto Sans Arabic"',
          'ui-sans-serif',
          'system-ui',
          'sans-serif',
        ],
      },
      maxWidth: {
        content: '1200px',
      },
      boxShadow: {
        card: '0 1px 2px rgba(16,24,40,.04), 0 8px 24px -12px rgba(16,24,40,.18)',
        cardHover: '0 2px 4px rgba(16,24,40,.05), 0 18px 40px -18px rgba(25,59,112,.35)',
      },
      keyframes: {
        'fade-up': {
          '0%': { opacity: '0', transform: 'translateY(14px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
      animation: {
        'fade-up': 'fade-up .6s cubic-bezier(.22,.61,.36,1) both',
      },
    },
  },
  plugins: [],
};
