import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import GreenFootprintLanding from "./green-footprint-landing";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <GreenFootprintLanding />
  </StrictMode>
);
