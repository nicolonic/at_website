export default function SignalStackMockup() {
    return (
      <section id="system-map" className="w-full bg-white">
        <div className="mx-auto max-w-6xl px-6 md:px-8 py-14 md:py-18">
          {/* CARD ROW */}
          <div className="relative mx-auto flex w-full max-w-[1100px] items-stretch justify-center">
            {/* Find */}
            <div
              role="img"
              aria-label="Find: start from seeds, clean and dedupe targets"
              tabIndex={0}
              className="group relative z-40 aspect-[5/3] w-[240px] md:w-[260px] rounded-3xl border border-black/5 bg-white shadow-[0_8px_24px_rgba(0,0,0,0.06)] outline-none focus-visible:ring-2 focus-visible:ring-indigo-400/40"
              title="Seeds: customers • domains • description → cleaned targets"
            >
              {/* lineage chip (persists across all cards) */}
              <LineageChip />
  
              {/* subtle header hairline */}
              <div className="absolute inset-x-0 top-0 h-9 rounded-t-3xl bg-gradient-to-b from-slate-50/70 to-transparent" />
  
              {/* seeds cluster */}
              <div className="relative h-full p-5 md:p-6">
                <div className="flex items-center gap-2" aria-hidden>
                  <IconPerson className="h-5 w-5 text-indigo-600/50" />
                  <IconGlobe className="h-5 w-5 -ml-1 text-indigo-600/40" />
                  <IconText className="h-5 w-5 text-slate-700/50" />
                </div>
  
                {/* dedupe merge (two become one) */}
                <div className="mt-4 flex items-center gap-2">
                  <span className="relative h-6 w-6 rounded-full bg-indigo-500/10 ring-1 ring-indigo-500/30" />
                  <span className="-ml-3 h-6 w-6 rounded-full bg-indigo-500/10 ring-1 ring-indigo-500/30" />
                  <span className="ml-2 h-7 w-24 rounded-full bg-gradient-to-r from-slate-100 to-slate-50 ring-1 ring-black/5" />
                </div>
  
                {/* tiny hint row */}
                <div className="absolute bottom-5 left-5 flex items-center gap-1 opacity-70" aria-hidden>
                  <span className="block h-[3px] w-8 rounded-full bg-slate-900/20" />
                  <span className="block h-[3px] w-4 rounded-full bg-slate-900/10" />
                </div>
              </div>
            </div>
  
            {/* Prioritize */}
            <div
              role="img"
              aria-label="Prioritize: score candidates by custom signals"
              tabIndex={0}
              className="group relative -ml-4 z-30 aspect-[5/3] w-[240px] md:w-[260px] rounded-3xl border border-black/5 bg-white shadow-[0_8px_24px_rgba(0,0,0,0.06)] outline-none focus-visible:ring-2 focus-visible:ring-indigo-400/40 md:-ml-8"
              title="Scored by ICP fit • size • funding/news • mentions in JD"
            >
              <LineageChip />
              <div className="absolute inset-x-0 top-0 h-9 rounded-t-3xl bg-gradient-to-b from-slate-50/70 to-transparent" />
              <div className="h-full p-5 md:p-6">
                {/* score bands with a highlighted candidate */}
                <div className="space-y-3">
                  <div className="relative h-7 w-full rounded-xl ring-1 ring-black/5 bg-slate-100 overflow-hidden">
                    <div className="h-full w-3/4 bg-gradient-to-r from-indigo-300/50 to-indigo-500/50" />
                    {/* highlight puck shows the same lineage color */}
                    <span className="absolute right-2 top-1/2 -translate-y-1/2 h-4 w-4 rounded-full bg-indigo-500/30 ring-1 ring-indigo-500/40" />
                  </div>
                  <div className="h-7 w-[88%] rounded-xl ring-1 ring-black/5 bg-slate-100 overflow-hidden">
                    <div className="h-full w-1/2 bg-gradient-to-r from-indigo-300/40 to-indigo-500/40" />
                  </div>
                  <div className="h-7 w-3/5 rounded-xl ring-1 ring-black/5 bg-slate-100 overflow-hidden">
                    <div className="h-full w-1/3 bg-gradient-to-r from-indigo-300/30 to-indigo-500/30" />
                  </div>
                </div>
              </div>
            </div>
  
            {/* Personalize */}
            <div
              role="img"
              aria-label="Personalize: drafts from your examples with proof‑point chips"
              tabIndex={0}
              className="group relative -ml-4 z-20 aspect-[5/3] w-[240px] md:w-[260px] rounded-3xl border border-black/5 bg-white shadow-[0_8px_24px_rgba(0,0,0,0.06)] outline-none focus-visible:ring-2 focus-visible:ring-indigo-400/40 md:-ml-8"
              title="Drafts assemble from Your Examples with table facts"
            >
              <LineageChip />
              <div className="absolute inset-x-0 top-0 h-9 rounded-t-3xl bg-gradient-to-b from-slate-50/70 to-transparent" />
              <div className="h-full p-5 md:p-6">
                {/* subject line */}
                <div className="mb-3 h-2.5 w-40 rounded-full bg-slate-900/20" />
                {/* body lines */}
                <div className="space-y-2">
                  <div className="h-2 w-44 rounded-full bg-slate-900/15" />
                  <div className="h-2 w-36 rounded-full bg-slate-900/10" />
                </div>
                {/* proof-point & example chips */}
                <div className="mt-4 flex flex-wrap items-center gap-2" aria-hidden>
                  <span className="inline-flex h-6 items-center gap-1 rounded-full border border-indigo-500/30 bg-indigo-500/10 px-2">
                    <span className="h-2 w-2 rounded-full bg-indigo-500/70" />
                    <IconSparkle className="h-3 w-3 text-indigo-500/70" />
                  </span>
                  <span className="inline-flex h-6 items-center rounded-full border border-slate-300 bg-white/70 px-2">
                    <span className="block h-1.5 w-6 rounded-full bg-slate-900/30" />
                  </span>
                  <span className="inline-flex h-6 items-center rounded-full border border-slate-300 bg-white/70 px-2">
                    <span className="block h-1.5 w-8 rounded-full bg-slate-900/25" />
                  </span>
                </div>
              </div>
            </div>
  
            {/* Send */}
            <div
              role="img"
              aria-label="Send: deliver via Gmail/Outlook or handoff to sequencers and track replies"
              tabIndex={0}
              className="group relative -ml-4 z-10 aspect-[5/3] w-[240px] md:w-[260px] rounded-3xl border border-black/5 bg-white shadow-[0_8px_24px_rgba(0,0,0,0.06)] outline-none focus-visible:ring-2 focus-visible:ring-indigo-400/40 md:-ml-8"
              title="Send via Gmail/Outlook or SmartLead/Instantly; track replies"
            >
              <LineageChip />
              <div className="absolute inset-x-0 top-0 h-9 rounded-t-3xl bg-gradient-to-b from-slate-50/70 to-transparent" />
              <div className="h-full p-5 md:p-6">
                {/* channel glyphs */}
                <div className="flex items-center gap-2" aria-hidden>
                  <IconEnvelope className="h-5 w-5 text-slate-700/70" />
                  <span className="h-5 w-5 rounded-md ring-1 ring-black/5 bg-slate-800/5" />
                  <span className="h-5 w-5 rounded-md ring-1 ring-black/5 bg-slate-800/5" />
                </div>
  
                {/* sent tile + reply */}
                <div className="mt-4 flex items-center gap-2">
                  <div className="h-8 w-24 rounded-xl ring-1 ring-black/5 bg-slate-100" aria-hidden />
                  <span className="relative inline-flex h-2.5 w-2.5 items-center justify-center rounded-full bg-emerald-500/80">
                    <span className="sr-only">Reply received</span>
                  </span>
                </div>
  
                {/* cadence hint */}
                <div className="absolute bottom-5 left-5 flex items-center gap-1 opacity-70" aria-hidden>
                  <span className="block h-[3px] w-4 rounded-full bg-slate-900/15" />
                  <span className="block h-[3px] w-4 rounded-full bg-slate-900/15" />
                  <span className="block h-[3px] w-4 rounded-full bg-slate-900/15" />
                </div>
              </div>
            </div>
          </div>
  
          {/* LABELS / DEEP LINKS */}
          <nav className="mt-7 md:mt-8 flex items-center justify-center gap-4 md:gap-8 text-sm font-medium">
            <a href="#find" className="rounded-full px-3 py-2 text-slate-900/80 hover:text-slate-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400/40">Find</a>
            <a href="#prioritize" className="rounded-full px-3 py-2 text-slate-900/80 hover:text-slate-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400/40">Prioritize</a>
            <a href="#personalize" className="rounded-full px-3 py-2 text-slate-900/80 hover:text-slate-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400/40">Personalize</a>
            <a href="#send" className="rounded-full px-3 py-2 text-slate-900/80 hover:text-slate-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400/40">Send</a>
          </nav>
        </div>
      </section>
    );
  }
  
  function LineageChip() {
    return (
      <span aria-hidden className="absolute right-4 top-4 inline-block h-2.5 w-2.5 rounded-full bg-gradient-to-br from-indigo-400 to-indigo-600"></span>
    );
  }
  
  function IconEnvelope({ className = '' }) {
    return (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className={className} aria-hidden>
        <rect x="3.5" y="5" width="17" height="14" rx="3" />
        <path d="M4 7l7.4 5.2a2 2 0 002.2 0L21 7" />
      </svg>
    );
  }
  
  function IconPerson({ className = '' }) {
    return (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className={className} aria-hidden>
        <circle cx="12" cy="8" r="3.5" />
        <path d="M5 19c1.6-3 4-4.5 7-4.5S17.4 16 19 19" />
      </svg>
    );
  }
  
  function IconGlobe({ className = '' }) {
    return (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className={className} aria-hidden>
        <circle cx="12" cy="12" r="8.5" />
        <path d="M3.5 12h17M12 3.5a17 17 0 010 17M12 3.5a17 17 0 000 17" />
      </svg>
    );
  }
  
  function IconText({ className = '' }) {
    return (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className={className} aria-hidden>
        <path d="M4 6h16M4 12h10M4 18h7" />
      </svg>
    );
  }
  
  function IconSparkle({ className = '' }) {
    return (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className={className} aria-hidden>
        <path d="M12 4l1.5 3.5L17 9l-3.5 1.5L12 14l-1.5-3.5L7 9l3.5-1.5L12 4z" />
      </svg>
    );
  }