import { useNavigate, useLocation } from "react-router-dom";
import { Home, BookOpen, BarChart2, User, BookMarked } from "lucide-react";

export default function MobileBottomNav() {
  const navigate = useNavigate();
  const location = useLocation();

  const navItems = [
    { icon: <Home size={20} />, label: "Trang chủ", path: "/dashboard" },
    { icon: <BarChart2 size={20} />, label: "Tiến độ", path: "/progress" },
    { icon: <BookOpen size={20} />, label: "Giáo trình", path: "/curriculum" },
    { icon: <BookMarked size={20} />, label: "Giáo huấn", path: "/teachings" },
    { icon: <User size={20} />, label: "Tài khoản", path: "/account" },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 flex justify-around items-center h-16 z-50">
      {navItems.map((item) => {
        const isActive = location.pathname === item.path;
        return (
          <button
            key={item.path}
            className={`flex flex-col items-center justify-center w-full h-full ${isActive ? "text-blue-600" : "text-gray-500"}`}
            onClick={() => navigate(item.path)}
          >
            <div className={`${isActive ? "text-blue-600" : "text-gray-500"}`}>
              {item.icon}
            </div>
            <span className="text-xs mt-1">{item.label}</span>
          </button>
        );
      })}
    </div>
  );
}
