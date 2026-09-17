"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { Document, Page, pdfjs } from "react-pdf";
import { dsFonts } from "@/lib/designSystem";
import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";

pdfjs.GlobalWorkerOptions.workerSrc = "/pdf.worker.min.mjs";

const PDF_SRC = "/design/yenyi-huang-design-portfolio.pdf";

export default function PdfPortfolioViewer({
  startPage = 1,
  endPage = startPage,
  paperWhite = false,
}) {
  const [numPages, setNumPages] = useState(0);
  const [width, setWidth] = useState(800);
  const from = Math.max(1, startPage);
  const to = Math.max(from, endPage);
  const lastPage = numPages > 0 ? Math.min(to, numPages) : to;
  const frameRef = useRef(null);

  useEffect(() => {
    pdfjs.GlobalWorkerOptions.workerSrc = `${window.location.origin}/pdf.worker.min.mjs`;
    const node = frameRef.current;
    if (!node) return undefined;

    const updateWidth = () => {
      const next = Math.floor(node.clientWidth);
      if (next > 0) setWidth(next);
    };

    updateWidth();
    const observer = new ResizeObserver(updateWidth);
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="mx-auto w-full max-w-[1600px] px-6 pb-24 pt-28 md:px-10">
        <Link
          href="/design"
          className={`${dsFonts.body.className} mb-8 inline-block text-sm text-white/70 transition-colors hover:text-white`}
        >
          ← Design
        </Link>
        <div ref={frameRef} className="w-full">
          <Document
            file={PDF_SRC}
            loading={
              <p className={`${dsFonts.body.className} text-white/60`}>
                Loading portfolio…
              </p>
            }
            error={
              <p className={`${dsFonts.body.className} text-red-300`}>
                Could not load the portfolio PDF.
              </p>
            }
            onLoadSuccess={({ numPages: nextNumPages }) => {
              setNumPages(nextNumPages);
            }}
          >
            {numPages > 0
              ? Array.from({ length: Math.max(0, lastPage - from + 1) }, (_, index) => {
                  const pageNumber = from + index;
                  return (
                    <div
                      key={pageNumber}
                      id={`pdf-page-${pageNumber}`}
                      className={`react-pdf-page-frame mb-6 w-fit max-w-full scroll-mt-28 overflow-hidden ${
                        paperWhite ? "" : "border border-white/20"
                      }`}
                    >
                      <Page
                        pageNumber={pageNumber}
                        width={width}
                        canvasBackground={paperWhite ? "#ffffff" : "transparent"}
                        renderTextLayer
                        renderAnnotationLayer
                      />
                    </div>
                  );
                })
              : null}
          </Document>
        </div>
      </div>
    </div>
  );
}
