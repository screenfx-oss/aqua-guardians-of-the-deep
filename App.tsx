
import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { FishIdentifier } from './components/FishIdentifier';
import { FishResultCard } from './components/FishResultCard';
import { ScrapbookView } from './components/ScrapbookView';
import { Loader } from './components/Loader';
import { identifyFish } from './services/geminiService';
import { fileToBase64 } from './utils/imageUtils';
import type { FishData, AppView } from './types';

const App: React.FC = () => {
  const [view, setView] = useState<AppView>('identifier');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [currentFish, setCurrentFish] = useState<FishData | null>(null);
  const [scrapbook, setScrapbook] = useState<FishData[]>([]);

  useEffect(() => {
    try {
      const savedScrapbook = localStorage.getItem('scrapbook');
      if (savedScrapbook) {
        setScrapbook(JSON.parse(savedScrapbook));
      }
    } catch (e) {
      console.error("Failed to load scrapbook from localStorage", e);
    }
  }, []);
  
  useEffect(() => {
    try {
      localStorage.setItem('scrapbook', JSON.stringify(scrapbook));
    } catch (e) {
      console.error("Failed to save scrapbook to localStorage", e);
    }
  }, [scrapbook]);

  const handleIdentifyFish = async (file: File) => {
    setIsLoading(true);
    setError(null);
    setCurrentFish(null);

    try {
      const { base64Data, mimeType } = await fileToBase64(file);
      const result = await identifyFish(base64Data, mimeType);
      
      const newFish: FishData = {
        ...result,
        id: `${result.fishName}-${new Date().getTime()}`,
        imageDataUrl: `data:${mimeType};base64,${base64Data}`
      };
      
      setCurrentFish(newFish);
      setView('result');

    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An unknown error occurred.';
      setError(errorMessage);
      setView('identifier');
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddToScrapbook = () => {
    if (currentFish && !scrapbook.some(item => item.fishName === currentFish.fishName)) {
      setScrapbook(prev => [...prev, currentFish]);
    }
    setView('scrapbook');
  };

  const handleReset = () => {
    setCurrentFish(null);
    setError(null);
    setView('identifier');
  };

  const renderContent = () => {
    if (isLoading) {
      return <Loader />;
    }
    
    switch (view) {
      case 'identifier':
        return <FishIdentifier onIdentify={handleIdentifyFish} error={error} />;
      case 'result':
        return currentFish && (
          <FishResultCard 
            fish={currentFish} 
            onAddToScrapbook={handleAddToScrapbook} 
            onGoBack={handleReset} 
          />
        );
      case 'scrapbook':
        return <ScrapbookView scrapbook={scrapbook} />;
      default:
        return <FishIdentifier onIdentify={handleIdentifyFish} error={error} />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-ocean-deep to-ocean-light text-white flex flex-col items-center p-4 selection:bg-seafoam selection:text-ocean-deep">
      <div className="w-full max-w-4xl mx-auto">
        <Header currentView={view} setView={setView} />
        <main className="mt-8">
          {renderContent()}
        </main>
        <footer className="text-center p-4 mt-8 text-cyan-200 opacity-70">
          <p>Made with ❤️ for SDG 14: Life Below Water.</p>
        </footer>
      </div>
    </div>
  );
};

export default App;
