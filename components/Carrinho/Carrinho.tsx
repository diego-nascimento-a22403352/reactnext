'use client'
import { Produto } from '@/models/interface'

interface CarrinhoProps {
  carrinho: Produto[]
  removerCarrinho: (produto: Produto) => void
  estudante: boolean
  setEstudante: (value: boolean) => void
  cupao: string
  setCupao: (value: string) => void
  compra: () => void
  respostaCompra: string | null
}

export default function Carrinho({ carrinho: carrinho, removerCarrinho: removerCarrinho, estudante: estudante, setEstudante: setEstudante, cupao: cupao, setCupao: setCupao, compra: compra, respostaCompra }: CarrinhoProps) {
  const total = carrinho.reduce((acc, p) => acc + Number(p.price), 0)

  return (
    <section className="bg-green-100 p-4 rounded-xl mt-6">
      <h2 className="font-bold text-xl mb-4">Carrinho</h2>
      <ul className="mb-4">
        {carrinho.length === 0 ? (
          <li className="text-gray-500">O carrinho está vazio.</li>
        ) : (
          carrinho.map(p => (
            <li key={p.id}>
              {p.title} — {p.price} $
              <button
                onClick={() => removerCarrinho(p)}
                className="ml-2 bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
              >
                Remover
              </button>
            </li>
          ))
        )}
      </ul>


      <p className="font-bold mb-2">Total: {total.toFixed(2)} $</p>

      <div className="flex flex-col gap-2 mb-4">
        <label>
          <input
            type="checkbox"
            checked={estudante}
            onChange={(e) => setEstudante(e.target.checked)}
            className="mr-2"
          />
          Estudante DEISI
        </label>

        <input
          type="text"
          placeholder="Cupão de desconto"
          value={cupao}
          onChange={(e) => setCupao(e.target.value)}
          className="border rounded p-2"
        />
      </div>

      <button
        onClick={compra}
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        Comprar
      </button>

      {respostaCompra && (
        <p className="mt-2 bg-white p-2 rounded border">{respostaCompra}</p>
      )}
    </section>
  )
}