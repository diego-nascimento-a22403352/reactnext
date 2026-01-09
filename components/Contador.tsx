'use client';

import { useState, useEffect, useCallback } from 'react';

export default function Contador() {
    const [count, setCount] = useState(0);
    const [history, setHistory] = useState<number[]>([]);

    useEffect(() => {
        const stored = localStorage.getItem('contador');
        const storedHistory = localStorage.getItem('contador-history');
        if (stored) setCount(parseInt(stored));
        if (storedHistory) setHistory(JSON.parse(storedHistory));
    }, []);

    const updateCount = useCallback((newValue: number) => {
        const clamped = Math.max(0, Math.min(10, newValue));
        setCount(clamped);
        localStorage.setItem('contador', clamped.toString());
        setHistory(prev => [...prev, clamped]);
        localStorage.setItem('contador-history', JSON.stringify([...history, clamped]));
    }, [history]);

    const getColor = () => {
        if (count <= 3) return 'text-red-600';
        if (count <= 7) return 'text-yellow-600';
        return 'text-green-600';
    };

    return (
        <div className="p-8 max-w-md mx-auto">
            <div className={`text-6xl font-bold text-center mb-8 ${getColor()}`}>
                {count}
            </div>

            <div className="flex gap-4 mb-8">
                <button onClick={() => updateCount(count - 1)} className="flex-1 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600">Decrementar</button>
                <button onClick={() => updateCount(0)} className="flex-1 px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600">Reset</button>
                <button onClick={() => updateCount(count + 1)} className="flex-1 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600">Incrementar</button>
            </div>

            <div>
                <h2 className="text-lg font-bold mb-4">Histórico:</h2>
                <ul className="list-disc list-inside space-y-1">
                    {history.map((value, index) => <li key={index}>{value}</li>)}
                </ul>
            </div>
        </div>
    );
}
