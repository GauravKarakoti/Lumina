import { Component, ErrorInfo, ReactNode } from "react";
import { Button } from "@/components/ui/button";
import { RefreshCcw } from "lucide-react";

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
}

class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
  };

  public static getDerivedStateFromError(_: Error): State {
    return { hasError: true };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Uncaught error:", error, errorInfo);

    const errorMessage = error.message.toLowerCase();

    // Auto-reload logic for ChunkLoadErrors (updates or network hiccups)
    // We check for various browser-specific error messages indicating a missing file
    if (
      errorMessage.includes("loading chunk") ||
      errorMessage.includes("importing a module script failed") ||
      errorMessage.includes("failed to fetch dynamically imported module") ||
      errorMessage.includes("error loading dynamically imported module")
    ) {
       // Ideally, we want to reload the page to fetch the new fresh chunks
       window.location.reload();
    }
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div className="flex h-screen w-full flex-col items-center justify-center gap-4 bg-background p-4 text-center">
          <h2 className="text-2xl font-bold text-foreground">Something went wrong</h2>
          <p className="text-muted-foreground">
            We couldn't load the application correctly. Please try reloading.
          </p>
          <Button 
            onClick={() => window.location.reload()} 
            variant="default"
            className="gap-2"
          >
            <RefreshCcw className="h-4 w-4" />
            Reload Application
          </Button>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;