import React, { useEffect, useState } from 'react';

const Starfield = () => {
    const [stars, setStars] = useState([]);
    const [shootingStars, setShootingStars] = useState([]);

    useEffect(() => {
        const generateStars = () => {
            const newStars = Array.from({ length: 150 }).map((_, i) => ({
                id: i,
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                size: Math.random() * 2 + 1,
                delay: `${Math.random() * 5}s`,
                duration: `${3 + Math.random() * 4}s`,
                opacity: Math.random() * 0.7 + 0.3,
            }));
            setStars(newStars);
        };

        generateStars();

        const spawnShootingStar = () => {
            const id = Math.random().toString(36).substr(2, 9);
            const top = Math.random() * 50;
            const left = Math.random() * 80 + 10;
            const duration = 1500 + Math.random() * 1500;

            setShootingStars(prev => [...prev, { id, top, left, duration }]);

            setTimeout(() => {
                setShootingStars(prev => prev.filter(s => s.id !== id));
            }, duration);
        };

        const interval = setInterval(() => {
            if (Math.random() > 0.4) spawnShootingStar();
        }, 4000);

        return () => clearInterval(interval);
    }, []);

    return (
        <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', pointerEvents: 'none', zIndex: -1, background: 'transparent', overflow: 'hidden' }}>
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
                        boxShadow: `0 0 ${star.size * 2}px #ffffff`,
                        animation: `twinkle ${star.duration} infinite ease-in-out`,
                        animationDelay: star.delay,
                    }}
                />
            ))}
            {shootingStars.map(s => (
                <div key={s.id} className="shooting-star" style={{
                    position: 'absolute',
                    top: `${s.top}%`,
                    left: `${s.left}%`,
                    animationDuration: `${s.duration}ms`
                }} />
            ))}
            <style>{`
        @keyframes twinkle {
          0%, 100% { opacity: 0.3; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.2); }
        }
        .shooting-star {
            width: 2px;
            height: 2px;
            background: linear-gradient(90deg, rgba(255,255,255,1) 0%, rgba(255,255,255,0) 100%);
            box-shadow: 0 0 10px #fff, 0 0 20px #fff;
            border-radius: 50%;
            animation: shoot linear forwards;
        }
        @keyframes shoot {
            0% { transform: translateX(0) translateY(0) rotate(-45deg) scaleX(0); opacity: 1; }
            30% { transform: translateX(30vw) translateY(30vh) rotate(-45deg) scaleX(100); opacity: 1; }
            100% { transform: translateX(100vw) translateY(100vh) rotate(-45deg) scaleX(200); opacity: 0; }
        }
      `}</style>
        </div>
    );
};

export default Starfield;
