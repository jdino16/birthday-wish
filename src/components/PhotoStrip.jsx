import React, { useState } from 'react';

const memories = [
  { label: "Our First Smile 🌸", color: "#f472b6" },
  { label: "Magical Moments ✨", color: "#fbbf24" },
  { label: "Late Night Talks 🌙", color: "#22d3ee" },
  { label: "Heart to Heart 🫶", color: "#a78bfa" },
];

const PhotoStrip = () => {
  const [activeMemory, setActiveMemory] = useState(null);

  return (
    <div style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '2rem' }}>
      {/* Film Strip Image */}
      <div style={{ position: 'relative', width: '100%', maxWidth: '420px' }}>
        <div style={{
          background: 'linear-gradient(135deg, rgba(15,23,42,0.95), rgba(30,27,75,0.95))',
          borderRadius: '20px',
          padding: '1.5rem 1rem',
          border: '3px solid rgba(251,191,36,0.4)',
          boxShadow: '0 20px 50px rgba(0,0,0,0.5), 0 0 30px rgba(251,191,36,0.15)',
          position: 'relative',
          overflow: 'hidden'
        }}>
          {/* Film perforations top */}
          <div style={{ display: 'flex', gap: '8px', marginBottom: '0.8rem', justifyContent: 'center' }}>
            {Array.from({ length: 10 }).map((_, i) => (
              <div key={i} style={{
                width: '12px', height: '8px', background: 'rgba(251,191,36,0.3)',
                borderRadius: '2px', border: '1px solid rgba(251,191,36,0.5)'
              }} />
            ))}
          </div>

          {/* Photo Strip Main Image */}
          <div style={{ borderRadius: '12px', overflow: 'hidden', position: 'relative' }}>
            <img
              src="/couple_photo_strip.png"
              alt="Our Memories"
              style={{
                width: '100%',
                height: 'auto',
                display: 'block',
                filter: 'sepia(0.15) contrast(1.05)',
              }}
            />
            <div style={{
              position: 'absolute',
              inset: 0,
              background: 'linear-gradient(to bottom, transparent 60%, rgba(15,23,42,0.8) 100%)',
              pointerEvents: 'none'
            }} />
          </div>

          {/* Film perforations bottom */}
          <div style={{ display: 'flex', gap: '8px', marginTop: '0.8rem', justifyContent: 'center' }}>
            {Array.from({ length: 10 }).map((_, i) => (
              <div key={i} style={{
                width: '12px', height: '8px', background: 'rgba(251,191,36,0.3)',
                borderRadius: '2px', border: '1px solid rgba(251,191,36,0.5)'
              }} />
            ))}
          </div>

          {/* Decorative shimmer overlay */}
          <div style={{
            position: 'absolute',
            top: 0, left: '-100%',
            width: '60%', height: '100%',
            background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.05), transparent)',
            animation: 'shimmer-sweep 4s ease infinite',
            pointerEvents: 'none'
          }} />
        </div>
      </div>

      {/* Memory Labels */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(2, 1fr)',
        gap: '0.8rem',
        width: '100%',
        maxWidth: '400px',
        padding: '0 0.5rem'
      }}>
        {memories.map((mem, i) => (
          <button
            key={i}
            onClick={() => setActiveMemory(activeMemory === i ? null : i)}
            className="glass-card"
            style={{
              background: activeMemory === i
                ? `linear-gradient(135deg, ${mem.color}33, ${mem.color}22)`
                : 'rgba(255,255,255,0.06)',
              border: `2px solid ${activeMemory === i ? mem.color : 'rgba(255,255,255,0.1)'}`,
              borderRadius: '18px',
              padding: '0.8rem',
              cursor: 'pointer',
              color: '#fff',
              fontWeight: '700',
              fontSize: 'clamp(0.8rem, 3vw, 0.95rem)',
              width: '100%',
              textAlign: 'center',
              transition: 'all 0.3s ease',
              boxShadow: activeMemory === i ? `0 0 20px ${mem.color}55` : 'none',
              transform: activeMemory === i ? 'scale(1.03)' : 'scale(1)'
            }}
          >
            {mem.label}
          </button>
        ))}
      </div>

      {/* Couple Sunset Reveal */}
      <div style={{
        width: '100%',
        maxWidth: '420px',
        borderRadius: '25px',
        overflow: 'hidden',
        position: 'relative',
        boxShadow: '0 20px 50px rgba(244,114,182,0.3)',
        border: '2px solid rgba(244,114,182,0.3)'
      }}>
        <img
          src="/couple_sunset.png"
          alt="Couple Sunset"
          style={{ width: '100%', height: 'auto', display: 'block' }}
        />
        <div style={{
          position: 'absolute',
          bottom: 0,
          left: 0, right: 0,
          background: 'linear-gradient(to top, rgba(0,0,0,0.85) 0%, transparent 100%)',
          padding: '2rem 1.5rem 1.2rem',
          textAlign: 'center'
        }}>
          <p style={{
            fontFamily: "'Dancing Script', cursive",
            fontSize: 'clamp(1.3rem, 5vw, 1.8rem)',
            color: '#fbbf24',
            textShadow: '0 0 20px rgba(251,191,36,0.8)',
            margin: 0
          }}>
            Every sunset is better with you 🌅
          </p>
        </div>
      </div>
    </div>
  );
};

export default PhotoStrip;
