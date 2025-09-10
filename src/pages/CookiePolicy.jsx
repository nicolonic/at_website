import React from 'react';
import { Link } from 'react-router';
import { tokens } from '../tokens.js';

export default function CookiePolicy() {
  return (
    <div className="min-h-screen bg-white">
      {/* Simple Header */}
      <header className="bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <Link to="/" className="inline-flex items-center">
            <img 
              src={tokens.brand.logoSrc} 
              alt={tokens.brand.name}
              className="h-8 w-auto"
            />
          </Link>
        </div>
      </header>

      {/* Content */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-4xl font-bold text-slate-900 mb-8">Cookie Policy</h1>
        
        <div className="prose prose-slate max-w-none">
          <p className="text-lg text-slate-600 mb-6">
            Last updated: January 2025
          </p>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-slate-900 mb-4">What Are Cookies</h2>
            <p className="text-slate-600 mb-4">
              Cookies are small text files that are placed on your computer or mobile device when you visit our website. 
              They are widely used to make websites work more efficiently and provide information to website owners.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-slate-900 mb-4">How We Use Cookies</h2>
            <p className="text-slate-600 mb-4">
              Autotouch AI uses cookies and similar tracking technologies to:
            </p>
            <ul className="list-disc pl-6 text-slate-600 space-y-2">
              <li>Understand how you use our website and improve your experience</li>
              <li>Remember your preferences and settings</li>
              <li>Analyze website traffic and usage patterns</li>
              <li>Provide targeted advertising and measure ad effectiveness</li>
              <li>Detect and prevent fraud and security issues</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-slate-900 mb-4">Types of Cookies We Use</h2>
            
            <div className="mb-6">
              <h3 className="text-xl font-semibold text-slate-800 mb-2">Essential Cookies</h3>
              <p className="text-slate-600">
                These cookies are necessary for the website to function properly. They enable basic functions like 
                page navigation and access to secure areas of the website. The website cannot function properly without these cookies.
              </p>
            </div>

            <div className="mb-6">
              <h3 className="text-xl font-semibold text-slate-800 mb-2">Analytics Cookies</h3>
              <p className="text-slate-600">
                We use Google Analytics to help us understand how visitors use our website. These cookies collect 
                information in an aggregated form, including the number of visitors, where visitors come from, 
                and the pages they visit.
              </p>
            </div>

            <div className="mb-6">
              <h3 className="text-xl font-semibold text-slate-800 mb-2">Marketing Cookies</h3>
              <p className="text-slate-600">
                These cookies are used to track visitors across websites to display ads that are relevant and 
                engaging. We use cookies from Google Ads, LinkedIn, and other advertising partners.
              </p>
            </div>

            <div className="mb-6">
              <h3 className="text-xl font-semibold text-slate-800 mb-2">Functional Cookies</h3>
              <p className="text-slate-600">
                These cookies enable the website to provide enhanced functionality and personalization. 
                They may be set by us or by third-party providers whose services we use.
              </p>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-slate-900 mb-4">Third-Party Cookies</h2>
            <p className="text-slate-600 mb-4">
              We use services from the following third parties that may set cookies:
            </p>
            <ul className="list-disc pl-6 text-slate-600 space-y-2">
              <li><strong>Google Analytics</strong> - Website analytics</li>
              <li><strong>Google Tag Manager</strong> - Tag management</li>
              <li><strong>Google Ads</strong> - Advertising and remarketing</li>
              <li><strong>LinkedIn Insight Tag</strong> - LinkedIn advertising and analytics</li>
              <li><strong>Intercom</strong> - Customer support and engagement</li>
              <li><strong>Instantly</strong> - Marketing automation</li>
              <li><strong>Vector</strong> - Analytics and tracking</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-slate-900 mb-4">Managing Cookies</h2>
            <p className="text-slate-600 mb-4">
              Most web browsers allow you to control cookies through their settings. You can set your browser to:
            </p>
            <ul className="list-disc pl-6 text-slate-600 space-y-2 mb-4">
              <li>Notify you when you receive a cookie</li>
              <li>Block first-party or third-party cookies</li>
              <li>Block all cookies</li>
              <li>Delete all cookies when you close your browser</li>
            </ul>
            <p className="text-slate-600 mb-4">
              Please note that blocking or deleting cookies may impact your experience on our website and 
              limit the functionality available to you.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-slate-900 mb-4">Browser-Specific Cookie Management</h2>
            <p className="text-slate-600 mb-4">
              Here are links to cookie management instructions for popular browsers:
            </p>
            <ul className="list-disc pl-6 text-slate-600 space-y-2">
              <li><a href="https://support.google.com/chrome/answer/95647" className="text-blue-600 hover:underline" target="_blank" rel="noopener noreferrer">Google Chrome</a></li>
              <li><a href="https://support.mozilla.org/en-US/kb/cookies-information-websites-store-on-your-computer" className="text-blue-600 hover:underline" target="_blank" rel="noopener noreferrer">Mozilla Firefox</a></li>
              <li><a href="https://support.apple.com/guide/safari/manage-cookies-and-website-data-sfri11471/mac" className="text-blue-600 hover:underline" target="_blank" rel="noopener noreferrer">Safari</a></li>
              <li><a href="https://support.microsoft.com/en-us/microsoft-edge/delete-cookies-in-microsoft-edge-63947406-40ac-c3b8-57b9-2a946a29ae09" className="text-blue-600 hover:underline" target="_blank" rel="noopener noreferrer">Microsoft Edge</a></li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-slate-900 mb-4">Updates to This Policy</h2>
            <p className="text-slate-600 mb-4">
              We may update this Cookie Policy from time to time to reflect changes in our practices or for 
              other operational, legal, or regulatory reasons. We will notify you of any material changes by 
              posting the new policy on this page with an updated revision date.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-slate-900 mb-4">Contact Us</h2>
            <p className="text-slate-600 mb-4">
              If you have questions about our use of cookies, please contact us at:
            </p>
            <p className="text-slate-600">
              Email: <a href="mailto:privacy@autotouch.ai" className="text-blue-600 hover:underline">privacy@autotouch.ai</a><br />
              Address: Autotouch AI, Inc.<br />
              San Francisco, CA
            </p>
          </section>
        </div>

        <div className="mt-12 pt-8 border-t border-slate-200">
          <Link to="/" className="text-blue-600 hover:underline">
            ← Back to Home
          </Link>
        </div>
      </main>
    </div>
  );
}