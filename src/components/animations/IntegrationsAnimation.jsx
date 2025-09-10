import { useState, useEffect, useRef } from 'react';

// Animation phases
const PHASES = {
  SHOWCASE: 'showcase',
  CONNECTING: 'connecting',
  SENDING: 'sending',
  DELIVERED: 'delivered'
};

// Integration platforms with enhanced details
const INTEGRATIONS = {
  gmail: {
    name: 'Gmail',
    color: '#EA4335',
    bgColor: 'bg-red-50',
    borderColor: 'border-red-200',
    category: 'email',
    features: ['OAuth 2.0', 'Direct send'],
    icon: (
      <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
        <path d="M24 5.457v13.909c0 .904-.732 1.636-1.636 1.636h-3.819V11.73L12 16.64l-6.545-4.91v9.273H1.636A1.636 1.636 0 0 1 0 19.366V5.457c0-2.023 2.309-3.178 3.927-1.964L5.455 4.64 12 9.548l6.545-4.91 1.528-1.145C21.69 2.28 24 3.434 24 5.457z"/>
      </svg>
    )
  },
  outlook: {
    name: 'Outlook',
    color: '#0078D4',
    bgColor: 'bg-blue-50',
    borderColor: 'border-blue-200',
    category: 'email',
    features: ['OAuth 2.0', 'Direct send'],
    icon: (
      <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
        <path d="M7.88 12.04q0 .45-.11.87-.1.41-.33.74-.22.33-.58.52-.37.2-.87.2t-.85-.2q-.35-.21-.57-.55-.22-.33-.33-.75-.1-.42-.1-.86t.1-.87q.1-.43.34-.76.22-.34.59-.54.36-.2.87-.2t.86.2q.35.21.57.55.22.34.31.77.1.43.1.88zM24 12.5v9q0 .62-.44 1.06T22.5 23H9.5q-.62 0-1.06-.44T8 21.5v-9q0-.62.44-1.06T9.5 11H11v-1.5q0-.62.44-1.06T12.5 8H15V6.5q0-.62.44-1.06T16.5 5h6q.62 0 1.06.44T24 6.5V12.5zM18 11h4.5V6.5h-6V8h3q.62 0 1.06.44T21 9.5V11h-3v1.5z"/>
      </svg>
    )
  },
  instantly: {
    name: 'Instantly',
    color: '#7C3AED',
    bgColor: 'bg-purple-50',
    borderColor: 'border-purple-200',
    category: 'sequencer',
    features: ['Warmup', 'Multi-inbox', 'Analytics'],
    logo: '/instantly.png',
    useLogo: true
  },
  smartlead: {
    name: 'Smartlead',
    color: '#10B981',
    bgColor: 'bg-green-50',
    borderColor: 'border-green-200',
    category: 'sequencer',
    features: ['AI warmup', 'Unified inbox', 'Rotation'],
    logo: '/smartlead.png',
    useLogo: true
  },
  lagrowthmachine: {
    name: 'LaGrowthMachine',
    color: '#F59E0B',
    bgColor: 'bg-amber-50',
    borderColor: 'border-amber-200',
    category: 'sequencer',
    features: ['Multi-channel', 'LinkedIn', 'Twitter'],
    logo: '/lgm.jpg',
    useLogo: true
  }
};

