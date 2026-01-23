"use client";

import { useRef } from "react";
import ContactSection from "@/components/ContactSection";

export default function ContactPage() {
  const contactRef = useRef<HTMLDivElement>(null!);

  return (
    <main className="min-h-[70vh]">
      <ContactSection contactRef={contactRef} />
    </main>
  );
}
