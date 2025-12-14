import Link from "next/link";

interface CaracterísticasProps {
    caracteristica: string;
}
export default function Caracteristica({ caracteristica }: CaracterísticasProps) {
    return (
       
        <Link href={`/caracteristicas/${caracteristica}`}>
        <li className="text-sm text-blue-400"> {caracteristica} </li>
        </Link>
       
    );
}