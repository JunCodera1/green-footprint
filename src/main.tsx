import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import GreenFootprintLanding from "./pages/GreenFootprintLanding";
import Blog from "./pages/Blog";
import Community from "./pages/Community";
import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignUpPage";
import ForgotPassword from "./pages/ForgotPassword";
import AIAnalytic from "./pages/AIAnalytic";
import PersonalReports from "./pages/PersonalReports";
import CarbonFootprintCalculator from "./pages/CarbonFootprintCalculator";
import APIDocumentation from "./pages/APIDocumentation";

import { DarkModeProvider } from "./contexts/DarkModeContext";
import MobileAppPreview from "./pages/MobileAppPreview";
import EcoScene3D from "./pages/EcoScene3D";
import { SmartHome } from "./pages/SmartHome";
import { CarbonOffset } from "./pages/CarbonOffset";
import { SocialPage } from "./pages/Social";
import { Achievements } from "./pages/Achievements";
import { Subscription } from "./pages/Subscription";
import { EducationPage } from "./pages/Education";
import CarbonTracking from "./pages/CarbonTracking";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <DarkModeProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<GreenFootprintLanding />} />
          <Route path="/carbon-footprint-calculator" element={<CarbonFootprintCalculator />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/community" element={<Community />} />
          <Route path="/api" element={<APIDocumentation />} />
          <Route path="/documentation" element={<APIDocumentation />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/personal-reports" element={<PersonalReports />} />
          <Route path="/ai-analytic" element={<AIAnalytic />} />
          <Route path="/app-preview" element={<MobileAppPreview />} />
          <Route path="/eco-scene" element={<EcoScene3D />} />
          <Route path="/smart-home" element={<SmartHome />} />
          <Route path="/carbon-offset" element={<CarbonOffset />} />
          <Route path="/social" element={<SocialPage />} />
          <Route path="/achievements" element={<Achievements />} />
          <Route path="/subscription" element={<Subscription />} />
          <Route path="/education" element={<EducationPage />} />
          <Route path="/carbon-tracking" element={<CarbonTracking />} />


        </Routes>
      </BrowserRouter>
    </DarkModeProvider>
  </StrictMode>
);
