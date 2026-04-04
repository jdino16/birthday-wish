import React, { useState } from 'react';

const loveReasons = [
  "The way you care for me 🤍",
  "You always prioritize me 💎",
  "You are so kind and gentle 🌸",
  "The way you make me laugh every day 😍",
  "You solve things after every argument 🫶",
  "You are attentive towards me ✨",
  "Your beautiful smile melts my heart 💕",
  "You understand me like no one else 🌟",
  "You make every moment magical 💫",
  "En uyirae, nee dhaan! 🫶"
];

const LoveJar = () => {
  const [revealed, setRevealed] = useState([]);
  const [activeCard, setActiveCard] = useState(null);

  const revealHeart = (index) => {
    if (!revealed.includes(index)) {
      setRevealed(prev => [...prev, index]);
    }
    setActiveCard(index);
    setTimeout(() => setActiveCard(null), 3000);
  };

  return (
    <div style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '2rem' }}>
      {/* Jar Image */}
      <div style={{ position: 'relative', display: 'inline-block' }}>
        <img
          src="/love_jar.png"
          alt="Love Jar"
          style={{
            width: 'clamp(180px, 45vw, 280px)',
            height: 'auto',
            filter: 'drop-shadow(0 10px 30px rgba(244,114,182,0.5))',
            animation: 'float-3d 5s ease-in-out infinite'
          }}
        />
        <p style={{
          position: 'absolute',
          bottom: '-10px',
          left: '50%',
          transform: 'translateX(-50%)',
          color: '#fbbf24',
          fontFamily: "'Dancing Script', cursive",
          fontSize: '1.1rem',
          whiteSpace: 'nowrap',
          textShadow: '0 0 10px rgba(251,191,36,0.8)'
        }}>
          Pick a heart! 💌
        </p>
      </div>

      {/* Heart Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(5, 1fr)',
        gap: '0.75rem',
        width: '100%',
        maxWidth: '380px',
        padding: '0 1rem'
      }}>
        {loveReasons.map((reason, i) => (
          <button
            key={i}
            onClick={() => revealHeart(i)}
            title={reason}
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              fontSize: 'clamp(2rem, 8vw, 2.8rem)',
              transition: 'transform 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
              filter: revealed.includes(i)
                ? 'drop-shadow(0 0 15px #f472b6)'
                : 'drop-shadow(0 2px 4px rgba(0,0,0,0.4))',
              transform: revealed.includes(i) ? 'scale(1.2)' : 'scale(1)',
              animation: revealed.includes(i) ? 'heartbeat-intense 1.2s infinite' : 'none'
            }}
          >
            {revealed.includes(i) ? '❤️' : '🤍'}
          </button>
        ))}
      </div>

      {/* Reveal Card */}
      {activeCard !== null && (
        <div
          className="glass-card fade-in"
          style={{
            background: 'linear-gradient(135deg, rgba(244,114,182,0.25), rgba(219,39,119,0.15))',
            border: '2px solid rgba(244,114,182,0.5)',
            borderRadius: '25px',
            padding: '1.2rem 2rem',
            maxWidth: '340px',
            width: '90%',
            textAlign: 'center',
            boxShadow: '0 0 30px rgba(244,114,182,0.3)'
          }}
        >
          <p style={{ fontSize: '1.1rem', fontWeight: '700', color: '#fff' }}>
            {loveReasons[activeCard]}
          </p>
        </div>
      )}

      <p style={{ color: '#94a3b8', fontSize: '0.9rem' }}>
        {revealed.length}/{loveReasons.length} hearts opened 💕
      </p>
    </div>
  );
};

export default LoveJar;
