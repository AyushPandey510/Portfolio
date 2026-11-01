import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Skills from "@/components/Skills";
import Process from "@/components/Process";
import Work from "@/components/Work";
import Journey from "@/components/Journey";
import Faq from "@/components/Faq";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

const Index = () => (
  <>
    <Nav />
    <main id="main">
      <Hero />
      <About />
      <Skills />
      <Process />
      <Work />
      <Journey />
      <Faq />
      <Contact />
    </main>
    <Footer />
  </>
);

export default Index;
