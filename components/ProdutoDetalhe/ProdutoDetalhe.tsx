import { Produto } from "@/models/interface"
import Link from "next/link"
import Image from "next/image"
import { useState, useEffect } from 'react'

interface ProdutoDetalheProps {
  produto?: Produto
}

export default function ProdutoDetalhe({ produto }: ProdutoDetalheProps) {
  if (!produto) return <p className="text-center p-6">Produto não encontrado.</p>

  const imageSrc = produto.image && produto.image.startsWith('http')
    ? produto.image
    : produto.image
      ? `https://deisishop.pythonanywhere.com${produto.image}`
      : '/placeholder.png'


       const toggleFavorite = () => {
    const favs = JSON.parse(localStorage.getItem('favoritos') || '[]')
    if (favs.includes(produto.id)) {
      const next = favs.filter((id: any) => id !== produto.id)
      localStorage.setItem('favoritos', JSON.stringify(next))
      setIsFavorite(false)
    } else {
      favs.push(produto.id)
      localStorage.setItem('favoritos', JSON.stringify(favs))
      setIsFavorite(true)
    }
    
  }

  const [isFavorite, setIsFavorite] = useState<boolean>(() => {
    try { return JSON.parse(localStorage.getItem('favoritos') || '[]').includes(produto.id) }
    catch { return false }
  })

  return (
    <section className="p-6 border rounded-xl bg-white shadow-md flex flex-col items-center gap-4 max-w-xl mx-auto">

      <Image
        src={imageSrc}
        alt={produto?.title ?? "Imagem do produto"}
        width={200}
        height={200}
        className="object-contain"
      />


      <h2 className="text-2xl font-bold text-center">{produto.title}</h2>

      <p className="opacity-80 text-center">{produto.description}</p>

      <p><strong>Categoria:</strong> {produto.category}</p>
      <p><strong>Preço:</strong> {produto.price} $</p>
      <p>
        <strong>Rating:</strong> ⭐ {produto.rating?.rate ?? 0} ({produto.rating?.count ?? 0} avaliações)
      </p>

      <button
          aria-label={isFavorite ? 'Remover favorito' : 'Adicionar aos favoritos'}
          onClick={toggleFavorite}
          className="ml-2 text-xl"
        >
          {isFavorite ? '❤️' : '🤍'}
        </button>
      
      <Link
        href="/produtos"
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        ← Voltar aos produtos
      </Link>

    </section>
  )
}