import { useState, useEffect } from 'react';

const EXAMPLE_QUERIES = [
  {
    id: 1,
    query: "Find decision makers at TechCorp",
    thinking: [
      "Need to identify key roles",
      "Search LinkedIn for executives",
      "Check recent hires and promotions"
    ],
    searches: [
      { tool: "LinkedIn", status: "searching", result: "Found 3 executives" },
      { tool: "Web News", status: "searching", result: "Recent leadership changes" },
      { tool: "Company Data", status: "searching", result: "500-1000 employees" }
    ],
    results: [
      "CEO: Michael Chen (2 years)",
      "VP Sales: Sarah Park (6 months)",
      "CTO: Jessica Liu (1 year)",
      "Recent Series B: $50M",
      "Growing 150% YoY"
    ]
  },
  {
    id: 2,
    query: "Research Acme Corp's tech stack",
    thinking: [
      "Scan their website code",
      "Check job postings for tech requirements",
      "Look for engineering blog posts"
    ],
    searches: [
      { tool: "Website", status: "searching", result: "Analyzed source code" },
      { tool: "Job Posts", status: "searching", result: "Found 12 eng positions" },
      { tool: "Tech Blogs", status: "searching", result: "Developer articles found" }
    ],
    results: [
      "Frontend: React, Next.js",
      "Backend: Node.js, Python",
      "Database: PostgreSQL, Redis",
      "Cloud: AWS, Vercel",
      "Looking for Kubernetes exp"
    ]
  }
];

const PHASES = {
  IDLE: 'idle',
  QUERY: 'query',
  THINKING: 'thinking',
  SEARCHING: 'searching',
  COLLECTING: 'collecting',
  COMPLETE: 'complete'
};

