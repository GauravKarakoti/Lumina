import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BookMarked, Share2, X } from "lucide-react";
import { Button } from "@/components/ui/button";

const StudyPanel = () => {
  return (
    <div className="space-y-6">
      <Card className="cosmic-card border-cosmic-accent/20">
        <CardHeader className="flex flex-row items-center justify-between pb-3">
          <CardTitle className="text-lg text-cosmic-glow flex items-center gap-2">
            <BookMarked className="w-5 h-5" />
            GENETICS: THE BASICS
          </CardTitle>
          <Share2 className="w-4 h-4 text-muted-foreground" />
        </CardHeader>
        <CardContent className="space-y-4">
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li>• DNA & RNA Inheritance</li>
            <li>• Molecular Genetics</li>
          </ul>
          
          <div className="flex justify-center py-6">
            <div className="text-8xl">🧬</div>
          </div>
        </CardContent>
      </Card>

      <Card className="cosmic-card border-amber-400/30 bg-gradient-to-br from-amber-100 to-yellow-100">
        <CardContent className="p-4 relative">
          <Button
            variant="ghost"
            size="icon"
            className="absolute top-2 right-2 h-6 w-6 text-gray-600 hover:text-gray-900"
          >
            <X className="w-4 h-4" />
          </Button>
          <p className="text-sm italic text-gray-800 font-medium">
            Don't forget to review<br />
            Punnett Squares!
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default StudyPanel;
