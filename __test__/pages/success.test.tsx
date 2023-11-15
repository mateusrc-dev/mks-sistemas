import { fireEvent, render, screen } from "@testing-library/react";
import Success from "../../src/pages/success";

it("should be render the header with car", () => {
  render(<Success />);

  const myElem = screen.getByText("Compra efetuada!");

  expect(myElem).toBeInTheDocument();
});
