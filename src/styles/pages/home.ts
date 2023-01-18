import { styled } from "..";

export const HomeContainer = styled('main', { // vai ficar por volta de todo o carrossel
  display: 'flex', // para as camisetas ficarem um ao lado da outra
  gap: '3rem',
  width: '100%',
  maxWidth: 'calc(100vw - ((100vw - 1180px) / 2 ))', // vamos fazer esse calculo para quando diminuirmos o zoom o container sempre ficar centralizado - 1180px é o tamanho do container, vamos dividir por dois porque a subtração resulta no resto dos cantos da tela, a gente quer pegar apenas um dos cantos para subtrair com 100vw
  marginLeft: 'auto',
  minHeight: '656', // para o layout não ficar tão centralizado verticalmente
})

export const Product = styled('a', { // aqui é onde vai ficar cada um dos produtos de dentro do carrossel
  background: 'linear-gradient(180deg, #1ea483 0%, #7465d4 100%)',
  borderRadius: 8,
  padding: '0.25rem',
  cursor: 'pointer',
  position: 'relative', 
  overflow: 'hidden', // para fazermos o efeito de hover sem criar a barra do lado e para o footer não surgir por cima da imagem e sim por dentro

  display: 'flex', // propriedades para a imagem ficar centralizada
  alignItems: 'center',
  justifyContent: 'center',

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

    backgroundColor: 'rgba(0, 0, 0, 0.6)',

    transform: 'translateY(110%)',
    opacity: 0,
    transition: 'all 0.5s ease-in-out',

    'strong': {
      fontSize: '$lg'
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