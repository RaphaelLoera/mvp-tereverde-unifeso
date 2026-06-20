import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";

import { RouterProvider } from "react-router";
import { Router } from "./Router.tsx";

// Remover badge do Vite em modo dev (botão roxo / raio)
if (import.meta.env.DEV) {
  const removeViteBadge = () => {
    try {
      const selectors = [
        'div[id^="vite"]',
        'div[class*="vite"]',
        'iframe[src*="vite"]',
        "[data-vite]",
      ];

      const elems = selectors
        .map((s) => Array.from(document.querySelectorAll(s)))
        .flat();

      // também tente remover elementos que contenham o texto "Vite"
      const textElems = Array.from(
        document.querySelectorAll("div,span"),
      ).filter((el) => (el.textContent || "").trim().includes("Vite"));

      const all = Array.from(new Set([...elems, ...textElems]));
      all.forEach((el) => el.remove());
    } catch {
      // não bloquear a aplicação se falhar
    }
  };

  // tentar remover logo após carregamento e algumas vezes depois (injection async)
  window.addEventListener("load", () => setTimeout(removeViteBadge, 300));
  setTimeout(removeViteBadge, 500);
  setTimeout(removeViteBadge, 1500);
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={Router} />
  </StrictMode>,
);
