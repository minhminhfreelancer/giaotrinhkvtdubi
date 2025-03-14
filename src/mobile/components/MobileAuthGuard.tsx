import { useEffect, useState } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../../../supabase/auth";
import { LoadingScreen } from "@/components/ui/loading-spinner";

interface MobileAuthGuardProps {
  children: React.ReactNode;
  requiredRole?: string;
}

export default function MobileAuthGuard({
  children,
  requiredRole,
}: MobileAuthGuardProps) {
  const { user, loading } = useAuth();
  const [userRole, setUserRole] = useState<string | null>(null);
  const [checkingRole, setCheckingRole] = useState(!!requiredRole);
  const location = useLocation();

  useEffect(() => {
    const checkUserRole = async () => {
      if (!user || !requiredRole) {
        setCheckingRole(false);
        return;
      }

      try {
        // For now, skip the role check and assume the user has the required role
        // This is a temporary solution until the database tables are properly set up
        setUserRole(requiredRole);
        setCheckingRole(false);
      } catch (error) {
        console.error("Error in role check:", error);
        setCheckingRole(false);
      }
    };

    checkUserRole();
  }, [user, requiredRole]);

  if (loading || checkingRole) {
    return <LoadingScreen text="Xác thực người dùng..." />;
  }

  // If no user, redirect to login
  if (!user) {
    return (
      <Navigate
        to="/login"
        state={{
          from: location.pathname !== "/login" ? location : "/dashboard",
        }}
        replace
      />
    );
  }

  // If role check is required but user doesn't have the role
  if (requiredRole && userRole !== requiredRole) {
    return <Navigate to="/dashboard" replace />;
  }

  return <>{children}</>;
}
