import { useEffect } from "react";

/**
 * A component that prevents redirection to desktop version
 * Use this in mobile routes where you want to ensure users stay in the mobile version
 */
export default function MobileRedirectGuard({
  children,
}: {
  children: React.ReactNode;
}) {
  useEffect(() => {
    // Store the current URL which should be a mobile URL
    const currentMobileUrl = window.location.href;

    // Create an interval that checks if we're still on a mobile URL
    const intervalId = setInterval(() => {
      const currentPath = window.location.pathname;

      // If we're no longer on a path that starts with /mobile, redirect back
      if (!currentPath.startsWith("/mobile")) {
        window.location.href = currentMobileUrl;
      }
    }, 500); // Check every 500ms

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  return <>{children}</>;
}
