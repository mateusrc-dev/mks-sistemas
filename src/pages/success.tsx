import { GetServerSideProps } from "next";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
//import Stripe from "stripe";
import { stripe } from "../lib/stripe";
import { useState } from "react";
import { ImageContainer, SuccessContainer, ContainerImages } from "../styles/pages/success";

interface SuccessProps {
  session: {
    data: any;
  };
  customerName: string;
}

export default function Success({ session, customerName }: SuccessProps) {
  const [amount] = useState(session.data.length);
  console.log(session.data[0].price.product.images[0]);
  // vamos pegar as informações da propriedade
  return (
    <>
      <Head>
        {/*tudo que colocarmos aqui vai ser transportado para o 'Head' do nosso 'document'*/}
        <title>Compra efetuada | Ignite Shop</title>
        <meta name="robots" content="noindex" />{" "}
        {/*para a página não ser indexada pelo google*/}
      </Head>
      <SuccessContainer>
        <h1>Compra efetuada!</h1>
        <ContainerImages>
          {session.data.map((item: any, index: number) => (
            <ImageContainer key={String(index)}>
              <Image
                src={item.price.product.images[0]}
                alt=""
                width={120}
                height={110}
              />
            </ImageContainer>
          ))}
        </ContainerImages>
        <p>
          Uhuul <strong>{customerName}</strong>, sua compra de {amount}{" "}
          camisetas já está a caminho da sua casa.
        </p>
        <Link href="/">Voltar ao catálogo</Link>
      </SuccessContainer>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  // vamos importar a tipagem da função - essa função exige que seja retornado props
  // console.log nessa função (ou em getStaticProps) aparece no servidor node.js
  /*if (!query.session_id) {
    // se não existir o session_id vai entrar nas chaves
    return {
      redirect: {
        destination: "/",
        permanent: false, // não é sempre que o usuário será redirecionado, por isso 'false'
      },
    };
  }*/
  const sessionId = String(query.session_id); // podemos pegar o session_id de dentro do query - vamos forçar para que seja uma String (porque session_id pode ser uma string ou array de string)
  const name = await stripe.checkout.sessions.retrieve(sessionId, {
    expand: ["line_items", "line_items.data.price.product"],
  });
  const session = await stripe.checkout.sessions.listLineItems(sessionId, {
    expand: ["data.price.product"], // aqui vamos expandir os dados do produto através do ID do relacionamento entre produto e dados desse produto e vamos expandir também os dados do produto relacionado ao preço para ter mais informações
  }); //retrieve é quando queremos pegar um item (e não uma lista)
  const customerName = name.customer_details.name; // pegando nome do cliente
  //const product = session.line_items.data[0].price.product as Stripe.Product; // 'data' porque é um array, uma compra pode ter vários produtos (só podemos ter um - por isso o '0') - Stripe.Product na tipagem porque fizemos um expand no id do produto

  return {
    props: {
      customerName,
      session,
    },
  };
};

// podemos escolher a forma de fetch de dados de três formas:
// Client-side (useEffect) - não é seguro porque expõe a chave secreta do stripe
//setServerSideProps - melhor opção
//getStaticProps - não faz sentido porque essa página não é estática
