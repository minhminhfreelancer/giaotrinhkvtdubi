import { Suspense, lazy } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
// import routes from "tempo-routes";
import LoginForm from "./components/auth/LoginForm";
import SignUpForm from "./components/auth/SignUpForm";
import Dashboard from "./components/pages/dashboard";
import Progress from "./components/pages/progress";
import Success from "./components/pages/success";
import Curriculum from "./components/pages/curriculum";
const AdminSignUp = lazy(() => import("./components/auth/AdminSignUp"));
import { AuthProvider } from "../supabase/auth";
import { Toaster } from "./components/ui/toaster";
import { LoadingScreen } from "./components/ui/loading-spinner";

import AuthGuard from "./components/auth/AuthGuard";

function PrivateRoute({
  children,
  requiredRole,
}: {
  children: React.ReactNode;
  requiredRole?: string;
}) {
  return <AuthGuard requiredRole={requiredRole}>{children}</AuthGuard>;
}

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" />} />
      <Route path="/login" element={<LoginForm />} />
      <Route path="/signup" element={<SignUpForm />} />
      <Route path="/camtachame" element={<AdminSignUp />} />
      <Route
        path="/dashboard"
        element={
          <PrivateRoute>
            <Dashboard />
          </PrivateRoute>
        }
      />
      <Route
        path="/progress"
        element={
          <PrivateRoute>
            <Progress />
          </PrivateRoute>
        }
      />
      <Route
        path="/curriculum"
        element={
          <PrivateRoute>
            <Curriculum />
          </PrivateRoute>
        }
      />
      <Route path="/success" element={<Success />} />
      {/* Add this route to handle Tempo routes */}
      {import.meta.env.VITE_TEMPO === "true" && (
        <Route path="/tempobook/*" element={null} />
      )}
      <Route path="*" element={<Navigate to="/login" />} />
    </Routes>
  );
}

function App() {
  return (
    <AuthProvider>
      <Suspense fallback={<LoadingScreen text="Loading application..." />}>
        <AppRoutes />
      </Suspense>
      <Toaster />
    </AuthProvider>
  );
}

export default App;
