import React, { useEffect, useState } from "react";
import { ChevronUp } from "lucide-react";

export function ScrollToTopButton() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handler = () => setVisible(window.scrollY > 320);
    handler();
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  if (!visible) return null;

  return (
    <button
      aria-label="Вернуться наверх"
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      className="fixed bottom-6 right-6 z-40 flex h-12 w-12 items-center justify-center rounded-full bg-[#1055b2] text-white shadow-lg transition hover:bg-[#003b8a] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#1055b2]"
    >
      <ChevronUp className="w-6 h-6" />
    </button>
  );
}

