
import { Stats } from "./Stats";
import { Testimonials } from "./Testimonials";
import { CTA } from "./CTA";
import Hero from "./Hero";
import Pricing from "./Pricing";



const HomePage = () => {
  return (
    <div className="max-w-7xl mx-auto">
      
      <Hero />
      <Pricing />
      <Stats />
      <CTA />
      <Testimonials />
    </div>
  );
};

export default HomePage;
