'use client'

import Image from "next/image"
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

import { Produto } from "@/models/interface"
import Link from "next/link"

interface ProductCardProps {
  produto: Produto
  adicionaProduto: () =>void
  removeProduto: () => void
  noCesto: boolean
}

export default function ProductCard({ produto, adicionaProduto: adicionaProduto, removeProduto: removeProduto, noCesto: noCesto }: ProductCardProps) {

  let conteudoFooter

  const imageSrc = produto.image.startsWith('http') 
    ? produto.image 
    : `https://deisishop.pythonanywhere.com${produto.image}`;


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
      <CardHeader className="p-2">
        <CardTitle className="text-center">{produto.title}</CardTitle>
      </CardHeader>

      <CardContent className="flex flex-col items-center p-2">
        <Image
          src={imageSrc}
          alt={produto.title}
          width={100}
          height={100}
        />
      </CardContent>

      <CardFooter className="flex flex-col items-center p-2">
        <p>Categoria: {produto.category}</p>
        <p className="font-bold">{produto.price} $</p>
        {conteudoFooter}
      </CardFooter>
    </Card>
  )
}