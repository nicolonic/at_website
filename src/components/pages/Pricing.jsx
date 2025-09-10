import { useState } from 'react';
import { Link } from 'react-router';
import { tokens } from '../../tokens.js';
import TrialCTA from '../shared/TrialCTA.jsx';

const CREDIT_BUNDLES = [
  { credits: '2,500', price: 99, label: '2,500 credits / month' },
  { credits: '5,000', price: 189, label: '5,000 credits / month' },
  { credits: '10,000', price: 349, label: '10,000 credits / month' },
  { credits: '20,000', price: 599, label: '20,000 credits / month' },
  { credits: '40,000', price: 999, label: '40,000 credits / month' },
  { credits: '80,000', price: 1899, label: '80,000 credits / month' },
];

export default function PricingPage() {
  const [selectedBundle, setSelectedBundle] = useState(CREDIT_BUNDLES[0]);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState('free'); // 'free' or 'pro' - for mobile toggle
  
  return (
    <main className="relative bg-white text-slate-900 pt-16">
      <DottedBackground density={14} opacity={0.06} />

        {/* Hero */}
        <section className="mx-auto max-w-6xl px-6 pb-10 pt-16 sm:pt-24">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">Simple, usage‑based pricing</h1>
            <p className="mt-4 text-lg text-slate-600">
              14‑day free trial <span className="font-medium text-slate-800">includes 200 credits</span>. No credit card required.
            </p>
            <div className="mt-6 inline-flex items-center gap-3 rounded-full border border-slate-200 bg-white/80 px-3 py-1 text-sm shadow-sm backdrop-blur">
              <span className="grid size-6 place-content-center rounded-full bg-indigo-600 text-xs font-semibold text-white">New</span>
              <span className="text-slate-700">Phone number enrichments cost <strong>5 credits</strong> each</span>
            </div>
          </div>
        </section>

        {/* Plans */}
        <section className="mx-auto max-w-6xl px-6 pb-14">
          {/* Mobile toggle - visible only on small screens */}
          <div className="flex justify-center mb-6 lg:hidden">
            <div className="inline-flex rounded-full bg-slate-100 p-1">
              <button
                onClick={() => setSelectedPlan('free')}
                className={`rounded-full px-6 py-2 text-sm font-medium transition-colors ${
                  selectedPlan === 'free'
                    ? 'bg-white text-slate-900 shadow-sm'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Free
              </button>
              <button
                onClick={() => setSelectedPlan('pro')}
                className={`rounded-full px-6 py-2 text-sm font-medium transition-colors ${
                  selectedPlan === 'pro'
                    ? 'bg-white text-slate-900 shadow-sm'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Pro
              </button>
            </div>
          </div>

          {/* Desktop - show both plans side by side */}
          <div className="hidden lg:grid gap-6 lg:grid-cols-2">
            <PlanCard
              name="Free"
              price="$0"
              badge="Get started"
              highlight={false}
              blurb="Great for kicking the tires and testing workflows."
              includedCreditLabel="200 credits / mo"
              ctaLabel="Start for free"
            />

            <ProPlanCard
              selectedBundle={selectedBundle}
              setSelectedBundle={setSelectedBundle}
              creditBundles={CREDIT_BUNDLES}
              dropdownOpen={dropdownOpen}
              setDropdownOpen={setDropdownOpen}
            />
          </div>

          {/* Mobile - show one plan at a time based on toggle */}
          <div className="lg:hidden">
            {selectedPlan === 'free' ? (
              <PlanCard
                name="Free"
                price="$0"
                badge="Get started"
                highlight={false}
                blurb="Great for kicking the tires and testing workflows."
                includedCreditLabel="200 credits / mo"
                ctaLabel="Start for free"
              />
            ) : (
              <ProPlanCard
                selectedBundle={selectedBundle}
                setSelectedBundle={setSelectedBundle}
                creditBundles={CREDIT_BUNDLES}
                dropdownOpen={dropdownOpen}
                setDropdownOpen={setDropdownOpen}
              />
            )}
          </div>
        </section>

        {/* Feature comparison (shared list) */}
        <section className="mx-auto max-w-6xl px-6 pb-16">
          <div className="rounded-2xl border border-slate-200 bg-white/80 p-6 shadow-sm">
            <h3 className="text-lg font-semibold">Included features</h3>
            <ul className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {[
                'Unlimited users',
                'Agent columns',
                'Exporting',
                'Web search & scraping',
                'Email address enrichments',
                'Phone number enrichments (5 credits each)',
                'Waterfall enrichments',
                'Inbound & outbound webhooks',
                'Integrations (Zapier, HeyReach, Instantly & more)',
                'HubSpot CRM Integration',
              ].map((f, i) => (
                <li key={i} className="flex items-start gap-3 text-slate-700">
                  <CheckIcon className="mt-0.5 size-5 text-emerald-600" />
                  <span>{f}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* CTA */}
        <TrialCTA />

        {/* FAQ */}
        <section className="mx-auto max-w-6xl px-6 pb-28">
          <h3 className="text-2xl font-semibold">Frequently asked</h3>
          <div className="mt-6 grid gap-4 md:grid-cols-2">
            <FaqItem q="What happens after the 14‑day trial?" a="You can continue on Free (500 credits / month) or upgrade to Pro and attach the credit bundle that fits your usage." />
            <FaqItem q="Can I use my own email tools?" a="Yes. We integrate with Gmail, Outlook, Instantly, LGM, Smartlead, Zapier, and more." />
            <FaqItem q="How are credits consumed?" a="Each enrichment or automated action consumes credits; phone number enrichments consume 5 credits. Unused credits don't roll over unless specified in a custom agreement." />
            <FaqItem q="Do I need a developer to integrate?" a="No—Zapier and native CRM integrations get you live in minutes." />
          </div>
        </section>
    </main>
  );
}

/* -------------------------------- Components -------------------------------- */
function PlanCard({ name, price, priceSuffix = '', badge, blurb, includedCreditLabel, highlight = false, extraFeatures = [], ctaLabel = 'Get started' }) {
  return (
    <div className={cn(
      'relative rounded-2xl border p-6 shadow-sm backdrop-blur',
      highlight
        ? 'border-indigo-200 bg-indigo-50/50 ring-1 ring-indigo-200'
        : 'border-slate-200 bg-white/80'
    )}>
      {badge && (
        <div className={cn('mb-4 inline-flex items-center gap-2 rounded-full px-3 py-1 text-sm', highlight ? 'bg-white text-slate-900' : 'bg-slate-900 text-white') }>
          {badge}
        </div>
      )}
      <div className="flex items-baseline gap-2">
        <h3 className="text-2xl font-semibold">{name}</h3>
      </div>
      <div className="mt-2 flex items-end gap-1">
        <div className="text-4xl font-semibold tracking-tight">{price}</div>
        {priceSuffix && <div className="pb-1 text-slate-500">{priceSuffix}</div>}
      </div>
      {blurb && <p className="mt-2 text-slate-600">{blurb}</p>}

      <div className="mt-4 inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white/70 px-3 py-1 text-sm shadow-sm">
        <Dot /> <span>{includedCreditLabel}</span>
      </div>

      <ul className="mt-6 space-y-3 text-slate-700">
        {[
          'Unlimited users',
          'Agent columns',
          'Exporting',
          'Web search & scraping',
          'Email address enrichments',
          'Phone number enrichments (5 credits each)',
          'Waterfall enrichments',
          'Inbound & outbound webhooks',
          'Integrations (Zapier, HeyReach, Instantly & more)',
          'HubSpot CRM Integration',
          ...extraFeatures,
        ].map((f, i) => (
          <li key={i} className="flex items-start gap-3"><CheckIcon className="mt-0.5 size-5 text-emerald-600" /><span>{f}</span></li>
        ))}
      </ul>

      <div className="mt-8">
        <Link 
          to="/start-free-trial" 
          className={cn('inline-flex items-center justify-center rounded-xl px-4 py-2.5 font-semibold shadow-sm transition', 
            highlight ? 'bg-indigo-600 text-white hover:bg-indigo-500' : 'border border-slate-300 bg-white text-slate-900 hover:bg-slate-50'
          )}
        >
          {ctaLabel}
          <ArrowRight className="ml-2 size-4" />
        </Link>
      </div>
    </div>
  );
}

function ProPlanCard({ selectedBundle, setSelectedBundle, creditBundles, dropdownOpen, setDropdownOpen }) {
  return (
    <div className="relative rounded-2xl border border-indigo-200 bg-indigo-50/50 ring-1 ring-indigo-200 p-6 shadow-sm backdrop-blur">
      <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-white text-slate-900 px-3 py-1 text-sm">
        Most popular
      </div>
      
      <div className="flex items-baseline gap-2">
        <h3 className="text-2xl font-semibold">Pro</h3>
      </div>
      
      <div className="mt-2 flex items-end gap-1">
        <div className="text-4xl font-semibold tracking-tight">${selectedBundle.price}</div>
        <div className="pb-1 text-slate-500">/ month</div>
      </div>
      
      <p className="mt-2 text-slate-600">Everything in Free plus premium support. Scale with credit bundles.</p>

      {/* Credit Bundle Dropdown */}
      <div className="mt-4 relative">
        <button
          onClick={() => setDropdownOpen(!dropdownOpen)}
          className="w-full inline-flex items-center justify-between gap-2 rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm shadow-sm hover:bg-slate-50 transition-colors"
        >
          <span>{selectedBundle.label}</span>
          <ChevronDown className={`size-4 transition-transform ${dropdownOpen ? 'rotate-180' : ''}`} />
        </button>
        
        {dropdownOpen && (
          <div className="absolute z-10 mt-1 w-full rounded-lg border border-slate-200 bg-white shadow-lg">
            {creditBundles.map((bundle, i) => (
              <button
                key={i}
                onClick={() => {
                  setSelectedBundle(bundle);
                  setDropdownOpen(false);
                }}
                className={cn(
                  "w-full px-3 py-2 text-left text-sm hover:bg-slate-50 transition-colors",
                  i === 0 && "rounded-t-lg",
                  i === creditBundles.length - 1 && "rounded-b-lg",
                  selectedBundle.credits === bundle.credits && "bg-indigo-50 text-indigo-700"
                )}
              >
                {bundle.label}
              </button>
            ))}
          </div>
        )}
      </div>

      <ul className="mt-6 space-y-3 text-slate-700">
        {[
          'Unlimited users',
          'Agent columns',
          'Exporting',
          'Web search & scraping',
          'Email address enrichments',
          'Phone number enrichments (5 credits each)',
          'Waterfall enrichments',
          'Inbound & outbound webhooks',
          'Integrations (Zapier, HeyReach, Instantly & more)',
          'HubSpot CRM Integration',
          'Premium support',
        ].map((f, i) => (
          <li key={i} className="flex items-start gap-3">
            <CheckIcon className="mt-0.5 size-5 text-emerald-600" />
            <span>{f}</span>
          </li>
        ))}
      </ul>

      <div className="mt-8">
        <Link 
          to="/start-free-trial" 
          className="inline-flex items-center justify-center rounded-xl bg-indigo-600 text-white hover:bg-indigo-500 px-4 py-2.5 font-semibold shadow-sm transition"
        >
          Start 14‑day trial
          <ArrowRight className="ml-2 size-4" />
        </Link>
      </div>
    </div>
  );
}

function BundleCard({ credits, price, note }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white/80 p-5 shadow-sm">
      <div className="text-sm font-medium text-slate-500">Credits</div>
      <div className="mt-1 text-2xl font-semibold">{credits}</div>
      <div className="mt-3 text-lg">{price}</div>
      {note && <div className="mt-1 text-sm text-slate-500">{note}</div>}
      <div className="mt-6">
        <Link to="/start-free-trial" className="inline-flex items-center justify-center rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-slate-900 shadow-sm transition hover:bg-slate-50">
          Choose bundle
        </Link>
      </div>
    </div>
  );
}


function FaqItem({ q, a }) {
  return (
    <div className="rounded-xl border border-slate-200 bg-white/80 p-5 shadow-sm">
      <div className="text-base font-semibold">{q}</div>
      <p className="mt-2 text-slate-600">{a}</p>
    </div>
  );
}

/* -------------------------------- Utilities & Icons -------------------------------- */
function DottedBackground({ density = 14, opacity = 0.08 }) {
  const size = `${density}px ${density}px`;
  const color = `rgba(2, 6, 23, ${opacity})`; // slate-900 with opacity
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 -z-10"
      style={{
        backgroundImage: `radial-gradient(${color} 1px, transparent 1px)`,
        backgroundSize: size,
        backgroundPosition: '0 0',
      }}
    />
  );
}

function cn(...classes) {
  return classes.filter(Boolean).join(' ');
}

function CheckIcon({ className = '' }) {
  return (
    <svg viewBox="0 0 20 20" fill="currentColor" className={className} aria-hidden>
      <path fillRule="evenodd" d="M16.704 5.29a1 1 0 010 1.414l-7.2 7.2a1 1 0 01-1.414 0l-3.2-3.2A1 1 0 016.304 9.29l2.493 2.493 6.493-6.493a1 1 0 011.414 0z" clipRule="evenodd" />
    </svg>
  );
}

function ArrowRight({ className = '' }) {
  return (
    <svg viewBox="0 0 20 20" fill="currentColor" className={className} aria-hidden>
      <path d="M7 4l6 6-6 6M13 10H3" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function Dot() {
  return <span className="inline-block size-1.5 rounded-full bg-slate-400" />;
}

function ChevronDown({ className = '' }) {
  return (
    <svg className={className} viewBox="0 0 20 20" fill="currentColor">
      <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
    </svg>
  );
}