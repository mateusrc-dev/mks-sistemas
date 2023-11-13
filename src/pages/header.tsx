import Image from "next/image";
import {
  HeaderContainer,
  Container,
  LogoContainer,
  LogoTitleOne,
  LogoTitleTwo,
} from "../styles/pages/header";
import Car from "../assets/car.svg";
import { useContext, useState, useEffect } from "react";
import X from "../assets/x.svg";
import { RequestContext } from "../contexts/contextRequest";
import { RiAlertFill } from "react-icons/ri";
import Link from "next/link";
import CountItems from "./countItems";

export default function Header() {
  const [click, setClick] = useState(false);
  const { request, handleDelete, headerState } = useContext(RequestContext);
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

  return (
    <Container>
      <HeaderContainer>
        <LogoContainer>
          <LogoTitleOne>MKS</LogoTitleOne>
          <LogoTitleTwo>sistemas</LogoTitleTwo>
        </LogoContainer>
        {headerState ? (
          <button className="buttonContainer" onClick={handleClick}>
            <Image src={Car} alt="" />
            <p className="countRequests">{request.length}</p>
          </button>
        ) : (
          <></>
        )}
      </HeaderContainer>
      <div
        id="modal"
        className={click ? "modal" : "none"}
        onClick={handleOutsideClick}
      >
        <div className="modalContent">
          <button className="close" onClick={() => handleClick()}>
            <Image src={X} alt="" />
          </button>
          <div className="wrappperOne">
            <h1 style={{ width: "200px" }}>Carrinho de compras</h1>
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
                        <div
                          style={{
                            display: "flex",
                            flexDirection: "row",
                            alignItems: "center",
                          }}
                        >
                          <div
                            style={{
                              display: "flex",
                              flexDirection: "column",
                              gap: "4px",
                            }}
                          >
                            <p
                              style={{
                                color: "#000",
                                fontSize: "5px",
                                fontWeight: 400,
                                lineHeight: "normal",
                              }}
                            >
                              Qtd:
                            </p>
                            <CountItems itemId={item.id} count={item.count} />
                          </div>
                          <strong>R${item.price}</strong>
                        </div>
                        <button
                          onClick={() => NewDelete(index)}
                          className="removeItem"
                        >
                          <Image src={X} width={8} alt="" />
                        </button>
                      </div>
                    </div>
                  ))}
              </div>
            ) : (
              <div className="alert">
                <RiAlertFill size={100} color="#ffffff" />
                <h1>Ainda não tem itens adicionados!</h1>
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
            <Link href={`/success`}>
              <button
                className="buy"
                onClick={handleClick}
                disabled={request.length === 0}
              >
                Finalizar compra
              </button>
            </Link>
          </div>
        </div>
      </div>
    </Container>
  );
}
