export default function SegmentedProgress({ count, active, progress }) {
  return (
    <>
      {/* Accessible announcement */}
      <div className="sr-only" aria-live="polite" aria-atomic="true">
        Showing tab {active + 1} of {count}
      </div>
      
      {/* Visual progress tracker */}
      <div className="mx-auto pt-2 pb-3 flex w-44 gap-1.5" aria-hidden="true">
        {Array.from({ length: count }).map((_, i) => {
          const pct = i === active ? Math.max(0, Math.min(1, progress)) : i < active ? 1 : 0;
          const isCompleted = i < active;
          
          return (
            <div key={i} className="h-[2px] flex-1 rounded bg-slate-900/5">
              <div
                className={`h-full rounded bg-slate-900/25 transition-[width,opacity] duration-[120ms] ease-linear ${
                  isCompleted ? 'opacity-35' : ''
                } motion-reduce:transition-none`}
                style={{ width: `${pct * 100}%` }}
              />
            </div>
          );
        })}
      </div>
    </>
  );
}