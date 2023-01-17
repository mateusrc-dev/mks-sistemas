import { Html, Head, Main, NextScript } from 'next/document' // não usamos html nativo nesse componente, vamos importar os componentes do next

export default function Document() { // desse documento vamos retornar a estrutura global do html
  return (
      <Html>
        <Head>
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" /> {/*precisamos alterar essa propriedade - antes estava crossorigin*/}
          <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap" rel="stylesheet" />
        </Head>
        <body> {/*não existe um componente body que podemos importar do next*/}
          <Main /> {/*Main serve para indicar para o next em qual local do html da aplicação vão ser inseridos os conteúdos das páginas que são carregadas sob demanda*/}
          <NextScript /> {/*é em qual local do html queremos carregar os scripts JS da página*/}
        </body>
      </Html>
    )
}