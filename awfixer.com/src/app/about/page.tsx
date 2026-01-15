import { Background } from "@/components/background";
import About from "@/components/blocks/about";
import { AboutHero } from "@/components/blocks/about-hero";
import { DashedLine } from "@/components/dashed-line";

export default function AboutPage() {
  return (
    <Background>
      <div className="py-28 lg:py-32 lg:pt-44">
        <AboutHero />

        <About />
        <div className="overflow-hidden pt-28 lg:pt-32">
          <DashedLine className="container max-w-5xl scale-x-115" />
        </div>
      </div>
    </Background>
  );
}
