import { Card, CardContent } from "@/components/ui/card";

const NotebookCard = () => {
  return (
    <Card className="cosmic-card border-cosmic-accent/20 overflow-hidden">
      <CardContent className="p-0">
        <div className="relative h-48 bg-gradient-to-br from-teal-400 via-emerald-400 to-lime-300 p-6 flex items-center justify-center">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-transparent"></div>
          <div className="relative text-center space-y-2">
            <div className="text-6xl mb-4">📚</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default NotebookCard;
