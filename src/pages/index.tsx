import Image from "next/image";
import { CardsContainer, Product } from "../styles/pages/home";
import { GetStaticProps } from "next";
import Head from "next/head";
import shoppingBag from "../assets/shopping-bag.svg";
import React, { useContext, useState } from "react";
import { RequestContext } from "../contexts/contextRequest";
import { api } from "./services/api";

interface HomeProps {
  productsData: {
    products: {
      id: number;
      name: string;
      brand: string;
      description: string;
      photo: string;
      price: string;
      createdAt: string;
      updatedAt: string;
    }[];
    count: number;
  };
}

export default function Home(products: HomeProps) {
  const { handleNewRequest } = useContext(RequestContext);

  function NewRequest(title: string, price: string, img: string, id: string) {
    handleNewRequest(title, price, img, id);
  }

  return (
    <>
      <Head>
        <title>Home | Mks Sistemas</title>
      </Head>

      <CardsContainer>
        {products.productsData.products.map((product) => {
          return (
            <Product className="keen-slider__slide" key={product.id}>
              <div>
                <Image src={product.photo} alt="" width={150} height={138} />
              </div>
              <footer>
                <div className="detailsProduct">
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "space-between",
                      gap: 4,
                    }}
                  >
                    <p>{product.name}</p>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        height: "26px",
                        paddingInline: 6,
                        borderRadius: "5px",
                        background: "#373737",
                      }}
                    >
                      <strong>R${product.price}</strong>
                    </div>
                  </div>
                  <p
                    style={{
                      color: "#2C2C2C",
                      fontSize: "10px",
                      fontWeight: 300,
                      lineHeight: "12px",
                      marginTop: "8px",
                    }}
                  >
                    Redesigned from scratch and completely revised.
                  </p>
                </div>
                <button
                  onClick={() =>
                    NewRequest(
                      product.name,
                      product.price,
                      product.photo,
                      product.price
                    )
                  }
                >
                  <Image src={shoppingBag} alt="" />
                  Comprar
                </button>
              </footer>
            </Product>
          );
        })}
      </CardsContainer>
    </>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  // vamos importar a tipagem da função
  //await new Promise(resolve => setTimeout(resolve, 2000)) // para o js ficar parado aqui 2 segundos - a tela vai demorar dois segundos pra ser carregado e os dados da lista vão aparecer juntos - isso ajuda o boot do google a ver a página inteira, diferente do SPA que os dados da API demoram pra carregar
  const products = await api.get(
    "/products?page=1&rows=10&sortBy=id&orderBy=DESC"
  ); // esses dados (se colocados no console.log) vão aparecer no console.log do node.js - vamos pegar apenas os dados que queremos

  const productsData = products.data;

  return {
    props: {
      productsData,
    },
    revalidate: 60 * 60 * 2, // para a página estática ser recriada no cache em um determinado intervalo de tempo ao usuário acessar a página - colocamos um número em segundos - 2 hours
  };
}; // para obter propriedades do ServerSide (camada do next.js - servidor node) - portanto, essas props aparecem mesmo com js desabilitado - esse código é executado somente na camada node.js - só fazemos chamadas com getServerProps pra trazer informações pra nossa página que a gente precisa que esteja disponíveis assim que a página seja disponibilizada em tela para indexadores, boots...
