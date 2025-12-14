'use client'

import { useState } from 'react'

export default function InputPage() {
    const [texto, setTexto] = useState("")
    const [opcao, setOpcao] = useState("HTML")
    const [tarefas, setTarefas] = useState<string[]>([])
    const [novaTarefa, setNovaTarefa] = useState("")
    const [indiceEdicao, setIndiceEdicao] = useState<number | null>(null)
    const [textoEdicao, setTextoEdicao] = useState("")

    function adicionarTarefa() {
            setTarefas([...tarefas, novaTarefa])
            setNovaTarefa("")
    }

    function apagarTarefa(indexParaApagar: number) {
        const novasTarefas = tarefas.filter((_, index) => index !== indexParaApagar)
        setTarefas(novasTarefas)
    }

    function iniciarEdicao(index: number, textoAtual: string) {
        setIndiceEdicao(index)
        setTextoEdicao(textoAtual)
    }

    function salvarEdicao(index: number) {
        const copiaTarefas = [...tarefas]
        copiaTarefas[index] = textoEdicao
        setTarefas(copiaTarefas)
        setIndiceEdicao(null)
    }

    return (
        <div>
            <section>
                <h2>Eco do Input</h2>
                <input 
                    type="text" 
                    placeholder="Escreva algo..." 
                    className='bg-blue-300'
                    value={texto}
                    onChange={(e) => setTexto(e.target.value)} 
                />
                <p>Texto digitado: {texto}</p> 
            </section>
            
            <section>    
                <h2>Tecnologias</h2>
                <select value={opcao} 
                className='bg-blue-300'
                onChange={(e) => setOpcao(e.target.value)}>
                    <option value="HTML">HTML</option>
                    <option value="CSS">CSS</option>
                    <option value="JavaScript">JavaScript</option>
                </select>
                <p>Tecnologia escolhida: {opcao}</p> 
            </section>

            <section>
                <h2>Lista de Tarefas</h2>
                <input
                    type="text"
                    placeholder="Nova tarefa..."
                    value={novaTarefa}
                    onChange={(e) => setNovaTarefa(e.target.value)}
                />
                <button onClick={adicionarTarefa}>Adicionar</button>
                
                <p>Tarefas:</p>
                <ul>
                    {tarefas.map((tarefa, index) => (
                        <li className='bg-blue-300'
                         key={index} style={{ marginBottom: '10px' }}>
                            {indiceEdicao === index ? (
                                <>
                                    <input 
                                        type="text" 
                                        value={textoEdicao}
                                        onChange={(e) => setTextoEdicao(e.target.value)}
                                    />
                                    <button onClick={() => salvarEdicao(index)}>Salvar</button>
                                </>
                            ) : (
                                <>
                                    <span>{tarefa}</span>
                                    <button onClick={() => iniciarEdicao(index, tarefa)} style={{ marginLeft: '10px' }}>
                                        Editar
                                    </button>
                                    <button onClick={() => apagarTarefa(index)} style={{ marginLeft: '5px', color: 'red' }}>
                                        Apagar
                                    </button>
                                </>
                            )}
                        </li>
                    ))}
                </ul>
            </section>
        </div>
    )
}