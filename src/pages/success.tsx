import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useContext, useEffect } from "react";
import {
  ImageContainer,
  SuccessContainer,
  ContainerImages,
} from "../styles/pages/success";
import { RequestContext } from "../contexts/contextRequest";

export default function Success() {
  const { handleDeleteRequests, handleHeaderState, headerState, request } =
    useContext(RequestContext);
  // vamos pegar as informações da propriedade

  function handleDeleteAllRequests() {
    handleDeleteRequests();
    if (headerState === false) {
      handleHeaderState();
    }
  }

  useEffect(() => {
    if (headerState === true && request.length !== 0) {
      handleHeaderState();
    }
  }, [handleHeaderState, headerState, request]);

  return (
    <>
      <Head>
        {/*tudo que colocarmos aqui vai ser transportado para o 'Head' do nosso 'document'*/}
        <title>Compra efetuada | Ignite Shop</title>
        <meta name="robots" content="noindex" />{" "}
        {/*para a página não ser indexada pelo google*/}
      </Head>
      <SuccessContainer>
        <ContainerImages>
          {request.map((item: any, index: number) => (
            <ImageContainer key={String(index)}>
              <Image
                src={item.img}
                alt=""
                width={120}
                height={110}
                style={{ borderRadius: "100%" }}
              />
            </ImageContainer>
          ))}
        </ContainerImages>
        <h1>Compra efetuada!</h1>
        <p>
          Uhuul, sua compra de {request.length} itens já está a caminho da sua
          casa.
        </p>
        <Link href={"/"} onClick={handleDeleteAllRequests}>
          Voltar ao catálogo
        </Link>
      </SuccessContainer>
    </>
  );
}
