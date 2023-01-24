import { GetServerSideProps } from "next";
import Image from "next/image";
import Link from "next/link";
import Stripe from "stripe";
import { stripe } from "../lib/stripe";
import { ImageContainer, SuccessContainer } from "../styles/pages/success";

interface SuccessProps {
  customerName: string;
  product: {
    name: string,
    imageUrl: string,
  }
}

export default function Success({ customerName, product }: SuccessProps) { // vamos pegar as informações da propriedade
  return (
    <SuccessContainer>
      <h1>Compra efetuada!</h1>
      <ImageContainer>
        <Image src={product.imageUrl} alt="" width={120} height={110} />
      </ImageContainer>
      <p>
        Uhuul <strong>{customerName}</strong>, sua{" "}
        <strong>{product.name}</strong> já está a caminho da sua
        casa.
      </p>
      <Link href="/">Voltar ao catálogo</Link>
    </SuccessContainer>
  );
}

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  // vamos importar a tipagem da função - essa função exige que seja retornado props
  // console.log nessa função (ou em getStaticProps) aparece no servidor node.js
  const sessionId = String(query.session_id); // podemos pegar o session_id de dentro do query - vamos forçar para que seja uma String (porque session_id pode ser uma string ou array de string)
  const session = await stripe.checkout.sessions.retrieve(sessionId, {
    expand: ['line_items', 'line_items.data.price.product'] // aqui vamos expandir os dados do produto através do ID do relacionamento entre produto e dados desse produto e vamos expandir também os dados do produto relacionado ao preço para ter mais informações
  }) //retrieve é quando queremos pegar um item (e não uma lista)
  const customerName = session.customer_details.name; // pegando nome do cliente
  const product = session.line_items.data[0].price.product as Stripe.Product // 'data' porque é um array, uma compra pode ter vários produtos (só podemos ter um - por isso o '0') - Stripe.Product na tipagem porque fizemos um expand no id do produto

  return {
    props: {
      customerName,
      product: {
        name: product.name,
        imageUrl: product.images[0],
      }
    },
  };
};

// podemos escolher a forma de fetch de dados de três formas:
// Client-side (useEffect) - não é seguro porque expõe a chave secreta do stripe
//setServerSideProps - melhor opção
//getStaticProps - não faz sentido porque essa página não é estática