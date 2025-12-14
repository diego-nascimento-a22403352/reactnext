import Link from "next/link";

export default function CaracteristicaPage({ params }: { params: { caracteristica: string } }) {
    const { caracteristica } = params;

    return (
        <div className="min-h-screen flex flex-col items-center justify-center p-6 text-center">
            <h1 className="text-3xl font-bold mb-4">
                Característica: {caracteristica}
            </h1>

            <p className="text-blue-400 mb-6">
                Detalhes sobre a característica <strong>{caracteristica}</strong> serão exibidos aqui.
            </p>

            <Link href="/caracteristicas">
                <button className="px-4 py-2 bg-blue-400 rounded-xl hover:bg-blue-100 transition">
                    Voltar
                </button>
            </Link>
        </div>
    );
}