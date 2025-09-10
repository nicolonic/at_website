import { useState, useEffect, useRef } from 'react';

// Animation phases for Research
const PHASES = {
  IDLE: 'idle',
  FINDING_DOMAINS: 'findingDomains',
  FINDING_INFO: 'findingInfo',
  FINDING_SIZE: 'findingSize',
  FINDING_NEWS: 'findingNews',
  CALCULATING_PRIORITY: 'calculatingPriority',
  DONE: 'done'
};

// Initial companies without enrichment
const initialCompanies = [
  { id: '1', name: 'Vercel', icpStatus: true },
  { id: '2', name: 'Linear', icpStatus: true },
  { id: '3', name: 'Stripe', icpStatus: false },
  { id: '4', name: 'Figma', icpStatus: true },
  { id: '5', name: 'Notion', icpStatus: true },
  { id: '6', name: 'Amplitude', icpStatus: false },
  { id: '7', name: 'Segment', icpStatus: true },
  { id: '8', name: 'Datadog', icpStatus: true },
];

// Mock enrichment data
const mockDomains = {
  '1': 'vercel.com',
  '2': 'linear.app',
  '3': 'stripe.com',
  '4': 'figma.com',
  '5': 'notion.so',
  '6': 'amplitude.com',
  '7': 'segment.com',
  '8': 'datadoghq.com'
};

const mockDescriptions = {
  '1': 'Frontend cloud platform enabling developers to build, scale, and secure faster web',
  '2': 'Streamlined issue tracking and project management for modern software teams',
  '3': 'Payment infrastructure powering millions of businesses worldwide',
  '4': 'Collaborative design platform for teams to create, prototype, and iterate together',
  '5': 'All-in-one workspace for notes, docs, and collaboration',
  '6': 'Product analytics platform for digital optimization',
  '7': 'Customer data platform that collects and routes events',
  '8': 'Cloud monitoring and security platform for modern infrastructure'
};

const mockNews = {
  '1': 'Raised $250M Series E at $3.25B valuation',
  '2': 'Launched AI-powered automation features',
  '3': 'Expanded to 50+ countries globally',
  '4': 'Adobe acquisition completed for $20B',
  '5': 'Reached 35M users, added AI capabilities',
  '6': 'New real-time analytics engine released',
  '7': 'Twilio announces strategic partnership',
  '8': 'Q3 revenue up 25% year-over-year'
};

const mockCompanySize = {
  '1': '500-1000',
  '2': '100-250',
  '3': '5000+',
  '4': '1000-5000',
  '5': '250-500',
  '6': '100-250',
  '7': '500-1000',
  '8': '10000+'
};

const mockPriority = {
  '1': { label: 'High', icon: '🔥', color: 'bg-red-50 text-red-600' },
  '2': { label: 'Growing', icon: '📈', color: 'bg-green-50 text-green-600' },
  '3': { label: 'Steady', icon: '✓', color: 'bg-gray-50 text-gray-600' },
  '4': { label: 'Urgent', icon: '⚡', color: 'bg-orange-50 text-orange-600' },
  '5': { label: 'High', icon: '🔥', color: 'bg-red-50 text-red-600' },
  '6': { label: 'Medium', icon: '•', color: 'bg-blue-50 text-blue-600' },
  '7': { label: 'Growing', icon: '📈', color: 'bg-green-50 text-green-600' },
  '8': { label: 'Steady', icon: '✓', color: 'bg-gray-50 text-gray-600' }
};

