
export interface FishData {
  id: string;
  fishName: string;
  description: string;
  threats: string[];
  solutions: string[];
  imageDataUrl: string;
}

export type AppView = 'identifier' | 'result' | 'scrapbook';

export interface GeminiFishResponse {
  fishName: string;
  description: string;
  threats: string[];
  solutions: string[];
}

export interface GeminiErrorResponse {
    error: string;
}
