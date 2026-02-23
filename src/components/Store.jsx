import React, { useState } from 'react';
import { WHATSAPP_NUMBER, PRODUCTS, STORE_CATEGORIES } from '../constants';

const Store = () => {
    const [filter, setFilter] = useState('TODOS');
    const filteredItems = filter === 'TODOS' ? PRODUCTS : PRODUCTS.filter(i => i.category === filter);

    const Card = ({ item }) => (
        <div className="glass rounded-xl overflow-hidden relative group hover:-translate-y-3 transition-transform duration-300 border border-neon-cyan">
            <div className="absolute top-0 right-0 bg-neon-magenta text-white text-[9px] md:text-[10px] font-bold px-3 py-1 rounded-bl-xl z-20 shadow-[0_0_10px_#FF00FF]">REF: {item.ref}</div>
            {item.img && (
                <div className="aspect-square bg-gray-900 relative overflow-hidden border border-neon-cyan/50 shadow-[0_0_10px_rgba(0,251,255,0.2)] rounded-lg mx-2 md:mx-4 mt-2 md:mt-4">
                    <img src={item.img} alt={item.name} className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-110 transition-all duration-500" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent"></div>
                </div>
            )}
            <div className="p-3 md:p-6">
                <span className="text-[9px] md:text-[10px] font-bold text-neon-cyan border border-neon-cyan/50 px-2 py-0.5 rounded mb-2 inline-block shadow-[0_0_5px_rgba(0,251,255,0.3)]">{item.category}</span>
                <h3 className="text-sm md:text-xl font-black text-white uppercase leading-tight mb-2 group-hover:text-neon-cyan transition-colors line-clamp-2">{item.name}</h3>
                {item.price && <div className="text-lg md:text-2xl font-bold text-neon-magenta mb-3 drop-shadow-[0_0_5px_#FF00FF]">${item.price.toLocaleString()}</div>}
                <p className="text-gray-400 text-[10px] md:text-xs line-clamp-2 mb-4 font-light hidden md:block">{item.desc}</p>
                <button onClick={() => window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=Info sobre ${item.name} REF:${item.ref}`, '_blank')} className="w-full py-2 md:py-3 bg-transparent border-2 border-neon-cyan/50 hover:border-neon-cyan hover:bg-neon-cyan/10 hover:text-neon-cyan text-gray-300 text-[10px] md:text-xs font-bold uppercase tracking-widest rounded transition-all shadow-none hover:shadow-[0_0_20px_#00FBFF]">COMPRAR</button>
            </div>
        </div>
    );

    return (
        <div className="container mx-auto px-4 py-8 md:py-12 pb-24 animate-fade-in flex flex-col md:flex-row gap-8 max-w-[1200px] pt-4 md:pt-12">
            <aside className="hidden md:block w-72 flex-shrink-0">
                <div className="glass p-8 rounded-xl sticky top-28 border-l-4 border-neon-cyan shadow-[0_0_20px_rgba(0,251,255,0.1)]">
                    <h3 className="text-xl font-black text-white mb-8 uppercase tracking-widest drop-shadow-[0_0_5px_#fff]">CATEGORÍAS</h3>
                    <div className="space-y-3">
                        {STORE_CATEGORIES.map(cat => (
                            <button key={cat} onClick={() => setFilter(cat)} className={`w-full text-left px-4 py-3 rounded text-sm font-bold transition-all uppercase tracking-wide ${filter === cat ? 'bg-neon-cyan text-black shadow-[0_0_15px_#00FBFF]' : 'text-gray-400 hover:text-white hover:bg-white/5'}`}>{cat}</button>
                        ))}
                    </div>
                </div>
            </aside>
            <div className="md:hidden overflow-x-auto pb-4 scrollbar-hide flex gap-3">
                {STORE_CATEGORIES.map(cat => (
                    <button key={cat} onClick={() => setFilter(cat)} className={`px-6 py-2 rounded-full text-[10px] font-bold whitespace-nowrap border-2 ${filter === cat ? 'bg-neon-cyan text-black border-neon-cyan shadow-[0_0_15px_#00FBFF]' : 'border-gray-800 text-gray-400 bg-black/50'}`}>{cat}</button>
                ))}
            </div>
            <div className="flex-1">
                <div className="flex items-center justify-between mb-4 md:mb-8 border-b border-gray-800 pb-4">
                    <h2 className="text-2xl md:text-4xl font-black italic text-white uppercase drop-shadow-[0_0_10px_#00FBFF]">TIENDA OFICIAL</h2>
                    <span className="text-[10px] md:text-xs font-bold text-black bg-neon-cyan px-2 md:px-3 py-1 rounded shadow-[0_0_10px_#00FBFF]">{filteredItems.length} ITEMS</span>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6 px-4">
                    {filteredItems.map(item => <Card key={item.id} item={item} />)}
                </div>
            </div>
        </div>
    );
};

export default Store;
