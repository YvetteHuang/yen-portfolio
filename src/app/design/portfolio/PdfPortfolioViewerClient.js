"use client";

import dynamic from "next/dynamic";

const PdfPortfolioViewer = dynamic(() => import("./PdfPortfolioViewer"), {
  ssr: false,
  loading: () => (
    <div className="min-h-screen bg-black px-6 pt-28 text-white/60">
      Loading portfolio…
    </div>
  ),
});

export default function PdfPortfolioViewerClient({ startPage, endPage, paperWhite }) {
  return (
    <PdfPortfolioViewer
      startPage={startPage}
      endPage={endPage}
      paperWhite={paperWhite}
    />
  );
}
