import Hero from "@/components/Hero";
import PainPoints from "@/components/PainPoints";
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
      <Hero />
      <PainPoints />
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
