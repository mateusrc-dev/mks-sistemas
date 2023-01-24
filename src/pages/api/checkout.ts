// todo código que roda aqui dentro é um código serverSide - não precisamos nos preocupar com dados sensíveis
// vamos criar nossas api routes - como chamamos no next
// quando queremos criar uma funcionalidade que depende da ação do usuário (clique em um botão por ex.) precisamos criar essas rotas - getStaticProps e getServerSideProps são códigos serverSides que rodam apenas no carregamento da página

import { NextApiRequest, NextApiResponse } from "next";
import { stripe } from "../../lib/stripe";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // vamos importar a tipagem de 'req' e 'res'
  const { priceId } = req.body; // vamos pegar do corpo da requisição o priceId

  if (req.method !== 'POST') { // essa requisição vai ser chamada como post, então se o usuário chamar essa rota pela url pelo método get vai entrar nas chaves
    return res.status(405).json({ error: "Method not allowed." });
  }

  if (!priceId) { // se caso o priceId não for enviado na requisição vai entrar nas chaves
    return res.status(400).json({ error: "Price not found." });
  }

  //const priceId = 'price_1MTTBoAR5tFpI2FR7JDCcE3c';
  const successUrl = `${process.env.NEXT_URL}/success?session_id={CHECKOUT_SESSION_ID}`;
  const cancelUrl = `${process.env.NEXT_URL}/`;

  const checkoutSession = await stripe.checkout.sessions.create({
    success_url: successUrl, // essas são as url's de sucesso e de cancelamento - url para onde o usuário vai ser redirecionado após finalização da compra ou cancelamento da compra
    cancel_url: cancelUrl,
    mode: "payment", // modo é pagamento porque vai se realizado apenas um pagamento - pessoa colocar conta de banco, dados do cartão, etc
    line_items: [
      // array que vai conter informações sobre o que o usuário está comprando
      {
        price: priceId, // no stripe o preço é uma entidade diferente do produto, porque o preço pode variar, por isso passamos aqui o ID do relacionamento dos preços e do produto
        quantity: 1, // no caso não vai ter como colocar mais de um, não tem carrinho
      },
    ],
  });

  return res.status(201).json({
    checkoutUrl: checkoutSession.url,
  });
}
