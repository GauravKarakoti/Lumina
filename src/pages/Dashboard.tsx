import Header from "@/components/Header";
import Sidebar from "@/components/dashboard/Sidebar";
import NotebookCard from "@/components/dashboard/NotebookCard";
import TopicList from "@/components/dashboard/TopicList";
import { useParams } from "react-router-dom";
import { useState } from "react";
import { Card } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import NoteViewer from "@/components/dashboard/NoteViewer"; // Import the new component

const Dashboard = () => {
  const { courseId, branchId, semesterId } = useParams<{
    courseId: string;
    branchId: string;
    semesterId: string;
  }>();
  const [selectedSubjectId, setSelectedSubjectId] = useState<string | null>(null);
  const [selectedTopicId, setSelectedTopicId] = useState<string | null>(null);
  const [isNoteViewerOpen, setIsNoteViewerOpen] = useState(false); // State for dialog

  if (!courseId || !branchId || !semesterId) {
    return (
      <div className="min-h-screen relative pt-16">
        <Header />
        <div className="container mx-auto px-4 py-8">
          <Card className="cosmic-card p-8 text-center">
            <p>Invalid URL. Please select a course, branch, and semester.</p>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen relative pt-20">
      <Header />
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Sidebar */}
          <div className="lg:col-span-3">
            <Sidebar
              branchId={branchId}
              semesterId={semesterId}
              activeSubjectId={selectedSubjectId}
              onSubjectSelect={(id) => {
                setSelectedSubjectId(id);
                setSelectedTopicId(null); // Reset topic
                setIsNoteViewerOpen(false); // Close dialog if subject changes
              }}
            />
          </div>

          {/* Main Content - now wider */}
          <div className="lg:col-span-9 space-y-6">
            <NotebookCard
              courseId={courseId}
              branchId={branchId}
              semesterId={semesterId}
            />
            <TopicList
              subjectId={selectedSubjectId}
              activeTopicId={selectedTopicId}
              onTopicSelect={(id) => {
                setSelectedTopicId(id);
                setIsNoteViewerOpen(true); // Open the dialog
              }}
            />
          </div>

          {/* Right Panel - Removed */}
        </div>

        {/* --- PDF Viewer Dialog --- */}
        <Dialog open={isNoteViewerOpen} onOpenChange={setIsNoteViewerOpen}>
          <DialogContent
            className="max-w-4xl h-[90vh] flex flex-col"
            onPointerDownOutside={(e) => {
              e.preventDefault(); // Prevent closing on outside click
            }}
          >
            <DialogHeader>
              <DialogTitle>Study Notes</DialogTitle>
              {/* The "X" close button is part of DialogContent */}
            </DialogHeader>
            <div className="flex-1 overflow-y-auto pr-4">
              {/* Render NoteViewer only when a topic is selected */}
              {selectedTopicId && <NoteViewer topicId={selectedTopicId} />}
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default Dashboard;