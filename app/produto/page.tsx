'use client'

import useSWR from 'swr'
import Link from 'next/link'
import { Product } from '@/models/interface'

const fetcher = (url: string) => fetch(url).then(res => res.json());

export default function ProductsPage() {

    const { data, error, isLoading } = useSWR<Product[]>('https://deisishop.pythonanywhere.com/products', fetcher);

    if (error) return <div>Erro ao carregar dados.</div>;
    if (isLoading) return <div>A carregar produtos...</div>;

    return (
        <div style={{ padding: '20px' }}>
            <h1>Lista de Produtos</h1>
            
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px' }}>
                {data?.map((produto) => (
                    <div key={produto.id} style={{ border: '1px solid #ccc', padding: '10px', borderRadius: '8px' }}>
                        <h3>{produto.title}</h3>
                        <img src={produto.image} alt={produto.title} width={100} height={100} style={{ objectFit: 'contain' }} />
                        <p>Preço: {produto.price} €</p>
                        
                        <Link href={`/products/${produto.id}`}>
                            <button style={{ backgroundColor: 'blue', color: 'white', padding: '5px' }}>Ver Detalhes</button>
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    );
}