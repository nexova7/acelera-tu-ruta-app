import React, { useState } from 'react';
import NeonCornerFrame from './components/NeonCornerFrame';
import WhatsAppButton from './components/WhatsAppButton';
import Navigation from './components/Navigation';
import Hero from './components/Hero';
import Store from './components/Store';
import PlayVial from './components/PlayVial';
import Courses from './components/Courses';

const App = () => {
    const [tab, setTab] = useState('INICIO');
    return (
        <div className="min-h-screen text-white overflow-x-hidden relative">
            <NeonCornerFrame />
            <Navigation active={tab} setTab={setTab} />
            <main className="relative z-10 pt-[80px]">
                {tab === 'INICIO' && <Hero goTo={setTab} />}
                {tab === 'TIENDA' && <Store />}
                {tab === 'PLAY_VIAL' && <PlayVial />}
                {tab === 'CURSOS' && <Courses />}
            </main>
            <WhatsAppButton />
            <footer className="text-center py-12 text-xs text-gray-600 pb-28 md:pb-12 border-t border-gray-900 mt-12 bg-black">
                <p>© 2024 ACELERA TU RUTA - SOACHA | ESTILO NEÓN</p>
            </footer>
        </div>
    );
};

export default App;
