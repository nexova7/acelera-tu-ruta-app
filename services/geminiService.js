
import { GoogleGenAI } from "@google/genai";

const apiKey = process.env.API_KEY || '';
const ai = new GoogleGenAI({ apiKey });

export const generateBlogTip = async (topic) => {
  if (!apiKey) {
    return "Error: API Key no configurada.";
  }

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Escribe un consejo corto, útil y motivador para estudiantes de conducción en Colombia sobre: "${topic}". Máximo 50 palabras. Tono profesional pero cercano.`,
      config: {
        temperature: 0.7,
      }
    });

    return response.text || "No se pudo generar el consejo.";
  } catch (error) {
    console.error("Error generating content:", error);
    return "Error al conectar con la IA de Acelera Tu Ruta.";
  }
};
