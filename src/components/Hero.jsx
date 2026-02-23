import React from 'react';

const Hero = ({ goTo }) => (
    <div className="flex flex-col items-center justify-center min-h-[85vh] text-center px-4 relative z-10 animate-fade-in pt-20">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] h-[350px] bg-neon-cyan/10 rounded-full blur-[100px] -z-10"></div>
        <h1 className="text-5xl md:text-8xl font-black italic tracking-tighter mb-4 text-white drop-shadow-[0_0_20px_rgba(0,251,255,1)]">
            ACELERA <br /><span className="text-transparent bg-clip-text bg-gradient-to-r from-neon-cyan to-neon-magenta">TU RUTA</span>
        </h1>

        {/* BRANDING REDISEÑADO */}
        <h2 className="text-lg md:text-2xl text-white font-black tracking-widest uppercase mb-2 border-b-2 border-neon-cyan/50 pb-4 inline-block shadow-[0_10px_20px_-10px_#00FBFF] max-w-4xl leading-relaxed">
            TU LICENCIA A UN CLIC: GESTIÓN INTEGRAL Y ASESORÍA PERSONALIZADA
        </h2>
        <p className="text-sm md:text-base text-neon-cyan font-bold tracking-wider mb-12 uppercase drop-shadow-[0_0_8px_rgba(0,251,255,0.8)]">
            Punto de venta oficial - Los mejores convenios con Academias de Automovilismo
        </p>

        <div className="flex flex-col md:flex-row gap-8 w-full max-w-lg">
            <button onClick={() => goTo('CURSOS')} className="flex-1 py-5 bg-black/50 border-2 border-neon-cyan text-neon-cyan font-bold uppercase tracking-widest rounded-lg hover:bg-neon-cyan hover:text-black transition-all shadow-[0_0_20px_#00FBFF]">Ver Licencias</button>
            <button onClick={() => goTo('TIENDA')} className="flex-1 py-5 bg-black/50 border-2 border-neon-magenta text-neon-magenta font-bold uppercase tracking-widest rounded-lg hover:bg-neon-magenta hover:text-white transition-all shadow-[0_0_20px_#FF00FF]">Ir a Tienda</button>
        </div>
    </div>
);

export default Hero;
