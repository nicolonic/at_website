import { useState } from 'react';
import { tokens } from '../../tokens.js';
import { LazyImage } from '../shared/LazyMedia.jsx';

function LogoImage({ logo }) {
  const [imgSrc, setImgSrc] = useState(logo.src);
  const [showFallback, setShowFallback] = useState(false);

  const handleError = () => {
    if (logo.fallback && imgSrc !== logo.fallback) {
      // Try fallback URL
      setImgSrc(logo.fallback);
    } else {
      // Show text fallback
      setShowFallback(true);
    }
  };

  if (showFallback) {
    return (
      <div className="flex items-center justify-center bg-slate-100 rounded px-3 py-1.5">
        <span className="text-xs sm:text-sm text-slate-600 font-semibold">
          {logo.alt}
        </span>
      </div>
    );
  }

  return (
    <LazyImage
      src={imgSrc}
      alt={logo.alt}
      className="max-h-full w-auto max-w-[120px] sm:max-w-[100px] object-contain filter grayscale opacity-60 hover:opacity-90 hover:grayscale-0 transition-all duration-300"
      style={{
        filter: 'grayscale(100%) contrast(0.9)',
        mixBlendMode: 'multiply'
      }}
      onError={handleError}
    />
  );
}

export default function LogoStrip() {
  return (
    <section 
      id="logos-section"
      className="py-8 sm:py-12 bg-gradient-to-b from-slate-50/30 to-white"
      aria-labelledby="partners-heading"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6 sm:gap-8 items-center justify-items-center">
          {tokens.logos.map((logo, index) => (
            <div 
              key={index}
              className="flex items-center justify-center w-full h-12 sm:h-10 px-2 sm:px-4"
            >
              <LogoImage logo={logo} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}