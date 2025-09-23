import React, { useEffect, useMemo, useRef, useState } from "react";

/**
 * From idea → pipeline
 * - One diagram (animated flow) with 4 clickable nodes
 * - Smooth-scrolls to the detailed sections below
 * - Updates active node while scrolling (IntersectionObserver)
 * - Pure React + Tailwind; no external animation libs
 */

type Step = {
  id: "find" | "prioritize" | "personalize" | "send";
  title: string;
  sub: string;
  labels: string[];
  anchor?: string; // optional if your detail sections use different ids
};

const STEPS: Step[] = [
  {
    id: "find",
    title: "Find more of your best customers",
    sub:
      "Start with a seed (customers, domains, or a description). Autotouch finds lookalikes via neural/similarity search—then pushes a clean list to your Smart-Table.",
    labels: ["Lookalikes", "CSV → table"],
  },
  {
    id: "prioritize",
    title: "Prioritize the right accounts",
    sub:
      "Your AI agent scores accounts with custom signals (ICP fit, size, funding/news, and “mentions X in job descriptions”). Filter to who’s worth writing first.",
    labels: ["Custom signals", "High-intent first"],
  },
  {
    id: "personalize",
    title: "Personalize every touch",
    sub:
      "Draft emails from Your examples so it sounds like you. Variables fill from the table (segment, proof points) and stay consistent across steps.",
    labels: ["Your voice", "Proof-driven"],
  },
  {
    id: "send",
    title: "Send & track from your stack",
    sub:
      "Send via Gmail/Outlook or hand off to SmartLead/Instantly. Queue Email → Call → Bump and track replies in one place.",
    labels: ["Gmail/Outlook", "Sequences"],
  },
];

