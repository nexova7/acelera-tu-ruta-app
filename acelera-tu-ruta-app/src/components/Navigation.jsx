import React from 'react';

const Navigation = ({ active, setTab }) => {
    const items = [
        { id: 'INICIO', label: 'INICIO', icon: '🏠' },
        { id: 'TIENDA', label: 'TIENDA', icon: '🛍️' },
        { id: 'PLAY_VIAL', label: 'PLAY VIAL', icon: '▶️' },
        { id: 'CURSOS', label: 'CURSOS', icon: '🎓' }
    ];

    return (
        <>
            <nav className="hidden md:flex fixed top-0 w-full z-[100] bg-black/90 backdrop-blur-md border-b border-neon-cyan/30 justify-center items-center h-20">
                <div className="flex gap-8 justify-center items-center w-full max-w-[1200px]">
                    <div className="text-2xl font-black italic tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-neon-cyan to-white cursor-pointer mr-8" onClick={() => setTab('INICIO')}>
                        ACELERA TU RUTA
                    </div>
                    {items.map(item => (
                        <button key={item.id} onClick={() => setTab(item.id)} className={`px-4 py-2 font-bold uppercase tracking-widest text-sm transition-all rounded hover:text-white hover:scale-110 ${active === item.id ? 'text-neon-cyan drop-shadow-[0_0_15px_#00FBFF] border-b-2 border-neon-cyan' : 'text-gray-400'}`}>
                            {item.label}
                        </button>
                    ))}
                </div>
            </nav>

            <nav className="md:hidden fixed bottom-0 left-0 right-0 z-[100] bg-black/80 backdrop-blur-md border-t border-neon-cyan/30 h-16 flex justify-around items-center">
                {items.map(item => (
                    <button key={item.id} onClick={() => setTab(item.id)} className={`flex flex-col items-center justify-center w-full h-full space-y-1 transition-all ${active === item.id ? 'text-neon-cyan -translate-y-1' : 'text-gray-400'}`}>
                        <span className={`text-2xl ${active === item.id ? 'drop-shadow-[0_0_10px_#00FBFF]' : ''}`}>{item.icon}</span>
                    </button>
                ))}
            </nav>
        </>
    );
};

export default Navigation;
