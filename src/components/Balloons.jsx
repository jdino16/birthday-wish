import React, { useState, useEffect } from 'react';

const Balloons = () => {
    const [balloons, setBalloons] = useState([]);

    useEffect(() => {
        const colors = [
            'rgba(244, 114, 182, 0.6)',
            'rgba(168, 85, 247, 0.6)',
            'rgba(34, 211, 238, 0.6)',
            'rgba(251, 191, 36, 0.6)',
            'rgba(192, 38, 211, 0.6)'
        ];
        const newBalloons = Array.from({ length: 25 }).map((_, i) => ({
            id: i,
            color: colors[Math.floor(Math.random() * colors.length)],
            left: `${Math.random() * 100}%`,
            delay: `${Math.random() * 15}s`,
            duration: `${15 + Math.random() * 10}s`,
            size: `${40 + Math.random() * 30}px`,
            scale: 0.5 + Math.random() * 0.8
        }));
        setBalloons(newBalloons);
    }, []);

    return (
        <div style={{ position: 'absolute', width: '100%', height: '100%', overflow: 'hidden', top: 0, left: 0, pointerEvents: 'none' }}>
            {balloons.map(b => (
                <div
                    key={b.id}
                    className="balloon"
                    style={{
                        left: b.left,
                        backgroundColor: b.color,
                        width: b.size,
                        height: `calc(${b.size} * 1.3)`,
                        animationDelay: b.delay,
                        animationDuration: b.duration,
                        transform: `scale(${b.scale})`,
                        boxShadow: `inset -5px -5px 15px rgba(0,0,0,0.3), 0 0 20px ${b.color}`,
                        filter: `blur(${b.scale < 0.7 ? '2px' : '0px'})`,
                        zIndex: b.scale < 0.7 ? 1 : 3
                    }}
                />
            ))}
        </div>
    );
};

export default Balloons;
