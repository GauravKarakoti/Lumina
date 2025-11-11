import { Twitter, Facebook, Instagram } from "lucide-react";

const Footer = () => {
  return (
    <footer className="border-t border-border/50 py-12 mt-24">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex gap-6 text-sm text-foreground/60">
            <a href="#" className="hover:text-foreground transition-colors">About Us</a>
          </div>
          
          <div className="flex gap-4">
            <a href="https://x.com/GauravKara_Koti" className="p-2 rounded-lg bg-card hover:bg-primary/20 transition-colors cosmic-glow">
              <Twitter className="h-5 w-5" />
            </a>
            <a href="https://www.instagram.com/frevkooh" className="p-2 rounded-lg bg-card hover:bg-primary/20 transition-colors cosmic-glow">
              <Instagram className="h-5 w-5" />
            </a>
          </div>
        </div>
        
        <footer className="text-center py-4 text-gray-500 text-sm">
          © 2025 • Created by <a href="https://github.com/GauravKarakoti" className="font-semibold text-white-700">Gaurav Karakoti</a>
        </footer>
      </div>
    </footer>
  );
};

export default Footer;
