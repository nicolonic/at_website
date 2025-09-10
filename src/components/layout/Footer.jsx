import { Link, useLocation } from 'react-router';
import { tokens } from '../../tokens.js';

export default function Footer() {
  const location = useLocation();
  const isHomePage = location.pathname === '/';
  
  return (
    <footer className="bg-slate-900 text-white" role="contentinfo">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
          <div className="col-span-2 md:col-span-1">
            <div className="mb-4">
              <img 
                src={tokens.brand.logoSrc} 
                alt={tokens.brand.name}
                className="h-8 w-auto filter brightness-0 invert"
              />
            </div>
            <p className="text-slate-400 text-sm leading-relaxed">
              Run your most ambitious GTM plays in one system. Built by GTM and Sales Experts.
            </p>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-white mb-4">Product</h3>
            <ul className="space-y-3">
              <li>
                {isHomePage ? (
                  <a href="#key-features" className="text-slate-400 hover:text-white text-sm transition-colors">Features</a>
                ) : (
                  <Link to="/#key-features" className="text-slate-400 hover:text-white text-sm transition-colors">Features</Link>
                )}
              </li>
              <li>
                {isHomePage ? (
                  <a href="#pricing" className="text-slate-400 hover:text-white text-sm transition-colors">Pricing</a>
                ) : (
                  <Link to="/#pricing" className="text-slate-400 hover:text-white text-sm transition-colors">Pricing</Link>
                )}
              </li>
              <li><span className="text-slate-400 text-sm">Integrations (Coming Soon)</span></li>
              <li><span className="text-slate-400 text-sm">API (Coming Soon)</span></li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-white mb-4">Company</h3>
            <ul className="space-y-3">
              <li><a href="https://www.autotouch.ai/blog" className="text-slate-400 hover:text-white text-sm transition-colors">Blog</a></li>
              <li><a href="mailto:support@autotouch.ai" className="text-slate-400 hover:text-white text-sm transition-colors">Support</a></li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-white mb-4">Support</h3>
            <ul className="space-y-3">
              <li><Link to="/status" className="text-slate-400 hover:text-white text-sm transition-colors">Status</Link></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-slate-700 pt-8">
          <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
            <div className="flex items-center space-x-6 text-sm text-slate-400">
              <Link to="/privacy-policy" className="hover:text-white transition-colors">Privacy Policy</Link>
              <Link to="/privacy-policy" className="hover:text-white transition-colors">Terms of Service</Link>
              <Link to="/cookie-policy" className="hover:text-white transition-colors">Cookie Policy</Link>
            </div>
            
            <div>
              <a href="https://www.linkedin.com/company/102871877/" className="text-slate-400 hover:text-white transition-colors" aria-label="LinkedIn">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.338 16.338H13.67V12.16c0-.995-.017-2.277-1.387-2.277-1.39 0-1.601 1.086-1.601 2.207v4.248H8.014v-8.59h2.559v1.174h.037c.356-.675 1.227-1.387 2.526-1.387 2.703 0 3.203 1.778 3.203 4.092v4.711zM5.005 6.575a1.548 1.548 0 11-.003-3.096 1.548 1.548 0 01.003 3.096zm-1.337 9.763H6.34v-8.59H3.667v8.59zM17.668 1H2.328C1.595 1 1 1.581 1 2.298v15.403C1 18.418 1.595 19 2.328 19h15.34c.734 0 1.332-.582 1.332-1.299V2.298C19 1.581 18.402 1 17.668 1z" clipRule="evenodd" />
                </svg>
              </a>
            </div>
          </div>
          
          <div className="mt-8 text-center text-sm text-slate-400">
            <p>© 2025 {tokens.brand.name}. All rights reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  );
}