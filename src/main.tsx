import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import React, { lazy, Suspense } from "react";

import GreenFootprintLanding from "./pages/Eco/GreenFootprintLanding";
import Blog from "./pages/Blog/Blog";
import Community from "./pages/Support/Community";
import AIAnalytic from "./pages/API/AIAnalytic";
import PersonalReports from "./pages/Support/PersonalReports";
import CarbonFootprintCalculator from "./pages/Carbon/CarbonFootprintCalculator";
import { DarkModeProvider } from "./contexts/DarkModeContext";
import MobileAppPreview from "./pages/Info/MobileAppPreview";
import EcoScene3D from "./pages/Eco/EcoScene3D";
import { SmartHome } from "./pages/Info/SmartHome";
import { CarbonOffset } from "./pages/Carbon/CarbonOffset";
import { SocialPage } from "./pages/Blog/Social";
import { Achievements } from "./pages/Info/Achievements";
import { Subscription } from "./pages/Info/Subscription";
import { EducationPage } from "./pages/Eco/Education";
import CarbonTracking from "./pages/Carbon/CarbonTracking";
import Contact from "./pages/Info/Contact";
import HelpCenter from "./pages/Support/HelpCenter";
import Privacy from "./pages/Support/Privacy";
import { Marketplace } from "./pages/Info/Marketplace";

// Lazy loaded components
const BlogPostDetail = lazy(() => import("./pages/Blog/BlogPostDetail"));
const LoginPage = lazy(() => import("./pages/Auth/LoginPage"));
const SignUpPage = lazy(() => import("./pages/Auth/SignUpPage"));
const ForgotPassword = lazy(() => import("./pages/Auth/ForgotPassword"));
const APIDocumentation = lazy(() => import("./pages/API/APIDocumentation"));
const AboutUs = lazy(() => import("./pages/Info/AboutUs"));

// Loading component for Suspense
const LoadingFallback = () => (
  <div className="flex items-center justify-center min-h-screen">
    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-emerald-500"></div>
  </div>
);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <DarkModeProvider>
      <BrowserRouter>
        <Suspense fallback={<LoadingFallback />}>
          <Routes>
            <Route path="/" element={<GreenFootprintLanding />} />
            <Route
              path="/carbon-footprint-calculator"
              element={<CarbonFootprintCalculator />}
            />
            <Route path="/blog" element={<Blog />} />
            <Route path="/blog/:id" element={<BlogPostDetail />} />
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
            <Route path="/about-us" element={<AboutUs />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/help-center" element={<HelpCenter />} />
            <Route path="/privacy" element={<Privacy />} />
            <Route path="/marketplace" element={<Marketplace />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </DarkModeProvider>
  </StrictMode>
);
