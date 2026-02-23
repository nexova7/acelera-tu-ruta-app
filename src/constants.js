// --- CONFIGURACIÓN GENERAL ---
export const WHATSAPP_NUMBER = "573027221223";
export const YOUTUBE_SUB_URL = "https://www.youtube.com/@AcademiadeConducción?sub_confirmation=1";

// --- VIDEOS Y PLAYLISTS ---
export const PLAYLISTS = {
  HERO: 'PLFGc5-h0rSHHFf0Lui3wT1qBBrZVTbOPj',
  NOVEDADES: 'PLFGc5-h0rSHGcm1LoAEcu3Ayg1ESapMRt',
  ACADEMIA: 'PLFGc5-h0rSHFRIRgvByJbus9V-ZfKRqYG'
};

// --- TIENDA ---
export const STORE_CATEGORIES = ['TODOS', 'CHAQUETAS', 'IMPLEMENTOS', 'HERRAMIENTAS'];

export const PRODUCTS = [
  {
    id: 1,
    name: "CHAQUETA REFLECTIVA THERMAL",
    price: 80000,
    category: "CHAQUETAS",
    img: "https://images.unsplash.com/photo-1551028919-ac66c5f80149?auto=format&fit=crop&w=600",
    desc: "Visibilidad total nocturna.",
    ref: "CHK-01"
  },
  {
    id: 2,
    name: "GUANTES TÁCTICOS VIALES",
    price: 85000,
    category: "IMPLEMENTOS",
    img: "https://images.unsplash.com/photo-1589782182703-2aaa69037b5b?auto=format&fit=crop&w=600",
    desc: "Protección de nudillos.",
    ref: "GLV-X"
  },
  {
    id: 3,
    name: "IMPERMEABLE ACELERA",
    price: 95000,
    category: "IMPLEMENTOS",
    img: "https://images.unsplash.com/photo-1620799140408-ed5341cd2431?auto=format&fit=crop&w=600",
    desc: "100% seco bajo la lluvia.",
    ref: "IMP-PRO"
  },
  {
    id: 4,
    name: "CASCO CERTIFICADO DOT",
    price: 320000,
    category: "IMPLEMENTOS",
    img: "https://images.unsplash.com/photo-1557804506-669a67965ba0?auto=format&fit=crop&w=600",
    desc: "Seguridad y aerodinámica.",
    ref: "HLM-05"
  },
  {
    id: 5,
    name: "KIT DESVARE MOTERO",
    price: 45000,
    category: "HERRAMIENTAS",
    img: "https://images.unsplash.com/photo-1581235720704-06d3acfcb36f?auto=format&fit=crop&w=600",
    desc: "No te quedes varado.",
    ref: "KIT-TOOL"
  },
];

// --- CURSOS Y LICENCIAS ---
export const MANDATORY_FEATURES = [
  "Certificado de Aptitud",
  "Exámenes Médicos",
  "Clases Prácticas Personalizadas"
];

export const COURSES_DATA = [
  {
    id: 'A2',
    title: 'CATEGORÍA A2',
    type: 'NEW',
    ref: 'LIC-A2',
    hours: { theory: 26, workshop: 3, driving: 15 }
  },
  {
    id: 'B1',
    title: 'CATEGORÍA B1',
    type: 'NEW',
    ref: 'LIC-B1',
    hours: { theory: 26, workshop: 6, driving: 20 }
  },
  {
    id: 'C1',
    title: 'CATEGORÍA C1',
    type: 'NEW',
    ref: 'LIC-C1',
    hours: { theory: 30, workshop: 6, driving: 30 }
  },
  {
    id: 'REC-B1-C1',
    title: 'RECATEGORIZACIÓN B1 A C1',
    type: 'REC',
    ref: 'REC-B1-C1',
    hours: { theory: 6, driving: 10 }
  },
  {
    id: 'REC-C1-C2',
    title: 'RECATEGORIZACIÓN C1 A C2',
    type: 'REC',
    ref: 'REC-C1-C2',
    hours: { theory: 20, workshop: 10, driving: 15 }
  },
  {
    id: 'REF',
    title: 'REFRENDACIÓN',
    type: 'REC',
    ref: 'REF-ALL',
    hours: null
  }
];
