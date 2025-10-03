
import React from 'react';

export const Loader: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center text-center p-8 text-cyan-200">
      <div className="relative w-24 h-24 mb-4">
        <div className="absolute inset-0 border-4 border-seafoam/50 rounded-full"></div>
        <div className="absolute inset-0 border-4 border-seafoam rounded-full animate-spin border-t-transparent"></div>
      </div>
      <h2 className="text-2xl font-bold animate-pulse">Discovering...</h2>
      <p className="mt-2">Our marine biologist AI is analyzing your image.</p>
    </div>
  );
};
