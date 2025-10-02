import { Link } from 'react-router';
import { tokens } from '../../tokens.js';

export default function Hero() {
  return (
    <section 
      className="relative pt-24 pb-16 sm:pt-28 sm:pb-20 lg:pt-32 lg:pb-24 overflow-hidden bg-gradient-to-b from-white to-white"
      aria-labelledby="hero-heading"
    >
      {/* Soft Organic Gradient Background */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        {/* Multiple soft gradient blobs for organic feel */}
        <div className="absolute -top-40 -left-40 w-[600px] h-[600px] bg-blue-200 rounded-full mix-blend-multiply filter blur-2xl opacity-50 animate-blob"></div>
        <div className="absolute -top-40 -right-40 w-[600px] h-[600px] bg-pink-200 rounded-full mix-blend-multiply filter blur-2xl opacity-50 animate-blob animation-delay-2000"></div>
        <div className="absolute top-20 left-1/3 w-[500px] h-[500px] bg-purple-200 rounded-full mix-blend-multiply filter blur-2xl opacity-40 animate-blob animation-delay-4000"></div>
        <div className="absolute -bottom-8 right-1/4 w-[500px] h-[500px] bg-yellow-100 rounded-full mix-blend-multiply filter blur-2xl opacity-40 animate-blob"></div>
        
        {/* Gradient Overlay - Fade to White at Bottom */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent via-white/30 to-white"></div>
        
        {/* Very subtle grain */}
        <div className="absolute inset-0 grain-texture opacity-10"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <div className="mb-6">
            <span 
              className="inline-flex items-center px-4 py-2 rounded-pill text-sm font-medium bg-chip-bg border-2 border-chip-border text-slate-700 shadow-sm"
              role="status"
              aria-label="Product announcement"
            >
              {tokens.hero.chipText}
            </span>
          </div>

          <h1 
            id="hero-heading"
            className="text-4xl sm:text-5xl lg:text-6xl font-bold text-slate-900 mb-6 leading-tight"
            style={{ 
              fontSize: 'clamp(2.25rem, 4.5vw, 4rem)',
              lineHeight: '1.1'
            }}
          >
            {tokens.hero.title}
          </h1>

          <p 
            className="text-lg sm:text-xl lg:text-2xl text-slate-600 mb-10 max-w-2xl mx-auto leading-relaxed"
          >
            {tokens.hero.subtitle}
          </p>

          <div className="flex flex-col sm:flex-row gap-3 justify-center items-center">
            <Link 
              to={tokens.hero.primaryCta.href}
              className="w-full sm:w-auto bg-brand-primary text-white px-6 py-3 rounded-pill text-base font-semibold hover:bg-blue-600 transition-all duration-200 min-h-[44px] flex items-center justify-center shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
              aria-describedby="primary-cta-description"
            >
              {tokens.hero.primaryCta.label}
            </Link>
            <span id="primary-cta-description" className="sr-only">
              Book a demo with the {tokens.brand.name} team
            </span>

            <a 
              href={tokens.hero.secondaryCta.href}
              className="w-full sm:w-auto border-2 border-slate-300 text-slate-700 px-6 py-3 rounded-pill text-base font-semibold hover:border-slate-400 hover:bg-slate-50 transition-all duration-200 min-h-[44px] flex items-center justify-center"
              aria-describedby="secondary-cta-description"
            >
              {tokens.hero.secondaryCta.label}
            </a>
            <span id="secondary-cta-description" className="sr-only">
              Learn how Smart Table works
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
