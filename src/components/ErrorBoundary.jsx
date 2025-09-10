import { useRouteError, Link } from 'react-router';

export default function ErrorBoundary() {
  const error = useRouteError();
  
  console.error('Error caught by boundary:', error);

  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center">
        <div className="mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-red-100 rounded-full mb-4">
            <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </div>
          
          <h1 className="text-2xl font-semibold text-slate-900 mb-2">
            Oops! Something went wrong
          </h1>
          
          <p className="text-slate-600 mb-6">
            {error?.statusText || error?.message || 'An unexpected error occurred'}
          </p>
          
          {error?.status === 404 && (
            <p className="text-sm text-slate-500 mb-6">
              The page you're looking for doesn't exist.
            </p>
          )}
          
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link 
              to="/" 
              className="inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-brand-primary hover:bg-blue-600 transition-colors"
            >
              Go to Homepage
            </Link>
            
            <button 
              onClick={() => window.location.reload()} 
              className="inline-flex items-center justify-center px-4 py-2 border border-slate-300 rounded-md shadow-sm text-sm font-medium text-slate-700 bg-white hover:bg-slate-50 transition-colors"
            >
              Try Again
            </button>
          </div>
        </div>
        
        {process.env.NODE_ENV === 'development' && error?.stack && (
          <details className="mt-8 text-left">
            <summary className="cursor-pointer text-sm text-slate-500 hover:text-slate-700">
              Technical Details
            </summary>
            <pre className="mt-2 p-4 bg-slate-100 rounded-lg text-xs text-slate-600 overflow-auto">
              {error.stack}
            </pre>
          </details>
        )}
      </div>
    </div>
  );
}