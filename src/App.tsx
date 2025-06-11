import React, { Suspense, useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import ThemeProvider from "./components/ThemeProvider";
import PageTransition from "./components/PageTransition";
import Navigation from "./components/mainCompo/Navigation";
import Footer from "./components/mainCompo/Footer";
import { useDarkMode } from "./hooks/useDarkMode";
import APIDocumentation from "./pages/API/APIDocumentation";

// Lazy load pages
const GreenFootprintLanding = React.lazy(
  () => import("./pages/Eco/GreenFootprintLanding")
);
const CarbonFootprintCalculator = React.lazy(
  () => import("./pages/Carbon/CarbonFootprintCalculator")
);
const Community = React.lazy(() => import("./pages/Info/Community"));
const Blog = React.lazy(() => import("./pages/Blog/Blog"));
const BlogPostDetail = React.lazy(() => import("./pages/Blog/BlogPostDetail"));
const SignUpPage = React.lazy(() => import("./pages/Auth/SignUpPage"));
const LoginPage = React.lazy(() => import("./pages/Auth/LoginPage"));
const ForgotPassword = React.lazy(() => import("./pages/Auth/ForgotPassword"));
const About = React.lazy(() => import("./pages/Info/AboutUs"));
const Contact = React.lazy(() => import("./pages/Info/Contact"));

const PageRoutes = () => {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route
          path="/"
          element={
            <Suspense
              fallback={
                <PageTransition isLoading>
                  <div />
                </PageTransition>
              }
            >
              <PageTransition>
                <GreenFootprintLanding />
              </PageTransition>
            </Suspense>
          }
        />
        <Route
          path="/carbon-footprint-calculator"
          element={
            <Suspense
              fallback={
                <PageTransition isLoading>
                  <div />
                </PageTransition>
              }
            >
              <PageTransition>
                <CarbonFootprintCalculator />
              </PageTransition>
            </Suspense>
          }
        />
        <Route
          path="/community"
          element={
            <Suspense
              fallback={
                <PageTransition isLoading>
                  <div />
                </PageTransition>
              }
            >
              <PageTransition>
                <Community />
              </PageTransition>
            </Suspense>
          }
        />
        <Route
          path="/blog"
          element={
            <Suspense
              fallback={
                <PageTransition isLoading>
                  <div />
                </PageTransition>
              }
            >
              <PageTransition>
                <Blog />
              </PageTransition>
            </Suspense>
          }
        />
        <Route
          path="/blog/:id"
          element={
            <Suspense
              fallback={
                <PageTransition isLoading>
                  <div />
                </PageTransition>
              }
            >
              <PageTransition>
                <BlogPostDetail />
              </PageTransition>
            </Suspense>
          }
        />
        {/* <Route
          path="/global-statistics"
          element={
            <Suspense
              fallback={
                <PageTransition isLoading>
                  <div />
                </PageTransition>
              }
            >
              <PageTransition>
                <GlobalStatistics />
              </PageTransition>
            </Suspense>
          }
        /> */}
        <Route
          path="/signup"
          element={
            <Suspense
              fallback={
                <PageTransition isLoading>
                  <div />
                </PageTransition>
              }
            >
              <PageTransition>
                <SignUpPage />
              </PageTransition>
            </Suspense>
          }
        />
        <Route
          path="/login"
          element={
            <Suspense
              fallback={
                <PageTransition isLoading>
                  <div />
                </PageTransition>
              }
            >
              <PageTransition>
                <LoginPage />
              </PageTransition>
            </Suspense>
          }
        />
        <Route
          path="/forgot-password"
          element={
            <Suspense
              fallback={
                <PageTransition isLoading>
                  <div />
                </PageTransition>
              }
            >
              <PageTransition>
                <ForgotPassword />
              </PageTransition>
            </Suspense>
          }
        />
        <Route
          path="/api-documentation"
          element={
            <Suspense
              fallback={
                <PageTransition isLoading>
                  <div />
                </PageTransition>
              }
            >
              <PageTransition>
                <APIDocumentation />
              </PageTransition>
            </Suspense>
          }
        />
        <Route
          path="/about"
          element={
            <Suspense
              fallback={
                <PageTransition isLoading>
                  <div />
                </PageTransition>
              }
            >
              <PageTransition>
                <About />
              </PageTransition>
            </Suspense>
          }
        />
        <Route
          path="/contact"
          element={
            <Suspense
              fallback={
                <PageTransition isLoading>
                  <div />
                </PageTransition>
              }
            >
              <PageTransition>
                <Contact />
              </PageTransition>
            </Suspense>
          }
        />
      </Routes>
    </AnimatePresence>
  );
};

const App = () => {
  const [scrollY, setScrollY] = useState(0);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { isDarkMode, toggleDarkMode } = useDarkMode();

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLinkClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string
  ) => {
    e.preventDefault();
    const element = document.querySelector(href);
    if (element) element.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <Router>
      <ThemeProvider>
        <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900 transition-colors duration-200">
          <Navigation
            scrollY={scrollY}
            isMenuOpen={isMenuOpen}
            setIsMenuOpen={setIsMenuOpen}
            isDarkMode={isDarkMode}
            toggleDarkMode={toggleDarkMode}
            handleLinkClick={handleLinkClick}
          />
          <main className="flex-grow">
            <PageRoutes />
          </main>
          <Footer isDarkMode={isDarkMode} />
        </div>
      </ThemeProvider>
    </Router>
  );
};

export default App;
