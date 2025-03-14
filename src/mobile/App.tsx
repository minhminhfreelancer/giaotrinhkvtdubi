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
    const viewportMeta = document.createElement("meta");
    viewportMeta.name = "viewport";
    viewportMeta.content =
      "width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no";
    document.head.appendChild(viewportMeta);

    // Add mobile-specific styles
    document.body.classList.add("mobile-app");

    return () => {
      document.head.removeChild(viewportMeta);
      document.body.classList.remove("mobile-app");
    };
  }, []);

  return (
    <AuthProvider>
      <div className="mobile-container">
        <BrowserRouter basename="/mobile">
          <Routes>
            <Route path="/" element={<Navigate to="/login" />} />
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
            <Route path="*" element={<Navigate to="/login" />} />
          </Routes>
        </BrowserRouter>
        <Toaster />
      </div>
    </AuthProvider>
  );
}

export default MobileApp;
