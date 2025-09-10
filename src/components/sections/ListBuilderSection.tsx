import React, { useEffect, useState } from "react";

/**
 * ListBuilderSection - Clean single-column recipe catalog
 * - Bucket filters for categories
 * - Featured recipes (6 max)
 * - Consistent capsule design
 * - Expandable to full catalog
 */

type RecipeId = string;
type RecipeCategory = "featured" | "companies" | "people" | "social" | "import";

type Recipe = {
  id: RecipeId;
  title: string;
  subtitle: string;
  seedIcon: string;
  seedType: string;
  outputType: string;
  deduped?: boolean;
  category: RecipeCategory[];
  popular?: boolean;
  details?: string[];
};

// Complete recipe catalog
const ALL_RECIPES: Recipe[] = [
  // Featured recipes (most popular)
  {
    id: "exa_similar",
    title: "Similar companies",
    subtitle: "Find companies like your best customers",
    seedIcon: "🌐",
    seedType: "Domains",
    outputType: "Companies",
    deduped: true,
    category: ["featured", "companies"],
    popular: true,
    details: ["Neural similarity search", "Dedupes by domain", "Exports to Smart-Table"]
  },
  {
    id: "exa_search_v1",
    title: "Describe your ideal customer",
    subtitle: "Type a short description—we'll find matching companies",
    seedIcon: "✍️",
    seedType: "Text",
    outputType: "Companies",
    category: ["featured", "companies"],
    popular: true,
    details: ["Natural language search", "Returns domains + basics"]
  },
  {
    id: "tech_stack",
    title: "Companies using specific tools",
    subtitle: "Targets with a specific tech stack",
    seedIcon: "🧩",
    seedType: "Tech",
    outputType: "Companies",
    category: ["featured", "companies"],
    popular: true,
    details: ["Stack detection", "High-intent signals"]
  },
  {
    id: "recently_funded",
    title: "Companies recently funded",
    subtitle: "Newly funded firms to prioritize",
    seedIcon: "💸",
    seedType: "News",
    outputType: "Companies",
    category: ["featured", "companies"],
    popular: true,
    details: ["Last 90 days", "Series A-C focus"]
  },
  {
    id: "linkedin_search_v1",
    title: "Find people on LinkedIn",
    subtitle: "Search by role, company, or keywords",
    seedIcon: "🔗",
    seedType: "LinkedIn",
    outputType: "People",
    category: ["featured", "people"],
    popular: true,
    details: ["Profile enrichment", "Direct LinkedIn URLs"]
  },
  {
    id: "people_at_similar",
    title: "People at similar companies",
    subtitle: "Decision-makers at lookalikes",
    seedIcon: "🌐",
    seedType: "Domains",
    outputType: "People",
    category: ["featured", "people"],
    popular: true,
    details: ["Finds key contacts", "Title + seniority filters"]
  },

  // Additional company recipes
  {
    id: "jsearch",
    title: "Hiring for specific roles",
    subtitle: "Firms actively hiring your persona",
    seedIcon: "💼",
    seedType: "Jobs",
    outputType: "Companies",
    category: ["companies"],
    details: ["Real-time job data", "Intent signals"]
  },
  {
    id: "job_mentions",
    title: "Mentions keyword in jobs",
    subtitle: "Signals real need in job descriptions",
    seedIcon: "📰",
    seedType: "Jobs",
    outputType: "Companies",
    category: ["companies"],
    details: ["JD keyword search", "Tech mentions"]
  },
  {
    id: "industry_size",
    title: "In industry and size",
    subtitle: "Tightly scoped ICP lists",
    seedIcon: "📊",
    seedType: "Filters",
    outputType: "Companies",
    category: ["companies"],
    details: ["Industry codes", "Employee ranges"]
  },
  {
    id: "tech_combo",
    title: "Using multiple tools",
    subtitle: "Stack combos for high intent",
    seedIcon: "🧩",
    seedType: "Tech",
    outputType: "Companies",
    category: ["companies"],
    details: ["AND/OR logic", "Tech graph data"]
  },
  {
    id: "in_news",
    title: "Recently in the news",
    subtitle: "Announced launches or expansions",
    seedIcon: "🗞️",
    seedType: "News",
    outputType: "Companies",
    category: ["companies"],
    details: ["Last 30 days", "Expansion signals"]
  },

  // People recipes
  {
    id: "heads_of_function",
    title: "Heads of function at target list",
    subtitle: "Pulls decision-makers from your targets",
    seedIcon: "📜",
    seedType: "List",
    outputType: "People",
    category: ["people"],
    details: ["Seniority mapping", "Title normalization"]
  },
  {
    id: "title_geo",
    title: "Title in geography",
    subtitle: "Role + location filter",
    seedIcon: "🔎",
    seedType: "LinkedIn",
    outputType: "People",
    category: ["people"],
    details: ["Geo targeting", "Remote included"]
  },
  {
    id: "past_champions",
    title: "Past champions from CRM",
    subtitle: "People you've engaged before",
    seedIcon: "🗂️",
    seedType: "CRM",
    outputType: "People",
    category: ["people", "import"],
    details: ["CRM sync", "Engagement history"]
  },

  // Social/Content recipes
  {
    id: "instagram",
    title: "Brands like @username",
    subtitle: "Find similar Instagram accounts",
    seedIcon: "📷",
    seedType: "Instagram",
    outputType: "Brands",
    category: ["social"],
    details: ["Follower overlap", "Content similarity"]
  },
  {
    id: "linkedin_posts",
    title: "People posting about topic",
    subtitle: "Active posters to reach out to",
    seedIcon: "#",
    seedType: "Hashtags",
    outputType: "People",
    category: ["social", "people"],
    details: ["Recent posts", "Engagement metrics"]
  },

  // Import recipes
  {
    id: "csv_upload",
    title: "Upload a CSV of domains",
    subtitle: "We enrich, dedupe, and score",
    seedIcon: "📄",
    seedType: "CSV",
    outputType: "Companies",
    category: ["import"],
    details: ["Bulk enrichment", "Auto-deduplication"]
  },
  {
    id: "crm_sync",
    title: "Import CRM segment",
    subtitle: "Sync a saved view from your CRM",
    seedIcon: "🗂️",
    seedType: "CRM",
    outputType: "Companies/People",
    category: ["import"],
    details: ["HubSpot/Salesforce", "Real-time sync"]
  }
];

