import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { tokens } from '../../tokens.js';

export default function BookMeeting() {
  const [showThankYou, setShowThankYou] = useState(false);
  const navigate = useNavigate();

  // Get the next available business day
  const getBookingDate = () => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1); // Move to tomorrow
    
    const dayOfWeek = tomorrow.getDay();
    
    // If tomorrow is Saturday (6), move to Monday
    if (dayOfWeek === 6) {
      tomorrow.setDate(tomorrow.getDate() + 2);
    }
    // If tomorrow is Sunday (0), move to Monday  
    else if (dayOfWeek === 0) {
      tomorrow.setDate(tomorrow.getDate() + 1);
    }
    
    const year = tomorrow.getFullYear();
    const month = String(tomorrow.getMonth() + 1).padStart(2, '0');
    const day = String(tomorrow.getDate()).padStart(2, '0');
    
    return {
      date: `${year}-${month}-${day}`,
      week: `${year}-${month}`,
      month: `${year}-${month}`
    };
  };

  const bookingDate = getBookingDate();
  const calendlyUrl = `https://calendly.com/autotouch/intro?week=${bookingDate.week}&month=${bookingDate.month}&date=${bookingDate.date}`;

  useEffect(() => {
    // Listen for Calendly events
    const handleCalendlyEvent = (e) => {
      if (e.origin === "https://calendly.com" && e.data.event && e.data.event === 'calendly.event_scheduled') {
        // Show thank you message when meeting is scheduled
        setShowThankYou(true);
        
        // Redirect to home after 5 seconds
        setTimeout(() => {
          navigate('/');
        }, 5000);
      }
    };

    window.addEventListener('message', handleCalendlyEvent);

    return () => {
      window.removeEventListener('message', handleCalendlyEvent);
    };
  }, [navigate]);

  if (showThankYou) {
    return (
      <main className="relative bg-gradient-to-b from-white to-slate-50 text-slate-900 min-h-screen overflow-hidden">
        {/* Animated blob background */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -left-40 w-[600px] h-[600px] bg-green-200 rounded-full mix-blend-multiply filter blur-2xl opacity-50 animate-blob"></div>
          <div className="absolute -top-40 -right-40 w-[600px] h-[600px] bg-blue-200 rounded-full mix-blend-multiply filter blur-2xl opacity-50 animate-blob animation-delay-2000"></div>
          <div className="absolute -bottom-40 left-1/3 w-[500px] h-[500px] bg-purple-200 rounded-full mix-blend-multiply filter blur-2xl opacity-40 animate-blob animation-delay-4000"></div>
        </div>

        <div className="relative z-10 flex min-h-screen flex-col justify-center py-12 sm:px-6 lg:px-8">
          <div className="sm:mx-auto sm:w-full sm:max-w-md">
            <div className="text-center">
              {/* Success icon */}
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-green-100 mb-4">
                <svg className="h-8 w-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              
              <h2 className="text-3xl font-bold tracking-tight text-slate-900">
                Meeting Scheduled!
              </h2>
              <p className="mt-2 text-lg text-slate-600">
                You'll receive a confirmation email shortly.
              </p>
              
              <div className="mt-8 space-y-2">
                <p className="text-sm text-slate-500">
                  Redirecting to homepage in 5 seconds...
                </p>
                <div className="mx-auto w-48 h-1 bg-slate-200 rounded-full overflow-hidden">
                  <div className="h-full bg-brand-primary animate-[loading_5s_linear]" style={{
                    animation: 'loading 5s linear',
                    '@keyframes loading': {
                      from: { width: '0%' },
                      to: { width: '100%' }
                    }
                  }} />
                </div>
              </div>
              
              <div className="mt-6">
                <button
                  onClick={() => navigate('/')}
                  className="text-brand-primary hover:text-indigo-500 font-medium"
                >
                  Go to homepage now →
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="relative bg-white min-h-screen">
      {/* Header */}
      <div className="bg-white border-b border-slate-200">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-3">
          <div className="flex items-center justify-between">
            <a href="/" className="flex items-center">
              <img 
                src={tokens.brand.logoSrc} 
                alt={tokens.brand.name}
                className="h-10 w-auto"
              />
            </a>
            <div className="text-sm text-slate-600">
              Book a time that works for you
            </div>
          </div>
        </div>
      </div>

      {/* Calendly iframe directly - no background distractions */}
      <div className="flex flex-col items-center">
        <iframe 
          src={calendlyUrl}
          className="w-full"
          style={{ height: 'calc(100vh - 64px)', border: 'none' }}
          frameBorder="0"
        />
      </div>
    </main>
  );
}