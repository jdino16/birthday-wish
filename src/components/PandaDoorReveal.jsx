import React, { useState } from 'react';

const PandaDoorReveal = ({ onOpen, children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [pandaVisible, setPandaVisible] = useState(false);

  const handleClick = () => {
    if (isOpen) return;
    setPandaVisible(true);
    // Panda appears first, then doors open
    setTimeout(() => {
      setIsOpen(true);
    }, 800);
    // Callback after doors fully open
    setTimeout(() => {
      if (onOpen) onOpen();
    }, 2800);
  };

  return (
    <div style={{ position: 'relative', width: '100%', maxWidth: '420px', margin: '0 auto' }}>
      {/* Door Container */}
      <div
        onClick={handleClick}
        style={{
          position: 'relative',
          width: '100%',
          aspectRatio: '3/4',
          borderRadius: '30px',
          overflow: 'hidden',
          cursor: isOpen ? 'default' : 'pointer',
          boxShadow: '0 20px 60px rgba(0,0,0,0.5), 0 0 40px rgba(244,114,182,0.3)',
          border: '4px solid rgba(251,191,36,0.5)',
        }}
      >
        {/* Content Behind Doors */}
        <div style={{
          position: 'absolute',
          inset: 0,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          background: 'linear-gradient(135deg, #1e1b4b, #0f172a)',
          padding: '2rem',
          zIndex: 1
        }}>
          {children}
        </div>

        {/* Left Door */}
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '50%',
          height: '100%',
          background: 'linear-gradient(135deg, #f472b6, #db2777, #be185d)',
          zIndex: 10,
          transition: 'transform 1.8s cubic-bezier(0.77, 0, 0.175, 1)',
          transform: isOpen ? 'translateX(-100%) rotateY(-25deg)' : 'translateX(0)',
          transformOrigin: 'left center',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'flex-end',
          boxShadow: 'inset 0 0 40px rgba(0,0,0,0.3), 5px 0 15px rgba(0,0,0,0.3)',
          borderRight: '2px solid rgba(251,191,36,0.5)',
        }}>
          {/* Door Handle Left */}
          <div style={{
            width: '12px',
            height: '40px',
            background: 'linear-gradient(to bottom, #ffd700, #b8860b)',
            borderRadius: '6px',
            marginRight: '12px',
            boxShadow: '0 0 10px rgba(255,215,0,0.5)',
          }} />
          {/* Decorative Heart */}
          <div style={{
            position: 'absolute',
            top: '30%',
            left: '50%',
            transform: 'translateX(-50%)',
            fontSize: '2rem',
            opacity: 0.4,
            color: '#fff'
          }}>🤍</div>
        </div>

        {/* Right Door */}
        <div style={{
          position: 'absolute',
          top: 0,
          right: 0,
          width: '50%',
          height: '100%',
          background: 'linear-gradient(135deg, #be185d, #db2777, #f472b6)',
          zIndex: 10,
          transition: 'transform 1.8s cubic-bezier(0.77, 0, 0.175, 1)',
          transform: isOpen ? 'translateX(100%) rotateY(25deg)' : 'translateX(0)',
          transformOrigin: 'right center',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'flex-start',
          boxShadow: 'inset 0 0 40px rgba(0,0,0,0.3), -5px 0 15px rgba(0,0,0,0.3)',
          borderLeft: '2px solid rgba(251,191,36,0.5)',
        }}>
          {/* Door Handle Right */}
          <div style={{
            width: '12px',
            height: '40px',
            background: 'linear-gradient(to bottom, #ffd700, #b8860b)',
            borderRadius: '6px',
            marginLeft: '12px',
            boxShadow: '0 0 10px rgba(255,215,0,0.5)',
          }} />
          {/* Decorative Heart */}
          <div style={{
            position: 'absolute',
            top: '30%',
            left: '50%',
            transform: 'translateX(-50%)',
            fontSize: '2rem',
            opacity: 0.4,
            color: '#fff'
          }}>💕</div>
        </div>

        {/* "Tap to Open" text on doors */}
        {!isOpen && !pandaVisible && (
          <div style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            zIndex: 15,
            textAlign: 'center',
            pointerEvents: 'none'
          }}>
            <p style={{
              fontFamily: "'Dancing Script', cursive",
              fontSize: 'clamp(1.4rem, 5vw, 2rem)',
              color: '#ffd700',
              textShadow: '0 0 20px rgba(255,215,0,0.8), 0 2px 10px rgba(0,0,0,0.5)',
              animation: 'glow-pulse 2s infinite',
              letterSpacing: '2px'
            }}>
              Tap to Open ✨
            </p>
            <div style={{ fontSize: '2.5rem', marginTop: '0.5rem', animation: 'heartbeat-intense 1.2s infinite' }}>
              🎁
            </div>
          </div>
        )}

        {/* Gold frame border on doors */}
        {!isOpen && (
          <div style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '2px',
            height: '100%',
            background: 'linear-gradient(to bottom, transparent, #ffd700, transparent)',
            zIndex: 12,
            boxShadow: '0 0 10px rgba(255,215,0,0.5)',
          }} />
        )}
      </div>

      {/* Panda Bear - appears when clicked */}
      {pandaVisible && (
        <div style={{
          position: 'absolute',
          bottom: '-30px',
          left: '50%',
          transform: 'translateX(-50%)',
          zIndex: 20,
          animation: 'panda-pop 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards',
        }}>
          <img
            src="/cute_panda.png"
            alt="Panda"
            style={{
              width: 'clamp(100px, 30vw, 160px)',
              height: 'auto',
              filter: 'drop-shadow(0 10px 25px rgba(0,0,0,0.5))',
            }}
          />
        </div>
      )}

      {/* Sparkles when opening */}
      {isOpen && (
        <>
          {[...Array(8)].map((_, i) => (
            <div key={i} style={{
              position: 'absolute',
              top: `${20 + Math.random() * 60}%`,
              left: `${10 + Math.random() * 80}%`,
              fontSize: '1.5rem',
              animation: `sparkle-burst 1.5s ease-out ${i * 0.1}s forwards`,
              opacity: 0,
              zIndex: 25,
              pointerEvents: 'none'
            }}>
              {['✨', '💕', '🌟', '💖', '⭐', '🤍', '💫', '🎉'][i]}
            </div>
          ))}
        </>
      )}
    </div>
  );
};

export default PandaDoorReveal;
