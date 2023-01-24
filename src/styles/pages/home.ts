import { styled } from "..";

export const HomeContainer = styled('main', { // vai ficar por volta de todo o carrossel
  display: 'flex', // para as camisetas ficarem um ao lado da outra
  //gap: '3rem', // essa propriedade não é calculada no slider
  width: '100%',
  //maxWidth: 'calc(100vw - ((100vw - 1180px) / 2 ))', // vamos fazer esse calculo para quando diminuirmos o zoom o container sempre ficar centralizado - 1180px é o tamanho do container, vamos dividir por dois porque a subtração resulta no resto dos cantos da tela, a gente quer pegar apenas um dos cantos para subtrair com 100vw
  //marginLeft: 'auto',
  minHeight: '656', // para o layout não ficar tão centralizado verticalmente
  padding: '3rem 0',
  marginTop: '-3rem',
  '.arrowLeft': {
    position: 'absolute',
    zIndex: 1,
    height: '100%',
    display: 'flex',
    width: '8.5rem',
    alignItems: 'center',
    background: 'linear-gradient(90deg,  rgba(18, 18, 20, 0.75) 0%, rgba(18, 18, 20, 0) 100%)',
    button: {
      background: 'none',
      border: 'none',
      '&:disabled': {
        display: 'none',
      }
    },
    svg: {
      fontSize: '3rem',
      marginTop: -100,
      marginLeft: '1rem',
      cursor: 'pointer',
      color: '$gray300',
      '&:hover': {
        filter: 'brightness(0.7)'
      },
    }
  },
  '.arrowRight': {
    position: 'absolute',
    zIndex: 1,
    right: 0,
    height: '100%',
    display: 'flex',
    width: '8.5rem',
    alignItems: 'center',
    background: 'linear-gradient(90deg, rgba(18, 18, 20, 0) 0%, rgba(18, 18, 20, 0.75) 100%)',
    button: {
      background: 'none',
      border: 'none',
    },
    svg: {
      fontSize: '3rem',
      marginTop: -100,
      marginLeft: '4.5rem',
      cursor: 'pointer',
      color: '$gray300',
      '&:hover': {
        filter: 'brightness(0.7)'
      },
    },
  },
})

export const Product = styled('div', { // aqui é onde vai ficar cada um dos produtos de dentro do carrossel
  background: 'linear-gradient(180deg, #1ea483 0%, #7465d4 100%)',
  borderRadius: 8,
  //padding: '0.25rem', // essa propriedade não é calculada no slider
  cursor: 'pointer',
  position: 'relative', 
  overflow: 'hidden', // para fazermos o efeito de hover sem criar a barra do lado e para o footer não surgir por cima da imagem e sim por dentro

  display: 'flex', // propriedades para a imagem ficar centralizada
  alignItems: 'center',
  justifyContent: 'center',
  boxShadow: '0px 0px 48px rgba(0, 0, 0, 0.9)',

  'img': {
    objectFit: 'cover', // não distorce a imagem e faz ela caber no container
  },

  'footer': {
    position: 'absolute',
    bottom: '0.25rem',
    left: '0.25rem',
    right: '0.25rem',
    padding: '2rem',

    borderRadius: 6,
    
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: '1rem',

    backgroundColor: 'rgba(0, 0, 0, 0.6)',

    transform: 'translateY(110%)',
    opacity: 0,
    transition: 'all 0.5s ease-in-out',

    '.detailsProduct': {
      display: 'flex',
      flexDirection: 'column',
      gap: 4,
    },

    button: {
      padding: 12,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '$green500',
      border: 'none',
      borderRadius: 6,
      cursor: 'pointer',
      '&:hover': {
        filter: 'brightness(0.7)',
      },
      svg: {
        color: '$white',
        fontSize: '2rem',
      }
    },

    'strong': {
      fontSize: '$lg',
      color: '$gray100',
    },

    'span': {
      fontSize: '$xl',
      fontWeight: 'bold',
      color: '$green300',
    },
  },
  '&:hover': {
    footer: {
      transform: 'translateY(0%)',
      opacity: 1,
    }
  }
})