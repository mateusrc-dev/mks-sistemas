import axios from "axios";
import { GetStaticPaths, GetStaticProps } from "next";
import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/router";
import { useContext, useState } from "react";
import Stripe from "stripe";
import { stripe } from "../../lib/stripe";
import {
  ImageContainer,
  ProductContainer,
  ProductDetails,
} from "../../styles/pages/product";
import { RequestContext } from "../../contexts/contextRequest";

interface ProductProps {
  product: {
    id: string;
    name: string;
    imageUrl: string;
    price: string; // vamos colocar string porque estamos formatando o preço
    description: string;
    defaultPriceId: string;
  };
}

export default function Product({ product }: ProductProps) {
  // vamos receber do servidor node.js as propriedades
  //const { query } = useRouter(); // com esse hook que vem de dentro do next podemos acessar os params que estão dentro do objeto chamado query
  const { handleNewRequest } = useContext(RequestContext);
  const [isCreatingCheckoutSession, setIsCreatingCheckoutSession] =
    useState(false);
  const { isFallback } = useRouter(); // o next nos permite através desse hook acessar isFallback - se isFallback for true quer dizer que a página está carregando - os dados que vem dos parâmetros e são processados em getStaticProps
  if (isFallback) {
    return <p>Loading...</p>;
  }

  function NewRequest(title: string, price: string, img: string) {
    handleNewRequest(title, price, img);
  }

  async function handleBuyProduct() {
    try {
      setIsCreatingCheckoutSession(true);
      //console.log(product.defaultPriceId)
      const response = await axios.post("/api/checkout", {
        priceId: product.defaultPriceId,
      }); // para acessar nossa api router do next vamos usar o axios - como vamos criar um checkout session o melhor método é o post - como a api e frontend rodam no mesmo endereço, não precisamos criar um arquivo 'api' colocando o baseUrl - basta colocar o caminho do next

      const { checkoutUrl } = response.data; // vamos pegar o url que é devolvido no checkout (o local onde a pessoa finaliza a compra)

      window.location.href = checkoutUrl; // vamos redirecionar o usuário para um local externo da aplicação - se fosse para um local interno, usariamos useRouter do next e o método push (const router = useRouter() / router.push('/checkout'))
    } catch (err) {
      setIsCreatingCheckoutSession(false);
      alert("Falha ao redirecionar ao checkout!");
    } // é recomendável usar try catch quando vamos fazer requisições para api externas - principalmente para operações que vem através de usuários
  }

  return (
    <>
      <Head>
        {/*tudo que colocarmos aqui vai ser transportado para o 'Head' do nosso 'document'*/}
        <title>{product.name} | Ignite Shop</title>
      </Head>
      <ProductContainer>
        <ImageContainer>
          <Image src={product.imageUrl} alt="" width={520} height={480} />
        </ImageContainer>
        <ProductDetails>
          <h1>{product.name}</h1>
          <span>{product.price}</span>
          <p>{product.description}</p>
          <button
            /*disabled={isCreatingCheckoutSession}*/
            /*onClick={handleBuyProduct}*/
            onClick={() =>
              NewRequest(product.name, product.price, product.imageUrl)
            }
          >
            Colocar na sacola
          </button>
        </ProductDetails>
      </ProductContainer>
    </>
  );
}
export const getStaticPaths: GetStaticPaths = async () => {
  return {
    // quando temos páginas estáticas que possuem parametros, precisamos retornar um getStaticPaths que é um método que retorna esses parâmetros
    paths: [
      { params: { id: "prod_NBzSSHOrjnd4kD" } }, // aqui vamos retornar os parâmetros dentro desse array - temos que deixar enxuto porque pode pesar na hora de executar a build - podemos colocar apenas os produtos mais vendidos, mais acessados - podemos deixar vazio e deixar o fallback gerar as páginas
    ],
    fallback: true, // com true, as páginas dos produtos que não passamos nos paths o next vai tentar pegar o id dessa página e passar para o método getStaticProps - só que vai demorar um tempo para esses dados carregarem... precisamos colocar um loading - usando blocking como valor não precisar colocar loading
  };
};

export const getStaticProps: GetStaticProps<any, { id: string }> = async ({
  params,
}) => {
  // vamos colocar no generic a tipagem de props e params
  // diferente da Home, aqui vamos gerar uma página estática por produto
  const productId = params.id; // podemos pegar o id que vem através do nome do arquivo - através da url
  const product = await stripe.products.retrieve(productId, {
    expand: ["default_price"], // vamos fazer novamente expand para buscar o preço - não precisamos colocar 'data' porque não é uma lista - buscar o preço padrão
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
        defaultPriceId: price.id, // aqui é o id da relação entre produto e preços - vamos enviar esse dado para a api router do next no momento da compra
      },
    },
  };
}; // essa função que será sempre assíncrona que irá devolver propriedades vai ser executada via serverSide (servidor node.js) - usamos essa função para salvar a página em cache (Next SSG) se os dados da página forem estáticos e não ter dados do contexto atual (como usuário logado por exemplo)
