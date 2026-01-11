import React, { useEffect, useState, useCallback } from 'react';

const MagicTrail = () => {
    const [sparkles, setSparkles] = useState([]);

    const addSparkle = useCallback((x, y) => {
        const id = Math.random().toString(36).substr(2, 9);
        const size = Math.random() * 15 + 10;
        const colors = ['#f472b6', '#fbbf24', '#22d3ee', '#ff00ff', '#ffffff'];
        const color = colors[Math.floor(Math.random() * colors.length)];

        const newSparkle = {
            id,
            x,
            y,
            size,
            color,
            rotation: Math.random() * 360,
        };

        setSparkles((prev) => [...prev.slice(-20), newSparkle]);

        setTimeout(() => {
            setSparkles((prev) => prev.filter((s) => s.id !== id));
        }, 1000);
    }, []);

    useEffect(() => {
        const handleMouseMove = (e) => {
            if (Math.random() > 0.8) {
                addSparkle(e.clientX, e.clientY);
            }
        };

        const handleTouchMove = (e) => {
            if (Math.random() > 0.8) {
                const touch = e.touches[0];
                addSparkle(touch.clientX, touch.clientY);
            }
        };

        window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('touchmove', handleTouchMove);

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('touchmove', handleTouchMove);
        };
    }, [addSparkle]);

    return (
        <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', pointerEvents: 'none', zIndex: 9999 }}>
            {sparkles.map((s) => (
                <div
                    key={s.id}
                    className="magic-sparkle"
                    style={{
                        position: 'absolute',
                        left: s.x,
                        top: s.y,
                        fontSize: s.size,
                        color: s.color,
                        transform: `translate(-50%, -50%) rotate(${s.rotation}deg)`,
                        textShadow: `0 0 10px ${s.color}`,
                    }}
                >
                    ✨
                </div>
            ))}
        </div>
    );
};

export default MagicTrail;
