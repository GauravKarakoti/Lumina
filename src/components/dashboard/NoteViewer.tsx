import { Skeleton } from "@/components/ui/skeleton"
import { useQuery } from "@tanstack/react-query"
import axios from "axios"
import { Separator } from "@/components/ui/separator"
import { useState } from "react"
import pdfWorker from "pdfjs-dist/build/pdf.worker?url";
import { Document, Page, pdfjs } from "react-pdf"
import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";

pdfjs.GlobalWorkerOptions.workerSrc = pdfWorker;

// --- Updated Note type ---
type Note = {
  id: number
  title: string
  pdfUrl: string // The new field
}

const fetchNotes = async (topicId: string): Promise<Note[]> => {
  const { data } = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/notes/${topicId}`)
  return data
}

interface NoteViewerProps {
  topicId: string | null
}

// +++ Helper component for a single PDF viewer +++
const PdfViewer = ({ title, url }: { title: string; url: string }) => {
  const [numPages, setNumPages] = useState<number | null>(null)
  const [isError, setIsError] = useState(false)

  function onDocumentLoadSuccess({ numPages }: { numPages: number }) {
    setNumPages(numPages)
    setIsError(false)
  }

  function onDocumentLoadError() {
    console.error(`Failed to load PDF: ${title}`)
    setIsError(true)
  }

  // Construct the full URL to the PDF file on the backend
  const fullPdfUrl = `${import.meta.env.VITE_BACKEND_URL}${url}`
  console.log("Loading PDF from URL:", fullPdfUrl)

  return (
    <article className="prose dark:prose-invert max-w-none">
      <h2>{title}</h2>
      <Separator />
      {isError ? (
        <p className="text-red-500">Failed to load this PDF.</p>
      ) : (
        // This div disables right-click to discourage downloading
        <div onContextMenu={(e) => e.preventDefault()}>
          <Document
            file={fullPdfUrl}
            onLoadSuccess={onDocumentLoadSuccess}
            onLoadError={onDocumentLoadError}
            renderMode="canvas"
            loading={<Skeleton className="h-48 w-full" />}
          >
            {/* Render all pages of the PDF */}
            {Array.from(new Array(numPages), (el, index) => (
              <Page
                key={`page_${index + 1}`}
                pageNumber={index + 1}
                renderTextLayer={false}
                renderAnnotationLayer={false}
              />
            ))}
          </Document>
        </div>
      )}
    </article>
  )
}

const NoteViewer = ({ topicId }: NoteViewerProps) => {
  const {
    data: notes,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["notes", topicId],
    queryFn: () => fetchNotes(topicId!),
    enabled: !!topicId, // Only run if a topic is selected
  })

  if (!topicId) {
    return <p className="text-muted-foreground">Please select a topic.</p>
  }

  if (isLoading) {
    return (
      <div className="space-y-4">
        <Skeleton className="h-6 w-3/4" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-5/6" />
      </div>
    )
  }

  if (isError) {
    return <p>Error loading notes.</p>
  }

  if (notes && notes.length > 0) {
    return (
      <div className="space-y-6">
        {notes.map((note) => (
          <PdfViewer
            key={note.id}
            title={note.title}
            url={note.pdfUrl}
          />
        ))}
      </div>
    )
  }

  return (
    <p className="text-muted-foreground">
      No notes have been uploaded for this topic yet.
    </p>
  )
}

export default NoteViewer