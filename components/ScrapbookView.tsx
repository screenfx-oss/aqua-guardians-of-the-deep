
import React, { useState } from 'react';
import type { FishData } from '../types';
import { FishResultCard } from './FishResultCard';

interface ScrapbookViewProps {
  scrapbook: FishData[];
}

const ScrapbookEntry: React.FC<{ fish: FishData; onClick: () => void }> = ({ fish, onClick }) => (
  <div 
    className="group relative aspect-square bg-ocean-light rounded-lg shadow-lg overflow-hidden cursor-pointer transform hover:scale-105 hover:shadow-2xl transition-all duration-300"
    onClick={onClick}
  >
    <img src={fish.imageDataUrl} alt={fish.fishName} className="w-full h-full object-cover group-hover:opacity-80 transition-opacity" />
    <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex items-end p-4">
      <h3 className="text-white text-lg font-bold font-handwriting transform group-hover:-translate-y-1 transition-transform">{fish.fishName}</h3>
    </div>
  </div>
);

const Modal: React.FC<{ isOpen: boolean; onClose: () => void; children: React.ReactNode }> = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4" onClick={onClose}>
      <div className="w-full max-w-4xl" onClick={(e) => e.stopPropagation()}>
        {children}
      </div>
    </div>
  );
};

export const ScrapbookView: React.FC<ScrapbookViewProps> = ({ scrapbook }) => {
  const [selectedFish, setSelectedFish] = useState<FishData | null>(null);

  const openModal = (fish: FishData) => {
    setSelectedFish(fish);
  };

  const closeModal = () => {
    setSelectedFish(null);
  };

  if (scrapbook.length === 0) {
    return (
      <div className="text-center p-8 bg-ocean-deep/50 rounded-2xl shadow-lg border border-ocean-light">
        <h2 className="text-2xl font-bold text-seafoam">Your Scrapbook is Empty</h2>
        <p className="mt-2 text-cyan-200">Start your underwater adventure by identifying a fish!</p>
      </div>
    );
  }

  return (
    <div>
      <h2 className="text-3xl font-bold text-seafoam mb-6 text-center">My Discoveries</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {scrapbook.map(fish => (
          <ScrapbookEntry key={fish.id} fish={fish} onClick={() => openModal(fish)} />
        ))}
      </div>
      <Modal isOpen={!!selectedFish} onClose={closeModal}>
        {selectedFish && <FishResultCard fish={selectedFish} onAddToScrapbook={() => {}} onGoBack={() => {}} isModal={true} />}
      </Modal>
    </div>
  );
};
