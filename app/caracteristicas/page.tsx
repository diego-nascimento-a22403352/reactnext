import Caracteristica from "@/components/Caracteristica/Caracteristica";

export default function Caracteristicas() {

  const caracteristicas = [
    'JSX, sintaxe que mistura HTML e JS.',
    'Componentes, funções que retornam JSX.',
    'Componentes Reutilizáveis e Modulares.',
    'Roteamento Automático e APIs.',
    'Hooks: useState, useEffect e useSWR.',
    'Renderização Rápida e SEO Friendly.',
    'TypeScript Seguro e Escalável.',
    'Comunidade Ativa e Popularidade.'
  ];


  return (
    <main className="min-h-screen flex flex-col items-center">

      <h2 className="text-3xl font-bold mb-10">Características do React e Next.js</h2>

      <div className="grid grid-cols-1 gap-6 w-full max-w-5xl">
        {caracteristicas.map((caracteristica, index) => (
          <Caracteristica key={index} caracteristica={caracteristica} />
        ))}
      </div>
    </main>
  );
}