import { useNavigate, useLocation } from "react-router-dom";
import { Home, BookOpen, BarChart2, User, BookMarked } from "lucide-react";
import { useEffect, useState } from "react";

export default function MobileBottomNav() {
  const navigate = useNavigate();
  const location = useLocation();
  const [touchedItem, setTouchedItem] = useState<string | null>(null);

  const navItems = [
    { icon: <Home size={22} />, label: "Trang chủ", path: "/dashboard" },
    { icon: <BarChart2 size={22} />, label: "Tiến độ", path: "/progress" },
    { icon: <BookOpen size={22} />, label: "Giáo trình", path: "/curriculum" },
    { icon: <BookMarked size={22} />, label: "Giáo huấn", path: "/teachings" },
    { icon: <User size={22} />, label: "Tài khoản", path: "/account" },
  ];

  const handleNavigation = (path: string) => {
    if (location.pathname !== path) {
      // Add haptic feedback if available
      if (navigator.vibrate) {
        navigator.vibrate(5);
      }
      navigate(path);
    }
  };

  const handleTouchStart = (path: string) => {
    setTouchedItem(path);
  };

  const handleTouchEnd = () => {
    setTouchedItem(null);
  };

  // Clean up touched state when navigating away
  useEffect(() => {
    return () => setTouchedItem(null);
  }, [location.pathname]);

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-md border-t border-gray-200/80 flex justify-around items-center h-16 z-50 mobile-safe-area-bottom shadow-sm">
      {navItems.map((item) => {
        const isActive = location.pathname === item.path;
        const isTouched = touchedItem === item.path;
        return (
          <button
            key={item.path}
            className={`flex flex-col items-center justify-center w-full h-full transition-transform duration-150 ${isActive ? "text-blue-600" : "text-gray-500"} ${isTouched ? "scale-95" : ""}`}
            onClick={() => handleNavigation(item.path)}
            onTouchStart={() => handleTouchStart(item.path)}
            onTouchEnd={handleTouchEnd}
            onTouchCancel={handleTouchEnd}
            aria-label={item.label}
          >
            <div
              className={`${isActive ? "text-blue-600" : "text-gray-500"} transition-all duration-200 ${isActive ? "scale-110" : ""}`}
            >
              {item.icon}
            </div>
            <span
              className={`text-xs mt-1 font-medium transition-all duration-200 ${isActive ? "font-semibold" : ""}`}
            >
              {item.label}
            </span>
            {isActive && (
              <div className="absolute bottom-0 w-10 h-1 bg-blue-600 rounded-t-full" />
            )}
          </button>
        );
      })}
    </div>
  );
}
