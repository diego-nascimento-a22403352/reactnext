'use client'

import Image from "next/image"
import { Produto } from "@/models/interface"
import { useState, useEffect } from 'react'

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

import Link from "next/link"

interface ProductCardProps {
  produto: Produto
  adicionaProduto: () =>void
  removeProduto: () => void
  noCesto: boolean
}

export default function ProductCard({ produto, adicionaProduto: adicionaProduto, removeProduto: removeProduto, noCesto: noCesto }: ProductCardProps) {
  const [isFavorite, setIsFavorite] = useState<boolean>(() => {
    try { return JSON.parse(localStorage.getItem('favoritos') || '[]').includes(produto.id) }
    catch { return false }
  })

  const imageSrc = produto.image.startsWith('http')
    ? produto.image
    : `https://deisishop.pythonanywhere.com${produto.image}`

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

  let conteudoFooter

  if (!noCesto) {
    conteudoFooter = (
      <>
        <button
          onClick={adicionaProduto}
          className="bg-green-500 text-white px-3 py-1 rounded text-sm hover:bg-green-600"
        >
          Adicionar ao carrinho
        </button>
        <Link
          href={`/produtos/${produto.id}`}
          className="bg-blue-500 text-white px-3 py-1 rounded text-sm hover:bg-blue-600 mt-2"
        >
          +info
        </Link>
      </>
    )
  } else {
    conteudoFooter = (
      <button
        onClick={removeProduto}
        className="bg-red-500 text-white px-3 py-1 rounded text-sm hover:bg-red-600"
      >
        Remover do carrinho
      </button>
    )
  }

  return (
    <Card className="w-56">
      <CardHeader className="p-2 flex items-center justify-between">
        <CardTitle className="text-center">{produto.title}</CardTitle>
        <button
          aria-label={isFavorite ? 'Remover favorito' : 'Adicionar aos favoritos'}
          onClick={toggleFavorite}
          className="ml-2 text-xl"
        >
          {isFavorite ? '❤️' : '🤍'}
        </button>
      </CardHeader>

      <CardContent className="flex flex-col items-center p-2">
        <Image src={imageSrc} alt={produto.title} width={100} height={100} />
      </CardContent>

      <CardFooter className="flex flex-col items-center p-2">
        <p>Categoria: {produto.category}</p>
        <p className="font-bold">{produto.price} $</p>
        {conteudoFooter}
      </CardFooter>
    </Card>
  )
}