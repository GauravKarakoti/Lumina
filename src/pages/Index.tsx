import { useState, useEffect } from "react";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Features from "@/components/Features";
import Team from "@/components/Team";
import Footer from "@/components/Footer";
import FAQ from "@/components/FAQ";
import { Users } from "lucide-react"; // Make sure to install lucide-react if not present, or use an existing icon

const Index = () => {
  const [userCount, setUserCount] = useState<number | null>(null);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_BACKEND_URL}/api/stats`) 
      .then(res => res.json())
      .then(data => setUserCount(data.userCount))
      .catch(err => console.error("Failed to fetch user count", err));
  }, []);

  return (
    <div className="min-h-screen relative">
      <Header />
      <Hero />
      <Features />
      <Team />

      {/* --- New User Count Section --- */}
      <section className="pb-10 relative overflow-hidden">
         {/* Background Glow Effect */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent pointer-events-none" />
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <h2 className="text-3xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
              Join Our Growing Community
            </h2>
            
            <div className="p-8 rounded-2xl border border-border/50 bg-card/50 backdrop-blur-sm cosmic-glow inline-block">
              <div className="flex flex-col items-center justify-center gap-4">
                <div className="p-4 rounded-full bg-primary/10 text-primary mb-2">
                  <Users className="w-8 h-8 md:w-12 md:h-12" />
                </div>
                
                <div className="space-y-2">
                  <span className="text-5xl md:text-7xl font-bold text-foreground block tracking-tight">
                    {userCount !== null ? userCount.toLocaleString() : "..."}+
                  </span>
                  <p className="text-xl text-muted-foreground font-medium">
                    Students Registered
                  </p>
                </div>
              </div>
            </div>

            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Be part of the revolution in education. Sign up today and start your learning journey.
            </p>
          </div>
        </div>
      </section>

      <FAQ />
      <Footer />
    </div>
  );
};

export default Index;