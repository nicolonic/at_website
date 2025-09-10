import { Link } from 'react-router';
import { tokens } from '../../tokens.js';

export default function TrialCTA() {
  return (
    <section aria-label="Start your free trial" className="py-20 sm:py-24 bg-white">
      <div className="mx-auto max-w-7xl px-6 sm:px-8">
        {/* Card container with blobs inside */}
        <div className="relative overflow-hidden rounded-[28px] bg-white ring-1 ring-slate-200 shadow-xl">
          {/* Soft Organic Gradient Background - inside the card */}
          <div className="absolute inset-0 z-0 overflow-hidden">
            {/* Multiple soft gradient blobs for organic feel */}
            <div className="absolute -top-20 -left-20 w-[400px] h-[400px] bg-blue-200 rounded-full mix-blend-multiply filter blur-2xl opacity-50 animate-blob"></div>
            <div className="absolute -top-20 -right-20 w-[400px] h-[400px] bg-pink-200 rounded-full mix-blend-multiply filter blur-2xl opacity-50 animate-blob animation-delay-2000"></div>
            <div className="absolute bottom-10 left-1/3 w-[350px] h-[350px] bg-purple-200 rounded-full mix-blend-multiply filter blur-2xl opacity-40 animate-blob animation-delay-4000"></div>
            <div className="absolute -bottom-8 right-1/4 w-[350px] h-[350px] bg-yellow-100 rounded-full mix-blend-multiply filter blur-2xl opacity-40 animate-blob"></div>
            
            {/* Gradient Overlay - Fade to White at Bottom */}
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent via-white/30 to-white"></div>
            
            {/* Very subtle grain */}
            <div className="absolute inset-0 grain-texture opacity-10"></div>
          </div>

          <div className="relative z-10 px-6 py-12 sm:px-10 sm:py-14">
            <div className="grid items-center gap-10 lg:grid-cols-12">
              {/* Left: Content */}
              <div className="lg:col-span-8">
                <h2 className="text-4xl/[1.1] sm:text-5xl font-bold text-slate-900">
                  Start with a 14-day free trial.
                </h2>
                <p className="mt-4 text-lg sm:text-xl text-slate-600 leading-relaxed">
                  No credit card required. Full access to all features. Cancel anytime.
                </p>

                <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                  <Link
                    to={tokens.trialCta.primary.href}
                    className="inline-flex items-center justify-center rounded-pill bg-brand-primary text-white px-6 py-3 text-base font-semibold hover:bg-blue-600 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 min-h-[44px] w-full sm:w-auto"
                    onClick={() => {
                      // Track analytics event
                      if (typeof window !== 'undefined' && window.analytics) {
                        window.analytics.track('cta_click_primary', {
                          variant: 'trial_cta',
                          copy: 'Start for free',
                          placement: 'bottom'
                        });
                      }
                    }}
                  >
                    Start for free
                    <svg className="ml-2 h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </Link>
                  <Link
                    to={tokens.trialCta.secondary.href}
                    className="inline-flex items-center justify-center rounded-pill border-2 border-slate-300 text-slate-700 px-6 py-3 text-base font-semibold hover:border-slate-400 hover:bg-slate-50 transition-all duration-200 min-h-[44px] w-full sm:w-auto"
                    onClick={() => {
                      // Track analytics event
                      if (typeof window !== 'undefined' && window.analytics) {
                        window.analytics.track('cta_click_secondary', {
                          variant: 'trial_cta',
                          copy: 'See plans',
                          placement: 'bottom'
                        });
                      }
                    }}
                  >
                    See plans
                  </Link>
                </div>

                {/* Trust row */}
                <div className="mt-6 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-slate-600">
                  <span className="flex items-center gap-1">
                    <svg className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    No credit card
                  </span>
                  <span className="flex items-center gap-1">
                    <svg className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    Full feature access
                  </span>
                  <span className="flex items-center gap-1">
                    <svg className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    Cancel anytime
                  </span>
                </div>
              </div>

              {/* Right: Visual */}
              <div className="lg:col-span-4 hidden lg:block">
                <div className="mx-auto grid h-44 w-44 place-items-center rounded-2xl bg-white/80 backdrop-blur-sm ring-1 ring-slate-200 shadow-lg">
                  <img 
                    src="/at_fav.svg" 
                    alt="Autotouch AI" 
                    className="w-20 h-20"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}