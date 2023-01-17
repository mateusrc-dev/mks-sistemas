import { useRouter } from 'next/router'

export default function Product() {
  const { query } = useRouter() // com esse hook que vem de dentro do next podemos acessar os params que estão dentro do objeto chamado query
  return (
      <h1>Product: {JSON.stringify(query)}</h1>
    )
}