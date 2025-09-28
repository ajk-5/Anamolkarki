import InnerPage, { metadata } from "../../api/games-tools/src/app/tools/qr-code-generator/page";
import PageShell from "@/components/PageShell";

export { metadata };

export default function Page() {
  return (
    <PageShell>
      <InnerPage />
    </PageShell>
  );
}
