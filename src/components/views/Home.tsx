
import React from 'react';
import { Tab } from '../../types';

interface HomeProps {
  changeTab: (tab: Tab) => void;
}

const Home: React.FC<HomeProps> = ({ changeTab }) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] text-center px-4 animate-fade-in space-y-8">
      <div className="relative z-10 max-w-4xl">
        {/* SEO H1 Optimizado */}
        <h1 className="text-4xl md:text-6xl font-black italic text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-white to-fuchsia-500 drop-shadow-[0_0_15px_rgba(34,211,238,0.6)] leading-tight">
          Tu Aliado en la Ruta: <br className="md:hidden"/> Licencias, Moda y Accesorios
        </h1>
        <h2 className="mt-4 text-xl text-cyan-100 font-light tracking-widest uppercase shadow-black drop-shadow-md">
          Escuela de Automovilismo <span className="text-fuchsia-400 font-bold">Soacha</span>
        </h2>
      </div>

      <div className="max-w-2xl glass-panel p-8 rounded-2xl animate-neon-pulse transition-all duration-500 hover:scale-[1.01]">
        <p className="text-gray-200 mb-6 leading-relaxed text-lg font-light">
          Domina las calles con la mejor técnica. Expertos en licencias A2, B1 y C1. 
          Metodología moderna, vehículos seguros y pasión por la enseñanza.
        </p>
        <div className="flex flex-wrap justify-center gap-6">
          <button 
            onClick={() => changeTab(Tab.CURSOS)}
            className="px-8 py-3 bg-fuchsia-600/90 hover:bg-fuchsia-500 text-white font-bold rounded-full shadow-[0_0_20px_rgba(217,70,239,0.5)] transition-all hover:scale-110 border border-white/20 inline-block cursor-pointer"
          >
            VER CURSOS
          </button>
          <button 
             onClick={() => changeTab(Tab.TIENDA)}
             className="px-8 py-3 bg-cyan-900/30 border border-cyan-400 text-cyan-400 hover:bg-cyan-400 hover:text-black font-bold rounded-full shadow-[0_0_15px_rgba(34,211,238,0.3)] transition-all hover:scale-105 backdrop-blur-sm inline-block cursor-pointer"
          >
            TIENDA OFICIAL
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;
