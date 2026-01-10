import React, { useState } from 'react';

const VirtualCake = ({ onAllOut }) => {
    const [candles, setCandles] = useState([true, true, true, true, true]);

    const blowOut = (index) => {
        const newCandles = [...candles];
        newCandles[index] = false;
        setCandles(newCandles);
        if (newCandles.every(c => !c)) {
            setTimeout(onAllOut, 1500);
        }
    };

    return (
        <div className="cake-wrapper float-3d">
            <div className="candle-set">
                {candles.map((isOn, i) => (
                    <div key={i} className="candle" onClick={() => blowOut(i)}>
                        {isOn && <div className="flame glow-pulse" style={{ background: 'radial-gradient(#fff, #fbbf24, #f59e0b)', boxShadow: '0 0 20px #fbbf24' }}></div>}
                    </div>
                ))}
            </div>
            <div className="cake-body">
                <div className="frosting">
                    {[...Array(6)].map((_, i) => (
                        <div key={i} className="sprinkle" style={{
                            backgroundColor: ['#ffea00', '#22d3ee', '#f472b6', '#fff'][i % 4],
                            animationDelay: `${i * 0.2}s`
                        }}></div>
                    ))}
                </div>
                <div style={{ position: 'absolute', bottom: '15px', width: '100%', textAlign: 'center', color: 'rgba(255,255,255,0.8)', fontSize: '0.9rem', fontWeight: '800', letterSpacing: '1px' }}>
                    LAVAN 🎂
                </div>
            </div>
        </div>
    );
};

export default VirtualCake;
