"use client";

import { useEffect, useRef, useState } from "react";
import ContactSection from "@/components/ContactSection";

export default function ContactPage() {
  const contactRef = useRef<HTMLDivElement>(null!);
  const [hueRotation, setHueRotation] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setHueRotation((h) => (h + 1) % 360), 100);
    return () => clearInterval(id);
  }, []);

  return (
    <main className="min-h-[70vh]">
      <ContactSection hueRotation={hueRotation} contactRef={contactRef} />
    </main>
  );
}
