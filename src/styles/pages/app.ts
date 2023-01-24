import { styled } from "..";


export const Container = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  height: '100%',
  justifyContent: 'center', // aqui vamos colocar esse propriedade para todo o conteúdo ficar centralizado verticalmente - Header e os items de compra
  '.modal': {
    width: '100%',
    position: 'absolute',
    zIndex: 2,
    top: 0,
    left: 0,
    height: '100%',
    background: 'rgba(212, 221, 255, 0)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    '.modalContent': {
      position: 'relative',
      marginLeft: 'auto',
      background: '$gray800',
      height: '100%',
      padding: '3rem',
      width: '30rem',
      '.item': {
        display: 'flex',
        alignItems: 'center',
      }
    },
  },
  '.none': {
    display: 'none',
  },
})

export const Header = styled('header', {
  padding: '2rem 0',
  width: '100%',
  maxWidth: '86%',
  margin: '0 auto',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',

  button: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 12,
    borderRadius: 6,
    background: '$gray800',
    border: 'none',
    cursor: 'pointer',
    '&:hover': {
      filter: 'brightness(0.7)',
    },
    svg: {
      fontSize: 24,
      color: '$gray600',
    }
  }
})