export default function ListBuilderSection({
  onOpenRecipe,
}: {
  onOpenRecipe?: (id: RecipeId) => void;
}) {
  const [selectedBucket, setSelectedBucket] = useState<RecipeCategory>("featured");
  const [showAll, setShowAll] = useState(false);
  const [hoveredRecipe, setHoveredRecipe] = useState<RecipeId | null>(null);

  // Filter recipes based on selected bucket
  const filteredRecipes = ALL_RECIPES.filter(r => r.category.includes(selectedBucket));
  const displayRecipes = showAll ? filteredRecipes : filteredRecipes.slice(0, 6);

  const buckets = [
    { id: "featured" as RecipeCategory, label: "Featured", icon: "⭐" },
    { id: "companies" as RecipeCategory, label: "Companies", icon: "🏢" },
    { id: "people" as RecipeCategory, label: "People", icon: "👥" },
    { id: "social" as RecipeCategory, label: "Social/Content", icon: "📱" },
    { id: "import" as RecipeCategory, label: "From CSV/CRM", icon: "📊" }
  ];

  function handleCreateList(id: RecipeId) {
    onOpenRecipe?.(id);
  }

  return (
    <section id="lists" className="mx-auto max-w-4xl px-4 md:px-6 py-24">
      {/* Header */}
      <header className="text-center max-w-2xl mx-auto mb-10">
        <h2 className="text-3xl md:text-4xl font-semibold tracking-tight text-slate-900">
          Build lists that match your ICP
        </h2>
        <p className="mt-3 text-base md:text-lg text-slate-600">
          Start with a seed, pick a recipe, stream clean results to Smart-Table.
        </p>
      </header>

      {/* Bucket filters */}
      <div className="flex items-center justify-center gap-2 mb-8 flex-wrap">
        {buckets.map(bucket => (
          <button
            key={bucket.id}
            onClick={() => {
              setSelectedBucket(bucket.id);
              setShowAll(false);
            }}
            className={[
              "inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-medium transition-all",
              selectedBucket === bucket.id
                ? "bg-slate-900 text-white"
                : "bg-white border border-slate-200 text-slate-600 hover:bg-slate-50"
            ].join(" ")}
          >
            <span className="text-base">{bucket.icon}</span>
            <span>{bucket.label}</span>
          </button>
        ))}
      </div>

      {/* Recipe grid - single column on mobile, 2 cols on desktop */}
      <div className="grid gap-4 md:grid-cols-2">
        {displayRecipes.map((recipe) => (
          <article
            key={recipe.id}
            className="group relative rounded-xl border border-slate-200 bg-white p-4 transition-all hover:shadow-md hover:border-slate-300"
            onMouseEnter={() => setHoveredRecipe(recipe.id)}
            onMouseLeave={() => setHoveredRecipe(null)}
          >
            {/* Popover details on hover */}
            {hoveredRecipe === recipe.id && recipe.details && (
              <div className="absolute -top-2 left-1/2 -translate-x-1/2 -translate-y-full z-10 w-64 p-3 bg-slate-900 text-white rounded-lg shadow-xl pointer-events-none">
                <div className="text-xs space-y-1">
                  {recipe.details.map((detail, i) => (
                    <div key={i} className="flex items-start gap-1.5">
                      <span className="text-slate-400 mt-0.5">•</span>
                      <span>{detail}</span>
                    </div>
                  ))}
                </div>
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-full">
                  <div className="w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-t-[6px] border-t-slate-900"></div>
                </div>
              </div>
            )}

            <div className="flex items-start justify-between gap-4">
              <div className="min-w-0 flex-1">
                {/* Title */}
                <h3 className="text-base font-semibold text-slate-900">
                  {recipe.title}
                </h3>
                
                {/* Subtitle */}
                <p className="mt-0.5 text-sm text-slate-600 line-clamp-1">
                  {recipe.subtitle}
                </p>
                
                {/* Single chip */}
                <div className="mt-3 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-slate-50 border border-slate-200 text-xs">
                  <span>{recipe.seedIcon}</span>
                  <span className="text-slate-600">{recipe.seedType}</span>
                  <span className="text-slate-400">→</span>
                  <span className="text-slate-700">{recipe.outputType}</span>
                  {recipe.deduped && (
                    <span className="ml-0.5 text-emerald-600">✓</span>
                  )}
                </div>
              </div>

              {/* CTA */}
              <button
                onClick={() => handleCreateList(recipe.id)}
                className="shrink-0 px-3 py-1.5 rounded-full bg-slate-900 text-white text-sm font-medium hover:bg-slate-800 transition"
              >
                Create list
              </button>
            </div>
          </article>
        ))}

        {/* See all / Show less card */}
        {filteredRecipes.length > 6 && (
          <button
            onClick={() => setShowAll(!showAll)}
            className="rounded-xl border border-dashed border-slate-300 bg-slate-50 p-8 transition-all hover:bg-slate-100 hover:border-slate-400"
          >
            <div className="text-center">
              <div className="text-2xl mb-2">{showAll ? "↑" : "→"}</div>
              <div className="text-sm font-medium text-slate-700">
                {showAll 
                  ? `Show less (back to 6)`
                  : `See all ${filteredRecipes.length} recipes`
                }
              </div>
            </div>
          </button>
        )}
      </div>

      {/* Bottom CTA */}
      <div className="mt-12 text-center">
        <p className="text-sm text-slate-600 mb-4">
          Can't find what you need? We're always adding new recipes.
        </p>
        <a
          href="mailto:hello@autotouch.ai?subject=Recipe%20Request"
          className="inline-flex items-center text-sm font-medium text-slate-900 hover:text-slate-700"
        >
          Request a recipe
          <svg className="ml-1 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </a>
      </div>
    </section>
  );
}