import { fireEvent, render, screen } from "@testing-library/react";
import Header from "../../src/pages/header";

it("should be render the header with car", () => {
  render(<Header />);

  const myElem = screen.getByText("MKS");

  const carTextRender = screen.getByText("Carrinho de compras");

  expect(myElem).toBeInTheDocument();

  expect(carTextRender).toBeInTheDocument();
});