export default function PipelineSection() {
  const [active, setActive] = useState<Step["id"]>("find");
  const sectionRef = useRef<HTMLElement | null>(null);

  // Hook up observer to update the active node as the user scrolls the details below.
  useEffect(() => {
    const ids = STEPS.map((s) => s.anchor ?? s.id);
    const targets = ids
      .map((id) => document.getElementById(id))
      .filter(Boolean) as HTMLElement[];

    if (targets.length === 0) return;

    const io = new IntersectionObserver(
      (entries) => {
        // Pick the entry closest to the top that is intersecting
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => Math.abs(a.boundingClientRect.top) - Math.abs(b.boundingClientRect.top));
        if (visible[0]) {
          const id = visible[0].target.id as Step["id"];
          if (id !== active) setActive(id);
        }
      },
      {
        root: null,
        rootMargin: "-30% 0px -60% 0px", // activates when the section center crosses viewport
        threshold: [0.1, 0.3, 0.6],
      }
    );

    targets.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [active]);

  function goTo(id: Step["id"]) {
    const target = document.getElementById(id);
    if (target) {
      target.scrollIntoView({ behavior: "smooth", block: "start" });
      setActive(id);
    }
  }

  return (
    <section ref={sectionRef} className="relative mx-auto max-w-7xl px-4 md:px-6 py-20">
      {/* Header */}
      <header className="text-center max-w-3xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-semibold tracking-tight">
          From idea to pipeline
        </h2>
        <p className="mt-3 text-base md:text-lg text-muted-foreground">
          Find more lookalikes, surface the right signals, write real emails, and send from your
          stack.
        </p>
      </header>

      {/* Diagram wrapper */}
      <div className="mt-12 rounded-3xl border bg-card shadow-sm p-6 md:p-10 relative overflow-hidden">
        {/* dotted bg (lighter than quote) */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-[0.25]"
          style={{
            backgroundImage:
              "radial-gradient(currentColor 1px, transparent 1px), radial-gradient(currentColor 1px, transparent 1px)",
            backgroundSize: "20px 20px",
            backgroundPosition: "0 0, 10px 10px",
            color: "hsl(var(--muted-foreground)/0.3)",
          }}
        />

        {/* SVG flow (horizontal on md+, stacked vertical on mobile) */}
        <div className="relative">
          {/* Desktop / md+ view: horizontal rail */}
          <div className="hidden md:block">
            <FlowRailHorizontal active={active} onJump={goTo} />
          </div>
          {/* Mobile view: vertical rail */}
          <div className="md:hidden">
            <FlowRailVertical active={active} onJump={goTo} />
          </div>
        </div>

        {/* Legend (tiny labels for the active step) */}
        <div className="mt-6 flex items-center gap-2 flex-wrap">
          {STEPS.find((s) => s.id === active)?.labels.map((l) => (
            <span
              key={l}
              className="text-xs leading-tight px-2.5 py-1 rounded-full bg-background/80 backdrop-blur border"
            >
              {l}
            </span>
          ))}
        </div>
      </div>

      {/* CTA row */}
      <div className="mt-8 flex items-center justify-center gap-3">
        <a href="https://www.autotouch.ai/talk-to-sales" className="inline-flex items-center rounded-full bg-primary text-primary-foreground px-5 py-2.5 text-sm font-medium shadow hover:shadow-md transition">
          Book a demo
        </a>
        <a href="/demo" className="inline-flex items-center rounded-full border px-5 py-2.5 text-sm font-medium hover:bg-accent transition">
          Watch 90-sec demo
        </a>
      </div>

      {/* Optional explainer teaser under the diagram (short, not the full sections) */}
      <ol className="mt-12 grid gap-6 md:grid-cols-2">
        {STEPS.map((s) => (
          <li key={s.id} className="rounded-2xl border bg-card p-5">
            <div className="flex items-center gap-2">
              <span
                className={[
                  "inline-flex size-6 items-center justify-center rounded-full text-[11px] font-semibold",
                  nodeTint(s.id),
                ].join(" ")}
                aria-hidden
              >
                {indexOf(s.id) + 1}
              </span>
              <h3 className="text-base md:text-lg font-medium">{s.title}</h3>
            </div>
            <p className="mt-2 text-sm text-muted-foreground">{s.sub}</p>
            <button
              onClick={() => goTo(s.id)}
              className="mt-3 text-sm font-medium text-primary hover:underline"
            >
              Jump to details →
            </button>
          </li>
        ))}
      </ol>
    </section>
  );
}

/* ---------- Diagram components ---------- */

function FlowRailHorizontal({
  active,
  onJump,
}: {
  active: Step["id"];
  onJump: (id: Step["id"]) => void;
}) {
  // evenly distribute 4 nodes on a responsive SVG
  const nodes = useMemo(
    () => [
      { id: "find",    x:  60, label: "Find" },
      { id: "prioritize", x: 320, label: "Prioritize" },
      { id: "personalize", x: 580, label: "Personalize" },
      { id: "send",    x:  840, label: "Send" },
    ],
    []
  );

  return (
    <div className="w-full overflow-hidden">
      <svg viewBox="0 0 900 220" className="w-full h-[220px]">
        {/* rail path */}
        <defs>
          <linearGradient id="railGradient" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%"  stopColor="hsl(var(--primary))" />
            <stop offset="100%" stopColor="hsl(var(--primary))" />
          </linearGradient>
        </defs>

        {/* base line */}
        <path
          d="M60,150 C190,60 450,60 580,150 C700,220 770,140 840,150"
          stroke="hsl(var(--muted-foreground)/0.25)"
          strokeWidth="10"
          fill="none"
          strokeLinecap="round"
        />

        {/* animated dashed overlay */}
        <path
          className="flow-dash"
          d="M60,150 C190,60 450,60 580,150 C700,220 770,140 840,150"
          stroke="url(#railGradient)"
          strokeWidth="10"
          fill="none"
          strokeLinecap="round"
        />

        {/* nodes */}
        {nodes.map((n, i) => {
          const isActive = active === (n.id as Step["id"]);
          return (
            <g key={n.id} transform={`translate(${n.x}, 150)`}>
              <circle
                r={isActive ? 15 : 12}
                className={isActive ? "node-pulse" : ""}
                fill="white"
                stroke="hsl(var(--primary))"
                strokeWidth={isActive ? 5 : 3}
              />
              <foreignObject x={-60} y={22} width={120} height={40}>
                <div className="flex items-center justify-center">
                  <button
                    onClick={() => onJump(n.id as Step["id"])}
                    className={[
                      "rounded-full border px-3 py-1 text-xs font-medium",
                      isActive ? "bg-primary text-primary-foreground border-primary" : "bg-background hover:bg-accent",
                    ].join(" ")}
                    aria-current={isActive ? "step" : undefined}
                    aria-label={`Go to ${n.label}`}
                  >
                    {n.label}
                  </button>
                </div>
              </foreignObject>
              {/* step index badge */}
              <text
                x="0"
                y="-22"
                textAnchor="middle"
                className="fill-muted-foreground text-[10px] select-none"
              >
                {String(i + 1).padStart(2, "0")}
              </text>
            </g>
          );
        })}
      </svg>

      {/* Styles for animation (scoped by utility classes) */}
      <style>{`
        .flow-dash {
          stroke-dasharray: 14 10;
          animation: dash 6.5s linear infinite;
        }
        @keyframes dash {
          to { stroke-dashoffset: -480; }
        }
        @media (prefers-reduced-motion: reduce) {
          .flow-dash { animation: none; }
        }
        .node-pulse {
          filter: drop-shadow(0 0 0.5rem hsl(var(--primary)/0.4));
          transition: r .2s ease, stroke-width .2s ease;
        }
      `}</style>
    </div>
  );
}

function FlowRailVertical({
  active,
  onJump,
}: {
  active: Step["id"];
  onJump: (id: Step["id"]) => void;
}) {
  return (
    <div className="w-full overflow-hidden">
      <svg viewBox="0 0 320 520" className="w-full h-[360px]">
        {/* base line */}
        <path
          d="M160,40 C60,70 60,170 160,200 C260,230 260,330 160,360 C60,390 60,480 160,500"
          stroke="hsl(var(--muted-foreground)/0.25)"
          strokeWidth="10"
          fill="none"
          strokeLinecap="round"
        />
        {/* animated overlay */}
        <path
          className="flow-dash"
          d="M160,40 C60,70 60,170 160,200 C260,230 260,330 160,360 C60,390 60,480 160,500"
          stroke="hsl(var(--primary))"
          strokeWidth="10"
          fill="none"
          strokeLinecap="round"
        />

        {/* four nodes */}
        {[
          { id: "find", y: 40, label: "Find" },
          { id: "prioritize", y: 200, label: "Prioritize" },
          { id: "personalize", y: 360, label: "Personalize" },
          { id: "send", y: 500, label: "Send" },
        ].map((n, i) => {
          const isActive = active === (n.id as Step["id"]);
          return (
            <g key={n.id} transform={`translate(160, ${n.y})`}>
              <circle
                r={isActive ? 15 : 12}
                className={isActive ? "node-pulse" : ""}
                fill="white"
                stroke="hsl(var(--primary))"
                strokeWidth={isActive ? 5 : 3}
              />
              <foreignObject x={-90} y={22} width={180} height={40}>
                <div className="flex items-center justify-center">
                  <button
                    onClick={() => onJump(n.id as Step["id"])}
                    className={[
                      "rounded-full border px-3 py-1 text-xs font-medium",
                      isActive ? "bg-primary text-primary-foreground border-primary" : "bg-background hover:bg-accent",
                    ].join(" ")}
                    aria-current={isActive ? "step" : undefined}
                  >
                    {String(i + 1).padStart(2, "0")} · {n.label}
                  </button>
                </div>
              </foreignObject>
            </g>
          );
        })}
      </svg>

      <style>{`
        .flow-dash {
          stroke-dasharray: 14 10;
          animation: dash 7s linear infinite;
        }
        @keyframes dash { to { stroke-dashoffset: -520; } }
        @media (prefers-reduced-motion: reduce) {
          .flow-dash { animation: none; }
        }
        .node-pulse {
          filter: drop-shadow(0 0 0.5rem hsl(var(--primary)/0.4));
          transition: r .2s ease, stroke-width .2s ease;
        }
      `}</style>
    </div>
  );
}

/* ---------- helpers ---------- */

function indexOf(id: Step["id"]) {
  return STEPS.findIndex((s) => s.id === id);
}
function nodeTint(id: Step["id"]) {
  const i = indexOf(id);
  const palette = [
    "bg-primary/10 text-primary",
    "bg-emerald-500/10 text-emerald-600",
    "bg-amber-500/10 text-amber-700",
    "bg-sky-500/10 text-sky-700",
  ];
  return palette[i] || "bg-primary/10 text-primary";
}