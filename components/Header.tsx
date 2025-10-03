
import React from 'react';
import { AppView } from '../types';
import { FishIcon, BookIcon } from './Icons';

interface HeaderProps {
  currentView: AppView;
  setView: (view: AppView) => void;
}

export const Header: React.FC<HeaderProps> = ({ currentView, setView }) => {
  const getButtonClass = (view: AppView) => {
    const baseClass = "flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-300 font-semibold";
    if (currentView === view) {
      return `${baseClass} bg-seafoam text-ocean-deep shadow-lg`;
    }
    return `${baseClass} bg-ocean-light hover:bg-seafoam/80 hover:text-ocean-deep`;
  };

  return (
    <header className="flex justify-between items-center bg-ocean-deep/50 backdrop-blur-sm p-4 rounded-xl shadow-2xl sticky top-4 z-10">
      <div className="flex items-center gap-3">
        <div className="w-12 h-12 text-seafoam animate-float">
          <FishIcon />
        </div>
        <h1 className="text-xl md:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-seafoam to-cyan-300">
          Aqua-Quest
        </h1>
      </div>
      <nav className="flex gap-2">
        <button onClick={() => setView('identifier')} className={getButtonClass('identifier')}>
          <FishIcon className="w-5 h-5" />
          <span className="hidden sm:inline">Identify</span>
        </button>
        <button onClick={() => setView('scrapbook')} className={getButtonClass('scrapbook')}>
          <BookIcon className="w-5 h-5" />
          <span className="hidden sm:inline">Scrapbook</span>
        </button>
      </nav>
    </header>
  );
};
