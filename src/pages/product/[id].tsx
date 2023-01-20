import { useRouter } from 'next/router'
import { ImageContainer, ProductContainer, ProductDetails } from '../../styles/pages/product'

export default function Product() {
  const { query } = useRouter() // com esse hook que vem de dentro do next podemos acessar os params que estão dentro do objeto chamado query
  return (
      <ProductContainer>
        <ImageContainer>

        </ImageContainer>
        <ProductDetails>
          <h1>Camiseta X</h1>
          <span>R$ 79,98</span>
          <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Id quae fugiat delectus natus dolore rem iusto voluptatem dolores perspiciatis maxime, beatae repellat facilis obcaecati quis, unde, nulla accusantium sint laboriosam. </p>
          <button>
            Comprar agora
          </button>
        </ProductDetails>
      </ProductContainer>
    )
}