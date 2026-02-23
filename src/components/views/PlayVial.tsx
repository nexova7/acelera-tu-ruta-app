
import React, { useEffect, useState } from 'react';
import { fetchPlaylistVideos } from '../../services/youtubeService';
import { YouTubeVideo } from '../../types';

const isNew = (dateString: string) => {
  const date = new Date(dateString);
  const now = new Date();
  const diffTime = Math.abs(now.getTime() - date.getTime());
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return diffDays <= 7;
};

// Componente Interno para Tarjeta de Video - SEMÁNTICA ACTUALIZADA PARA SEO
const VideoCard: React.FC<{ video: YouTubeVideo; onPlay: (id: string, title: string) => void }> = ({ video, onPlay }) => (
  <article 
    onClick={() => onPlay(video.id, video.title)}
    className="flex-shrink-0 w-72 md:w-80 bg-black/60 backdrop-blur-md rounded-[15px] overflow-hidden cursor-pointer group transition-all duration-300 relative border border-[#00FBFF]/30 hover:border-[#00FBFF] shadow-[0_0_15px_rgba(0,251,255,0.1)] hover:shadow-[0_0_30px_rgba(0,251,255,0.6)] hover:-translate-y-2"
    aria-label={`Ver video tutorial de conducción: ${video.title}`}
  >
    {/* Thumbnail Container */}
    <div className="relative aspect-video w-full overflow-hidden">
      <img 
        src={video.thumbnail} 
        alt={`Miniatura del video: ${video.title} - Acelera tu ruta`}
        loading="lazy"
        className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity"
      />
      
      {/* Play Button Overlay */}
      <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity">
        <div className="w-12 h-12 rounded-full bg-[#00FBFF]/20 border border-[#00FBFF] flex items-center justify-center backdrop-blur-sm shadow-[0_0_15px_#00FBFF]">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="text-white ml-1" viewBox="0 0 16 16">
            <path d="m11.596 8.697-6.363 3.692c-.54.313-1.233-.066-1.233-.697V4.308c0-.63.692-1.01 1.233-.696l6.363 3.692a.802.802 0 0 1 0 1.393z"/>
          </svg>
        </div>
      </div>

      {/* Badges */}
      <div className="absolute top-2 left-2 flex flex-col gap-1">
        {video.isUpcoming && (
          <span className="px-2 py-0.5 rounded bg-[#FF00FF]/90 text-white text-[10px] font-bold tracking-widest border border-[#FF00FF] shadow-[0_0_15px_#FF00FF] animate-pulse">
            ESTRENO
          </span>
        )}
        {!video.isUpcoming && isNew(video.publishedAt) && (
          <span className="px-2 py-0.5 rounded bg-[#00FBFF]/90 text-black text-[10px] font-bold tracking-widest border border-[#00FBFF] shadow-[0_0_15px_#00FBFF]">
            NUEVO
          </span>
        )}
      </div>
    </div>

    {/* Content */}
    <div className="p-4 bg-gradient-to-b from-transparent to-black/90">
      <h3 className="text-white font-bold text-sm line-clamp-2 mb-2 group-hover:text-[#00FBFF] transition-colors drop-shadow-[0_0_5px_rgba(0,251,255,0.5)]">
        {video.title}
      </h3>
      <p className="text-gray-400 text-xs line-clamp-2 font-light">
        <span className="sr-only">Tutorial de conducción y seguridad vial: </span>
        {video.description || "Aprende técnicas de conducción segura con Acelera tu ruta."}
      </p>
    </div>
  </article>
);

// Componente Modal de Video (Lightbox - Lazy Loaded)
// z-[1000] asegura que esté por encima del menú móvil (z-[100])
const VideoModal: React.FC<{ videoId: string | null; videoTitle: string | null; onClose: () => void }> = ({ videoId, videoTitle, onClose }) => {
  if (!videoId) return null;

  return (
    <div 
      className="fixed inset-0 z-[1000] bg-black/90 backdrop-blur-md flex items-center justify-center p-4 animate-fade-in"
      onClick={onClose}
    >
      <div 
        className="relative w-full max-w-4xl aspect-video bg-black rounded-xl overflow-hidden shadow-[0_0_40px_rgba(0,251,255,0.3)] border border-[#00FBFF]"
        onClick={(e) => e.stopPropagation()}
      >
        <button 
          onClick={onClose}
          className="absolute -top-10 right-0 md:top-4 md:right-4 z-50 text-white hover:text-[#00FBFF] transition-colors"
          aria-label="Cerrar video"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" viewBox="0 0 16 16">
            <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>
          </svg>
        </button>
        {/* Iframe solo existe si videoId existe - Atributo TITLE actualizado para SEO */}
        <iframe 
          className="w-full h-full"
          src={`https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`}
          title={`Reproduciendo video: ${videoTitle || 'Tutorial Acelera Tu Ruta'}`}
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
        ></iframe>
      </div>
    </div>
  );
};

