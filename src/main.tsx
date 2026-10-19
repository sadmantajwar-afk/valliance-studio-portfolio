import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App";

// Safely unregister any legacy service workers once without blocking initial hydration
if (typeof window !== "undefined") {
  try {
    if (!sessionStorage.getItem('sw_purged')) {
      sessionStorage.setItem('sw_purged', 'true');
      if ('serviceWorker' in navigator) {
        navigator.serviceWorker.getRegistrations().then((registrations) => {
          for (const registration of registrations) {
            registration.unregister();
          }
        });
      }
      if ('caches' in window) {
        caches.keys().then((keys) => {
          keys.forEach((key) => caches.delete(key));
        });
      }
    }
  } catch {
    // Ignore storage restrictions
  }
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>
);

