import Header from "@/components/Header";
import Sidebar from "@/components/dashboard/Sidebar";
import NotebookCard from "@/components/dashboard/NotebookCard";
import TopicList from "@/components/dashboard/TopicList";
import StudyPanel from "@/components/dashboard/StudyPanel";

const Dashboard = () => {
  return (
    <div className="min-h-screen relative pt-16">
      <Header />
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Sidebar */}
          <div className="lg:col-span-3">
            <Sidebar />
          </div>

          {/* Main Content */}
          <div className="lg:col-span-6 space-y-6">
            <NotebookCard />
            <TopicList />
          </div>

          {/* Right Panel */}
          <div className="lg:col-span-3">
            <StudyPanel />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
