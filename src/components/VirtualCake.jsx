import React, { useState } from 'react';

const VirtualCake = ({ onAllOut }) => {
    const [candles, setCandles] = useState([true, true, true, true, true]);

    const blowOut = (index) => {
        if (!candles[index]) return;
        const newCandles = [...candles];
        newCandles[index] = false;
        setCandles(newCandles);
        if (newCandles.every(c => !c)) {
            setTimeout(onAllOut, 2500);
        }
    };

    return (
        <div className="cake-stage">
            {/* The Plate */}
            <div className="cake-plate"></div>

            {/* Cake Body - Built from bottom to top for correct stacking */}
            <div className="cake-body-stack">
                {/* Bottom Layer */}
                <div className="cake-layer layer-base"></div>

                {/* Middle Layer */}
                <div className="cake-layer layer-mid">
                    {/* Cherries on the middle layer shelf */}
                    <div className="cherry-row">
                        {[...Array(4)].map((_, i) => (
                            <div key={i} className="cherry-item" style={{ left: `${12 + i * 25}%` }}></div>
                        ))}
                    </div>
                </div>

                {/* Top Layer (White Icing) */}
                <div className="cake-layer layer-peak">
                    {/* Filling the top with frosting */}
                    <div className="frosting-top"></div>
                    {/* Dripping effects */}
                    <div className="frosting-drips">
                        {[...Array(10)].map((_, i) => (
                            <div key={i} className="frosting-drip" style={{ left: `${i * 10}%`, animationDelay: `${i * 0.1}s` }}></div>
                        ))}
                    </div>
                </div>
            </div>

            {/* The Candles - Positioned relative to the cake-stage */}
            <div className="premium-candle-set">
                {candles.map((isOn, i) => (
                    <div
                        key={i}
                        className={`cake-candle ${!isOn ? 'blown-out' : ''}`}
                        onClick={() => blowOut(i)}
                        style={{ left: `${20 + i * 15}%` }}
                    >
                        {isOn && (
                            <div className="flame-magic">
                                <div className="flame-inner-white"></div>
                                <div className="flame-glow-aura"></div>
                            </div>
                        )}
                        <div className="wick-stick"></div>
                    </div>
                ))}
            </div>

            {/* Lavan Name Label */}
            <div className="cake-name-plate">
                <span className="gold-shimmer">LAVAN ❤️</span>
            </div>
        </div>
    );
};

export default VirtualCake;
