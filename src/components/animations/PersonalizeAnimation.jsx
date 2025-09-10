import { useState, useEffect, useRef } from 'react';

// Animation phases
const PHASES = {
  IDLE: 'idle',
  COMPANY: 'company',
  RESEARCH: 'research',
  EXAMPLES: 'examples',
  PROCESSING: 'processing',
  WRITING: 'writing',
  COMPLETE: 'complete'
};

// Color scheme for each input source
const SOURCE_COLORS = {
  company: { 
    bg: 'bg-blue-50', 
    border: 'border-blue-300', 
    text: 'text-blue-700',
    underline: 'decoration-blue-500',
    ribbon: '#3B82F6'
  },
  research: { 
    bg: 'bg-green-50', 
    border: 'border-green-300', 
    text: 'text-green-700',
    underline: 'decoration-green-500',
    ribbon: '#10B981'
  },
  examples: { 
    bg: 'bg-purple-50', 
    border: 'border-purple-300', 
    text: 'text-purple-700',
    underline: 'decoration-purple-500',
    ribbon: '#8B5CF6'
  }
};

// Input data that flows through the pipeline
const inputData = {
  company: {
    step: '01',
    title: 'Your company',
    items: [
      'Helped 218 teams',
      'Native Clay workflows',
      '47% reply rate avg',
      'AI-powered outreach'
    ]
  },
  research: {
    step: '02',
    title: 'Lead research',
    items: [
      'AE job post',
      'Using Clay',
      '$25M Series B',
      'B2B SaaS'
    ]
  },
  examples: {
    step: '03',
    title: 'Your examples',
    items: [
      'Hey {{name}} - saw you...',
      'We helped Notion scale...',
      'Quick question about...',
      'Worth a quick chat?'
    ]
  }
};

// The email that gets generated with source attribution
const outputEmail = [
  { text: 'Hey Jane - saw you', delay: 0, source: 'examples', tooltip: 'Your examples → Hey {{name}} - saw you...' },
  { text: ' posted an ', delay: 50 },
  { text: 'AE job', delay: 100, source: 'research', tooltip: 'Lead research → AE job post' },
  { text: ' mentioning ', delay: 150 },
  { text: 'Clay', delay: 200, source: 'research', tooltip: 'Lead research → Using Clay' },
  { text: '.', delay: 250 },
  { text: '', delay: 300 }, // line break
  { text: 'We helped ', delay: 350, source: 'examples', tooltip: 'Your examples → We helped Notion scale...' },
  { text: '218 teams', delay: 400, source: 'company', tooltip: 'Your company → Helped 218 teams' },
  { text: ' achieve ', delay: 450 },
  { text: '47% reply rates', delay: 500, source: 'company', tooltip: 'Your company → 47% reply rate avg' },
  { text: ' with native Clay workflows.', delay: 550, source: 'company', tooltip: 'Your company → Native Clay workflows' },
  { text: '', delay: 600 }, // line break
  { text: 'Since you\'re expanding with ', delay: 650 },
  { text: '$25M Series B', delay: 700, source: 'research', tooltip: 'Lead research → $25M Series B' },
  { text: ', ', delay: 750 },
  { text: 'worth a quick chat?', delay: 800, source: 'examples', tooltip: 'Your examples → Worth a quick chat?' },
];

