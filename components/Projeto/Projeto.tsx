import React from 'react'

interface ProjetoProps {
    nome: string;
    url: string;
}

export default function Projeto({ nome, url }: ProjetoProps) {
    return (
        <div className='border p-3 m-3 rounded-x1'>
            <p className='mb-2'>Veja o projeto - <strong>{nome}</strong></p>
            <a className='text-blue-500' href={url} target="_blank" rel="noopener noreferrer">Acessar Projeto</a>
        </div>
    );
}