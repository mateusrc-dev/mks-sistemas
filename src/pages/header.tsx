import logoImg from "../assets/logo.svg";
import Image from "next/image";
import {
  HeaderContainer,
  Container,
  HeaderContainerTwo,
} from "../styles/pages/header";
import { HiOutlineShoppingBag } from "react-icons/hi";
import { useContext, useState, useEffect } from "react";
import { CgClose } from "react-icons/cg";
import { RequestContext } from "../contexts/contextRequest";
import { RiAlertFill } from "react-icons/ri";

export default function Header() {
  const [click, setClick] = useState(false);
  const [isCreatingCheckoutSession, setIsCreatingCheckoutSession] =
    useState(false);
  const { request, handleDelete, priceId, headerState } =
    useContext(RequestContext);
  const [fullPrice, setFullPrice] = useState(0);

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

  function NewDelete(index: number) {
    handleDelete(index);
  }

  useEffect(() => {
    function handleFullPrice() {
      let num = 0;
      let number: string;
      for (let i = 0; request.length > i; i++) {
        number = request[i].price.replaceAll("R$", "").replace(",", ".");
        num = num + Number(number);
      }
      return num;
    }
    setFullPrice(handleFullPrice());
  }, [request]);

  async function handleBuyProduct() {
    console.log("clicando no botão de compra!");
  }

  return (
    <Container>
      {headerState ? (
        <HeaderContainer>
          <Image src={logoImg} alt="" />

          <div className="buttonContainer">
            {request && request.length !== 0 ? (
              <span>{request.length}</span>
            ) : null}
            <button onClick={handleClick}>
              <HiOutlineShoppingBag />
            </button>
          </div>
        </HeaderContainer>
      ) : (
        <HeaderContainerTwo>
          <Image src={logoImg} alt="" />
        </HeaderContainerTwo>
      )}
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
            {request.length !== 0 ? (
              <div className="items">
                {request &&
                  request.map((item, index) => (
                    <div className="item" key={String(index)}>
                      <div className="image">
                        <Image src={item.img} alt="" width={95} height={95} />
                      </div>
                      <div className="details">
                        <span>{item.title}</span>
                        <strong>{item.price}</strong>
                        <button onClick={() => NewDelete(index)}>
                          Remover
                        </button>
                      </div>
                    </div>
                  ))}
              </div>
            ) : (
              <div className="alert">
                <RiAlertFill />
                <h1>Ainda não tem camisetas adicionadas!</h1>
              </div>
            )}
          </div>
          <div className="wrapperTwo">
            <div className="amounts">
              <span>Quantidade</span>
              <span>{request.length} itens</span>
            </div>
            <div className="total">
              <strong>Valor total</strong>
              <strong>
                R$ {String(fullPrice.toFixed(2)).replace(".", ",")}
              </strong>
            </div>
            <button
              className="buy"
              disabled={isCreatingCheckoutSession || request.length === 0}
              onClick={handleBuyProduct}
            >
              Finalizar compra
            </button>
          </div>
        </div>
      </div>
    </Container>
  );
}
