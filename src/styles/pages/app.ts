import { styled } from "..";


export const Container = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
  minHeight: '100vh',
  justifyContent: 'center', // aqui vamos colocar esse propriedade para todo o conteúdo ficar centralizado verticalmente - Header e os items de compra
})

export const Header = styled('header', {
  padding: '2rem 0',
  width: '100%',
  maxWidth: 1180,
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