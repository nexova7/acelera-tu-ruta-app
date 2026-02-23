
import React, { useState } from 'react';
import { INITIAL_PRODUCTS } from '../../constants';
import { WHATSAPP_NUMBER } from '../../constants';
import { Product, ProductCategory } from '../../types';
import ProductModal from '../ProductModal';

// Componente SEO para inyectar datos estructurados (LocalBusiness + Store)
const StoreSEO: React.FC = () => {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": ["LocalBusiness", "Store"],
    "name": "Acelera Tu Ruta - Tienda y Academia",
    "image": "https://images.unsplash.com/photo-1551028919-ac66c5f80149?q=80&w=800&auto=format&fit=crop",
    "description": "Expertos en gestión de cursos de conducción, chaquetas reflectivas de diseño y accesorios exclusivos para carro y moto.",
    "telephone": `+${WHATSAPP_NUMBER}`,
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Soacha",
      "addressRegion": "Cundinamarca",
      "addressCountry": "CO"
    },
    "priceRange": "$$",
    "openingHoursSpecification": {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday"
      ],
      "opens": "08:00",
      "closes": "18:00"
    }
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  );
};

const Store: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<ProductCategory>('TODOS');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const categories: ProductCategory[] = ['TODOS', 'CHAQUETAS', 'IMPLEMENTOS', 'HERRAMIENTAS', 'OTROS'];

  const filteredProducts = selectedCategory === 'TODOS' 
    ? INITIAL_PRODUCTS 
    : INITIAL_PRODUCTS.filter(p => p.category === selectedCategory);

  // Lógica para Títulos H2 Optimizado para SEO según categoría
  const getCategoryTitle = () => {
    switch (selectedCategory) {
      case 'CHAQUETAS':
        return 'Chaquetas Reflectivas Pro';
      case 'IMPLEMENTOS':
      case 'OTROS':
        return 'Personalización para tu Vehículo';
      case 'TODOS':
        return 'Catálogo Completo de Accesorios';
      default:
        return selectedCategory;
    }
  };

  return (
    <>
      <StoreSEO />
      <div className="w-full max-w-7xl mx-auto p-4 animate-fade-in flex flex-col md:flex-row gap-8 min-h-[600px]">
        
        {/* Glassmorphism Sidebar */}
        <aside className="w-full md:w-64 flex-shrink-0">
          <div className="glass-panel rounded-xl p-5 sticky top-24 transition-all duration-300 hover:border-cyan-500/40 hover:shadow-[0_0_20px_rgba(34,211,238,0.1)]">
            <h3 className="text-xl font-bold text-white mb-6 pl-2 border-l-4 border-fuchsia-500 uppercase tracking-widest drop-shadow-[0_0_5px_#d946ef]">
              Categorías
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

            <div className="mt-8 hidden md:block p-4 bg-gradient-to-br from-fuchsia-900/30 to-black/50 rounded-lg border border-fuchsia-500/30 backdrop-blur-sm">
              <p className="text-xs text-fuchsia-200 mb-2 font-light">¿Buscas algo específico?</p>
              <button 
                onClick={() => window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=Hola,%20busco%20un%20repuesto%20específico...`, '_blank')}
                className="w-full text-xs bg-fuchsia-600 hover:bg-fuchsia-500 text-white font-bold py-2 rounded shadow-[0_0_10px_#d946ef] transition-all hover:scale-105"
              >
                Preguntar por Chat
              </button>
            </div>
          </div>
        </aside>

        {/* Main Grid Content */}
        <main className="flex-grow">
          <div className="flex justify-between items-end mb-6 border-b border-gray-800/50 pb-2">
            {/* H2 Optimizado */}
            <h2 className="text-3xl font-bold text-cyan-400 uppercase tracking-widest drop-shadow-[0_0_8px_rgba(34,211,238,0.8)]">
              {getCategoryTitle()}
            </h2>
            <span className="text-sm text-gray-400 mb-1 font-mono bg-slate-800/50 px-2 py-1 rounded">{filteredProducts.length} Items</span>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6">
            {filteredProducts.map((product) => (
              <div 
                key={product.id}
                onClick={() => setSelectedProduct(product)}
                className="group glass-panel rounded-xl overflow-hidden transition-all duration-300 hover:-translate-y-1 flex flex-col cursor-pointer electric-hover electric-border-static"
              >
                <div className="absolute top-2 right-2 z-10 flex flex-col items-end gap-1">
                  <span className="bg-black/70 backdrop-blur-md text-cyan-300 text-[10px] font-bold px-2 py-1 rounded border border-cyan-500/30 uppercase tracking-wider">
                    {product.category}
                  </span>
                  {product.reference && (
                    <span className="bg-fuchsia-900/80 backdrop-blur-md text-white text-[9px] font-mono px-2 py-1 rounded border border-fuchsia-500/30">
                      REF: {product.reference}
                    </span>
                  )}
                </div>

                <div className="aspect-square w-full overflow-hidden bg-gray-900/50 relative">
                  {/* Etiqueta IMG con ALT optimizado para SEO */}
                  <img 
                    src={product.image} 
                    alt={`Acelera-tu-ruta: ${product.name} - ${product.category === 'CHAQUETAS' ? 'Chaqueta reflectiva de diseño exclusivo' : 'Accesorio de lujo para conductor'}`}
                    loading="lazy"
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 opacity-90 group-hover:opacity-100"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
                     <button
                      className="w-full py-2 bg-cyan-500 hover:bg-cyan-400 text-black font-bold rounded shadow-[0_0_15px_#22d3ee] transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300"
                     >
                       VER OPCIONES
                     </button>
                  </div>
                </div>
                
                <div className="p-4 flex flex-col flex-grow relative bg-gradient-to-b from-transparent to-slate-900/80">
                  <h3 className="text-lg font-bold text-gray-100 mb-1 leading-tight group-hover:text-cyan-300 transition-colors">{product.name}</h3>
                  <p className="text-xs text-gray-400 mb-4 line-clamp-2 font-light">{product.description}</p>
                  <div className="flex items-center justify-between mt-auto pt-3 border-t border-gray-700/50">
                    <span className="text-fuchsia-400 font-bold text-xl drop-shadow-[0_0_5px_rgba(217,70,239,0.5)]">
                      ${product.price.toLocaleString()}
                    </span>
                    <div className="w-8 h-8 rounded-full bg-slate-800/80 border border-gray-700 flex items-center justify-center group-hover:bg-fuchsia-600 group-hover:border-fuchsia-500 transition-all duration-300">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="text-gray-300 group-hover:text-white" viewBox="0 0 16 16">
                        <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"/>
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            ))}
            
            {filteredProducts.length === 0 && (
              <div className="col-span-full py-20 text-center text-gray-500 border-2 border-dashed border-gray-800/50 rounded-xl glass-panel">
                <p>No hay productos en esta categoría por el momento.</p>
              </div>
            )}
          </div>
        </main>
      </div>

      {/* MODAL ÉLITE */}
      <ProductModal product={selectedProduct} onClose={() => setSelectedProduct(null)} />
    </>
  );
};

export default Store;
