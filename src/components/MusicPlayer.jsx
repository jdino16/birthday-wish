import React, { useState, useRef } from 'react';

const MusicPlayer = () => {
    const [isPlaying, setIsPlaying] = useState(false);
    const audioRef = useRef(null);

    const toggleMusic = () => {
        if (isPlaying) {
            audioRef.current.pause();
        } else {
            audioRef.current.play().catch(e => console.log("Audio play blocked by browser. Click to play."));
        }
        setIsPlaying(!isPlaying);
    };

    return (
        <div style={{ position: 'fixed', top: '20px', right: '20px', zIndex: 1000 }}>
            <button
                onClick={toggleMusic}
                style={{
                    background: 'rgba(255, 255, 255, 0.2)',
                    backdropFilter: 'blur(5px)',
                    border: '1px solid rgba(255, 255, 255, 0.3)',
                    borderRadius: '50%',
                    width: '50px',
                    height: '50px',
                    cursor: 'pointer',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    fontSize: '20px',
                    boxShadow: isPlaying ? '0 0 15px rgba(255, 255, 255, 0.5)' : 'none',
                    transition: 'all 0.3s ease'
                }}
                className={isPlaying ? 'pulse' : ''}
            >
                {isPlaying ? '🎵' : '🤍'}
            </button>
            <audio
                ref={audioRef}
                loop
                src="/background-music.mp3" // Local audio to fix CORS/Forbidden errors
            />
        </div>
    );
};

export default MusicPlayer;
