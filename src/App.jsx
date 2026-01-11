import React, { useState, useEffect } from 'react';
import BackgroundEffects from './components/BackgroundEffects';
import Confetti from './components/Confetti';
import MusicPlayer from './components/MusicPlayer';
import MagicTrail from './components/MagicTrail';
import Starfield from './components/Starfield';
import VirtualCake from './components/VirtualCake';
import CurtainReveal from './components/CurtainReveal';
import ScratchCard from './components/ScratchCard';
import Balloons from './components/Balloons';

const App = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [canStart, setCanStart] = useState(false);
    const [sparkles, setSparkles] = useState([]);
    const [proposalHearts, setProposalHearts] = useState([]);
    const [noBtnPos, setNoBtnPos] = useState({ x: 0, y: 0 });
    const [showFinalSecret, setShowFinalSecret] = useState(false);

    const nextStep = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
        setCurrentPage(prev => prev + 1);
    };
    const reset = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
        setCurrentPage(1);
        setCanStart(false);
        setSparkles([]);
        setProposalHearts([]);
        setShowFinalSecret(false);
    };

    const addSparkle = (e) => {
        const newSparkle = {
            id: Date.now(),
            x: e.clientX,
            y: e.clientY,
        };
        setSparkles(prev => [...prev, newSparkle]);
        setTimeout(() => {
            setSparkles(prev => prev.filter(s => s.id !== newSparkle.id));
        }, 1000);
    };

    useEffect(() => {
        if (currentPage === 3) {
            const interval = setInterval(() => {
                const newHeart = {
                    id: Date.now(),
                    left: `${Math.random() * 90}%`,
                    emoji: ['🤍', '💎', '🫶', '✨', '💿'][Math.floor(Math.random() * 5)]
                };
                setProposalHearts(prev => [...prev, newHeart]);
                setTimeout(() => {
                    setProposalHearts(prev => prev.filter(h => h.id !== newHeart.id));
                }, 4000);
            }, 600);
            return () => clearInterval(interval);
        }
    }, [currentPage]);

    const moveNoButton = () => {
        const x = Math.random() * 160 - 80;
        const y = Math.random() * 100 - 50;
        setNoBtnPos({ x, y });
    };

    const PageIcon = ({ icon, color }) => (
        <span style={{ fontSize: '1.8rem', marginRight: '0.8rem', color: color || 'inherit', display: 'inline-block' }} className="pulse heartbeat-intense">
            {icon}
        </span>
    );

    return (
        <div onClick={addSparkle} style={{ width: '100%', minHeight: '100dvh', position: 'relative' }}>
            <Starfield />
            <MagicTrail />
            <BackgroundEffects />
            <Balloons />
            <MusicPlayer />
            {currentPage === 4 && <Confetti />}

            {sparkles.map(s => (
                <div key={s.id} className="fade-in" style={{
                    position: 'fixed',
                    left: s.x,
                    top: s.y,
                    pointerEvents: 'none',
                    fontSize: '1.5rem',
                    zIndex: 100,
                    animation: 'float 1s ease-out forwards'
                }}>✨</div>
            ))}

            <div className="page-container">
                {/* Page 1: Welcome */}
                {currentPage === 1 && (
                    <div className="fade-in" style={{ zIndex: 20 }}>
                        <h1 className="neon-text-pink shimmer-text glow-pulse wobble" style={{ fontFamily: "'Dancing Script', cursive", fontSize: 'clamp(2.5rem, 8vw, 4rem)', marginBottom: '0.5rem', lineHeight: 1 }}>
                            Happy Birthday Lavan!
                        </h1>
                        <div className="pulse heartbeat-intense" style={{ fontSize: '3rem', marginBottom: '1.5rem' }}>🎉🤍</div>

                        {!canStart ? (
                            <div className="fade-in glass-card bounce-in" style={{ width: '90%', maxWidth: '480px', padding: '2.5rem', borderRadius: '40px', margin: '0 auto', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                <p style={{ marginBottom: '1.5rem', color: '#fff', fontSize: '1.2rem', fontWeight: '600', letterSpacing: '0.5px' }}>
                                    Make a wish and blow out the candles! 🎂✨
                                </p>
                                <div className="bounce-in">
                                    <VirtualCake onAllOut={() => setCanStart(true)} />
                                </div>
                            </div>
                        ) : (
                            <div className="fade-in">
                                <p className="neon-text-gold pulse heartbeat-intense" style={{ fontSize: '2rem', color: '#fff', marginBottom: '2.5rem', fontWeight: '600' }}>
                                    Your wish is coming true... ✨
                                </p>
                                <button className="btn-primary heartbeat-intense" onClick={nextStep}>
                                    Open Your Surprise 🎁
                                </button>
                            </div>
                        )}
                    </div>
                )}

                {/* Page 2: Special Moments */}
                {currentPage === 2 && (
                    <div className="fade-in" style={{ width: '100%', maxWidth: '700px', margin: '0 auto' }}>
                        <h2 className="neon-text-gold shimmer-text glow-pulse wobble" style={{ marginBottom: 'clamp(1.5rem, 5vh, 3rem)', fontSize: 'clamp(2rem, 7vw, 3.5rem)' }}>Our Special Moments 💖</h2>

                        <div style={{ display: 'flex', flexDirection: 'column', gap: 'clamp(1rem, 3vh, 2rem)' }}>
                            {[
                                { icon: "🤍", text: "You make me smile every day 😍", color: "#f472b6", animation: "slide-left", delay: "0.5s" },
                                { icon: "💎", text: "Everything is better with you 💎", color: "#22d3ee", animation: "slide-right", delay: "1.2s" },
                                { icon: "🫶", text: "Every moment with you is magic ✨", color: "#fbbf24", animation: "slide-left", delay: "1.9s" }
                            ].map((moment, i) => (
                                <div key={i} className={`glass-card ${moment.animation}`} style={{
                                    animationDelay: moment.delay,
                                    width: '100%',
                                    padding: 'clamp(1rem, 3vh, 1.5rem) clamp(1rem, 4vw, 2rem)',
                                    borderRadius: '25px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: 'clamp(0.8rem, 3vw, 1.5rem)',
                                    borderLeft: `8px solid ${moment.color}`,
                                    background: 'rgba(255, 255, 255, 0.08)',
                                    opacity: 0,
                                    textAlign: 'left'
                                }}>
                                    <div className="glow-pulse heartbeat-intense" style={{ fontSize: '2.5rem' }}>{moment.icon}</div>
                                    <p className="wobble" style={{ fontSize: '1.3rem', fontWeight: '700', color: '#fff' }}>{moment.text}</p>
                                </div>
                            ))}
                        </div>

                        <button className="btn-primary" onClick={nextStep} style={{ marginTop: 'clamp(2rem, 5vh, 3.5rem)' }}>
                            Next → Surprise 💌
                        </button>
                    </div>
                )}

                {/* Page 3: Proposal */}
                {currentPage === 3 && (
                    <div className="fade-in" style={{ width: '100%', margin: '0 auto', position: 'relative' }}>
                        {proposalHearts.map(h => (
                            <div key={h.id} className="proposal-heart" style={{ left: h.left, bottom: '-50px' }}>{h.emoji}</div>
                        ))}

                        <h1 className="neon-text-pink heartbeat-intense glow-pulse wobble" style={{ marginBottom: '2rem', fontSize: 'clamp(2.2rem, 7vw, 4rem)' }}>
                            Will you be mine forever? <span className="heartbeat-intense">🤍</span>
                        </h1>

                        <div style={{ width: '100%', maxWidth: '650px', margin: '0 auto', zIndex: 30, position: 'relative' }} className="bounce-in">
                            <CurtainReveal>
                                <div style={{
                                    textAlign: 'center',
                                    padding: '1.2rem',
                                    width: '100%',
                                    height: '100%',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    background: 'rgba(255, 255, 255, 0.05)',
                                    backdropFilter: 'blur(30px)',
                                    borderRadius: '40px',
                                    border: '1px solid rgba(255, 255, 255, 0.1)',
                                    boxShadow: '0 0 50px rgba(244, 114, 182, 0.15)'
                                }}>
                                    <h2 className="shimmer-text wobble" style={{ fontSize: 'clamp(1rem, 4vw, 1.5rem)', color: '#ffffff', fontWeight: '900', marginBottom: '0.8rem', textShadow: '0 0 10px #f472b6' }}>
                                        I LOVE YOU LAVAN! 🤍 <br />
                                        En Uyirae... 🫶
                                    </h2>

                                    <div className="pulse heartbeat-intense" style={{ fontSize: 'clamp(2.5rem, 10vw, 4rem)', margin: '0.5rem 0' }}>🫶💎</div>

                                    <div style={{ display: 'flex', gap: '1.2rem', justifyContent: 'center', alignItems: 'center', marginTop: '1.2rem', width: '100%' }}>
                                        <button className="btn-primary heartbeat-intense" onClick={nextStep} style={{ padding: '0.8rem 2rem', fontSize: '1.1rem', margin: 0 }}>
                                            YES! 💖
                                        </button>

                                        <button
                                            className="btn-primary"
                                            onMouseEnter={moveNoButton}
                                            onTouchStart={moveNoButton}
                                            style={{
                                                background: 'rgba(255,255,255,0.1)',
                                                border: '1px solid rgba(255,255,255,0.2)',
                                                padding: '0.8rem 1.8rem',
                                                fontSize: '1rem',
                                                margin: 0,
                                                transform: `translate(${noBtnPos.x}px, ${noBtnPos.y}px) scale(${noBtnPos.x === 0 ? 1 : 0.85})`,
                                                transition: 'all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)'
                                            }}
                                        >
                                            No 🥺
                                        </button>
                                    </div>
                                </div>
                            </CurtainReveal>
                        </div>
                    </div>
                )}

                {/* Page 4: Celebration */}
                {currentPage === 4 && (
                    <div className="fade-in" style={{ margin: '0 auto' }}>
                        <h1 className="neon-text-gold pulse shimmer-text glow-pulse" style={{ fontSize: 'clamp(2.5rem, 8vw, 4rem)', marginBottom: '1.5rem' }}>
                            You Made Me the Happiest! 🫶🤍
                        </h1>
                        <div className="float-3d" style={{ fontSize: 'clamp(60px, 15vw, 100px)', margin: '2rem 0' }}>🎂🍰🥂</div>
                        <p className="wobble" style={{ fontSize: 'clamp(1.4rem, 5vw, 2rem)', color: '#fff', textShadow: '0 2px 15px rgba(0,0,0,0.5)', fontWeight: '600' }}>
                            Thank you for saying YES! 🤍
                        </p>
                        <button className="btn-primary heartbeat-intense" onClick={nextStep} style={{ marginTop: '3.5rem' }}>
                            Next → Our Future Plans ✨
                        </button>
                    </div>
                )}

                {/* Page 5: Future Plans */}
                {currentPage === 5 && (
                    <div className="fade-in" style={{ width: '100%', maxWidth: '750px', margin: '0 auto' }}>
                        <h1 className="neon-text-pink shimmer-text glow-pulse wobble" style={{ marginBottom: 'clamp(1.5rem, 5vh, 2.5rem)', fontSize: 'clamp(1.8rem, 7vw, 3rem)' }}>Our Beautiful Future Together ✨</h1>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: 'clamp(1rem, 3vh, 2rem)' }}>
                            {[
                                { text: "Travel the world", icon: "🌍✈️", color: '#f472b6', delay: '0.2s', side: 'left' },
                                { text: "Celebrate every birthday", icon: "🤍🎂", color: '#fbbf24', delay: '0.7s', side: 'right' },
                                { text: "Laugh, love, and grow together", icon: "🫶🌱", color: '#22d3ee', delay: '1.2s', side: 'left' }
                            ].map((plan, i) => (
                                <div
                                    key={i}
                                    className={`glass-card slide-${plan.side}`}
                                    style={{
                                        padding: 'clamp(1rem, 3vh, 1.5rem) clamp(1rem, 4vw, 2.5rem)',
                                        width: '100%',
                                        opacity: 0,
                                        animationDelay: plan.delay,
                                        borderLeft: `10px solid ${plan.color}`,
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'space-between',
                                        gap: '1rem',
                                        borderRadius: '30px',
                                        background: 'rgba(255, 255, 255, 0.08)',
                                        textAlign: 'left'
                                    }}
                                >
                                    <p className="wobble" style={{ fontSize: 'clamp(1.1rem, 4vw, 1.5rem)', fontWeight: '700', color: '#fff', margin: 0, flex: 1 }}>{plan.text}</p>
                                    <span className="heartbeat-intense glow-pulse" style={{ fontSize: 'clamp(2.2rem, 8vw, 3rem)', lineHeight: 1 }}>{plan.icon}</span>
                                </div>
                            ))}
                        </div>
                        <button className="btn-primary" onClick={nextStep} style={{ marginTop: 'clamp(2rem, 5vh, 3.5rem)' }}>
                            Next → Messages & Wishes 💌
                        </button>
                    </div>
                )}

                {/* Page 6: Messages & Wishes */}
                {currentPage === 6 && (
                    <div className="fade-in" style={{ width: '100%', maxWidth: '800px', margin: '0 auto', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                        <h1 className="neon-text-gold shimmer-text glow-pulse wobble" style={{ marginBottom: 'clamp(1rem, 3vh, 2rem)', fontSize: 'clamp(1.6rem, 7vw, 3rem)' }}>Messages & Birthday Wishes 🤍</h1>

                        <div style={{
                            display: 'grid',
                            gridTemplateColumns: 'repeat(auto-fit, minmax(290px, 1fr))',
                            gap: 'clamp(1rem, 2vw, 1.5rem)',
                            width: '100%',
                            perspective: '1000px'
                        }}>
                            {[
                                { msg: "The First of Many ✨", sub: "Namma serndhu celebrate panra intha 1st birthday oru azhagana aarambam! Enikume neenga en pakathula irukanum... 🤍", color: "#f472b6", icon: "🌸" },
                                { msg: "You are My Gift 🎁", sub: "Unga anbu en vazhvil kidaitha periya pokkisham. Intha azhagana bond ennikume kalaiyadha oru kavithai madhiri irukkum! 💎", color: "#fbbf24", icon: "💎" },
                                { msg: "Pure Magic! ✨", sub: "Every single moment with you is literal magic. Everything with you feels like a beautiful dream come true! 🫶", color: "#22d3ee", icon: "🌟" },
                                { msg: "My Daily Smile 😍", sub: "Unga sirippu dhaan enna daily happy-aa vachirukku. You make me smile every single day, Lavan! 🤍", color: "#ff00ff", icon: "🤍" },
                                { msg: "Soulful Connection 💞", sub: "Everything feels so perfect between us. Namma rendu peroda intha bond ennikume kalaiyadha oru divine connection! 💎", color: "#4ade80", icon: "🍀" },
                                { msg: "My Forever Wish 🫶", sub: "Inum neraya memories serndhu create pannanum! You are my forever wish come true. 🤍✨", color: "#f43f5e", icon: "🫶" }
                            ].map((item, i) => (
                                <div
                                    key={i}
                                    className="glass-card float-3d"
                                    style={{
                                        padding: 'clamp(1rem, 2vh, 1.5rem) clamp(0.8rem, 2vw, 1.2rem)',
                                        opacity: 0,
                                        animation: `fadeIn 0.8s ease forwards ${i * 0.15}s`,
                                        borderTop: `4px solid ${item.color}`,
                                        background: 'rgba(255, 255, 255, 0.05)',
                                        borderRadius: '20px',
                                        transition: 'all 0.4s ease',
                                        textAlign: 'center'
                                    }}
                                >
                                    <div style={{ fontSize: 'clamp(1.5rem, 5vw, 2.22rem)', marginBottom: '0.5rem' }} className="heartbeat-intense">{item.icon}</div>
                                    <p className="glow-pulse" style={{ fontWeight: '800', fontSize: 'clamp(1rem, 3.5vw, 1.2rem)', marginBottom: '0.4rem', color: '#fff' }}>{item.msg}</p>
                                    <p style={{ fontSize: 'clamp(0.75rem, 3vw, 0.9rem)', color: '#cbd5e1', fontStyle: 'italic', lineHeight: '1.4' }}>"{item.sub}"</p>
                                </div>
                            ))}
                        </div>

                        <button className="btn-primary" onClick={nextStep} style={{ marginTop: 'clamp(1.5rem, 4vh, 3rem)', padding: '0.8rem 2.5rem' }}>
                            Next → Final Surprise 💝
                        </button>
                        {/* Extra bottom padding for mobile scroll clearance */}
                        <div style={{ height: '5rem' }}></div>
                    </div>
                )}

                {/* Page 7: Final Thank You */}
                {currentPage === 7 && (
                    <div className="fade-in" style={{
                        width: '100%',
                        minHeight: '80vh',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'center',
                        gap: '2rem'
                    }}>
                        <div className="glass-card bounce-in" style={{
                            background: 'linear-gradient(135deg, rgba(251, 191, 36, 0.12), rgba(244, 114, 182, 0.12))',
                            padding: 'clamp(2rem, 5vh, 4rem)',
                            borderRadius: '50px',
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            width: 'min(95%, 600px)',
                            border: '2px solid rgba(255, 255, 255, 0.15)',
                            boxShadow: '0 30px 60px rgba(0,0,0,0.4), inset 0 0 40px rgba(255,255,255,0.05)'
                        }}>
                            <h1 className="neon-text-gold shimmer-text glow-pulse wobble" style={{ fontSize: 'clamp(2rem, 8vw, 3.8rem)', marginBottom: '1.5rem', textAlign: 'center', lineHeight: 1.1 }}>
                                Thank You for Being You 🤍
                            </h1>

                            <div className="bounce-in" style={{ marginBottom: '2.5rem', width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                <p style={{ marginBottom: '1.5rem', color: '#fff', fontSize: 'clamp(1rem, 4vw, 1.3rem)', fontWeight: '600', textAlign: 'center' }}>
                                    I have a last secret for you... Scratch it! 🤫
                                </p>
                                <div style={{ transform: 'scale(clamp(0.8, 5vw, 1.1))' }}>
                                    <ScratchCard
                                        message="LAVAN, YOU ARE MY FOREVER! 🫶✨"
                                        onComplete={() => setShowFinalSecret(true)}
                                    />
                                </div>
                            </div>

                            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem', marginTop: '0.5rem', fontSize: 'clamp(1rem, 4.5vw, 1.3rem)', color: '#fff', fontWeight: '500', textAlign: 'center', width: '100%' }}>
                                <p className="fade-in shimmer-text" style={{ animationDelay: '1s' }}>You make me smile every day 🫶</p>
                                <p className="fade-in shimmer-text" style={{ animationDelay: '2s' }}>✨ Every moment with you is magic ✨</p>
                                <p className="fade-in shimmer-text" style={{ animationDelay: '3s' }}>You are the best thing that ever happened to me 🤍</p>
                            </div>

                            <div className="float-3d" style={{ margin: '2rem 0', fontSize: 'clamp(3rem, 10vw, 4rem)' }}>🎂🎈✨</div>

                            <button className="btn-primary heartbeat-intense" onClick={reset} style={{ width: 'min(100%, 250px)', fontSize: '1.3rem' }}>
                                Replay 🎁
                            </button>
                        </div>
                    </div>
                )}
            </div>

            {showFinalSecret && (
                <div className="fade-in" style={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    width: '100vw',
                    height: '100vh',
                    background: 'rgba(0,0,0,0.85)',
                    backdropFilter: 'blur(15px)',
                    zIndex: 5000,
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    textAlign: 'center',
                    padding: '2rem'
                }}>
                    <div className="glow-pulse float-3d" style={{ fontSize: 'clamp(50px, 15vw, 120px)', marginBottom: '2rem' }}>💎🫶🤍</div>
                    <h1 className="neon-text-pink shimmer-text wobble" style={{ fontSize: 'clamp(2.5rem, 10vw, 4rem)', marginBottom: '1.5rem', fontWeight: '900' }}>
                        I LOVE YOU FOREVER!
                    </h1>
                    <div style={{ padding: '0 1rem' }}>
                        <p className="heartbeat-intense" style={{ fontSize: 'clamp(1.2rem, 5vw, 1.8rem)', color: '#fff', textShadow: '0 0 10px #ff00ff', lineHeight: 1.4, marginBottom: '1rem' }}>
                            Lavan, you are my world, my happiness, and my everything... 🤍✨
                        </p>
                        <p className="shimmer-text" style={{ fontSize: 'clamp(1rem, 4vw, 1.4rem)', color: '#cbd5e1', fontStyle: 'italic' }}>
                            "I promise to love you more today than yesterday, but not as much as tomorrow." 🤍💎
                        </p>
                    </div>
                    <button className="btn-primary heartbeat-intense" onClick={() => setShowFinalSecret(false)} style={{ marginTop: '3rem', padding: '1.2rem 3.5rem', fontSize: '1.2rem', borderRadius: '50px' }}>
                        Close with Love 🤍
                    </button>
                </div>
            )}
        </div>
    );
};

export default App;
