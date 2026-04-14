import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Claim from "@/components/Claim";
import PortalEnter from "@/components/PortalEnter";
import Showcase from "@/components/Showcase";
import PortalExit from "@/components/PortalExit";
import Navigation from "@/components/Navigation";
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

      <PortalEnter />
      <Showcase />
      <PortalExit />

      <Navigation />

      <Footer />
    </main>
  );
}
