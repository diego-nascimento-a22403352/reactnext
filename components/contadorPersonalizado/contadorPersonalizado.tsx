'use client'

import { useState, useEffect } from 'react'

interface ContadorPersonalizadoProps {
    title: string;
}

export default function ContadorPersonalizado({ title }: ContadorPersonalizadoProps) {
    const [likes, setLikes] = useState<number>(0);
    const storageKey = `likes-${title}`;

    useEffect(() => {
        const valorGuardado = localStorage.getItem(storageKey);
        if (valorGuardado) {
            setLikes(Number(valorGuardado));
        }
    }, [storageKey]);

    useEffect(() => {
        if (likes > 0) {
            localStorage.setItem(storageKey, String(likes));
        }
    }, [likes, storageKey]);

    return (
        <button 
            onClick={() => setLikes(likes + 1)}
        >
            Likes: {likes} 💗
        </button>
    )
}