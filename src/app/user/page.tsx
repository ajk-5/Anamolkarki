import type { Metadata } from "next";
import LoginForm from "@/components/LoginForm";
import RegistrationForm from "@/components/RegistrationForm";

export const metadata: Metadata = {
  title: "User Access",
  description: "Login or register.",
  robots: { index: false, follow: false },
};

export default function User() {
  return (
    <main className="mx-auto w-full max-w-6xl px-4 pb-16 pt-14">
      <div className="grid gap-6 md:grid-cols-2">
        <RegistrationForm />
        <LoginForm />
      </div>
    </main>
  );
}
