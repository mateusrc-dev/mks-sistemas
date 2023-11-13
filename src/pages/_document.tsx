import { Html, Head, Main, NextScript } from "next/document"; // não usamos html nativo nesse componente, vamos importar os componentes do next
import { getCssText } from "../styles";

export default function Document() {
  // desse documento vamos retornar a estrutura global do html
  return (
    <Html>
      <Head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;600;700&display=swap"
          rel="stylesheet"
        />
        <style
          id="stitches"
          dangerouslySetInnerHTML={{ __html: getCssText() }}
        />{" "}
        {/*a função getCssText vai, ao usuário carregar a página pelo lado do servidor, carregar essa página, ver qual código css necessário para a página e retornar dessa função - com isso o css vai ser habilitado mesmo com o js desabilitado - com isso estamos trazendo o css pronto do lado do servidor - com isso a aplicação ganha performance também pois o servidor é mais rápido que o browser*/}
      </Head>
      <body>
        {" "}
        {/*não existe um componente body que podemos importar do next*/}
        <Main />{" "}
        {/*Main serve para indicar para o next em qual local do html da aplicação vão ser inseridos os conteúdos das páginas que são carregadas sob demanda*/}
        <NextScript />{" "}
        {/*é em qual local do html queremos carregar os scripts JS da página*/}
      </body>
    </Html>
  );
}
