import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import GreenFootprintLanding from "./pages/GreenFootprintLanding";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import CarbonFootprintCalculator from "./pages/CarbonFootprintCalculator";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<GreenFootprintLanding />} />
        <Route
          path="/carbon-footprint-calculator"
          element={<CarbonFootprintCalculator />}
        />
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
