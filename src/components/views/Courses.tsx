
import React, { useState } from 'react';
import { ALL_COURSES, WHATSAPP_NUMBER } from '../../constants';
import { CourseCategory } from '../../types';

const Courses: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<CourseCategory>('TODOS');

  const handleInfo = (courseName: string) => {
    const message = `Hola, quisiera más información sobre el curso/servicio: ${courseName}`;
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`, '_blank');
  };

  const categories: CourseCategory[] = ['TODOS', 'LICENCIAS', 'COMBOS', 'SERVICIOS'];

  const filteredCourses = selectedCategory === 'TODOS' 
    ? ALL_COURSES 
    : ALL_COURSES.filter(c => c.category === selectedCategory);

  return (
    <div className="w-full max-w-7xl mx-auto p-4 animate-fade-in flex flex-col md:flex-row gap-8 min-h-[600px]">
      
      {/* Glassmorphism Sidebar */}
      <aside className="w-full md:w-64 flex-shrink-0">
        <div className="glass-panel rounded-xl p-5 sticky top-24 transition-all duration-300 hover:border-cyan-500/40">
          <h3 className="text-xl font-bold text-white mb-6 pl-2 border-l-4 border-fuchsia-500 uppercase tracking-widest drop-shadow-[0_0_5px_#d946ef]">
            Servicios
          </h3>
          <nav className="flex flex-row md:flex-col gap-2 overflow-x-auto md:overflow-visible pb-2 md:pb-0 scrollbar-hide">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`
                  text-left px-4 py-3 rounded-lg font-bold text-sm transition-all duration-300 whitespace-nowrap
                  ${selectedCategory === cat 
                    ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/50 shadow-[0_0_15px_rgba(34,211,238,0.3)] translate-x-1' 
                    : 'text-gray-400 hover:text-white hover:bg-white/5 hover:translate-x-1'}
                `}
              >
                {cat}
              </button>
            ))}
          </nav>

          <div className="mt-8 hidden md:block p-4 bg-black/40 rounded-lg border border-cyan-900/50 backdrop-blur-sm">
            <h4 className="text-cyan-400 font-bold text-sm mb-2">¿Dudas con tu licencia?</h4>
            <p className="text-xs text-gray-400 mb-3 font-light">Nuestros asesores te ayudan a elegir el mejor paquete para ti.</p>
            <button 
              onClick={() => handleInfo('Asesoría General')}
              className="w-full text-xs bg-fuchsia-600 hover:bg-fuchsia-500 text-white font-bold py-2 rounded transition-colors shadow-[0_0_10px_rgba(217,70,239,0.4)]"
            >
              Contactar Asesor
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-grow">
        <div className="mb-8 glass-panel p-6 rounded-xl border-l-4 border-cyan-500 shadow-[0_0_15px_rgba(34,211,238,0.1)] electric-border-static">
          <h2 className="text-2xl font-bold text-white mb-2">Formación Integral</h2>
          <p className="text-gray-300 text-sm leading-relaxed font-light">
            Ofrecemos una variada gama de cursos de conducción diseñados para cubrir las necesidades de cada tipo de conductor. 
            Nuestro enfoque combina la teoría con la práctica para asegurar que estés preparado para la vía.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {filteredCourses.map((course) => (
            <div 
              key={course.id}
              className="group relative glass-panel rounded-xl p-6 transition-all duration-300 flex flex-col hover:-translate-y-1 electric-hover electric-border-static"
            >
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-2xl font-black text-white group-hover:text-cyan-400 transition-colors drop-shadow-md">
                    {course.title}
                  </h3>
                  <span className="text-xs font-bold bg-slate-800/80 text-gray-300 px-2 py-1 rounded mt-1 inline-block border border-gray-700">
                    {course.category}
                  </span>
                </div>
                {/* Visual Accent */}
                <div className="w-12 h-12 rounded-full bg-cyan-900/20 border border-cyan-500/30 flex items-center justify-center text-cyan-400 group-hover:bg-cyan-500 group-hover:text-black group-hover:shadow-[0_0_15px_#22d3ee] transition-all duration-300">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 16 16">
                    <path d="M11.251.068a.5.5 0 0 1 .227.58L9.677 6.5H13a.5.5 0 0 1 .364.843l-8 8.5a.5.5 0 0 1-.842-.49L6.323 9.5H3a.5.5 0 0 1-.364-.843l8-8.5a.5.5 0 0 1 .615-.09z"/>
                  </svg>
                </div>
              </div>

              <p className="text-gray-400 text-sm mb-6 flex-grow border-b border-gray-700/50 pb-4 font-light leading-relaxed">
                {course.description}
              </p>

              {/* Hours Grid - Updated with Icons */}
              {(course.theoryHours || course.practicalHours || course.workshopHours) && (
                <div className="grid grid-cols-3 gap-3 mb-6">
                  {course.theoryHours && (
                    <div className="flex flex-col items-center justify-center bg-black/40 rounded-lg p-2 border border-gray-800 hover:border-fuchsia-500/50 transition-colors">
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="text-fuchsia-400 mb-1" viewBox="0 0 16 16">
                        <path d="M1 2.828c.885-.37 2.154-.769 3.388-.893 1.33-.134 2.458.063 3.112.752v9.746c-.935-.53-2.12-.603-3.213-.493-1.18.12-2.37.461-3.287.811V2.828zm7.5-.141c.654-.689 1.782-.886 3.112-.752 1.234.124 2.503.523 3.388.893v9.923c-.918-.35-2.107-.692-3.287-.81-1.094-.111-2.278-.039-3.213.492V2.687zM8 1.783C7.015.936 5.587.81 4.287.94c-1.514.153-3.042.672-3.994 1.105A.5.5 0 0 0 0 2.5v11a.5.5 0 0 0 .707.455c.882-.4 2.303-.881 3.68-1.02 1.409-.142 2.59.087 3.223.877a.5.5 0 0 0 .78 0c.633-.79 1.814-1.019 3.222-.877 1.378.139 2.8.62 3.681 1.02A.5.5 0 0 0 16 13.5v-11a.5.5 0 0 0-.293-.455c-.952-.433-2.48-.952-3.994-1.105C10.413.809 8.985.936 8 1.783z"/>
                      </svg>
                      <div className="text-fuchsia-400 font-bold text-lg">{course.theoryHours}h</div>
                      <div className="text-[8px] md:text-[9px] text-gray-500 uppercase tracking-widest mt-1">Teoría</div>
                    </div>
                  )}
                  {course.practicalHours && (
                    <div className="flex flex-col items-center justify-center bg-black/40 rounded-lg p-2 border border-gray-800 hover:border-cyan-500/50 transition-colors">
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="text-cyan-400 mb-1" viewBox="0 0 16 16">
                         <path d="M8 0a8 8 0 1 0 0 16A8 8 0 0 0 8 0zM2.04 4.326c.325 1.329 2.532 2.54 3.717 3.19.48.263.793.434.743.484-.08.08-.62-.12-3.28-1.728C2.582 5.618 1.838 4.975 2.04 4.326zm1.383 8.355c1.283-.425 2.325-1.535 2.965-2.433.206-.288.428-.686.428-.686a51.644 51.644 0 0 1 .15-.224c.056-.08.077-.076.082-.016a7.135 7.135 0 0 1-.29 1.636c-.495 1.554-1.353 2.091-3.336 1.723zm10.537-8.355c.201.648-.542 1.292-1.18 1.944-2.659 1.607-3.199 1.808-3.279 1.728-.05-.05.263-.221.743-.484 1.184-.65 3.391-1.861 3.716-3.189zm-1.383 8.355c-1.983.368-2.84-.169-3.335-1.723a7.135 7.135 0 0 1-.291-1.636c.005-.06.026-.064.082.016.033.048.077.113.15.224.58.814 1.645 1.956 2.97 2.433a.465.465 0 0 0 .424.686zM8 9.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3z"/>
                      </svg>
                      <div className="text-cyan-400 font-bold text-lg">{course.practicalHours}h</div>
                      <div className="text-[8px] md:text-[9px] text-gray-500 uppercase tracking-widest mt-1">Práctica</div>
                    </div>
                  )}
                  {course.workshopHours && (
                    <div className="flex flex-col items-center justify-center bg-black/40 rounded-lg p-2 border border-gray-800 hover:border-yellow-400/50 transition-colors">
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="text-yellow-400 mb-1" viewBox="0 0 16 16">
                        <path d="M.102 2.223A3.004 3.004 0 0 0 3.78 5.897l6.341 6.252A3.003 3.003 0 0 0 13 16a3 3 0 1 0-.851-5.878L5.897 3.781A3.004 3.004 0 0 0 2.223.1l2.141 2.142L4 4l-1.757.364L.102 2.223zm13.37 9.019.528.026.287.445.445.287.026.529L15 13l-.242.471-.026.529-.445.287-.287.445-.529.026L13 15l-.471-.242-.529-.026-.287-.445-.445-.287-.026-.529L11 13l.242-.471.026-.529.445-.287.287-.445.529-.026L13 11l.471.242z"/>
                      </svg>
                      <div className="text-yellow-400 font-bold text-lg">{course.workshopHours}h</div>
                      <div className="text-[8px] md:text-[9px] text-gray-500 uppercase tracking-widest mt-1">Taller</div>
                    </div>
                  )}
                </div>
              )}

              {/* Features List */}
              <div className="space-y-2 mb-6 bg-cyan-900/5 p-4 rounded-lg border border-cyan-900/20">
                <p className="text-xs font-bold text-cyan-300 mb-2 uppercase tracking-wide">Incluye:</p>
                {course.features.map((feat, idx) => (
                  <div key={idx} className="flex items-center text-xs text-gray-300">
                    <span className="w-1.5 h-1.5 bg-fuchsia-500 rounded-full mr-2 shadow-[0_0_5px_#d946ef]"></span>
                    {feat}
                  </div>
                ))}
              </div>

              <button 
                onClick={() => handleInfo(course.title)}
                className="w-full py-3 bg-transparent border border-cyan-500/50 text-cyan-400 hover:bg-cyan-500 hover:text-black font-bold rounded-lg transition-all uppercase tracking-wider text-sm shadow-[0_0_10px_rgba(34,211,238,0.1)] hover:shadow-[0_0_20px_#22d3ee]"
              >
                ¡Más información!
              </button>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default Courses;
