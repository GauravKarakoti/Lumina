import { useEffect, useState } from "react";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { Check, Star, Lock, Loader2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

export default function LearnMap() {
  const [units, setUnits] = useState<any[]>([]);
  const navigate = useNavigate();

  // 1. Fetch User Progress to get Active Course
  const { data: progress, isLoading: loadingProgress } = useQuery({
    queryKey: ["learn-progress"],
    queryFn: async () => {
      const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/learn/progress`, {
         headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      return res.data;
    }
  });

  // 2. Effect: Handle Redirect or Fetch Units
  useEffect(() => {
    if (!loadingProgress) {
      if (!progress?.activeCourseId) {
        // Redirect if no course selected
        navigate("/learn/courses");
      } else {
        // Fetch units for the active course
        axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/learn/courses/${progress.activeCourseId}/units`, {
           headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        }).then(res => setUnits(res.data));
      }
    }
  }, [progress, loadingProgress, navigate]);

  if (loadingProgress) {
    return <div className="flex justify-center py-20"><Loader2 className="animate-spin w-10 h-10 text-cosmic-glow" /></div>;
  }

  if (!progress?.activeCourseId) return null;

  return (
    <div className="max-w-2xl mx-auto space-y-12 pb-20">
      {units.map((unit) => (
        <div key={unit.id} className="space-y-6">
          <div className="bg-cosmic-deep/50 p-6 rounded-2xl border border-cosmic-glow/20">
            <h2 className="text-2xl font-bold text-white">{unit.title}</h2>
            <p className="text-muted-foreground">{unit.description}</p>
          </div>
          
          <div className="flex flex-col items-center gap-4 relative">
             {/* Simple Lesson Path Visualization */}
             {unit.lessons.map((lesson: any, index: number) => {
               const isLocked = !lesson.completed && index > 0 && !unit.lessons[index-1].completed;
               return (
                 <Button
                   key={lesson.id}
                   variant={lesson.completed ? "default" : "secondary"}
                   className={`h-16 w-16 rounded-full border-b-4 active:border-b-0 transition-all ${
                     lesson.completed ? "bg-green-500 hover:bg-green-600 border-green-700" : 
                     isLocked ? "bg-gray-700 border-gray-800 opacity-50" : 
                     "bg-cosmic-glow hover:bg-cosmic-mid border-cosmic-deep"
                   }`}
                   disabled={isLocked}
                   onClick={() => navigate(`/learn/lesson/${lesson.id}`)}
                 >
                   {lesson.completed ? <Check /> : isLocked ? <Lock /> : <Star fill="white" />}
                 </Button>
               );
             })}
          </div>
        </div>
      ))}
    </div>
  );
}