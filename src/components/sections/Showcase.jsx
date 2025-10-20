import { useState, useEffect, useRef, useCallback } from 'react';
import { tokens } from '../../tokens.js';
import SegmentedProgress from '../animations/SegmentedProgress';

const STATES = {
  AUTOPLAYING: 'autoplaying',
  LOCKED: 'locked'
};

export default function Showcase() {
  const [currentTab, setCurrentTab] = useState(1); // Start on Research tab
  const [state, setState] = useState(
    tokens.showcase.autoplay.enabled ? STATES.AUTOPLAYING : STATES.PAUSED
  );
  const [progress, setProgress] = useState(0);
  const [focusedTab, setFocusedTab] = useState(1); // Focus on Research tab
  const [videoDurations, setVideoDurations] = useState({});
  
  const intervalRef = useRef(null);
  const progressIntervalRef = useRef(null);
  const containerRef = useRef(null);
  const videoRefs = useRef({});

  const tabs = tokens.showcase.tabs;
  const { perTabMs, progressUpdateMs } = tokens.showcase.autoplay;

  const clearIntervals = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    if (progressIntervalRef.current) {
      clearInterval(progressIntervalRef.current);
      progressIntervalRef.current = null;
    }
  }, []);

  const startAutoplay = useCallback(() => {
    clearIntervals();
    setProgress(0);

    // Use actual video duration if available, otherwise fall back to perTabMs
    const currentVideoDuration = videoDurations[currentTab] 
      ? videoDurations[currentTab] * 1000 // Convert to ms
      : perTabMs;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    
    if (prefersReducedMotion) {
      intervalRef.current = setInterval(() => {
        setCurrentTab(prev => (prev + 1) % tabs.length);
        setProgress(0);
      }, currentVideoDuration);
    } else {
      let progressValue = 0;
      progressIntervalRef.current = setInterval(() => {
        progressValue += progressUpdateMs;
        const progressNormalized = progressValue / currentVideoDuration;
        setProgress(Math.min(progressNormalized, 1));
        
        if (progressValue >= currentVideoDuration) {
          setCurrentTab(prev => (prev + 1) % tabs.length);
          progressValue = 0;
          setProgress(0);
        }
      }, progressUpdateMs);
    }
  }, [tabs.length, perTabMs, progressUpdateMs, clearIntervals, currentTab, videoDurations]);

  const pauseAutoplay = useCallback(() => {
    clearIntervals();
  }, [clearIntervals]);

  // Removed resume autoplay - once locked, stays locked

  // Removed visibility change handler - always keep playing unless locked

  useEffect(() => {
    if (state === STATES.AUTOPLAYING) {
      startAutoplay();
    } else {
      pauseAutoplay();
    }

    return () => clearIntervals();
  }, [state, currentTab, startAutoplay, pauseAutoplay, clearIntervals]);

  const handleTabClick = useCallback((index) => {
    setCurrentTab(index);
    setState(STATES.LOCKED);
    setProgress(0);
  }, []);

  const handleKeyDown = useCallback((e) => {
    switch (e.key) {
      case 'ArrowLeft':
        e.preventDefault();
        setFocusedTab(prev => (prev - 1 + tabs.length) % tabs.length);
        break;
      case 'ArrowRight':
        e.preventDefault();
        setFocusedTab(prev => (prev + 1) % tabs.length);
        break;
      case 'Enter':
      case ' ':
        e.preventDefault();
        handleTabClick(focusedTab);
        break;
    }
  }, [focusedTab, tabs.length, handleTabClick]);

  // Removed mouse enter/leave handlers - no hover pause

  return (
    <section 
      id="how-it-works"
      className="pt-8 pb-0 bg-white"
      aria-labelledby="showcase-heading"
      ref={containerRef}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-6">
          <p className="text-base text-slate-500 font-normal">
            From account to execution
          </p>
        </div>

        {/* Card Navigation - Attio Style */}
        <div 
          role="tablist"
          aria-label="Product showcase"
          className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6"
          onKeyDown={handleKeyDown}
        >
          {tabs.map((tab, index) => (
            <button
              key={tab.id}
              role="tab"
              aria-selected={currentTab === index}
              aria-controls={`tabpanel-${tab.id}`}
              id={`tab-${tab.id}`}
              tabIndex={focusedTab === index ? 0 : -1}
              onFocus={() => setFocusedTab(index)}
              onClick={() => handleTabClick(index)}
              className={`relative p-5 rounded-xl border transition-all duration-200 cursor-pointer ${
                currentTab === index
                  ? 'border-slate-900 bg-slate-50 shadow-md'
                  : 'border-slate-200 bg-white hover:border-slate-400 hover:shadow-sm'
              }`}
            >
              <div className="text-center">
                <h3 className={`text-lg font-semibold ${
                  currentTab === index ? 'text-slate-900' : 'text-slate-600'
                }`}>
                  {tab.label}
                </h3>
                <p className="text-sm text-slate-500 mt-1">
                  {tab.title}
                </p>
              </div>
            </button>
          ))}
        </div>

        {/* Animation Only Content Area */}
        <div className="bg-gradient-to-b from-white to-slate-50/30 rounded-2xl overflow-hidden">
          {/* Segmented Progress Tracker */}
          {state === STATES.AUTOPLAYING && (
            <SegmentedProgress 
              count={tabs.length} 
              active={currentTab} 
              progress={progress} 
            />
          )}
          
          {tabs.map((tab, index) => (
            <div
              key={tab.id}
              id={`tabpanel-${tab.id}`}
              role="tabpanel"
              aria-labelledby={`tab-${tab.id}`}
              className={`${currentTab === index ? 'block' : 'hidden'}`}
              tabIndex="0"
            >
              <div className="p-8">
                <div className="aspect-video bg-gradient-to-br from-slate-50 to-white rounded-2xl overflow-hidden shadow-xl">
                  {/* Videos commented out - will add back later */}
                  {/* 
                  {tab.asset ? (
                    <video 
                      ref={el => videoRefs.current[index] = el}
                      className="w-full h-full object-cover"
                      autoPlay={currentTab === index}
                      muted
                      playsInline
                      key={`${tab.id}-${currentTab === index}`}
                      onLoadedMetadata={(e) => {
                        const duration = e.target.duration;
                        if (duration && !isNaN(duration) && duration !== Infinity) {
                          setVideoDurations(prev => ({
                            ...prev,
                            [index]: duration
                          }));
                        }
                      }}
                    >
                      <source src={tab.asset} type="video/mp4" />
                      <div className="w-full h-full flex items-center justify-center">
                        <div className="text-center">
                          <div className="w-20 h-20 bg-slate-200 rounded-2xl mx-auto mb-4"></div>
                          <span className="text-slate-500 text-lg font-medium">Video unavailable</span>
                        </div>
                      </div>
                    </video>
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <div className="text-center">
                        <div className="w-20 h-20 bg-slate-200 rounded-2xl mx-auto mb-4 animate-pulse"></div>
                        <span className="text-slate-500 text-lg font-medium">{tab.label} Preview</span>
                        <p className="text-slate-400 text-sm mt-2">Video coming soon</p>
                      </div>
                    </div>
                  )}
                  */}
                  
                  {/* Placeholder content while videos are commented out */}
                  <div className="w-full h-full flex items-center justify-center">
                    <div className="text-center">
                      <div className="w-20 h-20 bg-slate-200 rounded-2xl mx-auto mb-4 animate-pulse"></div>
                      <span className="text-slate-500 text-lg font-medium">{tab.label} Preview</span>
                      <p className="text-slate-400 text-sm mt-2">Video coming soon</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
