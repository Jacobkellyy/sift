/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./app/**/*.{js,jsx,ts,tsx}', './components/**/*.{js,jsx,ts,tsx}'],
  presets: [require('nativewind/preset')],
  theme: {
    extend: {
      colors: {
        bg: {
          primary: '#0D0D0F',
          secondary: '#17181C',
          elevated: '#1B1C21',
        },
        card: '#202228',
        cardPressed: '#26282F',
        border: 'rgba(255,255,255,0.06)',
        borderStrong: 'rgba(255,255,255,0.12)',
        text: {
          primary: '#FFFFFF',
          secondary: '#B8BDC9',
          muted: '#8A909C',
        },
        category: {
          eat: '#E0824E',
          bars: '#4E9BE0',
          cooking: '#E0A94E',
          wishlist: '#D4B24C',
          travel: '#5FC4B8',
          beauty: '#D98CA3',
          watch: '#9B8CE0',
          memes: '#D97B7B',
          misc: '#9AA0AC',
        },
      },
      fontFamily: {
        sans: ['System'],
      },
      borderRadius: {
        xl2: '28px',
      },
    },
  },
  plugins: [],
};
