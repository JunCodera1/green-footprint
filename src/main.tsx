import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { lazy, Suspense } from 'react';

import { DarkModeProvider } from './contexts/DarkModeContext';

// Lazy loaded components
const BlogPostDetail = lazy(() => import('./pages/Blog/BlogPostDetail'));
const LoginPage = lazy(() => import('./pages/Auth/LoginPage'));
const SignUpPage = lazy(() => import('./pages/Auth/SignUpPage'));
const ForgotPassword = lazy(() => import('./pages/Auth/ForgotPassword'));
const APIDocumentation = lazy(() => import('./pages/API/APIDocumentation'));
const AboutUs = lazy(() => import('./pages/Info/AboutUs'));
const GreenFootprintLanding = lazy(() => import('./pages/Eco/GreenFootprintLanding'));
const Blog = lazy(() => import('./pages/Blog/Blog'));
const Community = lazy(() => import('./pages/Support/Community'));
const AIAnalytic = lazy(() => import('./pages/API/AIAnalytic'));
const PersonalReports = lazy(() => import('./pages/Support/PersonalReports'));
const CarbonFootprintCalculator = lazy(() => import('./pages/Carbon/CarbonFootprintCalculator'));
const MobileAppPreview = lazy(() => import('./pages/Info/MobileAppPreview'));
const EcoScene3D = lazy(() => import('./pages/Eco/EcoScene3D'));
const SmartHome = lazy(() => import('./pages/Info/SmartHome'));
const CarbonOffset = lazy(() => import('./pages/Carbon/CarbonOffset'));
const SocialPage = lazy(() => import('./pages/Blog/Social'));
const Achievements = lazy(() => import('./pages/Info/Achievements'));
const Subscription = lazy(() => import('./pages/Info/Subscription'));
const EducationPage = lazy(() => import('./pages/Eco/Education'));
const CarbonTracking = lazy(() => import('./pages/Carbon/CarbonTracking'));
const Contact = lazy(() => import('./pages/Info/Contact'));
const HelpCenter = lazy(() => import('./pages/Support/HelpCenter'));
const Privacy = lazy(() => import('./pages/Support/Privacy'));
const Marketplace = lazy(() => import('./pages/Info/Marketplace'));
const FeaturePage = lazy(() => import('./pages/Feature/FeaturePage'));

// Loading component for Suspense
const LoadingFallback = () => (
  <div className="flex items-center justify-center min-h-screen">
    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-emerald-500"></div>
  </div>
);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <DarkModeProvider>
      <BrowserRouter>
        <Suspense fallback={<LoadingFallback />}>
          <Routes>
            <Route path="/" element={<GreenFootprintLanding />} />
            <Route path="/carbon-footprint-calculator" element={<CarbonFootprintCalculator />} />
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
            <Route path="/about" element={<AboutUs />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/help-center" element={<HelpCenter />} />
            <Route path="/privacy" element={<Privacy />} />
            <Route path="/marketplace" element={<Marketplace />} />
            <Route path="/features" element={<FeaturePage />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </DarkModeProvider>
  </StrictMode>
);
