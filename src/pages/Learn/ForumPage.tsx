import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { MessageCircle } from "lucide-react";
import axios from "axios";

export default function ForumPage() {
  const [threads, setThreads] = useState<any[]>([]);

  useEffect(() => {
    axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/forum/threads`, {
       headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
    }).then(res => setThreads(res.data));
  }, []);

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Community Forum</h1>
        <Button className="bg-cosmic-glow hover:bg-cosmic-mid text-purple-700">New Discussion</Button>
      </div>

      <div className="grid gap-4">
        {threads.map((thread) => (
          <Card key={thread.id} className="hover:border-cosmic-glow/50 transition-colors cursor-pointer">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-lg font-semibold">{thread.title}</CardTitle>
              <div className="text-xs text-muted-foreground">
                {new Date(thread.updatedAt).toLocaleDateString()}
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground line-clamp-2">{thread.body}</p>
              <div className="mt-4 flex items-center gap-2 text-sm text-cosmic-glow">
                <MessageCircle className="w-4 h-4" />
                <span>{thread.posts?.length || 0} replies</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}