export default function PersonalizeAnimation({ isActive = true }) {
  const [phase, setPhase] = useState(PHASES.IDLE);
  const [activeSource, setActiveSource] = useState(null);
  const [emailContent, setEmailContent] = useState([]);
  const [hoveredSegment, setHoveredSegment] = useState(null);
  const [showSources, setShowSources] = useState(false);
  const animationTimeouts = useRef([]);
  const isActiveRef = useRef(isActive);

  // Update isActiveRef when prop changes
  useEffect(() => {
    isActiveRef.current = isActive;
  }, [isActive]);

  // Clear timeouts on unmount
  useEffect(() => {
    return () => {
      animationTimeouts.current.forEach(timeout => clearTimeout(timeout));
    };
  }, []);

  // Reset animation
  const resetAnimation = () => {
    animationTimeouts.current.forEach(timeout => clearTimeout(timeout));
    animationTimeouts.current = [];
    
    setPhase(PHASES.IDLE);
    setActiveSource(null);
    setEmailContent([]);
    setHoveredSegment(null);
    
    // Start animation sequence after a brief pause
    const startTimer = setTimeout(() => {
      if (isActiveRef.current) {
        startSequence();
      }
    }, 1000);
    
    animationTimeouts.current.push(startTimer);
  };

  // Animation sequence with source highlighting
  const startSequence = () => {
    // Phase 1: Highlight company
    setPhase(PHASES.COMPANY);
    setActiveSource('company');
    
    const companyTimer = setTimeout(() => {
      // Phase 2: Highlight research
      setPhase(PHASES.RESEARCH);
      setActiveSource('research');
    }, 1500);
    animationTimeouts.current.push(companyTimer);
    
    const researchTimer = setTimeout(() => {
      // Phase 3: Highlight examples
      setPhase(PHASES.EXAMPLES);
      setActiveSource('examples');
    }, 3000);
    animationTimeouts.current.push(researchTimer);
    
    const processTimer = setTimeout(() => {
      // Phase 4: Processing
      setPhase(PHASES.PROCESSING);
      setActiveSource(null);
    }, 4500);
    animationTimeouts.current.push(processTimer);
    
    const writeTimer = setTimeout(() => {
      // Phase 5: Writing
      setPhase(PHASES.WRITING);
      startWriting();
    }, 5000);
    animationTimeouts.current.push(writeTimer);
  };

  // Write the email with progressive reveal
  const startWriting = () => {
    let currentDelay = 0;
    outputEmail.forEach((segment, index) => {
      const timeout = setTimeout(() => {
        setEmailContent(prev => [...prev, segment]);
        
        // Highlight source when adding sourced content
        if (segment.source) {
          setActiveSource(segment.source);
          const clearHighlight = setTimeout(() => {
            setActiveSource(null);
          }, 500);
          animationTimeouts.current.push(clearHighlight);
        }
      }, currentDelay);
      currentDelay += segment.delay || 50;
      animationTimeouts.current.push(timeout);
    });
    
    // Mark complete and restart
    const completeTimeout = setTimeout(() => {
      setPhase(PHASES.COMPLETE);
      
      // Restart after showing complete state
      const restartTimeout = setTimeout(() => {
        if (isActiveRef.current) {
          resetAnimation();
        }
      }, 3000);
      animationTimeouts.current.push(restartTimeout);
    }, currentDelay + 1000);
    animationTimeouts.current.push(completeTimeout);
  };

  // Start animation when active
  useEffect(() => {
    if (!isActive) return;
    
    resetAnimation();
    
    return () => {
      animationTimeouts.current.forEach(timeout => clearTimeout(timeout));
    };
  }, [isActive]);

  return (
    <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-white to-slate-50 p-2 relative overflow-hidden">
      {/* Subtle background dots */}
      <div 
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: 'radial-gradient(rgba(14,21,37,0.8) 1px, transparent 1px)',
          backgroundSize: '20px 20px'
        }}
      />
      
      <div className="w-full max-w-5xl relative z-10">
        {/* Step chips at top */}
        <div className="flex justify-center gap-2 mb-3">
          {Object.entries(inputData).map(([key, data]) => (
            <div 
              key={key}
              className={`
                px-2 py-1 rounded-full text-[10px] font-medium transition-all duration-300
                ${activeSource === key 
                  ? `${SOURCE_COLORS[key].bg} ${SOURCE_COLORS[key].border} ${SOURCE_COLORS[key].text} border shadow-md` 
                  : 'bg-white border border-slate-200 text-slate-500'
                }
              `}
            >
              <span className="opacity-50">{data.step}</span> {data.title}
            </div>
          ))}
        </div>

        {/* Three input cards */}
        <div className="grid grid-cols-3 gap-3 mb-4">
          {Object.entries(inputData).map(([key, data]) => (
            <div 
              key={key}
              className={`
                relative rounded-lg border p-2 transition-all duration-300
                ${activeSource === key 
                  ? `${SOURCE_COLORS[key].bg} ${SOURCE_COLORS[key].border} shadow-lg scale-105` 
                  : 'bg-white border-slate-200'
                }
              `}
            >
              <h3 className={`text-[10px] font-semibold mb-1 ${
                activeSource === key ? SOURCE_COLORS[key].text : 'text-slate-600'
              }`}>
                {data.title}
              </h3>
              <ul className="space-y-0.5">
                {data.items.map((item, i) => (
                  <li 
                    key={i} 
                    className={`text-[10px] leading-tight ${
                      activeSource === key ? SOURCE_COLORS[key].text : 'text-slate-500'
                    }`}
                  >
                    • {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* AI Node with flowing ribbons */}
        <div className="relative h-16 mb-4">
          <svg className="absolute inset-0 w-full h-full" viewBox="0 0 400 64">
            {/* Ribbons flowing from cards to AI */}
            <defs>
              <linearGradient id="companyGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor={SOURCE_COLORS.company.ribbon} stopOpacity="0.3" />
                <stop offset="100%" stopColor={SOURCE_COLORS.company.ribbon} stopOpacity="0.1" />
              </linearGradient>
              <linearGradient id="researchGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor={SOURCE_COLORS.research.ribbon} stopOpacity="0.3" />
                <stop offset="100%" stopColor={SOURCE_COLORS.research.ribbon} stopOpacity="0.1" />
              </linearGradient>
              <linearGradient id="examplesGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor={SOURCE_COLORS.examples.ribbon} stopOpacity="0.3" />
                <stop offset="100%" stopColor={SOURCE_COLORS.examples.ribbon} stopOpacity="0.1" />
              </linearGradient>
            </defs>
            
            {/* Company ribbon */}
            <path 
              d="M 66 0 Q 150 20 200 32" 
              stroke={SOURCE_COLORS.company.ribbon} 
              strokeWidth={activeSource === 'company' ? '2' : '1.5'}
              fill="none"
              opacity={activeSource === 'company' ? 1 : 0.3}
              className="transition-all duration-300"
            />
            
            {/* Research ribbon */}
            <path 
              d="M 200 0 L 200 32" 
              stroke={SOURCE_COLORS.research.ribbon} 
              strokeWidth={activeSource === 'research' ? '2' : '1.5'}
              fill="none"
              opacity={activeSource === 'research' ? 1 : 0.3}
              className="transition-all duration-300"
            />
            
            {/* Examples ribbon */}
            <path 
              d="M 334 0 Q 250 20 200 32" 
              stroke={SOURCE_COLORS.examples.ribbon} 
              strokeWidth={activeSource === 'examples' ? '2' : '1.5'}
              fill="none"
              opacity={activeSource === 'examples' ? 1 : 0.3}
              className="transition-all duration-300"
            />
            
            {/* Animated particles during processing */}
            {phase === PHASES.PROCESSING && (
              <>
                <circle r="1.5" fill={SOURCE_COLORS.company.ribbon}>
                  <animateMotion dur="1.5s" repeatCount="indefinite" path="M 66 0 Q 150 20 200 32" />
                </circle>
                <circle r="1.5" fill={SOURCE_COLORS.research.ribbon}>
                  <animateMotion dur="1.5s" repeatCount="indefinite" path="M 200 0 L 200 32" />
                </circle>
                <circle r="1.5" fill={SOURCE_COLORS.examples.ribbon}>
                  <animateMotion dur="1.5s" repeatCount="indefinite" path="M 334 0 Q 250 20 200 32" />
                </circle>
              </>
            )}
          </svg>
          
          {/* AI Node */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
            <div className={`
              w-10 h-10 rounded-full bg-white border-2 shadow-lg flex items-center justify-center
              ${phase === PHASES.PROCESSING ? 'border-brand-primary animate-pulse' : 'border-slate-300'}
            `}>
              {phase === PHASES.PROCESSING ? (
                <div className="w-4 h-4 border-2 border-brand-primary border-t-transparent rounded-full animate-spin" />
              ) : (
                <span className="text-[10px] font-bold text-slate-700">AI</span>
              )}
            </div>
          </div>
        </div>

        {/* Generated Email */}
        <div className="bg-white rounded-xl border border-slate-200 shadow-lg p-4" style={{ boxShadow: 'inset 0 1px 3px rgba(0,0,0,0.04), 0 10px 40px rgba(0,0,0,0.08)' }}>
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-xs font-semibold text-slate-700">
              Generated draft
            </h3>
            <div className="flex items-center gap-2">
              <button
                className="text-[10px] text-slate-400 hover:text-slate-600 transition-colors"
              >
                Copy draft
              </button>
              <button
                onClick={() => setShowSources(!showSources)}
                className="text-[10px] text-slate-500 hover:text-slate-700 transition-colors font-medium"
              >
                {showSources ? 'Hide' : 'Show'} how this was written
              </button>
            </div>
          </div>
          
          {/* Color legend */}
          <div className="flex gap-3 text-[9px] text-slate-500 mb-3 pb-2 border-b border-slate-100">
            <span className="flex items-center gap-1">
              <span className="inline-block w-2 h-2 rounded-full bg-blue-500"></span>
              Your company
            </span>
            <span className="flex items-center gap-1">
              <span className="inline-block w-2 h-2 rounded-full bg-green-500"></span>
              Lead research
            </span>
            <span className="flex items-center gap-1">
              <span className="inline-block w-2 h-2 rounded-full bg-purple-500"></span>
              Your examples
            </span>
          </div>
          
          <div className="font-mono text-xs text-slate-800 leading-relaxed">
            {emailContent.map((segment, i) => (
              <span key={i} className="relative inline">
                {segment.text === '' ? (
                  <br />
                ) : segment.source ? (
                  <span
                    className={`
                      underline decoration-1 underline-offset-2 cursor-help relative
                      ${SOURCE_COLORS[segment.source].underline}
                    `}
                    style={{
                      backgroundColor: segment.source === 'company' ? 'rgba(59, 130, 246, 0.08)' :
                                     segment.source === 'research' ? 'rgba(16, 185, 129, 0.08)' :
                                     'rgba(139, 92, 246, 0.08)',
                      padding: '0 2px',
                      borderRadius: '2px'
                    }}
                    onMouseEnter={() => setHoveredSegment(i)}
                    onMouseLeave={() => setHoveredSegment(null)}
                  >
                    {segment.text}
                    {hoveredSegment === i && (
                      <span className="absolute bottom-full left-0 mb-1 px-1.5 py-1 bg-slate-900 text-white text-[10px] rounded whitespace-nowrap z-10">
                        {segment.tooltip}
                      </span>
                    )}
                  </span>
                ) : (
                  <span>{segment.text}</span>
                )}
              </span>
            ))}
            
            {/* Typing cursor */}
            {phase === PHASES.WRITING && (
              <span className="inline-block w-0.5 h-3 bg-slate-800 animate-pulse ml-0.5" />
            )}
          </div>
          
        </div>

        {/* Source rail (when toggled) - positioned inside the container */}
        {showSources && (
          <div className="absolute right-2 top-1/2 -translate-y-1/2 w-32 bg-white rounded-lg border border-slate-200 p-2 shadow-lg z-20">
            <h4 className="text-[10px] font-semibold text-slate-700 mb-1">Sources used:</h4>
            <div className="space-y-1">
              {emailContent
                .filter(s => s.source)
                .map((segment, i) => (
                  <div key={i} className="text-[10px]">
                    <span className={`inline-block w-1.5 h-1.5 rounded-full mr-1 ${
                      segment.source === 'company' ? 'bg-blue-500' :
                      segment.source === 'research' ? 'bg-green-500' :
                      'bg-purple-500'
                    }`} />
                    <span className="text-slate-600">{segment.tooltip?.split('→')[1]}</span>
                  </div>
                ))
              }
            </div>
          </div>
        )}
      </div>
    </div>
  );
}