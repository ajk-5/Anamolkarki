import InnerPage, { metadata } from "../api/games-tools/src/app/tools/page";
import PageShell from "@/components/PageShell";

export { metadata };

export default function ToolsPage() {
  return (
    <PageShell>
      <InnerPage />
    </PageShell>
  );
}
