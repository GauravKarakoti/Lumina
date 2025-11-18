import { Skeleton } from "@/components/ui/skeleton"
import { useQuery } from "@tanstack/react-query"
import axios from "axios"
import { Separator } from "@/components/ui/separator"
import { useState, useEffect, useRef } from "react" 
import pdfWorker from "pdfjs-dist/build/pdf.worker?url";
import { Document, Page, pdfjs } from "react-pdf"
import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";

pdfjs.GlobalWorkerOptions.workerSrc = pdfWorker;

type Note = {
  id: number
  title: string
  pdfUrl: string // This is the B2 key, not the full URL
}

const fetchNotes = async (topicId: string): Promise<Note[]> => {
  // This existing route returns notes with the B2 key in pdfUrl
  const { data } = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/notes/${topicId}`)
  console.log(data)
  return data
}

interface NoteViewerProps {
  topicId: string | null
}

// --- UPDATED PDFVIEWER COMPONENT ---
interface PdfViewerComponentProps {
    id: number; // Pass the note ID for the signed URL API call
    title: string;
    pdfKey: string; // The B2 key (note.pdfUrl)
}

// Renamed 'url' prop to 'pdfKey' for clarity
const PdfViewer = ({ id, title, pdfKey }: PdfViewerComponentProps) => {
  const [numPages, setNumPages] = useState<number | null>(null)
  const [isError, setIsError] = useState(false)
  const [containerWidth, setContainerWidth] = useState<number>(0)
  const containerRef = useRef<HTMLDivElement>(null)

  // NEW: State to hold the temporary, secure URL fetched from the server
  const [signedPdfUrl, setSignedPdfUrl] = useState<string | null>(null);
  const [isUrlLoading, setIsUrlLoading] = useState(true);


  function onDocumentLoadSuccess({ numPages }: { numPages: number }) {
    setNumPages(numPages)
    setIsError(false)
  }

  function onDocumentLoadError() {
    console.error(`Failed to load PDF: ${title}`)
    setIsError(true)
  }

  // NEW EFFECT: Fetch the secure, time-limited URL from the server
  useEffect(() => {
    if (!id || !pdfKey) return;
    
    const fetchSignedUrl = async () => {
        setIsUrlLoading(true);
        setSignedPdfUrl(null); // Clear previous state

        try {
            // Call the new backend endpoint: /api/content/note/signed-url/:noteId
            const { data } = await axios.get<{ signedUrl: string }>(
                `${import.meta.env.VITE_BACKEND_URL}/api/content/note/signed-url/${id}`
            );
            
            setSignedPdfUrl(data.signedUrl);
            setIsError(false);
        } catch (error) {
            console.error("Error fetching signed URL:", error);
            setIsError(true);
        } finally {
            setIsUrlLoading(false);
        }
    };

    fetchSignedUrl();
  }, [id, pdfKey]); // Dependency on ID ensures re-fetch when note changes


  // Effect to handle resizing (keep original resize logic)
  useEffect(() => {
    const updateWidth = () => {
      if (containerRef.current) {
        setContainerWidth(containerRef.current.offsetWidth)
      }
    }

    updateWidth()
    
    window.addEventListener('resize', updateWidth)
    return () => window.removeEventListener('resize', updateWidth)
  }, [])

  // 1. Handle loading state for the URL fetch
  if (isUrlLoading) {
    return <Skeleton className="h-48 w-full" />;
  }
  
  // 2. Handle cases where URL fetch failed or no URL exists
  if (!signedPdfUrl) {
    return (
        <article className="prose dark:prose-invert max-w-none">
             <h2>{title}</h2>
             <Separator />
             <p className="text-red-500">Failed to retrieve PDF link securely. (Error: {isError ? 'API error' : 'No link found'})</p>
        </article>
    )
  }

  return (
    <article className="prose dark:prose-invert max-w-none" ref={containerRef}>
      <h2>{title}</h2>
      <Separator />
      {isError ? (
        <p className="text-red-500">Failed to load this PDF.</p>
      ) : (
        <div onContextMenu={(e) => e.preventDefault()}>
          {/* 3. Pass the fetched secure URL to the Document component */}
          <Document
            file={signedPdfUrl} 
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
                width={containerWidth > 0 ? containerWidth : undefined}
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
    enabled: !!topicId,
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
            id={note.id}
            title={note.title}
            pdfKey={note.pdfUrl}
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