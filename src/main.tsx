import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import GreenFootprintLanding from "./pages/GreenFootprintLanding";
import Blog from "./pages/Blog";
import Community from "./pages/Community";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import CarbonFootprintCalculator from "./pages/CarbonFootprintCalculator";
import APIDocumentation from "./pages/APIDocumentation";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<GreenFootprintLanding />} />
        <Route
          path="/carbon-footprint-calculator"
          element={<CarbonFootprintCalculator />}
        />
        <Route path="/blog" element={<Blog />} />
        <Route path="/community" element={<Community />} />
        <Route path="/api" element={<APIDocumentation />} />
        <Route path="/documentation" element={<APIDocumentation />} />

      </Routes>
    </BrowserRouter>
  </StrictMode>
);
