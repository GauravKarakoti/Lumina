import { Book, Beaker, Clock, Calculator, Laptop } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { useState } from "react";

const notebooks = [
  { id: 1, name: "Biology", icon: Book, active: true },
  { id: 2, name: "Chemistry", icon: Beaker, active: false },
  { id: 3, name: "History", icon: Clock, active: false },
  { id: 4, name: "Mathematics", icon: Calculator, active: false },
  { id: 5, name: "Computer Science", icon: Laptop, active: false },
];

const Sidebar = () => {
  const [activeId, setActiveId] = useState(1);

  return (
    <Card className="cosmic-card border-cosmic-accent/20">
      <CardHeader>
        <CardTitle className="text-lg text-cosmic-glow">MY NOTEBOOKS</CardTitle>
      </CardHeader>
      <CardContent className="space-y-2">
        {notebooks.map((notebook) => {
          const Icon = notebook.icon;
          return (
            <button
              key={notebook.id}
              onClick={() => setActiveId(notebook.id)}
              className={cn(
                "w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all",
                "hover-glow",
                activeId === notebook.id
                  ? "bg-primary text-primary-foreground cosmic-glow"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              <Icon className="w-5 h-5" />
              <span className="font-medium">{notebook.name}</span>
            </button>
          );
        })}
      </CardContent>
    </Card>
  );
};

export default Sidebar;
