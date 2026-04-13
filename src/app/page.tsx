import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Claim from "@/components/Claim";
import Showcase from "@/components/Showcase";
import Navigation from "@/components/Navigation";
import TechSphere from "@/components/TechSphere";
import Marquee from "@/components/Marquee";
import CTA from "@/components/CTA";
import Footer from "@/components/Footer";
import SectionSeparator from "@/components/SectionSeparator";
import SectionIndicator from "@/components/SectionIndicator";

export default function Home() {
  return (
    <main>
      <Navbar />
      <SectionIndicator />

      <Hero />
      <SectionSeparator fromColor="#050505" toColor="#050505" />

      <Claim />
      <SectionSeparator fromColor="#050505" toColor="#0d0518" showDots />

      <Showcase />
      <SectionSeparator fromColor="#0d0518" toColor="#050505" />

      <Navigation />
      <SectionSeparator fromColor="#050505" toColor="#0d0520" showDots />

      <TechSphere />
      <SectionSeparator fromColor="#050505" toColor="#050505" />

      <Marquee />

      <CTA />
      <Footer />
    </main>
  );
}
