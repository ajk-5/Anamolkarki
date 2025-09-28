import InnerPage, { metadata } from "../api/games-tools/src/app/games/page";
import PageShell from "@/components/PageShell";

export { metadata };

export default function GamesPage() {
  return (
    <PageShell>
      <InnerPage />
    </PageShell>
  );
}
