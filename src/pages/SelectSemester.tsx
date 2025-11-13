import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link, useParams } from "react-router-dom";
import { getSemesters, getBranch } from "@/lib/data";
import Header from "@/components/Header";
import { ChevronRight } from "lucide-react";

const SelectSemester = () => {
  const { courseId, branchId } = useParams<{ courseId: string; branchId: string }>();
  const branch = getBranch(branchId!);
  const allSemesters = getSemesters();

  // Filter semesters based on the branchId
  const semesters = allSemesters.filter(semester => {
    if (branchId === "as") {
      // For Applied Science, only show Sem 1 and 2
      return semester.id === "sem1" || semester.id === "sem2";
    } else {
      // For all other branches, show Sem 3-7
      return !["sem1", "sem2"].includes(semester.id);
    }
  });

  return (
    <div className="min-h-screen relative pt-16">
      <Header />
      <div className="container mx-auto px-4 py-8 max-w-2xl">
        <Card className="cosmic-card border-cosmic-accent/20">
          <CardHeader>
            <CardTitle className="text-2xl text-cosmic-glow text-center">
              {branch?.name || "Select Semester"}
            </CardTitle>
            <p className="text-center text-muted-foreground">
              Choose Your Semester
            </p>
          </CardHeader>
          <CardContent className="space-y-4">
            {semesters.map((semester) => (
              <Button
                key={semester.id}
                asChild
                variant="outline"
                className="w-full justify-between h-14 text-lg hover-glow"
                size="lg"
              >
                <Link to={`/dashboard/${courseId}/${branchId}/${semester.id}`}>
                  {semester.name}
                  <ChevronRight className="w-5 h-5" />
                </Link>
              </Button>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default SelectSemester;