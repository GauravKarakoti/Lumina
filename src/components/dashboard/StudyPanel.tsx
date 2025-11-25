import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { useQuery } from "@tanstack/react-query"
import axios from "axios"
import { Separator } from "@/components/ui/separator"
import { useState, useEffect, useRef } from "react" // Added useEffect and useRef
import pdfWorker from "pdfjs-dist/build/pdf.worker?url";
import { Document, Page, pdfjs } from "react-pdf"
import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";

pdfjs.GlobalWorkerOptions.workerSrc = pdfWorker;

type Note = {
  id: number
  title: string
  pdfUrl: string
}

const fetchNotes = async (topicId: string): Promise<Note[]> => {
  const { data } = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/notes/${topicId}`)
  return data
}

interface StudyPanelProps {
  topicId: string | null
}

// Updated PdfViewer with responsive width logic
const PdfViewer = ({ title, url }: { title: string; url: string }) => {
  const [numPages, setNumPages] = useState<number | null>(null)
  const [isError, setIsError] = useState(false)
  
  // New: State for responsive width
  const [containerWidth, setContainerWidth] = useState<number>(0)
  const containerRef = useRef<HTMLDivElement>(null)

  function onDocumentLoadSuccess({ numPages }: { numPages: number }) {
    setNumPages(numPages)
    setIsError(false)
  }

  function onDocumentLoadError() {
    console.error(`Failed to load PDF: ${title}`)
    setIsError(true)
  }

  // New: Effect to update width on resize
  useEffect(() => {
    const updateWidth = () => {
      if (containerRef.current) {
        // Subtracting a small amount (e.g., 32px for padding) ensures it fits comfortably
        setContainerWidth(containerRef.current.offsetWidth) 
      }
    }

    updateWidth()
    window.addEventListener('resize', updateWidth)
    
    return () => window.removeEventListener('resize', updateWidth)
  }, [])

  const fullPdfUrl = `${import.meta.env.VITE_BACKEND_URL}${url}`

  return (
    <article className="prose dark:prose-invert max-w-none">
      <h2>{title}</h2>
      <Separator />
      {isError ? (
        <p className="text-red-500">Failed to load this PDF.</p>
      ) : (
        // Added ref to this container to measure width
        <div 
          ref={containerRef} 
          onContextMenu={(e) => e.preventDefault()} 
          className="overflow-x-hidden" // Ensure no horizontal scrollbar
        >
          <Document
            file={fullPdfUrl}
            onLoadSuccess={onDocumentLoadSuccess}
            onLoadError={onDocumentLoadError}
            renderMode="canvas"
            loading={<Skeleton className="h-48 w-full" />}
          >
            {Array.from(new Array(numPages), (el, index) => (
              <Page
                key={`page_${index + 1}`}
                pageNumber={index + 1}
                renderTextLayer={false}
                renderAnnotationLayer={false}
                // Pass the calculated width here
                width={containerWidth > 0 ? containerWidth : undefined}
              />
            ))}
          </Document>
        </div>
      )}
    </article>
  )
}

const StudyPanel = ({ topicId }: StudyPanelProps) => {
  const {
    data: notes,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["notes", topicId],
    queryFn: () => fetchNotes(topicId!),
    enabled: !!topicId,
  })

  return (
    <Card className="cosmic-card h-full sticky top-20">
      <CardHeader>
        <CardTitle>Study Notes</CardTitle>
      </CardHeader>
      <CardContent className="h-[70vh] overflow-y-auto">
        {!topicId ? (
          <p className="text-muted-foreground">
            Select a topic to start studying.
          </p>
        ) : isLoading ? (
          <div className="space-y-4">
            <Skeleton className="h-6 w-3/4" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-5/6" />
          </div>
        ) : isError ? (
          <p>Error loading notes.</p>
        ) : notes && notes.length > 0 ? (
          <div className="space-y-6">
            {notes.map((note) => (
              <PdfViewer
                key={note.id}
                title={note.title}
                url={note.pdfUrl}
              />
            ))}
          </div>
        ) : (
          <p className="text-muted-foreground">
            No notes have been uploaded for this topic yet.
          </p>
        )}
      </CardContent>
    </Card>
  )
}

export default StudyPanel