import { AppProps } from "next/app";
import { globalStyles } from "../styles/global";
import { Container } from "../styles/pages/app";
import Header from "./header";
import { RequestContextProvider } from "../contexts/contextRequest";
import Footer from "./footer";

globalStyles(); // aqui estamos importando o estilo global - melhor colocar fora porque os estilos não mudam - Component vai sempre trocar pela página que estamos acessando

export default function App({ Component, pageProps }: AppProps) {
  // podemos colocar a tipagem que vem do next - podemos alterar MyApp para App

  return (
    <Container>
      <RequestContextProvider>
        <Header />
        <Component {...pageProps} />
        <Footer />
      </RequestContextProvider>
    </Container>
  );
}

// o App funciona como um container para as páginas da nossa aplicação - é carregado com qualquer página da nossa aplicação - a página é carregada através do Component acima com as propriedades
// vamos colocar o globalStyles aqui porque não é recomendável colocar no '_document.tsx' porque ele é o documento html
