import { styled } from "..";

export const Container = styled("div", {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  height: "100vh",
  justifyContent: "center", // aqui vamos colocar esse propriedade para todo o conteúdo ficar centralizado verticalmente - Header e os items de compra
});