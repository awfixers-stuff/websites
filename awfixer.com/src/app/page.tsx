import { Background } from "@/components/background";
import { FAQ } from "@/components/blocks/faq";
import { Hero } from "@/components/blocks/hero";
import { Logos } from "@/components/blocks/logos";
import { Pricing } from "@/components/blocks/pricing";
import { Projects } from "@/components/blocks/features";
import { ResourceAllocation } from "@/components/blocks/resource-allocation";
import { Testimonials } from "@/components/blocks/testimonials";
import { Navbar } from "@/components/blocks/navbar";

export default function Home() {
  return (
    <>
      <Navbar />
      <Background className="via-muted to-muted/80">
        <Hero />
        <Logos />
        <Projects />
        <ResourceAllocation />
      </Background>
      <Testimonials />
      <Background variant="bottom">
        <Pricing />
        <FAQ />
      </Background>
    </>
  );
}
