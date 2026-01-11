import React, { useEffect, useState } from 'react';

const Starfield = () => {
    const [stars, setStars] = useState([]);

    useEffect(() => {
        const generateStars = () => {
            const newStars = Array.from({ length: 100 }).map((_, i) => ({
                id: i,
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                size: Math.random() * 3 + 1,
                delay: `${Math.random() * 5}s`,
                duration: `${3 + Math.random() * 4}s`,
                opacity: Math.random() * 0.7 + 0.3,
            }));
            setStars(newStars);
        };

        generateStars();
    }, []);

    return (
        <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', pointerEvents: 'none', zIndex: -1, background: 'transparent' }}>
            {stars.map((star) => (
                <div
                    key={star.id}
                    className="star"
                    style={{
                        position: 'absolute',
                        top: star.top,
                        left: star.left,
                        width: `${star.size}px`,
                        height: `${star.size}px`,
                        backgroundColor: '#ffffff',
                        borderRadius: '50%',
                        opacity: star.opacity,
                        boxShadow: '0 0 10px #ffffff',
                        animation: `twinkle ${star.duration} infinite ease-in-out`,
                        animationDelay: star.delay,
                    }}
                />
            ))}
            <style>{`
        @keyframes twinkle {
          0%, 100% { opacity: 0.3; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.2); }
        }
      `}</style>
        </div>
    );
};

export default Starfield;
