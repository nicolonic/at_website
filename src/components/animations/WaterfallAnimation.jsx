import { useState, useEffect } from 'react';

const PROVIDERS = [
  { id: 'leadmagic', name: 'LeadMagic', logo: '/leadmagic.svg' },
  { id: 'prospeo', name: 'Prospeo', logo: '/prospeo logo.avif' },
  { id: 'findymail', name: 'FindYmail', logo: 'https://www.findymail.com/images/logo/findymail.svg' },
  { id: 'zerobounce', name: 'ZeroBounce', logo: '/zb.png', isVerifier: true }
];

const SAMPLE_LEADS = [
  { name: 'sarah.chen', domain: 'techcorp.io' },
  { name: 'james.wilson', domain: 'startup.com' },
  { name: 'emily.rodriguez', domain: 'enterprise.co' },
  { name: 'michael.patel', domain: 'agency.net' },
  { name: 'jessica.kim', domain: 'saas.io' }
];

const SAMPLE_PHONES = [
  '+1 (415) 555-0142',
  '+1 (212) 555-0198',
  '+1 (310) 555-0156',
  '+1 (646) 555-0173',
  '+1 (408) 555-0129'
];

export default function WaterfallAnimation({ isActive, isPhone = false }) {
  const [currentStep, setCurrentStep] = useState(-1);
  const [foundAt, setFoundAt] = useState(-1);
  const [showResult, setShowResult] = useState(false);
  const [isRunning, setIsRunning] = useState(false);
  const [currentLead, setCurrentLead] = useState(SAMPLE_LEADS[0]);
  const [leadIndex, setLeadIndex] = useState(0);

  // Filter out ZeroBounce for phone finder
  const activeProviders = isPhone ? PROVIDERS.filter(p => p.id !== 'zerobounce') : PROVIDERS;

  const runAnimation = () => {
    // Reset state
    setCurrentStep(-1);
    setFoundAt(-1);
    setShowResult(false);
    setIsRunning(true);

    // Cycle through different leads
    const nextLeadIndex = (leadIndex + 1) % SAMPLE_LEADS.length;
    setLeadIndex(nextLeadIndex);
    setCurrentLead(SAMPLE_LEADS[nextLeadIndex]);

    // Randomly determine where email will be found (40% at first, 40% at second, 20% at third)
    const random = Math.random();
    const successIndex = random < 0.4 ? 0 : random < 0.8 ? 1 : 2;

    let stepIndex = 0;
    const animateSteps = () => {
      if (stepIndex <= successIndex) {
        setCurrentStep(stepIndex);
        
        if (stepIndex === successIndex) {
          // Found the email!
          setTimeout(() => {
            setFoundAt(successIndex);
            setShowResult(true);
            // Wait a bit then restart
            setTimeout(() => {
              setIsRunning(false);
              setTimeout(runAnimation, 800); // Shorter pause before restarting
            }, 2000);
          }, 600);
        } else {
          stepIndex++;
          setTimeout(animateSteps, 600); // Faster transition between providers
        }
      }
    };

    setTimeout(animateSteps, 300); // Shorter initial delay
  };

  useEffect(() => {
    if (!isActive) {
      setCurrentStep(-1);
      setFoundAt(-1);
      setShowResult(false);
      setIsRunning(false);
      return;
    }

    // Start the animation loop
    runAnimation();

    return () => {
      setIsRunning(false);
    };
  }, [isActive]);

  return (
    <div className="h-full flex flex-col items-center justify-center p-6">
      {/* Input at top */}
      <div className="mb-6 text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-white/5 backdrop-blur-sm rounded-md border border-slate-700">
          <span className="text-slate-500 text-xs">Finding {isPhone ? 'phone for' : 'email'}:</span>
          <span className="text-slate-300 text-xs font-mono">
            {isPhone ? `${currentLead.name.split('.').map(n => n.charAt(0).toUpperCase() + n.slice(1)).join(' ')} @ ${currentLead.domain.split('.')[0].charAt(0).toUpperCase() + currentLead.domain.split('.')[0].slice(1)}` : `${currentLead.name}@${currentLead.domain}`}
          </span>
        </div>
      </div>

      {/* Waterfall flow */}
      <div className="relative w-full max-w-md">
        {activeProviders.map((provider, index) => {
          const isActive = currentStep >= index;
          const isSuccess = foundAt === index;
          const isPassed = currentStep > index && !isSuccess;
          
          return (
            <div key={provider.id} className="relative">
              {/* Connection line */}
              {index > 0 && (
                <div className="absolute -top-3 left-1/2 w-0.5 h-3 -translate-x-1/2 overflow-hidden">
                  <div 
                    className={`w-full transition-all duration-700 ease-out ${
                      currentStep >= index ? 'h-full' : 'h-0'
                    } bg-gradient-to-b from-slate-600 to-slate-400`}
                  />
                </div>
              )}
              
              {/* Provider card */}
              <div 
                className={`
                  relative flex items-center gap-3 p-2.5 rounded-lg border transition-all duration-700 ease-out transform
                  ${isActive && !isSuccess && !isPassed ? 'border-blue-500/50 bg-blue-500/5 translate-x-1' : ''}
                  ${isSuccess ? 'border-green-500/50 bg-green-500/5 scale-[1.02]' : ''}
                  ${isPassed ? 'border-slate-700 bg-slate-800/30 opacity-40 scale-[0.98]' : 'border-slate-700 bg-slate-800/20'}
                  ${!isActive ? 'opacity-30 scale-95' : ''}
                `}
                style={{
                  transitionDelay: `${index * 50}ms`
                }}
              >
                {/* Logo */}
                <div className="w-16 flex items-center justify-center">
                  <img 
                    src={provider.logo} 
                    alt={provider.name}
                    className={`h-4 w-auto ${!isActive ? 'grayscale opacity-50' : ''}`}
                  />
                </div>
                
                {/* Name */}
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <span className="text-slate-300 text-xs">{provider.name}</span>
                    {provider.isVerifier && (
                      <span className="text-[10px] px-1 py-0.5 bg-slate-700/50 rounded text-slate-500">Verify</span>
                    )}
                  </div>
                </div>
                
                {/* Status indicator */}
                <div className="flex justify-end">
                  {isActive && !isSuccess && !isPassed && (
                    <div className="flex items-center gap-1">
                      <div className="relative">
                        <div className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-pulse" />
                        <div className="absolute inset-0 w-1.5 h-1.5 bg-blue-400 rounded-full animate-ping" />
                      </div>
                      <span className="text-[10px] text-blue-400 animate-pulse">Checking...</span>
                    </div>
                  )}
                  {isSuccess && (
                    <div className="flex items-center gap-1 animate-fadeIn">
                      <svg className="w-4 h-4 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="text-[10px] text-green-400">Found</span>
                    </div>
                  )}
                  {isPassed && (
                    <span className="text-[10px] text-slate-500 transition-opacity duration-300">Not found</span>
                  )}
                </div>
              </div>
              
              {/* Add margin except for last item */}
              {index < activeProviders.length - 1 && <div className="h-2" />}
            </div>
          );
        })}
      </div>

      {/* Result */}
      {showResult && (
        <div className="mt-6 w-full max-w-md animate-fadeIn">
          <div className="p-3 bg-green-500/5 border border-green-500/20 rounded-lg transition-all duration-500">
            <div className="flex items-center justify-center gap-2">
              <svg className="w-4 h-4 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <span className="text-green-400 text-xs">{isPhone ? 'Phone found' : 'Email verified'}</span>
              <span className="text-slate-400 text-xs">•</span>
              <span className="text-slate-300 text-xs font-mono">
                {isPhone ? SAMPLE_PHONES[leadIndex] : `${currentLead.name}@${currentLead.domain}`}
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}