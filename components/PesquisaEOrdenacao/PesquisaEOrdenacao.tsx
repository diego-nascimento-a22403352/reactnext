'use client'
interface PesquisaEOrdenacaoProps {
  pesquisa: string
  setPesquisa: (value: string) => void
  ordenacao: string
  setOrdenacao: (value: string) => void
}

export default function PesquisaEOrdenacao({ pesquisa, setPesquisa, ordenacao, setOrdenacao }: PesquisaEOrdenacaoProps) {
  return (
    <section className="bg-blue-300 p-4 rounded-xl">
      <input
        type="text"
        placeholder="Pesquise por nome..."
        className="bg-white p-2 rounded border w-full mb-4"
        value={pesquisa}
        onChange={(e) => setPesquisa(e.target.value)}
      />
      <select
        value={ordenacao}
        onChange={(e) => setOrdenacao(e.target.value)}
        className="bg-white p-2 rounded border w-full mb-4"
      >
        <option value="nome-asc">Nome (A → Z)</option>
        <option value="nome-desc">Nome (Z → A)</option>
        <option value="preco-asc">Preço (menor → maior)</option>
        <option value="preco-desc">Preço (maior → menor)</option>
      </select>
    </section>
  )
}