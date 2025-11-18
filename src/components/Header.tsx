import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";
import { Link, useNavigate } from "react-router-dom";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Settings, LogOut, User, Sun, Moon } from "lucide-react";
import { useState, useEffect } from "react";

const Header = () => {
  const { isAuthenticated, isAdmin, logout, user } = useAuth();
  const navigate = useNavigate();
  const [theme, setTheme] = useState<"light" | "dark">("dark");

  // Initialize theme based on current document class
  useEffect(() => {
    const isDark = document.documentElement.classList.contains("dark");
    setTheme(isDark ? "dark" : "light");
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    if (newTheme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-border/50 backdrop-blur-lg bg-background/80">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <img src="/Logo.PNG" alt="Logo" className="h-16 w-auto" />
            <span className="text-2xl font-bold text-glow">STUDYFLOW</span>
          </Link>

          <div className="flex items-center gap-4">
            {isAuthenticated() ? (
              <div className="flex items-center gap-4">
                {isAdmin() && (
                  <Button
                    onClick={() => navigate("/admin")}
                    className="cosmic-glow hover-glow"
                  >
                    Admin
                  </Button>
                )}

                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button 
                      variant="ghost" 
                      className="relative h-10 w-10 rounded-full hover:ring-2 hover:ring-primary/50 transition-all"
                    >
                      <Avatar className="h-10 w-10 border-2 border-primary/20">
                        {/* Generates a consistent random avatar based on the user's email */}
                        <AvatarImage 
                          src={
                            user?.avatarUrl 
                            ? `${import.meta.env.VITE_BACKEND_URL}${user.avatarUrl}` 
                            : `https://api.dicebear.com/7.x/avataaars/svg?seed=${user?.email}`
                          } 
                          alt={user?.email || "User"} 
                        />
                        <AvatarFallback className="bg-primary/20 text-primary">
                          {user?.email?.substring(0, 2).toUpperCase() || "US"}
                        </AvatarFallback>
                      </Avatar>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-56 backdrop-blur-xl bg-background/95 border-border/50" align="end" forceMount>
                    <DropdownMenuLabel className="font-normal">
                      <div className="flex flex-col space-y-1">
                        <p className="text-sm font-medium leading-none">My Account</p>
                        <p className="text-xs leading-none text-muted-foreground">
                          {user?.name ?? user?.email }
                        </p>
                      </div>
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator className="bg-border/50" />
                    
                    <DropdownMenuItem onClick={() => navigate("/settings")} className="cursor-pointer focus:bg-primary/20">
                      <Settings className="mr-2 h-4 w-4" />
                      <span>Settings</span>
                    </DropdownMenuItem>
                    
                    <DropdownMenuItem onClick={toggleTheme} className="cursor-pointer focus:bg-primary/20">
                      {theme === "light" ? (
                        <Moon className="mr-2 h-4 w-4" />
                      ) : (
                        <Sun className="mr-2 h-4 w-4" />
                      )}
                      <span>{theme === "light" ? "Dark Mode" : "Light Mode"}</span>
                    </DropdownMenuItem>
                    
                    <DropdownMenuSeparator className="bg-border/50" />
                    
                    <DropdownMenuItem onClick={logout} className="cursor-pointer text-red-500 focus:bg-red-500/10 focus:text-red-500">
                      <LogOut className="mr-2 h-4 w-4" />
                      <span>Log out</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            ) : (
              <Button
                onClick={() => navigate("/login")}
                className="cosmic-glow hover-glow"
              >
                Login
              </Button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;