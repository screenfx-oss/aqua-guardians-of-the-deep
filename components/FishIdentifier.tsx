
import React, { useState, useRef, useCallback } from 'react';
import { UploadIcon, FishIcon } from './Icons';

interface FishIdentifierProps {
  onIdentify: (file: File) => void;
  error: string | null;
}

export const FishIdentifier: React.FC<FishIdentifierProps> = ({ onIdentify, error }) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };
  
  const handleDragOver = useCallback((event: React.DragEvent<HTMLLabelElement>) => {
    event.preventDefault();
  }, []);
  
  const handleDrop = useCallback((event: React.DragEvent<HTMLLabelElement>) => {
    event.preventDefault();
    const file = event.dataTransfer.files?.[0];
    if (file) {
        setSelectedFile(file);
        setPreviewUrl(URL.createObjectURL(file));
    }
  }, []);

  const handleIdentifyClick = () => {
    if (selectedFile) {
      onIdentify(selectedFile);
    }
  };

  const triggerFileSelect = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="bg-ocean-deep/50 p-6 md:p-8 rounded-2xl shadow-xl text-center flex flex-col items-center border border-ocean-light">
      <h2 className="text-3xl font-bold text-seafoam">Identify a Fish</h2>
      <p className="mt-2 text-cyan-200 max-w-lg">Upload a photo of a fish to learn about its species, the challenges it faces, and how we can help protect it.</p>
      
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept="image/*"
        className="hidden"
      />

      {previewUrl ? (
        <div className="mt-6 w-full max-w-sm flex flex-col items-center">
            <img src={previewUrl} alt="Selected fish" className="rounded-lg shadow-lg max-h-64 object-contain" />
            <button onClick={handleIdentifyClick} className="mt-4 bg-coral text-white font-bold py-3 px-6 rounded-lg hover:bg-coral/90 transition-transform transform hover:scale-105 shadow-lg flex items-center gap-2">
              <FishIcon className="w-6 h-6" /> Discover This Fish
            </button>
            <button onClick={triggerFileSelect} className="mt-2 text-cyan-300 hover:text-seafoam transition">Choose a different image</button>
        </div>
      ) : (
        <label 
            className="mt-6 w-full max-w-lg h-64 border-2 border-dashed border-ocean-light rounded-2xl flex flex-col justify-center items-center cursor-pointer hover:border-seafoam hover:bg-ocean-light/30 transition-colors"
            onDragOver={handleDragOver}
            onDrop={handleDrop}
            onClick={triggerFileSelect}
        >
          <UploadIcon className="w-16 h-16 text-ocean-light group-hover:text-seafoam transition-colors" />
          <span className="mt-2 text-lg font-semibold text-cyan-200">Click to upload or drag & drop</span>
          <span className="text-sm text-cyan-400">PNG, JPG, or WEBP</span>
        </label>
      )}

      {error && <p className="mt-4 text-coral bg-coral/10 p-3 rounded-lg">{error}</p>}
    </div>
  );
};
