import { createStitches } from '@stitches/react'

export const {
  config, 
  styled,
  css,
  globalCss,
  keyframes,
  getCssText,
  theme,
  createTheme // vamos desestruturar para exportar propriedades específicas
} = createStitches({
  theme: { //podemos acessar várias propriedades css e configurá-las
    colors: {
      rocketseat: '#8257e6',
      white: '#FFF',
      gray900: '#121214',
      gray800: '#202024',
      gray600: '#8d8d99',
      gray300: '#c4c4cc',
      gray100: '#e1e1e6',

      green500: '#00875f',
      green300: '#00b37e'
    },
    fontSizes: {// como vamos ter valores pré-definidos para tamanho de fontes, vamos colocá-los aqui
      md: '1.125rem',
      lg: '1.25rem',
      xl: '1.5rem',
      '2xl': '2rem',
    },
  }
}) // essa função devolve uma série de configurações - podemos configurar com essa função algumas coisas