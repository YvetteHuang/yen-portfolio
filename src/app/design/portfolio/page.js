import PdfPortfolioViewerClient from "./PdfPortfolioViewerClient";

export const metadata = {
  title: "Design Portfolio | Yen Huang",
  description: "Yen Huang design portfolio PDF.",
};

function parsePage(value, fallback) {
  const parsed = Number.parseInt(String(value ?? ""), 10);
  return Number.isFinite(parsed) && parsed > 0 ? parsed : fallback;
}

export default async function DesignPortfolioPage({ searchParams }) {
  const params = await searchParams;
  const from = parsePage(params.from ?? params.page, 1);
  const to = parsePage(params.to, from);
  const paperWhite =
    String(params.paper ?? "") === "white" || (from === 4 && Math.max(from, to) === 9);

  return (
    <PdfPortfolioViewerClient
      startPage={from}
      endPage={Math.max(from, to)}
      paperWhite={paperWhite}
    />
  );
}
