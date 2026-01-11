import React, { useState, useEffect } from 'react';

const BackgroundEffects = () => {
    const [elements, setElements] = useState([]);
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

    useEffect(() => {
        const emojis = ['🤍', '💎', '🫶', '✨', '💫', '🌟', '⭐', '❄️', '🎈', '🍬', '🥂', '🎭', '🎡', '🍭'];
        const newElements = Array.from({ length: 50 }).map((_, i) => ({
            id: i,
            emoji: emojis[Math.floor(Math.random() * emojis.length)],
            left: `${Math.random() * 100}%`,
            delay: `${Math.random() * 20}s`,
            duration: `${15 + Math.random() * 25}s`,
            size: `${12 + Math.random() * 35}px`,
            opacity: 0.15 + Math.random() * 0.5,
            rotation: `${Math.random() * 360}deg`,
        }));
        setElements(newElements);

        const handleMouseMove = (e) => {
            setMousePos({ x: e.clientX, y: e.clientY });
        };
        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

    const parallaxStyle = (factor) => ({
        transform: `translate(${mousePos.x * factor}px, ${mousePos.y * factor}px)`,
        transition: 'transform 0.2s ease-out'
    });

    return (
        <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', pointerEvents: 'none', zIndex: 0, overflow: 'hidden' }}>
            {/* Parallax Layer 1: Far (Small Orbs) */}
            <div style={{ position: 'absolute', width: '100%', height: '100%', ...parallaxStyle(-0.02) }}>
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
                            filter: `blur(${Math.random() * 1}px)`
                        }}
                    >
                        {el.emoji}
                    </div>
                ))}
            </div>

            {/* Parallax Layer 2: Middle (Nebula Clouds) */}
            <div style={{ position: 'absolute', width: '100%', height: '100%', ...parallaxStyle(0.04) }}>
                <div style={{
                    position: 'absolute',
                    top: '15%',
                    left: '15%',
                    width: '500px',
                    height: '500px',
                    background: 'radial-gradient(circle, rgba(255, 0, 255, 0.08) 0%, transparent 70%)',
                    filter: 'blur(100px)',
                    borderRadius: '50%',
                    animation: 'pulse 15s infinite ease-in-out'
                }}></div>
                <div style={{
                    position: 'absolute',
                    bottom: '10%',
                    right: '20%',
                    width: '600px',
                    height: '600px',
                    background: 'radial-gradient(circle, rgba(0, 255, 255, 0.08) 0%, transparent 70%)',
                    filter: 'blur(120px)',
                    borderRadius: '50%',
                    animation: 'pulse 18s infinite ease-in-out'
                }}></div>
            </div>

            {/* Parallax Layer 3: Near (Soft Glow Grains) */}
            <div style={{ position: 'absolute', width: '100%', height: '100%', ...parallaxStyle(0.08) }}>
                <div style={{
                    position: 'absolute',
                    top: '50%',
                    right: '5%',
                    width: '300px',
                    height: '300px',
                    background: 'radial-gradient(circle, rgba(251, 191, 36, 0.06) 0%, transparent 70%)',
                    filter: 'blur(80px)',
                    borderRadius: '50%',
                    animation: 'pulse 12s infinite linear'
                }}></div>
            </div>
        </div>
    );
};

export default BackgroundEffects;