// Componente para inyectar JSON-LD (Schema.org VideoObject)
const VideoSchemaScript: React.FC<{ videos: YouTubeVideo[] }> = ({ videos }) => {
  if (videos.length === 0) return null;

  const structuredData = videos.map(video => ({
    "@context": "https://schema.org",
    "@type": "VideoObject",
    "name": video.title,
    "description": video.description || `Tutorial de conducción sobre ${video.title} por Acelera Tu Ruta.`,
    "thumbnailUrl": [video.thumbnail],
    "uploadDate": video.publishedAt,
    "embedUrl": `https://www.youtube.com/embed/${video.id}`,
    "contentUrl": `https://www.youtube.com/watch?v=${video.id}`,
    "publisher": {
      "@type": "Organization",
      "name": "Acelera Tu Ruta",
      "logo": {
        "@type": "ImageObject",
        "url": "https://aceleraturuta.com/logo.png" // Idealmente reemplazar con logo real
      }
    }
  }));

  // Envolvemos en un script tag para React
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  );
};

const PlayVial: React.FC = () => {
  const [featuredVideo, setFeaturedVideo] = useState<YouTubeVideo | null>(null);
  const [newsVideos, setNewsVideos] = useState<YouTubeVideo[]>([]);
  const [academyVideos, setAcademyVideos] = useState<YouTubeVideo[]>([]);
  const [loading, setLoading] = useState(true);
  
  // Estado para el modal de video
  const [selectedVideoId, setSelectedVideoId] = useState<string | null>(null);
  const [selectedVideoTitle, setSelectedVideoTitle] = useState<string | null>(null);

  useEffect(() => {
    const loadVideos = async () => {
      setLoading(true);
      const [feat, news, acad] = await Promise.all([
        fetchPlaylistVideos('FEATURED'),
        fetchPlaylistVideos('NEWS'),
        fetchPlaylistVideos('ACADEMY')
      ]);

      if (feat && feat.length > 0) setFeaturedVideo(feat[0]);
      setNewsVideos(news);
      setAcademyVideos(acad);
      setLoading(false);
    };

    loadVideos();
  }, []);

  const handlePlayVideo = (id: string, title: string) => {
    setSelectedVideoId(id);
    setSelectedVideoTitle(title);
  };

  return (
    <>
      {/* Inyección de Datos Estructurados (SEO) - Combina destacados para Google */}
      {!loading && (
        <VideoSchemaScript videos={[
            ...(featuredVideo ? [featuredVideo] : []),
            ...newsVideos.slice(0, 3), 
            ...academyVideos.slice(0, 3)
        ]} />
      )}

      <div className="w-full max-w-7xl mx-auto pb-24 animate-fade-in">
        
        {/* HERO SECTION: Featured Video */}
        <section className="relative w-full aspect-video md:aspect-[21/9] rounded-[20px] overflow-hidden mb-12 shadow-[0_0_30px_rgba(0,251,255,0.2)] group border border-[#00FBFF]/50 hover:border-[#00FBFF] hover:shadow-[0_0_50px_rgba(0,251,255,0.4)] transition-all duration-500">
          {featuredVideo ? (
            <article aria-label={`Video destacado: ${featuredVideo.title}`}>
              <img 
                src={featuredVideo.thumbnail.replace('hqdefault', 'maxresdefault')} 
                alt={`Video destacado: ${featuredVideo.title}`} 
                className="w-full h-full object-cover opacity-70 group-hover:opacity-100 transition-opacity duration-700"
                loading="eager" // Hero image should load eagerly
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent"></div>
              <div className="absolute bottom-0 left-0 p-6 md:p-12 w-full md:w-2/3">
                <span className="inline-block px-3 py-1 mb-4 rounded border border-[#FF00FF] bg-[#FF00FF]/20 text-[#FF00FF] text-xs font-bold tracking-[0.2em] shadow-[0_0_15px_rgba(255,0,255,0.5)] backdrop-blur-md">
                  DESTACADO
                </span>
                <h1 className="text-3xl md:text-5xl font-black text-white mb-4 italic drop-shadow-[0_0_15px_rgba(0,251,255,0.8)]">
                  {featuredVideo.title}
                </h1>
                <p className="text-gray-300 text-sm md:text-lg mb-6 line-clamp-2 max-w-xl font-light drop-shadow-md">
                   {featuredVideo.description} - <span className="text-cyan-400">Tutorial de conducción y seguridad vial Acelera tu ruta.</span>
                </p>
                <button 
                  onClick={() => handlePlayVideo(featuredVideo.id, featuredVideo.title)}
                  className="px-8 py-3 bg-[#00FBFF] hover:bg-[#00D0D4] text-black font-black uppercase tracking-widest rounded-lg shadow-[0_0_20px_#00FBFF] hover:scale-105 transition-all flex items-center gap-2 border border-white/20"
                  aria-label={`Reproducir video destacado: ${featuredVideo.title}`}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 16 16"><path d="m11.596 8.697-6.363 3.692c-.54.313-1.233-.066-1.233-.697V4.308c0-.63.692-1.01 1.233-.696l6.363 3.692a.802.802 0 0 1 0 1.393z"/></svg>
                  Ver Ahora
                </button>
              </div>
            </article>
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-slate-900">
              <div className="w-12 h-12 border-4 border-[#00FBFF] border-t-transparent rounded-full animate-spin"></div>
            </div>
          )}
        </section>

        {/* SUBSCRIPTION CARD */}
        <section className="mb-12 bg-black/60 backdrop-blur-md p-6 rounded-[15px] flex flex-col md:flex-row items-center justify-between gap-6 border border-[#FF00FF]/50 shadow-[0_0_20px_rgba(255,0,255,0.2)] hover:shadow-[0_0_35px_rgba(255,0,255,0.4)] transition-all">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-full bg-red-600 flex items-center justify-center shadow-[0_0_20px_rgba(220,38,38,0.5)] border border-red-400">
              <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="white" viewBox="0 0 16 16"><path d="M8.051 1.999h.089c.822.003 4.987.033 6.11.335a2.01 2.01 0 0 1 1.415 1.42c.101.38.172.883.22 1.402l.01.104.022.26.008.104c.065.914.073 1.77.074 1.957v.075c-.001.194-.01 1.108-.082 2.06l-.008.105-.009.104c-.05.572-.124 1.14-.235 1.558a2.007 2.007 0 0 1-1.415 1.42c-1.16.312-5.569.334-6.18.335h-.142c-.309 0-1.587-.006-2.927-.052l-.17-.006-.087-.004-.171-.007-.171-.007c-1.11-.049-2.167-.128-2.654-.26a2.007 2.007 0 0 1-1.415-1.419c-.111-.417-.185-.986-.235-1.558L.09 9.82l-.008-.104A31.4 31.4 0 0 1 0 7.68v-.123c.002-.215.01-.958.064-1.778l.007-.103.003-.052.008-.104.022-.26.01-.104c.048-.519.119-1.023.22-1.402a2.007 2.007 0 0 1 1.415-1.42c.487-.13 1.544-.21 2.654-.26l.17-.007.172-.006.086-.003.171-.007A99.788 99.788 0 0 1 7.858 2h.193zM6.4 5.209v4.818l4.157-2.408L6.4 5.209z"/></svg>
            </div>
            <div>
              <h3 className="text-xl font-bold text-white uppercase tracking-wider drop-shadow-[0_0_5px_#FF00FF]">Academia TV</h3>
              <p className="text-gray-300 text-xs font-light">Tutoriales, Tips y Cultura Vial Semanal</p>
            </div>
          </div>
          <button 
            onClick={() => window.open('https://www.youtube.com/@AcademiadeConducción?sub_confirmation=1', '_blank')}
            className="px-6 py-3 bg-[#FF00FF] hover:bg-[#D900D9] text-white font-bold rounded-[12px] shadow-[0_0_20px_#FF00FF] hover:shadow-[0_0_40px_#FF00FF] transition-all animate-pulse uppercase text-sm tracking-widest flex items-center gap-2 border border-white/20"
          >
            Suscribirse GRATIS
          </button>
        </section>

        {/* LIST: Novedades */}
        <section className="mb-10 px-2">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-1 h-8 bg-[#00FBFF] shadow-[0_0_15px_#00FBFF]"></div>
            <h2 className="text-2xl font-bold text-white uppercase tracking-widest drop-shadow-[0_0_5px_rgba(0,251,255,0.5)]">
              Novedades <span className="text-[#00FBFF]">Viales</span>
            </h2>
          </div>
          <div className="flex overflow-x-auto pb-12 pt-4 gap-6 scrollbar-hide">
            {newsVideos.map(video => <VideoCard key={video.id} video={video} onPlay={handlePlayVideo} />)}
            {loading && Array(3).fill(0).map((_, i) => (
               <div key={i} className="flex-shrink-0 w-80 h-48 bg-slate-800/50 rounded-[15px] animate-pulse border border-white/5"></div>
            ))}
          </div>
        </section>

        {/* LIST: Academia */}
        <section className="px-2">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-1 h-8 bg-[#FF00FF] shadow-[0_0_15px_#FF00FF]"></div>
            <h2 className="text-2xl font-bold text-white uppercase tracking-widest drop-shadow-[0_0_5px_rgba(255,0,255,0.5)]">
              Clases <span className="text-[#FF00FF]">Maestras</span>
            </h2>
          </div>
          <div className="flex overflow-x-auto pb-12 pt-4 gap-6 scrollbar-hide">
            {academyVideos.map(video => <VideoCard key={video.id} video={video} onPlay={handlePlayVideo} />)}
            {loading && Array(3).fill(0).map((_, i) => (
               <div key={i} className="flex-shrink-0 w-80 h-48 bg-slate-800/50 rounded-[15px] animate-pulse border border-white/5"></div>
            ))}
          </div>
        </section>
      </div>

      {/* RENDERIZADO DEL MODAL */}
      <VideoModal 
        videoId={selectedVideoId} 
        videoTitle={selectedVideoTitle} 
        onClose={() => { setSelectedVideoId(null); setSelectedVideoTitle(null); }} 
      />
    </>
  );
};

export default PlayVial;
