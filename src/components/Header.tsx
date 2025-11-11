import { Button } from "@/components/ui/button";
import { Link, useLocation } from "react-router-dom";

const Header = () => {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-border/50 backdrop-blur-lg bg-background/80">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <span className="text-2xl font-bold text-glow">STUDYFLOW</span>
          </Link>
          
          <Button className="cosmic-glow hover-glow">
            Login
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;
