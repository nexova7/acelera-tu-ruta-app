import React, { useState, useEffect } from 'react';
import { INITIAL_BLOG_POSTS } from '../../constants';
import { BlogPost } from '../../types';
import { generateBlogTip } from '../../services/geminiService';

const Blog: React.FC = () => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [isAdmin, setIsAdmin] = useState(false);
  const [newPostTitle, setNewPostTitle] = useState('');
  const [newPostContent, setNewPostContent] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);

  useEffect(() => {
    // Load from local storage or fall back to constants
    const stored = localStorage.getItem('acelera_blog_posts');
    if (stored) {
      setPosts(JSON.parse(stored));
    } else {
      setPosts(INITIAL_BLOG_POSTS);
    }
  }, []);

  const savePosts = (newPosts: BlogPost[]) => {
    setPosts(newPosts);
    localStorage.setItem('acelera_blog_posts', JSON.stringify(newPosts));
  };

  const handleDelete = (id: string) => {
    if (window.confirm('¿Eliminar este artículo?')) {
      const updated = posts.filter(p => p.id !== id);
      savePosts(updated);
    }
  };

  const handleCreate = () => {
    if (!newPostTitle || !newPostContent) return;
    const newPost: BlogPost = {
      id: Date.now().toString(),
      title: newPostTitle,
      content: newPostContent,
      date: new Date().toISOString().split('T')[0],
      author: 'Claudia'
    };
    savePosts([newPost, ...posts]);
    setNewPostTitle('');
    setNewPostContent('');
  };

  const handleGenerateAI = async () => {
    if (!newPostTitle) {
      alert("Escribe un título o tema primero para que la IA genere el contenido.");
      return;
    }
    setIsGenerating(true);
    const content = await generateBlogTip(newPostTitle);
    setNewPostContent(content);
    setIsGenerating(false);
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-4 animate-fade-in pb-24">
      <div className="flex justify-between items-center mb-8 border-b border-fuchsia-500/30 pb-4">
        <h2 className="text-3xl font-bold text-fuchsia-400 uppercase tracking-widest drop-shadow-[0_0_8px_rgba(217,70,239,0.8)]">
          Blog Vial
        </h2>
        <button
          onClick={() => setIsAdmin(!isAdmin)}
          className={`text-xs px-3 py-1 rounded-full border transition-all ${isAdmin ? 'bg-fuchsia-900 border-fuchsia-500 text-white shadow-[0_0_10px_#d946ef]' : 'border-gray-700 text-gray-500 hover:text-gray-300 hover:border-gray-500'}`}
        >
          {isAdmin ? 'Salir Modo Editor' : 'Acceso Admin'}
        </button>
      </div>

      {isAdmin && (
        <div className="mb-10 glass-panel border border-fuchsia-500/50 p-6 rounded-xl shadow-[0_0_20px_rgba(217,70,239,0.15)] animate-fade-in">
          <h3 className="text-white font-bold mb-4 flex items-center">
            <span className="w-2 h-2 bg-fuchsia-500 rounded-full mr-2 animate-pulse"></span>
            Crear Nuevo Artículo
          </h3>
          <input
            type="text"
            placeholder="Título o Tema (Ej: Seguridad en Lluvia)"
            className="w-full bg-black/50 border border-gray-700 text-white p-3 rounded-lg mb-4 focus:border-fuchsia-500 focus:shadow-[0_0_10px_rgba(217,70,239,0.3)] outline-none transition-all"
            value={newPostTitle}
            onChange={(e) => setNewPostTitle(e.target.value)}
          />
          <textarea
            placeholder="Contenido del artículo..."
            className="w-full bg-black/50 border border-gray-700 text-white p-3 rounded-lg mb-4 h-32 focus:border-fuchsia-500 focus:shadow-[0_0_10px_rgba(217,70,239,0.3)] outline-none transition-all"
            value={newPostContent}
            onChange={(e) => setNewPostContent(e.target.value)}
          />
          <div className="flex gap-4">
            <button
              onClick={handleCreate}
              className="px-6 py-2 bg-fuchsia-600 hover:bg-fuchsia-500 text-white font-bold rounded-lg transition-all shadow-[0_0_15px_rgba(217,70,239,0.4)]"
            >
              Publicar
            </button>
            <button
              onClick={handleGenerateAI}
              disabled={isGenerating}
              className="px-6 py-2 bg-cyan-900/50 border border-cyan-500/50 hover:bg-cyan-800/50 text-cyan-300 font-bold rounded-lg transition-all flex items-center gap-2 disabled:opacity-50 hover:shadow-[0_0_15px_rgba(34,211,238,0.3)]"
            >
              {isGenerating ? 'Pensando...' : '✨ Generar con IA'}
            </button>
          </div>
          <p className="text-xs text-gray-500 mt-3">* Usa la IA para completar el contenido basado en el título.</p>
        </div>
      )}

      <div className="grid gap-6">
        {posts.map((post) => (
          <article 
            key={post.id} 
            className="glass-panel border-l-4 border-l-fuchsia-500 p-6 rounded-r-xl hover:bg-slate-800/60 transition-all duration-300 hover:shadow-[0_0_20px_rgba(217,70,239,0.2)] hover:translate-x-1 relative group"
          >
            <div className="flex justify-between items-start mb-3">
              <h3 className="text-xl font-bold text-white group-hover:text-fuchsia-300 transition-colors">{post.title}</h3>
              <span className="text-xs text-cyan-400 font-mono bg-cyan-900/20 px-2 py-1 rounded border border-cyan-500/20">{post.date}</span>
            </div>
            <p className="text-gray-300 leading-relaxed text-sm md:text-base font-light">{post.content}</p>
            <div className="mt-5 flex justify-between items-center pt-4 border-t border-gray-800/50">
               <span className="text-xs text-gray-500 italic flex items-center">
                 <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" fill="currentColor" className="mr-1" viewBox="0 0 16 16">
                   <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3Zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z"/>
                 </svg>
                 {post.author}
               </span>
               {isAdmin && (
                 <button 
                   onClick={() => handleDelete(post.id)}
                   className="text-red-400 text-xs hover:text-red-300 font-bold border border-red-900/50 bg-red-900/20 px-3 py-1 rounded hover:bg-red-900/40 transition-colors"
                 >
                   ELIMINAR
                 </button>
               )}
            </div>
          </article>
        ))}
        {posts.length === 0 && (
          <div className="text-center text-gray-500 italic py-12 glass-panel rounded-xl">
            No hay artículos publicados aún.
          </div>
        )}
      </div>
    </div>
  );
};

export default Blog;