export default function ResearchAnimation({ isActive = true }) {
  const [phase, setPhase] = useState(PHASES.IDLE);
  const [companies, setCompanies] = useState(initialCompanies.map(c => ({
    ...c,
    domain: null,
    description: null,
    companySize: null,
    news: null,
    priority: null,
    revealed: { domain: false, description: false, companySize: false, news: false, priority: false },
    highlighted: { domain: false, description: false, companySize: false, news: false, priority: false }
  })));
  
  const [domainsFound, setDomainsFound] = useState(0);
  const [descriptionsFound, setDescriptionsFound] = useState(0);
  const [companySizesFound, setCompanySizesFound] = useState(0);
  const [newsFound, setNewsFound] = useState(0);
  const [prioritiesCalculated, setPrioritiesCalculated] = useState(0);
  
  const domainQueueRef = useRef([]);
  const descriptionQueueRef = useRef([]);
  const companySizeQueueRef = useRef([]);
  const newsQueueRef = useRef([]);
  const priorityQueueRef = useRef([]);
  const animationTimeouts = useRef([]);
  const isActiveRef = useRef(isActive);

  // Clear timeouts on unmount
  useEffect(() => {
    return () => {
      animationTimeouts.current.forEach(timeout => clearTimeout(timeout));
    };
  }, []);

  // Function to reset and restart animation
  const resetAnimation = () => {
    // Clear all existing timeouts
    animationTimeouts.current.forEach(timeout => clearTimeout(timeout));
    animationTimeouts.current = [];
    
    // Reset all state
    setPhase(PHASES.IDLE);
    setDomainsFound(0);
    setDescriptionsFound(0);
    setCompanySizesFound(0);
    setNewsFound(0);
    setPrioritiesCalculated(0);
    
    // Reset companies to initial state
    setCompanies(initialCompanies.map(c => ({
      ...c,
      domain: null,
      description: null,
      companySize: null,
      news: null,
      priority: null,
      revealed: { domain: false, description: false, companySize: false, news: false, priority: false },
      highlighted: { domain: false, description: false, companySize: false, news: false, priority: false }
    })));
    
    // Clear all queues
    domainQueueRef.current = [];
    descriptionQueueRef.current = [];
    companySizeQueueRef.current = [];
    newsQueueRef.current = [];
    priorityQueueRef.current = [];
    
    // Start animation sequence after a brief pause
    const startTimer = setTimeout(() => {
      setPhase(PHASES.FINDING_DOMAINS);
      findDomains();
    }, 1000);
    
    animationTimeouts.current.push(startTimer);
  };

  // Update isActiveRef when prop changes
  useEffect(() => {
    isActiveRef.current = isActive;
  }, [isActive]);

  // Start animation when active
  useEffect(() => {
    if (!isActive) return;
    
    resetAnimation();
    
    return () => {
      animationTimeouts.current.forEach(timeout => clearTimeout(timeout));
    };
  }, [isActive]);

  const findDomains = () => {
    // Queue domains for all companies (not just ICP)
    const domainOrder = [...initialCompanies].sort(() => Math.random() - 0.5);
    
    domainOrder.forEach((company, index) => {
      const timeout = setTimeout(() => {
        domainQueueRef.current.push({
          id: company.id,
          domain: mockDomains[company.id]
        });
      }, 200 + index * (150 + Math.random() * 200));
      animationTimeouts.current.push(timeout);
    });
    
    // Move to next phase
    const phaseTimeout = setTimeout(() => {
      setPhase(PHASES.FINDING_INFO);
      findDescriptions();
    }, 200 + domainOrder.length * 300);
    animationTimeouts.current.push(phaseTimeout);
  };

  const findDescriptions = () => {
    // Only enrich ICP matches
    const icpCompanies = initialCompanies.filter(c => c.icpStatus);
    const descOrder = [...icpCompanies].sort(() => Math.random() - 0.5);
    
    descOrder.forEach((company, index) => {
      const timeout = setTimeout(() => {
        descriptionQueueRef.current.push({
          id: company.id,
          description: mockDescriptions[company.id]
        });
      }, 300 + index * (200 + Math.random() * 250));
      animationTimeouts.current.push(timeout);
    });
    
    // Move to next phase
    const phaseTimeout = setTimeout(() => {
      setPhase(PHASES.FINDING_SIZE);
      findCompanySizes();
    }, 300 + descOrder.length * 400);
    animationTimeouts.current.push(phaseTimeout);
  };

  const findCompanySizes = () => {
    // Only for ICP matches
    const icpCompanies = initialCompanies.filter(c => c.icpStatus);
    const sizeOrder = [...icpCompanies].sort(() => Math.random() - 0.5);
    
    sizeOrder.forEach((company, index) => {
      const timeout = setTimeout(() => {
        companySizeQueueRef.current.push({
          id: company.id,
          companySize: mockCompanySize[company.id]
        });
      }, 200 + index * (150 + Math.random() * 200));
      animationTimeouts.current.push(timeout);
    });
    
    // Move to next phase
    const phaseTimeout = setTimeout(() => {
      setPhase(PHASES.FINDING_NEWS);
      findNews();
    }, 200 + sizeOrder.length * 350);
    animationTimeouts.current.push(phaseTimeout);
  };

  const findNews = () => {
    // Only get news for ICP matches
    const icpCompanies = initialCompanies.filter(c => c.icpStatus);
    const newsOrder = [...icpCompanies].sort(() => Math.random() - 0.5);
    
    newsOrder.forEach((company, index) => {
      const timeout = setTimeout(() => {
        newsQueueRef.current.push({
          id: company.id,
          news: mockNews[company.id]
        });
      }, 200 + index * (150 + Math.random() * 200));
      animationTimeouts.current.push(timeout);
    });
    
    // Move to priority calculation
    const phaseTimeout = setTimeout(() => {
      setPhase(PHASES.CALCULATING_PRIORITY);
      calculatePriorities();
    }, 200 + newsOrder.length * 350);
    animationTimeouts.current.push(phaseTimeout);
  };

  const calculatePriorities = () => {
    // Calculate priority for ICP matches
    const icpCompanies = initialCompanies.filter(c => c.icpStatus);
    const priorityOrder = [...icpCompanies].sort(() => Math.random() - 0.5);
    
    priorityOrder.forEach((company, index) => {
      const timeout = setTimeout(() => {
        priorityQueueRef.current.push({
          id: company.id,
          priority: mockPriority[company.id]
        });
      }, 150 + index * (100 + Math.random() * 150));
      animationTimeouts.current.push(timeout);
    });
    
    // Mark complete then restart after a pause
    const phaseTimeout = setTimeout(() => {
      setPhase(PHASES.DONE);
      
      // Restart animation after 3 seconds
      const restartTimeout = setTimeout(() => {
        if (isActiveRef.current) {
          resetAnimation();
        }
      }, 3000);
      animationTimeouts.current.push(restartTimeout);
    }, 150 + priorityOrder.length * 250);
    animationTimeouts.current.push(phaseTimeout);
  };

  // Process queues at steady pace
  useEffect(() => {
    const revealInterval = setInterval(() => {
      // Process domain queue
      if (domainQueueRef.current.length > 0) {
        const item = domainQueueRef.current.shift();
        setCompanies(prev => prev.map(c => {
          if (c.id === item.id) {
            return {
              ...c,
              domain: item.domain,
              revealed: { ...c.revealed, domain: true },
              highlighted: { ...c.highlighted, domain: true }
            };
          }
          return c;
        }));
        
        setDomainsFound(prev => prev + 1);
        
        // Remove highlight
        setTimeout(() => {
          setCompanies(prev => prev.map(c => 
            c.id === item.id 
              ? { ...c, highlighted: { ...c.highlighted, domain: false } }
              : c
          ));
        }, 300);
      }
      
      // Process description queue
      if (descriptionQueueRef.current.length > 0) {
        const item = descriptionQueueRef.current.shift();
        setCompanies(prev => prev.map(c => {
          if (c.id === item.id) {
            return {
              ...c,
              description: item.description,
              revealed: { ...c.revealed, description: true },
              highlighted: { ...c.highlighted, description: true }
            };
          }
          return c;
        }));
        
        setDescriptionsFound(prev => prev + 1);
        
        setTimeout(() => {
          setCompanies(prev => prev.map(c => 
            c.id === item.id 
              ? { ...c, highlighted: { ...c.highlighted, description: false } }
              : c
          ));
        }, 300);
      }
      
      // Process company size queue
      if (companySizeQueueRef.current.length > 0) {
        const item = companySizeQueueRef.current.shift();
        setCompanies(prev => prev.map(c => {
          if (c.id === item.id) {
            return {
              ...c,
              companySize: item.companySize,
              revealed: { ...c.revealed, companySize: true },
              highlighted: { ...c.highlighted, companySize: true }
            };
          }
          return c;
        }));
        
        setCompanySizesFound(prev => prev + 1);
        
        setTimeout(() => {
          setCompanies(prev => prev.map(c => 
            c.id === item.id 
              ? { ...c, highlighted: { ...c.highlighted, companySize: false } }
              : c
          ));
        }, 300);
      }
      
      // Process news queue
      if (newsQueueRef.current.length > 0) {
        const item = newsQueueRef.current.shift();
        setCompanies(prev => prev.map(c => {
          if (c.id === item.id) {
            return {
              ...c,
              news: item.news,
              revealed: { ...c.revealed, news: true },
              highlighted: { ...c.highlighted, news: true }
            };
          }
          return c;
        }));
        
        setNewsFound(prev => prev + 1);
        
        setTimeout(() => {
          setCompanies(prev => prev.map(c => 
            c.id === item.id 
              ? { ...c, highlighted: { ...c.highlighted, news: false } }
              : c
          ));
        }, 300);
      }
      
      // Process priority queue
      if (priorityQueueRef.current.length > 0) {
        const item = priorityQueueRef.current.shift();
        setCompanies(prev => prev.map(c => {
          if (c.id === item.id) {
            return {
              ...c,
              priority: item.priority,
              revealed: { ...c.revealed, priority: true },
              highlighted: { ...c.highlighted, priority: true }
            };
          }
          return c;
        }));
        
        setPrioritiesCalculated(prev => prev + 1);
        
        setTimeout(() => {
          setCompanies(prev => prev.map(c => 
            c.id === item.id 
              ? { ...c, highlighted: { ...c.highlighted, priority: false } }
              : c
          ));
        }, 300);
      }
    }, 140); // Steady reveal rate
    
    return () => clearInterval(revealInterval);
  }, []);

  const totalICP = initialCompanies.filter(c => c.icpStatus).length;

  return (
    <div className="w-full h-full bg-white rounded-xl flex flex-col">
      {/* Table */}
      <div className="flex-1 overflow-x-auto overflow-y-auto relative">
        <table className="w-full text-[10px] sm:text-[13px]">
          <thead className="bg-gray-50 border-b border-[#E9EDF2] sticky top-0 z-10">
            <tr className="h-8 sm:h-11">
              <th className="px-1 sm:px-2 text-left font-medium text-neutral-600 text-[8px] sm:text-[10px] uppercase tracking-wider">Company</th>
              <th className="px-1 sm:px-2 text-left font-medium text-neutral-600 text-[8px] sm:text-[10px] uppercase tracking-wider hidden sm:table-cell">ICP</th>
              <th className="px-1 sm:px-2 text-left font-medium text-neutral-600 text-[8px] sm:text-[10px] uppercase tracking-wider">
                <div className="flex items-center">
                  <span>Domain</span>
                  {phase !== PHASES.IDLE && (
                    <span className="ml-1 text-[7px] sm:text-[9px] text-neutral-400 font-normal">
                      {domainsFound}/{initialCompanies.length}
                    </span>
                  )}
                </div>
              </th>
              <th className="px-1 sm:px-2 text-left font-medium text-neutral-600 text-[8px] sm:text-[10px] uppercase tracking-wider hidden md:table-cell">
                <div className="flex items-center">
                  <span>Description</span>
                  {(phase !== PHASES.IDLE && phase !== PHASES.FINDING_DOMAINS) && (
                    <span className="ml-1 text-[7px] sm:text-[9px] text-neutral-400 font-normal">
                      {descriptionsFound}/{totalICP}
                    </span>
                  )}
                </div>
              </th>
              <th className="px-1 sm:px-2 text-left font-medium text-neutral-600 text-[8px] sm:text-[10px] uppercase tracking-wider">
                <div className="flex items-center">
                  <span>Size</span>
                  {(phase === PHASES.FINDING_SIZE || phase === PHASES.FINDING_NEWS || phase === PHASES.CALCULATING_PRIORITY || phase === PHASES.DONE) && (
                    <span className="ml-1 text-[7px] sm:text-[9px] text-neutral-400 font-normal">
                      {companySizesFound}/{totalICP}
                    </span>
                  )}
                </div>
              </th>
              <th className="px-1 sm:px-2 text-left font-medium text-neutral-600 text-[8px] sm:text-[10px] uppercase tracking-wider">
                <div className="flex items-center">
                  <span className="hidden sm:inline">Recent News</span>
                  <span className="sm:hidden">News</span>
                  {(phase === PHASES.FINDING_NEWS || phase === PHASES.CALCULATING_PRIORITY || phase === PHASES.DONE) && (
                    <span className="ml-1 text-[7px] sm:text-[9px] text-neutral-400 font-normal">
                      {newsFound}/{totalICP}
                    </span>
                  )}
                </div>
              </th>
              <th className="px-1 sm:px-2 text-left font-medium text-neutral-600 text-[8px] sm:text-[10px] uppercase tracking-wider">
                <div className="flex items-center">
                  <span>Priority</span>
                  {(phase === PHASES.CALCULATING_PRIORITY || phase === PHASES.DONE) && (
                    <span className="ml-1 text-[7px] sm:text-[9px] text-neutral-400 font-normal">
                      {prioritiesCalculated}/{totalICP}
                    </span>
                  )}
                </div>
              </th>
            </tr>
          </thead>
          <tbody>
            {companies.slice(0, 8).map((company) => (
              <tr key={company.id} className="border-b border-[#E9EDF2] hover:bg-gray-50/50 transition-colors h-8 sm:h-11">
                <td className="px-1 sm:px-2 text-neutral-700 font-medium text-[10px] sm:text-[12px]">
                  {company.name}
                </td>
                <td className="px-1 sm:px-2 hidden sm:table-cell">
                  <span className={`inline-flex items-center h-3 sm:h-4 px-1 sm:px-1.5 rounded text-[8px] sm:text-[10px] font-medium ${
                    company.icpStatus 
                      ? 'bg-teal-50/60 text-teal-600' 
                      : 'bg-gray-50 text-gray-500'
                  }`}>
                    {company.icpStatus ? '✓' : '—'}
                  </span>
                </td>
                <td className={`px-1 sm:px-2 text-gray-600 text-[9px] sm:text-[11px] transition-all duration-200 ${
                  company.highlighted.domain ? 'bg-blue-50/40' : ''
                }`}>
                  {!company.revealed.domain ? (
                    <div className="h-1.5 sm:h-2 bg-gray-200 rounded w-12 sm:w-16 animate-pulse opacity-40"></div>
                  ) : (
                    <span className="text-blue-600 truncate block">{company.domain}</span>
                  )}
                </td>
                <td className={`px-1 sm:px-2 text-gray-700 text-[8px] sm:text-[10px] transition-all duration-200 hidden md:table-cell ${
                  company.highlighted.description ? 'bg-blue-50/40' : ''
                }`}>
                  {!company.revealed.description ? (
                    company.icpStatus ? (
                      <div className="h-1.5 sm:h-2 bg-gray-200 rounded w-20 sm:w-32 animate-pulse opacity-40"></div>
                    ) : (
                      <span className="text-gray-400">—</span>
                    )
                  ) : (
                    <div className="truncate">
                      {company.description || <span className="text-gray-400">—</span>}
                    </div>
                  )}
                </td>
                <td className={`px-1 sm:px-2 text-gray-700 text-[9px] sm:text-[11px] font-medium transition-all duration-200 ${
                  company.highlighted.companySize ? 'bg-blue-50/40' : ''
                }`}>
                  {!company.revealed.companySize ? (
                    company.icpStatus ? (
                      <div className="h-1.5 sm:h-2 bg-gray-200 rounded w-10 sm:w-14 animate-pulse opacity-40"></div>
                    ) : (
                      <span className="text-gray-400">—</span>
                    )
                  ) : (
                    <span className="text-slate-700">
                      {company.companySize || <span className="text-gray-400">—</span>}
                    </span>
                  )}
                </td>
                <td className={`px-1 sm:px-2 text-[8px] sm:text-[10px] transition-all duration-200 ${
                  company.highlighted.news ? 'bg-blue-50/40' : ''
                }`}>
                  {!company.revealed.news ? (
                    company.icpStatus ? (
                      <div className="h-1.5 sm:h-2 bg-gray-200 rounded w-16 sm:w-24 animate-pulse opacity-40"></div>
                    ) : (
                      <span className="text-gray-400">—</span>
                    )
                  ) : (
                    <span className="text-purple-600 font-medium truncate block">
                      {company.news || <span className="text-gray-400">—</span>}
                    </span>
                  )}
                </td>
                <td className={`px-1 sm:px-2 transition-all duration-200 ${
                  company.highlighted.priority ? 'bg-yellow-50/60' : ''
                }`}>
                  {!company.revealed.priority ? (
                    company.icpStatus ? (
                      <div className="h-3 sm:h-5 bg-gray-200 rounded-full w-12 sm:w-16 animate-pulse opacity-40"></div>
                    ) : (
                      <span className="text-gray-400">—</span>
                    )
                  ) : (
                    company.priority ? (
                      <span className={`inline-flex items-center gap-0.5 sm:gap-1 px-1 sm:px-2 py-0.5 rounded-full text-[8px] sm:text-[10px] font-semibold ${company.priority.color}`}>
                        <span className="hidden sm:inline">{company.priority.icon}</span>
                        <span>{company.priority.label}</span>
                      </span>
                    ) : (
                      <span className="text-gray-400">—</span>
                    )
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        
        {/* Bottom fade */}
        <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-6 bg-gradient-to-t from-white via-white/80 to-transparent" />
      </div>
    </div>
  );
}