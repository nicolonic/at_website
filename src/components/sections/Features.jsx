import { tokens } from '../../tokens.js';

export default function Features() {
  return (
    <section className="py-20 lg:py-32 bg-white" aria-labelledby="features-heading">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-20">
          <h2 id="features-heading" className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">
            Everything you need to scale
          </h2>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            Built for modern GTM teams who need speed, intelligence, and results.
          </p>
        </div>

        <div className="space-y-20">
          {tokens.features.map((feature, index) => (
            <div
              key={index}
              className="grid lg:grid-cols-2 gap-12 items-center"
            >
              <div className={index % 2 === 1 ? 'lg:order-2' : ''}>
                <div className="mb-4">
                  <span className="text-sm font-mono font-medium text-brand-primary tracking-wide">
                    {feature.kicker}
                  </span>
                  <div className="text-xs text-slate-400 mt-1 font-mono">
                    ITEM {index + 1} : 4
                  </div>
                </div>
                
                <h3 className="text-3xl lg:text-4xl font-bold text-slate-900 mb-6 leading-tight">
                  {feature.title}
                </h3>
                
                <p className="text-lg text-slate-600 leading-relaxed mb-8">
                  {feature.body}
                </p>

                <div className="flex items-center space-x-4 text-sm text-slate-500">
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span>Available now</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <span>Free trial included</span>
                  </div>
                </div>
              </div>

              <div className={`relative ${index % 2 === 1 ? 'lg:order-1' : ''}`}>
                <div className="bg-slate-50 rounded-2xl p-8 aspect-square flex items-center justify-center relative overflow-hidden">
                  <div 
                    className="absolute inset-0 opacity-10"
                    style={{
                      backgroundImage: `
                        linear-gradient(45deg, transparent 30%, rgba(0,0,0,0.1) 30%, rgba(0,0,0,0.1) 70%, transparent 70%),
                        linear-gradient(-45deg, transparent 30%, rgba(0,0,0,0.1) 30%, rgba(0,0,0,0.1) 70%, transparent 70%)
                      `,
                      backgroundSize: '20px 20px'
                    }}
                  />
                  
                  <div className="relative z-10 text-center">
                    <div className="w-24 h-24 bg-gradient-to-br from-brand-primary to-blue-600 rounded-2xl flex items-center justify-center mb-4 mx-auto shadow-lg">
                      <span className="text-3xl font-bold text-white">
                        {String(index + 1).padStart(2, '0')}
                      </span>
                    </div>
                    <div className="text-sm text-slate-500 font-medium">
                      Feature Preview
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-32">
          <div className="bg-slate-900 rounded-3xl p-8 lg:p-12 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-brand-primary/20 to-blue-600/20"></div>
            
            <div className="relative z-10 grid lg:grid-cols-2 gap-8 items-center">
              <div>
                <h3 className="text-3xl lg:text-4xl font-bold text-white mb-6">
                  {tokens.trialCta.title}
                </h3>
                <p className="text-lg text-slate-300 mb-8">
                  No credit card required. Full access to all features. 
                  Cancel anytime.
                </p>
                
                <div className="flex flex-col sm:flex-row gap-4">
                  <a 
                    href={tokens.trialCta.primary.href}
                    className="bg-white text-slate-900 px-8 py-4 rounded-pill text-lg font-semibold hover:bg-slate-100 transition-all duration-200 text-center shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                  >
                    {tokens.trialCta.primary.label}
                  </a>
                  <a 
                    href={tokens.trialCta.secondary.href}
                    className="border-2 border-white text-white px-8 py-4 rounded-pill text-lg font-semibold hover:bg-white hover:text-slate-900 transition-all duration-200 text-center"
                  >
                    {tokens.trialCta.secondary.label}
                  </a>
                </div>
              </div>
              
              <div className="lg:text-right">
                <div className="inline-flex items-center justify-center w-32 h-32 bg-white/10 rounded-2xl backdrop-blur-sm">
                  <div className="w-16 h-16 bg-gradient-to-br from-white/20 to-white/5 rounded-xl flex items-center justify-center">
                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}