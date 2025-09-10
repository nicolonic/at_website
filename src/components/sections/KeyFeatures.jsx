import React, { useState } from 'react';
import WaterfallAnimation from '../animations/WaterfallAnimation';
import AgentAnimation from '../animations/AgentAnimation';

export default function KeyFeatures() {
  const features = [
    {
      id: 'ai',
      title: 'AI Agent',
      description: 'Autonomous research agent that gathers intelligence from across the web',
      details: [
        'LinkedIn profiles & company data',
        'Recent news and funding events',
        'Decision maker discovery with scoring',
        'Website scraping & verification'
      ],
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      )
    },
    {
      id: 'email',
      title: 'Email waterfall',
      description: 'Find verified email addresses using our intelligent waterfall architecture that stops as soon as a verified email is found',
      details: [
        'Sequential waterfall approach for maximum accuracy',
        'Automatic provider selection based on input type',
        'Smart verification chain ensures deliverability',
        'Transparent provider tracking shows data sources'
      ],
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      )
    },
    {
      id: 'phone',
      title: 'Phone waterfall',
      description: 'Discover mobile and direct dial numbers using our intelligent waterfall architecture',
      details: [
        'Sequential processing for best results',
        'Multiple provider fallbacks for coverage',
        'TCPA compliant data sources',
        'Stops at first verified result'
      ],
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
        </svg>
      )
    }
  ];

  const [selectedFeature, setSelectedFeature] = useState('ai');
  const activeFeature = features.find(f => f.id === selectedFeature);

  return (
    <section id="key-features" className="py-16 sm:py-20 lg:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Tab Navigation */}
        <div className="flex justify-center mb-12">
          <div className="flex gap-2 w-full sm:w-auto max-w-lg sm:max-w-none">
            {features.map((feature) => (
              <button
                key={feature.id}
                onClick={() => setSelectedFeature(feature.id)}
                className={`
                  px-4 sm:px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-200 flex-1 sm:flex-initial sm:min-w-[140px]
                  ${selectedFeature === feature.id 
                    ? 'bg-slate-100 text-slate-900 border border-slate-200' 
                    : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
                  }
                `}
              >
                {feature.title}
              </button>
            ))}
          </div>
        </div>

        {/* Feature Content */}
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Left: Content */}
          <div className="space-y-6">
            <div>
              <h3 className="text-2xl lg:text-3xl font-bold text-slate-900 mb-4">
                {activeFeature.title}
              </h3>
              
              <p className="text-lg text-slate-600 leading-relaxed">
                {activeFeature.description}
              </p>
            </div>
            
            <ul className="space-y-2 text-slate-700">
              {activeFeature.details.map((detail, index) => (
                <li key={index} className="flex items-center gap-2">
                  <span className="text-slate-400">•</span>
                  <span className="text-sm">{detail}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Right: Visual */}
          <div className="relative">
            <div className="relative rounded-2xl overflow-hidden shadow-xl bg-slate-900 aspect-[4/3] sm:aspect-video lg:aspect-[16/10]">
              <div className="absolute inset-0 bg-gradient-to-br from-slate-800 to-slate-900">
                {/* Feature-specific animations */}
                {activeFeature.id === 'email' || activeFeature.id === 'phone' ? (
                  <WaterfallAnimation 
                    isActive={true} 
                    isPhone={activeFeature.id === 'phone'}
                  />
                ) : activeFeature.id === 'ai' ? (
                  <AgentAnimation isActive={true} />
                ) : (
                  <div className="flex items-center justify-center h-full">
                    <div className="text-slate-400">
                      {React.cloneElement(activeFeature.icon, { className: 'w-24 h-24' })}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}