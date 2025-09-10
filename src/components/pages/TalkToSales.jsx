import { useState } from 'react';
import { tokens } from '../../tokens.js';

export default function TalkToSales() {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsSubmitting(true);

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError('Please enter a valid email address');
      setIsSubmitting(false);
      return;
    }

    try {
      // Track the submission (you can replace this with your actual tracking/storage logic)
      if (typeof window !== 'undefined' && window.analytics) {
        window.analytics.track('sales_form_submit', {
          email: email,
          timestamp: new Date().toISOString()
        });
      }

      // Store email in localStorage (optional - you might want to send to a backend instead)
      localStorage.setItem('sales_lead_email', email);
      localStorage.setItem('sales_lead_timestamp', new Date().toISOString());

      // Redirect to booking page
      window.location.href = '/book-meeting';
    } catch (err) {
      setError('Something went wrong. Please try again.');
      setIsSubmitting(false);
    }
  };

  return (
    <main className="relative bg-gradient-to-b from-white to-slate-50 text-slate-900 min-h-screen overflow-hidden">
      {/* Animated blob background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -left-40 w-[600px] h-[600px] bg-blue-200 rounded-full mix-blend-multiply filter blur-2xl opacity-50 animate-blob"></div>
        <div className="absolute -top-40 -right-40 w-[600px] h-[600px] bg-pink-200 rounded-full mix-blend-multiply filter blur-2xl opacity-50 animate-blob animation-delay-2000"></div>
        <div className="absolute top-40 left-1/3 w-[500px] h-[500px] bg-purple-200 rounded-full mix-blend-multiply filter blur-2xl opacity-40 animate-blob animation-delay-4000"></div>
        <div className="absolute -bottom-8 right-1/4 w-[500px] h-[500px] bg-yellow-100 rounded-full mix-blend-multiply filter blur-2xl opacity-40 animate-blob"></div>
        
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/30 to-white/60"></div>
      </div>

      <div className="relative z-10 flex min-h-screen flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <img
            className="mx-auto h-12 w-auto"
            src={tokens.brand.logoSrc}
            alt={tokens.brand.name}
          />
          <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-slate-900">
            Talk to our sales team
          </h2>
          <p className="mt-2 text-center text-sm text-slate-600">
            Enter your email and we'll connect you with the right person
          </p>
        </div>

        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="bg-white px-4 py-8 shadow-xl ring-1 ring-slate-900/5 sm:rounded-2xl sm:px-10">
            {/* Progress indicators */}
            <div className="mb-6 flex items-center justify-between">
              <div className="flex items-center">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-semibold ${email ? 'bg-indigo-600 text-white' : 'bg-indigo-100 text-indigo-600'}`}>
                  1
                </div>
                <span className="ml-2 text-sm text-slate-600">Enter email</span>
              </div>
              <div className="flex-1 mx-4 h-0.5 bg-slate-200">
                <div className={`h-full bg-indigo-600 transition-all duration-500 ${email ? 'w-1/2' : 'w-0'}`} />
              </div>
              <div className="flex items-center">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-semibold ${isSubmitting ? 'bg-indigo-600 text-white animate-pulse' : 'bg-slate-100 text-slate-400'}`}>
                  2
                </div>
                <span className="ml-2 text-sm text-slate-400">Book meeting</span>
              </div>
            </div>

            <form className="space-y-6" onSubmit={handleSubmit}>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-slate-700">
                  Work email
                </label>
                <div className="mt-2">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="block w-full rounded-lg border border-slate-300 px-3 py-2 text-slate-900 placeholder-slate-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm transition-all duration-200"
                    placeholder="you@company.com"
                  />
                </div>
                {error && (
                  <p className="mt-2 text-sm text-red-600">{error}</p>
                )}
              </div>

              <div>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="group flex w-full justify-center items-center rounded-lg bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
                >
                  {isSubmitting ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Redirecting to calendar...
                    </>
                  ) : (
                    <>
                      Continue to calendar
                      <svg className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </>
                  )}
                </button>
              </div>
            </form>

            <div className="mt-6 text-center">
              <a href="/" className="text-sm text-indigo-600 hover:text-indigo-500">
                ← Back to homepage
              </a>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}