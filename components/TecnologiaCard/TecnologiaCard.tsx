import React from 'react'
import ContadorPersonalizado from '../contadorPersonalizado/contadorPersonalizado';

interface TecnologiaCardProps {
    title: string;
    image: string;
}

export default function TecnologiaCard( {title, image}: TecnologiaCardProps) {
  return (
    <div className="border rounded-lg p-4 shadow-md flex flex-col items-center text-center hover:shadow-xl transition">
        <h2 className="text-lg font-semibold mb-3">{title}</h2>
        <img src={image} alt={title} width={100} height={100} className="object-contain"/>
        <ContadorPersonalizado title={title}/>
    </div>
  )
}
