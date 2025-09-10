import { useState, useEffect, useRef } from 'react';

// Icon components for different recipe types
const RecipeIcons = {
  linkedin: () => (
    <svg className="w-8 h-8" viewBox="0 0 24 24" fill="#0A66C2">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
    </svg>
  ),
  instagram: () => (
    <svg className="w-8 h-8" viewBox="0 0 24 24" fill="url(#instagram-gradient)">
      <defs>
        <linearGradient id="instagram-gradient" x1="0%" y1="100%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#F58529" />
          <stop offset="50%" stopColor="#DD2A7B" />
          <stop offset="100%" stopColor="#8134AF" />
        </linearGradient>
      </defs>
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zM5.838 12a6.162 6.162 0 1 1 12.324 0 6.162 6.162 0 0 1-12.324 0zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm4.965-10.405a1.44 1.44 0 1 1 2.881.001 1.44 1.44 0 0 1-2.881-.001z"/>
    </svg>
  ),
  similar: () => (
    <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="#6B7CFF" strokeWidth="2">
      <circle cx="9" cy="9" r="4" />
      <circle cx="15" cy="15" r="4" />
      <path d="M9 13c1.5-1.5 3.5-1.5 5 0" strokeLinecap="round" />
    </svg>
  ),
  jobs: () => (
    <svg className="w-8 h-8" viewBox="0 0 24 24" fill="#4B5563">
      <path d="M20 6h-4V4c0-1.1-.9-2-2-2h-4c-1.1 0-2 .9-2 2v2H4c-1.1 0-2 .9-2 2v11c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2zM10 4h4v2h-4V4zm10 15H4V8h16v11z"/>
      <rect x="9" y="11" width="6" height="2" />
    </svg>
  ),
  tech: () => (
    <svg className="w-8 h-8" viewBox="0 0 24 24" fill="#10B981">
      <path d="M10.5 13.5L8.5 15.5L7.5 14.5L9.5 12.5L7.5 10.5L8.5 9.5L10.5 11.5L12.5 9.5L13.5 10.5L11.5 12.5L13.5 14.5L12.5 15.5L10.5 13.5Z"/>
      <path d="M20 4H4C2.9 4 2 4.9 2 6V18C2 19.1 2.9 20 4 20H20C21.1 20 22 19.1 22 18V6C22 4.9 21.1 4 20 4ZM20 18H4V8H20V18Z"/>
      <circle cx="17" cy="12" r="1.5" />
    </svg>
  ),
  funding: () => (
    <svg className="w-8 h-8" viewBox="0 0 24 24" fill="#F59E0B">
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1.41 16.09V20h-2.67v-1.93c-1.71-.36-3.16-1.46-3.27-3.4h1.96c.1.93.66 1.64 2.08 1.64 1.51 0 2.1-.6 2.1-1.39 0-.82-.44-1.34-2.37-1.83-2.06-.53-3.44-1.42-3.44-3.21 0-1.51 1.22-2.78 2.94-3.12V5h2.67v1.71c1.63.39 2.75 1.48 2.85 3.39h-1.96c-.05-.94-.39-1.61-1.59-1.61-1.19 0-1.74.61-1.74 1.34 0 .71.42 1.2 2.28 1.71 2.17.6 3.57 1.51 3.57 3.39 0 1.63-1.29 2.92-3.41 3.16z"/>
    </svg>
  )
};

export default function RecipeCarousel({ recipes, isActive }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const intervalRef = useRef(null);

  // Auto-rotate recipes
  useEffect(() => {
    if (!isActive || isPaused || !recipes || recipes.length === 0) {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
      return;
    }

    intervalRef.current = setInterval(() => {
      setCurrentIndex(prev => (prev + 1) % recipes.length);
    }, 3000); // Change every 3 seconds

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isActive, isPaused, recipes]);

  if (!recipes || recipes.length === 0) {
    return null;
  }

  // Calculate visible cards (current, next, and previous)
  const getVisibleRecipes = () => {
    const prev = (currentIndex - 1 + recipes.length) % recipes.length;
    const next = (currentIndex + 1) % recipes.length;
    return [prev, currentIndex, next];
  };

  const visibleIndices = getVisibleRecipes();

  return (
    <div 
      className="w-full h-full flex items-center justify-center bg-white py-4 px-8 relative overflow-hidden"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="relative w-full max-w-5xl">
        {/* Progress dots */}
        <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 flex gap-2">
          {recipes.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`h-1.5 rounded-full transition-all duration-500 ${
                index === currentIndex 
                  ? 'bg-slate-900 w-8' 
                  : 'bg-slate-300 hover:bg-slate-400 w-1.5'
              }`}
              aria-label={`Go to recipe ${index + 1}`}
            />
          ))}
        </div>

        {/* Carousel container */}
        <div className="relative h-[220px] flex items-center justify-center">
          {recipes.map((recipe, index) => {
            const isVisible = visibleIndices.includes(index);
            const isCurrent = index === currentIndex;
            const isPrev = index === visibleIndices[0];
            const isNext = index === visibleIndices[2];

            return (
              <div
                key={recipe.id}
                className={`
                  absolute transition-all duration-500 ease-out
                  ${!isVisible ? 'opacity-0 scale-75 pointer-events-none' : ''}
                  ${isCurrent ? 'z-20' : 'z-10'}
                `}
                style={{
                  transform: `
                    translateX(${isCurrent ? '0' : isPrev ? '-120%' : '120%'})
                    scale(${isCurrent ? '1' : '0.85'})
                  `,
                  opacity: isCurrent ? 1 : 0.4
                }}
              >
                <div className={`
                  bg-white rounded-2xl p-5 shadow-lg border border-slate-200
                  w-[280px] h-[160px] flex flex-col
                  ${isCurrent ? 'shadow-xl border-slate-300' : ''}
                  transition-all duration-300 hover:shadow-xl
                `}>
                  {/* Recipe icon */}
                  <div className="mb-3 flex items-center justify-between">
                    <div className="p-1.5 bg-slate-50 rounded-lg">
                      {RecipeIcons[recipe.iconType] ? RecipeIcons[recipe.iconType]() : (
                        <div className="w-8 h-8 bg-slate-200 rounded" />
                      )}
                    </div>
                    {isCurrent && (
                      <span className="text-xs font-medium text-green-600 bg-green-50 px-2 py-1 rounded-full">
                        Active
                      </span>
                    )}
                  </div>
                  
                  {/* Recipe title */}
                  <h3 className="text-base font-semibold text-slate-900 mb-1">
                    {recipe.title}
                  </h3>
                  
                  {/* Recipe description */}
                  <p className="text-sm text-slate-600 flex-grow leading-relaxed">
                    {recipe.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Manual navigation arrows */}
        <button
          onClick={() => setCurrentIndex(prev => (prev - 1 + recipes.length) % recipes.length)}
          className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-12 p-2 rounded-full bg-white shadow-md border border-slate-200 hover:shadow-lg transition-all"
          aria-label="Previous recipe"
        >
          <svg className="w-4 h-4 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        
        <button
          onClick={() => setCurrentIndex(prev => (prev + 1) % recipes.length)}
          className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-12 p-2 rounded-full bg-white shadow-md border border-slate-200 hover:shadow-lg transition-all"
          aria-label="Next recipe"
        >
          <svg className="w-4 h-4 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>

        {/* Bottom caption */}
        <div className="absolute -bottom-12 left-1/2 transform -translate-x-1/2 text-center">
          <p className="text-xs text-slate-500">
            {recipes.length}+ data sources • Build lists in seconds
          </p>
        </div>
      </div>
    </div>
  );
}