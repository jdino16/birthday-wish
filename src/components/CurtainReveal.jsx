import React, { useState } from 'react';

const CurtainReveal = ({ children }) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div
            className={`curtain-container ${isOpen ? 'open' : ''}`}
            onClick={() => setIsOpen(true)}
        >
            <div className="curtain-left">
                <span className="curtain-text">Please</span>
            </div>
            <div className="curtain-right">
                <span className="curtain-text">Open! ❤️</span>
            </div>
            <div className="reveal-content" style={{
                position: 'absolute',
                width: '100%',
                height: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: 'transparent',
                zIndex: 1
            }}>
                {children}
            </div>
        </div>
    );
};

export default CurtainReveal;
