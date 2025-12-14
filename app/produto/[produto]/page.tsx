'use client'

import useSWR from 'swr'
import { useParams } from 'next/navigation'
import { Product } from '@/models/interface'
import { useState } from 'react'

const fetcher = (url: string) => fetch(url).then(res => res.json());

export default function ProductDetailPage() {
    const params = useParams();
    const id = params.id; 

    const { data: produto, error, isLoading } = useSWR<Product>(
        `https://deisishop.pythonanywhere.com/products/${id}`, 
        fetcher
    );

    const [visivel, setVisivel] = useState(true);

    if (error) return <div>Erro ao carregar o produto.</div>;
    if (isLoading) return <div>A carregar...</div>;
    if (!produto || !visivel) return <div>Produto não encontrado ou removido.</div>;

    return (
        <div style={{ padding: '20px' }}>
            <h1>{produto.title}</h1>
            <img src={produto.image} alt={produto.title} width={200} />
            
            <p><strong>Categoria:</strong> {produto.category}</p>
            <p><strong>Preço:</strong> {produto.price} €</p>
            <p>{produto.description}</p>

            <button 
                onClick={() => setVisivel(false)}
                style={{ backgroundColor: 'red', color: 'white', padding: '10px' }}
            >
                Remover Produto
            </button>
        </div>
    );
}