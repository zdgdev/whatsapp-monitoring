/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        whatsapp: {
          light: '#DCF8C6',
          DEFAULT: '#25D366',
          dark: '#075E54',
          teal: '#128C7E',
          blue: '#34B7F1',
          'bubble-out': '#DCF8C6',
          'bubble-in': '#FFFFFF',
          'chat-bg': '#E5DDD5',
          'dark-chat-bg': '#0B141A',
          'dark-secondary': '#1F2C34',
          'sidebar-bg': '#FFFFFF',
          'dark-sidebar-bg': '#111B21',
        },
        status: {
          sent: '#A9A9A9',
          delivered: '#90CAF9',
          read: '#4FC3F7',
        }
      },
      boxShadow: {
        'chat': '0 2px 5px rgba(0, 0, 0, 0.1)',
      },
    },
  },
  plugins: [],
};