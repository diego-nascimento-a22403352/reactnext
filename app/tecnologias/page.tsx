import React from 'react'
import tecnologias from '@/app/data/tecnologias.json';
import Image from 'next/image';

export default function page() {
  return (
    <div>
      <h2>Tecnologias Exploradas</h2>
      {tecnologias.map((tecnologia, i) => {
        return (
          <div key={i} className="border rounded-lg p-4 shadow-md flex flex-col items-center text-center hover:shadow-xl transition">
            <h3 className="text-xl font-semibold mb-2">{tecnologia.title}</h3>
            <Image
              src={tecnologia.image}
              alt={tecnologia.title}
              width={100}
              height={100}
              className="mb-2"
            />
            <p className="text-sm text-gray-600 mb-2">{tecnologia.description}</p>
            <p className="font-bold text-yellow-500">{tecnologia.rating}</p>
          </div>
        )
      })}
    </div>
  )
}
