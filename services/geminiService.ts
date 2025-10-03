
import { GoogleGenAI, Type } from "@google/genai";
import type { GeminiFishResponse, GeminiErrorResponse } from '../types';

if (!process.env.API_KEY) {
    throw new Error("API_KEY environment variable not set");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const responseSchema = {
  type: Type.OBJECT,
  properties: {
    error: { type: Type.STRING, nullable: true },
    fishName: { type: Type.STRING, nullable: true },
    description: { type: Type.STRING, nullable: true },
    threats: { type: Type.ARRAY, items: { type: Type.STRING }, nullable: true },
    solutions: { type: Type.ARRAY, items: { type: Type.STRING }, nullable: true },
  },
};

export const identifyFish = async (base64Data: string, mimeType: string): Promise<GeminiFishResponse> => {
  const imagePart = {
    inlineData: {
      data: base64Data,
      mimeType: mimeType,
    },
  };

  const textPart = {
    text: `Identify the primary fish in this image. If it's not a fish or the image is unclear, respond with an error structure: {"error": "Could not identify a fish in the image. Please try another one."}. Otherwise, provide the fish's common name, a brief and fascinating description (1-2 sentences), a list of 2-3 main threats it faces, and a list of 2-3 actionable conservation solutions. Respond strictly in the JSON format.`
  };

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: { parts: [imagePart, textPart] },
      config: {
        responseMimeType: "application/json",
        responseSchema: responseSchema,
      },
      systemInstruction: "You are an expert marine biologist. Your goal is to identify fish from images and provide concise, accurate information about them for an educational game about ocean conservation (SDG 14). Respond ONLY in valid JSON format according to the provided schema."
    });

    const jsonText = response.text.trim();
    const parsedJson: GeminiFishResponse | GeminiErrorResponse = JSON.parse(jsonText);

    if ('error' in parsedJson && parsedJson.error) {
        throw new Error(parsedJson.error);
    }
    
    if ('fishName' in parsedJson && parsedJson.fishName) {
        return parsedJson as GeminiFishResponse;
    }
    
    throw new Error("Invalid response format from API.");

  } catch (error) {
    console.error("Error identifying fish:", error);
    if (error instanceof Error) {
        throw new Error(`Failed to identify fish: ${error.message}`);
    }
    throw new Error("An unknown error occurred while communicating with the AI service.");
  }
};
