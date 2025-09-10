import { useState, useEffect, useRef } from 'react';
import { tokens } from '../../tokens.js';
import RecipeCarousel from '../animations/RecipeCarousel';
import ResearchAnimation from '../animations/ResearchAnimation';
import PersonalizeAnimation from '../animations/PersonalizeAnimation';
import IntegrationsAnimation from '../animations/IntegrationsAnimation';

// Recipe cards for the Build lists carousel
const listRecipes = [
  {
    id: 'linkedin_search',
    iconType: 'linkedin',
    title: 'LinkedIn Search',
    description: 'Find decision makers by role & company'
  },
  {
    id: 'similar_companies', 
    iconType: 'similar',
    title: 'Similar Companies',
    description: 'Lookalikes to your best customers'
  },
  {
    id: 'job_postings',
    iconType: 'jobs',
    title: 'Job Postings',
    description: 'Companies actively hiring your persona'
  },
  {
    id: 'tech_stack',
    iconType: 'tech',
    title: 'Tech Stack',
    description: 'Companies using specific tools'
  },
  {
    id: 'recent_funding',
    iconType: 'funding',
    title: 'Recent Funding', 
    description: 'Newly funded companies'
  },
  {
    id: 'instagram_similar',
    iconType: 'instagram',
    title: 'Instagram Similar',
    description: 'Find similar brands and audiences'
  }
];

const chapters = [
  {
    id: 'build',
    number: '01',
    label: 'Build lists',
    title: 'Find more of your best customers.',
    subtitle: 'Find lookalikes, people at target accounts, companies hiring your persona, and more.',
    checklist: null, // Remove checklist for build section
    showCTA: false, // Flag to hide CTA for this section
    recipes: listRecipes, // Add recipes for carousel
    chips: [
      { text: 'Lookalikes', x: 12, y: 20, speed: 0.9 },
      { text: 'CSV → table', x: 72, y: 25, speed: 1.1 },
      { text: '8/8 domains ✓', x: 35, y: 75, speed: 1.2, status: true }
    ],
    video: '/assets/videos/build_chapter.mp4',
    poster: '/assets/videos/build_poster.jpg'
  },
  {
    id: 'research',
    number: '02',
    label: 'Research',
    title: 'Surface signals that matter.',
    subtitle: 'Use our AI agent to automate account research and identify which accounts to prioritize.',
    checklist: ['Surface hiring signals & recent news', 'Account scoring & prioritization', 'Automatic data enrichment'],
    chips: [
      { text: 'ICP ✓', x: 8, y: 12, speed: 0.9 },
      { text: 'Recent news', x: 68, y: 16, speed: 1.1 },
      { text: 'Priority: High', x: 22, y: 74, speed: 1.2, status: true }
    ],
    video: '/assets/videos/research_chapter.mp4',
    poster: '/assets/videos/research_poster.jpg'
  },
  {
    id: 'personalize',
    number: '03',
    label: 'Personalize',
    title: 'Write real emails, fast.',
    subtitle: 'AI that combines your company context, target research, and writing style to create authentic outreach.',
    checklist: ['Uses your value prop & messaging', 'Pulls in target research', 'Matches your writing style'],
    chips: [
      { text: 'Uses research', x: 15, y: 18, speed: 0.9 },
      { text: 'Real context', x: 70, y: 22, speed: 1.1 },
      { text: 'Human tone', x: 30, y: 70, speed: 1.2, status: true }
    ],
    video: '/assets/videos/personalize_chapter.mp4',
    poster: '/assets/videos/personalize_poster.jpg'
  },
  {
    id: 'engage',
    number: '04',
    label: 'Engage',
    title: 'Send from your stack.',
    subtitle: 'Multi-channel sequences that work with Gmail, Outlook, and your tools.',
    checklist: ['Your email client', 'Any sales tool'],
    chips: [
      { text: 'Gmail', x: 10, y: 25, speed: 0.9 },
      { text: 'Smartlead', x: 45, y: 20, speed: 1.0 },
      { text: 'Instantly', x: 75, y: 28, speed: 1.1 },
      { text: 'Sent ✓', x: 35, y: 72, speed: 1.2, status: true }
    ],
    video: '/assets/videos/engage_chapter.mp4',
    poster: '/assets/videos/engage_poster.jpg'
  }
];

