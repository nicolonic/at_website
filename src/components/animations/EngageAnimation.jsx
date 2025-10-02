import React, { useEffect, useMemo, useRef, useState } from 'react';

// Light-theme, keyboard-accessible, reduced-motion-friendly auto-demo.
// Shows: tasks already have context; engagement happens in one place; context travels into calls/emails/sequences.

export default function EngageAnimation({ isActive = true }) {
  const prefersReduced = usePrefersReducedMotion();

  const TABS = useMemo(
    () => ([
      { id: 'call', label: 'Call' },
      { id: 'email', label: 'Email' },
    ]),
    []
  );

  const FLOWS = useMemo(() => ({
    call:  ['task', 'dialing', 'in_call', 'disposition', 'done'],
    email: ['task', 'composer', 'inserting', 'sent', 'done'],
  }), []);

  // Step durations (ms) – target ~11s Call, ~8s Email, ~6s Sequence
  const DUR = useMemo(() => ({
    call:  [1500, 2000, 4000, 2000],              // last step (done) handled separately
    email: [1200, 1600, 2200, 1400],
    doneHoldNormal: 1200,
    doneHoldReduced: 2000,
  }), []);

  const [mode, setMode] = useState('call'); // 'call' | 'email' | 'sequence'
  const [stepIndex, setStepIndex] = useState(0); // index into FLOWS[mode]
  const [announce, setAnnounce] = useState(''); // aria-live text
  const timerRef = useRef(null);
  const tabsRef = useRef([]);

  const steps = FLOWS[mode];
  const step = steps[stepIndex];

  // Live announcements for screen readers on key transitions.
  useEffect(() => {
    if (step === 'done') {
      const byMode = {
        call: 'Call completed. Context attached.',
        email: 'Email completed. Context included.',
      };
      setAnnounce(byMode[mode]);
    } else {
      setAnnounce('');
    }
  }, [mode, step]);

  // Auto-advance state machine
  useEffect(() => {
    if (!isActive) return;
    clearTimer();

    // Reduced motion: snap to "done" immediately, then pause briefly and advance mode
    if (prefersReduced) {
      if (step !== 'done') {
        setStepIndex(FLOWS[mode].length - 1);
        return;
      }
      timerRef.current = setTimeout(() => advanceMode(), DUR.doneHoldReduced);
      return;
    }

    // Normal motion
    if (stepIndex < FLOWS[mode].length - 1) {
      const ms = DUR[mode][stepIndex] ?? 1200;
      timerRef.current = setTimeout(() => {
        setStepIndex((i) => Math.min(i + 1, FLOWS[mode].length - 1));
      }, ms);
    } else {
      // On "done", hold briefly then switch to next mode
      timerRef.current = setTimeout(() => advanceMode(), DUR.doneHoldNormal);
    }

    return clearTimer;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mode, stepIndex, prefersReduced, isActive]);

  function clearTimer() {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
  }

  function advanceMode() {
    clearTimer();
    const order = ['call', 'email'];
    const idx = order.indexOf(mode);
    const next = order[(idx + 1) % order.length];
    setMode(next);
    setStepIndex(0);
  }

  function handleSelectTab(id) {
    clearTimer();
    setMode(id);
    setStepIndex(prefersReduced ? FLOWS[id].length - 1 : 0);
  }

  function onTabKeyDown(e, idx) {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleSelectTab(TABS[idx].id);
    }
    // Optional arrow nav (not required but nice)
    if (e.key === 'ArrowRight') {
      const next = (idx + 1) % TABS.length;
      tabsRef.current[next]?.focus();
    }
    if (e.key === 'ArrowLeft') {
      const prev = (idx - 1 + TABS.length) % TABS.length;
      tabsRef.current[prev]?.focus();
    }
  }

  // Timeline message by mode (shows once done)
  const timelineByMode = {
    call: 'Call activity logged • Context attached',
    email: 'Email sent • Context included',
  };

  return (
    <div className="absolute inset-0">
      {/* Live region for status updates */}
      <span className="sr-only" aria-live="polite">{announce}</span>

      {/* Removed top-right tabs per design request */}

      {/* Two-column layout */}
      <div className="h-full w-full grid grid-cols-12 gap-0">
        {/* Left: Task + Context (light UI) */}
        <aside className="col-span-12 md:col-span-5 h-full border-r border-slate-200 bg-white/90">
          <div className="h-full p-5 md:p-6 flex flex-col">
            {/* Company header */}
            <div className="mb-3 flex items-center gap-2">
              <div className="w-6 h-6 rounded-md bg-slate-200 border border-slate-300" />
              <div className="text-sm font-semibold text-slate-900">Acme Co.</div>
            </div>
            <div className="mb-4">
              <div className="flex items-center gap-2">
                <div className="text-sm text-slate-600">Task • <span className="font-medium text-slate-800">Follow up</span></div>
                <span className="inline-flex items-center text-xs px-2 py-0.5 rounded-full border border-slate-200 bg-slate-50 text-slate-700 shadow-sm">
                  High priority
                </span>
              </div>
            </div>

            {/* Context chips – research is already done and present */}
            <div className="flex flex-wrap gap-2 mb-3">
              <Chip>ICP fit ✓</Chip>
              <Chip>Reason: Hiring AEs</Chip>
              <Chip>News: Series B</Chip>
              <Chip>Stack: Salesforce</Chip>
            </div>
            <p className="text-sm leading-5 text-slate-700 mb-5">
              Acme Co. raised $2M in a Series B on August 4, 2025. They build workflow automation software. A new AE job posting went live last week.
            </p>

            {/* Channel buttons removed per design request */}
          </div>
        </aside>

        {/* Right: Channel surface */}
        <section className="col-span-12 md:col-span-7 h-full" id={`panel-${mode}`} role="tabpanel" aria-labelledby={`tab-${mode}`}>
          <div className="h-full p-5 md:p-6 flex flex-col bg-slate-50/60">
            <div className="relative flex-1 rounded-lg border border-slate-200 bg-white shadow-sm p-4 md:p-5">
              {/* Inline Channel Toggle (Call / Email) */}
              <div className="absolute top-3 right-3">
                <div role="tablist" aria-label="Engagement channels" className="inline-flex items-center rounded-full border border-slate-200 bg-white shadow-sm p-1">
                  {TABS.map((t, i) => {
                    const active = mode === t.id;
                    return (
                      <button
                        key={t.id}
                        role="tab"
                        aria-selected={active}
                        aria-controls={`panel-${t.id}`}
                        id={`tab-${t.id}`}
                        ref={(el) => (tabsRef.current[i] = el)}
                        onKeyDown={(e) => onTabKeyDown(e, i)}
                        onClick={() => handleSelectTab(t.id)}
                        tabIndex={active ? 0 : -1}
                        className={[
                          'px-3 py-1.5 rounded-full text-sm font-medium focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500',
                          active ? 'bg-blue-600 text-white' : 'text-slate-700 hover:bg-slate-100',
                        ].join(' ')}
                      >
                        {t.label}
                      </button>
                    );
                  })}
                </div>
              </div>
              {mode === 'call' && <CallSurface step={step} />}
              {mode === 'email' && <EmailSurface step={step} />}
              {/* Sequence view commented out for now */}
            </div>

            {/* Timeline strip */}
            <div className="mt-3">
              <div className="w-full rounded-md border border-slate-200 bg-white shadow-sm px-3 py-2 text-sm text-slate-700 flex items-center gap-2">
                <Dot />
                <span className="font-medium">Timeline</span>
                <span className="text-slate-400">•</span>
                <span className={step === 'done' ? 'text-slate-800' : 'text-slate-400'}>
                  {step === 'done' ? timelineByMode[mode] : 'Updates when this action completes'}
                </span>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

/* ---------- Surfaces ---------- */

function CallSurface({ step }) {
  return (
    <div className="h-full flex flex-col">
      <div className="flex items-center gap-3 mb-4">
        <div className="flex items-center gap-2">
          <IconPhone />
          <h4 className="text-sm font-semibold text-slate-900">Call</h4>
        </div>
        <StatusBadge
          text={
            step === 'dialing' ? 'Dialing…' :
            step === 'in_call' ? 'In call 00:06' :
            step === 'disposition' ? 'Disposition' :
            step === 'done' ? 'Context attached ✓' : 'Ready'
          }
          intent={step === 'done' ? 'success' : step === 'disposition' ? 'neutral' : 'info'}
        />
      </div>

      <div className="relative flex-1 rounded-md border border-slate-200 bg-slate-50/50 flex items-center justify-center">
        {/* Phone visualization */}
        <div className="w-40 h-40 rounded-full border border-slate-200 shadow-inner bg-white flex items-center justify-center">
          <IconPhoneLarge />
        </div>
      </div>

      {/* Disposition options when appropriate */}
      <div className="mt-4 flex items-center gap-2">
        {['Connected', 'Left VM', 'No answer'].map((label, i) => (
          <button
            key={label}
            disabled={step !== 'disposition'}
            className={[
              'px-3 py-1.5 rounded-md text-sm border shadow-sm',
              step === 'disposition' && i === 0
                ? 'bg-blue-600 text-white border-blue-600'
                : 'bg-white text-slate-800 border-slate-200 disabled:opacity-60',
            ].join(' ')}
          >
            {label}
          </button>
        ))}
      </div>
    </div>
  );
}

function EmailSurface({ step }) {
  return (
    <div className="h-full flex flex-col">
      <div className="flex items-center gap-3 mb-4">
        <div className="flex items-center gap-2">
          <IconMail />
          <h4 className="text-sm font-semibold text-slate-900">Email</h4>
        </div>
        <StatusBadge
          text={
            step === 'composer' ? 'Composer ready' :
            step === 'inserting' ? 'Inserting context…' :
            step === 'sent' ? 'Sent' :
            step === 'done' ? 'Context included ✓' : 'Ready'
          }
          intent={step === 'done' ? 'success' : step === 'inserting' ? 'info' : 'neutral'}
        />
      </div>

      {/* Minimal composer */}
      <div className="flex-1 rounded-md border border-slate-200 bg-white overflow-hidden">
        <div className="border-b border-slate-200 px-3 py-2 text-sm text-slate-700 flex items-center gap-3">
          <span className="w-12 text-slate-500">To</span>
          <div className="flex-1 h-5 rounded bg-slate-100" />
        </div>
        <div className="border-b border-slate-200 px-3 py-2 text-sm text-slate-700 flex items-center gap-3">
          <span className="w-12 text-slate-500">Subject</span>
          <div className="flex-1">Follow up</div>
        </div>
        <div className="p-3 text-sm leading-5 text-slate-800">
          {(step === 'inserting') && (
            <div className="mb-2 inline-flex items-center text-xs px-2 py-0.5 rounded-full border border-blue-200 bg-blue-50 text-blue-700">
              Inserting context…
            </div>
          )}
          <p className="mb-2">
            Hi there — congrats on the Series B on Aug 4. I saw you’re hiring AEs and running Salesforce. Quick idea on how we can help them open more conversations in week one — pulling from the same context we’ve attached here.
          </p>
          {/* Context inline chips to reinforce "already there" */}
          <div className="flex flex-wrap gap-1.5">
            <SmallChip>ICP fit ✓</SmallChip>
            <SmallChip>Reason: Hiring AEs</SmallChip>
            <SmallChip>News: Series B</SmallChip>
            <SmallChip>Stack: Salesforce</SmallChip>
          </div>
        </div>
      </div>
    </div>
  );
}

function SequenceSurface({ step }) {
  return (
    <div className="h-full flex flex-col">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <IconSequence />
          <h4 className="text-sm font-semibold text-slate-900">Sequence</h4>
        </div>
        <StatusBadge
          text={
            step === 'ready' ? 'Ready to add' :
            step === 'confirming' ? 'Confirming…' :
            step === 'added' ? 'Added' :
            step === 'done' ? 'Context attached ✓' : 'Ready'
          }
          intent={step === 'done' ? 'success' : step === 'confirming' ? 'info' : 'neutral'}
        />
      </div>

      <div className="flex-1 rounded-md border border-slate-200 bg-white p-3">
        <div className="flex items-start gap-3">
          <div className="mt-1">
            <div className="w-8 h-8 rounded-md border border-slate-200 bg-slate-50 flex items-center justify-center">
              <IconSequence />
            </div>
          </div>
          <div className="flex-1">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-sm font-medium text-slate-900">Outbound sequence</div>
                <div className="text-xs text-slate-600">3 steps • starts today</div>
              </div>
              <button
                disabled={step !== 'ready'}
                className={[
                  'px-3 py-1.5 rounded-md text-sm border shadow-sm',
                  step === 'ready' ? 'bg-blue-600 text-white border-blue-600' : 'bg-white text-slate-800 border-slate-200 disabled:opacity-60'
                ].join(' ')}
              >
                Add
              </button>
            </div>

            <div className="mt-3 space-y-2">
              {['Call', 'Email', 'Wait 1 day'].map((row, i) => (
                <div key={row} className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-slate-300" />
                  <div className="text-sm text-slate-800">{row}</div>
                  {i === 1 && (
                    <div className="ml-2 flex flex-wrap gap-1.5">
                      <SmallChip>ICP fit ✓</SmallChip>
                      <SmallChip>Reason: Hiring AEs</SmallChip>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ---------- Reusable bits ---------- */

function Chip({ children }) {
  return (
    <span className="inline-flex items-center text-xs px-2 py-1 rounded-full border border-slate-200 bg-white text-slate-800 shadow-sm">
      {children}
    </span>
  );
}

function SmallChip({ children }) {
  return (
    <span className="inline-flex items-center text-[11px] leading-4 px-2 py-0.5 rounded-full border border-slate-200 bg-slate-50 text-slate-700">
      {children}
    </span>
  );
}

function StatusBadge({ text, intent = 'neutral' }) {
  const styles = intent === 'success'
    ? 'border-emerald-200 bg-emerald-50 text-emerald-700'
    : intent === 'info'
    ? 'border-blue-200 bg-blue-50 text-blue-700'
    : 'border-slate-200 bg-slate-50 text-slate-700';
  return (
    <span className={['inline-flex items-center text-xs px-2 py-0.5 rounded-full border shadow-sm', styles].join(' ')}>
      {text}
    </span>
  );
}

function Dot() {
  return <span className="w-1.5 h-1.5 rounded-full bg-slate-400 inline-block" />;
}

function IconPhone() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" aria-hidden="true" className="text-slate-600">
      <path fill="currentColor" d="M6.6 10.8a15.2 15.2 0 006.6 6.6l2.2-2.2c.3-.3.7-.4 1-.3 1.1.4 2.3.6 3.6.6.6 0 1 .4 1 1v3.4c0 .6-.4 1-1 1C11.2 21.9 2.1 12.8 2.1 2.9c0-.6.4-1 1-1H6.5c.6 0 1 .4 1 1 0 1.3.2 2.5.6 3.6.1.4 0 .8-.3 1L6.6 10.8z"/>
    </svg>
  );
}

function IconPhoneLarge() {
  return (
    <svg width="44" height="44" viewBox="0 0 24 24" aria-hidden="true" className="text-slate-500">
      <path fill="currentColor" d="M6.6 10.8a15.2 15.2 0 006.6 6.6l2.2-2.2c.3-.3.7-.4 1-.3 1.1.4 2.3.6 3.6.6.6 0 1 .4 1 1v3.4c0 .6-.4 1-1 1C11.2 21.9 2.1 12.8 2.1 2.9c0-.6.4-1 1-1H6.5c.6 0 1 .4 1 1 0 1.3.2 2.5.6 3.6.1.4 0 .8-.3 1L6.6 10.8z"/>
    </svg>
  );
}

function IconMail() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" aria-hidden="true" className="text-slate-600">
      <path fill="currentColor" d="M20 4H4a2 2 0 00-2 2v12a2 2 0 002 2h16a2 2 0 002-2V6a2 2 0 00-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
    </svg>
  );
}

function IconSequence() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" aria-hidden="true" className="text-slate-600">
      <path fill="currentColor" d="M4 5h6v4H4V5zm10 0h6v4h-6V5zM4 15h6v4H4v-4zm10 0h6v4h-6v-4zM10 9h4v6h-4V9z"/>
    </svg>
  );
}

function iconFor(id) {
  if (id === 'call') return <IconPhone />;
  if (id === 'email') return <IconMail />;
  return <IconSequence />;
}

/* ---------- Hooks ---------- */
function usePrefersReducedMotion() {
  const [prefers, setPrefers] = useState(false);
  useEffect(() => {
    if (typeof window === 'undefined' || !window.matchMedia) return;
    const media = window.matchMedia('(prefers-reduced-motion: reduce)');
    const onChange = () => setPrefers(media.matches);
    onChange();
    media.addEventListener ? media.addEventListener('change', onChange) : media.addListener(onChange);
    return () => {
      media.removeEventListener ? media.removeEventListener('change', onChange) : media.removeListener(onChange);
    };
  }, []);
  return prefers;
}
