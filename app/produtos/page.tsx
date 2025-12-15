'use client'
import useSWR from 'swr'
import { Produto } from '@/models/interface'
import { Spinner } from '@/components/ui/spinner'
import { useState, useEffect } from 'react'

import PesquisaEOrdenacao from '@/components/PesquisaEOrdenacao/PesquisaEOrdenacao'
import ListaProdutos from '@/components/ListaProdutos/ListaProdutos'
import Carrinho from '@/components/Carrinho/Carrinho'

const fetcher = async (url: string) => {
  const res = await fetch(url)
  if (!res.ok) throw new Error(`Erro: ${res.status} ${res.statusText}`)
  return res.json()
}

export default function ProdutosPage() {
  const { data, error, isLoading } = useSWR<Produto[]>('https://deisishop.pythonanywhere.com/products/', fetcher)

  const [pesquisa, setPesquisa] = useState('')
  const [ordenacao, setOrdenacao] = useState('nome-asc')
  const [produtosFiltrados, setProdutosFiltrados] = useState<Produto[]>([])

  const [carrinho, setCarrinho] = useState<Produto[]>([])
  const [estudante, setEstudante] = useState(false)
  const [cupao, setCupao] = useState('')
  const [respostaCompra, setRespostaCompra] = useState<string | null>(null)

  useEffect(() => {
    if (!data) return
    let resultados = data.filter(p =>
      p.title.toLowerCase().includes(pesquisa.toLowerCase())
    )
    resultados = resultados.sort((a, b) => {
      switch (ordenacao) {
        case 'nome-asc': return a.title.localeCompare(b.title)
        case 'nome-desc': return b.title.localeCompare(a.title)
        case 'preco-asc': return Number(a.price) - Number(b.price)
        case 'preco-desc': return Number(b.price) - Number(a.price)
        default: return 0
      }
    })
    setProdutosFiltrados(resultados)
  }, [pesquisa, ordenacao, data])

  if (error) return <p>Erro ao carregar</p>
  if (isLoading) return <p><Spinner /></p>
  if (!data || data.length === 0) return <p>Sem produtos</p>

  const adicionarAoCarrinho = (produto: Produto) => {
    if (!carrinho.find(p => p.id === produto.id)) {
      const novoCarrinho = [...carrinho, produto]
      setCarrinho(novoCarrinho)
      localStorage.setItem('carrinho', JSON.stringify(novoCarrinho))
    }
  }

  const removerDoCarrinho = (produto: Produto) => {
    const novoCarrinho = carrinho.filter(p => p.id !== produto.id)
    setCarrinho(novoCarrinho)
    localStorage.setItem('carrinho', JSON.stringify(novoCarrinho))
  }

  const comprar = async () => {
  try {
    const response = await fetch('https://deisishop.pythonanywhere.com/buy', {
      method: 'POST',
      body: JSON.stringify({
        products: carrinho.map(p => p.id),
        name: '',
        student: estudante,
        coupon: cupao
      }),
      headers: { "Content-Type": "application/json" }
    })
    
    if (!response.ok) throw new Error('Erro ao processar a compra')
    const data = await response.json()

    let msg = ''
    if (data.error) {
      msg = `Erro: ${data.error}`
    } else {
      msg = `Compra efetuada! Total: ${data.totalCost}€\nReferência: ${data.reference}`
    }

    setRespostaCompra(msg)
    setCarrinho([])
    localStorage.removeItem('carrinho')
    setCupao('')
    setEstudante(false)
    
  } catch (err: any) {
    setRespostaCompra(err.message || 'Erro desconhecido')
  }
}


  return (
    <section className="flex flex-col gap-6 mt-6">
      <PesquisaEOrdenacao
        pesquisa={pesquisa}
        setPesquisa={setPesquisa}
        ordenacao={ordenacao}
        setOrdenacao={setOrdenacao}
      />

      <ListaProdutos
        produtos={produtosFiltrados}
        adicionarCarrinho={adicionarAoCarrinho}
        removerCarrinho={removerDoCarrinho}
        noCesto={false}
      />

      <Carrinho
        carrinho={carrinho}
        removerCarrinho={removerDoCarrinho}
        estudante={estudante}
        setEstudante={setEstudante}
        cupao={cupao}
        setCupao={setCupao}
        compra={comprar}
        respostaCompra={respostaCompra}
      />


    </section>
  )
}