'use client'
import { Produto } from '@/models/interface'
import ProductCard from '@/components/ProductCard/ProductCard'

interface ListaProdutosProps {
  produtos: Produto[]
  adicionarCarrinho: (produto: Produto) => void
  removerCarrinho: (produto: Produto) => void
  noCesto: boolean
}

export default function ListaProdutos({ produtos, adicionarCarrinho: adicionarCarrinho, removerCarrinho: removerCarrinho, noCesto }: ListaProdutosProps) {
  return (
    <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
      {produtos.length === 0 && <p>❌ Nenhum produto encontrado</p>}
      {produtos.map(p => (
        <ProductCard
          key={p.id}
          produto={p}
          adicionaProduto={() => adicionarCarrinho(p)}
          removeProduto={() => removerCarrinho(p)}
          noCesto={noCesto}
        />
      ))}
    </section>
  )
}