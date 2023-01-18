import Image from "next/image";
import { HomeContainer, Product } from "../styles/pages/home";
import { useKeenSlider } from 'keen-slider/react' // biblioteca para criar o slider
import camiseta1 from "../assets/camisetas/1.png"
import camiseta2 from "../assets/camisetas/2.png"
import camiseta3 from "../assets/camisetas/3.png"
import 'keen-slider/keen-slider.min.css' //importando css da biblioteca do slider

export default function Home() {
  const [ sliderRef ] = useKeenSlider({ // refs são funcionalidades do react que nos permite ter acesso a uma referência de um elemento na dom -> esse hook retorna um array
    slides: {
      perView: 3, // para ficar aparecendo três produtos no slider
      spacing: 48 // para colocar espaço entre os items do slider
    }
  })
   
  return (
    <HomeContainer ref={sliderRef} className="keen-slider"> {/*passamos ref para o container que cerca o slider - precisamos passar essas classes para o slider funcionar*/}
      <Product className="keen-slider__slide">
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
      <Product className="keen-slider__slide">
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
      <Product className="keen-slider__slide">
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
      <Product className="keen-slider__slide">
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
    </HomeContainer>  
  )
}
