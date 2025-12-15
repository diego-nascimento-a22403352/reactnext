"use client";

import { useEffect, useState } from "react";

export default function Relogio() {
  const [hora, setHora] = useState<string>("");

  useEffect(() => {
    function atualizarHora() {
      const agora = new Date();
      setHora(agora.toLocaleTimeString());
    }

    atualizarHora();
    const intervalo = setInterval(atualizarHora, 1000);

    return () => clearInterval(intervalo);
  }, []);

  return (
    <p>{hora}</p>
  );
}