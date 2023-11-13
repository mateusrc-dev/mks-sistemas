import { RequestContext } from "../contexts/contextRequest";
import { CountItemsContainer } from "../styles/pages/countItems";
import { useContext, useState } from "react";

interface Props {
  count: number;
  itemId: string;
}

export default function CountItems({ count, itemId }: Props) {
  const { updateCountItem } = useContext(RequestContext);
  const [state, setState] = useState<boolean>(false);

  function handleCountOfItems(operation: string) {
    if (state === false) {
      setState(true);
    } else {
      setState(false);
    }

    if (operation === "somar") {
      updateCountItem(itemId, count + 1);
    } else if (operation === "subtrair") {
      if (count < 2) {
        return;
      }

      updateCountItem(itemId, count - 1);
    }
  }

  return (
    <CountItemsContainer>
      <p
        style={{
          cursor: "pointer",
          color: "#000",
          fontSize: "12px",
          fontWeight: 400,
          lineHeight: "normal",
        }}
        onClick={() => handleCountOfItems("subtrair")}
      >
        -
      </p>
      <div></div>
      <p
        style={{
          color: "#000",
          fontSize: "8px",
          fontWeight: 400,
          lineHeight: "normal",
        }}
      >
        {count}
      </p>
      <div></div>
      <p
        style={{
          cursor: "pointer",
          color: "#000",
          fontSize: "8px",
          fontWeight: 400,
          lineHeight: "normal",
        }}
        onClick={() => handleCountOfItems("somar")}
      >
        +
      </p>
    </CountItemsContainer>
  );
}
