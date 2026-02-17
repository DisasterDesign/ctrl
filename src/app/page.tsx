import Hero3D from "@/components/hero3d";
import ScrollRevealSection from "@/components/ScrollRevealSection";
import Results from "@/components/Results";
import Services from "@/components/Services";
import Process from "@/components/Process";
import About from "@/components/About";
import WhoIsThisFor from "@/components/NotForEveryone";
import Testimonials from "@/components/Testimonials";
import FAQ from "@/components/FAQ";
import CTASection from "@/components/CTASection";

export default function Home() {
  return (
    <>
      <Hero3D />
      <ScrollRevealSection />
      <Results />
      <Services />
      <Process />
      <About />
      <WhoIsThisFor />
      <Testimonials />
      <FAQ />
      <CTASection />
    </>
  );
}
