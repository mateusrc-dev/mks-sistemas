import logoImg from "../assets/logo.svg";
import Image from "next/image";
import { HeaderContainer, Container } from "../styles/pages/header";
import { HiOutlineShoppingBag } from "react-icons/hi";
import { useContext, useState } from "react";
import { CgClose } from "react-icons/cg";
import { RequestContext } from "../contexts/contextRequest";

export default function Header() {
  const [click, setClick] = useState(false);
  const { request, handleDelete } = useContext(RequestContext);

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
    console.log(index)
    handleDelete(index);
  }

  return (
    <Container>
      <HeaderContainer>
        <Image src={logoImg} alt="" />
        <button onClick={handleClick}>
          <HiOutlineShoppingBag />
        </button>
      </HeaderContainer>
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
              {request.map((item, index) => (
                <div className="item" key={String(index)}>
                  <div className="image">
                    <Image src={item.img} alt="" width={95} height={95} />
                  </div>
                  <div className="details">
                    <span>{item.title}</span>
                    <strong>R$ {item.price}</strong>
                    <button onClick={() => NewDelete(index)}>Remover</button>
                  </div>
                </div>
              ))}
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
    </Container>
  );
}
