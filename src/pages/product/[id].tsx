import { GetStaticPaths, GetStaticProps } from "next";
import Image from "next/image";
//import { useRouter } from "next/router";
import Stripe from "stripe";
import { stripe } from "../../lib/stripe";
import {
  ImageContainer,
  ProductContainer,
  ProductDetails,
} from "../../styles/pages/product";

interface ProductProps {
  product: {
    id: string,
    name: string,
    imageUrl: string,
    price: string, // vamos colocar string porque estamos formatando o preço
    description: string,
  }
}

export default function Product({ product }: ProductProps) { // vamos receber do servidor node.js as propriedades
  //const { query } = useRouter(); // com esse hook que vem de dentro do next podemos acessar os params que estão dentro do objeto chamado query
  return (
    <ProductContainer>
      <ImageContainer>
        <Image src={product.imageUrl} alt="" width={520} height={480}/>
      </ImageContainer>
      <ProductDetails>
        <h1>{product.name}</h1>
        <span>{product.price}</span>
        <p>
          {product.description}
        </p>
        <button>Comprar agora</button>
      </ProductDetails>
    </ProductContainer>
  );
}
export const getStaticPaths: GetStaticPaths = async () => {
  return { // quando temos páginas estáticas que possuem parametros, precisamos retornar um getStaticPaths que é um método que retorna esses parâmetros
    paths: [
      {params: {id: 'prod_NBzSSHOrjnd4kD'} }
    ],
    fallback: false,
  }
}

export const getStaticProps: GetStaticProps<any, { id: string }> = async ({
  params,
}) => {
  // vamos colocar no generic a tipagem de props e params
  // diferente da Home, aqui vamos gerar uma página estática por produto
  const productId = params.id; // podemos pegar o id que vem através do nome do arquivo - através da url
  const product = await stripe.products.retrieve(productId, {
    expand: ["default_price"], // vamos fazer novamente expand para buscar o preço - não precisamos colocar 'data' porque não é uma lista
  });

  const price = product.default_price as Stripe.Price; // vamos forçar para que o price seja um Stripe.Price pois fizemos um expand (porque antes o price poderia ser uma string também na tipagem)

  return {
    props: {
      product: {
        id: product.id,
        name: product.name,
        imageUrl: product.images[0],
        price: new Intl.NumberFormat("pt-BR", {
          style: "currency",
          currency: "BRL",
        }).format(price.unit_amount / 100), // vamos dividir por 100 porque o preço vem em centavos - uma dica é salvar no banco de dados o preço em centavos (o stripe faz isso - multiplica o preço por 100)},
        revalidate: 60 * 60 * 1, // para dizer quanto tempo queremos manter a página em cache - 1 hour
        description: product.description,
      },
    },
  };
}; // essa função que será sempre assíncrona que irá devolver propriedades vai ser executada via serverSide (servidor node.js) - usamos essa função para salvar a página em cache (Next SSG) se os dados da página forem estáticos e não ter dados do contexto atual (como usuário logado por exemplo)
