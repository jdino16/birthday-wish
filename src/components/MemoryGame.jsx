import React, { useState, useEffect, useCallback } from 'react';

const EMOJIS = ['🎁', '🎂', '💎', '🌸', '🎈', '🤍'];
const ALL_CARDS = [...EMOJIS, ...EMOJIS];

const shuffle = (arr) => {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a.map((emoji, index) => ({ id: index, emoji, flipped: false, matched: false }));
};

const MemoryGame = ({ onWin }) => {
  const [cards, setCards] = useState(() => shuffle(ALL_CARDS));
  const [selected, setSelected] = useState([]);
  const [moves, setMoves] = useState(0);
  const [time, setTime] = useState(30);
  const [gameOver, setGameOver] = useState(false);
  const [won, setWon] = useState(false);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    if (!started || gameOver || won) return;
    const t = setInterval(() => {
      setTime(prev => {
        if (prev <= 1) {
          clearInterval(t);
          setGameOver(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(t);
  }, [started, gameOver, won]);

  const handleFlip = useCallback((card) => {
    if (!started) setStarted(true);
    if (card.flipped || card.matched || selected.length === 2 || gameOver) return;

    const newCards = cards.map(c => c.id === card.id ? { ...c, flipped: true } : c);
    const newSelected = [...selected, { ...card, flipped: true }];
    setCards(newCards);
    setSelected(newSelected);

    if (newSelected.length === 2) {
      setMoves(m => m + 1);
      if (newSelected[0].emoji === newSelected[1].emoji) {
        const matched = newCards.map(c =>
          c.emoji === newSelected[0].emoji ? { ...c, matched: true } : c
        );
        setCards(matched);
        setSelected([]);
        if (matched.every(c => c.matched)) {
          setWon(true);
          if (onWin) onWin();
        }
      } else {
        setTimeout(() => {
          setCards(prev => prev.map(c =>
            newSelected.find(s => s.id === c.id) ? { ...c, flipped: false } : c
          ));
          setSelected([]);
        }, 900);
      }
    }
  }, [cards, selected, started, gameOver, onWin]);

  const restart = () => {
    setCards(shuffle(ALL_CARDS));
    setSelected([]);
    setMoves(0);
    setTime(30);
    setGameOver(false);
    setWon(false);
    setStarted(false);
  };

  return (
    <div style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1.2rem' }}>
      {/* Stats Bar */}
      <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
        <div style={{
          background: 'rgba(255,255,255,0.1)',
          borderRadius: '50px',
          padding: '0.4rem 1rem',
          display: 'flex', alignItems: 'center', gap: '0.4rem',
          border: '1px solid rgba(255,255,255,0.15)'
        }}>
          <span style={{ fontSize: '1.1rem' }}>⏱️</span>
          <span style={{
            color: time <= 10 ? '#f87171' : '#fbbf24',
            fontWeight: '800', fontSize: '1rem',
            animation: time <= 10 ? 'heartbeat-intense 0.5s infinite' : 'none'
          }}>{time}s</span>
        </div>
        <div style={{
          background: 'rgba(255,255,255,0.1)',
          borderRadius: '50px',
          padding: '0.4rem 1rem',
          display: 'flex', alignItems: 'center', gap: '0.4rem',
          border: '1px solid rgba(255,255,255,0.15)'
        }}>
          <span style={{ fontSize: '1.1rem' }}>🎯</span>
          <span style={{ color: '#22d3ee', fontWeight: '800', fontSize: '1rem' }}>{moves} moves</span>
        </div>
      </div>

      {/* Card Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(4, 1fr)',
        gap: '0.6rem',
        width: '100%',
        maxWidth: '320px',
        perspective: '600px'
      }}>
        {cards.map(card => (
          <div
            key={card.id}
            onClick={() => handleFlip(card)}
            style={{
              width: '100%',
              aspectRatio: '1',
              borderRadius: '14px',
              cursor: card.matched || card.flipped ? 'default' : 'pointer',
              position: 'relative',
              transformStyle: 'preserve-3d',
              transition: 'transform 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
              transform: (card.flipped || card.matched) ? 'rotateY(180deg)' : 'rotateY(0deg)',
              boxShadow: card.matched
                ? '0 0 20px rgba(244,114,182,0.7)'
                : '0 4px 12px rgba(0,0,0,0.3)',
            }}
          >
            {/* Back face */}
            <div style={{
              position: 'absolute', inset: 0,
              backfaceVisibility: 'hidden',
              WebkitBackfaceVisibility: 'hidden',
              borderRadius: '14px',
              background: 'linear-gradient(135deg, #3b1f7a, #1e1b4b)',
              border: '2px solid rgba(147,112,219,0.4)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: '1.4rem'
            }}>🎁</div>
            {/* Front face */}
            <div style={{
              position: 'absolute', inset: 0,
              backfaceVisibility: 'hidden',
              WebkitBackfaceVisibility: 'hidden',
              transform: 'rotateY(180deg)',
              borderRadius: '14px',
              background: card.matched
                ? 'linear-gradient(135deg, rgba(244,114,182,0.35), rgba(219,39,119,0.25))'
                : 'linear-gradient(135deg, rgba(30,27,75,0.9), rgba(59,31,122,0.9))',
              border: card.matched ? '2px solid #f472b6' : '2px solid rgba(255,255,255,0.15)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: 'clamp(1.4rem, 6vw, 2rem)'
            }}>
              {card.emoji}
            </div>
          </div>
        ))}
      </div>

      {/* Game Result */}
      {(won || gameOver) && (
        <div className="fade-in glass-card" style={{
          background: won
            ? 'linear-gradient(135deg, rgba(244,114,182,0.2), rgba(251,191,36,0.2))'
            : 'linear-gradient(135deg, rgba(239,68,68,0.2), rgba(127,29,29,0.2))',
          borderRadius: '25px',
          padding: '1.5rem 2rem',
          textAlign: 'center',
          border: `2px solid ${won ? 'rgba(251,191,36,0.5)' : 'rgba(239,68,68,0.4)'}`,
          maxWidth: '300px', width: '90%'
        }}>
          <p style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>{won ? '🎉' : '💔'}</p>
          <p style={{ color: '#fff', fontWeight: '800', fontSize: '1.1rem', marginBottom: '0.5rem' }}>
            {won ? `You Won in ${moves} moves! 🎊` : 'Time\'s up! Try again! 😅'}
          </p>
          <button className="btn-primary" onClick={restart} style={{ marginTop: '0.5rem', padding: '0.6rem 1.5rem', fontSize: '0.95rem' }}>
            Restart 🔄
          </button>
        </div>
      )}

      {!started && !won && !gameOver && (
        <p style={{ color: '#94a3b8', fontSize: '0.9rem' }}>
          Tap any card to start! ✨
        </p>
      )}
    </div>
  );
};

export default MemoryGame;
