import React, { useState } from 'react';

const VirtualCake = ({ onAllOut }) => {
    const [candles, setCandles] = useState([true, true, true, true, true]);

    const blowOut = (index) => {
        if (!candles[index]) return;
        const newCandles = [...candles];
        newCandles[index] = false;
        setCandles(newCandles);
        if (newCandles.every(c => !c)) {
            setTimeout(onAllOut, 2000);
        }
    };

    return (
        <div className="cake-container">
            {/* The Plate */}
            <div className="cake-plate"></div>

            {/* The Cake Layers (Visual Order: Top to Bottom) */}
            <div className="cake-layers">
                {/* Top Layer */}
                <div className="layer layer-top">
                    <div className="icing-drips">
                        {[...Array(8)].map((_, i) => (
                            <div key={i} className="drip" style={{ left: `${i * 12.5}%`, animationDelay: `${i * 0.1}s` }}></div>
                        ))}
                    </div>
                </div>
                {/* Middle Layer */}
                <div className="layer layer-middle">
                    {/* Cherries on top of middle layer for style */}
                    {[...Array(4)].map((_, i) => (
                        <div key={i} className="cherry" style={{
                            left: `${15 + i * 23}%`,
                            top: '-10px',
                            animationDelay: `${i * 0.3}s`
                        }}></div>
                    ))}
                </div>
                {/* Bottom Layer */}
                <div className="layer layer-bottom"></div>
            </div>

            {/* The Candles - Positioned absolute relative to container */}
            <div className="candle-row">
                {candles.map((isOn, i) => (
                    <div
                        key={i}
                        className={`premium-candle ${!isOn ? 'out' : ''}`}
                        onClick={() => blowOut(i)}
                        style={{ left: `${20 + i * 15}%` }}
                    >
                        {isOn && (
                            <div className="flame-wrapper">
                                <div className="flame-core"></div>
                                <div className="flame-outer"></div>
                            </div>
                        )}
                        <div className="candle-wick"></div>
                    </div>
                ))}
            </div>

            {/* Name Label */}
            <div className="cake-label">
                <span className="shimmer-text">LAVAN 💖</span>
            </div>
        </div>
    );
};

export default VirtualCake;
