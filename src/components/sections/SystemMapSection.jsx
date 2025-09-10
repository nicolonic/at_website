import React, { useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";

/**
 * SystemMapSection
 * Minimal, premium "how it all connects" map:
 *   Find → Prioritize → Personalize → Send
 * - No external libs
 * - Tailwind for styling
 * - SVG path + nodes + token motion
 */

const STEPS = [
  { id: "find",        label: "Find",        tooltip: "Lookalikes from seeds",           t: 0.10, iconType: "find" },
  { id: "prioritize",  label: "Prioritize",  tooltip: "Custom signals score intent",     t: 0.40, iconType: "prioritize" },
  { id: "personalize", label: "Personalize", tooltip: "Drafts from your examples",       t: 0.70, iconType: "personalize" },
  { id: "send",        label: "Send",        tooltip: "Gmail/Outlook or SmartLead",      t: 0.94, iconType: "send" },
];

// small hook for reduced-motion
function usePrefersReducedMotion() {
  const [prefers, setPrefers] = useState(false);
  useEffect(() => {
    const q = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefers(q.matches);
    const onChange = (e) => setPrefers(e.matches);
    q.addEventListener?.("change", onChange);
    return () => q.removeEventListener?.("change", onChange);
  }, []);
  return prefers;
}

export default function SystemMapSection() {
  const prefersReduced = usePrefersReducedMotion();
  const [active, setActive] = useState("find");

  // Scroll-sync to #find/#prioritize/#personalize/#send
  useEffect(() => {
    const targets = STEPS.map((s) => document.getElementById(s.id)).filter(Boolean);
    if (!targets.length) return;
    const io = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => Math.abs(a.boundingClientRect.top) - Math.abs(b.boundingClientRect.top));
        if (visible[0]) setActive(visible[0].target.id);
      },
      { rootMargin: "-35% 0px -55% 0px", threshold: [0.25, 0.5] }
    );
    targets.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  function jumpTo(id) {
    const el = document.getElementById(id);
    if (!el) return;
    el.scrollIntoView({ behavior: "smooth", block: "start" });
    setActive(id);
    const h = el.querySelector("h2,h3");
    h?.focus?.();
  }

  return (
    <section className="mx-auto max-w-7xl px-4 md:px-6 py-16 md:py-20">
      {/* Header: minimal text */}
      <header className="text-center max-w-3xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-semibold tracking-tight text-slate-900">How it all connects</h2>
        <p className="mt-2 text-sm md:text-base text-slate-600">Find → Prioritize → Personalize → Send</p>
      </header>

      {/* Card container */}
      <div className="mt-10 rounded-3xl border border-slate-200 bg-white shadow-sm p-6 md:p-8 relative overflow-hidden">
        <Rail prefersReduced={prefersReduced} active={active} onJump={jumpTo} />
        {/* Footer link-chips: hint that the next sections go deeper */}
        <div className="mt-6 flex items-center justify-center gap-2">
          {["Build lists", "Research", "Personalize", "Engage"].map((l, i) => (
            <a
              key={l}
              href={["#find", "#prioritize", "#personalize", "#send"][i]}
              className="text-xs md:text-sm px-2.5 py-1 rounded-full border border-slate-200 bg-white/70 hover:bg-slate-50 transition"
            >
              {l}
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------- SVG Rail ---------------- */

function Rail({
  prefersReduced,
  active,
  onJump,
}) {
  const pathRef = useRef(null);
  const [nodeXY, setNodeXY] = useState({
    find: { x: 0, y: 0 },
    prioritize: { x: 0, y: 0 },
    personalize: { x: 0, y: 0 },
    send: { x: 0, y: 0 },
  });

  // compute node coordinates along the path
  useLayoutEffect(() => {
    const p = pathRef.current;
    if (!p) return;
    const L = p.getTotalLength();
    const coords = { ...nodeXY };
    STEPS.forEach((s) => {
      const pt = p.getPointAtLength(L * s.t);
      coords[s.id] = { x: pt.x, y: pt.y };
    });
    setNodeXY(coords);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // fractions for pause points (near each node)
  const PAUSES = useMemo(() => {
    // expand each step.t to a tiny pause window
    const eps = 0.015; // ~1.5% of path
    const ks = [0];
    STEPS.forEach((s, i) => {
      ks.push(s.t - eps, s.t + eps);
      if (i === STEPS.length - 1) ks.push(1);
    });
    // keep within 0..1 and sorted
    return ks.map((v) => Math.max(0, Math.min(1, v))).sort((a, b) => a - b);
  }, []);

  return (
    <div className="relative w-full">
      <svg viewBox="0 0 1000 260" className="w-full h-[220px] md:h-[240px]" aria-label="Find, Prioritize, Personalize, Send system map">
        {/* gradient for the rail */}
        <defs>
          <linearGradient id="railGrad" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#6d7cff" />
            <stop offset="100%" stopColor="#6d7cff" />
          </linearGradient>
          <filter id="soft" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="6" result="b" />
            <feMerge>
              <feMergeNode in="b" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* rail path (gentle S curve) */}
        <path
          ref={pathRef}
          id="rail-path"
          d="M60,170 C250,70 430,70 600,170 C740,250 820,150 940,170"
          stroke="rgba(100, 116, 139, 0.20)"
          strokeWidth={8}
          fill="none"
          strokeLinecap="round"
        />
        {/* animated draw overlay */}
        <path
          d="M60,170 C250,70 430,70 600,170 C740,250 820,150 940,170"
          stroke="url(#railGrad)"
          strokeWidth={8}
          fill="none"
          strokeLinecap="round"
          pathLength={100}
          strokeDasharray={prefersReduced ? "0 100" : "100"}
          strokeDashoffset={prefersReduced ? 0 : 100}
          className={prefersReduced ? "" : "animate-[draw_1s_ease-out_forwards]"}
        />

        {/* tokens (3) that travel and "pause" near each node; hidden when reduced motion */}
        {!prefersReduced &&
          [0, 0.18, 0.36].map((delay, idx) => (
            <g key={idx} filter="url(#soft)">
              <rect width="30" height="16" rx="8" ry="8" fill="white" stroke="#6d7cff" strokeWidth="2">
                <animateMotion
                  dur="7s"
                  begin={`${delay + 0.2}s`}
                  repeatCount="indefinite"
                  keyPoints={PAUSES.join(";")}
                  keyTimes={PAUSES.map((_, i) => (i / (PAUSES.length - 1)).toFixed(3)).join(";")}
                  calcMode="linear"
                  rotate="auto"
                >
                  <mpath href="#rail-path" />
                </animateMotion>
              </rect>
            </g>
          ))}

        {/* nodes */}
        {STEPS.map((s, i) => {
          const xy = nodeXY[s.id];
          const isActive = active === s.id;
          return (
            <g key={s.id} transform={`translate(${xy.x},${xy.y})`}>
              {/* focusable button area */}
              <a
                href={`#${s.id}`}
                onClick={(e) => {
                  e.preventDefault();
                  onJump(s.id);
                }}
              >
                {/* node pill */}
                <g className="cursor-pointer">
                  <circle
                    r={isActive ? 16 : 13}
                    fill="white"
                    stroke="#6d7cff"
                    strokeWidth={isActive ? 5 : 3}
                    className={isActive ? "transition-all duration-200" : "transition-all duration-200"}
                  />
                </g>
              </a>

              {/* index above */}
              <text
                x="0"
                y="-24"
                textAnchor="middle"
                className="fill-slate-500 text-[10px] select-none"
              >
                {String(i + 1).padStart(2, "0")}
              </text>

              {/* label + icon under */}
              <foreignObject x={-70} y={22} width={140} height={48}>
                <div className="flex items-center justify-center gap-2">
                  <span className="inline-flex items-center justify-center size-5 text-slate-600">
                    {getIcon(s.iconType)}
                  </span>
                  <button
                    aria-current={isActive ? "step" : undefined}
                    className={[
                      "rounded-full border px-3 py-1 text-xs font-medium bg-white/80 backdrop-blur",
                      isActive ? "border-brand-primary" : "hover:bg-slate-50",
                    ].join(" ")}
                    onClick={(e) => {
                      e.preventDefault();
                      onJump(s.id);
                    }}
                  >
                    {s.label}
                  </button>
                </div>
              </foreignObject>

              {/* tiny tooltip (hover/focus) */}
              <foreignObject x={-90} y={-70} width={180} height={30}>
                <div className="flex items-center justify-center">
                  <span
                    className="opacity-0 group-hover:opacity-100 focus-within:opacity-100 transition rounded-full bg-white/90 border border-slate-200 px-2 py-1 text-[11px] text-slate-600 select-none"
                    role="tooltip"
                  >
                    {s.tooltip}
                  </span>
                </div>
              </foreignObject>
            </g>
          );
        })}

        {/* keyframes (scoped) */}
        <style>{`
          @keyframes draw { to { stroke-dashoffset: 0; } }
          @media (prefers-reduced-motion: reduce) {
            .animate-[draw_1s_ease-out_forwards] { animation: none !important; }
          }
        `}</style>
      </svg>
    </div>
  );
}

/* ---------------- Minimal outline icons (brand-consistent) ---------------- */

function getIcon(iconType) {
  switch(iconType) {
    case "find": return <IconFind />;
    case "prioritize": return <IconPrioritize />;
    case "personalize": return <IconPersonalize />;
    case "send": return <IconSend />;
    default: return null;
  }
}

function IconFind() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.5">
      <circle cx="11" cy="11" r="5" />
      <path d="M16 16l4 4" />
    </svg>
  );
}
function IconPrioritize() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M4 5h16M7 10h10M10 15h4M12 19v-8" />
    </svg>
  );
}
function IconPersonalize() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M4 20h6l10-10a2.5 2.5 0 10-3.5-3.5L6.5 16.5 4 20z" />
    </svg>
  );
}
function IconSend() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M3 11l18-8-8 18-2-7-8-3z" />
    </svg>
  );
}