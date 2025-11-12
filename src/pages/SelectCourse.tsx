import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { getCourses } from "@/lib/data";
import Header from "@/components/Header";
import { ChevronRight } from "lucide-react";

const SelectCourse = () => {
  const courses = getCourses();

  return (
    <div className="min-h-screen relative pt-16">
      <Header />
      <div className="container mx-auto px-4 py-8 max-w-2xl">
        <Card className="cosmic-card border-cosmic-accent/20">
          <CardHeader>
            <CardTitle className="text-2xl text-cosmic-glow text-center">
              Choose Your Course
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {courses.map((course) => (
              <Button
                key={course.id}
                asChild
                variant="outline"
                className="w-full justify-between h-14 text-lg hover-glow"
                size="lg"
              >
                <Link to={`/select-branch/${course.id}`}>
                  {course.name}
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

export default SelectCourse;