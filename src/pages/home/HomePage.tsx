
import { Features } from "./Features";
import { Stats } from "./Stats";
import { Testimonials } from "./Testimonials";
import { CTA } from "./CTA";
import Hero from "./Hero";
import Pricing from "./Pricing";



const HomePage = () => {
  return (
    <div className="max-w-7xl mx-auto">
      
      <Hero />
      <Features />
      <Pricing />
      <Stats />
      <CTA />
      <Testimonials />
    </div>
  );
};

export default HomePage;
