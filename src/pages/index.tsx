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
import { SlArrowRight } from "react-icons/sl";
import React, { useContext, useState } from "react";
import { RequestContext } from "../contexts/contextRequest";

interface HomeProps {
  // tipagem das props que vem do servidor node.js
  products: {
    id: string;
    defaultPriceId: string,
    name: string;
    imageUrl: string;
    price: string;
  }[]; // cochete para indicar que é um array de produtos
}

export default function Home({ products }: HomeProps) {
  // vamos pegar os products que vem do servidor node
  const { handleNewRequest } = useContext(RequestContext);
  const [currentSlide, setCurrentSlide] = React.useState(0);
  const [, setLoaded] = useState(false);
  const [sliderRef, instanceRef] = useKeenSlider({
    // refs são funcionalidades do react que nos permite ter acesso a uma referência de um elemento na dom -> esse hook retorna um array
    initial: 0,
    slideChanged(slider) {
      setCurrentSlide(slider.track.details.rel);
    },
    created() {
      setLoaded(true);
    },
    slides: {
      perView: 3, // para ficar aparecendo três produtos no slider
      spacing: 48, // para colocar espaço entre os items do slider
      origin: 0.07,
    },
  });

  function NewRequest(title: string, price: string, img: string, id: string) {
    handleNewRequest(title, price, img, id);
  }

  return (
    <>
      <Head>
        {/*tudo que colocarmos aqui vai ser transportado para o 'Head' do nosso 'document'*/}
        <title>Home | Ignite Shop</title>
      </Head>

      <HomeContainer ref={sliderRef} className="keen-slider">
        {/*passamos ref para o container que cerca o slider - precisamos passar essas classes para o slider funcionar*/}
        <button
          className="arrowLeft"
          onClick={(e: any) =>
            e.stopPropagation() || instanceRef.current?.prev()
          }
          disabled={currentSlide === 0}
        >
          <SlArrowLeft />
        </button>
        <button
          className="arrowRight"
          onClick={(e: any) =>
            e.stopPropagation() || instanceRef.current?.next()
          }
        >
          <SlArrowRight />
        </button>
        {products.map((product) => {
          return (
            <Product className="keen-slider__slide" key={product.id}>
              <Link href={`/product/${product.id}`} prefetch={false}>
                <div>
                  <Image
                    src={product.imageUrl}
                    alt=""
                    width={520}
                    height={480}
                  />
                  {/*quando usamos o Image do next é importante colocar altura e largura pra imagem não ficar com um tamanho muito grande - precisamos colocar o domínio para o endereço da imagem funcionar no next*/}
                </div>
              </Link>
              <footer>
                <div className="detailsProduct">
                  {/*melhor elemento pra colocar legenda na imagem*/}
                  <strong>{product.name}</strong>
                  <span>{product.price}</span>
                </div>
                <button
                  onClick={() =>
                    NewRequest(product.name, product.price, product.imageUrl, product.defaultPriceId)
                  }
                >
                  <HiOutlineShoppingBag />
                </button>
              </footer>
            </Product>
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
      defaultPriceId: price.id,
    };
  }); // esses dados (se colocados no console.log) vão aparecer no console.log do node.js - vamos pegar apenas os dados que queremos

  return {
    props: {
      products,
    },
    revalidate: 60 * 60 * 2, // para a página estática ser recriada no cache em um determinado intervalo de tempo ao usuário acessar a página - colocamos um número em segundos - 2 hours
  };
}; // para obter propriedades do ServerSide (camada do next.js - servidor node) - portanto, essas props aparecem mesmo com js desabilitado - esse código é executado somente na camada node.js - só fazemos chamadas com getServerProps pra trazer informações pra nossa página que a gente precisa que esteja disponíveis assim que a página seja disponibilizada em tela para indexadores, boots...
