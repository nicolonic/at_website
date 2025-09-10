import { tokens } from '../../tokens.js';

export default function LogoStrip() {
  return (
    <section 
      id="logos-section"
      className="py-12 bg-gradient-to-b from-slate-50/30 to-white"
      aria-labelledby="partners-heading"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-8 items-center justify-items-center">
          {tokens.logos.map((logo, index) => (
            <div 
              key={index}
              className="group flex items-center justify-center w-full h-8 px-4"
            >
              <img
                src={logo.src}
                alt={logo.alt}
                className="max-h-full max-w-full object-contain filter grayscale opacity-40 group-hover:opacity-70 group-hover:grayscale-0 transition-all duration-300"
                loading="lazy"
                onError={(e) => {
                  e.target.style.display = 'none';
                  e.target.nextElementSibling.style.display = 'flex';
                }}
              />
              <div 
                className="hidden w-full h-8 bg-slate-200 rounded items-center justify-center"
                aria-label={`${logo.alt} logo`}
              >
                <span className="text-xs text-slate-500 font-medium">
                  {logo.alt}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}