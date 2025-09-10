import { useState, useEffect, useRef } from 'react';
import { tokens } from '../../tokens.js';

export default function ScrollingQuote() {
  const [revealProgress, setRevealProgress] = useState(0);
  const [quoteOpacity, setQuoteOpacity] = useState(1); // For fading out the fixed quote
  const sectionRef = useRef(null);
  
  // Constants
  const REVEAL_SCROLL_DISTANCE = 0.8; // 80% of viewport height

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;

      const viewportHeight = window.innerHeight;
      const revealDistance = viewportHeight * REVEAL_SCROLL_DISTANCE;
      
      // Get quote section position
      const sectionRect = sectionRef.current.getBoundingClientRect();
      const sectionTop = sectionRect.top;
      
      // Quote is fully visible when section top reaches viewport top
      const isFullyVisible = sectionTop <= 0;
      
      if (isFullyVisible) {
        // Calculate word reveal progress based on scroll past section top
        const scrollPastTop = Math.abs(sectionTop);
        const progress = Math.min(1, scrollPastTop / revealDistance);
        
        setRevealProgress(progress);
        
        // Fade out the fixed quote after words are fully revealed
        if (progress >= 1) {
          // Start fading after a small buffer
          const fadeStart = revealDistance + 100;
          const fadeDistance = 200;
          
          if (scrollPastTop > fadeStart) {
            const fadeProgress = (scrollPastTop - fadeStart) / fadeDistance;
            setQuoteOpacity(Math.max(0, 1 - fadeProgress));
          } else {
            setQuoteOpacity(1);
          }
        } else {
          setQuoteOpacity(1);
        }
      } else {
        setRevealProgress(0);
        setQuoteOpacity(1);
      }
    };

    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      setRevealProgress(1); // Show everything immediately
    } else {
      window.addEventListener('scroll', handleScroll, { passive: true });
      handleScroll(); // Initial check
    }

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Split quote into words for word-by-word reveal
  const fullQuote = tokens.quote.text;
  const words = fullQuote.split(' ');
  const totalWords = words.length;
  
  // Calculate how many words should be fully revealed
  const wordsToReveal = Math.floor(revealProgress * totalWords);
  
  // Author reveals after quote is complete
  const authorOpacity = revealProgress >= 0.9 ? (revealProgress - 0.9) * 10 : 0;
  
  // Colors for muted and active states
  const mutedColor = "184, 197, 214"; // #b8c5d6 - lighter blue-grey like Attio
  const activeColor = "15, 23, 42"; // #0f172a

  // Track section bounds for visibility calculation
  const [sectionBounds, setSectionBounds] = useState({ top: 1000, bottom: 1000 });
  const [logosBounds, setLogosBounds] = useState({ top: 0, bottom: 1000 });
  
  useEffect(() => {
    const updateBounds = () => {
      if (sectionRef.current) {
        const rect = sectionRef.current.getBoundingClientRect();
        setSectionBounds({ top: rect.top, bottom: rect.bottom });
      }
      
      // Also track logos section
      const logosSection = document.querySelector('#logos-section');
      if (logosSection) {
        const logosRect = logosSection.getBoundingClientRect();
        setLogosBounds({ top: logosRect.top, bottom: logosRect.bottom });
      }
    };
    
    window.addEventListener('scroll', updateBounds, { passive: true });
    updateBounds();
    
    return () => window.removeEventListener('scroll', updateBounds);
  }, []);
  
  // Calculate clip path to mask the quote to section bounds
  const calculateClipPath = () => {
    const viewportHeight = window.innerHeight;
    
    // Calculate how much to clip from top and bottom
    let clipTop = 0;
    let clipBottom = 0;
    
    // If section hasn't reached viewport yet, hide completely
    if (sectionBounds.top >= viewportHeight) {
      return 'inset(100% 0 0 0)'; // Hide completely
    }
    
    // If section top is below viewport top, clip from top
    if (sectionBounds.top > 0) {
      // Calculate clip as percentage of viewport
      clipTop = (sectionBounds.top / viewportHeight) * 100;
    }
    
    // If section bottom is above viewport bottom, clip from bottom  
    if (sectionBounds.bottom < viewportHeight) {
      // Calculate clip from bottom
      const bottomGap = viewportHeight - sectionBounds.bottom;
      clipBottom = (bottomGap / viewportHeight) * 100;
    }
    
    // Return clip path that masks quote to section bounds
    return `inset(${clipTop}% 0 ${clipBottom}% 0)`;
  };

  return (
    <section 
      id="quote-section"
      ref={sectionRef}
      className="relative"
      style={{ 
        minHeight: '200vh', // Increased height to ensure full reveal before unpinning
        backgroundImage: 'radial-gradient(rgba(15, 23, 42, 0.08) 1.25px, transparent 1.25px)',
        backgroundSize: '10px 10px', 
        backgroundColor: '#fafafa',
        // Create a stacking context to contain the fixed element
        isolation: 'isolate'
      }}
    >
      {/* Fixed quote - always there, masked by section bounds */}
      <div 
        id="quote-pin"
        className="flex items-center justify-center"
        style={{
          position: 'fixed',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '100%',
          height: '100vh',
          zIndex: 10,
          clipPath: calculateClipPath(),
          opacity: quoteOpacity,
          transition: 'opacity 0.3s ease-out'
        }}
      >
          {/* Background that matches section */}
          <div 
            className="absolute inset-0"
            style={{
              backgroundImage: 'radial-gradient(rgba(15, 23, 42, 0.08) 1.25px, transparent 1.25px)',
              backgroundSize: '10px 10px', // Back to original gap
              backgroundColor: '#fafafa'
            }}
          />
          
          <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <figure className="text-center">
              <blockquote id="quote" className="mb-8">
                <p className="text-4xl sm:text-5xl lg:text-6xl font-light leading-tight tracking-tight">
                <span style={{
                  // Opening quote transitions with first word
                  color: wordsToReveal > 0 
                    ? `rgb(${Math.round(148 - (148 - 15) * Math.min(1, revealProgress * 20))}, ${Math.round(163 - (163 - 23) * Math.min(1, revealProgress * 20))}, ${Math.round(184 - (184 - 42) * Math.min(1, revealProgress * 20))})`
                    : `rgb(${mutedColor})`,
                  transition: 'none'
                }}>"</span>
                {words.map((word, index) => {
                  // Check if this word is revealed
                  const isRevealed = index < wordsToReveal;
                  const isRevealing = index === wordsToReveal;
                  
                  // Calculate word opacity and color
                  let wordProgress = 0;
                  if (isRevealed) {
                    wordProgress = 1;
                  } else if (isRevealing) {
                    // Partial progress for the currently revealing word
                    wordProgress = (revealProgress * totalWords) - wordsToReveal;
                  }
                  
                  // Interpolate color from muted to active
                  const r = Math.round(184 - (184 - 15) * wordProgress);
                  const g = Math.round(197 - (197 - 23) * wordProgress);
                  const b = Math.round(214 - (214 - 42) * wordProgress);
                  
                  return (
                    <span key={index}>
                      <span
                        style={{
                          color: `rgb(${r}, ${g}, ${b})`,
                          filter: wordProgress < 1 ? 'blur(0.3px)' : 'none', // Much less blur, like Attio
                          opacity: 0.85 + (0.15 * wordProgress), // Start at 85% opacity, go to 100%
                          transition: 'none'
                        }}
                      >
                        {word}
                      </span>
                      {index < words.length - 1 && ' '}
                    </span>
                  );
                })}
                <span style={{
                  color: revealProgress >= 0.95 ? `rgb(${activeColor})` : `rgb(${mutedColor})`,
                  transition: 'none'
                }}>"</span>
              </p>
            </blockquote>
            
            <figcaption 
              id="quote-attrib"
            >
              <div 
                className="text-base font-semibold"
                style={{ 
                  // Transition color from muted to active after quote is done
                  color: revealProgress > 0.9 
                    ? `rgb(${Math.round(184 - (184 - 15) * ((revealProgress - 0.9) * 10))}, ${Math.round(197 - (197 - 23) * ((revealProgress - 0.9) * 10))}, ${Math.round(214 - (214 - 42) * ((revealProgress - 0.9) * 10))})`
                    : `rgb(${mutedColor})`,
                  transition: 'none'
                }}
              >
                {tokens.quote.author}
              </div>
              <div 
                className="text-sm mt-1"
                style={{ 
                  // Transition color from muted to active after quote is done
                  color: revealProgress > 0.9 
                    ? `rgb(${Math.round(184 - (184 - 15) * ((revealProgress - 0.9) * 10))}, ${Math.round(197 - (197 - 23) * ((revealProgress - 0.9) * 10))}, ${Math.round(214 - (214 - 42) * ((revealProgress - 0.9) * 10))})`
                    : `rgb(${mutedColor})`,
                  opacity: revealProgress > 0.9 ? 0.85 + (0.15 * ((revealProgress - 0.9) * 10)) : 0.85,
                  transition: 'none'
                }}
              >
                {tokens.quote.role}
              </div>
              </figcaption>
            </figure>
          </div>
        </div>
      
      {/* Static quote always in the section - visible when fixed quote fades out */}
      <div className="relative py-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <figure className="text-center">
            <blockquote className="mb-8">
              <p className="text-4xl sm:text-5xl lg:text-6xl font-light leading-tight tracking-tight">
                <span style={{ color: `rgb(${activeColor})` }}>"</span>
                {words.map((word, index) => (
                  <span key={index}>
                    <span style={{ color: `rgb(${activeColor})` }}>
                      {word}
                    </span>
                    {index < words.length - 1 && ' '}
                  </span>
                ))}
                <span style={{ color: `rgb(${activeColor})` }}>"</span>
              </p>
            </blockquote>
            <figcaption>
              <div className="text-base font-semibold text-slate-900">
                {tokens.quote.author}
              </div>
              <div className="text-sm text-slate-600 mt-1">
                {tokens.quote.role}
              </div>
            </figcaption>
          </figure>
        </div>
      </div>
    </section>
  );
}