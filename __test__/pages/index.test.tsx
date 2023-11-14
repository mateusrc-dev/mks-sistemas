import { render, screen } from "@testing-library/react";
import Home from "../../src/pages";

const productsData = {
  products: [
    {
      id: 1,
      name: "óculos",
      brand: "lindos",
      description: "lindos demais",
      photo: "https://avatars.githubusercontent.com/u/109779094?v=4",
      price: "1.00",
      createdAt: String(new Date()),
      updatedAt: String(new Date()),
    },
  ],
  count: 1,
};

it("should be render the page home without car", () => {
  render(<Home productsData={productsData} />);

  const myElem = screen.getByText("óculos");

  expect(myElem).toBeInTheDocument();
});

/* it("should be render the page home without car", async () => {
  render(<Home productsData={productsData} />);

  fireEvent.click(screen.getByRole("button"));

  await screen.findByRole('heading')

  expect(screen.getByText("Carrinho")).toBeInTheDocument();
}); */
