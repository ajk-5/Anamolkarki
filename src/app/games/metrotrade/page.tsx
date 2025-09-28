import InnerPage, { metadata } from "../../api/games-tools/src/app/games/metrotrade/page";
import PageShell from "@/components/PageShell";

export { metadata };

export default function Page() {
  return (
    <PageShell>
      <InnerPage />
    </PageShell>
  );
}
