import CaseStudyPage from "@/components/caseStudy/CaseStudyPage";
import { loadCaseStudy } from "@/lib/caseStudyContent";

const slug = "gizmu";

export function generateMetadata() {
  const { frontmatter } = loadCaseStudy(slug);
  return {
    title: `${frontmatter.title} | Yen Huang`,
    description: frontmatter.description ?? `${frontmatter.title} case study by Yen Huang.`,
  };
}

export default function GizmuPage() {
  return <CaseStudyPage study={loadCaseStudy(slug)} />;
}
