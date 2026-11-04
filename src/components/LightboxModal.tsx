import React, { useEffect } from 'react';
import { X, ZoomIn, ZoomOut, Download, ExternalLink } from 'lucide-react';

interface LightboxModalProps {
  imageUrl: string | null;
  title: string;
  onClose: () => void;
}

export const LightboxModal: React.FC<LightboxModalProps> = ({
  imageUrl,
  title,
  onClose,
}) => {
  const [zoom, setZoom] = React.useState(1);

  useEffect(() => {
    setZoom(1);
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [imageUrl, onClose]);

  if (!imageUrl) return null;

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-60 bg-black/95 backdrop-blur-md flex flex-col items-center justify-between p-4 sm:p-6 animate-in fade-in duration-200"
    >
      {/* Lightbox Header */}
      <div 
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-6xl flex items-center justify-between text-white py-2"
      >
        <div className="flex items-center gap-3">
          <div className="w-2.5 h-2.5 rounded-full bg-blue-500"></div>
          <span className="font-semibold text-sm sm:text-base line-clamp-1">{title}</span>
          <span className="text-xs text-slate-400 hidden sm:inline">(100% Uncropped View)</span>
        </div>

        <div className="flex items-center gap-2">
          {/* Zoom controls */}
          <button
            onClick={() => setZoom((z) => Math.min(z + 0.25, 2.5))}
            className="p-2 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
            title="Zoom In"
          >
            <ZoomIn className="w-4 h-4" />
          </button>
          <button
            onClick={() => setZoom((z) => Math.max(z - 0.25, 0.75))}
            className="p-2 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
            title="Zoom Out"
          >
            <ZoomOut className="w-4 h-4" />
          </button>

          {/* Open original */}
          <a
            href={imageUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors"
            title="Open full resolution in new tab"
          >
            <ExternalLink className="w-4 h-4" />
          </a>

          {/* Close */}
          <button
            onClick={onClose}
            className="p-2 rounded-lg bg-white/20 hover:bg-rose-600 text-white transition-colors ml-2 cursor-pointer"
            title="Close Lightbox"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Main Image Stage */}
      <div 
        onClick={(e) => e.stopPropagation()}
        className="relative flex-1 w-full max-w-6xl flex items-center justify-center overflow-hidden my-auto"
      >
        <img
          src={imageUrl}
          alt={title}
          style={{
            objectFit: 'contain',
            transform: `scale(${zoom})`,
            transition: 'transform 0.2s ease-out',
          }}
          className="max-w-full max-h-[82vh] w-auto h-auto object-contain select-none"
        />
      </div>

      {/* Footer Info */}
      <div 
        onClick={(e) => e.stopPropagation()}
        className="text-center text-xs text-slate-400 py-1"
      >
        <span>Zero cropping applied &bull; Original proportions preserved &bull; Zoom: {Math.round(zoom * 100)}%</span>
      </div>
    </div>
  );
};
