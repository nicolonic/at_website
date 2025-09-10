# Autotouch AI Website

A modern, responsive marketing website built with React + Tailwind CSS featuring:

- ✅ Floating translucent header (Pointer-style behavior)
- ✅ Hero with soft pastel gradient tint (Docket vibe) and Attio-style composition
- ✅ Auto-rotating 4-tab showcase with progress bars and interaction states
- ✅ Logo strip with 6 partner logos in responsive grid
- ✅ Scrolling quote reveal with intersection observer
- ✅ Key features section with 4 numbered items and CTA panel
- ✅ Minimal footer with social links
- ✅ Full accessibility support with ARIA labels and keyboard navigation
- ✅ Responsive design with reduced motion support

## Setup

1. Install dependencies:
```bash
npm install
```

2. Start development server:
```bash
npm run dev
```

3. Build for production:
```bash
npm run build
```

## Customization

### Design Tokens

All design tokens are centralized in `src/tokens.js`. You can easily customize:

- Brand colors and fonts
- Header behavior and appearance
- Hero content and CTAs
- Showcase tabs and content
- Logo strip partners
- Feature descriptions
- Footer links

### Assets

Replace placeholder assets in the following directories:

- `public/logo.svg` - Main brand logo
- `assets/logos/` - Partner company logos (6 SVG files)
- `assets/videos/` - Showcase demo videos (4 MP4 files)

### Content

Update content by modifying the tokens object in `src/tokens.js`:

```javascript
export const tokens = {
  brand: { name: "Your Brand", logoSrc: "/logo.svg" },
  hero: {
    chipText: "Your announcement",
    title: "Your headline",
    subtitle: "Your tagline"
  },
  // ... rest of tokens
}
```

## Features

### Header
- Transforms from transparent to frosted glass on scroll
- Responsive navigation with mobile menu
- Skip link for accessibility
- Dynamic CTA styling

### Showcase
- Auto-rotating tabs with visual progress bars
- Smart pause/resume on hover and focus
- Click to lock behavior with resume control
- Full keyboard navigation (Arrow keys, Enter, Space)
- Respects reduced motion preferences

### Accessibility
- ARIA labels and roles throughout
- Keyboard navigation support
- Skip links and focus management
- High contrast ratios (4.5:1+)
- Screen reader friendly
- Reduced motion support

### Performance
- Lazy loading for below-the-fold content
- Optimized CSS with Tailwind purging
- Minimal JavaScript bundle
- Reserved layout space to prevent CLS

## Browser Support

- Modern browsers (Chrome, Firefox, Safari, Edge)
- Progressive enhancement for older browsers
- Graceful degradation for JavaScript-disabled users

## License

Copyright 2024 Autotouch AI. All rights reserved.