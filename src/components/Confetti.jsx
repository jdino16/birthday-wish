import React, { useEffect, useState } from 'react';

const Confetti = () => {
    const [pieces, setPieces] = useState([]);

    useEffect(() => {
        const colors = ['#ff75c3', '#ffa647', '#ff00ff', '#00ffff', '#ffd700', '#ffffff'];
        const newPieces = Array.from({ length: 50 }).map((_, i) => ({
            id: i,
            color: colors[Math.floor(Math.random() * colors.length)],
            left: `${Math.random() * 100}%`,
            delay: `${Math.random() * 3}s`,
            duration: `${3 + Math.random() * 4}s`,
            size: `${8 + Math.random() * 10}px`,
            rotate: `${Math.random() * 360}deg`
        }));
        setPieces(newPieces);
    }, []);

    return (
        <div style={{ position: 'absolute', width: '100%', height: '100%', overflow: 'hidden', top: 0, left: 0, pointerEvents: 'none' }}>
            {pieces.map(p => (
                <div
                    key={p.id}
                    style={{
                        position: 'absolute',
                        top: '-20px',
                        left: p.left,
                        width: p.size,
                        height: p.size,
                        backgroundColor: p.color,
                        borderRadius: Math.random() > 0.5 ? '50%' : '2px',
                        animation: `fall ${p.duration} linear ${p.delay} infinite`,
                        transform: `rotate(${p.rotate})`
                    }}
                />
            ))}
            <style>{`
        @keyframes fall {
          0% { transform: translateY(0) rotate(0deg); opacity: 1; }
          100% { transform: translateY(100vh) rotate(720deg); opacity: 0; }
        }
      `}</style>
        </div>
    );
};

export default Confetti;
