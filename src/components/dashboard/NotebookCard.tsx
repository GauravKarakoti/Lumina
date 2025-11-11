import { Card, CardContent } from "@/components/ui/card";

const NotebookCard = () => {
  return (
    <Card className="cosmic-card border-cosmic-accent/20 overflow-hidden">
      <CardContent className="p-0">
        <div className="relative h-48 bg-gradient-to-br from-teal-400 via-emerald-400 to-lime-300 p-6 flex items-center justify-center">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-transparent"></div>
          <div className="relative text-center space-y-2">
            <div className="text-6xl mb-4">📚</div>
            <div className="space-y-1 text-sm text-gray-800 font-medium">
              <p>Bioteknologian ja</p>
              <p>geenitekniikan</p>
              <p>perusteet</p>
              <p className="text-xs mt-2">Kirjoita tähän muistiinpanosi</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default NotebookCard;
