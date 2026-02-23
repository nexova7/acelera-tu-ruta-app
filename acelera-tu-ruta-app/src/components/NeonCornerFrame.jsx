import React from 'react';

const NeonCornerFrame = () => (
    <>
        <div className="fixed top-4 left-4 w-8 h-8 border-t-2 border-l-2 border-neon-cyan shadow-[0_0_10px_#00fbff] z-[9999] pointer-events-none"></div>
        <div className="fixed top-4 right-4 w-8 h-8 border-t-2 border-r-2 border-neon-magenta shadow-[0_0_10px_#ff00ff] z-[9999] pointer-events-none"></div>
        <div className="fixed bottom-20 left-4 w-8 h-8 border-b-2 border-l-2 border-neon-magenta shadow-[0_0_10px_#ff00ff] z-[9999] pointer-events-none md:bottom-4"></div>
        <div className="fixed bottom-20 right-4 w-8 h-8 border-b-2 border-r-2 border-neon-cyan shadow-[0_0_10px_#00fbff] z-[9999] pointer-events-none md:bottom-4"></div>
    </>
);

export default NeonCornerFrame;
