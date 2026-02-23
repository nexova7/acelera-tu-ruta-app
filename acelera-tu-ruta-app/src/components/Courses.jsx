import React from 'react';
import { WHATSAPP_NUMBER, COURSES_DATA, MANDATORY_FEATURES } from '../constants';

const Courses = () => {
    const coursesData = COURSES_DATA;

    // BENEFICIOS OBLIGATORIOS


    const openWhatsapp = (ref) => {
        window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=Hola, quiero RESERVAR CUPO para la referencia: ${ref}`, '_blank');
    }

    return (
        <div className="container mx-auto px-4 py-8 md:py-12 pb-24 animate-fade-in max-w-[1400px]">
            <div className="flex items-center gap-4 mb-8">
                <div className="w-1 h-8 bg-neon-cyan shadow-[0_0_15px_#00FBFF]"></div>
                <h2 className="text-3xl font-black text-white uppercase tracking-widest drop-shadow-[0_0_10px_#00FBFF]">
                    LICENCIAS Y CURSOS
                </h2>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {coursesData.map((course) => (
                    <div
                        key={course.id}
                        className={`
                            relative flex flex-col justify-between
                            bg-black/60 backdrop-blur-md rounded-xl p-4
                            border transition-all duration-300 hover:-translate-y-2
                            ${course.type === 'NEW'
                                ? 'border-neon-cyan shadow-[0_0_15px_rgba(0,251,255,0.1)] hover:shadow-[0_0_25px_rgba(0,251,255,0.4)]'
                                : 'border-neon-magenta shadow-[0_0_15px_rgba(255,0,255,0.1)] hover:shadow-[0_0_25px_rgba(255,0,255,0.4)]'
                            }
                        `}
                    >
                        {/* Badge REF */}
                        <div className={`
                            absolute top-0 right-0 px-3 py-1 rounded-bl-xl text-[10px] font-bold text-black
                            ${course.type === 'NEW' ? 'bg-neon-cyan' : 'bg-neon-magenta'}
                        `}>
                            REF: {course.ref}
                        </div>

                        {/* Title */}
                        <h3 className="text-lg md:text-xl font-black italic uppercase leading-tight mt-4 mb-4 text-white">
                            {course.title}
                        </h3>

                        {/* Hours Grid */}
                        {course.hours ? (
                            <div className="grid grid-cols-3 gap-2 mb-4">
                                {course.hours.theory && (
                                    <div className="text-center bg-black/40 rounded p-1 border border-gray-700">
                                        <div className="text-neon-cyan font-bold text-lg">{course.hours.theory}h</div>
                                        <div className="text-[8px] text-gray-500 uppercase">Teoría</div>
                                    </div>
                                )}
                                {course.hours.workshop && (
                                    <div className="text-center bg-black/40 rounded p-1 border border-gray-700">
                                        <div className="text-yellow-400 font-bold text-lg">{course.hours.workshop}h</div>
                                        <div className="text-[8px] text-gray-500 uppercase">Taller</div>
                                    </div>
                                )}
                                {course.hours.driving && (
                                    <div className="text-center bg-black/40 rounded p-1 border border-gray-700">
                                        <div className="text-neon-magenta font-bold text-lg">{course.hours.driving}h</div>
                                        <div className="text-[8px] text-gray-500 uppercase">Manejo</div>
                                    </div>
                                )}
                            </div>
                        ) : (
                            <div className="mb-4 p-2 bg-black/40 rounded border border-gray-700 text-center">
                                <span className="text-xs text-gray-400">Trámite administrativo y validación</span>
                            </div>
                        )}

                        {/* Features List (Mandatory) */}
                        <ul className="text-xs text-white mb-6 space-y-2">
                            {MANDATORY_FEATURES.map((f, i) => (
                                <li key={i} className="flex items-start gap-2">
                                    <span className="text-neon-cyan drop-shadow-[0_0_5px_#00FBFF] text-sm font-bold">✓</span>
                                    <span className="font-light">{f}</span>
                                </li>
                            ))}
                        </ul>

                        {/* Button */}
                        <button
                            onClick={() => openWhatsapp(course.ref)}
                            className={`
                                w-full py-3 rounded text-sm font-black uppercase tracking-widest transition-all
                                border bg-transparent hover:text-black flex items-center justify-center gap-2
                                ${course.type === 'NEW'
                                    ? 'border-neon-cyan text-neon-cyan hover:bg-neon-cyan shadow-[0_0_10px_rgba(0,251,255,0.2)]'
                                    : 'border-neon-magenta text-neon-magenta hover:bg-neon-magenta shadow-[0_0_10px_rgba(255,0,255,0.2)]'
                                }
                            `}
                        >
                            RESERVAR CUPO
                        </button>
                    </div>
                ))}
            </div>

            {/* DISCLAIMER FOOTER */}
            <div className="mt-16 text-center border-t border-gray-900 pt-8 opacity-70">
                <p className="text-gray-500 text-[10px] md:text-xs uppercase tracking-[0.2em] font-light">
                    Somos tu aliado digital. Gestionamos tu proceso con las mejores academias autorizadas.
                </p>
            </div>
        </div>
    );
};

export default Courses;
