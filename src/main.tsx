import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
// import App from './App.tsx'
// Uncomment one of the lines below to switch designs:
// import App from './AutumnProposal.tsx'  // Brownish-red autumn theme
import App from "./JackVersion.tsx"; // Elegant purple/pink theme

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