function ChapterSection({ chapter, index }) {
  const sectionRef = useRef(null);
  const chipsRef = useRef([]);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
          }
        });
      },
      { threshold: 0.15 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;
      
      const rect = sectionRef.current.getBoundingClientRect();
      const vh = window.innerHeight;
      const progress = Math.min(1, Math.max(0, 1 - (rect.bottom - vh * 0.15) / (rect.height + vh * 0.3)));
      
      chipsRef.current.forEach((chip, i) => {
        if (chip) {
          const speed = chapter.chips[i]?.speed || 1;
          const yOffset = progress * 16 * speed;
          chip.style.transform = `translate(-50%, calc(-50% + ${yOffset}px))`;
        }
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, [chapter.chips]);

  // Determine layout based on chapter - alternate every other one
  const isReversed = chapter.id === 'research' || chapter.id === 'engage';
  const copyColClass = isReversed ? "lg:col-span-5 lg:order-2" : "lg:col-span-5";
  const visualColClass = isReversed ? "lg:col-span-7 lg:order-1" : "lg:col-span-7";

  return (
    <section
      ref={sectionRef}
      id={`chapter-${chapter.id}`}
      className="relative isolate overflow-clip py-12 lg:py-16 bg-white"
      aria-labelledby={`${chapter.id}-heading`}
    >
      {/* Background: dots + gradient haze */}
      <div className="absolute inset-0 -z-10">
        <div 
          className="absolute inset-0 opacity-[0.07]"
          style={{
            backgroundImage: 'radial-gradient(rgba(14,21,37,0.8) 1px, transparent 1px)',
            backgroundSize: '8px 8px',
            maskImage: 'radial-gradient(circle at 60% 40%, #000, rgba(0,0,0,0.6) 60%, transparent 85%)'
          }}
        />
        <div 
          className="absolute -inset-[10%] -z-10"
          style={{
            background: `
              radial-gradient(50% 40% at 65% 35%, rgba(195,212,255,0.15), transparent 70%),
              radial-gradient(40% 35% at 20% 70%, rgba(245,216,255,0.12), transparent 70%)
            `
          }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* Copy - order changes based on chapter */}
          <div className={`${copyColClass} space-y-4`}>
            <span className="inline-flex items-center justify-center min-w-[140px] px-3 py-1.5 rounded-full text-xs font-medium bg-white border border-slate-200 text-slate-600">
              {chapter.number} • {chapter.label}
            </span>
            
            <h2 
              id={`${chapter.id}-heading`}
              className="text-3xl lg:text-4xl xl:text-5xl font-bold text-slate-900 leading-tight"
            >
              {chapter.title}
            </h2>
            
            <p className="text-lg text-slate-600 max-w-prose">
              {chapter.subtitle}
            </p>

            {chapter.checklist && (
              <ul className="space-y-2 text-slate-700 hidden lg:block">
                {chapter.checklist.map((item, i) => (
                  <li key={i} className="flex items-center gap-2">
                    <span className="text-slate-400">•</span>
                    <span className="text-sm">{item}</span>
                  </li>
                ))}
              </ul>
            )}

          </div>

          {/* Visual - order changes based on chapter */}
          <div className={visualColClass}>
            <div className="lg:sticky lg:top-24">
              <div className={`
                relative rounded-2xl overflow-hidden shadow-xl bg-slate-900
                aspect-video lg:aspect-[16/10]
                transition-all duration-700 ease-out
                ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}
              `}>
                {/* Show different animations based on chapter */}
                {chapter.id === 'build' && chapter.recipes ? (
                  <RecipeCarousel recipes={chapter.recipes} isActive={isVisible} />
                ) : chapter.id === 'research' ? (
                  <ResearchAnimation isActive={isVisible} />
                ) : chapter.id === 'personalize' ? (
                  <PersonalizeAnimation isActive={isVisible} />
                ) : chapter.id === 'engage' ? (
                  <IntegrationsAnimation isActive={isVisible} />
                ) : (
                  <div className="absolute inset-0 bg-gradient-to-br from-slate-800 to-slate-900">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-center">
                        <div className="w-20 h-20 bg-slate-700 rounded-2xl mx-auto mb-4 animate-pulse"></div>
                        <span className="text-slate-400 text-lg font-medium">{chapter.label} Demo</span>
                        <p className="text-slate-500 text-sm mt-2">Video coming soon</p>
                      </div>
                    </div>
                  </div>
                )}

                {/* Uncomment when videos are ready:
                <video 
                  className="w-full h-full object-cover"
                  autoPlay 
                  muted 
                  loop 
                  playsInline
                  poster={chapter.poster}
                >
                  <source src={chapter.video} type="video/mp4" />
                </video>
                */}

                {/* Floating chips - only show if sections don't have their own animations */}
                {chapter.id !== 'build' && chapter.id !== 'research' && chapter.id !== 'personalize' && chapter.id !== 'engage' && chapter.chips.map((chip, i) => (
                  <span
                    key={i}
                    ref={el => chipsRef.current[i] = el}
                    className={`
                      absolute px-3 py-1.5 rounded-full text-xs font-semibold
                      shadow-lg backdrop-blur-sm
                      ${chip.status 
                        ? 'bg-orange-50 border border-orange-200 text-orange-700' 
                        : 'bg-white/95 border border-slate-200 text-slate-700'
                      }
                    `}
                    style={{
                      left: `${chip.x}%`,
                      top: `${chip.y}%`,
                      transform: 'translate(-50%, -50%)',
                      willChange: 'transform'
                    }}
                  >
                    {chip.text}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}


export default function ChapteredFeatures() {
  return (
    <div className="relative">
      {/* Chapter Sections */}
      {chapters.map((chapter, index) => (
        <ChapterSection key={chapter.id} chapter={chapter} index={index} />
      ))}
    </div>
  );
}