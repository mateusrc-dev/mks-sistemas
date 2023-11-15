import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useContext, useEffect, useState } from "react";
import {
  ImageContainer,
  SuccessContainer,
  ContainerImages,
} from "../styles/pages/success";
import { Request, RequestContext } from "../contexts/contextRequest";

export default function Success() {
  const { handleDeleteRequests, handleHeaderState, headerState, request } =
    useContext(RequestContext);
  const [fullRequests, setFullRequests] = useState<number>(0);

  function handleDeleteAllRequests() {
    handleDeleteRequests();
    if (headerState === false) {
      handleHeaderState();
    }
  }

  useEffect(() => {
    function handleFullRequests() {
      let num = 0;
      for (let i = 0; request?.length > i; i++) {
        num = num + request[i]?.count;
      }
      return num;
    }
    setFullRequests(handleFullRequests());
  }, [request]);

  useEffect(() => {
    if (headerState === true && request?.length !== 0) {
      handleHeaderState();
    }
  }, [handleHeaderState, headerState, request]);

  return (
    <>
      <Head>
        <title>Compra efetuada | Ignite Shop</title>
        <meta name="robots" content="noindex" />{" "}
      </Head>
      <SuccessContainer>
        <ContainerImages>
          {request?.map((item: Request, index: number) => (
            <ImageContainer key={String(index)}>
              {/*colocar uma bolinha com quantidade...*/}
              <div className="viewCount">{item.count}</div>
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
          Uhuul, sua compra de {fullRequests} itens já está a caminho da sua
          casa.
        </p>
        <Link href={"/"} onClick={handleDeleteAllRequests}>
          Voltar ao catálogo
        </Link>
      </SuccessContainer>
    </>
  );
}
