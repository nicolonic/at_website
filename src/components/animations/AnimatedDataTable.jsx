import { useState, useEffect, useRef } from 'react';

const MOCK_COMPANIES = [
  { name: 'Vercel', domain: '', industry: '' },
  { name: 'Linear', domain: '', industry: '' },
  { name: 'Stripe', domain: '', industry: '' },
  { name: 'Figma', domain: '', industry: '' },
  { name: 'Notion', domain: '', industry: '' },
];

export default function AnimatedDataTable({ currentTab }) {
  const [rows, setRows] = useState([]);
  const [enrichedData, setEnrichedData] = useState({});
  const [researchData, setResearchData] = useState({});
  const [personalizedMessages, setPersonalizedMessages] = useState({});
  const [leadData, setLeadData] = useState({});
  const animationRef = useRef([]);

  useEffect(() => {
    // Clear all timeouts
    animationRef.current.forEach(timeout => clearTimeout(timeout));
    animationRef.current = [];

    // Reset state
    setRows([]);
    setEnrichedData({});
    setResearchData({});
    setPersonalizedMessages({});
    setLeadData({});

    // Run animation based on current tab
    switch(currentTab) {
      case 0: // Build lists
        animateBuildList();
        break;
      case 1: // Research
        animateResearch();
        break;
      case 2: // Personalize
        animatePersonalize();
        break;
      case 3: // Engage
        animateEngage();
        break;
    }

    return () => {
      animationRef.current.forEach(timeout => clearTimeout(timeout));
    };
  }, [currentTab]);

  const animateBuildList = () => {
    // Progressively add companies
    MOCK_COMPANIES.forEach((company, index) => {
      const timeout = setTimeout(() => {
        setRows(prev => [...prev, { ...company, id: index }]);
      }, index * 300);
      animationRef.current.push(timeout);
    });
  };

  const animateResearch = () => {
    // Start with just company names
    setRows(MOCK_COMPANIES.map((c, i) => ({ ...c, id: i })));
    
    // Step 1: Find domains
    const domains = ['vercel.com', 'linear.app', 'stripe.com', 'figma.com', 'notion.so'];
    MOCK_COMPANIES.forEach((_, index) => {
      const timeout = setTimeout(() => {
        setEnrichedData(prev => ({
          ...prev,
          [index]: { domain: domains[index] }
        }));
      }, 800 + index * 200);
      animationRef.current.push(timeout);
    });

    // Step 2: Find descriptions and recent news
    const descriptions = [
      'Frontend cloud platform for developers',
      'Issue tracking tool for modern teams',
      'Payment infrastructure for the internet',
      'Collaborative design platform',
      'All-in-one workspace for notes & docs'
    ];
    
    const news = [
      'Raised $150M Series D funding',
      'Launched AI-powered features',
      'Expanded to 50 new countries',
      'Acquired by Adobe for $20B',
      'Hit 30M users globally'
    ];

    MOCK_COMPANIES.forEach((_, index) => {
      const timeout = setTimeout(() => {
        setResearchData(prev => ({
          ...prev,
          [index]: {
            description: descriptions[index],
            recentNews: news[index]
          }
        }));
      }, 2500 + index * 300);
      animationRef.current.push(timeout);
    });
  };

  const animatePersonalize = () => {
    // Show companies with research data
    setRows(MOCK_COMPANIES.map((c, i) => ({ ...c, id: i })));
    
    // Show all research data immediately
    const domains = ['vercel.com', 'linear.app', 'stripe.com', 'figma.com', 'notion.so'];
    const fullEnriched = {};
    const fullResearch = {};
    
    MOCK_COMPANIES.forEach((_, i) => {
      fullEnriched[i] = { domain: domains[i] };
      fullResearch[i] = {
        description: 'Technology company',
        recentNews: 'Recent milestone'
      };
    });
    
    setEnrichedData(fullEnriched);
    setResearchData(fullResearch);
    
    // Generate personalized messages based on research
    const messages = [
      "Saw your $150M raise - congrats! Our platform helps...",
      "Your AI features launch aligns perfectly with...",
      "With your global expansion, you'll need...",
      "Post-acquisition, streamlining operations is key...",
      "30M users means scalability matters. We help..."
    ];
    
    MOCK_COMPANIES.forEach((_, index) => {
      const timeout = setTimeout(() => {
        setPersonalizedMessages(prev => ({
          ...prev,
          [index]: messages[index]
        }));
      }, 1000 + index * 400);
      animationRef.current.push(timeout);
    });
  };

  const animateEngage = () => {
    // Show full state with all previous data
    setRows(MOCK_COMPANIES.map((c, i) => ({ ...c, id: i })));
    
    const domains = ['vercel.com', 'linear.app', 'stripe.com', 'figma.com', 'notion.so'];
    const fullEnriched = {};
    const fullResearch = {};
    const fullMessages = {};
    
    MOCK_COMPANIES.forEach((_, i) => {
      fullEnriched[i] = { domain: domains[i] };
      fullResearch[i] = {
        description: 'Technology company',
        recentNews: 'Recent milestone'
      };
      fullMessages[i] = "Personalized outreach message...";
    });
    
    setEnrichedData(fullEnriched);
    setResearchData(fullResearch);
    setPersonalizedMessages(fullMessages);
    
    // Find leads and emails
    const leads = [
      { name: 'Sarah Chen', title: 'VP Sales', email: 's.chen@...' },
      { name: 'Mike Davis', title: 'Head of GTM', email: 'm.davis@...' },
      { name: 'Lisa Park', title: 'CRO', email: 'l.park@...' },
      { name: 'Tom Wilson', title: 'Sales Director', email: 't.wilson@...' },
      { name: 'Amy Brown', title: 'VP Revenue', email: 'a.brown@...' }
    ];
    
    MOCK_COMPANIES.forEach((_, index) => {
      const timeout = setTimeout(() => {
        setLeadData(prev => ({
          ...prev,
          [index]: leads[index]
        }));
      }, 1000 + index * 300);
      animationRef.current.push(timeout);
    });
  };

  return (
    <div className="w-full h-full bg-white/80 backdrop-blur-sm rounded-xl">
      <div className="h-full overflow-hidden">
        <table className="w-full">
          <thead className="bg-slate-50/50">
            <tr className="border-b border-slate-200">
              <th className="text-left py-2.5 px-4 text-xs font-semibold text-slate-700 uppercase tracking-wider">Company</th>
              
              {currentTab >= 1 && (
                <>
                  <th className="text-left py-2.5 px-4 text-xs font-semibold text-slate-700 uppercase tracking-wider">Domain</th>
                  <th className="text-left py-2.5 px-4 text-xs font-semibold text-slate-700 uppercase tracking-wider">Description</th>
                </>
              )}
              
              {currentTab >= 1 && currentTab < 3 && (
                <th className="text-left py-2.5 px-4 text-xs font-semibold text-slate-700 uppercase tracking-wider">Recent News</th>
              )}
              
              {currentTab === 2 && (
                <th className="text-left py-2.5 px-4 text-xs font-semibold text-slate-700 uppercase tracking-wider">Message</th>
              )}
              
              {currentTab === 3 && (
                <>
                  <th className="text-left py-2.5 px-4 text-xs font-semibold text-slate-700 uppercase tracking-wider">Lead</th>
                  <th className="text-left py-2.5 px-4 text-xs font-semibold text-slate-700 uppercase tracking-wider">Email</th>
                  <th className="text-left py-2.5 px-4 text-xs font-semibold text-slate-700 uppercase tracking-wider">Status</th>
                </>
              )}
            </tr>
          </thead>
          <tbody>
            {rows.map((row, index) => (
              <tr 
                key={row.id} 
                className="border-b border-slate-100 transition-all duration-500"
                style={{ 
                  opacity: 0,
                  animation: 'fadeSlideUp 0.5s ease-out forwards',
                  animationDelay: `${index * 100}ms`
                }}
              >
                <td className="py-2.5 px-4">
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 bg-gradient-to-br from-slate-100 to-slate-200 rounded flex items-center justify-center">
                      <span className="text-xs font-bold text-slate-600">
                        {row.name.charAt(0)}
                      </span>
                    </div>
                    <span className="text-sm font-medium text-slate-900">{row.name}</span>
                  </div>
                </td>
                
                {currentTab >= 1 && (
                  <>
                    <td className="py-2.5 px-4 text-sm text-slate-600">
                      {enrichedData[index]?.domain ? (
                        <span className="animate-fade-in">{enrichedData[index].domain}</span>
                      ) : (
                        <div className="h-3 w-20 bg-slate-100 rounded animate-pulse"></div>
                      )}
                    </td>
                    <td className="py-2.5 px-4 text-sm text-slate-600">
                      {researchData[index]?.description ? (
                        <span className="animate-fade-in text-xs">{researchData[index].description}</span>
                      ) : (
                        <div className="h-3 w-32 bg-slate-100 rounded animate-pulse"></div>
                      )}
                    </td>
                  </>
                )}
                
                {currentTab >= 1 && currentTab < 3 && (
                  <td className="py-2.5 px-4 text-sm">
                    {researchData[index]?.recentNews ? (
                      <span className="animate-fade-in text-xs text-blue-600 font-medium">
                        {researchData[index].recentNews}
                      </span>
                    ) : (
                      <div className="h-3 w-28 bg-slate-100 rounded animate-pulse"></div>
                    )}
                  </td>
                )}
                
                {currentTab === 2 && (
                  <td className="py-2.5 px-4 text-sm text-slate-600">
                    {personalizedMessages[index] ? (
                      <div className="animate-fade-in text-xs italic max-w-xs truncate">
                        "{personalizedMessages[index]}"
                      </div>
                    ) : (
                      <div className="h-3 w-48 bg-slate-100 rounded animate-pulse"></div>
                    )}
                  </td>
                )}
                
                {currentTab === 3 && (
                  <>
                    <td className="py-2.5 px-4">
                      {leadData[index] ? (
                        <div className="animate-fade-in">
                          <div className="text-sm font-medium text-slate-900">{leadData[index].name}</div>
                          <div className="text-xs text-slate-500">{leadData[index].title}</div>
                        </div>
                      ) : (
                        <div className="space-y-1">
                          <div className="h-3 w-24 bg-slate-100 rounded animate-pulse"></div>
                          <div className="h-2 w-16 bg-slate-100 rounded animate-pulse"></div>
                        </div>
                      )}
                    </td>
                    <td className="py-2.5 px-4">
                      {leadData[index] ? (
                        <span className="animate-fade-in text-sm text-blue-600 font-mono text-xs">
                          {leadData[index].email}
                        </span>
                      ) : (
                        <div className="h-3 w-28 bg-slate-100 rounded animate-pulse"></div>
                      )}
                    </td>
                    <td className="py-2.5 px-4">
                      {leadData[index] ? (
                        <span className="animate-fade-in inline-flex px-2 py-0.5 text-xs font-medium rounded-full bg-green-100 text-green-700">
                          Ready
                        </span>
                      ) : (
                        <div className="h-5 w-14 bg-slate-100 rounded-full animate-pulse"></div>
                      )}
                    </td>
                  </>
                )}
              </tr>
            ))}
          </tbody>
        </table>
        
        {rows.length === 0 && (
          <div className="flex items-center justify-center h-64">
            <div className="text-center">
              <div className="w-12 h-12 bg-gradient-to-br from-slate-100 to-slate-200 rounded-full mx-auto mb-3 animate-pulse"></div>
              <p className="text-sm text-slate-500">Initializing...</p>
            </div>
          </div>
        )}
      </div>
      
      <style jsx>{`
        @keyframes fadeSlideUp {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
}