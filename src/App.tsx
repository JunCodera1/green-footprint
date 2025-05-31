import React, { Suspense } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import ThemeProvider from "./components/ThemeProvider";
import PageTransition from "./components/PageTransition";
import Navigation from "./components/Navigation";
import Footer from "./components/Footer";

// Lazy load pages
const GreenFootprintLanding = React.lazy(
  () => import("./pages/GreenFootprintLanding")
);
const CarbonFootprintCalculator = React.lazy(
  () => import("./pages/CarbonFootprintCalculator")
);
const Community = React.lazy(() => import("./pages/Community"));
const Blog = React.lazy(() => import("./pages/Blog"));
const BlogPostDetail = React.lazy(() => import("./pages/BlogPostDetail"));
const GlobalStatistics = React.lazy(() => import("./pages/GlobalStatistics"));
const SignUpPage = React.lazy(() => import("./pages/SignUpPage"));
const LoginPage = React.lazy(() => import("./pages/LoginPage"));
const ForgotPassword = React.lazy(() => import("./pages/ForgotPassword"));
const APIDocumentation = React.lazy(() => import("./pages/APIDocumentation"));

const PageRoutes = () => {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route
          path="/"
          element={
            <Suspense fallback={<PageTransition isLoading />}>
              <PageTransition>
                <GreenFootprintLanding />
              </PageTransition>
            </Suspense>
          }
        />
        <Route
          path="/carbon-footprint-calculator"
          element={
            <Suspense fallback={<PageTransition isLoading />}>
              <PageTransition>
                <CarbonFootprintCalculator />
              </PageTransition>
            </Suspense>
          }
        />
        <Route
          path="/community"
          element={
            <Suspense fallback={<PageTransition isLoading />}>
              <PageTransition>
                <Community />
              </PageTransition>
            </Suspense>
          }
        />
        <Route
          path="/blog"
          element={
            <Suspense fallback={<PageTransition isLoading />}>
              <PageTransition>
                <Blog />
              </PageTransition>
            </Suspense>
          }
        />
        <Route
          path="/blog/:id"
          element={
            <Suspense fallback={<PageTransition isLoading />}>
              <PageTransition>
                <BlogPostDetail />
              </PageTransition>
            </Suspense>
          }
        />
        <Route
          path="/global-statistics"
          element={
            <Suspense fallback={<PageTransition isLoading />}>
              <PageTransition>
                <GlobalStatistics />
              </PageTransition>
            </Suspense>
          }
        />
        <Route
          path="/signup"
          element={
            <Suspense fallback={<PageTransition isLoading />}>
              <PageTransition>
                <SignUpPage />
              </PageTransition>
            </Suspense>
          }
        />
        <Route
          path="/login"
          element={
            <Suspense fallback={<PageTransition isLoading />}>
              <PageTransition>
                <LoginPage />
              </PageTransition>
            </Suspense>
          }
        />
        <Route
          path="/forgot-password"
          element={
            <Suspense fallback={<PageTransition isLoading />}>
              <PageTransition>
                <ForgotPassword />
              </PageTransition>
            </Suspense>
          }
        />
        <Route
          path="/api-documentation"
          element={
            <Suspense fallback={<PageTransition isLoading />}>
              <PageTransition>
                <APIDocumentation />
              </PageTransition>
            </Suspense>
          }
        />
      </Routes>
    </AnimatePresence>
  );
};

const App = () => {
  return (
    <Router>
      <ThemeProvider>
        <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900 transition-colors duration-200">
          <Navigation />
          <main className="flex-grow">
            <PageRoutes />
          </main>
          <Footer />
        </div>
      </ThemeProvider>
    </Router>
  );
};

export default App;
