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
      gray300: '#c4c4cc',
      gray100: '#e1e1e6',

      green500: '#00875f',
      green300: '#00b37e'
    },
  }
}) // essa função devolve uma série de configurações - podemos configurar com essa função algumas coisas