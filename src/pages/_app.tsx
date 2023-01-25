import { AppProps } from "next/app";
import { globalStyles } from "../styles/global";
import logoImg from "../assets/logo.svg";
import Image from "next/image";
import { Container, Header } from "../styles/pages/app";
import { HiOutlineShoppingBag } from "react-icons/hi";
import { useState } from "react";
import { CgClose } from "react-icons/cg";
import { RequestContextProvider } from "../contexts/contextRequest";
import Img from "../assets/1.png";

globalStyles(); // aqui estamos importando o estilo global - melhor colocar fora porque os estilos não mudam - Component vai sempre trocar pela página que estamos acessando

export default function App({ Component, pageProps }: AppProps) {
  // podemos colocar a tipagem que vem do next - podemos alterar MyApp para App
  const [click, setClick] = useState(false);
  function handleClick() {
    if (click === false) {
      setClick(true);
    } else {
      setClick(false);
    }
  }

  const handleOutsideClick = (e: any) => {
    if (e.target.id === "modal") {
      handleClick();
    }
  };

  return (
    <Container>
      <Header>
        <Image src={logoImg} alt="" />
        <button onClick={handleClick}>
          <HiOutlineShoppingBag />
        </button>
      </Header>
      <div
        id="modal"
        className={click ? "modal" : "none"}
        onClick={handleOutsideClick}
      >
        <div className="modalContent">
          <button className="close" onClick={() => handleClick()}>
            <CgClose />
          </button>
          <div className="wrappperOne">
            <h1>Sacola de compras</h1>
            <div className="items">
              <div className="item">
                <div className="image">
                  <Image src={Img} alt="" width={95} height={95} />
                </div>
                <div className="details">
                  <span>Camiseta linda do Explorer</span>
                  <strong>R$ 79,90</strong>
                  <button>Remover</button>
                </div>
              </div>
              <div className="item">
                <div className="image">
                  <Image src={Img} alt="" width={95} height={95} />
                </div>
                <div className="details">
                  <span>Camiseta linda do Explorer</span>
                  <strong>R$ 79,90</strong>
                  <button>Remover</button>
                </div>
              </div>
              <div className="item">
                <div className="image">
                  <Image src={Img} alt="" width={95} height={95} />
                </div>
                <div className="details">
                  <span>Camiseta linda do Explorer</span>
                  <strong>R$ 79,90</strong>
                  <button>Remover</button>
                </div>
              </div>
              <div className="item">
                <div className="image">
                  <Image src={Img} alt="" width={95} height={95} />
                </div>
                <div className="details">
                  <span>Camiseta linda do Explorer</span>
                  <strong>R$ 79,90</strong>
                  <button>Remover</button>
                </div>
              </div>
              <div className="item">
                <div className="image">
                  <Image src={Img} alt="" width={95} height={95} />
                </div>
                <div className="details">
                  <span>Camiseta linda do Explorer</span>
                  <strong>R$ 79,90</strong>
                  <button>Remover</button>
                </div>
              </div>
            </div>
          </div>
          <div className="wrapperTwo">
            <div className="amounts">
              <span>Quantidade</span>
              <span>3 itens</span>
            </div>
            <div className="total">
              <strong>Valor total</strong>
              <strong>R$ 270,00</strong>
            </div>
            <button className="buy">Finalizar compra</button>
          </div>
        </div>
      </div>
      <RequestContextProvider>
        <Component {...pageProps} />
      </RequestContextProvider>
    </Container>
  );
}

// o App funciona como um container para as páginas da nossa aplicação - é carregado com qualquer página da nossa aplicação - a página é carregada através do Component acima com as propriedades
// vamos colocar o globalStyles aqui porque não é recomendável colocar no '_document.tsx' porque ele é o documento html
