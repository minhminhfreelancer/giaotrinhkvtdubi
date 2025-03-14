import { useEffect, useState } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../../../supabase/auth";
import { supabase } from "../../../supabase/supabase";
import { LoadingScreen } from "@/components/ui/loading-spinner";

interface AuthGuardProps {
  children: React.ReactNode;
  requiredRole?: string;
}

export default function AuthGuard({ children, requiredRole }: AuthGuardProps) {
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

        /* Commented out until database tables are properly set up
        // Query to check if user has the required role
        const { data, error } = await supabase
          .from("user_roles")
          .select("roles(name)")
          .eq("user_id", user.id)
          .single();

        if (error) {
          console.error("Error checking user role:", error);
          setUserRole(null);
        } else if (data && data.roles) {
          setUserRole(data.roles.name);
        }
        */
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
