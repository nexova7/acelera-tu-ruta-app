import React from 'react';
import { PLAYLISTS, YOUTUBE_SUB_URL } from '../constants';

const PlayVial = () => {
    return (
        <div className="pb-32 pt-10 md:pt-12 animate-fade-in min-h-screen container mx-auto max-w-[1400px] px-4">
            <div className="w-full mb-12 relative z-10 flex flex-col items-center">
                <div className="w-full aspect-video md:aspect-[21/9] bg-black relative group mb-6">
                    <iframe
                        src={`https://www.youtube.com/embed/videoseries?list=${PLAYLISTS.HERO}&autoplay=0&mute=0`}
                        className="w-full h-full border-2 border-neon-cyan shadow-[0_0_20px_rgba(0,251,255,0.5)] rounded-lg"
                        title="Video Destacado Acelera Tu Ruta"
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                    ></iframe>
                </div>
                <a href={YOUTUBE_SUB_URL} target="_blank" className="btn-cyber-subscribe animate-pulse">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 16 16"><path d="M8.051 1.999h.089c.822.003 4.987.033 6.11.335a2.01 2.01 0 0 1 1.415 1.42c.101.38.172.883.22 1.402l.01.104.022.26.008.104c.065.914.073 1.77.074 1.957v.075c-.001.194-.01 1.108-.082 2.06l-.008.105-.009.104c-.05.572-.124 1.14-.235 1.558a2.007 2.007 0 0 1-1.415 1.42c-1.16.312-5.569.334-6.18.335h-.142c-.309 0-1.587-.006-2.927-.052l-.17-.006-.087-.004-.171-.007-.171-.007c-1.11-.049-2.167-.128-2.654-.26a2.007 2.007 0 0 1-1.415-1.419c-.111-.417-.185-.986-.235-1.558L.09 9.82l-.008-.104A31.4 31.4 0 0 1 0 7.68v-.123c.002-.215.01-.958.064-1.778l.007-.103.003-.052.008-.104.022-.26.01-.104c.048-.519.119-1.023.22-1.402a2.007 2.007 0 0 1 1.415-1.42c.487-.13 1.544-.21 2.654-.26l.17-.007.172-.006.086-.003.171-.007A99.788 99.788 0 0 1 7.858 2h.193zM6.4 5.209v4.818l4.157-2.408L6.4 5.209z" /></svg>
                    SUSCRIBIRSE AL CANAL
                </a>
            </div>
            <div className="mb-16">
                <div className="flex items-center gap-4 mb-6 px-2">
                    <div className="w-1 h-8 bg-neon-cyan shadow-[0_0_15px_#00FBFF]"></div>
                    <h2 className="text-3xl font-black text-white uppercase tracking-widest drop-shadow-[0_0_10px_#00FBFF]">NOVEDADES</h2>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                    {[0, 1, 2, 3].map((index) => (
                        <div key={index} className="aspect-video w-full bg-black cyber-frame overflow-hidden relative">
                            {index === 0 && <div className="badge-estreno">PRÓXIMO ESTRENO</div>}
                            <iframe className="w-full h-full" src={`https://www.youtube.com/embed?listType=playlist&list=${PLAYLISTS.NOVEDADES}&index=${index}`} frameBorder="0" allowFullScreen loading="lazy"></iframe>
                        </div>
                    ))}
                </div>
            </div>
            <div className="mb-12">
                <div className="flex items-center gap-4 mb-6 px-2">
                    <div className="w-1 h-8 bg-neon-magenta shadow-[0_0_15px_#FF00FF]"></div>
                    <h2 className="text-3xl font-black text-white uppercase tracking-widest drop-shadow-[0_0_10px_#FF00FF]">ACADEMIA ACELERA</h2>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                    {[0, 1, 2, 3].map((index) => (
                        <div key={index} className="aspect-video w-full bg-black cyber-frame overflow-hidden relative">
                            {index === 1 && <div className="badge-estreno">NUEVA CLASE</div>}
                            <iframe className="w-full h-full" src={`https://www.youtube.com/embed?listType=playlist&list=${PLAYLISTS.ACADEMIA}&index=${index}`} frameBorder="0" allowFullScreen loading="lazy"></iframe>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default PlayVial;
