import Image from "next/image";
import { HomeContainer, Product } from "../styles/pages/home";
import { useKeenSlider } from "keen-slider/react"; // biblioteca para criar o slider
import "keen-slider/keen-slider.min.css"; //importando css da biblioteca do slider
import { stripe } from "../lib/stripe";
import { GetStaticProps } from "next";
import Link from "next/link";
import Stripe from "stripe";
import Head from "next/head";
import { HiOutlineShoppingBag } from "react-icons/hi";
import { SlArrowLeft } from "react-icons/sl";
import { SlArrowRight } from "react-icons/sl"

interface HomeProps {
  // tipagem das props que vem do servidor node.js
  products: {
    id: string;
    name: string;
    imageUrl: string;
    price: string;
  }[]; // cochete para indicar que é um array de produtos
}

export default function Home({ products }: HomeProps) {
  // vamos pegar os products que vem do servidor node
  const [sliderRef] = useKeenSlider({
    // refs são funcionalidades do react que nos permite ter acesso a uma referência de um elemento na dom -> esse hook retorna um array
    slides: {
      perView: 3, // para ficar aparecendo três produtos no slider
      spacing: 48, // para colocar espaço entre os items do slider
    },
  });

  return (
    <>
      <Head>
        {/*tudo que colocarmos aqui vai ser transportado para o 'Head' do nosso 'document'*/}
        <title>Home | Ignite Shop</title>
      </Head>

      <HomeContainer ref={sliderRef} className="keen-slider">
        {/*passamos ref para o container que cerca o slider - precisamos passar essas classes para o slider funcionar*/}
        <div className="arrowLeft">
          <SlArrowLeft />
        </div>
        <div className="arrowRight">
          <SlArrowRight />
        </div>
        {products.map((product) => {
          return (
            <Link
              href={`/product/${product.id}`}
              key={product.id}
              prefetch={false}
            >
              <Product className="keen-slider__slide">
                <Image src={product.imageUrl} alt="" width={520} height={480} />
                {/*quando usamos o Image do next é importante colocar altura e largura pra imagem não ficar com um tamanho muito grande - precisamos colocar o domínio para o endereço da imagem funcionar no next*/}
                <footer>
                  <div className="detailsProduct">
                    {/*melhor elemento pra colocar legenda na imagem*/}
                    <strong>{product.name}</strong>
                    <span>{product.price}</span>
                  </div>
                  <button>
                    <HiOutlineShoppingBag />
                  </button>
                </footer>
              </Product>
            </Link>
          );
        })}
      </HomeContainer>
    </>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  // vamos importar a tipagem da função
  //await new Promise(resolve => setTimeout(resolve, 2000)) // para o js ficar parado aqui 2 segundos - a tela vai demorar dois segundos pra ser carregado e os dados da lista vão aparecer juntos - isso ajuda o boot do google a ver a página inteira, diferente do SPA que os dados da API demoram pra carregar

  const response = await stripe.products.list({
    expand: ["data.default_price"], // quando fazemos essa expansão do id do preço podemos pegar as propriedades do preço
  });

  const products = response.data.map((product) => {
    const price = product.default_price as Stripe.Price; // vamos forçar para que o price seja um Stripe.Price pois fizemos um expand (porque antes ele poderia ser uma string também na tipagem)
    return {
      id: product.id,
      name: product.name,
      imageUrl: product.images[0],
      price: new Intl.NumberFormat("pt-BR", {
        style: "currency",
        currency: "BRL",
      }).format(price.unit_amount / 100), // vamos dividir por 100 porque o preço vem em centavos - uma dica é salvar no banco de dados o preço em centavos (o stripe faz isso - multiplica o preço por 100)
    };
  }); // esses dados (se colocados no console.log) vão aparecer no console.log do node.js - vamos pegar apenas os dados que queremos

  return {
    props: {
      products,
    },
    revalidate: 60 * 60 * 2, // para a página estática ser recriada no cache em um determinado intervalo de tempo ao usuário acessar a página - colocamos um número em segundos - 2 hours
  };
}; // para obter propriedades do ServerSide (camada do next.js - servidor node) - portanto, essas props aparecem mesmo com js desabilitado - esse código é executado somente na camada node.js - só fazemos chamadas com getServerProps pra trazer informações pra nossa página que a gente precisa que esteja disponíveis assim que a página seja disponibilizada em tela para indexadores, boots...
