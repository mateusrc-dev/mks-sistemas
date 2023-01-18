import Image from "next/image";
import { HomeContainer, Product } from "../styles/pages/home";

import camiseta1 from "../assets/camisetas/1.png"
import camiseta2 from "../assets/camisetas/2.png"
import camiseta3 from "../assets/camisetas/3.png"

export default function Home() {
  return (
    <HomeContainer>
      <Product>
        <Image src={camiseta1} alt="" width={520} height={480} /> {/*quando usamos o Image do next é importante colocar altura e largura pra imagem não ficar com um tamanho muito grande*/}
        <footer> {/*melhor elemento pra colocar legenda na imagem*/}
          <strong>
            Camiseta X
          </strong>
          <span>
            R$ 79,90
          </span>
        </footer>
      </Product>
      <Product>
        <Image src={camiseta2} alt="" width={520} height={480} /> {/*quando usamos o Image do next é importante colocar altura e largura pra imagem não ficar com um tamanho muito grande*/}
        <footer> {/*melhor elemento pra colocar legenda na imagem*/}
          <strong>
            Camiseta X
          </strong>
          <span>
            R$ 79,90
          </span>
        </footer>
      </Product>
      <Product>
        <Image src={camiseta3} alt="" width={520} height={480} /> {/*quando usamos o Image do next é importante colocar altura e largura pra imagem não ficar com um tamanho muito grande*/}
        <footer> {/*melhor elemento pra colocar legenda na imagem*/}
          <strong>
            Camiseta X
          </strong>
          <span>
            R$ 79,90
          </span>
        </footer>
      </Product>
    </HomeContainer>  
  )
}
