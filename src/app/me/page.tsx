import type { Metadata } from "next";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Private Page",
  robots: { index: false, follow: false },
};

export default async function MePage() {
  const cookieStore = await cookies();
  const friendCookie = cookieStore.get('friendsorfamily');

  if (!friendCookie) {
    redirect("/");
  }

  return (
    <main className="mx-auto w-full max-w-4xl px-4 pb-16 pt-14">
      <div className="card-surface p-6 text-center">
        <h1 className="text-2xl font-semibold text-slate-100">Welcome to my page!</h1>
      </div>
    </main>
  );
}
