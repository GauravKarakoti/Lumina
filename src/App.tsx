import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Dashboard from "./pages/Dashboard";
import NotFound from "./pages/NotFound";
import SelectCourse from "./pages/SelectCourse"; // Import new page
import SelectBranch from "./pages/SelectBranch";
import SelectSemester from "./pages/SelectSemester";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/select-course" element={<SelectCourse />} />
          <Route path="/select-branch/:courseId" element={<SelectBranch />} />
          <Route
            path="/select-semester/:courseId/:branchId"
            element={<SelectSemester />}
          />
          <Route
            path="/dashboard/:courseId/:branchId/:semesterId"
            element={<Dashboard />}
          />
          {/* Keep the old /dashboard route to redirect to the new flow */}
          <Route path="/dashboard" element={<SelectCourse />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;