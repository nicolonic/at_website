import Hero from '../sections/Hero';
import Showcase from '../sections/Showcase';
import LogoStrip from '../sections/LogoStrip';
import ScrollingQuote from '../sections/ScrollingQuote';
import ChapteredFeatures from '../sections/ChapteredFeatures';
// import KeyFeatures from '../sections/KeyFeatures';
import TrialCTA from '../shared/TrialCTA';

export default function HomePage() {
  return (
    <main id="main-content">
      <Hero />
      <Showcase />
      <LogoStrip />
      <ScrollingQuote />
      <ChapteredFeatures />
      {/* <KeyFeatures /> */}
      <TrialCTA />
    </main>
  );
}
