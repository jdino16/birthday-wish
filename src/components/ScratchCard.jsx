import React, { useState, useRef, useEffect } from 'react';

const ScratchCard = ({ message, onComplete }) => {
    const canvasRef = useRef(null);
    const [isScratched, setIsScratched] = useState(false);

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');

        // Create a luxury golden gradient for the scratch layer
        const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
        gradient.addColorStop(0, '#BF953F');
        gradient.addColorStop(0.25, '#FCF6BA');
        gradient.addColorStop(0.5, '#B38728');
        gradient.addColorStop(0.75, '#FBF5B7');
        gradient.addColorStop(1, '#AA771C');

        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // Add some noise/sparkles to the gold
        for (let i = 0; i < 500; i++) {
            ctx.fillStyle = `rgba(255, 255, 255, ${Math.random() * 0.3})`;
            ctx.fillRect(Math.random() * canvas.width, Math.random() * canvas.height, 1, 1);
        }

        // Add premium text
        ctx.fillStyle = '#5d4037';
        ctx.font = 'bold 24px "Dancing Script", cursive';
        ctx.textAlign = 'center';
        ctx.fillText('Scratch for a Secret! ✨', canvas.width / 2, canvas.height / 2 + 10);
    }, []);

    const scratch = (e) => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        const rect = canvas.getBoundingClientRect();

        // Support both mouse and touch
        const clientX = e.clientX || (e.touches && e.touches[0].clientX);
        const clientY = e.clientY || (e.touches && e.touches[0].clientY);

        if (!clientX || !clientY) return;

        const x = clientX - rect.left;
        const y = clientY - rect.top;

        ctx.globalCompositeOperation = 'destination-out';
        ctx.beginPath();
        ctx.arc(x, y, 25, 0, Math.PI * 2);
        ctx.fill();

        // Reveal effect trigger
        if (!isScratched) {
            setIsScratched(true);
            setTimeout(onComplete, 4000);
        }
    };

    return (
        <div style={{ position: 'relative', width: '320px', height: '180px', margin: '30px auto', borderRadius: '20px', overflow: 'hidden', boxShadow: '0 0 30px rgba(0,0,0,0.5)' }}>
            <div className="glass-card" style={{
                position: 'absolute',
                width: '100%',
                height: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '2rem',
                textAlign: 'center',
                fontSize: '1.4rem',
                fontWeight: '800',
                color: '#fff',
                textShadow: '0 0 10px var(--neon-pink)',
                border: '2px solid var(--neon-gold)',
                background: 'rgba(255, 255, 255, 0.05)'
            }}>
                {message}
            </div>
            <canvas
                ref={canvasRef}
                width={320}
                height={180}
                onMouseMove={scratch}
                onTouchMove={scratch}
                style={{ position: 'absolute', top: 0, left: 0, cursor: 'pointer', transition: 'opacity 1s ease' }}
            />
        </div>
    );
};

export default ScratchCard;
