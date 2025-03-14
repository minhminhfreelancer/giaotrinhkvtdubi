import { useState, useEffect } from "react";
import { supabase } from "../../supabase/supabase";
import { useAuth } from "../../supabase/auth";

export function useUserRole() {
  const { user } = useAuth();
  const [role, setRole] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchUserRole = async () => {
      if (!user) {
        setRole(null);
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        // For now, assume the user is a district leader
        // This is a temporary solution until the database tables are properly set up
        // Check if user has a role in the database
        // Simplified role check to avoid recursion issues
        // Default to trainee_district_leader for all users for now
        setRole("trainee_district_leader");

        // If the user is petervu7777@gmail.com, set as district_leader
        if (user.email === "petervu7777@gmail.com") {
          setRole("district_leader");
        }

        /* Commented out until database tables are properly set up
        const { data, error } = await supabase
          .from("user_roles")
          .select("roles(name)")
          .eq("user_id", user.id)
          .single();

        if (error) throw error;

        setRole(data?.roles?.name || null);
        */
      } catch (err) {
        console.error("Error fetching user role:", err);
        setError(err instanceof Error ? err : new Error(String(err)));
      } finally {
        setLoading(false);
      }
    };

    fetchUserRole();
  }, [user]);

  return {
    role,
    loading,
    error: null, // Reset error since we're not making API calls now
    isDistrictLeader: role === "district_leader",
    isTraineeDistrictLeader: role === "trainee_district_leader",
    isAdmin: role === "admin",
  };
}
