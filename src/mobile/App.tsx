import { useEffect, useState } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  useLocation,
} from "react-router-dom";
import { AuthProvider } from "../../supabase/auth";
import { Toaster } from "@/components/ui/toaster";
import { LoadingScreen } from "@/components/ui/loading-spinner";

// Mobile Pages
import MobileLogin from "./pages/MobileLogin";
import MobileSignUp from "./pages/MobileSignUp";
import MobileDashboard from "./pages/MobileDashboard";
import MobileProgress from "./pages/MobileProgress";
import MobileCurriculum from "./pages/MobileCurriculum";
import MobileTeachings from "./pages/MobileTeachings";
import MobileAccount from "./pages/MobileAccount";
import MobileAuthGuard from "./components/MobileAuthGuard";
import InstallPrompt from "./components/InstallPrompt";

// Add global type for window object to include deferredPrompt
declare global {
  interface Window {
    deferredPrompt: any;
    showInstallPrompt: () => void;
  }
}

// Animation wrapper for page transitions
function AnimatedRoutes() {
  const location = useLocation();
  const [displayLocation, setDisplayLocation] = useState(location);
  const [transitionStage, setTransitionStage] = useState("fadeIn");

  useEffect(() => {
    if (location.pathname !== displayLocation.pathname) {
      setTransitionStage("fadeOut");
      setTimeout(() => {
        setDisplayLocation(location);
        setTransitionStage("fadeIn");
      }, 200);
    }
  }, [location, displayLocation]);

  return (
    <div
      className={`${transitionStage === "fadeIn" ? "opacity-100" : "opacity-0"} transition-opacity duration-200`}
    >
      <Routes location={displayLocation}>
        <Route path="/" element={<Navigate to="/dashboard" replace />} />
        <Route path="/login" element={<MobileLogin />} />
        <Route path="/signup" element={<MobileSignUp />} />
        <Route
          path="/dashboard"
          element={
            <MobileAuthGuard>
              <MobileDashboard />
            </MobileAuthGuard>
          }
        />
        <Route
          path="/progress"
          element={
            <MobileAuthGuard>
              <MobileProgress />
            </MobileAuthGuard>
          }
        />
        <Route
          path="/curriculum"
          element={
            <MobileAuthGuard>
              <MobileCurriculum />
            </MobileAuthGuard>
          }
        />
        <Route
          path="/teachings"
          element={
            <MobileAuthGuard>
              <MobileTeachings />
            </MobileAuthGuard>
          }
        />
        <Route
          path="/account"
          element={
            <MobileAuthGuard>
              <MobileAccount />
            </MobileAuthGuard>
          }
        />
        <Route path="*" element={<Navigate to="/dashboard" replace />} />
      </Routes>
    </div>
  );
}

function MobileApp() {
  // Add mobile app enhancements
  useEffect(() => {
    // These meta tags are now in the HTML file, but we'll add additional behaviors here

    // Add mobile-specific styles
    document.body.classList.add("mobile-app");

    // Prevent bounce effect on iOS
    document.body.style.overscrollBehavior = "none";

    // Add touch action manipulation for better touch response
    document.body.style.touchAction = "manipulation";

    // Disable long press context menu on mobile
    const handleContextMenu = (e: Event) => e.preventDefault();
    document.addEventListener("contextmenu", handleContextMenu);

    // Add double-tap prevention
    let lastTap = 0;
    const handleTouchEnd = (e: TouchEvent) => {
      const currentTime = new Date().getTime();
      const tapLength = currentTime - lastTap;
      if (tapLength < 300 && tapLength > 0) {
        e.preventDefault();
      }
      lastTap = currentTime;
    };
    document.addEventListener("touchend", handleTouchEnd as EventListener);

    // Handle hardware back button for Android
    const handleBackButton = (e: PopStateEvent) => {
      // If we're at the root of our app, prevent default behavior
      if (
        window.location.pathname === "/mobile" ||
        window.location.pathname === "/mobile/"
      ) {
        e.preventDefault();
        // Maybe show a toast: "Press again to exit"
        // Or handle custom back behavior
      }
    };
    window.addEventListener("popstate", handleBackButton);

    // Prevent pull-to-refresh on mobile browsers
    const handleTouchMove = (e: TouchEvent) => {
      // If we're at the top of the page and trying to pull down
      if (window.scrollY === 0 && e.touches[0].clientY > 0) {
        e.preventDefault();
      }
    };
    document.addEventListener("touchmove", handleTouchMove as EventListener, {
      passive: false,
    });

    // Show install prompt if available
    const showInstallPrompt = () => {
      // This function is defined in the HTML file
      if (typeof window.showInstallPrompt === "function") {
        window.showInstallPrompt();
      }
    };

    // You could add a button in your UI to call showInstallPrompt()

    return () => {
      document.body.classList.remove("mobile-app");
      document.body.style.overscrollBehavior = "";
      document.body.style.touchAction = "";
      document.removeEventListener("contextmenu", handleContextMenu);
      document.removeEventListener("touchend", handleTouchEnd as EventListener);
      window.removeEventListener("popstate", handleBackButton);
      document.removeEventListener(
        "touchmove",
        handleTouchMove as EventListener,
      );
    };
  }, []);

  return (
    <AuthProvider>
      <div className="mobile-container">
        <BrowserRouter basename="/mobile">
          <AnimatedRoutes />
          <InstallPrompt />
        </BrowserRouter>
        <Toaster />
      </div>
    </AuthProvider>
  );
}

export default MobileApp;
