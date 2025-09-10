import { useState, useEffect, useRef } from 'react';

const DATA_SOURCES = [
  { id: 'linkedin', label: 'LinkedIn', icon: '🔗', color: 'from-blue-400 to-blue-600' },
  { id: 'web', label: 'Web Search', icon: '🌐', color: 'from-purple-400 to-purple-600' },
  { id: 'similar', label: 'Similar Co.', icon: '🔍', color: 'from-green-400 to-green-600' },
  { id: 'jobs', label: 'Job Posts', icon: '💼', color: 'from-orange-400 to-orange-600' },
  { id: 'crm', label: 'CRM/CSV', icon: '📊', color: 'from-pink-400 to-pink-600' },
];

const COMPANY_NAMES = [
  'Vercel', 'Linear', 'Stripe', 'Figma', 'Notion', 'Slack', 'Datadog', 'Segment',
  'Amplitude', 'Mixpanel', 'Retool', 'Airtable', 'Zapier', 'Webflow', 'Framer',
  'Miro', 'Loom', 'Cal.com', 'Supabase', 'Railway', 'Planetscale', 'Upstash',
  'Resend', 'Clerk', 'WorkOS', 'Neon', 'Convex', 'Inngest', 'Trigger.dev'
];

export default function BuildListAnimation({ isActive = true }) {
  const [particles, setParticles] = useState([]);
  const [tableRows, setTableRows] = useState([]);
  const [sourceCounts, setSourceCounts] = useState({});
  const [totalCount, setTotalCount] = useState(0);
  const animationFrame = useRef();
  const particleId = useRef(0);
  const tableRowId = useRef(0);

  useEffect(() => {
    if (!isActive) {
      if (animationFrame.current) {
        cancelAnimationFrame(animationFrame.current);
      }
      return;
    }

    // Reset state
    setParticles([]);
    setTableRows([]);
    setSourceCounts({});
    setTotalCount(0);
    particleId.current = 0;
    tableRowId.current = 0;

    // Start spawning particles
    const spawnInterval = setInterval(() => {
      const sourceIndex = Math.floor(Math.random() * DATA_SOURCES.length);
      const source = DATA_SOURCES[sourceIndex];
      const companyName = COMPANY_NAMES[Math.floor(Math.random() * COMPANY_NAMES.length)];
      
      const newParticle = {
        id: particleId.current++,
        source: source.id,
        sourceData: source,
        company: companyName,
        x: sourceIndex,
        y: 0,
        speed: 1 + Math.random() * 0.5,
        opacity: 1
      };
      
      setParticles(prev => [...prev, newParticle]);
      setSourceCounts(prev => ({
        ...prev,
        [source.id]: (prev[source.id] || 0) + 1
      }));
    }, 300);

    // Animate particles
    const animate = () => {
      setParticles(prev => {
        const updated = prev.map(particle => ({
          ...particle,
          y: particle.y + particle.speed * 2
        }));

        // Check for particles reaching the table
        const remaining = [];
        const completed = [];
        
        updated.forEach(particle => {
          if (particle.y > 60) {
            completed.push(particle);
          } else {
            remaining.push(particle);
          }
        });

        // Add completed particles to table
        if (completed.length > 0) {
          completed.forEach(particle => {
            setTableRows(prev => {
              if (prev.length >= 8) return prev; // Limit table rows
              return [...prev, {
                id: tableRowId.current++,
                company: particle.company,
                source: particle.sourceData,
                timestamp: Date.now()
              }];
            });
            setTotalCount(prev => prev + 1);
          });
        }

        return remaining;
      });

      animationFrame.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      clearInterval(spawnInterval);
      if (animationFrame.current) {
        cancelAnimationFrame(animationFrame.current);
      }
    };
  }, [isActive]);

  return (
    <div className="w-full h-full bg-gradient-to-br from-slate-50 to-white rounded-xl p-6 flex flex-col">
      {/* Header */}
      <div className="mb-4">
        <h3 className="text-sm font-semibold text-slate-700 mb-1">Multi-Source Data Aggregation</h3>
        <p className="text-xs text-slate-500">Pulling from {DATA_SOURCES.length} sources simultaneously</p>
      </div>

      {/* Pipeline Visualization */}
      <div className="flex-1 flex flex-col">
        {/* Source Pipes */}
        <div className="flex justify-between mb-8">
          {DATA_SOURCES.map((source, index) => (
            <div key={source.id} className="flex flex-col items-center flex-1">
              <div className="bg-white rounded-lg shadow-sm border border-slate-200 px-3 py-2 mb-2">
                <div className="flex items-center gap-1">
                  <span className="text-lg">{source.icon}</span>
                  <div>
                    <div className="text-xs font-medium text-slate-700">{source.label}</div>
                    <div className="text-[10px] text-slate-500">
                      {sourceCounts[source.id] || 0} found
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Pipe */}
              <div className="relative w-1 h-24 bg-gradient-to-b from-slate-200 to-slate-300 rounded-full overflow-hidden">
                <div className={`absolute inset-0 bg-gradient-to-b ${source.color} opacity-30`}></div>
                
                {/* Particles in this pipe */}
                {particles
                  .filter(p => p.x === index && p.y < 24)
                  .map(particle => (
                    <div
                      key={particle.id}
                      className="absolute w-1 h-1 bg-white rounded-full"
                      style={{
                        top: `${(particle.y / 24) * 100}%`,
                        boxShadow: '0 0 4px rgba(255,255,255,0.8)'
                      }}
                    />
                  ))}
              </div>
            </div>
          ))}
        </div>

        {/* Convergence Funnel */}
        <div className="flex justify-center mb-4">
          <svg width="200" height="40" viewBox="0 0 200 40" className="opacity-30">
            <path
              d="M 0,0 L 200,0 L 150,40 L 50,40 Z"
              fill="none"
              stroke="rgb(148, 163, 184)"
              strokeWidth="2"
              strokeDasharray="4 2"
            />
          </svg>
        </div>

        {/* Smart Table */}
        <div className="bg-white rounded-lg border border-slate-200 shadow-sm overflow-hidden">
          <div className="bg-slate-50 px-4 py-2 border-b border-slate-200">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-xs font-medium text-slate-700">Smart Table</span>
              </div>
              <span className="text-xs text-slate-500 font-medium">
                {totalCount} companies aggregated
              </span>
            </div>
          </div>
          
          <div className="overflow-hidden">
            <table className="w-full text-xs">
              <thead className="bg-slate-50 border-b border-slate-100">
                <tr>
                  <th className="text-left px-3 py-1.5 font-medium text-slate-600">Company</th>
                  <th className="text-left px-3 py-1.5 font-medium text-slate-600">Source</th>
                  <th className="text-left px-3 py-1.5 font-medium text-slate-600">Status</th>
                </tr>
              </thead>
              <tbody>
                {tableRows.slice(-8).map((row, index) => (
                  <tr 
                    key={row.id} 
                    className="border-b border-slate-50 animate-slideUp"
                    style={{ animationDelay: `${index * 50}ms` }}
                  >
                    <td className="px-3 py-1.5 font-medium text-slate-700">{row.company}</td>
                    <td className="px-3 py-1.5">
                      <span className="inline-flex items-center gap-1">
                        <span>{row.source.icon}</span>
                        <span className="text-slate-600">{row.source.label}</span>
                      </span>
                    </td>
                    <td className="px-3 py-1.5">
                      <span className="inline-flex items-center gap-1 text-green-600">
                        <span className="w-1.5 h-1.5 bg-green-500 rounded-full"></span>
                        <span className="text-[10px]">Added</span>
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            
            {tableRows.length === 0 && (
              <div className="px-3 py-8 text-center">
                <div className="text-xs text-slate-400">Aggregating data sources...</div>
              </div>
            )}
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-slideUp {
          animation: slideUp 0.3s ease-out forwards;
        }
      `}</style>
    </div>
  );
}