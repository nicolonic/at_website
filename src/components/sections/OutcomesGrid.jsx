export default function OutcomesGrid() {
    const items = [
      { key:'build', title:'Find more of your best customers',
        body:'Start with a seed. Autotouch finds lookalikes and pushes a clean list to your Smart-Table.',
        labels:['Lookalikes','CSV → table'], media:'/loops/lookalikes.webm' },
      { key:'research', title:'Prioritize the right accounts',
        body:'Score by ICP, size, funding/news, and “mentions X in job descriptions.”',
        labels:['Custom signals','High-intent first'], media:'/loops/prioritize.webm' },
      { key:'personalize', title:'Personalize every touch',
        body:'Draft from Your examples. Variables fill from the table with segment + proof points.',
        labels:['Your voice','Proof-driven'], media:'/loops/personalize.webm' },
      { key:'engage', title:'Send & track from your stack',
        body:'Gmail/Outlook or SmartLead/Instantly. Queue Email → Call → Bump and track replies.',
        labels:['Gmail/Outlook','Sequences'], media:'/loops/send.webm' },
    ];
    return (
      <section className="mx-auto max-w-6xl px-4 py-20">
        <header className="mb-8">
          <h2 className="text-3xl md:text-4xl font-semibold">From idea to pipeline</h2>
          <p className="text-muted-foreground mt-2">Find more lookalikes, surface the right signals, write real emails, and send from your stack.</p>
        </header>
        <div className="grid gap-6 md:grid-cols-2">
          {items.map(it=>(
            <a key={it.key} href="#how-it-works" data-target-step={it.key.replace('engage','engage')}>
              <div className="rounded-2xl border bg-card shadow-sm overflow-hidden hover:shadow-md transition">
                <div className="relative aspect-video bg-muted">
                  <video src={it.media} muted loop playsInline preload="none" className="absolute inset-0 h-full w-full object-cover"/>
                  <div className="absolute left-3 bottom-3 flex gap-2">
                    {it.labels.map(l=>(
                      <span key={l} className="text-xs px-2 py-1 rounded-full bg-background/80 backdrop-blur border">{l}</span>
                    ))}
                  </div>
                </div>
                <div className="p-5">
                  <h3 className="text-lg font-medium">{it.title}</h3>
                  <p className="mt-1 text-sm text-muted-foreground">{it.body}</p>
                </div>
              </div>
            </a>
          ))}
        </div>
        <div className="mt-8 flex gap-3">
          <a href="https://www.autotouch.ai/talk-to-sales" className="btn btn-primary">Book a demo</a>
          <a className="btn btn-ghost">Watch 90-sec demo</a>
        </div>
      </section>
    );
  }
  