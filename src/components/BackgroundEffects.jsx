import React, { useState, useEffect } from 'react';

const BackgroundEffects = () => {
    const [elements, setElements] = useState([]);

    useEffect(() => {
        const emojis = ['✨', '💫', '🌟', '💎', '🌸', '🍭', '💖', '⭐', '❄️', '🎈', '🍬'];
        const newElements = Array.from({ length: 45 }).map((_, i) => ({
            id: i,
            emoji: emojis[Math.floor(Math.random() * emojis.length)],
            left: `${Math.random() * 100}%`,
            delay: `${Math.random() * 20}s`,
            duration: `${12 + Math.random() * 20}s`,
            size: `${10 + Math.random() * 30}px`,
            opacity: 0.2 + Math.random() * 0.6,
            rotation: `${Math.random() * 360}deg`,
        }));
        setElements(newElements);
    }, []);

    return (
        <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', pointerEvents: 'none', zIndex: 0, overflow: 'hidden' }}>
            {elements.map((el) => (
                <div
                    key={el.id}
                    className="floating-element float-3d"
                    style={{
                        left: el.left,
                        animationDelay: el.delay,
                        animationDuration: el.duration,
                        fontSize: el.size,
                        opacity: el.opacity,
                        transform: `rotate(${el.rotation})`,
                        filter: `blur(${Math.random() * 2}px)`
                    }}
                >
                    {el.emoji}
                </div>
            ))}

            {/* Ambient Glows */}
            <div style={{
                position: 'absolute',
                top: '20%',
                left: '10%',
                width: '300px',
                height: '300px',
                background: 'rgba(255, 20, 147, 0.1)',
                filter: 'blur(100px)',
                borderRadius: '50%',
                animation: 'pulse 10s infinite'
            }}></div>
            <div style={{
                position: 'absolute',
                bottom: '20%',
                right: '10%',
                width: '400px',
                height: '400px',
                background: 'rgba(0, 229, 255, 0.1)',
                filter: 'blur(120px)',
                borderRadius: '50%',
                animation: 'pulse 12s infinite'
            }}></div>
        </div>
    );
};

export default BackgroundEffects;
