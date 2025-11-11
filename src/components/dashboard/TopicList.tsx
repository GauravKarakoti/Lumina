import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText, BookOpen, Sparkles } from "lucide-react";

const topics = [
  { id: 1, name: "Cell Structure", icon: FileText },
  { id: 2, name: "Evolution", icon: BookOpen },
  { id: 3, name: "Ecology", icon: Sparkles },
];

const TopicList = () => {
  return (
    <Card className="cosmic-card border-cosmic-accent/20">
      <CardHeader>
        <CardTitle className="text-lg text-cosmic-glow">DNA & RNA</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {topics.map((topic) => {
          const Icon = topic.icon;
          return (
            <button
              key={topic.id}
              className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-muted-foreground hover:text-foreground hover-glow transition-all text-left"
            >
              <Icon className="w-5 h-5" />
              <span className="font-medium">{topic.name}</span>
            </button>
          );
        })}
      </CardContent>
    </Card>
  );
};

export default TopicList;
