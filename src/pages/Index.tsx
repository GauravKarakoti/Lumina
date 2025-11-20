import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Features from "@/components/Features";
import Testimonial from "@/components/Testimonial";
import Footer from "@/components/Footer";
import FAQ from "@/components/FAQ";

const Index = () => {
  return (
    <div className="min-h-screen relative">
      <Header />
      <Hero />
      <Features />
      <Testimonial />
      <FAQ />
      <Footer />
    </div>
  );
};

export default Index;
