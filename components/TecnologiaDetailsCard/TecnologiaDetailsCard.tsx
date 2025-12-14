
import React from 'react'
import ContadorPersonalizado from '../contadorPersonalizado/contadorPersonalizado';

interface TecnologiaDetailsCardProps {

    title: string;
    image: string;
    description: string;
    rating: number;
}

export default function TecnologiaDetailsCard( {title, image, description, rating}: TecnologiaDetailsCardProps) {
  return (
    <div>
        <h2 className="text-lg font-semibold mb-3">{title}</h2>
        <img src={image} alt={title} width={100} height={100} className="object-contain"/>
        <p>{description}</p>
        <p>Rating: {rating}</p>
        <ContadorPersonalizado title={title}/>
    </div>
  )
}