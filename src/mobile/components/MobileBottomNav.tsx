import { useNavigate, useLocation } from "react-router-dom";
import { Home, BookOpen, BarChart2, User, BookMarked } from "lucide-react";

export default function MobileBottomNav() {
  const navigate = useNavigate();
  const location = useLocation();

  const navItems = [
    { icon: <Home size={24} />, label: "Trang chủ", path: "/dashboard" },
    { icon: <BarChart2 size={24} />, label: "Tiến độ", path: "/progress" },
    { icon: <BookOpen size={24} />, label: "Giáo trình", path: "/curriculum" },
    { icon: <BookMarked size={24} />, label: "Giáo huấn", path: "/teachings" },
    { icon: <User size={24} />, label: "Tài khoản", path: "/account" },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 flex justify-around items-center h-16 z-50 mobile-safe-area-bottom shadow-sm">
      {navItems.map((item) => {
        const isActive = location.pathname === item.path;
        return (
          <button
            key={item.path}
            className={`flex flex-col items-center justify-center w-full h-full ${isActive ? "text-blue-600" : "text-gray-500"} active:bg-gray-50`}
            onClick={() => navigate(item.path)}
            aria-label={item.label}
          >
            <div className={`${isActive ? "text-blue-600" : "text-gray-500"}`}>
              {item.icon}
            </div>
            <span className="text-xs mt-1 font-medium">{item.label}</span>
          </button>
        );
      })}
    </div>
  );
}
