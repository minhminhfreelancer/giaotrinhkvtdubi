import { useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
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

function MobileApp() {
  // Add viewport meta tag for mobile
  useEffect(() => {
    // Set viewport meta tag
    const viewportMeta = document.createElement("meta");
    viewportMeta.name = "viewport";
    viewportMeta.content =
      "width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no";
    document.head.appendChild(viewportMeta);

    // Add theme-color meta tag for mobile browser UI
    const themeColorMeta = document.createElement("meta");
    themeColorMeta.name = "theme-color";
    themeColorMeta.content = "#ffffff";
    document.head.appendChild(themeColorMeta);

    // Add apple-mobile-web-app-capable meta tag
    const appleMobileWebAppCapable = document.createElement("meta");
    appleMobileWebAppCapable.name = "apple-mobile-web-app-capable";
    appleMobileWebAppCapable.content = "yes";
    document.head.appendChild(appleMobileWebAppCapable);

    // Add apple-mobile-web-app-status-bar-style meta tag
    const appleMobileWebAppStatusBarStyle = document.createElement("meta");
    appleMobileWebAppStatusBarStyle.name =
      "apple-mobile-web-app-status-bar-style";
    appleMobileWebAppStatusBarStyle.content = "default";
    document.head.appendChild(appleMobileWebAppStatusBarStyle);

    // Add mobile-specific styles
    document.body.classList.add("mobile-app");

    // Prevent bounce effect on iOS
    document.body.style.overscrollBehavior = "none";

    // Prevent text selection
    document.body.style.webkitUserSelect = "none";
    document.body.style.userSelect = "none";

    return () => {
      document.head.removeChild(viewportMeta);
      document.head.removeChild(themeColorMeta);
      document.head.removeChild(appleMobileWebAppCapable);
      document.head.removeChild(appleMobileWebAppStatusBarStyle);
      document.body.classList.remove("mobile-app");
      document.body.style.overscrollBehavior = "";
      document.body.style.webkitUserSelect = "";
      document.body.style.userSelect = "";
    };
  }, []);

  return (
    <AuthProvider>
      <div className="mobile-container">
        <BrowserRouter basename="/mobile">
          <Routes>
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
        </BrowserRouter>
        <Toaster />
      </div>
    </AuthProvider>
  );
}

export default MobileApp;
