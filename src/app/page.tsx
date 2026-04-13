import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Claim from "@/components/Claim";
import Showcase from "@/components/Showcase";
import Approach from "@/components/Approach";
import Navigation from "@/components/Navigation";
import Marquee from "@/components/Marquee";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main>
      <Navbar />
      <Hero />
      <Claim />
      <Showcase />
      <Approach />
      <Navigation />
      <Marquee />
      <Footer />
    </main>
  );
}