export default function IntegrationsAnimation({ isActive = true }) {
  const [selectedIntegration, setSelectedIntegration] = useState('gmail');
  const [animationPhase, setAnimationPhase] = useState(PHASES.SHOWCASE);
  const [hoveredIntegration, setHoveredIntegration] = useState(null);
  const animationTimeouts = useRef([]);

  // Clear timeouts on unmount
  useEffect(() => {
    return () => {
      animationTimeouts.current.forEach(timeout => clearTimeout(timeout));
    };
  }, []);

  // Cycle through integrations for showcase
  useEffect(() => {
    if (!isActive) return;

    const integrationKeys = Object.keys(INTEGRATIONS);
    let currentIndex = 0;

    const cycleIntegrations = () => {
      setSelectedIntegration(integrationKeys[currentIndex]);
      currentIndex = (currentIndex + 1) % integrationKeys.length;
    };

    // Start cycling
    const interval = setInterval(cycleIntegrations, 2000);
    animationTimeouts.current.push(interval);

    return () => {
      clearInterval(interval);
    };
  }, [isActive]);

  return (
    <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-slate-50 to-white p-1 sm:p-4 relative overflow-auto sm:overflow-hidden">
      {/* Subtle background pattern */}
      <div 
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: 'radial-gradient(circle at 2px 2px, #6B7CFF 1px, transparent 1px)',
          backgroundSize: '24px 24px'
        }}
      />
      
      <div className="w-full max-w-4xl relative z-10">
        {/* Main showcase area */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-xl overflow-hidden">
          
          {/* Header */}
          <div className="px-3 sm:px-6 py-2 sm:py-4 border-b border-slate-100 bg-gradient-to-r from-slate-50 to-white">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-[10px] sm:text-sm font-semibold text-slate-900">Integrated with your favorite tools</h3>
                <p className="text-[9px] sm:text-xs text-slate-500 mt-0.5 hidden sm:block">Connect once, send from anywhere</p>
              </div>
              <div className="flex items-center gap-2">
                <span className="flex items-center gap-1 text-[10px] sm:text-xs text-slate-600">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  <span className="hidden sm:inline">Connected</span>
                </span>
              </div>
            </div>
          </div>

          {/* Integration categories */}
          <div className="p-2 sm:p-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-6">
              
              {/* Email Clients */}
              <div className="mt-2 sm:mt-0">
                <div className="text-xs font-medium text-slate-500 mb-2 sm:mb-3 uppercase tracking-wider">Email Clients</div>
                <div className="space-y-1 sm:space-y-2">
                  {Object.entries(INTEGRATIONS)
                    .filter(([_, int]) => int.category === 'email')
                    .map(([key, integration]) => (
                      <div
                        key={key}
                        className={`
                          p-1.5 sm:p-3 rounded-lg sm:rounded-xl border sm:border-2 transition-all duration-500 cursor-pointer
                          ${selectedIntegration === key 
                            ? `${integration.bgColor} ${integration.borderColor} shadow-lg sm:transform sm:scale-105` 
                            : 'bg-white border-slate-200 hover:border-slate-300 hover:shadow-md'
                          }
                        `}
                        onMouseEnter={() => setHoveredIntegration(key)}
                        onMouseLeave={() => setHoveredIntegration(null)}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2 sm:gap-3">
                            <div 
                              className="p-1.5 sm:p-2 rounded-lg bg-white shadow-sm flex items-center justify-center flex-shrink-0"
                              style={{ 
                                color: integration.useLogo ? undefined : integration.color,
                                minWidth: '32px',
                                minHeight: '32px'
                              }}
                            >
                              {integration.useLogo ? (
                                <img 
                                  src={integration.logo} 
                                  alt={integration.name}
                                  className="w-4 h-4 sm:w-6 sm:h-6 object-contain"
                                />
                              ) : (
                                <div className="scale-75 sm:scale-100">{integration.icon}</div>
                              )}
                            </div>
                            <div className="min-w-0 flex-1">
                              <div className="font-medium text-xs sm:text-sm text-slate-900 truncate">{integration.name}</div>
                              <div className="text-[10px] sm:text-xs text-slate-500 mt-0.5 hidden sm:block">
                                {integration.features.join(' • ')}
                              </div>
                            </div>
                          </div>
                          {selectedIntegration === key && (
                            <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                            </svg>
                          )}
                        </div>
                      </div>
                    ))}
                </div>
              </div>

              {/* Sales Engagement Tools */}
              <div className="mt-4 sm:mt-0">
                <div className="text-xs font-medium text-slate-500 mb-2 sm:mb-3 uppercase tracking-wider">Sales Engagement</div>
                <div className="space-y-1 sm:space-y-2">
                  {Object.entries(INTEGRATIONS)
                    .filter(([_, int]) => int.category === 'sequencer')
                    .map(([key, integration]) => (
                      <div
                        key={key}
                        className={`
                          p-1.5 sm:p-3 rounded-lg sm:rounded-xl border sm:border-2 transition-all duration-500 cursor-pointer
                          ${selectedIntegration === key 
                            ? `${integration.bgColor} ${integration.borderColor} shadow-lg sm:transform sm:scale-105` 
                            : 'bg-white border-slate-200 hover:border-slate-300 hover:shadow-md'
                          }
                        `}
                        onMouseEnter={() => setHoveredIntegration(key)}
                        onMouseLeave={() => setHoveredIntegration(null)}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2 sm:gap-3">
                            <div 
                              className="p-1.5 sm:p-2 rounded-lg bg-white shadow-sm flex items-center justify-center flex-shrink-0"
                              style={{ 
                                color: integration.useLogo ? undefined : integration.color,
                                minWidth: '32px',
                                minHeight: '32px'
                              }}
                            >
                              {integration.useLogo ? (
                                <img 
                                  src={integration.logo} 
                                  alt={integration.name}
                                  className="w-4 h-4 sm:w-6 sm:h-6 object-contain"
                                />
                              ) : (
                                <div className="scale-75 sm:scale-100">{integration.icon}</div>
                              )}
                            </div>
                            <div className="min-w-0 flex-1">
                              <div className="font-medium text-xs sm:text-sm text-slate-900 truncate">{integration.name}</div>
                              <div className="text-[10px] sm:text-xs text-slate-500 mt-0.5 hidden sm:block">
                                {integration.features.join(' • ')}
                              </div>
                            </div>
                          </div>
                          {selectedIntegration === key && (
                            <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                            </svg>
                          )}
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}