
import { YouTubeVideo } from "../types";

// API KEY Configurada
const API_KEY = 'AIzaSyBixqRxYreRCWjK5QZ6IRUQj56Ta7LaO8Q'; 

const PLAYLIST_IDS = {
  FEATURED: 'PLFGc5-h0rSHHFf0Lui3wT1qBBrZVTbOPj', // Hero/Destacado
  NEWS: 'PLFGc5-h0rSHGcm1LoAEcu3Ayg1ESapMRt',     // Novedades
  ACADEMY: 'PLFGc5-h0rSHFRIRgvByJbus9V-ZfKRqYG'  // Academia
};

// Fallback data in case API fails or quota is exceeded
const MOCK_VIDEOS: Record<string, YouTubeVideo[]> = {
  FEATURED: [
    {
      id: 'mock1',
      title: 'MEJORA TU CONDUCCIÓN EN 5 MINUTOS | TÉCNICAS AVANZADAS',
      thumbnail: 'https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?q=80&w=1000&auto=format&fit=crop',
      publishedAt: new Date().toISOString(),
      description: 'Aprende a dominar el embrague y los frenos como un profesional.',
      isUpcoming: false
    }
  ],
  NEWS: [
    {
      id: 'mock2',
      title: 'NUEVAS TARIFAS RUNT 2024',
      thumbnail: 'https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?q=80&w=600&auto=format&fit=crop',
      publishedAt: new Date().toISOString(),
      description: 'Todo lo que necesitas saber sobre los cambios de precios.',
      isUpcoming: false
    }
  ],
  ACADEMY: [
    {
      id: 'mock4',
      title: 'CLASE 1: CONOCIENDO TU VEHÍCULO',
      thumbnail: 'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?q=80&w=600&auto=format&fit=crop',
      publishedAt: '2023-05-15T00:00:00Z',
      description: 'Partes básicas y ergonomía al volante.',
      isUpcoming: false
    }
  ]
};

export const fetchPlaylistVideos = async (playlistType: keyof typeof PLAYLIST_IDS): Promise<YouTubeVideo[]> => {
  if (!API_KEY) {
    console.warn("API Key is missing, using mock data.");
    return new Promise((resolve) => {
      setTimeout(() => resolve(MOCK_VIDEOS[playlistType] || []), 500);
    });
  }

  try {
    const playlistId = PLAYLIST_IDS[playlistType];
    const response = await fetch(
      `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&maxResults=10&playlistId=${playlistId}&key=${API_KEY}`
    );
    
    if (!response.ok) throw new Error(`YouTube API Error: ${response.statusText}`);
    
    const data = await response.json();
    
    if (!data.items) return MOCK_VIDEOS[playlistType] || [];

    return data.items.map((item: any) => ({
      id: item.snippet.resourceId.videoId,
      title: item.snippet.title,
      thumbnail: item.snippet.thumbnails.maxres?.url || item.snippet.thumbnails.high?.url || item.snippet.thumbnails.medium?.url,
      publishedAt: item.snippet.publishedAt,
      description: item.snippet.description,
      isUpcoming: item.snippet.liveBroadcastContent === 'upcoming'
    }));
  } catch (error) {
    console.error("YouTube API Error:", error);
    // Fallback to mock if API fails
    return MOCK_VIDEOS[playlistType] || [];
  }
};
