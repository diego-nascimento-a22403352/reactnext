'use client'

import useSWR from 'swr'
import { Produto } from '@/models/interface'
import ProdutoDetalhe from '@/components/ProdutoDetalhe/ProdutoDetalhe'
import { useParams } from 'next/navigation'

const fetcher = (url: string) => fetch(url).then(res => res.json())

export default function ProdutoPage() {
  const params = useParams()
  const id = params.produto 

  if (!id) return <ProdutoDetalhe />

  const { data, error } = useSWR<Produto>(
    `https://deisishop.pythonanywhere.com/products/${id}`, 
    fetcher
  )

  if (error) return <ProdutoDetalhe />
  if (!data) return <p className="text-center p-6">Carregando...</p>

  return <ProdutoDetalhe produto={data} />
}