export default function AgentAnimation({ isActive }) {
  const [phase, setPhase] = useState(PHASES.IDLE);
  const [currentQueryIndex, setCurrentQueryIndex] = useState(0);
  const [visibleThoughts, setVisibleThoughts] = useState([]);
  const [activeSearches, setActiveSearches] = useState([]);
  const [collectedResults, setCollectedResults] = useState([]);
  const [showFinalResults, setShowFinalResults] = useState(false);

  const currentQuery = EXAMPLE_QUERIES[currentQueryIndex];

  useEffect(() => {
    if (!isActive) {
      resetAnimation();
      return;
    }

    // Start the animation cycle
    runAnimationCycle();
    
    // Set up interval to continuously loop
    const interval = setInterval(() => {
      setCurrentQueryIndex((prev) => (prev + 1) % EXAMPLE_QUERIES.length);
    }, 14000);

    return () => clearInterval(interval);
  }, [isActive]);
  
  useEffect(() => {
    if (isActive) {
      runAnimationCycle();
    }
  }, [currentQueryIndex]);

  const resetAnimation = () => {
    setPhase(PHASES.IDLE);
    setVisibleThoughts([]);
    setActiveSearches([]);
    setCollectedResults([]);
    setShowFinalResults(false);
  };

  const runAnimationCycle = () => {
    resetAnimation();
    
    // Phase 1: Show query
    setTimeout(() => {
      setPhase(PHASES.QUERY);
    }, 800);

    // Phase 2: Show thinking
    setTimeout(() => {
      setPhase(PHASES.THINKING);
      currentQuery.thinking.forEach((thought, index) => {
        setTimeout(() => {
          setVisibleThoughts(prev => [...prev, index]);
        }, 500 * index);
      });
    }, 2500);

    // Phase 3: Start searches
    setTimeout(() => {
      setPhase(PHASES.SEARCHING);
      setActiveSearches(currentQuery.searches.map(s => ({ ...s, status: 'searching' })));
      
      // Complete searches one by one
      currentQuery.searches.forEach((search, index) => {
        setTimeout(() => {
          setActiveSearches(prev => prev.map((s, i) => 
            i === index ? { ...s, status: 'complete' } : s
          ));
        }, 1500 + (index * 800));
      });
    }, 5500);

    // Phase 4: Collect results
    setTimeout(() => {
      setPhase(PHASES.COLLECTING);
      currentQuery.results.forEach((result, index) => {
        setTimeout(() => {
          setCollectedResults(prev => [...prev, result]);
        }, 200 * index);
      });
    }, 9500);

    // Phase 5: Show complete
    setTimeout(() => {
      setPhase(PHASES.COMPLETE);
      setShowFinalResults(true);
    }, 11500);
  };

  return (
    <div className="h-full flex flex-col items-center justify-center p-4 relative">
      
      {/* Query Input */}
      <div className={`absolute top-4 left-4 right-4 transition-all duration-500 ${
        phase === PHASES.IDLE ? 'opacity-0 -translate-y-2' : 'opacity-100 translate-y-0'
      }`}>
        <div className="bg-white/5 backdrop-blur-sm border border-slate-700 rounded-lg p-3">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
            <span className="text-xs text-slate-400">Query:</span>
            <span className="text-sm text-white font-medium">{currentQuery.query}</span>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex items-center justify-center w-full">
        
        {/* Thinking Phase */}
        {phase === PHASES.THINKING && (
          <div className="space-y-2">
            <div className="text-center mb-4">
              <div className="inline-flex items-center gap-2">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center animate-pulse">
                  <span className="text-white text-xs font-bold">AI</span>
                </div>
                <span className="text-xs text-slate-500">Analyzing request...</span>
              </div>
            </div>
            <div className="space-y-1">
              {currentQuery.thinking.map((thought, index) => (
                <div
                  key={index}
                  className={`px-3 py-1.5 bg-slate-800/50 rounded text-xs text-slate-400 transition-all duration-300 ${
                    visibleThoughts.includes(index) 
                      ? 'opacity-100 translate-x-0' 
                      : 'opacity-0 -translate-x-4'
                  }`}
                >
                  • {thought}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Searching Phase */}
        {(phase === PHASES.SEARCHING || phase === PHASES.COLLECTING) && (
          <div className="w-full max-w-2xl">
            <div className="flex items-center justify-center mb-6">
              <div className="relative">
                <div className={`w-14 h-14 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center ${
                  phase === PHASES.SEARCHING ? 'animate-pulse' : ''
                }`}>
                  <span className="text-white text-sm font-bold">AI</span>
                </div>
                {phase === PHASES.SEARCHING && (
                  <div className="absolute inset-0 rounded-full border-2 border-blue-400/30 animate-ping" />
                )}
              </div>
            </div>

            {/* Active Searches */}
            <div className="grid grid-cols-3 gap-3 mb-6">
              {activeSearches.map((search, index) => (
                <div
                  key={index}
                  className={`p-2 rounded-lg border transition-all duration-500 ${
                    search.status === 'searching' 
                      ? 'border-blue-500/50 bg-blue-500/10' 
                      : 'border-green-500/30 bg-green-500/5'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs text-slate-300">{search.tool}</span>
                    {search.status === 'searching' ? (
                      <div className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-pulse" />
                    ) : (
                      <svg className="w-3 h-3 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                      </svg>
                    )}
                  </div>
                  <div className="text-[10px] text-slate-500">
                    {search.status === 'complete' ? search.result : 'Searching...'}
                  </div>
                </div>
              ))}
            </div>

            {/* Collected Results */}
            {phase === PHASES.COLLECTING && (
              <div className="bg-slate-800/30 rounded-lg p-3">
                <div className="text-xs text-slate-500 mb-2">Gathering intelligence...</div>
                <div className="space-y-1">
                  {collectedResults.map((result, index) => (
                    <div
                      key={index}
                      className="text-xs text-slate-300 animate-fadeIn"
                      style={{ animationDelay: `${index * 50}ms` }}
                    >
                      • {result}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Complete Phase */}
        {phase === PHASES.COMPLETE && showFinalResults && (
          <div className="text-center">
            <div className="inline-flex items-center gap-2 mb-4">
              <svg className="w-5 h-5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span className="text-sm text-green-400">Research Complete</span>
            </div>
            <div className="bg-green-500/5 border border-green-500/20 rounded-lg p-4 max-w-md">
              <div className="text-xs text-slate-400 space-y-1">
                {currentQuery.results.slice(0, 3).map((result, index) => (
                  <div key={index}>• {result}</div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Phase Indicator */}
      <div className="absolute bottom-4 left-4 right-4">
        <div className="flex justify-center gap-1">
          {[PHASES.QUERY, PHASES.THINKING, PHASES.SEARCHING, PHASES.COLLECTING, PHASES.COMPLETE].map((p) => (
            <div
              key={p}
              className={`h-1 w-8 rounded-full transition-all duration-300 ${
                phase === p ? 'bg-blue-500' : 'bg-slate-700'
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}