import React, { useState } from 'react';

const BirthdayLetter = () => {
  const [opened, setOpened] = useState(false);

  return (
    <div style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '2rem' }}>
      {/* Sealed Envelope */}
      {!opened && (
        <div
          onClick={() => setOpened(true)}
          style={{
            position: 'relative',
            cursor: 'pointer',
            display: 'inline-block',
          }}
          className="bounce-in"
        >
          <img
            src="/envelope_wax_seal.png"
            alt="Sealed Letter"
            style={{
              width: 'clamp(220px, 60vw, 360px)',
              height: 'auto',
              filter: 'drop-shadow(0 20px 50px rgba(219,39,119,0.5))',
              animation: 'float-3d 4s ease-in-out infinite',
              borderRadius: '20px'
            }}
          />
          <div style={{
            position: 'absolute',
            bottom: '-15px',
            left: '50%',
            transform: 'translateX(-50%)',
            background: 'linear-gradient(135deg, #dc2626, #991b1b)',
            borderRadius: '50px',
            padding: '0.5rem 1.5rem',
            color: '#fff',
            fontSize: '1rem',
            fontWeight: '800',
            whiteSpace: 'nowrap',
            boxShadow: '0 8px 20px rgba(220,38,38,0.5)',
            animation: 'heartbeat-intense 1.5s infinite',
            letterSpacing: '1px'
          }}>
            ✉️ Open Me 💌
          </div>
        </div>
      )}

      {/* Letter Content */}
      {opened && (
        <div
          className="fade-in"
          style={{
            maxWidth: '580px',
            width: '95%',
            position: 'relative',
          }}
        >
          {/* Letter Paper */}
          <div style={{
            background: 'linear-gradient(135deg, #fdf2f8, #fce7f3, #fbcfe8)',
            borderRadius: '25px',
            padding: 'clamp(1.5rem, 5vw, 2.5rem)',
            boxShadow: '0 30px 60px rgba(0,0,0,0.3), 0 0 60px rgba(244,114,182,0.2)',
            position: 'relative',
            overflow: 'hidden',
            border: '2px solid rgba(244,114,182,0.3)'
          }}>
            {/* Decorative heart corner */}
            <div style={{ position: 'absolute', top: '10px', right: '15px', fontSize: '2rem', opacity: 0.4 }}>💕</div>

            {/* Title */}
            <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
              <h2 style={{
                fontFamily: "'Dancing Script', cursive",
                fontSize: 'clamp(2rem, 7vw, 3rem)',
                color: '#be185d',
                textShadow: '0 2px 10px rgba(190,24,93,0.3)',
                margin: 0
              }}>
                Happy Birthday 💕
              </h2>
            </div>

            {/* Couple Image */}
            <div style={{
              float: 'right',
              marginLeft: '1rem',
              marginBottom: '0.5rem',
              borderRadius: '20px',
              overflow: 'hidden',
              width: 'clamp(120px, 35vw, 180px)',
              boxShadow: '0 10px 25px rgba(0,0,0,0.3)',
              border: '3px solid rgba(244,114,182,0.4)',
              transform: 'rotate(3deg)'
            }}>
              <img
                src="/romantic_couple.png"
                alt="Us"
                style={{ width: '100%', height: 'auto', display: 'block' }}
              />
            </div>

            {/* Letter Text */}
            <div style={{
              color: '#1e293b',
              fontSize: 'clamp(0.9rem, 3.5vw, 1.1rem)',
              lineHeight: '1.8',
              fontWeight: '500',
              textAlign: 'left'
            }}>
              <p style={{ marginBottom: '0.6rem' }}>Happy Birthday to the King of my heart ❤️</p>
              <p style={{ marginBottom: '0.6rem' }}>The man of my dreams</p>
              <p style={{ marginBottom: '0.6rem' }}>And the love of my life ❤️</p>
              <p style={{ marginBottom: '0.6rem' }}>I love you so much baby 😘</p>
              <p style={{ marginBottom: '0.6rem' }}>You mean the world 🌍 to me bby...</p>
              <p style={{ marginBottom: '0.6rem' }}>I can't imagine my life without you..</p>
              <p style={{ marginBottom: '0.6rem' }}>I feel I'm the luckiest girl to have</p>
              <p style={{ marginBottom: '0.6rem' }}>You in my life 🥰😍</p>
              <p style={{ marginBottom: '0.6rem' }}>Thankyou for always being there.. 🤍</p>
            </div>

            {/* Signature */}
            <div style={{ clear: 'both', textAlign: 'right', marginTop: '1rem' }}>
              <p style={{
                fontFamily: "'Dancing Script', cursive",
                fontSize: 'clamp(1.3rem, 5vw, 1.8rem)',
                color: '#be185d',
                textShadow: '0 0 10px rgba(190,24,93,0.3)'
              }}>
                Forever yours 🤍✨
              </p>
            </div>

            {/* Decorative bottom */}
            <div style={{ position: 'absolute', bottom: '10px', left: '15px', fontSize: '1.5rem', opacity: 0.3 }}>🌸✨</div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BirthdayLetter;
