import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router';
import { tokens } from '../../tokens.js';

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  const isHomePage = location.pathname === '/';

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > tokens.header.scrollThreshold);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const headerStyle = {
    height: isScrolled ? `${tokens.header.heightScrolled}px` : `${tokens.header.heightStart}px`,
  };

  const headerContainerClass = isScrolled
    ? 'fixed top-0 left-1/2 -translate-x-1/2 z-40 transition-all duration-500 ease-out bg-white/80 backdrop-blur-md shadow-lg md:rounded-full md:mt-3 md:w-[720px] w-full'
    : 'fixed top-0 left-1/2 -translate-x-1/2 z-40 transition-all duration-500 ease-out w-full max-w-none';

  const ctaClass = isScrolled
    ? 'bg-brand-primary text-white hover:bg-blue-600'
    : 'border border-brand-primary text-brand-primary hover:bg-brand-primary hover:text-white';

  return (
    <>
      <a 
        href="#main-content" 
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-brand-primary text-white px-4 py-2 rounded-md z-50"
      >
        Skip to main content
      </a>
      
      <header 
        className={headerContainerClass}
        style={headerStyle}
      >
        <div className={`${isScrolled ? 'px-4 w-full' : 'max-w-7xl px-4 sm:px-6 lg:px-8'} mx-auto h-full transition-all duration-300`}>
          <div className="flex items-center justify-between h-full">
            {/* Logo - Left */}
            <div className="flex items-center">
              <Link to="/" className="flex items-center" aria-label={`${tokens.brand.name} homepage`}>
                <img 
                  src={tokens.brand.logoSrc} 
                  alt={tokens.brand.name}
                  className={`${isScrolled ? 'h-10 md:h-12' : 'h-14'} w-auto transition-all duration-300`}
                  loading="eager"
                  decoding="async"
                  style={{ 
                    willChange: 'transform',
                    contain: 'layout style paint'
                  }}
                />
              </Link>
            </div>

            {/* Navigation - Center */}
            <nav className="hidden md:flex items-center space-x-8" role="navigation">
              {isHomePage ? (
                <a href="#key-features" className="text-slate-600 hover:text-slate-900 transition-colors">
                  Features
                </a>
              ) : (
                <Link to="/#key-features" className="text-slate-600 hover:text-slate-900 transition-colors">
                  Features
                </Link>
              )}
              <Link to="/pricing" className="text-slate-600 hover:text-slate-900 transition-colors">
                Pricing
              </Link>
              <a href="https://www.autotouch.ai/blog" className="text-slate-600 hover:text-slate-900 transition-colors">
                Blog
              </a>
            </nav>

            {/* CTA - Right */}
            <div className="flex items-center space-x-4">
              <a 
                href="https://app.autotouch.ai/signin" 
                className={`hidden md:block text-slate-600 hover:text-slate-900 transition-all duration-300 ${isScrolled ? 'opacity-0 pointer-events-none w-0 overflow-hidden' : 'opacity-100'}`}
              >
                Sign in
              </a>
              <a 
                href={tokens.hero.primaryCta.href}
                className={`px-4 py-2 rounded-pill text-sm font-medium transition-all duration-200 min-h-[44px] flex items-center whitespace-nowrap ${ctaClass}`}
              >
                {tokens.hero.primaryCta.label}
              </a>

              <button 
                className="md:hidden p-2 text-slate-600 hover:text-slate-900 min-h-[44px] min-w-[44px]"
                aria-label="Open menu"
                aria-expanded="false"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </header>
    </>
  );
}