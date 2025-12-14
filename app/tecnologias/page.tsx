import React from 'react'
import tecnologias from '@/app/data/tecnologias.json';
import Image from 'next/image';
import TecnologiaCard from '@/components/TecnologiaCard/TecnologiaCard';
import Link from 'next/link';

export default function TecnologiasPage() {
  return (
      <div className="container mx-auto p-8 font-sans">
      <h2 className="text-2xl font-bold mb-6">Tecnologias Exploradas</h2>
      <div className="flex flex-wrap gap-4 mt-6 justify-center">
      {tecnologias.map((tecnologia, index) => (
        <Link href={`/tecnologias/${index}`}>
          <TecnologiaCard 
            title={tecnologia.title} 
            image={tecnologia.image} 
            />
        </Link>
      ))}
      </div>
      </div>
  )
}
