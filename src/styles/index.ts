import { createStitches } from '@stitches/react'

export const {
  config, 
  styled,
  css,
  globalCss,
  keyframes,
  getCssText,
  theme,
  createTheme
} = createStitches({
  theme: { 
    colors: {
      gray900: '#000000',
      gray800: '#2C2C2C',
      gray700: '#373737',
      gray600: '#EEEEEE',
      gray500: '#FFFFFF',
      gray400: '#F9F9F9',

      blue500: '#0F52BA',
    },
    fontSizes: {
      md: '10px',
      '2md': '14px',
      '3md': '15px',
      lg: '16px',
      '1lg': '18px',
      xl: '20px',
      '1xl': '40px',
      '2xl': '2rem',
    },
  }
}) 