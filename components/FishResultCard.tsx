
import React from 'react';
import type { FishData } from '../types';
import { ThreatIcon, SolutionIcon } from './Icons';

interface FishResultCardProps {
  fish: FishData;
  onAddToScrapbook: () => void;
  onGoBack: () => void;
  isModal?: boolean;
}

const InfoSection: React.FC<{ title: string; items: string[]; icon: React.ReactNode }> = ({ title, items, icon }) => (
  <div className="bg-ocean-light/50 p-4 rounded-lg">
    <h3 className="text-xl font-bold mb-3 flex items-center gap-2 text-seafoam">
      {icon}
      {title}
    </h3>
    <ul className="space-y-2 list-disc list-inside text-cyan-200">
      {items.map((item, index) => <li key={index}>{item}</li>)}
    </ul>
  </div>
);

export const FishResultCard: React.FC<FishResultCardProps> = ({ fish, onAddToScrapbook, onGoBack, isModal = false }) => {
  return (
    <div className="bg-ocean-deep/70 p-6 rounded-2xl shadow-xl border border-ocean-light backdrop-blur-md animate-fade-in">
      <div className="grid md:grid-cols-2 gap-6 items-start">
        <div className="flex flex-col items-center">
          <img src={fish.imageDataUrl} alt={fish.fishName} className="rounded-lg shadow-lg w-full max-h-80 object-cover" />
          <h2 className="text-4xl font-bold mt-4 font-handwriting text-transparent bg-clip-text bg-gradient-to-r from-sand to-coral">{fish.fishName}</h2>
          <p className="mt-2 text-center text-cyan-200">{fish.description}</p>
        </div>
        
        <div className="space-y-4">
          <InfoSection title="Threats" items={fish.threats} icon={<ThreatIcon className="w-6 h-6" />} />
          <InfoSection title="Solutions" items={fish.solutions} icon={<SolutionIcon className="w-6 h-6" />} />
        </div>
      </div>

      {!isModal && (
        <div className="mt-6 flex flex-col sm:flex-row gap-4 justify-center">
          <button onClick={onAddToScrapbook} className="bg-seafoam text-ocean-deep font-bold py-3 px-6 rounded-lg hover:bg-seafoam/90 transition-transform transform hover:scale-105 shadow-lg">
            Add to Scrapbook
          </button>
          <button onClick={onGoBack} className="bg-ocean-light text-white font-bold py-3 px-6 rounded-lg hover:bg-ocean-light/80 transition">
            Identify Another
          </button>
        </div>
      )}
    </div>
  );
};
