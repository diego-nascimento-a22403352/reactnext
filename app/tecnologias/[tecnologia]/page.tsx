"use client"
import React from 'react'

import TecnologiaDetailsCard from '@/components/TecnologiaDetailsCard/TecnologiaDetailsCard';
import tecnologias from '@/app/data/tecnologias.json';
import { useParams } from 'next/navigation';

export default function TecnologiaPage() {

    const params = useParams();
    const index = Number(params.tecnologia);

  return (
    <>
    
          <TecnologiaDetailsCard
            title={tecnologias[index].title}
            image={tecnologias[index].image}
            description={tecnologias[index].description} 
            rating={tecnologias[index].rating}
            />
    </>
    )
}
