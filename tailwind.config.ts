import type { Config } from 'tailwindcss'

export default <Partial<Config>>{
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#AFC8DC',
          50: '#F3F7FB',
          100: '#E8F0F6',
          200: '#D7E5EE',
          300: '#BFD6E5',
          400: '#AFC8DC',
          500: '#91B5CF',
          600: '#7A9EBA',
          700: '#65859E',
          800: '#4E687B',
          900: '#384A57'
        },
        powderBlue: {
          DEFAULT: '#BFD6E5',
          soft: '#D7E5EE',
          deep: '#91B5CF'
        },
        champagne: {
          DEFAULT: '#D8C09A',
          light: '#E8DDCC',
          dark: '#C9A46A'
        },
        cream: '#FBF8F1',
        warmWhite: '#FFFDFC',
        beige: '#E8DDCC',
        gold: '#C9A46A',
        text: {
          DEFAULT: '#4A4A4A',
          soft: '#6B6B6B',
          light: '#8C8C8C'
        },
        burgundy: {
          DEFAULT: '#722F37',
          soft: '#8C4A51'
        }
      },
      fontFamily: {
        'serif-display': ['"Playfair Display"', '"Cormorant Garamond"', 'Georgia', 'serif'],
        'serif-body': ['"Cormorant Garamond"', 'Georgia', 'serif'],
        script: ['"Great Vibes"', '"Dancing Script"', 'cursive'],
        'script-alt': ['"Dancing Script"', 'cursive'],
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif']
      },
      letterSpacing: {
        'wedding-wide': '0.25em',
        'wedding-wider': '0.35em'
      },
      boxShadow: {
        soft: '0 4px 20px -2px rgba(74, 74, 74, 0.08)',
        card: '0 10px 40px -10px rgba(74, 74, 74, 0.12)',
        floral: '0 8px 30px -4px rgba(145, 181, 207, 0.18)'
      },
      borderRadius: {
        wedding: '1rem'
      },
      maxWidth: {
        wedding: '72rem'
      }
    }
  }
}
